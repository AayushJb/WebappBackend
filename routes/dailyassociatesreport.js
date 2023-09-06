
const fetch =require('node-fetch')
const express = require("express");
const cron = require("node-cron");
const router = express.Router();

const nodemail = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path')



var Order = require('../models/order.js'); 
var User = require('../models/user.js');
var SpecialRequest = require('../models/specialrequest.js');


//"

//*/10 * * * * *
cron.schedule("00 08 * * *", function() {


   User.find({})
   .then((response)=>{
    var Users = response

    Order.find({$or: [ { Status : "Win" }, {Status : "Old Win" },{Status : "Pipeline" } ,{Status : "Handover" },{Status : "Commercial Hold" }] })
    .then((response)=>{
     var Orders = response

     var today = new Date();

     var currentMonth = new Date();

     var FirstCurrent =  new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
     var StartDate = GetDateFormat(FirstCurrent)

     FirstCurrent.setHours(0);
     FirstCurrent.setMinutes(0);
     FirstCurrent.setSeconds(0);
     FirstCurrent.setMilliseconds(0); 
     
    

     var EndDate  = GetDateFormat(today)



     var yesterday = new Date();
     yesterday.setDate(today.getDate() - 1);
     var YesStartDate = GetDateFormat(yesterday)

     yesterday.setHours(0);
     yesterday.setMinutes(0);
     yesterday.setSeconds(0);
     yesterday.setMilliseconds(0); 
     
     

    

     
   

     SpecialRequest.find({})
     .then((response)=>{
        var SpecialRequests = response
        
        
         return GetSalesDataCS(StartDate,EndDate,SpecialRequests)
         
     })
     .then((response)=>{
        var SalesReportData = response.SalesData
        var SpecialRequests = response.SpecialRequests

        return GetCSDateRangeData(StartDate,EndDate,SalesReportData,SpecialRequests)

     })
     .then((response)=>{
        var SalesReportData = JSON.parse(response.SalesReportData);
        var SpecialRequests = response.SpecialRequests;
        var ProjectReport = JSON.parse(response.ProjectReport);

        var SalesReportData = response.SalesReportData
        var SpecialRequests = response.SpecialRequests
        var ProjectReport = response.ProjectReport


       return GetYesterdaySalesDataCS(YesStartDate,EndDate,SpecialRequests,SalesReportData,ProjectReport)
       
     })
     .then((response)=>{

 
     
    var FullSalesReportData = JSON.parse(response.FullSalesReportData);
    var SpecialRequests = response.SpecialRequests;
    var ProjectReport = JSON.parse(response.ProjectReport);
    var YesterdaySalesData = JSON.parse(response.YesterdaySalesData)


     var Associates = ["SHASHANK SINGH","VIPIN KUMAR","VIKAS SINGHAL","NAYAN PATIL","VISHAL PARIKH","RIYAZ SAYYED","SAKINA BATISH","ANKIT AGGARWAL","PRAVEEN KANODIA","RAHUL JAISWAL","RAJENDRA BADAYA","RUCHIR","UTKALIKA","JB ACCOUNTS","SOCIAL"]

     var Regions = ["Mumbai","Bangalore","Hyderabad","Surat","Ahmedabad","Jaipur","Delhi"]




    

     var FullData = []

     /*
     for(var p = 0;p<Associates.length;p++)
     {
      var YesterdayPipelineAmount = 0;
      var YesterdayPipelineAmountCS = 0;
      var YesterdayWinAmount = 0;
      var YesterdayWinAmountCS = 0;
      var YesterdayWinCount = 0;
      var YesterdayPipelineCount = 0;
      var YesterdayReceipt = 0;
      var YesterdayBilling = 0;
 
 
      var MonthPipelineAmount = 0;
      var MonthPipelineAmountCS = 0;
      var MonthWinAmount = 0;
      var MonthWinAmountCS = 0;
      var MonthWinCount = 0;
      var MonthPipelineCount = 0;
      var MonthReceipt = 0;
      var MonthBilling = 0;
      var TotalOutStanding = 0;

     
      
      for(var i =0; i<Orders.length; i++)
      {


        var DealerDiscount = '';

        Users.map((item)=>{
          if(item.UserFullName==Orders[i].Associate)
          {
            DealerDiscount = item.DealerDiscount
          }
        })


        let OrderProjectRefNo = ""
 
        if(Orders[i].OrderNo.includes("/V-"))
        {
         let hyphen = Orders[i].OrderNo.lastIndexOf("/V-");
         let tempproref = Orders[i].OrderNo.substring(0, hyphen);
         let slash = tempproref.lastIndexOf("/");
         let proref = tempproref.substring(slash + 1, hyphen); 
         OrderProjectRefNo = proref
        }
     
        if(!Orders[i].OrderNo.includes("/V-"))
        {
         let slash = Orders[i].OrderNo.lastIndexOf("/");
         let proref = Orders[i].OrderNo.substring(slash+ 1, Orders[i].OrderNo.length);
         OrderProjectRefNo = proref
        }

        SpecialRequests.map((item)=>{
          if(item.OrderNo==OrderProjectRefNo)
          {
            DealerDiscount = item.NewDealerDiscount
          }
        })
 

        var CSValue = 0;
        

        if(DealerDiscount!=="0")
        {
         CSValue = (Math.ceil(Number(Orders[i].GrandTotal)-Number(Orders[i].GrandTotal)*0.01*Number(DealerDiscount)))
        }
        if(DealerDiscount==="0")
        {
          CSValue = Number(Orders[i].FinalAmount)
        }

       
        

        
       
            
    


  
        var OrdersReps = [];
        for(q=0;q<ProjectReport.length;q++)
        {
          if(ProjectReport[q].PROJREFNO==OrderProjectRefNo)
          {
            if(Orders[i].CommercialWinDate && Orders[i].Status=="Win")
            {
                    
               if(ProjectReport[q].PROJREFNO==OrderProjectRefNo)
              {
                
                if(!OrdersReps.includes(ProjectReport[q].PROJREFNO))
                {
                  if(Orders[i].Associate==Associates[p])
                {
                         
                  let Collection = 0
                  let Dispatch = 0 

                  if(ProjectReport[q].INVOICECOLLECTION)
                  {
                   Collection = Number(ProjectReport[q].INVOICECOLLECTION)
                  }

                  if(ProjectReport[q].DISPATCHPIVALUE)
                  {
                   Dispatch = Number(ProjectReport[q].DISPATCHPIVALUE)
                  }
               
                   let OutStanding = Collection - Dispatch

                   if(OutStanding<0)
                   {
                       TotalOutStanding = TotalOutStanding+ Number(OutStanding)
                   }
                    
                  }
                }

                OrdersReps.push(ProjectReport[q].PROJREFNO)

               }

            }
          }
        }


        for(var r=0; r<FullSalesReportData.length;r++)
        {
          if(FullSalesReportData[r].PROJREFNO==OrderProjectRefNo&&Orders[i].Associate==Associates[p])
          {
            MonthReceipt = MonthReceipt + FullSalesReportData[r].Collection;
            MonthBilling = MonthBilling + FullSalesReportData[r].Sales;
          }
        }

        for(var s=0; s<YesterdaySalesData.length;s++)
        {
          if(YesterdaySalesData[s].PROJREFNO==OrderProjectRefNo&&Orders[i].Associate==Associates[p])
          {
            YesterdayReceipt = YesterdayReceipt + YesterdaySalesData[s].Collection; 
            YesterdayBilling = YesterdayBilling + YesterdaySalesData[s].Sales;
          }
        }



         if(Orders[i].CreationDate &&Orders[i].Status==="Pipeline")
         {
           var CrDate =  Orders[i].CreationDate.split("-")[0];
           var CrMonth = Orders[i].CreationDate.split("-")[1];
           var CrYear = Orders[i].CreationDate.split("-")[2];
 
           var CreationDateFor = CrMonth+ "/" + CrDate + "/" + CrYear
 
           var CreationDate =new Date(CreationDateFor)
 
           CreationDate.setHours(0);
           CreationDate.setMinutes(0);
           CreationDate.setSeconds(0);
           CreationDate.setMilliseconds(0);
 
 
           if(CreationDate<=today&&CreationDate>=FirstCurrent&&Orders[i].Associate===Associates[p])
           {
 
            MonthPipelineCount = MonthPipelineCount + 1
            MonthPipelineAmount = MonthPipelineAmount+ Number(Orders[i].FinalAmount)
            MonthPipelineAmountCS = MonthPipelineAmountCS + CSValue


           }

           if(CreationDate<=today&&CreationDate>=yesterday&&Orders[i].Associate===Associates[p])
           {
 
            YesterdayPipelineCount = YesterdayPipelineCount + 1
            YesterdayPipelineAmount = YesterdayPipelineAmount+ Number(Orders[i].FinalAmount)
            YesterdayPipelineAmountCS = YesterdayPipelineAmountCS + CSValue

  

           }
 
 
         }



         if(Orders[i].CommercialWinDate&&Orders[i].Status=="Win")
         {
           var WDate =  Orders[i].CommercialWinDate.split("-")[0];
           var WMonth = Orders[i].CommercialWinDate.split("-")[1];
           var WYear = Orders[i].CommercialWinDate.split("-")[2];
 
           var WinDateFor = WMonth+ "/" + WDate + "/" + WYear
 
           var WinDate =new Date(WinDateFor)
 
           WinDate.setHours(0);
           WinDate.setMinutes(0);
           WinDate.setSeconds(0);
           WinDate.setMilliseconds(0);

           

           if(WinDate<=today&&WinDate>=FirstCurrent&&Orders[i].Associate===Associates[p])
           {
 
            MonthWinCount = MonthWinCount + 1
            MonthWinAmount = MonthWinAmount+ Number(Orders[i].FinalAmount)
            MonthWinAmountCS = MonthWinAmountCS + CSValue

           }

           if(WinDate<=today&&WinDate>=yesterday&&Orders[i].Associate===Associates[p])
           {
 
            YesterdayWinCount = YesterdayWinCount + 1
            YesterdayWinAmount = YesterdayWinAmount+ Number(Orders[i].FinalAmount)
            YesterdayWinAmountCS = YesterdayWinAmountCS + CSValue

           }

         }



      }



      var temp = {
        Associate : Associates[p],
        YesterdayPipelineAmount : YesterdayPipelineAmount.toFixed(0),
        YesterdayPipelineAmountCS : YesterdayPipelineAmountCS.toFixed(0),
        YesterdayWinAmount : YesterdayWinAmount.toFixed(0),
        YesterdayWinAmountCS : YesterdayWinAmountCS.toFixed(0),
        YesterdayWinCount : YesterdayWinCount,
        YesterdayPipelineCount : YesterdayPipelineCount,
        YesterdayReceipt : YesterdayReceipt,
        YesterdayBilling : YesterdayBilling,
        MonthPipelineAmount : MonthPipelineAmount.toFixed(0),
        MonthPipelineAmountCS : MonthPipelineAmountCS.toFixed(0),
        MonthWinAmount : MonthWinAmount.toFixed(0),
        MonthWinAmountCS : MonthWinAmountCS.toFixed(0),
        MonthWinCount : MonthWinCount,
        MonthPipelineCount : MonthPipelineCount,
        MonthReceipt : MonthReceipt,
        MonthBilling : MonthBilling,
        TotalOutStanding : TotalOutStanding
      }


      FullData.push(temp)



      
      var transporter = nodemail.createTransport({
        service : 'gmail',
        auth : {
          user : 'it@jbglass.in',
          pass : 'pandey@ap1211'
        }
      }); 
      
      transporter.use('compile', hbs(
        {
          viewEngine : 
          {
            extName: ".handlebars",
            partialsDir: path.resolve(__dirname, "views6"),
            defaultLayout: false,
          },
          viewPath : path.resolve(__dirname, "views6"),
          extName: ".handlebars"
         }
      ));
      
      
       
      var mailOptions = {
        from : 'it@jbglass.in',
        to : 'it@jbglass.in',//'gaurav@jbglass.in',
       // cc :  'pulkit@ajaca.co.in,it@jbglass.in,sanchit@jbglass.in',
        subject : 'DAILY ASSOCIATE ANALYSIS REPORT  - '+ Associates[p],
        template : 'associatereport',
        context: {
         StartDate : StartDate,
         EndDate : EndDate,
         Associate : Associates[p],
         YesterdayPipelineAmount : YesterdayPipelineAmount.toFixed(0),
         YesterdayPipelineAmountCS : YesterdayPipelineAmountCS.toFixed(0),
         YesterdayWinAmount : YesterdayWinAmount.toFixed(0),
         YesterdayWinAmountCS : YesterdayWinAmountCS.toFixed(0),
         YesterdayWinCount : YesterdayWinCount,
         YesterdayPipelineCount : YesterdayPipelineCount,
         YesterdayReceipt : YesterdayReceipt.toFixed(0),
         YesterdayBilling : YesterdayBilling.toFixed(0),
         MonthPipelineAmount : MonthPipelineAmount.toFixed(0),
         MonthPipelineAmountCS : MonthPipelineAmountCS.toFixed(0),
         MonthWinAmount : MonthWinAmount.toFixed(0),
         MonthWinAmountCS : MonthWinAmountCS.toFixed(0),
         MonthWinCount : MonthWinCount,
         MonthPipelineCount : MonthPipelineCount,
         MonthReceipt : MonthReceipt.toFixed(0),
         MonthBilling : MonthBilling.toFixed(0),
         TotalOutStanding : TotalOutStanding.toFixed(0)   
        
           
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

*/


      for(var p = 0;p<Associates.length;p++)
     {
      var YesterdayPipelineAmount = 0;
      var YesterdayPipelineAmountCS = 0;
      var YesterdayWinAmount = 0;
      var YesterdayWinAmountCS = 0;
      var YesterdayWinCount = 0;
      var YesterdayPipelineCount = 0;
      var YesterdayReceipt = 0;
      var YesterdayBilling = 0;
 
 
      var MonthPipelineAmount = 0;
      var MonthPipelineAmountCS = 0;
      var MonthWinAmount = 0;
      var MonthWinAmountCS = 0;
      var MonthWinCount = 0;
      var MonthPipelineCount = 0;
      var MonthReceipt = 0;
      var MonthBilling = 0;
      var TotalOutStanding = 0;

     
      if(Associates[p]!=="SOCIAL")
      {
      for(var i =0; i<Orders.length; i++)
      {


        var DealerDiscount = '';

        Users.map((item)=>{
          if(item.UserFullName==Orders[i].Associate)
          {
            DealerDiscount = item.DealerDiscount
          }
        })


        let OrderProjectRefNo = ""
 
        if(Orders[i].OrderNo.includes("/V-"))
        {
         let hyphen = Orders[i].OrderNo.lastIndexOf("/V-");
         let tempproref = Orders[i].OrderNo.substring(0, hyphen);
         let slash = tempproref.lastIndexOf("/");
         let proref = tempproref.substring(slash + 1, hyphen); 
         OrderProjectRefNo = proref
        }
     
        if(!Orders[i].OrderNo.includes("/V-"))
        {
         let slash = Orders[i].OrderNo.lastIndexOf("/");
         let proref = Orders[i].OrderNo.substring(slash+ 1, Orders[i].OrderNo.length);
         OrderProjectRefNo = proref
        }

        SpecialRequests.map((item)=>{
          if(item.OrderNo==OrderProjectRefNo)
          {
            DealerDiscount = item.NewDealerDiscount
          }
        })
 

        var CSValue = 0;
        

        if(DealerDiscount!=="0")
        {
         CSValue = (Math.ceil(Number(Orders[i].GrandTotal)-Number(Orders[i].GrandTotal)*0.01*Number(DealerDiscount)))
        }
        if(DealerDiscount==="0")
        {
          CSValue = Number(Orders[i].FinalAmount)
        }

       
        

        
       
            
    


  
        var OrdersReps = [];
        for(q=0;q<ProjectReport.length;q++)
        {
          if(ProjectReport[q].PROJREFNO==OrderProjectRefNo)
          {
            if(Orders[i].CommercialWinDate&&Orders[i].Status=="Win")
            {
                    
               if(ProjectReport[q].PROJREFNO==OrderProjectRefNo)
              {
                
                if(!OrdersReps.includes(ProjectReport[q].PROJREFNO))
                {
                  if(Orders[i].Associate==Associates[p])
                {
                         
                  let Collection = 0
                  let Dispatch = 0 

                  if(ProjectReport[q].INVOICECOLLECTION)
                  {
                   Collection = Number(ProjectReport[q].INVOICECOLLECTION)
                  }

                  if(ProjectReport[q].DISPATCHPIVALUE)
                  {
                   Dispatch = Number(ProjectReport[q].DISPATCHPIVALUE)
                  }
               
                   let OutStanding = Collection - Dispatch

                   if(OutStanding<0)
                   {
                       TotalOutStanding = TotalOutStanding+ Number(OutStanding)
                   }
                    
                  }
                }

                OrdersReps.push(ProjectReport[q].PROJREFNO)

               }

            }
          }
        }


        for(var r=0; r<FullSalesReportData.length;r++)
        {
          if(FullSalesReportData[r].PROJREFNO==OrderProjectRefNo&&Orders[i].Associate==Associates[p])
          {
            MonthReceipt = MonthReceipt + FullSalesReportData[r].Collection;
            MonthBilling = MonthBilling + FullSalesReportData[r].Sales;
          }
        }

        for(var s=0; s<YesterdaySalesData.length;s++)
        {
          if(YesterdaySalesData[s].PROJREFNO==OrderProjectRefNo&&Orders[i].Associate==Associates[p])
          {
            YesterdayReceipt = YesterdayReceipt + YesterdaySalesData[s].Collection; 
            YesterdayBilling = YesterdayBilling + YesterdaySalesData[s].Sales;
          }
        }



         if(Orders[i].CreationDate && Orders[i].Status==="Pipeline")
         {
           var CrDate =  Orders[i].CreationDate.split("-")[0];
           var CrMonth = Orders[i].CreationDate.split("-")[1];
           var CrYear = Orders[i].CreationDate.split("-")[2];
 
           var CreationDateFor = CrMonth+ "/" + CrDate + "/" + CrYear
 
           var CreationDate =new Date(CreationDateFor)
 
           CreationDate.setHours(0);
           CreationDate.setMinutes(0);
           CreationDate.setSeconds(0);
           CreationDate.setMilliseconds(0);
 
 
           if(CreationDate<=today&&CreationDate>=FirstCurrent&&Orders[i].Associate===Associates[p])
           {
 
            MonthPipelineCount = MonthPipelineCount + 1
            MonthPipelineAmount = MonthPipelineAmount+ Number(Orders[i].FinalAmount)
            MonthPipelineAmountCS = MonthPipelineAmountCS + CSValue


           }

           if(CreationDate<=yesterday&&CreationDate>=yesterday&&Orders[i].Associate===Associates[p])
           {
 
            YesterdayPipelineCount = YesterdayPipelineCount + 1
            YesterdayPipelineAmount = YesterdayPipelineAmount+ Number(Orders[i].FinalAmount)
            YesterdayPipelineAmountCS = YesterdayPipelineAmountCS + CSValue

  

           }
 
 
         }



         if(Orders[i].CommercialWinDate && Orders[i].Status=="Win")
         {
           var WDate =  Orders[i].CommercialWinDate.split("-")[0];
           var WMonth = Orders[i].CommercialWinDate.split("-")[1];
           var WYear = Orders[i].CommercialWinDate.split("-")[2];
 
           var WinDateFor = WMonth+ "/" + WDate + "/" + WYear
 
           var WinDate =new Date(WinDateFor)
 
           WinDate.setHours(0);
           WinDate.setMinutes(0);
           WinDate.setSeconds(0);
           WinDate.setMilliseconds(0);

           

           if(WinDate<=today&&WinDate>=FirstCurrent&&Orders[i].Associate===Associates[p])
           {
 
            MonthWinCount = MonthWinCount + 1
            MonthWinAmount = MonthWinAmount+ Number(Orders[i].FinalAmount)
            MonthWinAmountCS = MonthWinAmountCS + CSValue

           }

           if(WinDate<=yesterday&&WinDate>=yesterday&&Orders[i].Associate===Associates[p])
           {
 
            YesterdayWinCount = YesterdayWinCount + 1
            YesterdayWinAmount = YesterdayWinAmount+ Number(Orders[i].FinalAmount)
            YesterdayWinAmountCS = YesterdayWinAmountCS + CSValue

           }

         }



      }
      }

      if(Associates[p]=="SOCIAL")
      {
      for(var i =0; i<Orders.length; i++)
      {


        var DealerDiscount = '';

        Users.map((item)=>{
          if(item.UserFullName==Orders[i].Associate)
          {
            DealerDiscount = item.DealerDiscount
          }
        })


        let OrderProjectRefNo = ""
 
        if(Orders[i].OrderNo.includes("/V-"))
        {
         let hyphen = Orders[i].OrderNo.lastIndexOf("/V-");
         let tempproref = Orders[i].OrderNo.substring(0, hyphen);
         let slash = tempproref.lastIndexOf("/");
         let proref = tempproref.substring(slash + 1, hyphen); 
         OrderProjectRefNo = proref
        }
     
        if(!Orders[i].OrderNo.includes("/V-"))
        {
         let slash = Orders[i].OrderNo.lastIndexOf("/");
         let proref = Orders[i].OrderNo.substring(slash+ 1, Orders[i].OrderNo.length);
         OrderProjectRefNo = proref
        }

        SpecialRequests.map((item)=>{
          if(item.OrderNo==OrderProjectRefNo)
          {
            DealerDiscount = item.NewDealerDiscount
          }
        })
 

        var CSValue = 0;
        

        if(DealerDiscount!=="0")
        {
         CSValue = (Math.ceil(Number(Orders[i].GrandTotal)-Number(Orders[i].GrandTotal)*0.01*Number(DealerDiscount)))
        }
        if(DealerDiscount==="0")
        {
          CSValue = Number(Orders[i].FinalAmount)
        }

       
        

        
       
            
    


  
        var OrdersReps = [];
        for(q=0;q<ProjectReport.length;q++)
        {
          if(ProjectReport[q].PROJREFNO==OrderProjectRefNo)
          {
            if(Orders[i].CommercialWinDate && Orders[i].Status =="Win")
            {
                    
               if(ProjectReport[q].PROJREFNO==OrderProjectRefNo)
              {
                
                if(!OrdersReps.includes(ProjectReport[q].PROJREFNO))
                {
                  if(Orders[i].Source=="SOCIAL")
                {
                         
                  let Collection = 0
                  let Dispatch = 0 

                  if(ProjectReport[q].INVOICECOLLECTION)
                  {
                   Collection = Number(ProjectReport[q].INVOICECOLLECTION)
                  }

                  if(ProjectReport[q].DISPATCHPIVALUE)
                  {
                   Dispatch = Number(ProjectReport[q].DISPATCHPIVALUE)
                  }
               
                   let OutStanding = Collection - Dispatch

                   if(OutStanding<0)
                   {
                       TotalOutStanding = TotalOutStanding+ Number(OutStanding)
                   }
                    
                  }
                }

                OrdersReps.push(ProjectReport[q].PROJREFNO)

               }

            }
          }
        }


        for(var r=0; r<FullSalesReportData.length;r++)
        {
          if(FullSalesReportData[r].PROJREFNO==OrderProjectRefNo&&Orders[i].Source=="SOCIAL")
          {
            MonthReceipt = MonthReceipt + FullSalesReportData[r].Collection;
            MonthBilling = MonthBilling + FullSalesReportData[r].Sales;
          }
        }

        for(var s=0; s<YesterdaySalesData.length;s++)
        {
          if(YesterdaySalesData[s].PROJREFNO==OrderProjectRefNo&&Orders[i].Source=="SOCIAL")
          {
            YesterdayReceipt = YesterdayReceipt + YesterdaySalesData[s].Collection; 
            YesterdayBilling = YesterdayBilling + YesterdaySalesData[s].Sales;
          }
        }



         if(Orders[i].CreationDate&& Orders[i].Status==="Pipeline")
         {
           var CrDate =  Orders[i].CreationDate.split("-")[0];
           var CrMonth = Orders[i].CreationDate.split("-")[1];
           var CrYear = Orders[i].CreationDate.split("-")[2];
 
           var CreationDateFor = CrMonth+ "/" + CrDate + "/" + CrYear
 
           var CreationDate =new Date(CreationDateFor)
 
           CreationDate.setHours(0);
           CreationDate.setMinutes(0);
           CreationDate.setSeconds(0);
           CreationDate.setMilliseconds(0);
 
 
           if(CreationDate<=today&&CreationDate>=FirstCurrent&&Orders[i].Source=="SOCIAL")
           {
 
            MonthPipelineCount = MonthPipelineCount + 1
            MonthPipelineAmount = MonthPipelineAmount+ Number(Orders[i].FinalAmount)
            MonthPipelineAmountCS = MonthPipelineAmountCS + CSValue


           }

           if(CreationDate<=yesterday&&CreationDate>=yesterday&&Orders[i].Source=="SOCIAL")
           {
 
            YesterdayPipelineCount = YesterdayPipelineCount + 1
            YesterdayPipelineAmount = YesterdayPipelineAmount+ Number(Orders[i].FinalAmount)
            YesterdayPipelineAmountCS = YesterdayPipelineAmountCS + CSValue

  

           }
 
 
         }



         if(Orders[i].CommercialWinDate && Orders[i].Status=="Win")
         {
           var WDate =  Orders[i].CommercialWinDate.split("-")[0];
           var WMonth = Orders[i].CommercialWinDate.split("-")[1];
           var WYear = Orders[i].CommercialWinDate.split("-")[2];
 
           var WinDateFor = WMonth+ "/" + WDate + "/" + WYear
 
           var WinDate =new Date(WinDateFor)
 
           WinDate.setHours(0);
           WinDate.setMinutes(0);
           WinDate.setSeconds(0);
           WinDate.setMilliseconds(0);

           

           if(WinDate<=today&&WinDate>=FirstCurrent&&Orders[i].Source=="SOCIAL")
           {
 
            MonthWinCount = MonthWinCount + 1
            MonthWinAmount = MonthWinAmount+ Number(Orders[i].FinalAmount)
            MonthWinAmountCS = MonthWinAmountCS + CSValue

           }

           if(WinDate<=yesterday&&WinDate>=yesterday&&Orders[i].Source=="SOCIAL")
           {
 
            YesterdayWinCount = YesterdayWinCount + 1
            YesterdayWinAmount = YesterdayWinAmount+ Number(Orders[i].FinalAmount)
            YesterdayWinAmountCS = YesterdayWinAmountCS + CSValue

           }

         }



      }
      }


      var temp = {
        Associate : Associates[p],
        YesterdayPipelineAmount : YesterdayPipelineAmount.toFixed(0),
        YesterdayPipelineAmountCS : YesterdayPipelineAmountCS.toFixed(0),
        YesterdayWinAmount : YesterdayWinAmount.toFixed(0),
        YesterdayWinAmountCS : YesterdayWinAmountCS.toFixed(0),
        YesterdayWinCount : YesterdayWinCount,
        YesterdayPipelineCount : YesterdayPipelineCount,
        YesterdayReceipt : YesterdayReceipt,
        YesterdayBilling : YesterdayBilling,
        MonthPipelineAmount : MonthPipelineAmount.toFixed(0),
        MonthPipelineAmountCS : MonthPipelineAmountCS.toFixed(0),
        MonthWinAmount : MonthWinAmount.toFixed(0),
        MonthWinAmountCS : MonthWinAmountCS.toFixed(0),
        MonthWinCount : MonthWinCount,
        MonthPipelineCount : MonthPipelineCount,
        MonthReceipt : MonthReceipt,
        MonthBilling : MonthBilling,
        TotalOutStanding : TotalOutStanding
      }


      FullData.push(temp)



      
      var transporter = nodemail.createTransport({
        service : 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        pool: true,
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
            partialsDir: path.resolve(__dirname, "views6"),
            defaultLayout: false,
          },
          viewPath : path.resolve(__dirname, "views6"),
          extName: ".handlebars"
         }
      ));
      
      
       
      var mailOptions = {
        from : 'it@jbglass.in',
        to : 'pulkit@jbglass.in',//'gaurav@jbglass.in',
      //  cc :  'pulkit@ajaca.co.in,it@jbglass.in,sanchit@jbglass.in',
        subject : 'DAILY ASSOCIATE ANALYSIS REPORT  - '+ Associates[p],
        template : 'associatereport',
        context: {
         StartDate : StartDate,
         EndDate : EndDate,
         Associate : Associates[p],
         YesterdayPipelineAmount : YesterdayPipelineAmount.toFixed(0),
         YesterdayPipelineAmountCS : YesterdayPipelineAmountCS.toFixed(0),
         YesterdayWinAmount : YesterdayWinAmount.toFixed(0),
         YesterdayWinAmountCS : YesterdayWinAmountCS.toFixed(0),
         YesterdayWinCount : YesterdayWinCount,
         YesterdayPipelineCount : YesterdayPipelineCount,
         YesterdayReceipt : YesterdayReceipt.toFixed(0),
         YesterdayBilling : YesterdayBilling.toFixed(0),
         MonthPipelineAmount : MonthPipelineAmount.toFixed(0),
         MonthPipelineAmountCS : MonthPipelineAmountCS.toFixed(0),
         MonthWinAmount : MonthWinAmount.toFixed(0),
         MonthWinAmountCS : MonthWinAmountCS.toFixed(0),
         MonthWinCount : MonthWinCount,
         MonthPipelineCount : MonthPipelineCount,
         MonthReceipt : MonthReceipt.toFixed(0),
         MonthBilling : MonthBilling.toFixed(0),
         TotalOutStanding : TotalOutStanding.toFixed(0)   
        
           
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

   

    //=============For Regionwise==============================================================
/*
   var RegionwiseData =[]

   var Region = ""
   var RYesterdayPipelineAmount  = 0
   var RYesterdayPipelineAmountCS  = 0
   var RYesterdayWinAmount = 0
   var RYesterdayWinAmountCS = 0
   var RYesterdayWinCount = 0
   var RYesterdayPipelineCount = 0
   var RYesterdayReceipt = 0 
   var RYesterdayBilling = 0
   var RMonthPipelineAmount  = 0
   var RMonthPipelineAmountCS = 0
   var RMonthWinAmount = 0
   var RMonthWinAmountCS = 0
   var RMonthWinCount = 0
   var RMonthPipelineCount = 0
   var RMonthReceipt = 0
   var RMonthBilling = 0
   var RTotalOutStanding = 0 


     for(var i =0 ; i < FullData.length ; i ++)
     {

      if(FullData[i].Associate == "NAYAN PATIL"||FullData[i].Associate == "UTKALIKA")
      {
       
        Region = "Bangalore"
        RYesterdayPipelineAmount = RYesterdayPipelineAmount + Number(FullData[i].YesterdayPipelineAmount)
        RYesterdayPipelineAmountCS = RYesterdayPipelineAmountCS + Number(FullData[i].YesterdayPipelineAmountCS)
        RYesterdayWinAmount = RYesterdayWinAmount + Number(FullData[i].YesterdayWinAmount)
        RYesterdayWinAmountCS = RYesterdayWinAmountCS + Number(FullData[i].YesterdayWinAmountCS)
        RYesterdayWinCount = RYesterdayWinCount + Number(FullData[i].YesterdayWinCount)
        RYesterdayPipelineCount = RYesterdayPipelineCount + Number(FullData[i].YesterdayPipelineCount)
        RYesterdayReceipt = RYesterdayReceipt + Number(FullData[i].YesterdayReceipt)
        RYesterdayBilling = RYesterdayBilling + Number(FullData[i].YesterdayBilling)
        RMonthPipelineAmount = RMonthPipelineAmount + Number(FullData[i].MonthPipelineAmount)
        RMonthPipelineAmountCS = RMonthPipelineAmountCS + Number(FullData[i].MonthPipelineAmountCS)
        RMonthWinAmount = RMonthWinAmount + Number(FullData[i].MonthWinAmount)
        RMonthWinAmountCS = RMonthWinAmountCS + Number(FullData[i].MonthWinAmountCS)
        RMonthWinCount = RMonthWinCount + Number(FullData[i].MonthWinCount)
        RMonthPipelineCount = RMonthPipelineCount +  Number(FullData[i].MonthPipelineCount)
        RMonthReceipt = RMonthReceipt + Number(FullData[i].MonthReceipt)
        RMonthBilling = RMonthBilling + Number(FullData[i].MonthBilling)
        RTotalOutStanding = RTotalOutStanding + Number(FullData[i].TotalOutStanding)



       
      }

      if(FullData[i].Associate == "SHASHANK SINGH"||FullData[i].Associate == "VIKAS SINGHAL"||FullData[i].Associate == "ANKIT AGGARWAL"||FullData[i].Associate == "ANUJ JAIN" ||FullData[i].Associate == "VIPIN KUMAR")
      {
        Region = "Delhi"
        RYesterdayPipelineAmount = RYesterdayPipelineAmount + Number(FullData[i].YesterdayPipelineAmount)
        RYesterdayPipelineAmountCS = RYesterdayPipelineAmountCS + Number(FullData[i].YesterdayPipelineAmountCS)
        RYesterdayWinAmount = RYesterdayWinAmount + Number(FullData[i].YesterdayWinAmount)
        RYesterdayWinAmountCS = RYesterdayWinAmountCS + Number(FullData[i].YesterdayWinAmountCS)
        RYesterdayWinCount = RYesterdayWinCount + Number(FullData[i].YesterdayWinCount)
        RYesterdayPipelineCount = RYesterdayPipelineCount + Number(FullData[i].YesterdayPipelineCount)
        RYesterdayReceipt = RYesterdayReceipt + Number(FullData[i].YesterdayReceipt)
        RYesterdayBilling = RYesterdayBilling + Number(FullData[i].YesterdayBilling)
        RMonthPipelineAmount = RMonthPipelineAmount + Number(FullData[i].MonthPipelineAmount)
        RMonthPipelineAmountCS = RMonthPipelineAmountCS + Number(FullData[i].MonthPipelineAmountCS)
        RMonthWinAmount = RMonthWinAmount + Number(FullData[i].MonthWinAmount)
        RMonthWinAmountCS = RMonthWinAmountCS + Number(FullData[i].MonthWinAmountCS)
        RMonthWinCount = RMonthWinCount + Number(FullData[i].MonthWinCount)
        RMonthPipelineCount = RMonthPipelineCount +  Number(FullData[i].MonthPipelineCount)
        RMonthReceipt = RMonthReceipt + Number(FullData[i].MonthReceipt)
        RMonthBilling = RMonthBilling + Number(FullData[i].MonthBilling)
        RTotalOutStanding = RTotalOutStanding + Number(FullData[i].TotalOutStanding)
        
      }

      if(FullData[i].Associate == "RIYAZ SAYYED"||FullData[i].Associate == "SAKINA BATISH")
      {
        Region = "Mumbai"
        RYesterdayPipelineAmount = RYesterdayPipelineAmount + Number(FullData[i].YesterdayPipelineAmount)
        RYesterdayPipelineAmountCS = RYesterdayPipelineAmountCS + Number(FullData[i].YesterdayPipelineAmountCS)
        RYesterdayWinAmount = RYesterdayWinAmount + Number(FullData[i].YesterdayWinAmount)
        RYesterdayWinAmountCS = RYesterdayWinAmountCS + Number(FullData[i].YesterdayWinAmountCS)
        RYesterdayWinCount = RYesterdayWinCount + Number(FullData[i].YesterdayWinCount)
        RYesterdayPipelineCount = RYesterdayPipelineCount + Number(FullData[i].YesterdayPipelineCount)
        RYesterdayReceipt = RYesterdayReceipt + Number(FullData[i].YesterdayReceipt)
        RYesterdayBilling = RYesterdayBilling + Number(FullData[i].YesterdayBilling)
        RMonthPipelineAmount = RMonthPipelineAmount + Number(FullData[i].MonthPipelineAmount)
        RMonthPipelineAmountCS = RMonthPipelineAmountCS + Number(FullData[i].MonthPipelineAmountCS)
        RMonthWinAmount = RMonthWinAmount + Number(FullData[i].MonthWinAmount)
        RMonthWinAmountCS = RMonthWinAmountCS + Number(FullData[i].MonthWinAmountCS)
        RMonthWinCount = RMonthWinCount + Number(FullData[i].MonthWinCount)
        RMonthPipelineCount = RMonthPipelineCount +  Number(FullData[i].MonthPipelineCount)
        RMonthReceipt = RMonthReceipt + Number(FullData[i].MonthReceipt)
        RMonthBilling = RMonthBilling + Number(FullData[i].MonthBilling)
        RTotalOutStanding = RTotalOutStanding + Number(FullData[i].TotalOutStanding)
        
      }

      if(FullData[i].Associate == "RAHUL JAISWAL")
      {
        Region = "Surat"
        RYesterdayPipelineAmount = RYesterdayPipelineAmount + Number(FullData[i].YesterdayPipelineAmount)
        RYesterdayPipelineAmountCS = RYesterdayPipelineAmountCS + Number(FullData[i].YesterdayPipelineAmountCS)
        RYesterdayWinAmount = RYesterdayWinAmount + Number(FullData[i].YesterdayWinAmount)
        RYesterdayWinAmountCS = RYesterdayWinAmountCS + Number(FullData[i].YesterdayWinAmountCS)
        RYesterdayWinCount = RYesterdayWinCount + Number(FullData[i].YesterdayWinCount)
        RYesterdayPipelineCount = RYesterdayPipelineCount + Number(FullData[i].YesterdayPipelineCount)
        RYesterdayReceipt = RYesterdayReceipt + Number(FullData[i].YesterdayReceipt)
        RYesterdayBilling = RYesterdayBilling + Number(FullData[i].YesterdayBilling)
        RMonthPipelineAmount = RMonthPipelineAmount + Number(FullData[i].MonthPipelineAmount)
        RMonthPipelineAmountCS = RMonthPipelineAmountCS + Number(FullData[i].MonthPipelineAmountCS)
        RMonthWinAmount = RMonthWinAmount + Number(FullData[i].MonthWinAmount)
        RMonthWinAmountCS = RMonthWinAmountCS + Number(FullData[i].MonthWinAmountCS)
        RMonthWinCount = RMonthWinCount + Number(FullData[i].MonthWinCount)
        RMonthPipelineCount = RMonthPipelineCount +  Number(FullData[i].MonthPipelineCount)
        RMonthReceipt = RMonthReceipt + Number(FullData[i].MonthReceipt)
        RMonthBilling = RMonthBilling + Number(FullData[i].MonthBilling)
        RTotalOutStanding = RTotalOutStanding + Number(FullData[i].TotalOutStanding)
        
      }

      if(FullData[i].Associate == "RAJENDRA BADAYA")
      {
        Region = "Jaipur"
        RYesterdayPipelineAmount = RYesterdayPipelineAmount + Number(FullData[i].YesterdayPipelineAmount)
        RYesterdayPipelineAmountCS = RYesterdayPipelineAmountCS + Number(FullData[i].YesterdayPipelineAmountCS)
        RYesterdayWinAmount = RYesterdayWinAmount + Number(FullData[i].YesterdayWinAmount)
        RYesterdayWinAmountCS = RYesterdayWinAmountCS + Number(FullData[i].YesterdayWinAmountCS)
        RYesterdayWinCount = RYesterdayWinCount + Number(FullData[i].YesterdayWinCount)
        RYesterdayPipelineCount = RYesterdayPipelineCount + Number(FullData[i].YesterdayPipelineCount)
        RYesterdayReceipt = RYesterdayReceipt + Number(FullData[i].YesterdayReceipt)
        RYesterdayBilling = RYesterdayBilling + Number(FullData[i].YesterdayBilling)
        RMonthPipelineAmount = RMonthPipelineAmount + Number(FullData[i].MonthPipelineAmount)
        RMonthPipelineAmountCS = RMonthPipelineAmountCS + Number(FullData[i].MonthPipelineAmountCS)
        RMonthWinAmount = RMonthWinAmount + Number(FullData[i].MonthWinAmount)
        RMonthWinAmountCS = RMonthWinAmountCS + Number(FullData[i].MonthWinAmountCS)
        RMonthWinCount = RMonthWinCount + Number(FullData[i].MonthWinCount)
        RMonthPipelineCount = RMonthPipelineCount +  Number(FullData[i].MonthPipelineCount)
        RMonthReceipt = RMonthReceipt + Number(FullData[i].MonthReceipt)
        RMonthBilling = RMonthBilling + Number(FullData[i].MonthBilling)
        RTotalOutStanding = RTotalOutStanding + Number(FullData[i].TotalOutStanding)
        
      }

      if(FullData[i].Associate == "VISHAL PARIKH")
      {
        Region = "Ahmedabad"
        RYesterdayPipelineAmount = RYesterdayPipelineAmount + Number(FullData[i].YesterdayPipelineAmount)
        RYesterdayPipelineAmountCS = RYesterdayPipelineAmountCS + Number(FullData[i].YesterdayPipelineAmountCS)
        RYesterdayWinAmount = RYesterdayWinAmount + Number(FullData[i].YesterdayWinAmount)
        RYesterdayWinAmountCS = RYesterdayWinAmountCS + Number(FullData[i].YesterdayWinAmountCS)
        RYesterdayWinCount = RYesterdayWinCount + Number(FullData[i].YesterdayWinCount)
        RYesterdayPipelineCount = RYesterdayPipelineCount + Number(FullData[i].YesterdayPipelineCount)
        RYesterdayReceipt = RYesterdayReceipt + Number(FullData[i].YesterdayReceipt)
        RYesterdayBilling = RYesterdayBilling + Number(FullData[i].YesterdayBilling)
        RMonthPipelineAmount = RMonthPipelineAmount + Number(FullData[i].MonthPipelineAmount)
        RMonthPipelineAmountCS = RMonthPipelineAmountCS + Number(FullData[i].MonthPipelineAmountCS)
        RMonthWinAmount = RMonthWinAmount + Number(FullData[i].MonthWinAmount)
        RMonthWinAmountCS = RMonthWinAmountCS + Number(FullData[i].MonthWinAmountCS)
        RMonthWinCount = RMonthWinCount + Number(FullData[i].MonthWinCount)
        RMonthPipelineCount = RMonthPipelineCount +  Number(FullData[i].MonthPipelineCount)
        RMonthReceipt = RMonthReceipt + Number(FullData[i].MonthReceipt)
        RMonthBilling = RMonthBilling + Number(FullData[i].MonthBilling)
        RTotalOutStanding = RTotalOutStanding + Number(FullData[i].TotalOutStanding)
        
      }



      var temp = {

         Region : Region,
         YesterdayPipelineAmount :RYesterdayPipelineAmount,
         YesterdayPipelineAmountCS :RYesterdayPipelineAmountCS,
         YesterdayWinAmount  :RYesterdayWinAmount,
         YesterdayWinAmountCS  :RYesterdayWinAmountCS,
         YesterdayWinCount  :RYesterdayWinCount,
         YesterdayPipelineCount  :RYesterdayPipelineCount,
         YesterdayReceipt  :RYesterdayReceipt,
         YesterdayBilling  :RYesterdayBilling,
         MonthPipelineAmount  :RMonthPipelineAmount,
         MonthPipelineAmountCS :RMonthPipelineAmountCS,
         MonthWinAmount :RMonthWinAmount,
         MonthWinAmountCS :RMonthWinAmountCS,
         MonthWinCount  :RMonthWinCount,
         MonthPipelineCount  :RMonthPipelineCount,
         MonthReceipt  :RMonthReceipt,
         MonthBilling  :RMonthBilling,
         TotalOutStanding  :RTotalOutStanding

      }

      RegionwiseData.push(temp)

     }

  
   
     for(var i =0 ; i<Regions.length; i++)
     {
        for(j=0;j<RegionwiseData.length;j++)
        {
          
        }
     }



          
     var transporter = nodemail.createTransport({
      service : 'gmail',
      auth : {
        user : 'it@jbglass.in',
        pass : 'pandey@ap1211'
      }
    }); 
    
    transporter.use('compile', hbs(
      {
        viewEngine : 
        {
          extName: ".handlebars",
          partialsDir: path.resolve(__dirname, "views8"),
          defaultLayout: false,
        },
        viewPath : path.resolve(__dirname, "views8"),
        extName: ".handlebars"
       }
    ));
    
    
     
    var mailOptions = {
      from : 'it@jbglass.in',
      to : 'it@jbglass.in',//'gaurav@jbglass.in',
     // cc :  'pulkit@ajaca.co.in,it@jbglass.in,sanchit@jbglass.in',
      subject : 'DAILY ASSOCIATE ANALYSIS REPORT - REGIONWISE',
      template : 'regionwise',
      context: {
       StartDate : StartDate,
       EndDate : EndDate,
       RegionwiseData : RegionwiseData
       
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

*/

  })









    })

   })
   

 

},{
    scheduled: true,
    timezone: "Asia/Kolkata"
 
});








function GetDateFormat(StartDate)
{

  var monthS = StartDate.getMonth()+1
 


  let SMonthFormat='';
  if(monthS==1)
  {
    SMonthFormat = "Jan"
  }
  if(monthS==2)
  {
    SMonthFormat = "Feb"
  }
  if(monthS==3)
  {
    SMonthFormat = "Mar"
  }
  if(monthS==4)
  {
    SMonthFormat = "Apr"
  }
  if(monthS==5)
  {
    SMonthFormat = "May"
  }
  if(monthS==6)
  {
    SMonthFormat = "Jun"
  }
  if(monthS==7)
  {
    SMonthFormat = "Jul"
  }
  if(monthS==8)
  {
    SMonthFormat = "Aug"
  }
  if(monthS==9)
  {
    SMonthFormat = "Sep"
  }
  if(monthS==10)
  {
    SMonthFormat = "Oct"
  }
  if(monthS==11)
  {
    SMonthFormat = "Nov"
  }
  if(monthS==12)
  {
    SMonthFormat = "Dec"
  }



  var DateS = StartDate.getDate()
  var YearS = StartDate.getFullYear()

  var NewDateFormat = DateS + "-"+SMonthFormat+"-"+YearS

  return NewDateFormat

}




async function GetSalesDataCS(StartDate,EndDate,SpecialRequests)
{
 
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjSalesCol?FromDate=${StartDate}&ToDate=${EndDate}&refno=`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
     }
    
   
  })
 
  const data = await res.json();
  
  var Details = {
    SalesData : data,
    SpecialRequests : SpecialRequests
  }
 
  return Details

}


async function GetCSDateRangeData(StartDate,EndDate,SalesReportData,SpecialRequests)
{
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjectJsonOnlineAll?Sdate=01-Jan-2020&Edate=${EndDate}`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
     }
    
   
  })
 
  const data = await res.json();

  let Details = {ProjectReport : data , SalesReportData : SalesReportData , SpecialRequests : SpecialRequests}
  

  return Details

}




async function GetYesterdaySalesDataCS(StartDate,EndDate,SpecialRequests,SalesReportData,ProjectReport)
{
 
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjSalesCol?FromDate=${StartDate}&ToDate=${StartDate}&refno=`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
     }
    
   
  })
 
  const data = await res.json();
  
  var Details = {
    YesterdaySalesData : data,
    SpecialRequests : SpecialRequests,
    FullSalesReportData : SalesReportData,
    ProjectReport : ProjectReport
  }
 
  return Details

}



module.exports = cron;





/*






   var today = new Date();
        var currentMonth = new Date();
   
        var FirstCurrent =  new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        
        var PipelineOrders = [];
  
        var FormattedPipelineOrders = [];

        var WinOrders = [];
        var FormattedWinOrders = [];
        

 
        var TempSalesReport = []
        
        
        for(var i = 0; i<Orders.length; i++)
        {

            if(Orders[i].EditDate)
            {
            var EditDate = Number(Orders[i].EditDate.split('-')[0])
            var EditMonth = Number(Orders[i].EditDate.split('-')[1])
            var EditYear = Number(Orders[i].EditDate.split('-')[2])
            var DateFormat = EditMonth+ "/" + EditDate + "/" + EditYear       
 
            var PipelineDate = new Date(DateFormat)
            


            if(PipelineDate>=FirstCurrent&&PipelineDate<=today&&Orders[i].Status=="Pipeline")
            {
              PipelineOrders.push(Orders[i])
            }

            }

            if(Orders[i].CommercialWinDate)
            {
            var WinDate = Number(Orders[i].CommercialWinDate.split('-')[0])
            var WinMonth = Number(Orders[i].CommercialWinDate.split('-')[1])
            var WinYear = Number(Orders[i].CommercialWinDate.split('-')[2])
            var WinDateFormat = WinMonth+ "/" + WinDate + "/" + WinYear     
 
            var WinDate = new Date(WinDateFormat)
            
           
                if(WinDate>=FirstCurrent&&WinDate<=today)
                {
                  WinOrders.push(Orders[i])
                }
            }
            
 
            let OrderProjectRefNo = ""
    
            if(Orders[i].OrderNo.includes("/V-"))
            {
             let hyphen = Orders[i].OrderNo.lastIndexOf("/V-");
             let tempproref = Orders[i].OrderNo.substring(0, hyphen);
             let slash = tempproref.lastIndexOf("/");
             let proref = tempproref.substring(slash + 1, hyphen); 
             OrderProjectRefNo = proref
            }
         
            if(!Orders[i].OrderNo.includes("/V-"))
            {
             let slash = Orders[i].OrderNo.lastIndexOf("/");
             let proref = Orders[i].OrderNo.substring(slash+ 1, Orders[i].OrderNo.length);
             OrderProjectRefNo = proref
            }
          



            SalesReportData.map(item=>{
                if(OrderProjectRefNo == item.PROJREFNO)
                {
                    let temp = {Collection : item.Collection,Sales : item.Sales, OrderNo : item.PROJREFNO, Associate :Orders[i].Associate }
                    TempSalesReport.push(temp)
                
                }
            })


        }


        for(var i = 0; i<PipelineOrders.length; i++)
    {

        
        let OrderProjectRefNo = ""

        if(PipelineOrders[i].OrderNo.includes("/V-"))
        {
         let hyphen = PipelineOrders[i].OrderNo.lastIndexOf("/V-");
         let tempproref = PipelineOrders[i].OrderNo.substring(0, hyphen);
         let slash = tempproref.lastIndexOf("/");
         let proref = tempproref.substring(slash + 1, hyphen); 
         OrderProjectRefNo = proref
        }
     
        if(!PipelineOrders[i].OrderNo.includes("/V-"))
        {
         let slash = PipelineOrders[i].OrderNo.lastIndexOf("/");
         let proref = PipelineOrders[i].OrderNo.substring(slash+ 1, PipelineOrders[i].OrderNo.length);
         OrderProjectRefNo = proref
        }
     
        
         
        let DealerDiscount = '';

        Users.map((item)=>{
          if(item.UserFullName==PipelineOrders[i].Associate)
          {
            DealerDiscount = item.DealerDiscount
          }
        })


        SpecialRequests.map((item)=>{
          if(item.OrderNo==OrderProjectRefNo)
          {
            DealerDiscount = item.NewDealerDiscount
          }
        })
        
        let CSValue = "";

        if(DealerDiscount!=="0")
        {
         CSValue = (Math.ceil(Number(PipelineOrders[i].GrandTotal)-Number(PipelineOrders[i].GrandTotal)*0.01*Number(DealerDiscount))).toString()
        }
        if(DealerDiscount=="0")
        {
          CSValue = PipelineOrders[i].FinalAmount
        }
         
   

        let Source = ""

if(PipelineOrders[i].Associate=="RIYAZ SAYYED"||PipelineOrders[i].Associate=="SAKINA")
{
 Source = "Mumbai"
}

if(PipelineOrders[i].Associate=="NAYAN PATIL")
{
 Source = "Bangalore"
}

if(PipelineOrders[i].Associate=="RUCHIR")
{
  Source = "Hyderabad"
}

if(PipelineOrders[i].Associate=="RAHUL JAISWAL")
{
  Source = "Surat"  
}

if(PipelineOrders[i].Associate=="VISHAL PARIKH")
{
  Source = "Ahmedabad"
}

if(PipelineOrders[i].Associate=="RAJENDRA BADAYA")
{
 Source = "Jaipur"
}
   
if(PipelineOrders[i].Associate=="SHASHANK SINGH"||PipelineOrders[i].Associate=="VIKAS SINGHAL"||PipelineOrders[i].Associate=="ANKIT AGGARWAL"||PipelineOrders[i].Associate=="VIPIN MITTAL"||PipelineOrders[i].Associate=="ANUJ JAIN")
{
 Source = "Delhi"
}

       

        var temp = { FinalValue : PipelineOrders[i].FinalAmount, Source : Source, Associate : PipelineOrders[i].Associate,CSValue : CSValue}
        
        FormattedPipelineOrders.push(temp)
       
        }


        for(var i = 0; i<WinOrders.length; i++)
        {
    
        
        let OrderProjectRefNo = ""
    
        if(WinOrders[i].OrderNo.includes("/V-"))
        {
         let hyphen = WinOrders[i].OrderNo.lastIndexOf("/V-");
         let tempproref = WinOrders[i].OrderNo.substring(0, hyphen);
         let slash = tempproref.lastIndexOf("/");
         let proref = tempproref.substring(slash + 1, hyphen); 
         OrderProjectRefNo = proref
        }
     
        if(!WinOrders[i].OrderNo.includes("/V-"))
        {
         let slash = WinOrders[i].OrderNo.lastIndexOf("/");
         let proref = WinOrders[i].OrderNo.substring(slash+ 1, WinOrders[i].OrderNo.length);
         OrderProjectRefNo = proref
        }
     
        
         
        let DealerDiscount = '';
    
        Users.map((item)=>{
          if(item.UserFullName==WinOrders[i].Associate)
          {
            DealerDiscount = item.DealerDiscount
          }
        })
    
    
        SpecialRequests.map((item)=>{
          if(item.OrderNo==OrderProjectRefNo)
          {
            DealerDiscount = item.NewDealerDiscount
          }
        })
        
        let CSValue = "";
    
        if(DealerDiscount!=="0")
        {
         CSValue = (Math.ceil(Number(WinOrders[i].GrandTotal)-Number(WinOrders[i].GrandTotal)*0.01*Number(DealerDiscount))).toString()
        }
        if(DealerDiscount=="0")
        {
          CSValue = WinOrders[i].FinalAmount
        }
    



        let BillingPR = 0
        let ReceiptPR = 0

        
           for(var k = 0; k < ProjectReport.length ; k++  )
           {

         

            if(OrderProjectRefNo==ProjectReport[k].PROJREFNO)
            {

               if(ProjectReport[k].DISPATCHPIVALUE)
               {
                BillingPR =ProjectReport[k].DISPATCHPIVALUE
               }
              
               if(ProjectReport[k].INVOICECOLLECTION)
               {
                ReceiptPR =ProjectReport[k].INVOICECOLLECTION
               }
               
            }

           }



           let Source = ""

if(WinOrders[i].Associate=="RIYAZ SAYYED"||WinOrders[i].Associate=="SAKINA")
{
 Source = "Mumbai"
}

if(WinOrders[i].Associate=="NAYAN PATIL"||WinOrders[i].Associate=="UTKALIKA")
{
 Source = "Bangalore"
}

if(WinOrders[i].Associate=="RUCHIR")
{
  Source = "Hyderabad"
}

if(WinOrders[i].Associate=="RAHUL JAISWAL")
{
  Source = "Surat"  
}

if(WinOrders[i].Associate=="VISHAL PARIKH")
{
  Source = "Ahmedabad"
}

if(WinOrders[i].Associate=="RAJENDRA BADAYA")
{
 Source = "Jaipur"
}

if(WinOrders[i].Associate=="SHASHANK SINGH"||WinOrders[i].Associate=="VIKAS SINGHAL"||WinOrders[i].Associate=="ANKIT AGGARWAL"||WinOrders[i].Associate=="VIPIN MITTAL"||WinOrders[i].Associate=="ANUJ JAIN")
{
 Source = "Delhi"
}

if(WinOrders[i].Associate=="JB ACCOUNTS")
{
 Source = "JB Accounts"
}
   
    
        var temp = { FinalValue : WinOrders[i].FinalAmount, Source : Source, Associate : WinOrders[i].Associate,CSValue : CSValue, BillingPR : BillingPR, ReceiptPR :ReceiptPR}
      
        FormattedWinOrders.push(temp)
     
        }

        var FormattedSalesReport = []
        for(var p=0;p<TempSalesReport.length;p++)
        {
           
           if(TempSalesReport[p].Associate=="RIYAZ SAYYED"||TempSalesReport[p].Associate=="SAKINA")
           {
            let Temp = {Office : "Mumbai", Receipt : TempSalesReport[p].Collection, Billing : TempSalesReport[p].Sales, OrderNo : TempSalesReport[p].OrderNo}
            FormattedSalesReport.push(Temp)
           }

           if(TempSalesReport[p].Associate=="NAYAN PATIL")
           {
            let Temp = {Office : "Bangalore", Receipt : TempSalesReport[p].Collection, Billing : TempSalesReport[p].Sales, OrderNo : TempSalesReport[p].OrderNo}
            FormattedSalesReport.push(Temp)
           }

           if(TempSalesReport[p].Associate=="RUCHIR")
           {
            let Temp = {Office : "Hyderabad", Receipt : TempSalesReport[p].Collection, Billing : TempSalesReport[p].Sales, OrderNo : TempSalesReport[p].OrderNo}
            FormattedSalesReport.push(Temp)
           }

           if(TempSalesReport[p].Associate=="RAHUL JAISWAL")
           {
            let Temp = {Office : "Surat", Receipt : TempSalesReport[p].Collection, Billing : TempSalesReport[p].Sales, OrderNo : TempSalesReport[p].OrderNo}
            FormattedSalesReport.push(Temp)
           }

           if(TempSalesReport[p].Associate=="VISHAL PARIKH")
           {
            let Temp = {Office : "Ahmedabad", Receipt : TempSalesReport[p].Collection, Billing : TempSalesReport[p].Sales, OrderNo : TempSalesReport[p].OrderNo}
            FormattedSalesReport.push(Temp)
           }

           if(TempSalesReport[p].Associate=="RAJENDRA BADAYA")
           {
            let Temp = {Office : "Jaipur", Receipt : TempSalesReport[p].Collection, Billing : TempSalesReport[p].Sales, OrderNo : TempSalesReport[p].OrderNo}
            FormattedSalesReport.push(Temp)
           }

        }


        
        var FinalOutput = []

    
        
        var MumbaiWinCount =0;
        var BangaloreWinCount =0;
        var HyderabadWinCount = 0;
        var SuratWinCount = 0;
        var AhmedabadWinCount = 0;
        var JaipurWinCount = 0;
        var DelhiWinCount = 0;
        var SocialWinCount = 0;
        var AccountsWinCount = 0;

        var MumbaiWinCSValue =0;
        var BangaloreWinCSValue =0;
        var HyderabadWinCSValue = 0;
        var SuratWinCSValue = 0;
        var AhmedabadWinCSValue = 0;
        var JaipurWinCSValue = 0;
        var DelhiWinCSValue = 0;
        var SocialWinCSValue = 0;
        var AccountsWinCSValue = 0;

        var MumbaiReceiptPR =0;
        var BangaloreReceiptPR =0;
        var HyderabadReceiptPR = 0;
        var SuratReceiptPR = 0;
        var AhmedabadReceiptPR = 0;
        var JaipurReceiptPR = 0;
        var DelhiReceiptPR = 0;
        var SocialReceiptPR = 0;
        var AccountsReceiptPR = 0;

        var MumbaiBillingPR =0;
        var BangaloreBillingPR =0;
        var HyderabadBillingPR = 0;
        var SuratBillingPR = 0;
        var AhmedabadBillingPR = 0;
        var JaipurBillingPR = 0;
        var DelhiBillingPR = 0;
        var SocialBillingPR = 0;
        var AccountReceiptPR = 0;




        for(var j =0; j< FormattedWinOrders.length; j++)
        {
            if(FormattedWinOrders[j].Source=="Mumbai")
            {
                MumbaiWinCount = MumbaiWinCount + 1;
                MumbaiWinCSValue = MumbaiWinCSValue + Number(FormattedWinOrders[j].CSValue);
                MumbaiReceiptPR = MumbaiReceiptPR + Number(FormattedWinOrders[j].ReceiptPR);
                MumbaiBillingPR = MumbaiBillingPR + Number(FormattedWinOrders[j].BillingPR);

            }

            if(FormattedWinOrders[j].Source=="Bangalore")
            {
                BangaloreWinCount = BangaloreWinCount + 1;
                BangaloreWinCSValue = BangaloreWinCSValue + Number(FormattedWinOrders[j].CSValue);
                BangaloreReceiptPR = BangaloreReceiptPR + Number(FormattedWinOrders[j].ReceiptPR);
                BangaloreBillingPR = BangaloreBillingPR + Number(FormattedWinOrders[j].BillingPR);

            }

            if(FormattedWinOrders[j].Source=="Hyderabad")
            {
              HyderabadWinCount = HyderabadWinCount + 1;
              HyderabadWinCSValue = HyderabadWinCSValue + Number(FormattedWinOrders[j].CSValue);
              HyderabadReceiptPR = HyderabadReceiptPR + Number(FormattedWinOrders[j].ReceiptPR);
              HyderabadBillingPR = HyderabadBillingPR + Number(FormattedWinOrders[j].BillingPR);

            }

            if(FormattedWinOrders[j].Source=="Surat")
            {
              SuratWinCount = SuratWinCount + 1;
              SuratWinCSValue = SuratWinCSValue + Number(FormattedWinOrders[j].CSValue);
              SuratReceiptPR = SuratReceiptPR + Number(FormattedWinOrders[j].ReceiptPR);
              SuratBillingPR = SuratBillingPR + Number(FormattedWinOrders[j].BillingPR);

            }

            if(FormattedWinOrders[j].Source=="Ahmedabad")
            {
             AhmedabadWinCount = AhmedabadWinCount + 1;
             AhmedabadWinCSValue = AhmedabadWinCSValue + Number(FormattedWinOrders[j].CSValue);
             AhmedabadReceiptPR = AhmedabadReceiptPR + Number(FormattedWinOrders[j].ReceiptPR);
             AhmedabadBillingPR = AhmedabadBillingPR + Number(FormattedWinOrders[j].BillingPR);

            }


            if(FormattedWinOrders[j].Source=="Jaipur")
            {
             JaipurWinCount = JaipurWinCount + 1;
             JaipurWinCSValue = JaipurWinCSValue + Number(FormattedWinOrders[j].CSValue);
             JaipurReceiptPR = JaipurReceiptPR + Number(FormattedWinOrders[j].ReceiptPR);
             JaipurBillingPR = JaipurBillingPR + Number(FormattedWinOrders[j].BillingPR);

            }

            if(FormattedWinOrders[j].Source=="Jaipur")
            {
             JaipurWinCount = JaipurWinCount + 1;
             JaipurWinCSValue = JaipurWinCSValue + Number(FormattedWinOrders[j].CSValue);
             JaipurReceiptPR = JaipurReceiptPR + Number(FormattedWinOrders[j].ReceiptPR);
             JaipurBillingPR = JaipurBillingPR + Number(FormattedWinOrders[j].BillingPR);

            }

            if(FormattedWinOrders[j].Source=="Delhi")
            {
             DelhiWinCount = DelhiWinCount + 1;
             DelhiWinCSValue = DelhiWinCSValue + Number(FormattedWinOrders[j].CSValue);
             DelhiReceiptPR = DelhiReceiptPR + Number(FormattedWinOrders[j].ReceiptPR);
             DelhiBillingPR = DelhiBillingPR + Number(FormattedWinOrders[j].BillingPR);

            }




          
        }
     

        var MumbaiPipelineCount =0;
        var BangalorePipelineCount =0;
        var HyderabadPipelineCount = 0;
        var SuratPipelineCount = 0;
        var AhmedabadPipelineCount = 0;
        var JaipurPipelineCount = 0;
        var DelhiPipelineCount = 0;


        var MumbaiPipelineFinalAmount =0;
        var BangalorePipelineFinalAmount =0;
        var HyderabadPipelineFinalAmount = 0;
        var SuratPipelineFinalAmount = 0;
        var AhmedabadPipelineFinalAmount = 0;
        var JaipurPipelineFinalAmount = 0;
        var DelhiPipelineFinalAmount = 0;

        var MumbaiPipelineCSValue =0;
        var BangalorePipelineCSValue =0;
        var HyderabadPipelineCSValue = 0;
        var SuratPipelineCSValue = 0;
        var AhmedabadPipelineCSValue = 0;
        var JaipurPipelineCSValue = 0;
        var DelhiPipelineCSValue = 0;

        



        for(var p = 0 ; p < FormattedPipelineOrders.length; p++ )
        {
            if(FormattedPipelineOrders[p].Source=="Mumbai")
            {
                MumbaiPipelineCount = MumbaiPipelineCount + 1;
                MumbaiPipelineFinalAmount = MumbaiPipelineFinalAmount + Number(FormattedPipelineOrders[p].FinalValue)
                MumbaiPipelineCSValue = MumbaiPipelineCSValue + Number(FormattedPipelineOrders[p].CSValue)
            }

            
            if(FormattedPipelineOrders[p].Source=="Bangalore")
            {
               BangalorePipelineCount = BangalorePipelineCount + 1;
               BangalorePipelineFinalAmount = BangalorePipelineFinalAmount + Number(FormattedPipelineOrders[p].FinalValue)
               BangalorePipelineCSValue = BangalorePipelineCSValue + Number(FormattedPipelineOrders[p].CSValue)
            }


            if(FormattedPipelineOrders[p].Source=="Hyderabad")
            {
                HyderabadPipelineCount = HyderabadPipelineCount + 1;
                HyderabadPipelineFinalAmount = HyderabadPipelineFinalAmount + Number(FormattedPipelineOrders[p].FinalValue)
                HyderabadPipelineCSValue = HyderabadPipelineCSValue + Number(FormattedPipelineOrders[p].CSValue)
            }

            if(FormattedPipelineOrders[p].Source=="Surat")
            {
                SuratPipelineCount = SuratPipelineCount + 1;
                SuratPipelineFinalAmount = SuratPipelineFinalAmount + Number(FormattedPipelineOrders[p].FinalValue)
                SuratPipelineCSValue = SuratPipelineCSValue + Number(FormattedPipelineOrders[p].CSValue)
            }

            if(FormattedPipelineOrders[p].Source=="Ahmedabad")
            {
                AhmedabadPipelineCount = AhmedabadPipelineCount + 1;
                AhmedabadPipelineFinalAmount = AhmedabadPipelineFinalAmount + Number(FormattedPipelineOrders[p].FinalValue)
                AhmedabadPipelineCSValue = AhmedabadPipelineCSValue + Number(FormattedPipelineOrders[p].CSValue)
            }

            if(FormattedPipelineOrders[p].Source=="Jaipur")
            {
                JaipurPipelineCount = JaipurPipelineCount + 1;
                JaipurPipelineFinalAmount = JaipurPipelineFinalAmount + Number(FormattedPipelineOrders[p].FinalValue)
                JaipurPipelineCSValue = JaipurPipelineCSValue + Number(FormattedPipelineOrders[p].CSValue)
            }

            

             if(FormattedPipelineOrders[p].Source=="Delhi")
            {
              DelhiPipelineCount = DelhiPipelineCount + 1;
              DelhiPipelineFinalAmount = DelhiPipelineFinalAmount + Number(FormattedPipelineOrders[p].FinalValue)
              DelhiPipelineCSValue = DelhiPipelineCSValue + Number(FormattedPipelineOrders[p].CSValue)
            }
        }



        var MumbaiSRReceipt =0;
        var BangaloreSRReceipt =0;
        var HyderabadSRReceipt = 0;
        var SuratSRReceipt = 0;
        var AhmedabadSRReceipt = 0;
        var JaipurSRReceipt = 0;
        var DelhiSRReceipt = 0;

        var MumbaiSRBilling =0;
        var BangaloreSRBilling =0;
        var HyderabadSRBilling = 0;
        var SuratSRBilling = 0;
        var AhmedabadSRBilling = 0;
        var JaipurSRBilling = 0;
        var DelhiSRBilling = 0;


        for(var p = 0; p <FormattedSalesReport.length;p++)
        {
            if(FormattedSalesReport[p].Office=="Mumbai")
            {
                MumbaiSRBilling = MumbaiSRBilling + Number(FormattedSalesReport[p].Billing)
                MumbaiSRReceipt = MumbaiSRReceipt + Number(FormattedSalesReport[p].Receipt)
            }

            if(FormattedSalesReport[p].Office=="Bangalore")
            {
                BangaloreSRBilling = BangaloreSRBilling + Number(FormattedSalesReport[p].Billing)
                BangaloreSRReceipt = BangaloreSRReceipt + Number(FormattedSalesReport[p].Receipt)
            }

            if(FormattedSalesReport[p].Office=="Hyderabad")
            {
                HyderabadSRBilling = HyderabadSRBilling + Number(FormattedSalesReport[p].Billing)
                HyderabadSRReceipt = HyderabadSRReceipt + Number(FormattedSalesReport[p].Receipt)
            }
            if(FormattedSalesReport[p].Office=="Surat")
            {
                SuratSRBilling = SuratSRBilling + Number(FormattedSalesReport[p].Billing)
                SuratSRReceipt = SuratSRReceipt + Number(FormattedSalesReport[p].Receipt)
            }

            if(FormattedSalesReport[p].Office=="Ahmedabad")
            {
                AhmedabadSRBilling = AhmedabadSRBilling + Number(FormattedSalesReport[p].Billing)
                AhmedabadSRReceipt = AhmedabadSRReceipt + Number(FormattedSalesReport[p].Receipt)
            }

            if(FormattedSalesReport[p].Office=="Jaipur")
            {
               JaipurSRBilling = JaipurSRBilling + Number(FormattedSalesReport[p].Billing)
               JaipurSRReceipt = JaipurSRReceipt + Number(FormattedSalesReport[p].Receipt)
            }

            if(FormattedSalesReport[p].Office=="Delhi")
            {
               DelhiSRBilling = DelhiSRBilling + Number(FormattedSalesReport[p].Billing)
               DelhiSRReceipt = DelhiSRReceipt + Number(FormattedSalesReport[p].Receipt)
            }

        }


        var temp = {"Particulars": "Mumbai", "WinCount": MumbaiWinCount, "WinCSValue":(MumbaiWinCSValue/10000000).toFixed(2),"ReceiptPR":(MumbaiReceiptPR/10000000).toFixed(2),"BillingPR": (MumbaiBillingPR/10000000).toFixed(2),"ReceiptSR":(MumbaiSRReceipt/10000000).toFixed(2),"BillingSR":(MumbaiSRBilling/10000000).toFixed(2),"PipelineCount":MumbaiPipelineCount,"FinalAmount": (MumbaiPipelineFinalAmount/10000000).toFixed(2),"PipelineCSValue":(MumbaiPipelineCSValue/10000000).toFixed(2)}
        FinalOutput.push(temp)
        var temp1 = {"Particulars": "Bangalore","WinCount": BangaloreWinCount, "WinCSValue":(BangaloreWinCSValue/10000000).toFixed(2),"ReceiptPR":(BangaloreReceiptPR/10000000).toFixed(2),"BillingPR": (BangaloreBillingPR/10000000).toFixed(2),"ReceiptSR":(BangaloreSRReceipt/10000000).toFixed(2),"BillingSR":(BangaloreSRBilling/10000000).toFixed(2),"PipelineCount":BangalorePipelineCount,"FinalAmount": (BangalorePipelineFinalAmount/10000000).toFixed(2),"PipelineCSValue":(BangalorePipelineCSValue/10000000).toFixed(2)}
        FinalOutput.push(temp1)
        var temp2 = {"Particulars": "Hyderabad", "WinCount": HyderabadWinCount, "WinCSValue":(HyderabadWinCSValue/10000000).toFixed(2),"ReceiptPR":(HyderabadReceiptPR/10000000).toFixed(2),"BillingPR": (HyderabadBillingPR/10000000).toFixed(2),"ReceiptSR":(HyderabadSRReceipt/10000000).toFixed(2),"BillingSR":(HyderabadSRBilling/10000000).toFixed(2),"PipelineCount":HyderabadPipelineCount,"FinalAmount": (HyderabadPipelineFinalAmount/10000000).toFixed(2),"PipelineCSValue":(HyderabadPipelineCSValue/10000000).toFixed(2)}
        FinalOutput.push(temp2)
        var temp3 = {"Particulars": "Surat", "WinCount": SuratWinCount, "WinCSValue":(SuratWinCSValue/10000000).toFixed(2),"ReceiptPR":(SuratReceiptPR/10000000).toFixed(2),"BillingPR": (SuratBillingPR/10000000).toFixed(2),"ReceiptSR":(SuratSRReceipt/10000000).toFixed(2),"BillingSR":(SuratSRBilling/10000000).toFixed(2),"PipelineCount":SuratPipelineCount,"FinalAmount": (SuratPipelineFinalAmount/10000000).toFixed(2),"PipelineCSValue":(SuratPipelineCSValue/10000000).toFixed(2)}
        FinalOutput.push(temp3)
        var temp4 = {"Particulars": "Ahmedabad","WinCount": AhmedabadWinCount, "WinCSValue":(AhmedabadWinCSValue/10000000).toFixed(2),"ReceiptPR":(AhmedabadReceiptPR/10000000).toFixed(2),"BillingPR": (AhmedabadBillingPR/10000000).toFixed(2),"ReceiptSR":(AhmedabadSRReceipt/10000000).toFixed(2),"BillingSR":(AhmedabadSRBilling/10000000).toFixed(2),"PipelineCount":AhmedabadPipelineCount,"FinalAmount": (AhmedabadPipelineFinalAmount/10000000).toFixed(2),"PipelineCSValue":(AhmedabadPipelineCSValue/10000000).toFixed(2)}
        FinalOutput.push(temp4)
        var temp5 = {"Particulars": "Jaipur", "WinCount": JaipurWinCount, "WinCSValue":(JaipurWinCSValue/10000000).toFixed(2),"ReceiptPR":(JaipurReceiptPR/10000000).toFixed(2),"BillingPR": (JaipurBillingPR/10000000).toFixed(2),"ReceiptSR":(JaipurSRReceipt/10000000).toFixed(2),"BillingSR":(JaipurSRBilling/10000000).toFixed(2),"PipelineCount":JaipurPipelineCount,"FinalAmount": (JaipurPipelineFinalAmount/10000000).toFixed(2),"PipelineCSValue":(JaipurPipelineCSValue/10000000).toFixed(2)}
        FinalOutput.push(temp5)
        var temp6 = {"Particulars": "Delhi", "WinCount": DelhiWinCount, "WinCSValue":(DelhiWinCSValue/10000000).toFixed(2),"ReceiptPR":(DelhiReceiptPR/10000000).toFixed(2),"BillingPR": (DelhiBillingPR/10000000).toFixed(2),"ReceiptSR":(DelhiSRReceipt/10000000).toFixed(2),"BillingSR":(DelhiSRBilling/10000000).toFixed(2),"PipelineCount":DelhiPipelineCount,"FinalAmount": (DelhiPipelineFinalAmount/10000000).toFixed(2),"PipelineCSValue":(DelhiPipelineCSValue/10000000).toFixed(2)}
        FinalOutput.push(temp6)

    
        var TotalWinCount = 0;
        var TotalWinCSValue = 0;
        var TotalReceiptPR = 0;
        var TotalBillingPR = 0;
        var TotalReceiptSR = 0;
        var TotalBillingSR = 0;
        var TotalPipelineCount = 0;
        var TotalFinalAmount = 0;
        var TotalPipelineCSValue = 0;

        for(var i =0 ; i < FinalOutput.length; i ++)
        {
            TotalWinCount = TotalWinCount + Number(FinalOutput[i].WinCount);
            TotalWinCSValue = TotalWinCSValue + Number(FinalOutput[i].WinCSValue);
            TotalReceiptPR = TotalReceiptPR + Number(FinalOutput[i].ReceiptPR);
            TotalBillingPR = TotalBillingPR + Number(FinalOutput[i].BillingPR);
            TotalReceiptSR  = TotalReceiptSR  + Number(FinalOutput[i].ReceiptSR);
            TotalBillingSR = TotalBillingSR + Number(FinalOutput[i].BillingSR);
            TotalPipelineCount = TotalPipelineCount + Number(FinalOutput[i].PipelineCount);
            TotalFinalAmount  = TotalFinalAmount  + Number(FinalOutput[i].FinalAmount);
            TotalPipelineCSValue = TotalPipelineCSValue + Number(FinalOutput[i].PipelineCSValue);

        }
 
        var temp7 = {"Particulars": "Total", "WinCount": TotalWinCount, "WinCSValue":TotalWinCSValue.toFixed(2),"ReceiptPR":TotalReceiptPR.toFixed(2),"BillingPR": TotalBillingPR.toFixed(2),"ReceiptSR":TotalReceiptSR.toFixed(2),"BillingSR":TotalBillingSR.toFixed(2),"PipelineCount":TotalPipelineCount,"FinalAmount": TotalFinalAmount.toFixed(2),"PipelineCSValue":TotalPipelineCSValue.toFixed(2)}
        FinalOutput.push(temp7)

      
        var transporter = nodemail.createTransport({
            service : 'gmail',
            auth : {
              user : 'it@jbglass.in',
              pass : 'pandey@ap1211'
            }
          }); 
          
          transporter.use('compile', hbs(
            {
              viewEngine : 
              {
                extName: ".handlebars",
                partialsDir: path.resolve(__dirname, "views6"),
                defaultLayout: false,
              },
              viewPath : path.resolve(__dirname, "views6"),
              extName: ".handlebars"
             }
          ));
          
          
           
          var mailOptions = {
            from : 'it@jbglass.in',
            to : 'gaurav@jbglass.in',
            cc :  'pulkit@ajaca.co.in,it@jbglass.in,sanchit@jbglass.in',
            subject : 'DAILY ASSOCIATE ANALYSIS REPORT ',
            template : 'associatereport',
            context: {
             StartDate : StartDate,
             EndDate : EndDate,   
             FinalOutput : FinalOutput
               
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
        






    


         








*/