
const fetch =require('node-fetch')
const express = require("express");
const cron = require("node-cron");
const router = express.Router();

const nodemail = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path')



var Order = require('../models/order.js');

//

cron.schedule("00 19 * * *", function() {
    Order.find({})
    .then(documents=>{

     
        let OrdersData = documents



        let PipelineOrders = [];
        let CommercialHoldOrders = [];
        let WinOrders = [];
        let HandOvers = [];


        var today = new Date();
        let todayDate= today.getDate();
        let todayMonth = today.getMonth() +1;
        let todayYear = today.getFullYear();

     
        let TodayDateFormat = todayDate + "-" + todayMonth + "-" + todayYear


        today.setDate(today.getDate() - 1);   
        var todayReal = new Date()


    

        for(var i = 0 ; i < OrdersData.length ; i ++)
        {
            
                let Creation = OrdersData[i].CreationDate;
                let CreationDate = Creation.split('-')[0];
                let CreationMonth = Creation.split('-')[1];
                let CreationYear = Creation.split('-')[2];
                let CreDateForm =  CreationMonth + "/" +CreationDate + "/" + CreationYear

                var CreationD=new Date(CreDateForm)

                if(CreationD<=todayReal&&CreationD>today&&OrdersData[i].Status!=="Edited")
                {
                    var temp = { OrderNo :OrdersData[i].OrderNo , 
                        ProjectName : OrdersData[i].ProjectName,
                        ClientName : OrdersData[i].ClientName,
                        Location : OrdersData[i].Location,
                        Architect : OrdersData[i].Architect,
                        FinalValue : OrdersData[i].FinalAmount,
                        Associate : OrdersData[i].Associate,
                        Source : OrdersData[i].Source,
                        SolutionCount : OrdersData[i].Solutions.length,
                        Completed : OrdersData[i].Completed
                       
                      }

                    PipelineOrders.push(temp)
                  
                }

               
            

            if(OrdersData[i].WinDate) 
            {
                
                
                let Win = OrdersData[i].WinDate;
                let WinDate = Win.split('-')[0];
                let WinMonth = Win.split('-')[1];
                let WinYear = Win.split('-')[2];

                let WinDateForm =  WinMonth + "/" +WinDate + "/" + WinYear

                var WinD=new Date(WinDateForm)

                if(WinD<=todayReal&&WinD>today&&OrdersData[i].Status!=="Edited")
                {
                  

                    var temp = { OrderNo :OrdersData[i].OrderNo , 
                                 ProjectName : OrdersData[i].ProjectName,
                                 ClientName : OrdersData[i].ClientName,
                                 Location : OrdersData[i].Location,
                                 Architect : OrdersData[i].Architect,
                                 FinalValue : OrdersData[i].FinalAmount,
                                 Associate : OrdersData[i].Associate,
                                 Source : OrdersData[i].Source
                                
                               }

                    CommercialHoldOrders.push(temp)
                }

            }

            

                if( OrdersData[i].CommercialWinDate)
                {

                  
                    let CommercialWin = OrdersData[i].CommercialWinDate
                    let CommercialWinDate = CommercialWin.split('-')[0];
                    let CommercialWinMonth = CommercialWin.split('-')[1];
                    let CommercialWinYear =  CommercialWin.split('-')[2];
                    

                    let CommercialWinDateForm =  CommercialWinMonth + "/" +CommercialWinDate + "/" + CommercialWinYear

                    var CommercialWinD=new Date(CommercialWinDateForm)
    
                    if(CommercialWinD<=todayReal&&CommercialWinD>today&&OrdersData[i].Status!=="Edited")
                    {

                        var temp = { OrderNo :OrdersData[i].OrderNo , 
                            ProjectName : OrdersData[i].ProjectName,
                            ClientName : OrdersData[i].ClientName,
                            Location : OrdersData[i].Location,
                            Architect : OrdersData[i].Architect,
                            FinalValue : OrdersData[i].FinalAmount,
                            Associate : OrdersData[i].Associate,
                            Source : OrdersData[i].Source
                           
                          }
                        WinOrders.push(temp)
                      
                    }
    

                }
           

          

            if(OrdersData[i].Status=="Handover")
            {
                
                
                if(OrdersData[i].HandOverDate)
                {

                    let  HandOver  = OrdersData[i].HandOverDate
                    let  HandOverDate  = HandOver.split('-')[0];
                    let  HandOverMonth  = HandOver.split('-')[1];
                    let  HandOverYear =  HandOver.split('-')[2];

                    
                    let HandOverDateForm =  HandOverMonth + "/" +HandOverDate + "/" + HandOverYear

                    var HandOverD=new Date(HandOverDateForm)
    
                    if(HandOverD<=todayReal&&HandOverD>today)
                    {

                        var temp = { OrderNo :OrdersData[i].OrderNo , 
                            ProjectName : OrdersData[i].ProjectName,
                            ClientName : OrdersData[i].ClientName,
                            Location : OrdersData[i].Location,
                            Architect : OrdersData[i].Architect,
                            FinalValue : OrdersData[i].FinalAmount,
                            Associate : OrdersData[i].Associate,
                            Source : OrdersData[i].Source
                           
                          }

                        HandOvers.push(temp)
                    }

                }
                
              


            }
        }



       
        let PipelinePresent = ""
        let WinOrdersPresent = ""
        let CommercialHoldOrdersPresent = ""
        let HandOversPresent = ""


         if(PipelineOrders.length>0)
         {
            PipelinePresent = PipelineOrders.length
         }
         if(WinOrders.length>0)
         {
            WinOrdersPresent = WinOrders.length
         }
         if(CommercialHoldOrders.length>0)
         {
            CommercialHoldOrdersPresent  = CommercialHoldOrders.length
         }
         if(HandOvers.length>0)
         {
            HandOversPresent = HandOvers.length
         }
  
     
         
        

      

        



        if(PipelinePresent>0||WinOrdersPresent>0||CommercialHoldOrdersPresent>0||HandOversPresent>0)
        {

       

         var transporter = nodemail.createTransport({
            service : 'gmail',
            auth : {
              user : 'it@jbglass.in',
              pass : 'aayushp@121188'
            }
          }); 
      
          transporter.use('compile', hbs(
            {
              viewEngine : 
              {
                extName: ".handlebars",
                partialsDir: path.resolve(__dirname, "views4"),
                defaultLayout: false,
              },
              viewPath : path.resolve(__dirname, "views4"),
              extName: ".handlebars"
             }
          ));


           
          var mailOptions = {
            from : 'it@jbglass.in',
            to : 'gaurav@jbglass.in',
            cc :   'shashank@jbglass.in,anuj@jbglass.in,it@jbglass.in',
            subject : 'Orders Created Today ',
            template : 'winmail',
            context: {

                Pipelinelength : PipelinePresent,
                Winlength : WinOrdersPresent,
                CommercialLength : CommercialHoldOrdersPresent,
                HandOverslength : HandOversPresent,
                PipelineOrders : PipelineOrders,
                WinOrders : WinOrders,
                CommercialHoldOrders : CommercialHoldOrders,
                HandOvers : HandOvers,
                Today : TodayDateFormat 
            
            }
          }
      
            
          transporter.sendMail(mailOptions,function(error,info){
          if(error)
          {
            console.log(error)
          }else{
           console.log('Email Sent : '+ info.response);
          }
      
          })
    
      
       
        }
       
 
       

        

        
     
    }); 
    

},{
    scheduled: true,
    timezone: "Asia/Kolkata"
  });



module.exports = cron;