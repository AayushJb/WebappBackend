
const fetch =require('node-fetch')
const express = require("express");
const cron = require("node-cron");
const router = express.Router();

const nodemail = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path')


const client_id = "5c8f5ac731b4bc9285588af2969768a738e4a75312249959b368081322069da8"
const client_secret = "851537eb57502d1820aa8a0f141d75728594cc163e896c10eb0e68503988fe2e"


var Order = require('../models/order.js');

var LedgerDetail = require('../models/ledgerdetail.js');



//router.get("/proplusreports",(req,res,next)=>{ 



    Order.find({$or: [ { Status : "Win" }, {Status : "Old Win" },{Status : "Pipeline" } ,{Status : "Handover" },{Status : "Commercial Hold" }] })
.then((response)=>{

  var Orders = response

  LedgerDetail.find({})
  .then((documents)=>{
    let LedgerDetail = documents
    return  getAccessToken(Orders,LedgerDetail)

  })
 .then((response)=>{

   let Orders  = response.Orders
   let AccessToken = response.AccessToken
   let LedgerDetail = response.LedgerDetail


   return GetCompanyVendors(AccessToken,Orders,LedgerDetail)

    
  })
 .then((response)=>{

    let  ProcoreArchitects = response.ArchitectsData
    let  Orders = response.Orders
    let  AccessToken = response.AccessToken
    let LedgerDetail = response.LedgerDetail



  

    return GetProcoreProjectsForReport(AccessToken,ProcoreArchitects,Orders,LedgerDetail)

  })
 .then((response)=>{
    let Orders = response.Orders
    let ArchitectData = response.Architects 
    let LedgerDetail = response.LedgerDetail
    let ProcoreOrders = response.ProcoreOrders



 }) 



  })


//})















async function GetCompanyVendors(access_token,Orders,LedgerDetail)
{
 
  
  const res = await fetch('https://api.procore.com/rest/v1.0/vendors?company_id=562949953442334', {
    method: 'GET',
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     }
   
  })

const data = await res.json();


let Details = {AccessToken : access_token,Orders : Orders , ArchitectsData : data,LedgerDetail : LedgerDetail}


return Details

}



async function GetProcoreProjectsForReport(access_token,ProcoreArchitects,Orders,LedgerDetail)
{

 
  const res = await fetch(`https://api.procore.com/rest/v1.0/projects?company_id=562949953442334`, {
    method: 'GET',
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     }
   
  })


  const data = await res.json();  

let Details = { AccessToken : access_token,Orders : Orders, Architects : ProcoreArchitects , ProcoreOrders : data ,LedgerDetail : LedgerDetail}




return  Details;

}


//========================GETTING ACCESS TOKEN===================================================
async function getAccessToken(Orders,LedgerDetail) {

    const grant_type = 'client_credentials';
    const redirect_uri = 'http://3.109.31.86/projects';
    const refresh_token = 'string'
  
  
    const res = await fetch('https://login.procore.com/oauth/token', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        grant_type, 
        client_id,
        client_secret,
        refresh_token
  
      })
  
    })
  
  const data = await res.json();
  const params = new URLSearchParams(data)
  
  


  let access_token = params.get("access_token")

  let details = { Orders : Orders,LedgerDetail : LedgerDetail, AccessToken : access_token }

  return details
  
}



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


async function FirstGetSalesDataforbulk(StartDate,EndDate,Orders,ArchitectData,ProcoreOrders,LedgerDetail,DateRanges)
{
 
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjSalesCol?FromDate=${StartDate}&ToDate=${EndDate}&refno=`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
     }
    
   
  })
 
  const data = await res.json();
  var Details = { Last : data,Orders : Orders,ArchitectData : ArchitectData,ProcoreOrders : ProcoreOrders,LedgerDetail : LedgerDetail,DateRanges : DateRanges}


 



  return Details

}


async function SecondGetSalesDataforbulk(StartDate,EndDate,Orders,ArchitectData,ProcoreOrders,LedgerDetail,DateRanges,LastMonthCS)
{
 
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjSalesCol?FromDate=${StartDate}&ToDate=${EndDate}&refno=`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
     }
    
   
  })
 
  const data = await res.json();
  var Details = { Last : data,Orders : Orders,ArchitectData : ArchitectData,ProcoreOrders : ProcoreOrders,LedgerDetail : LedgerDetail,DateRanges : DateRanges,LastMonthCS : LastMonthCS}


 



  return Details

}


async function ThirdGetSalesDataforbulk(StartDate,EndDate,Orders,ArchitectData,ProcoreOrders,LedgerDetail,DateRanges,LastMonthCS,SecondMonthCS)
{
 
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjSalesCol?FromDate=${StartDate}&ToDate=${EndDate}&refno=`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
     }
    
   
  })
 
  const data = await res.json();
  var Details = { Last : data,Orders : Orders,ArchitectData : ArchitectData,ProcoreOrders : ProcoreOrders,LedgerDetail : LedgerDetail,DateRanges : DateRanges,LastMonthCS : LastMonthCS,SecondMonthCS: SecondMonthCS}


 



  return Details

}



module.exports = router;