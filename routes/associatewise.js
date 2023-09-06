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


//"30 15 * * *"


cron.schedule("00 08 * * *", function() {


    Order.find({$or: [ { Status : "Win" }, {Status : "Old Win" },{Status : "Pipeline" } ,{Status : "Handover" },{Status : "Commercial Hold" }] })
    .then((response)=>{
         

        var today = new Date();
        var todayDate = GetDateFormat(today)
        var currentMonth = new Date();
   
        var FirstDayofMonth =  new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);

        var yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        var StartDateMonth = GetDateFormat(FirstDayofMonth)
        var EndDate = GetDateFormat(today)
        var StartDateYesterday =  GetDateFormat(yesterday)

        var Orders = response

        
        GetSalesDataCS(StartDateMonth,EndDate)
        .then((response)=>{
          return GetSalesDataDaily(StartDateYesterday,EndDate,response)
        })
        .then((response)=>{
         var YesterdaySalesReport = response.YesterdaySalesReport;
         var MonthlySalesReport = response.MonthlySalesReport;

         return GetCSDateRangeData(StartDateMonth,EndDate,YesterdaySalesReport,MonthlySalesReport)


        })
        .then((response)=>{


            let DataCS  = [{ProjectReport : response.ProjectReport,MonthlySalesReport : response.MonthlySalesReport,YesterdaySalesReport : response.YesterdaySalesReport}]

           
          
            var ProjectReport = JSON.parse(DataCS[0].ProjectReport);
            var MonthlySalesReport = JSON.parse(DataCS[0].MonthlySalesReport);
            var YesterdaySalesReport = JSON.parse(DataCS[0].YesterdaySalesReport);

            




            var ShashankWinCountMonth = 0;
            var ShashankWinFinalAmountMonth = 0;
            var ShashankWinCountDay = 0;
            var ShashankWinFinalAmountDay = 0;
            var ShashankPipelineCountMonth = 0;
            var ShashankPipelineFinalAmountMonth = 0;
            var ShashankPipelineCountDay = 0;
            var ShashankPipelineFinalAmountDay = 0;   

            var AnkitWinCountMonth = 0;
            var AnkitWinFinalAmountMonth = 0;
            var AnkitWinCountDay = 0;
            var AnkitWinFinalAmountDay = 0;
            var AnkitPipelineCountMonth = 0;
            var AnkitPipelineFinalAmountMonth = 0;
            var AnkitPipelineCountDay = 0;
            var AnkitPipelineFinalAmountDay = 0;   

            var VikasWinCountMonth = 0;
            var VikasWinFinalAmountMonth = 0;
            var VikasWinCountDay = 0;
            var VikasWinFinalAmountDay = 0;
            var VikasPipelineCountMonth = 0;
            var VikasPipelineFinalAmountMonth = 0;
            var VikasPipelineCountDay = 0;
            var VikasPipelineFinalAmountDay = 0;  
            
            var ShashankSalesDay =0;
            var VikasSalesDay =0;
            var AnkitSalesDay =0;
            var ShashankReceiptDay =0;
            var VikasReceiptDay =0;
            var AnkitReceiptDay =0;
         
            var ShashankSalesMonth =0;
            var VikasSalesMonth =0;
            var AnkitSalesMonth =0;
            var ShashankReceiptMonth =0;
            var VikasReceiptMonth =0;
            var AnkitReceiptMonth =0;

            var ShahshankOutstanding = 0;
            var VikasOutstanding = 0;
            var AnkitOutstanding = 0;


            let OrdersReps = []

           for(var i=0; i<Orders.length; i++)
           {
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


            

            for(var q=0;q<ProjectReport.length;q++)
            {

              
       
              if(Orders[i].CommercialWinDate)
              {
              
               
                   
              
                if(ProjectReport[q].PROJREFNO==OrderProjectRefNo)
                {
                  
                  if(!OrdersReps.includes(ProjectReport[q].PROJREFNO))
                  {

                 

                  if(Orders[i].Associate=="SHASHANK SINGH")
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
                         ShahshankOutstanding = ShahshankOutstanding+ Number(OutStanding)
                     }
                      
                  }
  
                  if(Orders[i].Associate=="ANKIT AGGARWAL")
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
                              AnkitOutstanding = AnkitOutstanding + Number(OutStanding)
                          }
                    
                      
                  }
  
                  if(Orders[i].Associate=="VIKAS SINGHAL")
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
                         VikasOutstanding = VikasOutstanding + Number(OutStanding)
                     }
                      
                  }

                  }

                  OrdersReps.push(ProjectReport[q].PROJREFNO)
  
                  }

                  
               
              
              }
              
            }

            for(var p=0;p<YesterdaySalesReport.length;p++)
            {
                if(YesterdaySalesReport[p].PROJREFNO==OrderProjectRefNo)
                {
                 if(Orders[i].Associate=="ANKIT AGGARWAL") 
                 {
                    if(YesterdaySalesReport[p].Sales)
                    {
                        AnkitSalesDay = AnkitSalesDay + Number(YesterdaySalesReport[p].Sales)
            
                    }

                    if(YesterdaySalesReport[p].Collection)
                    {
                        AnkitReceiptDay = AnkitReceiptDay + Number(YesterdaySalesReport[p].Collection)
                    }
                    
                 } 
                 
                 if(Orders[i].Associate=="VIKAS SINGHAL") 
                 {
                    if(YesterdaySalesReport[p].Sales)
                    {
                        VikasSalesDay = VikasSalesDay + Number(YesterdaySalesReport[p].Sales)
                    }

                    if(YesterdaySalesReport[p].Collection)
                    {
                        VikasReceiptDay = VikasReceiptDay + Number(YesterdaySalesReport[p].Collection)
                    }
                    
                 }  


                 if(Orders[i].Associate=="SHASHANK SINGH") 
                 {
                    if(YesterdaySalesReport[p].Sales)
                    {
                        ShashankSalesDay = ShashankSalesDay + Number(YesterdaySalesReport[p].Sales)
                    }

                    if(YesterdaySalesReport[p].Collection)
                    {
                        ShashankReceiptDay = ShashankReceiptDay + Number(YesterdaySalesReport[p].Collection)
                    }
                    
                 } 

                 
                }
            }

            for(var p=0;p<MonthlySalesReport.length;p++)
{
    if(MonthlySalesReport[p].PROJREFNO==OrderProjectRefNo)
    {
     if(Orders[i].Associate=="ANKIT AGGARWAL"&&Orders[i].CommercialWinDate) 
     {
        if(MonthlySalesReport[p].Sales)
        {
            AnkitSalesMonth = AnkitSalesMonth + Number(MonthlySalesReport[p].Sales)

        }

        if(MonthlySalesReport[p].Collection)
        {
            AnkitReceiptMonth = AnkitReceiptMonth + Number(MonthlySalesReport[p].Collection)
        }
        
     } 
     
     if(Orders[i].Associate=="VIKAS SINGHAL"&&Orders[i].CommercialWinDate) 
     {
        if(MonthlySalesReport[p].Sales)
        {   
    
            VikasSalesMonth = VikasSalesMonth + Number(MonthlySalesReport[p].Sales)
        }

        if(MonthlySalesReport[p].Collection)
        {
            VikasReceiptMonth = VikasReceiptMonth + Number(MonthlySalesReport[p].Collection)
        }
        
     }  


     if(Orders[i].Associate=="SHASHANK SINGH" &&Orders[i].CommercialWinDate) 
     {
        if(MonthlySalesReport[p].Sales)
        {
            ShashankSalesMonth = ShashankSalesMonth + Number(MonthlySalesReport[p].Sales)
        }

        if(MonthlySalesReport[p].Collection)
        {
            ShashankReceiptMonth = ShashankReceiptMonth + Number(MonthlySalesReport[p].Collection)
        }
        
     } 

     
    }
            }


           



            

          




////////////////////// For Pipeline  
            if(Orders[i].CreationDate)
            {
            var EditDate = Number(Orders[i].CreationDate.split('-')[0])
            var EditMonth = Number(Orders[i].CreationDate.split('-')[1])
            var EditYear = Number(Orders[i].CreationDate.split('-')[2])
            var DateFormat = EditMonth+ "/" + EditDate + "/" + EditYear       
 
            var PipelineDate = new Date(DateFormat)
            
        

            if(PipelineDate>=yesterday&&PipelineDate<=today)
            {
                if(Orders[i].Associate=="SHASHANK SINGH")
                {
                    ShashankPipelineCountDay = ShashankPipelineCountDay + 1; 
                    ShashankPipelineFinalAmountDay = ShashankPipelineFinalAmountDay+ Number(Orders[i].FinalAmount)
                }

                if(Orders[i].Associate=="ANKIT AGGARWAL")
                {
                    AnkitPipelineCountDay = AnkitPipelineCountDay + 1; 
                    AnkitPipelineFinalAmountDay = AnkitPipelineFinalAmountDay+ Number(Orders[i].FinalAmount)
                }

                if(Orders[i].Associate=="VIKAS SINGHAL")
                {
                    VikasPipelineCountDay = VikasPipelineCountDay + 1; 
                    VikasPipelineFinalAmountDay = VikasPipelineFinalAmountDay+ Number(Orders[i].FinalAmount)
                }
            }

        
            if(PipelineDate>=FirstDayofMonth&&PipelineDate<=today)
            {

           

                if(Orders[i].Associate=="SHASHANK SINGH")
                {
                   ShashankPipelineCountMonth = ShashankPipelineCountMonth + 1; 
                   ShashankPipelineFinalAmountMonth = ShashankPipelineFinalAmountMonth+ Number(Orders[i].FinalAmount)
                }

               if(Orders[i].Associate=="ANKIT AGGARWAL")
               {
                 AnkitPipelineCountMonth = AnkitPipelineCountMonth + 1; 
                 AnkitPipelineFinalAmountMonth = AnkitPipelineFinalAmountMonth+ Number(Orders[i].FinalAmount)
               }

              if(Orders[i].Associate=="VIKAS SINGHAL")
               {

              

                 VikasPipelineCountMonth = VikasPipelineCountMonth + 1; 
                 VikasPipelineFinalAmountMonth = VikasPipelineFinalAmountMonth+ Number(Orders[i].FinalAmount)
              }

            }




            }

////////////////////// For Win

            if(Orders[i].CommercialWinDate)
            {
            var WinDate = Number(Orders[i].CommercialWinDate.split('-')[0])
            var WinMonth = Number(Orders[i].CommercialWinDate.split('-')[1])
            var WinYear = Number(Orders[i].CommercialWinDate.split('-')[2])
            var WinDateFormat = WinMonth+ "/" + WinDate + "/" + WinYear     
 
            var WinDate = new Date(WinDateFormat)

            if(WinDate>=yesterday&&WinDate<=today&&Orders[i].Status!=="Edited")
            {
              if(Orders[i].Associate=="SHASHANK SINGH")
             {
               ShashankWinCountDay = ShashankWinCountDay + 1; 
               ShashankWinFinalAmountDay = ShashankWinFinalAmountDay+ Number(Orders[i].FinalAmount)
             }

              if(Orders[i].Associate=="ANKIT AGGARWAL")
             {
               AnkitWinCountDay = AnkitWinCountDay + 1; 
               AnkitWinFinalAmountDay = AnkitWinFinalAmountDay+ Number(Orders[i].FinalAmount)
             }

             if(Orders[i].Associate=="VIKAS SINGHAL")
            {
              VikasWinCountDay = VikasWinCountDay + 1; 
              VikasWinFinalAmountDay = VikasWinFinalAmountDay+ Number(Orders[i].FinalAmount)
            }
           }


            if(WinDate>=FirstDayofMonth&&WinDate<=today&&Orders[i].Status!=="Edited")
            {

             if(Orders[i].Associate=="SHASHANK SINGH")
             {
               ShashankWinCountMonth = ShashankWinCountMonth + 1; 
               ShashankWinFinalAmountMonth = ShashankWinFinalAmountMonth+ Number(Orders[i].FinalAmount)
             }

             if(Orders[i].Associate=="ANKIT AGGARWAL")
             {
               AnkitWinCountMonth = AnkitWinCountMonth + 1; 
               AnkitWinFinalAmountMonth = AnkitWinFinalAmountMonth+ Number(Orders[i].FinalAmount)
             }

             if(Orders[i].Associate=="VIKAS SINGHAL")
             {
               VikasWinCountMonth = VikasWinCountMonth + 1; 
               VikasWinFinalAmountMonth = VikasWinFinalAmountMonth+ Number(Orders[i].FinalAmount)
             }

            }
            
           
           
              
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
                partialsDir: path.resolve(__dirname, "views7"),
                defaultLayout: false,
              },
              viewPath : path.resolve(__dirname, "views7"),
              extName: ".handlebars"
             }
          ));
          
          
           
          var mailOptions1 = {
            from : 'it@jbglass.in',
            to : 'gaurav@jbglass.in',
            cc :  'pulkit@ajaca.co.in,it@jbglass.in,sanchit@jbglass.in',
            subject : 'DAILY ASSOCIATE ANALYSIS REPORT ',
            template : 'associatewise',
            context: {
            Yesterday :  todayDate ,
            Associate : "Shashank Singh",
            WinCountMonth :ShashankWinCountMonth.toFixed(0),
            WinFinalAmountMonth : ShashankWinFinalAmountMonth.toFixed(0),
            WinCountDay : ShashankWinCountDay.toFixed(0),
            WinFinalAmountDay : ShashankWinFinalAmountDay.toFixed(0),
            PipelineCountMonth : ShashankPipelineCountMonth.toFixed(0),
            PipelineFinalAmountMonth : ShashankPipelineFinalAmountMonth.toFixed(0),
            PipelineCountDay : ShashankPipelineCountDay.toFixed(0),
            PipelineFinalAmountDay : ShashankPipelineFinalAmountDay.toFixed(0),
            SalesDay : ShashankSalesDay.toFixed(0),
            SalesMonth : ShashankSalesMonth.toFixed(0),
            Outstanding  :  -1*ShahshankOutstanding.toFixed(0),
            ReceiptDay : ShashankReceiptDay.toFixed(0),
            ReceiptMonth : ShashankReceiptMonth.toFixed(0)

               
            }
          }
          
           
          transporter.sendMail(mailOptions1,function(error,info){
          if(error)
          {
            console.log(error)
          }else{
           console.log('Email Sent : '+ info.response);
          }
          
          })


          var mailOptions2 = {
            from : 'it@jbglass.in',
            to : 'gaurav@jbglass.in',
            cc :  'pulkit@ajaca.co.in,it@jbglass.in,sanchit@jbglass.in',
            subject : 'DAILY ASSOCIATE ANALYSIS REPORT ',
            template : 'associatewise',
            context: {
                Yesterday :  todayDate ,
                Associate : "Ankit Aggarwal",
                WinCountMonth :AnkitWinCountMonth,
                WinFinalAmountMonth : AnkitWinFinalAmountMonth.toFixed(0),
                WinCountDay : AnkitWinCountDay.toFixed(0),
                WinFinalAmountDay : AnkitWinFinalAmountDay.toFixed(0),
                WinCountDay : AnkitWinCountDay.toFixed(0),
                PipelineCountMonth : AnkitPipelineCountMonth.toFixed(0),
                PipelineFinalAmountMonth : AnkitPipelineFinalAmountMonth.toFixed(0),
                PipelineCountDay : AnkitPipelineCountDay.toFixed(0),
                PipelineFinalAmountDay : AnkitPipelineFinalAmountDay.toFixed(0),
                SalesDay : AnkitSalesDay.toFixed(0),
                SalesMonth : AnkitSalesMonth.toFixed(0),
                Outstanding  :  -1*AnkitOutstanding.toFixed(0),
                ReceiptDay : AnkitReceiptDay.toFixed(0),
                ReceiptMonth : AnkitReceiptMonth.toFixed(0)

               
            }
          }
          
           
          transporter.sendMail(mailOptions2,function(error,info){
          if(error)
          {
            console.log(error)
          }else{
           console.log('Email Sent : '+ info.response);
          }
          
          })


          var mailOptions3 = {
            from : 'it@jbglass.in',
            to : 'gaurav@jbglass.in',
            cc :  'pulkit@ajaca.co.in,it@jbglass.in,sanchit@jbglass.in',
            subject : 'DAILY ASSOCIATE ANALYSIS REPORT ',
            template : 'associatewise',
            context: {
                Yesterday :  todayDate,
                Associate : "Vikas Singhal",
                WinCountMonth :VikasWinCountMonth.toFixed(0),
                WinFinalAmountMonth : VikasWinFinalAmountMonth.toFixed(0),
                WinCountDay : VikasWinCountDay.toFixed(0),
                WinFinalAmountDay : VikasWinFinalAmountDay.toFixed(0),
                PipelineCountMonth : VikasPipelineCountMonth.toFixed(0),
                PipelineFinalAmountMonth : VikasPipelineFinalAmountMonth.toFixed(0),
                PipelineCountDay : VikasPipelineCountDay.toFixed(0),
                PipelineFinalAmountDay : VikasPipelineFinalAmountDay.toFixed(0),
                SalesDay : VikasSalesDay.toFixed(0),
                SalesMonth : VikasSalesMonth.toFixed(0),
                Outstanding  :  -1*VikasOutstanding.toFixed(0),
                ReceiptDay : VikasReceiptDay.toFixed(0),
                ReceiptMonth : VikasReceiptMonth.toFixed(0)

               
            }
          }
          
           
          transporter.sendMail(mailOptions3,function(error,info){
          if(error)
          {
            console.log(error)
          }else{
           console.log('Email Sent : '+ info.response);
          }
          
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





async function GetSalesDataCS(StartDate,EndDate)
{
 
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjSalesCol?FromDate=${StartDate}&ToDate=${EndDate}&refno=`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
     }
    
   
  })
 
  const data = await res.json();
  return data

}

async function GetSalesDataDaily(StartDateYesterday,EndDate,response)
{
 
    const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjSalesCol?FromDate=${StartDateYesterday}&ToDate=${EndDate}&refno=`, {
      method: 'GET',
      headers: {
      'content-type': 'application/json',
       }
      
    })
   
    const data = await res.json();
    
    var Details = {
        YesterdaySalesReport : data,
        MonthlySalesReport : response
    }

    return Details
  
}

async function GetCSDateRangeData(StartDateMonth,EndDate,YesterdaySalesReport,MonthlySalesReport)
{
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjectJsonOnlineAll?Sdate=1-Jan-2020&Edate=${EndDate}`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
     }
    
   
  })
 
  const data = await res.json();



  let Details = {ProjectReport : data , YesterdaySalesReport : YesterdaySalesReport, MonthlySalesReport : MonthlySalesReport}
  

  return Details

}
