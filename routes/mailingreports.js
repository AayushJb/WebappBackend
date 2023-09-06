
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






router.get("/incentives",(req,res,next)=>{ 

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

    

   var DateRanges = []

   var today= new Date();

   var lastmonthFirst = new Date(today.getFullYear(), today.getMonth() - 1, 1);
   var lastmonthlast = new Date(today.getFullYear(), today.getMonth(), 0);

   var firstlast = GetDateFormat(lastmonthFirst)
   var lastlast = GetDateFormat(lastmonthlast)
   var lastMonth = firstlast.split("-")[1]
   

   var SlastmonthFirst = new Date(today.getFullYear(), today.getMonth() - 2, 1);
   var Slastmonthlast = new Date(today.getFullYear(), today.getMonth()-1, 0);

   var Sfirstlast = GetDateFormat(SlastmonthFirst)
   var Slastlast = GetDateFormat(Slastmonthlast)
   var SlastMonth = Sfirstlast.split("-")[1]


   var TlastmonthFirst = new Date(today.getFullYear(), today.getMonth() -3, 1);
   var Tlastmonthlast = new Date(today.getFullYear(), today.getMonth()-2, 0);

   var Tfirstlast = GetDateFormat(TlastmonthFirst)
   var Tlastlast = GetDateFormat(Tlastmonthlast)
   var TlastMonth = Tfirstlast.split("-")[1]


//======
   var temp1  = { StartDate :firstlast,EndDate :lastlast,Month : lastMonth ,Sequence : "LAST" }
    DateRanges.push(temp1)
   var temp2  = { StartDate :Sfirstlast,EndDate :Slastlast,Month : SlastMonth, Sequence : "SECOND" }
   DateRanges.push(temp2)
   var temp3  = { StartDate :Tfirstlast,EndDate :Tlastlast,Month : TlastMonth, Sequence : "THIRD"  }
   DateRanges.push(temp3)




  return FirstGetSalesDataforbulk(DateRanges[0].StartDate,DateRanges[0].EndDate,Orders,ArchitectData,ProcoreOrders,LedgerDetail,DateRanges)
    

     
   


 })
 .then((response)=>{
 
  var LastMonthCS = response.Last
  var Orders = response.Orders
  var ArchitectData = response.ArchitectData
  var ProcoreOrders = response.ProcoreOrders
  var LedgerDetail = response.LedgerDetail
  var DateRanges = response.DateRanges

  return SecondGetSalesDataforbulk(DateRanges[1].StartDate,DateRanges[1].EndDate,Orders,ArchitectData,ProcoreOrders,LedgerDetail,DateRanges,LastMonthCS)
    
  


 })
 .then((response)=>{

  var SecondMonthCS= response.Last
  var LastMonthCS = response.LastMonthCS
  var Orders = response.Orders
  var ArchitectData = response.ArchitectData
  var ProcoreOrders = response.ProcoreOrders
  var LedgerDetail = response.LedgerDetail
  var DateRanges = response.DateRanges

  return ThirdGetSalesDataforbulk(DateRanges[2].StartDate,DateRanges[2].EndDate,Orders,ArchitectData,ProcoreOrders,LedgerDetail,DateRanges,LastMonthCS,SecondMonthCS)
    

 })
 .then((response)=>{
  var ThirdMonthCS = response.Last
  var SecondMonthCS= response.SecondMonthCS
  var LastMonthCS = response.LastMonthCS
  var Orders = response.Orders
  var ArchitectData = response.ArchitectData
  var ProcoreOrders = response.ProcoreOrders
  var LedgerDetail = response.LedgerDetail
  var DateRanges = response.DateRanges


 
  let ArchitectTemp = []


//=================Proocore Architects========================
  ArchitectData.map((item)=>{
    let Trades = JSON.stringify(item.trades)
    
    if(item.project_ids.length>0)
    {
      if(Trades.includes("Pro Plus Architect")||Trades.includes("Pro Architect"))
      {
        for(var i=0; i<item.project_ids.length;i++)
        {
          let temp = {ArchitectFirm : item.name,ProjectID :item.project_ids[i] }
          ArchitectTemp.push(temp)
        }
      }
      
    }

 
  

  })

  let ArchProList =[]

  for(var j=0;j<ProcoreOrders.length;j++)
  {
    for(var k=0;k<ArchitectTemp.length;k++)
    {
      if(ArchitectTemp[k].ProjectID==ProcoreOrders[j].id)
      {
 
        let ProcoreRefNo ="";

             if(ProcoreOrders[j].project_number.includes("/V-"))
             {
              ProcoreRefNo = ProcoreOrders[j].project_number.toString().split("/V-")[0]
             }
             if(!ProcoreOrders[j].project_number.includes("/V-"))
             {
              ProcoreRefNo = ProcoreOrders[j].project_number
             }


            
         let temp = {ArchitectFirm :ArchitectTemp[k].ArchitectFirm, OrderNo : ProcoreRefNo  }
         ArchProList.push(temp)

      }
    }
  }

//======================================================

//========Source Matching====================================

let DataCS  = [{Order : this.orders,Third : ThirdMonthCS , Second : SecondMonthCS , Last : LastMonthCS}]
var Third = JSON.parse(DataCS[0].Third);
var Second = JSON.parse(DataCS[0].Second);
var Last = JSON.parse(DataCS[0].Last);



let LastArray = []
let SecondArray = []
let ThirdArray = []
  

for(var i = 0;i<Last.length;i++)
{

 

  var ProPlusDiscount = 0; 
  var SalesPerson = "";
  var Source = "";
  var ClientDiscount = 0;
  var ArchitectFirm = "";



for(var j = 0;j<Orders.length; j++)
{


 let OrderProjectRefNo = ""

 if(Orders[j].OrderNo.includes("/V-"))
 {
  let hyphen = Orders[j].OrderNo.lastIndexOf("/V-");
  let tempproref = Orders[j].OrderNo.substring(0, hyphen);
  let slash = tempproref.lastIndexOf("/");
  let proref = tempproref.substring(slash + 1, hyphen); 
  OrderProjectRefNo = proref
 }

 if(!Orders[j].OrderNo.includes("/V-"))
 {
  let slash = Orders[j].OrderNo.lastIndexOf("/");
  let proref = Orders[j].OrderNo.substring(slash+ 1, Orders[j].OrderNo.length);
  OrderProjectRefNo = proref
 }

  if(OrderProjectRefNo==Last[i].PROJREFNO)
  {
       SalesPerson = Orders[j].Associate  
       Source = Orders[j].Source
       ClientDiscount = Number(Orders[j].Discount)

       

 

  LedgerDetail.map((item)=>{

        let LedRefno = ""
        
  
        
        if(item.OrderNumber.includes("/V-"))
        {
         let hyphen = item.OrderNumber.lastIndexOf("/V-");
         let tempproref = item.OrderNumber.substring(0, hyphen);
         let slash = tempproref.lastIndexOf("/");
         let proref = tempproref.substring(slash + 1, hyphen); 
         LedRefno = proref
        }
  
       if(!item.OrderNumber.includes("/V-"))
       {
         let slash = item.OrderNumber.lastIndexOf("/");
         let proref = item.OrderNumber.substring(slash+ 1, item.OrderNumber.length);
         LedRefno = proref
       }
  
       if(LedRefno==OrderProjectRefNo)
       {
        if(item.ProPlusCost)
        {
          ProPlusDiscount = Number(item.ProPlusCost)
        }
       
       }
  
   })


   for(var p= 0;p<ArchProList.length; p++)
   {
    if(OrderProjectRefNo ==ArchProList[p].OrderNo)
    {
      ArchitectFirm = ArchProList[p].ArchitectFirm
    }

   }


  }

}



 var temp = {
   ProjectRefNo : Last[i].PROJREFNO,
   ProjectName:Last[i].PROJECTNAME,
   Collection: Last[i].Collection,
   PDCCollection : Last[i].PdcCollection,
   Sales : Last[i].Sales,
   WAAssociate : SalesPerson,
   Source : Source,
   ClientDiscount : ClientDiscount,
   ProPlusDiscount : ProPlusDiscount,
   ArchitectFirm : ArchitectFirm,

 }

 
 LastArray.push(temp)

}

for(var i = 0;i<Second.length;i++)
{

 

  var ProPlusDiscount = 0; 
  var SalesPerson = "";
  var Source = "";
  var ClientDiscount = 0;
  var ArchitectFirm = "";



for(var j = 0;j<Orders.length; j++)
{


 let OrderProjectRefNo = ""

 if(Orders[j].OrderNo.includes("/V-"))
 {
  let hyphen = Orders[j].OrderNo.lastIndexOf("/V-");
  let tempproref = Orders[j].OrderNo.substring(0, hyphen);
  let slash = tempproref.lastIndexOf("/");
  let proref = tempproref.substring(slash + 1, hyphen); 
  OrderProjectRefNo = proref
 }

 if(!Orders[j].OrderNo.includes("/V-"))
 {
  let slash = Orders[j].OrderNo.lastIndexOf("/");
  let proref = Orders[j].OrderNo.substring(slash+ 1, Orders[j].OrderNo.length);
  OrderProjectRefNo = proref
 }

  if(OrderProjectRefNo==Second[i].PROJREFNO)
  {
       SalesPerson = Orders[j].Associate  
       Source = Orders[j].Source
       ClientDiscount = Number(Orders[j].Discount)

       

 

  LedgerDetail.map((item)=>{

        let LedRefno = ""
        
  
        
        if(item.OrderNumber.includes("/V-"))
        {
         let hyphen = item.OrderNumber.lastIndexOf("/V-");
         let tempproref = item.OrderNumber.substring(0, hyphen);
         let slash = tempproref.lastIndexOf("/");
         let proref = tempproref.substring(slash + 1, hyphen); 
         LedRefno = proref
        }
  
       if(!item.OrderNumber.includes("/V-"))
       {
         let slash = item.OrderNumber.lastIndexOf("/");
         let proref = item.OrderNumber.substring(slash+ 1, item.OrderNumber.length);
         LedRefno = proref
       }
  
       if(LedRefno==OrderProjectRefNo)
       {
        if(item.ProPlusCost)
        {
          ProPlusDiscount = Number(item.ProPlusCost)
        }
       
       }
  
   })


   for(var p= 0;p<ArchProList.length; p++)
   {
    if(OrderProjectRefNo ==ArchProList[p].OrderNo)
    {
      ArchitectFirm = ArchProList[p].ArchitectFirm
    }

   }


  }

}



 var temp = {
   ProjectRefNo : Second[i].PROJREFNO,
   ProjectName: Second[i].PROJECTNAME,
   Collection: Second[i].Collection,
   PDCCollection : Second[i].PdcCollection,
   Sales : Second[i].Sales,
   WAAssociate : SalesPerson,
   Source : Source,
   ClientDiscount : ClientDiscount,
   ProPlusDiscount : ProPlusDiscount,
   ArchitectFirm : ArchitectFirm,

 }

 
 SecondArray.push(temp)

}

for(var i = 0;i<Third.length;i++)
{

 

  var ProPlusDiscount = 0; 
  var SalesPerson = "";
  var Source = "";
  var ClientDiscount = 0;
  var ArchitectFirm = "";



for(var j = 0;j<Orders.length; j++)
{


 let OrderProjectRefNo = ""

 if(Orders[j].OrderNo.includes("/V-"))
 {
  let hyphen = Orders[j].OrderNo.lastIndexOf("/V-");
  let tempproref = Orders[j].OrderNo.substring(0, hyphen);
  let slash = tempproref.lastIndexOf("/");
  let proref = tempproref.substring(slash + 1, hyphen); 
  OrderProjectRefNo = proref
 }

 if(!Orders[j].OrderNo.includes("/V-"))
 {
  let slash = Orders[j].OrderNo.lastIndexOf("/");
  let proref = Orders[j].OrderNo.substring(slash+ 1, Orders[j].OrderNo.length);
  OrderProjectRefNo = proref
 }

  if(OrderProjectRefNo==Third[i].PROJREFNO)
  {
       SalesPerson = Orders[j].Associate  
       Source = Orders[j].Source
       ClientDiscount = Number(Orders[j].Discount)

       

 

  LedgerDetail.map((item)=>{

        let LedRefno = ""
        
  
        
        if(item.OrderNumber.includes("/V-"))
        {
         let hyphen = item.OrderNumber.lastIndexOf("/V-");
         let tempproref = item.OrderNumber.substring(0, hyphen);
         let slash = tempproref.lastIndexOf("/");
         let proref = tempproref.substring(slash + 1, hyphen); 
         LedRefno = proref
        }
  
       if(!item.OrderNumber.includes("/V-"))
       {
         let slash = item.OrderNumber.lastIndexOf("/");
         let proref = item.OrderNumber.substring(slash+ 1, item.OrderNumber.length);
         LedRefno = proref
       }
  
       if(LedRefno==OrderProjectRefNo)
       {
        if(item.ProPlusCost)
        {
          ProPlusDiscount = Number(item.ProPlusCost)
        }
       
       }
  
   })


   for(var p= 0;p<ArchProList.length; p++)
   {
    if(OrderProjectRefNo ==ArchProList[p].OrderNo)
    {
      ArchitectFirm = ArchProList[p].ArchitectFirm
    }

   }


  }

}



 var temp = {
   ProjectRefNo : Third[i].PROJREFNO,
   ProjectName: Third[i].PROJECTNAME,
   Collection: Third[i].Collection,
   PDCCollection : Third[i].PdcCollection,
   Sales : Third[i].Sales,
   WAAssociate : SalesPerson,
   Source : Source,
   ClientDiscount : ClientDiscount,
   ProPlusDiscount : ProPlusDiscount,
   ArchitectFirm : ArchitectFirm,

 }

 
 ThirdArray.push(temp)

}




//================REPORT MAKING LAST==============================


var  ShashankLast = []
var  AnujLast = []
var  AnkitLast = []

var  ShashankSecond = []
var  AnujSecond = []
var  AnkitSecond = []

var  ShashankThird = []
var  AnujThird = []
var  AnkitThird = []




var countsocial = 0;
var countshashank = 0;
var countankit = 0; 

 for(var i =0; i< LastArray.length; i++)
 {
  
  if(Number(LastArray[i].Collection)>0)
  {
 
    var ProjectName = LastArray[i].ProjectName
    var OrderNo =  LastArray[i].ProjectRefNo
    var SalesHead =  LastArray[i].WAAssociate
    var ClientDiscount = Number(LastArray[i].ClientDiscount)
    let ArchitectFirm =LastArray[i].ArchitectFirm
    var ProPlusValue = Number(LastArray[i].ProPlusDiscount)
    var Due = 0;
    var InvoiceCollection = Number(LastArray[i].Collection)
    var Social = LastArray[i].Source

    
     if(SalesHead=="SHASHANK SINGH")
    {

      Due = (InvoiceCollection*(100-ProPlusValue)/118)*0.02

      countshashank = countshashank + 1

      var temp77 = {
        "Sno" : "1",
        "OrderNumber": OrderNo,
        "ProjectName": ProjectName,
        "ArchitectFirm": ArchitectFirm,
        "ProPlusPercent":ProPlusValue,
        "Discount" :  ClientDiscount,
        "InvoiceCollection" : InvoiceCollection,
        "Due" : Due.toFixed(2) ,
            
      }

      ShashankLast.push(temp77)

     }
    
    if(SalesHead=="ANKIT AGGARWAL")
    {

    let Type1Due = (InvoiceCollection*(100-ProPlusValue)/118)*0.10

    let Type2Due = 0;

    if(Number(ClientDiscount)<43)
    {

      let A = 43-Number(ClientDiscount)

      let B = InvoiceCollection/((100-Number(ClientDiscount))*0.01)

      let C = InvoiceCollection*ProPlusValue*0.01

   
       Type2Due = ((B*A*.01)-(C))/1.18
    // Type2Due =  ((B*A)-C)/(118*0.01)/100 //now using this formula


       // Type2Due = ((B-C)/(118*0.01))*A*0.01 earlier using this formula 



    }

    var number1 = Type1Due
    var number2 = Type2Due
    var maximum

    if (number1 > number2) {
     maximum = number1;
    } else {
    maximum = number2;
    }

    Due = maximum

    countankit = countankit +1

    var temp69 = {
      "Sno" : countankit,
      "OrderNumber": OrderNo,
      "ProjectName": ProjectName,
      "ArchitectFirm": ArchitectFirm,
      "ProPlusPercent":ProPlusValue,
      "Discount" :  ClientDiscount,
      "InvoiceCollection" : InvoiceCollection,
      "Due" : Due.toFixed(2) ,  
               
    }

    AnkitLast.push(temp69)
   
     }

    if(Social=="SOCIAL")
        {
          
          Due = (InvoiceCollection*(100-ProPlusValue)/118)*0.015;

          countsocial = countsocial +1

          var temp62 = {
            "Sno" : countsocial,
            "OrderNumber": OrderNo,
            "ProjectName": ProjectName,
            "ArchitectFirm": ArchitectFirm,
            "ProPlusPercent":ProPlusValue,
            "Discount" :  ClientDiscount,
            "InvoiceCollection" : InvoiceCollection,
            "Due" : Due.toFixed(2)                
          }
  
          AnujLast.push(temp62)
  
    } 

  }


 

 }


 


 var countsocial = 0;
 var countshashank = 0;
 var countankit = 0; 

 for(var i =0; i< SecondArray.length; i++)
{
 
 if(Number(SecondArray[i].Collection)>0)
 {

   var ProjectName = SecondArray[i].ProjectName
   var OrderNo =  SecondArray[i].ProjectRefNo
   var SalesHead =  SecondArray[i].WAAssociate
   var ClientDiscount = Number(SecondArray[i].ClientDiscount)
   let ArchitectFirm =SecondArray[i].ArchitectFirm
   var ProPlusValue = Number(SecondArray[i].ProPlusDiscount)
   var Due = 0;
   var InvoiceCollection = Number(SecondArray[i].Collection)
   var Social = SecondArray[i].Source

   
    if(SalesHead=="SHASHANK SINGH")
   {

     Due = (InvoiceCollection*(100-ProPlusValue)/118)*0.02

     countshashank = countshashank + 1

     var temp77 = {
       "Sno" : "1",
       "OrderNumber": OrderNo,
       "ProjectName": ProjectName,
       "ArchitectFirm": ArchitectFirm,
       "ProPlusPercent":ProPlusValue,
       "Discount" :  ClientDiscount,
       "InvoiceCollection" : InvoiceCollection,
       "Due" : Due.toFixed(2) ,
           
     }

     ShashankSecond.push(temp77)

    }
   
   if(SalesHead=="ANKIT AGGARWAL")
   {

   let Type1Due = (InvoiceCollection*(100-ProPlusValue)/118)*0.10

   let Type2Due = 0;

   if(Number(ClientDiscount)<43)
   {

     let A = 43-Number(ClientDiscount)

     let B = InvoiceCollection/((100-Number(ClientDiscount))*0.01)

     let C = InvoiceCollection*ProPlusValue*0.01

  
      Type2Due = ((B*A*.01)-(C))/1.18
   // Type2Due =  ((B*A)-C)/(118*0.01)/100 //now using this formula


      // Type2Due = ((B-C)/(118*0.01))*A*0.01 earlier using this formula 



   }

   var number1 = Type1Due
   var number2 = Type2Due
   var maximum

   if (number1 > number2) {
    maximum = number1;
   } else {
   maximum = number2;
   }

   Due = maximum

   countankit = countankit +1

   var temp69 = {
     "Sno" : countankit,
     "OrderNumber": OrderNo,
     "ProjectName": ProjectName,
     "ArchitectFirm": ArchitectFirm,
     "ProPlusPercent":ProPlusValue,
     "Discount" :  ClientDiscount,
     "InvoiceCollection" : InvoiceCollection,
     "Due" : Due.toFixed(2) ,  
              
   }

   AnkitSecond.push(temp69)
  
    }

   if(Social=="SOCIAL")
       {
         
         Due = (InvoiceCollection*(100-ProPlusValue)/118)*0.015;

         countsocial = countsocial +1

         var temp62 = {
           "Sno" : countsocial,
           "OrderNumber": OrderNo,
           "ProjectName": ProjectName,
           "ArchitectFirm": ArchitectFirm,
           "ProPlusPercent":ProPlusValue,
           "Discount" :  ClientDiscount,
           "InvoiceCollection" : InvoiceCollection,
           "Due" : Due.toFixed(2)                
         }
 
         AnujSecond.push(temp62)
 
   } 

 }




 }



 var countsocial = 0;
 var countshashank = 0;
 var countankit = 0; 

 for(var i =0; i< ThirdArray.length; i++)
{
 
 if(Number(ThirdArray[i].Collection)>0)
 {

   var ProjectName = ThirdArray[i].ProjectName
   var OrderNo =  ThirdArray[i].ProjectRefNo
   var SalesHead =  ThirdArray[i].WAAssociate
   var ClientDiscount = Number(ThirdArray[i].ClientDiscount)
   let ArchitectFirm =ThirdArray[i].ArchitectFirm
   var ProPlusValue = Number(ThirdArray[i].ProPlusDiscount)
   var Due = 0;
   var InvoiceCollection = Number(ThirdArray[i].Collection)
   var Social = ThirdArray[i].Source

   
    if(SalesHead=="SHASHANK SINGH")
   {

     Due = (InvoiceCollection*(100-ProPlusValue)/118)*0.02

     countshashank = countshashank + 1

     var temp77 = {
       "Sno" : "1",
       "OrderNumber": OrderNo,
       "ProjectName": ProjectName,
       "ArchitectFirm": ArchitectFirm,
       "ProPlusPercent":ProPlusValue,
       "Discount" :  ClientDiscount,
       "InvoiceCollection" : InvoiceCollection,
       "Due" : Due.toFixed(2) ,
           
     }

     ShashankThird.push(temp77)

    }
   
   if(SalesHead=="ANKIT AGGARWAL")
   {

   let Type1Due = (InvoiceCollection*(100-ProPlusValue)/118)*0.10

   let Type2Due = 0;

   if(Number(ClientDiscount)<43)
   {

     let A = 43-Number(ClientDiscount)

     let B = InvoiceCollection/((100-Number(ClientDiscount))*0.01)

     let C = InvoiceCollection*ProPlusValue*0.01

  
      Type2Due = ((B*A*.01)-(C))/1.18
   // Type2Due =  ((B*A)-C)/(118*0.01)/100 //now using this formula


      // Type2Due = ((B-C)/(118*0.01))*A*0.01 earlier using this formula 



   }

   var number1 = Type1Due
   var number2 = Type2Due
   var maximum

   if (number1 > number2) {
    maximum = number1;
   } else {
   maximum = number2;
   }

   Due = maximum

   countankit = countankit +1

   var temp69 = {
     "Sno" : countankit,
     "OrderNumber": OrderNo,
     "ProjectName": ProjectName,
     "ArchitectFirm": ArchitectFirm,
     "ProPlusPercent":ProPlusValue,
     "Discount" :  ClientDiscount,
     "InvoiceCollection" : InvoiceCollection,
     "Due" : Due.toFixed(2) ,  
              
   }

   AnkitThird.push(temp69)
  
    }

   if(Social=="SOCIAL")
       {
         
         Due = (InvoiceCollection*(100-ProPlusValue)/118)*0.015;

         countsocial = countsocial +1

         var temp62 = {
           "Sno" : countsocial,
           "OrderNumber": OrderNo,
           "ProjectName": ProjectName,
           "ArchitectFirm": ArchitectFirm,
           "ProPlusPercent":ProPlusValue,
           "Discount" :  ClientDiscount,
           "InvoiceCollection" : InvoiceCollection,
           "Due" : Due.toFixed(2)                
         }
 
         AnujThird.push(temp62)
 
   } 

 }




}


var FinalData = []



 let temp1 = {Shashank : ShashankLast,Anuj :AnujLast,Ankit : AnkitLast , Month : DateRanges[0].Month}
 FinalData.push(temp1)

 let temp2 = {Shashank : ShashankSecond,Anuj :AnujSecond,Ankit : AnkitSecond , Month : DateRanges[1].Month}
 FinalData.push(temp2)

 let temp3 = {Shashank : ShashankThird,Anuj :AnujThird,Ankit: AnkitThird , Month : DateRanges[2].Month}
 FinalData.push(temp3)




 res.json(FinalData)

 })




})



})





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