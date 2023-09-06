
const fetch =require('node-fetch')
const express = require("express");
const cron = require("node-cron");
const router = express.Router();

const nodemail = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path')


var Order = require('../models/order.js');



//cron.schedule("*/5 * * * * *", function() {
  /*
  Order.find({Status : "Commercial Hold"})
  .then(documents=>{

      let CommercialHoldOrders = documents
      return CommercialHoldOrders
   
  })
  .then((response)=>{



    let StartDate = "01-Jan-2020"
 
    let today  = new Date();
    let todayDate  = today.getDate();
    let todayMonth = today.getMonth() +1;
    let todayYear  = today.getFullYear();
    let MonthFor = '';


    if(todayMonth==1)
    {
      MonthFor = "Jan"
    }
    
    if(todayMonth==2)
    {
      MonthFor = "Feb"
    }
    
    if(todayMonth==3)
    {
      MonthFor = "Mar"
    }
    
    if(todayMonth==4)
    {
      MonthFor = "Apr"
    }
    
    if(todayMonth==5)
    {
      MonthFor = "May"
    }
    
    if(todayMonth==6)
    {
      MonthFor = "Jun"
    }
    if(todayMonth==7)
    {
      MonthFor = "Jul"
    }
    if(todayMonth==8)
    {
      MonthFor = "Aug"
    }
    if(todayMonth==9)
    {
      MonthFor = "Sep"
    }
    if(todayMonth==10)
    {
      MonthFor = "Oct"
    }
    if(todayMonth==11)
    {
      MonthFor = "Nov"
    }
    if(todayMonth==12)
    {
      MonthFor = "Dec"
    }

 
    let EndDate = todayDate + "-" + MonthFor + "-" + todayYear
     
   return GetCSDateRangeData(StartDate,EndDate,response)

  })
  .then((response)=>{
    let CSOrders = response.CSOrders;
    let WebappOrders = response.WebappOrders

    
    for(var i= 0 ; i < WebappOrders.length;i++)
    {
      let OrderProjectRefNo = ""

      if(WebappOrders[i].OrderNo.includes("/V-"))
      {
       let hyphen = WebappOrders[i].OrderNo.lastIndexOf("/V-");
       let tempproref = WebappOrders[i].OrderNo.substring(0, hyphen);
       let slash = tempproref.lastIndexOf("/");
       let proref = tempproref.substring(slash + 1, hyphen); 
       OrderProjectRefNo = proref
      }
   
      if(!WebappOrders[i].OrderNo.includes("/V-"))
      {
       let slash = WebappOrders[i].OrderNo.lastIndexOf("/");
       let proref = WebappOrders[i].OrderNo.substring(slash+ 1, WebappOrders[i].OrderNo.length);
       OrderProjectRefNo = proref
      }

   
      for(var j = 0 ; j < CSOrders.length; j++)
      {
        let ProjectRefNo = CSOrders[j].PROJREFNO

       // console.log(ProjectRefNo)

        if(OrderProjectRefNo ==ProjectRefNo)
        {
         // console.log(OrderProjectRefNo)
        }

      }

 


    }



  })
  

},{
  scheduled: true,
  timezone: "Asia/Kolkata"
});
*/


async function GetCSDateRangeData(StartDate,EndDate,response)
{
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjectJsonOnlineAll?Sdate=${StartDate}&Edate=${EndDate}`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
     }
    
   
  })
 
  const data = await res.json();

  let OrderDetails = {CSOrders : data, WebappOrders : response}
  

  return OrderDetails

}




module.exports = cron;