
const fetch =require('node-fetch')
const express = require("express");
const cron = require("node-cron");
const router = express.Router();

const nodemail = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path')

var Order = require('../models/order.js');



router.post("/getOrders", (req, res, next) => {

    var SelectedDate = new Date(req.body.StartDate);
    var Associate = req.body.Associate;

    var MonthLastFirst = new Date(SelectedDate.getFullYear(), SelectedDate.getMonth()+1, 0);

    var LastMonthLastDate =   new Date(SelectedDate.getFullYear(), SelectedDate.getMonth()-1, 1);
    var LastMonthFirstDate =   new Date(SelectedDate.getFullYear(), SelectedDate.getMonth(), 0);

    var SecMonthLastDate =   new Date(SelectedDate.getFullYear(), SelectedDate.getMonth()-2, 1);
    var SecMonthFirstDate =   new Date(SelectedDate.getFullYear(), SelectedDate.getMonth()-1, 0);


  


    

    var FirstStartDate = GetDateFormat(SelectedDate);
    var FirstEndDate = GetDateFormat(MonthLastFirst);

    var SecondStartDate = GetDateFormat(LastMonthFirstDate);
    var SecondEndDate = GetDateFormat(LastMonthLastDate);

    var ThirdStartDate = GetDateFormat(SecMonthFirstDate);
    var ThirdEndDate = GetDateFormat(SecMonthLastDate);


   

    
  
    
    if(Associate!=="SOCIAL")
    {
      Order.find({
        $and:
    [
        {Associate : Associate}
        ,
        {$or: [ { Status : "Win" }, {Status : "Old Win" },{Status : "Handover" },{Status : "Commercial Hold" }] }
        ]
    })
    .then((response)=>{
        let Orders = response

         return FirstGetSalesDataforbulk(FirstStartDate,FirstEndDate,Orders)
    })
    .then((response)=>{
       
        let Orders = response.Orders
        let FirstMonthData = response.FirstMonthData
      
       
        return SecondGetSalesDataforbulk(SecondStartDate,SecondEndDate,Orders,FirstMonthData)
    })
    .then((response)=>{
      
      let Orders = response.Orders
      let FirstMonthData = response.FirstMonthData
      let SecondMonthData = response.SecondMonthData


      return ThirdGetSalesDataforbulk(ThirdStartDate,ThirdEndDate, Orders,FirstMonthData,SecondMonthData,SecondEndDate,FirstStartDate)

      
    })
    .then((response)=>{
     
      res.json(response)
    })
      

    }


    if(Associate=="SOCIAL")
    {
      Order.find({
        $and:
    [
        {Source : "SOCIAL"}
        ,
        {$or: [ { Status : "Win" }, {Status : "Old Win" },{Status : "Handover" },{Status : "Commercial Hold" }] }
        ]
    })
    .then((response)=>{

        let Orders = response

         return FirstGetSalesDataforbulk(FirstStartDate,FirstEndDate,Orders)
    })
    .then((response)=>{
       
        let Orders = response.Orders
        let FirstMonthData = response.FirstMonthData
      

        return SecondGetSalesDataforbulk(SecondStartDate,SecondEndDate,Orders,FirstMonthData)
    })
    .then((response)=>{
      
      let Orders = response.Orders
      let FirstMonthData = response.FirstMonthData
      let SecondMonthData = response.SecondMonthData


      return ThirdGetSalesDataforbulk(ThirdStartDate,ThirdEndDate, Orders,FirstMonthData,SecondMonthData,SecondEndDate,FirstStartDate)

      
    })
    .then((response)=>{

      var Orders = response.Orders
      var FirstMonthData = response.FirstMonthData
      var SecondMonthData = response.SecondMonthData 
      var ThirdMonthData  = response.ThirdMonthData
      var SecondDate =  response.SecondDate
      var FirstDate =  response.FirstDate
      
      var ThirdDate = response.ThirdDate

      return GetAllGetSalesDataforbulk(FirstEndDate, Orders,FirstMonthData,SecondMonthData,SecondEndDate,ThirdMonthData,FirstDate,SecondDate,ThirdDate)
     
    })
    .then((response)=>{
     
      res.json(response)
    })
      

    }

   
   
});


router.post("/getOrdersProPlus", (req, res, next) => {


 let Edatey = new Date(req.body.EndDate)
 let EndDate = GetDateFormat(Edatey)

 var Associates = req.body.Associates
 var query = '';

let AllFlag = false
 
 for(var i = 0; i< Associates.length ; i++)
 {
  if(Associates[i]=="ALL")
  {
    AllFlag = true
  }
 }

  var query = []



 if(AllFlag==false)
 {


  for(var i=0;i<Associates.length;i++)
  {
    let temp = {Associate : Associates[i]}
    query.push(temp)
  }

  Order.find(
    {
      $and:
      [
      {$or: query }
      ,
      {$or: [ { Status : "Win" }, {Status : "Old Win" },{Status : "Handover" },{Status : "Commercial Hold" }] }
      ]}
    
   ).then((response)=>{
     var Orders = response
  
     return  GetCSDateRangeData(EndDate,Orders)
   })
   .then((response)=>{
    res.json(response)
   })



 }
 

 
 if(AllFlag==true)
 {

  
  for(var i=0;i<Associates.length;i++)
  {
    let temp = {Associate : Associates[i]}
    query.push(temp)
  }

  Order.find(
    { 
      $or: [ { Status : "Win" }, {Status : "Old Win" },{Status : "Handover" },{Status : "Commercial Hold" }] 
    }
    
   )
   .then((response)=>{
     var Orders = response
  
     return  GetCSDateRangeData(EndDate,Orders)
   })
   .then((response)=>{
    res.json(response)
   })



 }





})



router.post("/getOrdersProPluslifetime", (req, res, next) => {


  let Edatey = new Date()
  let EndDate = GetDateFormat(Edatey)
 
  var Associates = req.body.Associates
  var query = '';
 
 let AllFlag = false
  
  for(var i = 0; i< Associates.length ; i++)
  {
   if(Associates[i]=="ALL")
   {
     AllFlag = true
   }
  }
 
   var query = []
 
 
 
  if(AllFlag==false)
  {
 
 
   for(var i=0;i<Associates.length;i++)
   {
     let temp = {Associate : Associates[i]}
     query.push(temp)
   }
 
   Order.find(
     {
       $and:
       [
       {$or: query }
       ,
       {$or: [ { Status : "Win" }, {Status : "Old Win" },{Status : "Handover" },{Status : "Commercial Hold" }] }
       ]}
     
    ).then((response)=>{
      var Orders = response
   
      return  GetCSDateRangeData(EndDate,Orders)
    })
    .then((response)=>{
     res.json(response)
    })
 
 
 
  }
  
 
  
  if(AllFlag==true)
  {
 
   
   for(var i=0;i<Associates.length;i++)
   {
     let temp = {Associate : Associates[i]}
     query.push(temp)
   }
 
   Order.find(
     { 
       $or: [ { Status : "Win" }, {Status : "Old Win" },{Status : "Handover" },{Status : "Commercial Hold" }] 
     }
     
    )
    .then((response)=>{
      var Orders = response
   
      return  GetCSDateRangeDataLifeTime(EndDate,Orders)
    })
    .then((response)=>{
     res.json(response)
    })
 
 
 
  }
 
 
 
 
 
 })



 router.post("/getdaterangeincentive", (req, res, next) => {

  var SDate = new Date(req.body.StartDate);
  var EDate = new Date(req.body.EndDate);
  var Associate =  req.body.Associate

  var StartDate = GetDateFormat(SDate)
  var EndDate = GetDateFormat(EDate)


if(Associate!=="SOCIAL")
{

 

  Order.find({
    $and:
[
    {Associate : Associate}
    ,
    {$or: [ { Status : "Win" }, {Status : "Old Win" },{Status : "Handover" },{Status : "Commercial Hold" }] }
    ]
})
.then((response)=>{
    let Orders = response

     return GetSalesDataDateRange(StartDate,EndDate,Orders)
})
.then((response)=>{
  res.json(response)
})

}


if(Associate=="SOCIAL")
{

 

  Order.find({
    $and:
[
    {Source : "SOCIAL"}
    ,
    {$or: [ { Status : "Win" }, {Status : "Old Win" },{Status : "Handover" },{Status : "Commercial Hold" }] }
    ]
})
.then((response)=>{
    let Orders = response

     return GetSalesDataDateRange(StartDate,EndDate,Orders)
})
.then((response)=>{
  res.json(response)
})

}


 



 })


 


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



async function FirstGetSalesDataforbulk(StartDate,EndDate,Orders)
{
 
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjSalesCol?FromDate=${StartDate}&ToDate=${EndDate}&refno=`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
     }
    
   
  })
 
  const data = await res.json();

  




  var Details = { Orders : Orders, FirstMonthData : data }


 



  return Details

}


async function SecondGetSalesDataforbulk(StartDate,EndDate,Orders,FirstMonthData)
{


 
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjSalesCol?FromDate=${EndDate}&ToDate=${StartDate}&refno=`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
     }
    
   
  })
 
  const data = await res.json();

  var Details = {Orders : Orders, FirstMonthData : FirstMonthData,SecondMonthData : data}


  return Details

}


async function ThirdGetSalesDataforbulk(StartDate,EndDate, Orders,FirstMonthData,SecondMonthData,SecondEndDate,FirstStartDate)
{
 
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjSalesCol?FromDate=${EndDate}&ToDate=${StartDate}&refno=`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
     }
    
   
  })
 
  const data = await res.json();
  
 




  var Details = { Orders : Orders ,FirstMonthData : FirstMonthData, SecondMonthData : SecondMonthData, ThirdMonthData : data,SecondDate : SecondEndDate,FirstDate : FirstStartDate,ThirdDate :EndDate}


 



  return Details

}


async function GetAllGetSalesDataforbulk(EndDate, Orders,FirstMonthData,SecondMonthData,SecondEndDate,ThirdMonthData,FirstDate,SecondDate,ThirdDate)
{
 
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjSalesCol?FromDate=01-Jan-2020&ToDate=${EndDate}&refno=`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
     }
    
   
  })
 
  const data = await res.json();
  
 




  var Details = { Orders : Orders ,FirstMonthData : FirstMonthData, SecondMonthData : SecondMonthData, ThirdMonthData : ThirdMonthData,SecondDate : SecondDate,FirstDate : FirstDate,ThirdDate :ThirdDate,FullData : data}


 



  return Details

}


async function GetCSDateRangeData(EndDate,Orders)
{
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjectJsonOnlineAll?Sdate=1-Jan-2020&Edate=${EndDate}`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
     }
    
   
  })
 
  const data = await res.json();

  let details = { Orders : Orders , CSData : data}

  
  

  return details
}


async function GetCSDateRangeDataLifeTime(EndDate,Orders)
{
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjectJsonOnlineAll?Sdate=1-Jan-2020&Edate=${EndDate}`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
     }
    
   
  })
 
  const data = await res.json();

  let details = { Orders : Orders , CSData : data}

  
  

  return details
}



async function GetSalesDataDateRange(StartDate,EndDate,Orders)
{
 
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjSalesCol?FromDate=${StartDate}&ToDate=${EndDate}&refno=`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
     }
    
   
  })
 
  const data = await res.json();
  var Details = { Orders : Orders , SalesData : data }


  return Details

}




module.exports = router