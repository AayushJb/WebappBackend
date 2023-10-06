const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const path = require('path');

//import fetch from 'node-fetch';
const fetch =require('node-fetch')

const cron = require("node-cron");
//const request = require('request');
var CustomerFeedBack= require('./models/customerfeedback');








var Order = require('./models/order.js');

var User = require('./models/user');


const { mongoose } = require('./db.js');

//const { cron } = require("./routes/architects");

const subsystemsRoutes = require("./routes/subsystems");
const systemtypesRoutes = require("./routes/systemtypes");
const systemsRoutes = require("./routes/systems");
const colorsRoutes = require("./routes/colors");
const glasssubcatRoutes = require("./routes/glasssubcats");
const glasscatRoutes = require("./routes/glasscats");
const framefinishRoutes = require("./routes/framefinishes");
const glassvariantRoutes = require("./routes/glassvariants");
const glassfinishRoutes = require("./routes/glassfinishes");
const handlevariantRoutes = require("./routes/handlevariants");
const handleRoutes = require("./routes/handles");
const modelRoutes = require("./routes/models");
const orderRoutes = require("./routes/orders");
const glassorderRoutes = require("./routes/glassorders");
const solutionRoutes = require("./routes/solutions");
const generalsettingRoutes = require("./routes/generalsettings");
const usersRoutes = require("./routes/users");
const ledgerdetailsRoutes = require("./routes/ledgerdetails");
const companyRoutes = require("./routes/companies");
const kitchentypeRoutes = require("./routes/kitchentypes");
const hingeRoutes = require("./routes/hinges");
const kitchenhandlepositionRoutes = require("./routes/kitchenhandlepositions");
const kitchenhandleRoutes = require("./routes/kitchenhandles");
const drawingRoutes = require("./routes/drawings")
const sitedetailRoutes = require("./routes/sitedetails");
const fullglassvarsRoutes = require("./routes/fullglassvariants");
const commercialWinRoutes = require("./routes/commercialwins");
const handoverRoutes = require("./routes/handovers");
const designRoutes = require("./routes/designs");
const gridRoutes = require("./routes/grids");
const specialrequestRoutes = require("./routes/specialrequests");
const stateRoutes = require("./routes/states.js")
const updateorderRoutes = require("./routes/updateorders.js")
const analyticsRoutes = require("./routes/analytics.js")
const glassonlyfinishRoutes = require("./routes/glassonlyfinishes");
const punchitemsRoutes = require("./routes/punchitems");

const PunchItemData = require('./models/punchitem');


//const mailingOrdersRoutes =  require("./routes/mailingorders");
//const mailingReports = require("./routes/mailingreports.js");
//const monthlyReports =  require("./routes/monthlyreports.js");
//const proplusreports = require("./routes/proplusmonthly.js");
//const winningOrdersRoutes = require("./routes/winningcommercialsholds.js")

const dialyassociatesreportRoutes = require("./routes/dailyassociatesreport.js")
const associatewise = require("./routes/associatewise.js")



const { response } = require('express');
const { transcode } = require('buffer');
const { listenerCount } = require('cluster');




var app = express();
app.use(bodyParser.json({ limit: '20mb' }));
app.use(express.json());
app.use(cors({ origin: [ 'http://localhost:4200', 'http://3.109.31.86','http://waltzwebpro.jbglasshouse.com'] }));
app.use("/colors",express.static(path.join("colors")));
app.use("/glassvariants",express.static(path.join("glassvariants")));
app.use("/glassfinishes",express.static(path.join("glassfinishes")));
app.use("/handlevariants",express.static(path.join("handlevariants")));
app.use("/handles",express.static(path.join("handles")));
app.use("/orientations",express.static(path.join("orientations")));
app.use("/hinges",express.static(path.join("hinges")));
app.use("/kitchenhandlepositions",express.static(path.join("kitchenhandlepositions")));
app.use("/kitchenhandles",express.static(path.join("kitchenhandles")));
app.use("/drawings",express.static(path.join("drawings")));
app.use("/kitchentypes",express.static(path.join("kitchentypes")));
app.use("/grids",express.static(path.join("grids")));
app.use("/glassonlyfinishes",express.static(path.join("glassonlyfinishes")));




var port = process.env.PORT || 3001;


app.listen(port, () => console.log('Server started at port : 3001'));


app.use("/api/subsystems",subsystemsRoutes);
app.use("/api/systemtypes",systemtypesRoutes);
app.use("/api/systems",systemsRoutes);
app.use("/api/colors",colorsRoutes);
app.use("/api/glasssubcats",glasssubcatRoutes);
app.use("/api/glasscats",glasscatRoutes);
app.use("/api/framefinishes",framefinishRoutes);
app.use("/api/glassvariants",glassvariantRoutes);
app.use("/api/glassfinishes",glassfinishRoutes);
app.use("/api/handlevariants",handlevariantRoutes);
app.use("/api/handles",handleRoutes);
app.use("/api/models",modelRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/glassorders",glassorderRoutes);
app.use("/api/designs",designRoutes);
app.use("/api/solutions",solutionRoutes);
app.use("/api/generalsettings",generalsettingRoutes);
app.use("/api/users",usersRoutes);
app.use("/api/ledgerdetails",ledgerdetailsRoutes);
app.use("/api/companies",companyRoutes);
app.use("/api/kitchentypes",kitchentypeRoutes);
app.use("/api/hinges",hingeRoutes);
app.use("/api/kitchenhandlepositions",kitchenhandlepositionRoutes);
app.use("/api/kitchenhandles",kitchenhandleRoutes); 
app.use("/api/drawings",drawingRoutes);
app.use("/api/sitedetails",sitedetailRoutes);
app.use("/api/fullglassvars",fullglassvarsRoutes);
app.use("/api/commercialwins",commercialWinRoutes);
app.use("/api/handovers",handoverRoutes);
app.use("/api/grids",gridRoutes);
app.use("/api/specialrequests",specialrequestRoutes);
app.use("/api/states",stateRoutes);
app.use("/api/updateordersource",updateorderRoutes);
app.use("/api/analytics",analyticsRoutes);
app.use("/api/glassonlyfinishes",glassonlyfinishRoutes);
app.use("/api/punchitems",punchitemsRoutes);


//app.use("/api/incentives",mailingReports);
//app.use("/api/proplusreports",proplusreports);



//=======TEsting routes ======== 



const client_id = "5c8f5ac731b4bc9285588af2969768a738e4a75312249959b368081322069da8"
const client_secret = "58cac5aee05f25af3ee9c58bcdb7e70995ea2aab52290727b18182052d98da71"
var access_key;

console.log({ client_id, client_secret })

//app.use("/api/mailingreports",mailingReports);



app.post('/api/whatsapp', (req, res) => {

var Order = req.body.NewOrder;



User.find()
.then((response)=>{

  let PhoneNumber = ""


  console.log(response)

 
  response.map(item=>{

   if(item.UserFullName==Order.Associate)
   {
    PhoneNumber = item.PhoneNo
   }

   
   
  })




  let OrderNo = Order.OrderNo;
  let Associate = Order.Associate;
  let Amount = Order.FinalAmount;
  let EditDate = Order.EditDate;
  let ProjectManager = "Sanjay Aggarwal"
  let ProjectPhonenumber = "8800994446"

  if(Order.Associate=="GAURAV SINGHAL")
  {
    WhatsApp(PhoneNumber,OrderNo,Associate,Amount,EditDate,ProjectManager,ProjectPhonenumber)
  }
 


  
})





  /*

  NewAndOldOrder = {
    NewOrder : orderPrev,
    OldOrder : "",
    User : "",
    UserID : "",
    Profile :"" 
   }
*/



 // WhatsApp()
});



async function WhatsApp(PhoneNumber,OrderNo,Associate,Amount,EditDate,ProjectManager,ProjectPhonenumber)
{
 
  const res = await fetch(`http://waba.notbot.in/cloud/v1/messages`, {
  method: 'POST',
  qs: {run_configurable_validations: 'false'},
  headers: {
    'API-KEY': '64e9baf07257825730aa6043',
    'content-type': 'application/json',
 
   },
  body: JSON.stringify(
    {
      "to": PhoneNumber,
      "recipient_type": "individual",
      "type": "template",
      "template": {
          "language": {
              "policy": "deterministic",
              "code": "en"
          },
          "name": "new_message",
          "components": [
              {
                  "type": "body",
                  "parameters": [
                      {
                          "type": "text",
                          "text": Associate
                      },
                      {
                          "type": "text",
                          "text": OrderNo
                      },
                      {
                          "type": "text",
                          "text": Amount
                      },
                      {
                          "type": "text",
                          "text": EditDate
                      },
                      {
                          "type": "text",
                          "text": ProjectManager
                      },
                      {
                          "type": "text",
                          "text": ProjectPhonenumber
                      }
                  ]
              },
              {
                  "type": "button",
                  "sub_type": "url",
                  "index": 1,
                  "parameters": [
                      {
                          "type": "text",
                          "text": "www.jbglass.in"
                      }
                  ]
              }
          ]
      }
  }
  )
 
})

const data = await res.json();

console.log(data)

 

}

















//===================WEBHOOK OF PROCORE TO RECORD DATA OF CHANGE IN PUNCH LIST=======================================
//===================WEBHOOK OF PROCORE TO RECORD DATA OF CHANGE IN PUNCH LIST=======================================
//===================WEBHOOK OF PROCORE TO RECORD DATA OF CHANGE IN PUNCH LIST=======================================
//===================WEBHOOK OF PROCORE TO RECORD DATA OF CHANGE IN PUNCH LIST=======================================

app.post('/api/procore-webhook', (req, res) => {

  const Notification = req.body;

  var ProjectID = Notification.project_id;
  var PunchID = Notification.resource_id;

  console.log("here")

  res.status(200).send('Notification received');

  getAccessToken()
 .catch((error)=>{
    if(error)
    {
      let status = "Error Occured"
      res.json(status)
    }
  })
  .then((response)=>{
  

    return GetProjectForRecord(response, ProjectID)

  })
  .catch((error)=>{
    if(error)
    {
      let status = "Error Occured"
      res.json(status)
    }
  })
  .then((response)=>{

    //{AccessToken : access_token, ProcoreOrder : data}
    var OrderNumber = response.ProcoreOrder.project_number;
    var AccessToken = response.AccessToken

    return GetPunchItemforRecord(AccessToken,ProjectID,PunchID,OrderNumber)

  })
  .catch((error)=>{
    if(error)
    {
      let status = "Error Occured"
      res.json(status)
    }
  })
  .then((response)=>{

  //  {AccessToken : access_token,PunchData : data, OrderNumber : OrderNumber}

   var AccessToken = response.AccessToken;
   var PunchData = response.PunchData;
   var OrderNumber = response.OrderNumber;
   var PunchID = response.PunchID;


   
   return GetCompanyUsersforRecord(AccessToken, OrderNumber , PunchData, PunchID)

  })
  .catch((error)=>{
    if(error)
    {
      let status = "Error Occured"
      res.json(status)
    }
  })
  .then((response)=>{

    let Today = new Date()

    
     const year = Today.getFullYear();
     const month = Today.getMonth()+1;
     const day = Today.getDate();
     const hours = Today.getHours();
     const minutes = Today.getMinutes();

     var DateFormat = day+"-"+month+"-"+year
     var TimeFormat = hours + "." + minutes
   

    var CompanyUsers = response.CompanyUsers;
    var OrderNumber = response.OrderNumber;
    var PunchData =response.PunchData;
    var PunchID = response.PunchID

    var BallinCourtProfile = "";

    CompanyUsers.map(item=>{
      if(item.id==PunchData.ball_in_court[0].id)
      {
        BallinCourtProfile =item.job_title; 
      }
    })

   


    const punchitemdata  = new PunchItemData({
      ProjectID: ProjectID, 
      PunchID :  PunchID, 
      OrderNumber : OrderNumber, 
      ItemTitle :  PunchData.name, 
      ItemNumber : PunchData.position, 
      ItemStatus : PunchData.workflow_status, 
      ItemLocation : PunchData.location.name, 
      DueDate : PunchData.due_date,
      BallinCourt : PunchData.ball_in_court[0].name,
      BallinCourtProfile : BallinCourtProfile,
      DateNotified : PunchData.assignments[0].notified_at,
      Assignee : PunchData.assignments[0].login_information_name, 
      EditDate : DateFormat,
      EditTime : TimeFormat
    });

     


    punchitemdata.save().then(createdOrder =>{
       console.log("notifiaction recorded")
    });
  
  })


  

 
  
  /*
     {
       user_id: 7878155,
       ulid: '01H8BGH3HC0AHXPAEPYK9D0FHE',
       timestamp: '2023-08-21T07:39:11.040020Z',
       resource_name: 'Punch Items',
       resource_id: 562949957074711,
       project_id: 562949954416455,
       metadata: {
         source_user_id: 7878155,
         source_project_id: 562949954416455,
         source_operation_id: null,
         source_company_id: 562949953442334,
         source_application_id: null
       },
       id: 10625538300,
       event_type: 'update',
       company_id: 562949953442334,
       api_version: 'v2'
     }

 */


 
});



//===================PROJECT DETAILS=======================================
//===================PROJECT DETAILS=======================================
//==================PROJECT DETAILS=======================================


app.post('/api/procoreprojectDetails', (req, res) => {

  let ProjectID = req.body.ProjectID 

  let OrderNumber = req.body.OrderNo

  console.log(ProjectID)
  
  getAccessToken()
  .catch((error)=>{
     if(error)
     {
       let status = "Error Occured"
       res.json(status)
     }
   })
   .then((response)=>{

     return ListProcoreProjectsforP(response)
   })
   .catch((error)=>{
    if(error)
    {
      let status = "Error Occured"
      res.json(status)
    }
  })
  .then((response)=>{
    

   // { ProcoreProjects : data, AccessToken : access_token}

    let ProcoreOrders = response.ProcoreProjects
    let AccessToken = response.AccessToken
    let FoundProcoreOrderID = "";


    
        
    let ProjectRefNo = ''
    let version = ''



    if(OrderNumber.includes("/V-"))
    {
     let hyphen = OrderNumber.lastIndexOf("/V-");
     version = OrderNumber.substring(hyphen + 1,OrderNumber.length);
     let tempproref = OrderNumber.substring(0, hyphen);
     let slash = tempproref.lastIndexOf("/");
     let proref = tempproref.substring(slash + 1, hyphen); 
     ProjectRefNo = proref
     
    }
 
    if(!OrderNumber.includes("/V-"))
    {
     
     let slash = OrderNumber.lastIndexOf("/");
     let proref = OrderNumber.substring(slash+ 1, OrderNumber.length);
     ProjectRefNo = proref
    }  


    
 

    

    for(var i =0; i<ProcoreOrders.length; i++)
    {
       let ProcoreProNum

       let ProSlash = ProcoreOrders[i].project_number.lastIndexOf("/")
       ProcoreProNum = ProcoreOrders[i].project_number.substring(0,ProSlash);




      if(ProcoreProNum==ProjectRefNo)
      {
        FoundProcoreOrderID = ProcoreOrders[i].id
      }
    }


    let NewRes = {ProjectID : FoundProcoreOrderID, AccessToken : AccessToken}

    return NewRes





  })

   .then((response)=>{

    let AccessToken = response.AccessToken
    let ProjectID = response.ProjectID

    return GetProcorePunchID(AccessToken, ProjectID)

   }).then((response)=>{

     let PunchIDs = response

     return GetJBProjectReport(OrderNumber,PunchIDs)

   })
   .then((response)=>{

   res.json(response)
  })


});


//===================PROJECT DETAILS=======================================
//===================PROJECT DETAILS=======================================
//==================PROJECT DETAILS=======================================


async function GetJBProjectReport(ProRefNo,PunchIDs)
{
 
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjectJsonOnline?PROJREF_NO=${ProRefNo}`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
     }
    
   
  })
 
const data = await res.json();
var Details = {CSData : data, PunchItemData :PunchIDs }

return Details

}



async function GetProjectForRecord(access_token, ProjectID)
{

 

const res = await fetch(`https://api.procore.com/rest/v1.0/projects/${ProjectID}?company_id=562949953442334`, {
  method: 'GET',
  qs: {run_configurable_validations: 'false'},
  headers: {
  Authorization: `Bearer ${access_token}`,
  'content-type': 'application/json',
  'Procore-Company-Id': 562949953442334
   }

 
})


const data = await res.json();

var details = {AccessToken : access_token, ProcoreOrder : data}

return details

}


async function GetPunchItemforRecord(access_token,ProjectID,PunchID,OrderNumber)
{


  const res = await fetch(`https://api.procore.com/rest/v1.1/punch_items/${PunchID}?project_id=${ProjectID}`, {
    method: 'GET',
    qs: {run_configurable_validations: 'false'},
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     }
  
   
  })

const data = await res.json();




const Details = {AccessToken : access_token,PunchData : data, OrderNumber : OrderNumber,PunchID : PunchID}
return Details

}
 

async function GetCompanyUsersforRecord(access_token, OrderNumber , PunchData, PunchID)
{

 

const res = await fetch(`https://api.procore.com/rest/v1.0/companies/562949953442334/users?company_id=562949953442334`, {
  method: 'GET',
  qs: {run_configurable_validations: 'false'},
  headers: {
  Authorization: `Bearer ${access_token}`,
  'content-type': 'application/json',
  'Procore-Company-Id': 562949953442334
   }

 
})


const data = await res.json();

var details = {AccessToken : access_token, OrderNumber : OrderNumber, PunchData : PunchData,CompanyUsers : data ,PunchID : PunchID}

return details

}


async function ListProcoreProjectsforP(access_token)
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

let Details = { ProcoreProjects : data, AccessToken : access_token}

return Details;


}







//===================WEBHOOK OF PROCORE TO RECORD DATA OF CHANGE IN PUNCH LIST=======================================
//===================WEBHOOK OF PROCORE TO RECORD DATA OF CHANGE IN PUNCH LIST=======================================
//===================WEBHOOK OF PROCORE TO RECORD DATA OF CHANGE IN PUNCH LIST=======================================



app.get('/api/getjb', async(req, res) => {
  
  var ProRefNo = req.query.prorefno;
  const GetJBData = await GetJB(ProRefNo)
  res.json(GetJBData)
});





//==========================================================
app.get('/api/writetocs', async(req, res) => {

  const WriteOperation = await TestCreateProjectCS()

  console.log(WriteOperation)
  res.json(WriteOperation)
  
});



async function TestCreateProjectCS()
{
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/SaveProjectData`, {
    method: 'POST',
    headers: {
    'content-type': 'application/json',
     },
    body: JSON.stringify(
      
        {
          projId: "", 
          refno : "12111", 
          projval :"4522",
          projname : "test", 
          windate : "25-7-2023", 
          totsys : 1,
          totsqm :1, 
          lasteditdt :"25-7-2023", 
          remark :"TEST", 
          Enq_Thr :"ONLINE", 
          Proj_Dt : "25-7-2023", 
          Category :"A", 
          Proj_Importance :"YES",
          job_type :"EOU", 
          Est_SDate :"25-7-2023", 
          Est_EDate : "25-7-2023", 
          Clad_Area :"10",  
          Client_Req :"test", 
          Site_Add : "Location", 
          Landmark :"Architect", 
          Tel1 : "0", 
          FaxNo :"", 
          Tel2 :"3",
          Email  :"TEST@GMAIL.COM",
          No_Layer :"2",
          Description :"LAMINATION WITH IGU",
          Qtuantity :"10",
          Aprx_Prdct_Val :"980000",
          Sell_Rate :"2000",
          city : "XXXXX",
          projtype :  "Win",
          buildtype : "SOCIAL",
          buildperf : "SHASHANK SINGH",
          facadele : "JB GLASS"


          }
      
    )
   
  })
 
const data = await res.json();


console.log(data)



return data
 
}


async function TestUpdateProjectCS()
{

  const res = await fetch(`http://103.203.224.171/Project/api/Rec/SaveProjectData`, {
    method: 'POST',
    headers: {
    'content-type': 'application/json',
     },
    body: JSON.stringify(
      
        {
          projId: "", 
          refno : "569", 
          projval :"144.55",
          projname : "TEST CS", 
          windate :"25-03-2023", 
          totsys :"5",
          totsqm :"88", 
          lasteditdt :"18-03-2023", 
          remark :null, 
          Enq_Thr :"ONLINE", 
          Proj_Dt :"25-03-2023", 
          Category :"A", 
          Proj_Importance :"YES",
          job_type :"EOU", 
          Est_SDate :"25-03-2023", 
          Est_EDate :"25-03-2024", 
          Clad_Area :"5000",  
          Client_Req :"2000", 
          Site_Add :"MUMBAI", 
          Landmark :"GHANSHOLI", 
          Tel1 :"9898556698", 
          FaxNo :"", 
          Tel2 :"",
          Email  :"TEST@GMAIL.COM",
          No_Layer :"2",
          Description :"LAMINATION WITH IGU",
          Qtuantity :"10",
          Aprx_Prdct_Val :"980000",
          Sell_Rate :"2000",
          city : "mumbai",
          projtype : "WIN",
          buildtype : "SOCIAL",
          buildperf : "ANUJ JAIN",
          facadele : "AAREN INTPRO",
        
          }
      
    )
   
  })
 
const data = await res.json();


console.log(data)



return data
}







//===========================================================


//=====================TEST GETTING ALL CS ORDERS=======================
//======================================================================

app.post('/api/getjbfulldata', async(req, res) => {
  
  var WinOrdersList = req.body;

  
  let CSData = [];

  for(var i = 0 ; i < WinOrdersList.length; i++)
  {
    GetJBForBulk( WinOrdersList[i]).then(data=>{
   
     CSData.push(data)
   })
   .catch(error=>{
  

    return new Promise(resolve => setTimeout(resolve, 1000))
    .then(() => GetJBForBulk( WinOrdersList[i]));
   })

  }




});

app.post('/api/getsalesreportcs',async(req, res)=>{

  var StartDate = req.body.StartDate;
  var EndDate =  req.body.EndDate;

  const SalesReport = await GetSalesDataforbulk(StartDate,EndDate)

  res.json(SalesReport)


})


async function GetSalesDataforbulk(StartDate,EndDate)
{
 
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjSalesCol?FromDate=${StartDate}&ToDate=${EndDate}&refno=`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
     }
    
   
  })
 
  const data = await res.json();
  var Details = data

  return Details

}




async function GetAllCSData(WinOrdersList)
{


  var CSDataPromises = [];
  WinOrdersList.map((item)=> {
    CSDataPromises.push(GetJBForBulk(item))
  }

  )
 

  


 const results = await Promise.allSettled(CSDataPromises);

  return results
  

/*
   await Promise.all(
    WinOrdersList.map(async (id) => {
      const response = GetJBForBulk(id)
      const todo = await response.json()
      console.log(todo)
    })
  )
  */
 
}






app.post('/api/getcsdaterangeprojects', async(req, res) => {
  
  var StartDate = req.body.StartDate;
  var EndDate =  req.body.EndDate;

  const CSData = await GetCSDateRangeData(StartDate,EndDate)

 
  res.json(CSData)


})
async function GetCSDateRangeData(StartDate,EndDate)
{
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjectJsonOnlineAll?Sdate=${StartDate}&Edate=${EndDate}`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
     }
    
   
  })
 
  const data = await res.json();
  

  return data

}





async function GetJBForBulk(ProRefNo)
{
 
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjectJsonOnline?PROJREF_NO=${ProRefNo}`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
     }
    
   
  })
 
  const data = await res.json();
  var Details = data

  return Details

}


//======================================================================
//======================================================================








//=====================================================CS ==================================================


async function GetJB(ProRefNo)
{
 
  const res = await fetch(`http://103.203.224.171/Project/api/Rec/GetProjectJsonOnline?PROJREF_NO=${ProRefNo}`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
     }
    
   
  })
 
const data = await res.json();
var Details = data

return Details

}





//=================================PROCORE CREDENTIALS==============================================================================


//=============================PROCORE CODE==========================================================================================

//===================================================================================================================================




//====================================GETTING ACCESS TOKEN============================================================================
async function getAccessToken() {

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

return Promise.resolve(params.get("access_token"))

}


async function getAccessTokenForPunch(projectID,Solutions,Order)
{
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


var access = params.get("access_token")

var ProjectDetails = {AccessToken : access,projectID : projectID,Solutions : Solutions,Order : Order }


return ProjectDetails
}

async function getAccessTokenForHandOver(projectID)
{
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


var access = params.get("access_token")

var ProjectDetails = {AccessToken : access,projectID : projectID }


return ProjectDetails
}


//========================================================================================================================

                                                  /*   ROUTES   */

//========================================================================================================================
//562949953539962  JB ACCOUNTS
//8456909 Utkalika
//10396685 JB ACCOUNTS USER

//==================================================WEB PRO PROCORE =============================================
app.get('/api/connectprocore', async(req, res) => {

 
  const token = await  getAccessToken();

  let access_key = token;

  


  const Clients = await GetProjectstest(access_key)
  console.log(Clients)
  res.json(Clients)

  //562949953858150

});

//562949953754754



app.get('/api/testprojectdetails', async(req, res) => {

 
  const token = await  getAccessToken();

  let access_key = token;

  


  const Clients = await GetProjectstest(access_key)
  console.log(Clients)
  res.json(Clients)

  //562949953858150

});


async function GetProjectstest(access_token)
{
 //562949953862593
 ///rest/v1.0/companies/{company_id}/users

 ///rest/v1.0/projects/562949954183324/punch_item_assignments/562949955856036
 ///rest/v1.0/punch_items/{id}
  
  const res = await fetch('https://api.procore.com/rest/v1.0/punch_items/562949955856036?project_id=562949954183324', {
    method: 'GET',
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     }
   
  })

const data = await res.json();

return data

}

//======================================================================================================
//======================================================================================================

app.get('/api/procoreprojectsanalytics', async(req, res) => {

 

  getAccessToken()
  .then((response)=>{  
    return GetProcoreProjectsForReport(response)
  })
  .then((response)=>{

    res.json(response)
    
  })

})





app.get('/api/getcompanyvendors', async(req, res) => {

  const token = await  getAccessToken();

  let access_key = token;

  const CompanyVendors = await GetCompanyVendors(access_key)
  res.json(CompanyVendors)


});

async function GetCompanyVendors(access_token)
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



return data

}


//===================================PROCORE PROJECT CREATION===================================================================
//==============================================================================================================================
app.post('/api/makeglassproject', async(req, res) => {

  var Order = req.body.Order;
  var Users = req.body.Users;
  var LedgerDetail = req.body.LedgerDetail;

  console.log(Order)

  CreateGlassProjectCS(Order,LedgerDetail,Users)
  .catch((error)=>{
    if(error)
    {
      let status = "Error Occured"
      res.json(status)
    }
    })
  .then((response)=>{    
      
    res.json(response)
      
  })
    

    

 

})



//=====================================MAKE GLASS ORDER IN CS====================================================================
//===============================================================================================================================
 app.post('/api/makeprocoreproject', async(req, res) => {

  var OrderNumber = req.body.Order.OrderNo;
  var LedgerDetail = req.body.LedgerDetail;
  var Order = req.body.Order;
  var Users = req.body.Users;
 
  

   
  CreateProjectCS(Order,LedgerDetail,Users)
  .catch((error)=>{
   if(error)
   {
     let status = "Error Occured"
     res.json(status)
   }
   })
   //start procore 
  .then((response)=>{
     return getAccessToken()
   })
   
  .catch((error)=>{
   if(error)
   {
     let status = "Error Occured"
     res.json(status)
   }
   })
  .then((response)=>{ 
 
   var userData = req.body.Users
   var Order = req.body.Order
 
 

 
 
 
   let DealerDiscount =""
   let CSValue = ""
 
   for(var i = 0 ; i < userData.length ; i++)
   {
    if(userData[i].UserFullName == Order.Associate)
    {
     Order.OfficeID = userData[i].ProcoreOfficeID;
     DealerDiscount = userData[i].DealerDiscount; 
    }
   }
 
    if(DealerDiscount=="0")
    {
     CSValue = Order.FinalAmount.toString()
    }
 
    if(DealerDiscount!=="0")
    {
     CSValue = (Number(Order.GrandTotal) - Number(Order.GrandTotal)*Number(DealerDiscount)*0.01).toFixed(2).toString()
    }
 
 
    Order.CSValue = CSValue;
 
 
    return ListProcoreProjects(response,req.body.Order,req.body.LedgerDetail)
   })
  .catch((error)=>{
     if(error)
     {
       let status = "Error Occured"
       res.json(status)
     }
   })
  .then((response)=>{


 
     var ProcoreOrders = response.ProcoreOrders;
     var Order = response.Order;
     var AccessToken = response.AccessToken;
     var LedgerDetail = response.LedgerDetail;
 
     var FoundProcoreOrderID
 
     
     let ProjectRefNo = ''
 
     let version = ''
 
 
 
     if(Order.OrderNo.includes("/V-"))
     {
      let hyphen = Order.OrderNo.lastIndexOf("/V-");
      version = Order.OrderNo.substring(hyphen + 1,Order.OrderNo.length);
      let tempproref = Order.OrderNo.substring(0, hyphen);
      let slash = tempproref.lastIndexOf("/");
      let proref = tempproref.substring(slash + 1, hyphen); 
      ProjectRefNo = proref
      
     }
  
     if(!Order.OrderNo.includes("/V-"))
     {
      
      let slash = Order.OrderNo.lastIndexOf("/");
      let proref = Order.OrderNo.substring(slash+ 1, Order.OrderNo.length);
      ProjectRefNo = proref
     }  
 
 
     
  
 
     
 
     for(var i =0; i<ProcoreOrders.length; i++)
     {
        let ProcoreProNum
 
        let ProSlash = ProcoreOrders[i].project_number.lastIndexOf("/")
        ProcoreProNum = ProcoreOrders[i].project_number.substring(0,ProSlash);
 

 
 
       if(ProcoreProNum==ProjectRefNo)
       {
         FoundProcoreOrderID = ProcoreOrders[i].id
       }
     }
 
  
     var ResponseData = {FoundProcoreOrderID : FoundProcoreOrderID,AccessToken : AccessToken,Order : Order, LedgerDetail:LedgerDetail}
 
 
     return ResponseData
    
 
   })
  .catch((error)=>{
     if(error)
     {
       let status = "Error Occured"
       res.json(status)
     }
    })
   .then((response)=>{
 
     var FoundProcoreOrderID = response.FoundProcoreOrderID
     var Order = response.Order;
     var AccessToken = response.AccessToken;
     var LedgerDetail = response.LedgerDetail;
 
    
 
     if(response.FoundProcoreOrderID)
     {
       return  InActiveExistingProject(AccessToken,FoundProcoreOrderID,Order,LedgerDetail)
     }
 
     if(!response.FoundProcoreOrderID)
     {
       let ResponseData = { Order : Order, LedgerDetail : LedgerDetail, AccessToken : AccessToken}
       return ResponseData
     }
   })
   .catch((error)=>{
     if(error)
     {
       let status = "Error Occured"
       res.json(status)
     }
    })
   .then((response)=>{
 
     var Order = response.Order;
     var AccessToken = response.AccessToken;
     var LedgerDetail = response.LedgerDetail;
 
     let ProjectRefNo = ''
     let VersionNumber = '';
 
     if(Order.OrderNo.includes("/V-"))
     {
      let hyphen = Order.OrderNo.lastIndexOf("/V-");
      VersionNumber = Order.OrderNo.substring(hyphen + 1,Order.OrderNo.length);
      let tempproref = Order.OrderNo.substring(0, hyphen);
      let slash = tempproref.lastIndexOf("/");
      let proref = tempproref.substring(slash + 1, hyphen); 
      ProjectRefNo = proref + "/"+ VersionNumber
      
     }
  
     if(!Order.OrderNo.includes("/V-"))
     {
      
      let slash = Order.OrderNo.lastIndexOf("/");
      let proref = Order.OrderNo.substring(slash+ 1, Order.OrderNo.length);
      ProjectRefNo = proref
     }
   
 
 
     var active = "true";
     
     var addressline1  = '';
     var addressline2 = '';
     var addressline3 =''

     if(LedgerDetail.AddressLine1)
     {
      addressline1 =  LedgerDetail.AddressLine1.toUpperCase();
     }

     if(LedgerDetail.AddressLine2)
     {
      addressline2 =  LedgerDetail.AddressLine2.toUpperCase();
     }

     if(LedgerDetail.AddressLine3)
     {
      addressline3 =  LedgerDetail.AddressLine3.toUpperCase();
     }
    

     var address = addressline1 + "," + addressline2 + "," + addressline3;
     var city = LedgerDetail.City.toUpperCase();
     var state_code = LedgerDetail.State;
     var country_code = "IN"
     var start_date = Order.WinDate;
     var completion_date =  Order.CompletionDate;
     var total_value =  (Number(Order.FinalAmount)/100000).toFixed(2);
     var name = Order.ProjectName.toUpperCase()
     var office_id = Order.OfficeID;
     var phone = LedgerDetail.CDMobile1;
     var project_number =ProjectRefNo;
 
     var Version =   VersionNumber;
     var square_feet = Math.ceil(Number(Order.TotalSquareFeet));
     var time_zone = "New Delhi"
     var tz_name = "Asia/Kolkata" 
     var zip = LedgerDetail.Pincode;
     var project_type_id = "562949953511908";
     var estimated_value = Math.ceil(Number(Order.FinalAmount));
     var estimated_start_date = Order.CommercialWinDate;
     var estimated_completion_date = Order.CompletionDate;
 
    //existing client  98852
    //Existing Architect  97591
    //Social 97592
    //Exhibition 97593
 
     var source = "";
 
     if(Order.Source=="SOCIAL")
     {
       source = 260429;
     }
     if(Order.Source=="ARCHITECT EXISTING")
     {
       source = 260432;
     }
     if(Order.Source=="EXIHIBITION")
     {
       source = 260433;
     }
     if(Order.Source=="CLIENT EXISTING")
     {
       source = 260431;
     }
     if(Order.Source=="OTHERS")
     {
       source = 260430;
     }
     if(Order.Source=="WALK IN")
     {
       source = 260711;
     }
   
 
     var actual_start_date = Order.WinDate
     var projected_finish_date = Order.CompletionDate;
 
 
     var ED = Order.EditDate.split("-")[0];
     var EDMonth = Order.EditDate.split("-")[1];
     var EDYear = Order.EditDate.split("-")[2];
     var EDFormat = EDYear+"-"+EDMonth+"-"+ ED; 
     var editdate = new Date(EDFormat)
 
     var PD = Order.CreationDate.split("-")[0];
     var PDMonth = Order.CreationDate.split("-")[1];
     var PDYear = Order.CreationDate.split("-")[2];
     var PDFormat = PDYear+"-"+PDMonth+"-"+PD
 
 
 
 
 
     var pipelinedate = new Date(PDFormat);
     var Solutions = Order.Solutions;
     var Discount = Order.Discount;
     var ProjectName = Order.ProjectName;
     var Associate = Order.Associate;
     var WebappAmount = Order.FinalAmount;
     var TotalSquareFeet = Order.TotalSquareFeet;
     var ProPlusCost =  0;
     if(LedgerDetail.ProPlusCost)
     {
       ProPlusCost = Number(LedgerDetail.ProPlusCost);
     }
     if(!LedgerDetail.ProPlusCost)
     {
       ProPlusCost = 0;
     }
 
 
     var Region = 562949953432874
   
     {
       if(Associate =="SHASHANK SINGH"|| Associate =="ANUJ JAIN"||Associate =="VIKAS SINGHAL"||Associate =="VIPIN KUMAR"||Associate =="GAURAV SINGHAL"||Associate =="ANKIT AGGARWAL"||Associate =="AAYUSH PANDEY"||Associate =="PRAVEEN OJHA")
       {
         Region = 562949953432874
       }
 
       if(Associate =="RIYAZ SAYYED"||Associate =="SAKINA BATISH"||Associate=="RUCHIR")
       {
         Region = 562949953430195
       }
 
       if(Associate =="NAYAN PATIL" || Associate =="UTKALIKA")
       {
         Region = 562949953430196

       }
 
       if(Associate =="RAHUL JAISWAL")
       {
         Region = 562949953430195
       }
      
       if(Associate =="VISHAL PARIKH")
       {
         Region = 562949953430195
       }
 
       if(Associate =="RAJENDRA BADAYA")
       {
         Region = 562949953430194
       }

       if(Associate == "JB ACCOUNTS")
       {
        Region = 562949953432874
       }
 
 
 
     }
 

 
      
      return UpdateProcoreProject(AccessToken,Order.ProjectID,active,address,city,country_code,start_date,completion_date,total_value,name,office_id,phone,project_number,square_feet,time_zone,zip,project_type_id,estimated_value,estimated_start_date,estimated_completion_date,state_code,source,actual_start_date,tz_name,projected_finish_date,editdate,pipelinedate,Solutions,Discount,ProjectName,Associate,WebappAmount,TotalSquareFeet,ProPlusCost,Version,Order,Region,LedgerDetail)  
 
     
 
    })
    .catch((error)=>{
     if(error)
     {
       let status = "Error Occured"
       res.json(status)
     }
    })
   .then((response)=>{
 
     let access_token = response.AccessToken
     let ProjectID = response.ProjectID
     let Order = response.Order
     let LedgerDetail =  response.LedgerDetail
    
     if(!ProjectID)
     {
       let status = "Error Occured"
       return status
     }
 
     if(ProjectID)
     {
 
       let ProjectRefNo = ''
 
     
 
       if(Order.OrderNo.includes("/V-"))
       {
        let hyphen = Order.OrderNo.lastIndexOf("/V-");
        let tempproref = Order.OrderNo.substring(0, hyphen);
        let slash = tempproref.lastIndexOf("/");
        let proref = tempproref.substring(slash + 1, hyphen); 
        ProjectRefNo = proref
        
       }
    
       if(!Order.OrderNo.includes("/V-"))
       {
        
        let slash = Order.OrderNo.lastIndexOf("/");
        let proref = Order.OrderNo.substring(slash+ 1, Order.OrderNo.length);
        ProjectRefNo = proref
       }  
    
   
       var Links = [
         {
           title : "Measurement Sheet",
           link :  "http://3.109.31.86/measurementsheet/"+ProjectRefNo
         },
         {
           title : "Goods Delivery Note",
           link :  "http://3.109.31.86/goodsdelivery/"+ProjectRefNo
         },
         {
           title : "Work Completion Sheet",
           link :  "http://3.109.31.86/workcompletion/"+ProjectRefNo
         },
         {
           title : "Customer Feedback",
           link :  "http://3.109.31.86/customerfeedback/"+ProjectRefNo
         }
        
       ]
   
      let LinksPromises = []
   
      for(var i =0;i<Links.length;i++)
      {
       LinksPromises.push(CreateProcoreProjectLink(access_token,ProjectID,Order,Links[i].title,Links[i].link,LedgerDetail))
      }
   
       return Promise.all(LinksPromises)
 
     }
 
   })
   .catch((error)=>{
     if(error)
     {
       let status = "Error Occured"
       res.json(status)
     }
    })
   .then((response)=>{
 
     let status = ''
 
 //=======================Checking of error===============================================
 
    if(response =="Error Occured")
    {
      status = "Error Occured"
      return status
    }
 
    for(var i = 0 ; i < response.length;i++)
    {
     if(!response[i].Link.id)
     {
       status = "Error Occured"
       return status
     }
 
    }
 
    if(response.length!==4)
    {
     status = "Error Occured"
     return status
    }
 
    //===================================================================================
   
    if(!status)
    {
     var AccessToken = response[0].AccessToken;
     var ProjectID = response[0].ProjectID;
     var Order = response[0].Order;
     var LedgerDetail = response[0].LedgerDetail
 
     var LocationPromises = []
     var LocationNames = []
 
     let Solutions = Order.Solutions
     
 
     for(var i =0 ; i <Solutions.length;i++)
     {
       let Quantity = Number(Solutions[i].Quantity)
      
 
    
 
       if(Quantity!==0)
       {
         for(j=0;j<Quantity;j++)
         {  
           let LocationNumber ="";
           let LocationNameTemp ="";
           
 
           if(Quantity<2)
           {
             LocationNumber = (i+1).toString()
           }
           if(Quantity>1)
           {
             LocationNumber = (i+1).toString() + "." + (j+1).toString()
           }
          
 
           let GlassName,Orientation
 
           if(Solutions[i].SubOrientation)
           {
             Orientation = Solutions[i].SubOrientation
           }
           if(!Solutions[i].SubOrientation)
           {
             Orientation = Solutions[i].Orientation
           }
 
           if(Solutions[i].GlassVariant)
           {
             GlassName = Solutions[i].GlassVariant
           }
           if(!Solutions[i].GlassVariant)
           {
             GlassName = Solutions[i].GlassFinish
           }
 
 
           LocationNameTemp = LocationNumber + " " + Solutions[i].Floor + " " + Solutions[i].Space + "/" +
 
           Solutions[i].System + " " + Solutions[i].SubSystem + " " + Solutions[i].Color + "/" +
 
           Solutions[i].SystemType + " " + Orientation + "/" + GlassName;
 
 
 
           var temp = { AccessToken : AccessToken,ProjectID : ProjectID, LocationName : LocationNameTemp, Solution : Solutions[i],Order : Order, LocationNumber : LocationNumber}
            
           LocationNames.push(temp)
            
          }
       }
    
       
 
    
 
 
     }
 
 
    
 
     for(var k =0;k<LocationNames.length;k++)
     {
       LocationPromises.push(CreateProcoreLocations(LocationNames[k].AccessToken,LocationNames[k].ProjectID,LocationNames[k].LocationName,LocationNames[k].Solution,LocationNames[k].Order,LocationNames[k].LocationNumber,LedgerDetail))
     }
 
     
     return Promise.all(LocationPromises)
 
 
    }
    
 
   })
   .catch((error)=>{
     if(error)
     {
       let status = "Error Occured"
       res.json(status)
     }
    })
    //get procore punch types
   .then((response)=>{
    
      
 
     let status = ''
     //=======================Checking of error===============================================
         if(response =="Error Occured")
         {
          status = "Error Occured"
          return status
         }
     
         for(var i = 0;i<response.length;i++)
         {
           if(!response[i].LocationID)
           {
             status = "Error Occured";
             return status
           }
         }
     
 
         if(!status)
         {
          return GetProcorePunchItemType(response[0].AccessToken,response[0].ProjectID,response,response[0].LedgerDetail)
         }
   })  
   .catch((error)=>{
     if(error)
     {
       let status = "Error Occured"
       res.json(status)
     }
    })
    //create punch item
   .then((response)=>{
     
     let status = ''
   //=======================Checking of error===============================================
     if(response =="Error Occured")
     {
      status = "Error Occured"
      return status
     }
 
 
   //===============================================================================================    
   if(!status)
   {
     //=====================================================================================
     //=====================================================================================
     //=====================================================================================
   
       
   var Punchtypes = response.Punchtypes
   var AccessToken = response.Locations[0].AccessToken;
   var ProjectID = response.Locations[0].ProjectID;
   var LedgerDetail = response.LedgerDetail
   
   
   
   var PunchItems = [];
   
   
   var ProjectPunctype,SystemPunchtype,SubtrackPunchtype,SubframePunchtype
   
   for(var k=0;k<Punchtypes.length;k++)
   {

     if(Punchtypes[k].name=="Location Level")
     {
       SystemPunchtype = Punchtypes[k].id;
     }
     if(Punchtypes[k].name=="Project Level")
     {
       ProjectPunctype = Punchtypes[k].id;
     }
     if(Punchtypes[k].name=="Sub Track")
     {
       SubtrackPunchtype = Punchtypes[k].id;
     }
     if(Punchtypes[k].name=="Sub Frame")
     {
       SubframePunchtype = Punchtypes[k].id;
     }
  
   }



   


  var Trades = [
    {
      "id": 562949953579180,
      "name": "Architect",
      "active": true,
      "updated_at": "2023-03-24T11:02:18Z"
  },
  {
      "id": 562949953536884,
      "name": "architecture",
      "active": true,
      "updated_at": "2023-03-24T11:02:19Z"
  },
  {
      "id": 562949953536885,
      "name": "associate",
      "active": true,
      "updated_at": "2023-03-24T11:02:19Z"
  },
  {
      "id": 562949953558307,
      "name": "Client",
      "active": true,
      "updated_at": "2023-03-24T11:02:20Z"
  },
  {
      "id": 562949953564090,
      "name": "Existing Architect",
      "active": true,
      "updated_at": "2023-03-24T11:02:17Z"
  },
  {
      "id": 562949953579303,
      "name": "F.I.R",
      "active": true,
      "updated_at": "2023-03-24T11:02:16Z"
  },
  {
      "id": 562949953530044,
      "name": "Glass Shutters",
      "active": true,
      "updated_at": "2023-03-24T11:02:16Z"
  },
  {
      "id": 562949953613348,
      "name": "Lightning Design Consultant",
      "active": true,
      "updated_at": "2023-03-24T11:02:15Z"
  },
  {
      "id": 562949953558308,
      "name": "PMC",
      "active": true,
      "updated_at": "2023-03-24T11:02:14Z"
  },
  {
      "id": 562949953558309,
      "name": "Pro Architect",
      "active": true,
      "updated_at": "2023-03-24T11:02:14Z"
  },
  {
      "id": 562949953611920,
      "name": "Project Expense ",
      "active": true,
      "updated_at": "2023-03-24T11:02:13Z"
  },
  {
      "id": 562949953577548,
      "name": "Pro Plus Architect",
      "active": true,
      "updated_at": "2023-03-24T11:02:13Z"
  },
  {
      "id": 562949953576487,
      "name": "Social Architect",
      "active": true,
      "updated_at": "2023-03-24T11:02:12Z"
  },
  {
      "id": 562949953556079,
      "name": "Travel Expense Summary",
      "active": true,
      "updated_at": "2023-03-24T11:02:12Z"
  },
  {
      "id": 562949953600955,
      "name": "WALTZ.CLOSE 2.O 135 DEGREE BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:02:07Z"
  },
  {
      "id": 562949953600956,
      "name": "WALTZ.CLOSE 2.O 135 DEGREE CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:02:06Z"
  },
  {
      "id": 562949953635896,
      "name": "WALTZ.CLOSE 2.O 135 DEGREE 0",
      "active": true,
      "updated_at": "2023-03-24T10:04:27Z"
  },
  {
      "id": 562949953600957,
      "name": "WALTZ.CLOSE 2.O 135 DEGREE GOLDEN PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:02:06Z"
  },
  {
      "id": 562949953635897,
      "name": "WALTZ.CLOSE 2.O 135 DEGREE GOLD PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:04:40Z"
  },
  {
      "id": 562949953635982,
      "name": "WALTZ.CLOSE 2.O 135 DEGREE GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:28:31Z"
  },
  {
      "id": 562949953635981,
      "name": "WALTZ.CLOSE 2.O 135 DEGREE GREY PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:28:25Z"
  },
  {
      "id": 562949953600958,
      "name": "WALTZ.CLOSE 2.O 135 DEGREE SILVER PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:02:04Z"
  },
  {
      "id": 562949953600931,
      "name": "WALTZ.CLOSE 2.O 180 DEGREE BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:02:03Z"
  },
  {
      "id": 562949953600932,
      "name": "WALTZ.CLOSE 2.O 180 DEGREE CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:02:03Z"
  },
  {
      "id": 562949953635898,
      "name": "WALTZ.CLOSE 2.O 180 DEGREE GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:04:55Z"
  },
  {
      "id": 562949953600933,
      "name": "WALTZ.CLOSE 2.O 180 DEGREE GOLDEN PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:02:01Z"
  },
  {
      "id": 562949953635899,
      "name": "WALTZ.CLOSE 2.O 180 DEGREE GOLD PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:05:29Z"
  },
  {
      "id": 562949953635980,
      "name": "WALTZ.CLOSE 2.O 180 DEGREE GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:28:19Z"
  },
  {
      "id": 562949953635979,
      "name": "WALTZ.CLOSE 2.O 180 DEGREE GREY PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:28:12Z"
  },
  {
      "id": 562949953600934,
      "name": "WALTZ.CLOSE 2.O 180 DEGREE SILVER PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:02:00Z"
  },
  {
      "id": 562949953600927,
      "name": "WALTZ.CLOSE 2.O 90 DEGREE BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:59Z"
  },
  {
      "id": 562949953600928,
      "name": "WALTZ.CLOSE 2.O 90 DEGREE CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:58Z"
  },
  {
      "id": 562949953635900,
      "name": "WALTZ.CLOSE 2.O 90 DEGREE GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:05:41Z"
  },
  {
      "id": 562949953600929,
      "name": "WALTZ.CLOSE 2.O 90 DEGREE GOLDEN PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:58Z"
  },
  {
      "id": 562949953635901,
      "name": "WALTZ.CLOSE 2.O 90 DEGREE GOLD PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:05:53Z"
  },
  {
      "id": 562949953635978,
      "name": "WALTZ.CLOSE 2.O 90 DEGREE GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:28:05Z"
  },
  {
      "id": 562949953635977,
      "name": "WALTZ.CLOSE 2.O 90 DEGREE GREY PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:27:55Z"
  },
  {
      "id": 562949953600930,
      "name": "WALTZ.CLOSE 2.O 90 DEGREE SILVER PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:56Z"
  },
  {
      "id": 562949953541348,
      "name": "WALTZ.CLOSE 2.O BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:55Z"
  },
  {
      "id": 562949953541349,
      "name": "WALTZ.CLOSE 2.O CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:55Z"
  },
  {
      "id": 562949953635902,
      "name": "WALTZ.CLOSE 2.O GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:06:01Z"
  },
  {
      "id": 562949953541350,
      "name": "WALTZ.CLOSE 2.O GOLDEN PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:54Z"
  },
  {
      "id": 562949953635903,
      "name": "WALTZ.CLOSE 2.O GOLD PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:06:10Z"
  },
  {
      "id": 562949953635976,
      "name": "WALTZ.CLOSE 2.O GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:27:46Z"
  },
  {
      "id": 562949953635975,
      "name": "WALTZ.CLOSE 2.O GREY PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:27:39Z"
  },
  {
      "id": 562949953541335,
      "name": "WALTZ.CLOSE 2.O SILVER PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:52Z"
  },
  {
      "id": 562949953600939,
      "name": "WALTZ.CLOSE 2.O SLIDE BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:52Z"
  },
  {
      "id": 562949953600940,
      "name": "WALTZ.CLOSE 2.O SLIDE CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:51Z"
  },
  {
      "id": 562949953635904,
      "name": "WALTZ.CLOSE 2.O SLIDE GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:06:21Z"
  },
  {
      "id": 562949953600941,
      "name": "WALTZ.CLOSE 2.O SLIDE GOLDEN PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:51Z"
  },
  {
      "id": 562949953635905,
      "name": "WALTZ.CLOSE 2.O SLIDE GOLD PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:06:30Z"
  },
  {
      "id": 562949953635974,
      "name": "WALTZ.CLOSE 2.O SLIDE GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:27:33Z"
  },
  {
      "id": 562949953635973,
      "name": "WALTZ.CLOSE 2.O SLIDE GREY PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:27:25Z"
  },
  {
      "id": 562949953600942,
      "name": "WALTZ.CLOSE 2.O SLIDE SILVER PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:48Z"
  },
  {
      "id": 562949953600935,
      "name": "WALTZ.CLOSE 2.O T JUNCTION BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:49Z"
  },
  {
      "id": 562949953600936,
      "name": "WALTZ.CLOSE 2.O T JUNCTION CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:46Z"
  },
  {
      "id": 562949953635906,
      "name": "WALTZ.CLOSE 2.O T JUNCTION GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:06:39Z"
  },
  {
      "id": 562949953600937,
      "name": "WALTZ.CLOSE 2.O T JUNCTION GOLDEN PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:46Z"
  },
  {
      "id": 562949953635907,
      "name": "WALTZ.CLOSE 2.O T JUNCTION GOLD PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:06:48Z"
  },
  {
      "id": 562949953635972,
      "name": "WALTZ.CLOSE 2.O T JUNCTION GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:27:19Z"
  },
  {
      "id": 562949953635971,
      "name": "WALTZ.CLOSE 2.O T JUNCTION GREY PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:27:13Z"
  },
  {
      "id": 562949953600938,
      "name": "WALTZ.CLOSE 2.O T JUNCTION SILVER PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:44Z"
  },
  {
      "id": 562949953600943,
      "name": "WALTZ.CLOSE 2.O U SHAPE BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:44Z"
  },
  {
      "id": 562949953600944,
      "name": "WALTZ.CLOSE 2.O U SHAPE CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:44Z"
  },
  {
      "id": 562949953635908,
      "name": "WALTZ.CLOSE 2.O U SHAPE GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:07:00Z"
  },
  {
      "id": 562949953600945,
      "name": "WALTZ.CLOSE 2.O U SHAPE GOLDEN PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:43Z"
  },
  {
      "id": 562949953635909,
      "name": "WALTZ.CLOSE 2.O U SHAPE GOLD PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:07:11Z"
  },
  {
      "id": 562949953635970,
      "name": "WALTZ.CLOSE 2.O U SHAPE GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:27:07Z"
  },
  {
      "id": 562949953635969,
      "name": "WALTZ.CLOSE 2.O U SHAPE GREY PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:27:00Z"
  },
  {
      "id": 562949953600946,
      "name": "WALTZ.CLOSE 2.O U SHAPE SILVER PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:41Z"
  },
  {
      "id": 562949953545641,
      "name": "WALTZ CLOSE NONE BLACK PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:40Z"
  },
  {
      "id": 562949953545642,
      "name": "WALTZ.CLOSE NONE BLACK PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:40Z"
  },
  {
      "id": 562949953545640,
      "name": "WALTZ CLOSE NONE BRONZE PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:39Z"
  },
  {
      "id": 562949953545643,
      "name": "WALTZ.CLOSE NONE BRONZE PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:39Z"
  },
  {
      "id": 562949953635910,
      "name": "WALTZ CLOSE NONE GOLD PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:07:18Z"
  },
  {
      "id": 562949953635968,
      "name": "WALTZ CLOSE NONE GREY PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:26:52Z"
  },
  {
      "id": 562949953600971,
      "name": "WALTZ.CLOSE NXT 135 DEGREE BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:37Z"
  },
  {
      "id": 562949953600972,
      "name": "WALTZ.CLOSE NXT 135 DEGREE CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:37Z"
  },
  {
      "id": 562949953635911,
      "name": "WALTZ.CLOSE NXT 135 DEGREE GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:07:27Z"
  },
  {
      "id": 562949953600973,
      "name": "WALTZ.CLOSE NXT 135 DEGREE GOLDEN PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:36Z"
  },
  {
      "id": 562949953635912,
      "name": "WALTZ.CLOSE NXT 135 DEGREE GOLD PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:07:36Z"
  },
  {
      "id": 562949953635967,
      "name": "WALTZ.CLOSE NXT 135 DEGREE GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:26:44Z"
  },
  {
      "id": 562949953635966,
      "name": "WALTZ.CLOSE NXT 135 DEGREE GREY PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:26:38Z"
  },
  {
      "id": 562949953600974,
      "name": "WALTZ.CLOSE NXT 135 DEGREE SILVER PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:34Z"
  },
  {
      "id": 562949953600963,
      "name": "WALTZ.CLOSE NXT 180 DEGREE BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:34Z"
  },
  {
      "id": 562949953600964,
      "name": "WALTZ.CLOSE NXT 180 DEGREE CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:33Z"
  },
  {
      "id": 562949953635913,
      "name": "WALTZ.CLOSE NXT 180 DEGREE GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:07:43Z"
  },
  {
      "id": 562949953600965,
      "name": "WALTZ.CLOSE NXT 180 DEGREE GOLDEN PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:32Z"
  },
  {
      "id": 562949953635914,
      "name": "WALTZ.CLOSE NXT 180 DEGREE GOLD PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:07:51Z"
  },
  {
      "id": 562949953635965,
      "name": "WALTZ.CLOSE NXT 180 DEGREE GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:26:32Z"
  },
  {
      "id": 562949953635964,
      "name": "WALTZ.CLOSE NXT 180 DEGREE GREY PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:26:25Z"
  },
  {
      "id": 562949953600966,
      "name": "WALTZ.CLOSE NXT 180 DEGREE SILVER PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:31Z"
  },
  {
      "id": 562949953600959,
      "name": "WALTZ.CLOSE NXT 90 DEGREE BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:32Z"
  },
  {
      "id": 562949953600960,
      "name": "WALTZ.CLOSE NXT 90 DEGREE CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:29Z"
  },
  {
      "id": 562949953635915,
      "name": "WALTZ.CLOSE NXT 90 DEGREE GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:08:06Z"
  },
  {
      "id": 562949953600961,
      "name": "WALTZ.CLOSE NXT 90 DEGREE GOLDEN PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:29Z"
  },
  {
      "id": 562949953635916,
      "name": "WALTZ.CLOSE NXT 90 DEGREE GOLD PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:08:19Z"
  },
  {
      "id": 562949953635963,
      "name": "WALTZ.CLOSE NXT 90 DEGREE GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:26:14Z"
  },
  {
      "id": 562949953635962,
      "name": "WALTZ.CLOSE NXT 90 DEGREE GREY PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:26:07Z"
  },
  {
      "id": 562949953600962,
      "name": "WALTZ.CLOSE NXT 90 DEGREE SILVER PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:27Z"
  },
  {
      "id": 562949953541351,
      "name": "WALTZ.CLOSE NXT BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:26Z"
  },
  {
      "id": 562949953541352,
      "name": "WALTZ.CLOSE NXT CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:25Z"
  },
  {
      "id": 562949953635654,
      "name": "WALTZ.CLOSE NXT GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:24Z"
  },
  {
      "id": 562949953561738,
      "name": "WALTZ.CLOSE NXT GOLDEN PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:23Z"
  },
  {
      "id": 562949953635917,
      "name": "WALTZ.CLOSE NXT GOLD PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:08:40Z"
  },
  {
      "id": 562949953635961,
      "name": "WALTZ.CLOSE NXT GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:26:01Z"
  },
  {
      "id": 562949953635960,
      "name": "WALTZ.CLOSE NXT GREY PVDF",
      "active": true,
      "updated_at": "2023-03-24T10:25:54Z"
  },
  {
      "id": 562949953574110,
      "name": "WALTZ.CLOSE NXT SILVER PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:21Z"
  },
  {
      "id": 562949953600967,
      "name": "WALTZ.CLOSE NXT T JUNCTION BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:21Z"
  },
  {
      "id": 562949953600968,
      "name": "WALTZ.CLOSE NXT T JUNCTION CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:20Z"
  },
  {
      "id": 562949953635918,
      "name": "WALTZ.CLOSE NXT T JUNCTION GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:08:52Z"
  },
  {
      "id": 562949953600969,
      "name": "WALTZ.CLOSE NXT T JUNCTION GOLDEN PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:18Z"
  },
  {
      "id": 562949953635959,
      "name": "WALTZ.CLOSE NXT T JUNCTION GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:25:48Z"
  },
  {
      "id": 562949953600970,
      "name": "WALTZ.CLOSE NXT T JUNCTION SILVER PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:17Z"
  },
  {
      "id": 562949953600975,
      "name": "WALTZ.CLOSE NXT U SHAPE BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:17Z"
  },
  {
      "id": 562949953600976,
      "name": "WALTZ.CLOSE NXT U SHAPE CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:16Z"
  },
  {
      "id": 562949953635919,
      "name": "WALTZ.CLOSE NXT U SHAPE GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:09:00Z"
  },
  {
      "id": 562949953600977,
      "name": "WALTZ.CLOSE NXT U SHAPE GOLDEN PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:16Z"
  },
  {
      "id": 562949953635958,
      "name": "WALTZ.CLOSE NXT U SHAPE GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:25:43Z"
  },
  {
      "id": 562949953600978,
      "name": "WALTZ.CLOSE NXT U SHAPE SILVER PVDF",
      "active": true,
      "updated_at": "2023-03-24T11:01:14Z"
  },
  {
      "id": 562949953541345,
      "name": "WALTZ.GLIDE FLUSH BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:13Z"
  },
  {
      "id": 562949953541347,
      "name": "WALTZ.GLIDE FLUSH CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:13Z"
  },
  {
      "id": 562949953635930,
      "name": "WALTZ.GLIDE FLUSH GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:18:41Z"
  },
  {
      "id": 562949953635946,
      "name": "WALTZ.GLIDE FLUSH GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:21:59Z"
  },
  {
      "id": 562949953600921,
      "name": "WALTZ.GLIDE FLUSH NONE BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:11Z"
  },
  {
      "id": 562949953600922,
      "name": "WALTZ.GLIDE FLUSH NONE CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:10Z"
  },
  {
      "id": 562949953635931,
      "name": "WALTZ.GLIDE FLUSH NONE GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:18:47Z"
  },
  {
      "id": 562949953635945,
      "name": "WALTZ.GLIDE FLUSH NONE GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:21:52Z"
  },
  {
      "id": 562949953541344,
      "name": "WALTZ.GLIDE REGULAR BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:09Z"
  },
  {
      "id": 562949953541346,
      "name": "WALTZ.GLIDE REGULAR CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:08Z"
  },
  {
      "id": 562949953634734,
      "name": "WALTZ.GLIDE REGULAR GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:08Z"
  },
  {
      "id": 562949953635944,
      "name": "WALTZ.GLIDE REGULAR GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:21:43Z"
  },
  {
      "id": 562949953600979,
      "name": "WALTZ.GLIDE REGULAR NXT BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:07Z"
  },
  {
      "id": 562949953600980,
      "name": "WALTZ.GLIDE REGULAR NXT CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:06Z"
  },
  {
      "id": 562949953635932,
      "name": "WALTZ.GLIDE REGULAR NXT GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:19:01Z"
  },
  {
      "id": 562949953635943,
      "name": "WALTZ.GLIDE REGULAR NXT GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:21:37Z"
  },
  {
      "id": 562949953600919,
      "name": "WALTZ.GLIDE REGULAR REGULAR BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:05Z"
  },
  {
      "id": 562949953600920,
      "name": "WALTZ.GLIDE REGULAR REGULAR CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:05Z"
  },
  {
      "id": 562949953635933,
      "name": "WALTZ.GLIDE REGULAR REGULAR GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:19:07Z"
  },
  {
      "id": 562949953635942,
      "name": "WALTZ.GLIDE REGULAR REGULAR GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:21:31Z"
  },
  {
      "id": 562949953541337,
      "name": "WALTZ.SLIDE FLUSH BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:03Z"
  },
  {
      "id": 562949953541339,
      "name": "WALTZ.SLIDE FLUSH CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:03Z"
  },
  {
      "id": 562949953635920,
      "name": "WALTZ.SLIDE FLUSH GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:16:34Z"
  },
  {
      "id": 562949953635957,
      "name": "WALTZ.SLIDE FLUSH GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:25:30Z"
  },
  {
      "id": 562949953600909,
      "name": "WALTZ.SLIDE FLUSH POCKET DOOR BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:01Z"
  },
  {
      "id": 562949953600910,
      "name": "WALTZ.SLIDE FLUSH POCKET DOOR CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:01:02Z"
  },
  {
      "id": 562949953635921,
      "name": "WALTZ.SLIDE FLUSH POCKET DOOR GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:16:42Z"
  },
  {
      "id": 562949953635956,
      "name": "WALTZ.SLIDE FLUSH POCKET DOOR GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:25:22Z"
  },
  {
      "id": 562949953600907,
      "name": "WALTZ.SLIDE FLUSH SOFT BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:56Z"
  },
  {
      "id": 562949953600908,
      "name": "WALTZ.SLIDE FLUSH SOFT CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:55Z"
  },
  {
      "id": 562949953635922,
      "name": "WALTZ.SLIDE FLUSH SOFT GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:17:16Z"
  },
  {
      "id": 562949953635955,
      "name": "WALTZ.SLIDE FLUSH SOFT GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:25:15Z"
  },
  {
      "id": 562949953600917,
      "name": "WALTZ.SLIDE FLUSH SYNCRO BLACK AN WALTZ.SWING REGULAR NONE BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:54Z"
  },
  {
      "id": 562949953600918,
      "name": "WALTZ.SLIDE FLUSH SYNCRO CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:54Z"
  },
  {
      "id": 562949953635923,
      "name": "WALTZ.SLIDE FLUSH SYNCRO GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:17:27Z"
  },
  {
      "id": 562949953635954,
      "name": "WALTZ.SLIDE FLUSH SYNCRO GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:25:09Z"
  },
  {
      "id": 562949953600913,
      "name": "WALTZ.SLIDE FLUSH TELESCOPIC BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:52Z"
  },
  {
      "id": 562949953600914,
      "name": "WALTZ.SLIDE FLUSH TELESCOPIC CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:52Z"
  },
  {
      "id": 562949953635924,
      "name": "WALTZ.SLIDE FLUSH TELESCOPIC GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:17:36Z"
  },
  {
      "id": 562949953635953,
      "name": "WALTZ.SLIDE FLUSH TELESCOPIC GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:25:03Z"
  },
  {
      "id": 562949953541336,
      "name": "WALTZ.SLIDE REGULAR BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:50Z"
  },
  {
      "id": 562949953541338,
      "name": "WALTZ.SLIDE REGULAR CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:50Z"
  },
  {
      "id": 562949953634733,
      "name": "WALTZ.SLIDE REGULAR GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:49Z"
  },
  {
      "id": 562949953635952,
      "name": "WALTZ.SLIDE REGULAR GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:24:56Z"
  },
  {
      "id": 562949953600981,
      "name": "WALTZ.SLIDE REGULAR MAGLEV BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:49Z"
  },
  {
      "id": 562949953600982,
      "name": "WALTZ.SLIDE REGULAR MAGLEV CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:48Z"
  },
  {
      "id": 562949953635925,
      "name": "WALTZ.SLIDE REGULAR MAGLEV GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:17:53Z"
  },
  {
      "id": 562949953635951,
      "name": "WALTZ.SLIDE REGULAR MAGLEV GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:24:48Z"
  },
  {
      "id": 562949953600905,
      "name": "WALTZ.SLIDE REGULAR POCKET DOOR BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:46Z"
  },
  {
      "id": 562949953600906,
      "name": "WALTZ.SLIDE REGULAR POCKET DOOR CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:46Z"
  },
  {
      "id": 562949953635926,
      "name": "WALTZ.SLIDE REGULAR POCKET DOOR GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:18:05Z"
  },
  {
      "id": 562949953635950,
      "name": "WALTZ.SLIDE REGULAR POCKET DOOR GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:24:39Z"
  },
  {
      "id": 562949953600903,
      "name": "WALTZ.SLIDE REGULAR SOFT BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:45Z"
  },
  {
      "id": 562949953600904,
      "name": "WALTZ.SLIDE REGULAR SOFT CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:44Z"
  },
  {
      "id": 562949953635927,
      "name": "WALTZ.SLIDE REGULAR SOFT GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:18:11Z"
  },
  {
      "id": 562949953635949,
      "name": "WALTZ.SLIDE REGULAR SOFT GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:24:29Z"
  },
  {
      "id": 562949953600915,
      "name": "WALTZ.SLIDE REGULAR SYNCRO BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:43Z"
  },
  {
      "id": 562949953600916,
      "name": "WALTZ.SLIDE REGULAR SYNCRO CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:42Z"
  },
  {
      "id": 562949953635928,
      "name": "WALTZ.SLIDE REGULAR SYNCRO GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:18:19Z"
  },
  {
      "id": 562949953635948,
      "name": "WALTZ.SLIDE REGULAR SYNCRO GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:24:23Z"
  },
  {
      "id": 562949953600911,
      "name": "WALTZ.SLIDE REGULAR TELESCOPIC BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:40Z"
  },
  {
      "id": 562949953600912,
      "name": "WALTZ.SLIDE REGULAR TELESCOPIC CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:39Z"
  },
  {
      "id": 562949953635929,
      "name": "WALTZ.SLIDE REGULAR TELESCOPIC GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:18:27Z"
  },
  {
      "id": 562949953635947,
      "name": "WALTZ.SLIDE REGULAR TELESCOPIC GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:24:17Z"
  },
  {
      "id": 562949953541341,
      "name": "WALTZ.SWING FLUSH BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:38Z"
  },
  {
      "id": 562949953541343,
      "name": "WALTZ.SWING FLUSH CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:36Z"
  },
  {
      "id": 562949953635934,
      "name": "WALTZ.SWING FLUSH GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:19:15Z"
  },
  {
      "id": 562949953635941,
      "name": "WALTZ.SWING FLUSH GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:21:23Z"
  },
  {
      "id": 562949953600925,
      "name": "WALTZ.SWING FLUSH NONE BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:36Z"
  },
  {
      "id": 562949953600926,
      "name": "WALTZ.SWING FLUSH NONE CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:35Z"
  },
  {
      "id": 562949953635935,
      "name": "WALTZ.SWING FLUSH NONE GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:19:21Z"
  },
  {
      "id": 562949953635940,
      "name": "WALTZ.SWING FLUSH NONE GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:21:16Z"
  },
  {
      "id": 562949953541340,
      "name": "WALTZ.SWING REGULAR BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:34Z"
  },
  {
      "id": 562949953541342,
      "name": "WALTZ.SWING REGULAR CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:34Z"
  },
  {
      "id": 562949953635936,
      "name": "WALTZ.SWING REGULAR GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:19:27Z"
  },
  {
      "id": 562949953635939,
      "name": "WALTZ.SWING REGULAR GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:19:52Z"
  },
  {
      "id": 562949953600923,
      "name": "WALTZ.SWING REGULAR NONE BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:31Z"
  },
  {
      "id": 562949953600924,
      "name": "WALTZ.SWING REGULAR NONE CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:31Z"
  },
  {
      "id": 562949953635937,
      "name": "WALTZ.SWING REGULAR NONE GOLD AN",
      "active": true,
      "updated_at": "2023-03-24T10:19:33Z"
  },
  {
      "id": 562949953635938,
      "name": "WALTZ.SWING REGULAR NONE GREY AN",
      "active": true,
      "updated_at": "2023-03-24T10:19:45Z"
  },
  {
      "id": 562949953545644,
      "name": "WARDROBE AIR HINGE BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:30Z"
  },
  {
      "id": 562949953547437,
      "name": "WARDROBE AIR HINGE BRUSH GOLD ",
      "active": true,
      "updated_at": "2023-03-24T11:00:28Z"
  },
  {
      "id": 562949953600949,
      "name": "WARDROBE AIR HINGE NONE BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:28Z"
  },
  {
      "id": 562949953600950,
      "name": "WARDROBE AIR HINGE NONE BRUSH GOLD",
      "active": true,
      "updated_at": "2023-03-24T11:00:28Z"
  },
  {
      "id": 562949953598847,
      "name": "WARDROBE AIR HINGE WITH GRID BRUSH GOLD",
      "active": true,
      "updated_at": "2023-03-24T11:00:27Z"
  },
  {
      "id": 562949953600947,
      "name": "WARDROBE AIR HINGE WITH GRID NONE BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:26Z"
  },
  {
      "id": 562949953600948,
      "name": "WARDROBE AIR HINGE WITH GRID NONE BRUSH GOLD",
      "active": true,
      "updated_at": "2023-03-24T11:00:25Z"
  },
  {
      "id": 562949953546921,
      "name": "WARDROBE LONG HANDLE BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:25Z"
  },
  {
      "id": 562949953545645,
      "name": "WARDROBE LONG HANDLE BRUSH GOLD",
      "active": true,
      "updated_at": "2023-03-24T11:00:24Z"
  },
  {
      "id": 562949953600951,
      "name": "WARDROBE LONG HANDLE NONE BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:24Z"
  },
  {
      "id": 562949953600952,
      "name": "WARDROBE LONG HANDLE NONE BRUSH GOLD",
      "active": true,
      "updated_at": "2023-03-24T11:00:24Z"
  },
  {
      "id": 562949953559377,
      "name": "WARDROBE SLIDING BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:23Z"
  },
  {
      "id": 562949953546920,
      "name": "WARDROBE SLIDING CHAMPAGNE AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:23Z"
  },
  {
      "id": 562949953600953,
      "name": "WARDROBE SLIDING NONE BLACK AN",
      "active": true,
      "updated_at": "2023-03-24T11:00:23Z"
  },
  {
      "id": 562949953600954,
      "name": "WARDROBE SLIDING NONE BRUSH GOLD",
      "active": true,
      "updated_at": "2023-03-24T11:00:23Z"
  }
  ]
   
   
                
   
   var Punches = []
   
   for(var i = 0; i<response.Locations.length; i++)
   {
     Punches.push(response.Locations[i])
   }
   
   
   var SubFrame = ["Sub Frame",""]
   var SubTrack = ["Sub Track",""]
   var schedule_impact = 'yes_known';
   var cost_impact = 'yes_known';
   
 
   
 var PunchitemManager = 8110237;
 var FinalApprover = 8110237;
 var Assignee  = 8110237;
 
 var ProjectLevelAssignee = '';
 
 
 
 
 let AssociateAssignee = response.Locations[0].Order.Associate
 
 if(AssociateAssignee=="SHASHANK SINGH")
 {
   ProjectLevelAssignee = 7934350
 }
 if(AssociateAssignee=="VIKAS SINGHAL")
 {
   ProjectLevelAssignee =  7889819
 }
 if(AssociateAssignee=="ANKIT AGGARWAL")
 {
   ProjectLevelAssignee = 8046623
 }
 if(AssociateAssignee=="RIYAZ SAYYED")
 {
   ProjectLevelAssignee = 8049071
 }
 
 if(AssociateAssignee=="SAKINA BATISH")
 {
   ProjectLevelAssignee = 8265830
 }
 
 if(AssociateAssignee=="NAYAN PATIL")
 {
   ProjectLevelAssignee = 9110724
 }
 if(AssociateAssignee=="UTKALIKA")
 {
   ProjectLevelAssignee = 8456909
 }
 if(AssociateAssignee=="JB ACCOUNTS")
 {
   ProjectLevelAssignee = 9110724
 }

 
 if(AssociateAssignee=="VIPIN KUMAR")
 {
   ProjectLevelAssignee = 9333445
 }
 
 if(AssociateAssignee=="VISHAL PARIKH")
 {
   ProjectLevelAssignee = 9594385
 }
 
 if(AssociateAssignee=="RAJENDRA BADAYA")
 {
   ProjectLevelAssignee = 8220460
 }
 
 
 if(AssociateAssignee=="RAHUL JAISWAL")
 {
   ProjectLevelAssignee = 8049078
 }
 
 
 if(AssociateAssignee=="AAYUSH PANDEY")
 {
   ProjectLevelAssignee = 7934350
 }
 
 if(AssociateAssignee=="ANUJ JAIN")
 {
   ProjectLevelAssignee = 7878387
 }


 if(AssociateAssignee=="RUCHIR")
 {
   ProjectLevelAssignee = 9600291
 }
 
 
 
 
 
   let temp =  {SolutionNo:147,SerialNo :147,LocationID : "", Position : 147 ,itemname:response.Locations[0].Order.ProjectName , priority : 'high',schedule_impact_days : response.Locations[0].Order.TotalSquareFeet,cost_impact_amount : response.Locations[0].Order.FinalAmount,punch_item_type_id : ProjectPunctype,glassfinish: "",systeminfo: "",Grid : "",DoorCloser:"",reference : "",description : "",schedule_impact:'yes_known',cost_impact : 'yes_known',trade_id : "",PunchitemManager:PunchitemManager, FinalApprover : FinalApprover, Assignee : ProjectLevelAssignee, DueDate: "",Floor :"",Space :"",itemtype : "Project"}
   
   PunchItems.push(temp)
 
 
   
   for(var i=0;i<Punches.length;i++)
   {
   
     var Solution = Punches[i].Solution;
     var Associate =  Punches[i].Order.Associate;
   
     var TradeName =  Solution.System + " "+ Solution.SubSystem + " "+ Solution.SystemType + " " + Solution.Color
     
   
 
     var trade_id
    for(var t=0; t<Trades.length; t++)
    {
     if(Trades[t].name==TradeName)
     {
       trade_id = Trades[t].id;
     }
    } 
   
    
    //=====Punchitem Managers/Final Approver/Assignee==================
 
 
 
 
 /*
   {
    var PunchitemManager, FinalApprover , Assignee ; 
   
    if(Associate ==="NAYAN PATIL")
    {
     PunchitemManager = 8415196;
     FinalApprover =  8196670;
     Assignee = 8415196;
    }
 
    if(Associate ==="AAYUSH PANDEY")
    {
     PunchitemManager = 8415196;
     FinalApprover =  8196670;
     Assignee = 8415196;
    }
   
    if(Associate ==="RAJENDRA BADAYA")
    {
     PunchitemManager = 8035626;
     FinalApprover =   8196670;
     Assignee = 8035626;
    }
   
    
    if(Associate ==="VIKAS SINGHAL")
    {
     PunchitemManager = 7878837;
     FinalApprover =   8196670;
     Assignee = 7878837;
    }
   
    if(Associate ==="SHASHANK SINGH")
    {
     PunchitemManager = 8035626;
     FinalApprover =   8196670;
     Assignee = 8035626;
    }
   
    if(Associate ==="GAURAV SINGHAL")
    {
     PunchitemManager = 8035626;
     FinalApprover =   8196670;
     Assignee = 8035626;
    }
   
    if(Associate ==="ANUJ JAIN")
    {
     PunchitemManager =  9027148;
     FinalApprover =   8196670;
     Assignee =  9027148;
    }
   
    if(Associate ==="VIPIN KUMAR")
    {
     PunchitemManager =  9027148;
     FinalApprover =   8196670;
     Assignee =  9027148;
    }
    
    if(Associate ==="ANKIT AGGARWAL")
    {
     PunchitemManager = 9027148;
     FinalApprover =   8196670;
     Assignee =  9027148;
    }
   
    if(Associate ==="RIYAZ SAYYED")
    {
     PunchitemManager = 8383343;
     FinalApprover =   8196670;
     Assignee = 8383343;
    }
   
    if(Associate ==="SAKINA BATISH")
    {
     PunchitemManager = 8128262;
     FinalApprover =   8196670;
     Assignee = 8128262;
    }
   
    if(Associate ==="RAHUL JAISWAL")
    {
     PunchitemManager = 8035626;
     FinalApprover =   8196670;
     Assignee = 8035626;
    }
   
    if(Associate ==="VISHAL PARIKH")
    {
     PunchitemManager = 8035626;
     FinalApprover =   8196670;
     Assignee = 8035626;
    }
   
   }   
   */
   //========================================================================
   
   var serial
   var itemname
   var priority 
   var schedule_impact = 'yes_known';
   var cost_impact = 'yes_known';
   var schedule_impact_days
   var cost_impact_amount 
   var trade_id
   var punch_item_type_id = 562949953590876
   var glassfinish 
   var PrintName
   var itemtype
   if(Solution.SubOrientation)
   {
     PrintName = Solution.SubOrientation
   }
   if(!Solution.SubOrientation)
   {
     PrintName = Solution.Orientation
   }
 
   if(Solution.GlassVariant)
   {
     glassfinish = Solution.GlassVariant
   }
   if(!Solution.GlassVariant)
   {
     glassfinish = Solution.GlassFinish
   }
   
   
   
   var systeminfo = Solution.System + "/" + Solution.SubSystem + "/"+Solution.SystemType
   var Grid 
   if( Solution.Grid=="YES")
   {
     Grid = 'YES'
   }
   if(Solution.Grid!=="YES")
   {
     Grid = 'NO'
   }
   
   var DoorCloser  
   if( Solution.DoorCloser=="YES")
   {
     DoorCloser = 'YES'
   }
   if( Solution.DoorCloser!=="YES")
   {
     DoorCloser = 'NO'
   }
   
   let reference
     
     reference = Solution.Width + "by"+ Solution.Height
    
     var description 
     if(Solution.GlassVariant)
     {
       description = Solution.GlassFinish + " " + Solution.GlassVariant
     }
     if(!Solution.GlassVariant)
     {
       description =  Solution.GlassSubCategory + " " + Solution.GlassFinish
     }
    
   
   
     if(Number(Solution.Height)<2400)
    {
      priority = 'low'
    }
    if(Number(Solution.Height)>=3000)
    {
      priority = 'high'
    }
    if(Number(Solution.Height)>=2400&&Number(Solution.Height)<3000)
    {
      priority = 'medium'
    }
   
    //========================Project PunchType================================================================
   
   
    //====================================================================
     //=======================SUB FRAMES /SUBTRACKS========================
     if(Solution.SystemType =="SOFT"||Solution.SystemType =="SYNCRO"||Solution.SystemType =="POCKET DOOR")
     {
       for(var k=0;k<SubTrack.length;k++)
       {
   
         if(SubTrack[k]=="Sub Track")
         {
           itemtype = "Sub Track"
           schedule_impact_days = 0;
           cost_impact_amount = 0;
           punch_item_type_id = SubtrackPunchtype
           itemname = Punches[i].LocationNumber + " SubTrack "+  Solution.Floor + " "+ Solution.Space;
         }
         if(SubTrack[k]=="")
         {
           itemtype = "Location Level"
           schedule_impact_days = Solution.SquareFeet;
           cost_impact_amount = Solution.Amount;
           punch_item_type_id = SystemPunchtype
           itemname = Punches[i].LocationNumber + " " + Solution.Floor + " " + Solution.Space 
         }
        
 
      
          let temp =  {SolutionNo:Punches[i].LocationNumber,SerialNo :Punches[i].LocationNumber,LocationID : Punches[i].LocationID, Position : Punches[i].LocationNumber ,itemname: itemname, priority : priority,schedule_impact_days : schedule_impact_days,cost_impact_amount : cost_impact_amount,punch_item_type_id : punch_item_type_id,glassfinish:glassfinish,systeminfo:systeminfo,Grid : Grid,DoorCloser:DoorCloser,reference : reference,description : description,schedule_impact:schedule_impact,cost_impact : cost_impact,trade_id : trade_id,PunchitemManager:PunchitemManager, FinalApprover : FinalApprover, Assignee : Assignee, DueDate: "",Floor :Solution.Floor,Space : Solution.Space,itemtype : itemtype}
   
          PunchItems.push(temp)
       }
   
     }
   
     if(Solution.System =="WALTZ.SWING")
     {
       for(var k=0;k<SubFrame.length;k++)
       {
         if(SubFrame[k]=="Sub Frame")
         { 
           itemtype = "Sub Frame"
           schedule_impact_days = 0;
           cost_impact_amount = 0;
           punch_item_type_id = SubframePunchtype;
           itemname = Punches[i].LocationNumber + " SubFrame "+  Solution.Floor + " "+ Solution.Space
         }
         if(SubFrame[k]!=="Sub Frame")
         {
           itemtype = "Location Level"
           schedule_impact_days = Solution.SquareFeet
           cost_impact_amount = Solution.Amount
           punch_item_type_id = SystemPunchtype
           itemname = Punches[i].LocationNumber + " " + Solution.Floor + " " + Solution.Space 
         }
   
         let temp =  {SolutionNo:Punches[i].LocationNumber,SerialNo :Punches[i].LocationNumber,LocationID : Punches[i].LocationID, Position : Punches[i].LocationNumber ,itemname: itemname, priority : priority,schedule_impact_days : schedule_impact_days,cost_impact_amount : cost_impact_amount,punch_item_type_id : punch_item_type_id,glassfinish:glassfinish,systeminfo:systeminfo,Grid : Grid,DoorCloser:DoorCloser,reference : reference,description : description,schedule_impact:schedule_impact,cost_impact : cost_impact,trade_id : trade_id,PunchitemManager:PunchitemManager, FinalApprover : FinalApprover, Assignee : Assignee,DueDate: "",Floor :Solution.Floor,Space : Solution.Space,itemtype : itemtype}
   
         PunchItems.push(temp)
       }
   
     }
    
     if(Solution.SystemType!=="SOFT"&&Solution.SystemType!=="SYNCRO"&&Solution.SystemType !=="POCKET DOOR"&&Solution.System !=="WALTZ.SWING")
     { 
        itemtype = "Location Level"
        schedule_impact_days = Solution.SquareFeet;
        cost_impact_amount = Solution.Amount;
        punch_item_type_id = SystemPunchtype
        itemname = Punches[i].LocationNumber + " " + Solution.Floor + " " + Solution.Space
        let temp =  {SolutionNo:Punches[i].LocationNumber, SerialNo :Punches[i].LocationNumber, LocationID : Punches[i].LocationID, Position : Punches[i].LocationNumber ,itemname: itemname, priority : priority,schedule_impact_days : schedule_impact_days,cost_impact_amount : cost_impact_amount,punch_item_type_id : punch_item_type_id,glassfinish:glassfinish,systeminfo:systeminfo,Grid : Grid,DoorCloser:DoorCloser,reference : reference,description : description,schedule_impact:schedule_impact,cost_impact : cost_impact,trade_id : trade_id,PunchitemManager:PunchitemManager, FinalApprover : FinalApprover, Assignee : Assignee, DueDate: "", Floor :Solution.Floor,Space : Solution.Space,itemtype : itemtype}
   
        PunchItems.push(temp)
     }
   
   
   
     //=============================================================================
   
   }
   
 
  let status = "work_required";
   
   var Promises = []
 
 
   
   for(var p =0 ; p <PunchItems.length; p++)
   {
   Promises.push(CreatePunchItem(AccessToken,ProjectID,PunchItems[p].LocationID,PunchItems[p].SolutionNo,PunchItems[p],Punchtypes,response.Locations[0].Order,status,LedgerDetail))
   }
   
   return Promise.all(Promises);
   
     //=====================================================================================
     //=====================================================================================
     //=====================================================================================
   }
 
   
 
 
 
   })
   .catch((error)=>{
     if(error)
     {
       let status = "Error Occured"
       res.json(status)
     }
    })
    .then((response)=>{
    
     
  
     var promises= [];
 
     for(var i = 0 ; i < response.length; i++)
     {     
      promises.push(UpdatePunchItem(response[i].AccessToken,response[i].PunchID,response[i].ProjectID,response[i].SolutionNo,response[i].Floor,response[i].Space,response[i].Type,response[i].Order,response[i].LedgerDetail))
     }
   
 
     return Promise.all(promises)
 
    })
    .catch((error)=>{
     if(error)
     {
       let status = "Error Occured"
       res.json(status)
     }
    })
    .then((response)=>{
   
      
      
     let status = ''
   //=======================Checking of error===============================================
     if(response =="Error Occured")
     {
      status = "Error Occured"
      return status
     }
 
     if(!status)
     {
       let UserID = ''
       let ProjectID = response[0].ProjectID
       let LedgerDetail = response[0].LedgerDetail
 
       if(response[0].Order.Associate=="GAURAV SINGHAL")
       {
         UserID = 7934350
       }


       if(response[0].Order.Associate=="SHASHANK SINGH")
       {
         UserID = 7934350
       }
       if(response[0].Order.Associate=="VIKAS SINGHAL")
       {
         UserID =  7889819
       }
       if(response[0].Order.Associate=="ANKIT AGGARWAL")
       {
         UserID = 8046623
       }
       if(response[0].Order.Associate=="RIYAZ SAYYED")
       {
         UserID = 8049071
       }
 
       if(response[0].Order.Associate=="SAKINA BATISH")
       {
         UserID = 8265830
       }
 
       if(response[0].Order.Associate=="NAYAN PATIL")
       {
         UserID = 9110724
       }
       if(response[0].Order.Associate=="UTKALIKA")
       {
        UserID = 8456909
       }
       if(response[0].Order.Associate=="JB ACCOUNTS")
       {
        UserID = 9110724
       }
      
 
       if(response[0].Order.Associate=="VIPIN KUMAR")
       {
         UserID = 9333445
       }
 
       if(response[0].Order.Associate=="VISHAL PARIKH")
       {
         UserID = 9594385
       }
 
       if(response[0].Order.Associate=="RAJENDRA BADAYA")
       {
         UserID = 8220460
       }
       
 
       if(response[0].Order.Associate=="RAHUL JAISWAL")
       {
         UserID = 8049078
       }
 
       
       if(response[0].Order.Associate=="AAYUSH PANDEY")
       {
         UserID = 7934350
       }
 
       if(response[0].Order.Associate=="ANUJ JAIN")
       {
         UserID = 7878387
       }

       if(response[0].Order.Associate=="RUCHIR")
       {
         UserID = 9600291
       }


 
        return AddWADirectory(response[0].AccessToken,UserID,ProjectID,response)
  
  
 
  
 
 
     }
 
     
 //Shashank Singh 
 // Vikas SInghal 
 // Ankit Aggarwal 
 // Riyaz Sayyed 
 // ketan 
 //Ranjeet 
 //Sakina Batish  
 //Nayan Patil 
 //Vipin Kumar 
 //Vishal Parikh 
  
  
    })
   .catch((error)=>{
     if(error)
     {
       let status = "Error Occured"
       res.json(status)
     }
    })
    .then((response)=>{

     // { AccessToken : access_token, ProjectID : ProjectID, ReqResposne : response}
  
   
     var AccessToken = response.AccessToken;
     var ProjectID = response.ProjectID;
     var ReqResposne = response.ReqResposne;
     
      return CreateProcoreWebhook(AccessToken,ProjectID,ReqResposne)
  
    })
    .catch((error)=>{
      if(error)
      {
        let status = "Error Occured"
        res.json(status)
      }
     })
     .then((response)=>{

       // {AccessToken : access_token, ProjectID : ProjectID , WebhookData : data, ReqResposne : ReqResposne}

       var AccessToken = response.AccessToken;
       var ProjectID = response.ProjectID;
       var WebhookID = response.WebhookData.id;
       var ReqResposne = response.ReqResposne


      return  CreateWebhookTrigger(AccessToken,WebhookID,ProjectID,ReqResposne)
    
     })
     .catch((error)=>{
      if(error)
      {
        let status = "Error Occured"
        res.json(status)
      }
     })
     .then((response)=>{
      
      res.json(response.ReqResposne)
      })


  






/*
    .then((response)=>{    
   //console.log(response)
    res.json(response)
 
    })
  */
 
 });
 


app.post('/api/updatewinproject', async(req, res) =>{


  var Order = req.body
 // var ProjectID = Order.ProjectID
  var LedgerDetail = req.body.LedgerDetail


  UpdateProjectCS(Order)
  .then((response)=>{
    console.log(response)

  })




  


  
  



  
  getAccessToken()
  .catch((error)=>{
    if(error)
    {
      let status = "Error Occured"
      res.json(status)
    }
   })
  .then((response)=>{

    return UpdateWinExistingProject(response,Order.ProjectID,Order)

   })
   .catch((error)=>{
    if(error)
    {
      let status = "Error Occured"
      res.json(status)
    }
   })
   .then((response)=>{

    let status = ''
 
   if(!response.ProjectID)
   {
    status = "Error Occured"
    res.json(status)
   }

   if(!status)
   {
    res.json(response)
   }

   
   })


 


 
 

})

//==============================================================================================================================
//==============================================================================================================================


app.post('/api/updatecsoldproject', async(req, res) =>{


  var Order = req.body



  UpdateProjectCS(Order)
  .then((response)=>{
    console.log(response)
    res.json(response)

  })







})







app.post('/api/updateglasscommercialwinproject', async(req, res) =>{

  var Order = req.body.Order
 
  
  UpdateGlassProjectCS(Order)
  .then((response)=>{
    console.log(response)
  })


})



app.post('/api/updatecommercialwinproject', async(req, res) =>{

  var Order = req.body.Order
  var ProjectID = Order.ProjectID


  let RealWinDateDate = Order.CommercialWinDate.split("-")[0]
  let RealWinDateMonth = Order.CommercialWinDate.split("-")[1]
  let RealWinDateYear = Order.CommercialWinDate.split("-")[2]
  let RealWinDateFormat =  RealWinDateYear + "-" + RealWinDateMonth + "-"+ RealWinDateDate;

  let ComWinDateDate = Order.CompletionDate.split("-")[0]
  let ComWinDateMonth = Order.CompletionDate.split("-")[1]
  let ComWinDateYear = Order.CompletionDate.split("-")[2]
  let ComWinDateFormat = ComWinDateYear + "-" + ComWinDateMonth + "-"+ ComWinDateDate;


 


  var start_date =  RealWinDateFormat
  var completion_date =  ComWinDateFormat
  var estimated_start_date =RealWinDateFormat
  var estimated_completion_date = ComWinDateFormat;
  var actual_start_date = ""
  var projected_finish_date = Order.CompletionDate;
  
  var ED = Order.EditDate.split("-")[0];
  var EDMonth = Order.EditDate.split("-")[1];
  var EDYear = Order.EditDate.split("-")[2];
  var EDFormat = EDYear+"-"+EDMonth+"-"+ ED; 
  var editdate = new Date(EDFormat)

  
  

  /*
  UpdateProjectCS(Order)
  .then((response)=>{
    console.log(response)
  })

*/


  getAccessToken()
  .catch((error)=>{
    if(error)
    {
      let status = "Error Occured"
      res.json(status)
    }
   })
  .then((response)=>{

   

    return UpdateCommercialWinProject(response,Order.ProjectID,Order,start_date,completion_date,estimated_start_date,estimated_completion_date,actual_start_date,projected_finish_date,editdate)

   })
   .catch((error)=>{
    if(error)
    {
      let status = "Error Occured"
      res.json(status)
    }
   })
   .then((response)=>{



    /*

    let status = ''
 
   if(!response.ProjectID)
   {
    status = "Error Occured"
    res.json(status)
   }

   if(!status)
   {
    res.json(response)
   }

   */
   })

   
 


 
 

})



app.get('/api/procorecompanyvendors', async(req, res) =>{



  getAccessToken() 
  .catch((error)=>{
    if(error)
    {
      let status = "Error Occured"
      res.json(status)
    }
   })
  .then((response)=>{
   
    return GetCompanyVendors(response)
    
   })
   .then((response)=>{

    /*

    let CompanyNamesNId = []

    for(var i = 0; i<response.length;i++)
    {
      var temp = { ArchitectName : response[i].company, ArchitectID : response[i].id}
      CompanyNamesNId.push(temp)

    }

   */


    res.json(response)

   })

})


app.get('/api/allprocoreusers', async(req, res) =>{

  getAccessToken() 
  .catch((error)=>{
    if(error)
    {
      let status = "Error Occured"
      res.json(status)
    }
   })
  .then((response)=>{
   
    return GetAllCompanyUsers(response)
    
   })
   .then((response)=>{
      res.json(response)
   })

})


app.post('/api/updateprocoresource', async(req, res) =>{

  var Order = req.body
  var ProjectID = Order.ProjectID
 
  var source = ""

  console.log("here")

  
  if(Order.Source=="SOCIAL")
  {
    source = 260429;
  }
  if(Order.Source=="ARCHITECT EXISTING")
  {
    source = 260432;
  }
  if(Order.Source=="EXIHIBITION")
  {
    source = 260433;
  }
  if(Order.Source=="CLIENT EXISTING")
  {
    source = 260431;
  }
  if(Order.Source=="OTHERS")
  {
    source = 260430;
  }
  if(Order.Source=="WALK IN")
  {
    source = 260711;
  }

  


  getAccessToken()
  .catch((error)=>{
    if(error)
    {
      let status = "Error Occured"
      res.json(status)
    }
   })
  .then((response)=>{

    return UpdateProcoreSource(response,ProjectID,source)

   })
   .then((response)=>{
   
    res.json(response)
   })


})


const multer = require("multer");

const router = express.Router();
const  MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg'
};

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mimetype") ;
    if(isValid){
        error = null;
    }  
    cb(error,"feedbacks")
    }, 
    filename : (req,file,cb)=>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,name + '-'+Date.now()+'.'+ext);
    }
});

app.post('/api/savecustomerfeedback',multer({storage:storage}).single("image"),(req, res, next) => {

  const url = req.protocol + '://' + req.get("host");

  const customerfeedback = new CustomerFeedBack({

    Quality : req.body.Quality,
    Schedule : req.body.Schedule,
    Installation : req.body.Installation,
    Professionalism : req.body.Professionalism,
    Overall : req.body.Overall,
    imagePath :  url + "/feedbacks/" + req.file.filename,
    ProcoreHandOverDate : req.body.ProcoreHandOverDate,
    ProjectID  : req.body.ProjectID


  });


  customerfeedback.save()
  .then(response =>{

    var ProjectID = response.ProjectID

    return getAccessTokenForHandOver(ProjectID)
    
      
  })
  .then(response=>{
   
   let AccessToken = response.AccessToken;
   let ProjectID = response.ProjectID

   return UpdateCommercialWinProject(AccessToken ,ProjectID)
    
  })
  .then(response =>{
    res.json(response)
  })

})


async function UpdateProcoreSource(access_token,ProjectID,source)
  {
  
   // const res = await fetch(`https://api.procore.com/rest/v1.0/projects`, {
    //  method: 'POST',


   // const res = await fetch(`https://api.procore.com/rest/v1.0/custom_field_metadata?company_id=562949953442334&view=with_lov_entries`, {
//      method: 'GET', 


    
  const res = await fetch(`https://api.procore.com/rest/v1.0/projects/${ProjectID}`, {
      method: 'PATCH',
  
      qs: {run_configurable_validations: 'false'},
      headers: {
      Authorization: `Bearer ${access_token}`,
      'content-type': 'application/json',
      'Procore-Company-Id': 562949953442334
       },
       
      body: JSON.stringify({
        company_id: 562949953442334,
        project: {
         
          custom_field_106965: source,
        

        }
  
      })
     
    })
  
  const data = await res.json();
 
 

  return data

 

 

 
  
}





async function UpdateGlassProjectCS(Order)
{



  let WinRefNo = ""
  let Version= ""

  if(Order.OrderNo.includes("/V-"))
  {
   let hyphen = Order.OrderNo.lastIndexOf("/V-");
   let tempproref = Order.OrderNo.substring(0, hyphen);
   Version =  Order.OrderNo.substring( hyphen,Order.OrderNo.length);
   let slash = tempproref.lastIndexOf("/");
   let proref = tempproref.substring(slash + 1, hyphen); 
   WinRefNo = proref
  }

  if(!Order.OrderNo.includes("/V-"))
  {
   let slash = Order.OrderNo.lastIndexOf("/");
   let proref = Order.OrderNo.substring(slash+ 1, Order.OrderNo.length);
   Version = "V-0"
   WinRefNo = proref
  }




  var ClientDiscount = Order.Discount
  var BeforeDiscount = Order.GrandTotal;
 
  var TotalLocations = Order.Solutions.length;
  var TotalSquareFeet = Order.TotalSquareFeet;
  var LastEditDate = Order.EditDate;
  var Discount = Order.Discount
  var Location = Order.Location
  var WinDate = Order.WinDate
  var EditDate = Order.EditDate
  var SolutionNumber = Order.Solutions.length.toString()
  var Source = Order.Source.toUpperCase();
  var HandoverDate = Order.HandOverDate;
  var CommercialWinDate = Order.CommercialWinDate;
  var Associate = Order.Associate.toUpperCase();
  var Status = Order.Status.toUpperCase();
  var CreationDate = Order.CreationDate
  var Architect = Order.Architect;
  var DealerDiscount = 0
  var Pro
  
  var Office =""

  if(Order.Associate=="AAYUSH PANDEY")
  {
    Order.Associate == "SHASHANK SINGH"
  }
 
   
  if(Order.Associate=="SHASHANK SINGH")
  {
    Office = "JB GLASS"
  }

  if(Order.Associate=="AMIT PANDEY")
  {
    Office = "JB GLASS"
  }

  if(Order.Associate=="AAYUSH PANDEY")
  {
    Office = "JB GLASS"
  }
  if(Order.Associate=="VIKAS SINGHAL")
  {
    Office = "JB GLASS"
  }
  if(Order.Associate=="ANKIT AGGARWAL")
  {
    Office = "JB GLASS"
  }
  if(Order.Associate=="RIYAZ SAYYED")
  {
    Office = "OM INTERIORS"
  }

  if(Order.Associate=="SAKINA BATISH")
  {
    Office = "OM INTERIORS"
  }

  if(Order.Associate=="NAYAN PATIL"||Order.Associate=="UTKALIKA")
  {
    Office = "AAREN INTPRO"
  }

  if(Order.Associate=="VIPIN KUMAR")
  {
    Office = "JB GLASS"
  }

  if(Order.Associate=="VISHAL PARIKH")
  {
    Office = "SURFACES PLUS"
  }

  if(Order.Associate=="RAJENDRA BADAYA")
  {
    Office = "BADAYA KITCHENS"
  }
  

  if(Order.Associate=="RAHUL JAISWAL")
  {
    Office = "PRABHUSURAT"
  }

  
  if(Order.Associate=="AAYUSH PANDEY")
  {
    Office = "JB GLASS"
  }

  if(Order.Associate=="ANUJ JAIN")
  {
    Office = "JB GLASS"
  }

  if(Order.Associate=="RUCHIR")
  {
    Office = "WALTZ HYDERABAD"
  }

  if(Order.Associate=="PRAVEEN KANODIA")
  {
    Office = "SPACIO"
  }
  if(Order.Associate=="JB ACCOUNTS")
  {
    Office = "JB ACCOUNTS"
  }

  
 
 



 
  
 
  var ProjectName = WinRefNo+"/"+Order.ProjectName;


  

  const res = await fetch(`http://103.203.224.171/Project/api/Rec/SaveProjectData`, {
    method: 'POST',
    headers: {
    'content-type': 'application/json',
     },
    body: JSON.stringify(
      
        {
          projId: "", 
          refno : WinRefNo, 
          projval :BeforeDiscount,
          projname : ProjectName, 
          windate : CommercialWinDate, 
          totsys : DealerDiscount,
          totsqm :ClientDiscount, 
          lasteditdt :LastEditDate, 
          remark :"", 
          Enq_Thr :"ONLINE", 
          Proj_Dt : WinDate, 
          Category :"A", 
          Proj_Importance :"YES",
          job_type :"EOU", 
          Est_SDate :CreationDate, 
          Est_EDate : HandoverDate, 
          Clad_Area :Order.ProValue,  
          Client_Req :"", 
          Site_Add : "", 
          Landmark :"", 
          Tel1 :TotalSquareFeet, 
          FaxNo :"", 
          Tel2 :TotalLocations,
          Email  :"TEST@GMAIL.COM",
          No_Layer :"2",
          Description :"LAMINATION WITH IGU",
          Qtuantity :"10",
          Aprx_Prdct_Val :"980000",
          Sell_Rate :"2000",
          city : "XXXXX",
          projtype :  Status,
          buildtype : Source,
          buildperf : Associate,
          facadele : Office,
        


          }
      
    )
   
  })
 
const data = await res.json();


console.log(data)

var ProjectsDetails = {
  data : data,
  Order : Order
}



return ProjectsDetails


 
}



/*
async function CreateProjectCS(Order,LedgerDetail,Users)
{

   var DealerDiscount = 0

  for(var i =0 ; i<Users.length; i++)
  {
    if(Users[i].UserFullName==Order.Associate)
    {
       DealerDiscount = Number(Users[i].DealerDiscount);
    }
  }
 




  let WinRefNo = ""
  let Version= ""

  if(Order.OrderNo.includes("/V-"))
  {
   let hyphen = Order.OrderNo.lastIndexOf("/V-");
   let tempproref = Order.OrderNo.substring(0, hyphen);
   Version =  Order.OrderNo.substring( hyphen,Order.OrderNo.length);
   let slash = tempproref.lastIndexOf("/");
   let proref = tempproref.substring(slash + 1, hyphen); 
   WinRefNo = proref
  }

  if(!Order.OrderNo.includes("/V-"))
  {
   let slash = Order.OrderNo.lastIndexOf("/");
   let proref = Order.OrderNo.substring(slash+ 1, Order.OrderNo.length);
   Version = "V-0"
   WinRefNo = proref
  }




  var ClientDiscount = Order.Discount
  var BeforeDiscount = Order.GrandTotal;
 
  var TotalLocations = Order.Solutions.length;
  var TotalSquareFeet = Order.TotalSquareFeet;
  var LastEditDate = Order.EditDate;
  var Discount = Order.Discount
  var Location = Order.Location
  var WinDate = Order.WinDate
  var EditDate = Order.EditDate
  var SolutionNumber = Order.Solutions.length.toString()
  var Source = Order.Source.toUpperCase();
  var HandoverDate = Order.HandOverDate;
  var CommercialWinDate = Order.CommercialWinDate;
  var Associate = Order.Associate.toUpperCase();
  var Status = Order.Status.toUpperCase();
  var CreationDate = Order.CreationDate
  var Architect = Order.Architect;
  
  var Office =""
 
   
  if(Order.Associate=="SHASHANK SINGH")
  {
    Office = "JB GLASS"
  }

  if(Order.Associate=="AMIT PANDEY")
  {
    Office = "JB GLASS"
  }
  if(Order.Associate=="VIKAS SINGHAL")
  {
    Office = "JB GLASS"
  }
  if(Order.Associate=="ANKIT AGGARWAL")
  {
    Office = "JB GLASS"
  }
  if(Order.Associate=="RIYAZ SAYYED")
  {
    Office = "OM INTERIORS"
  }

  if(Order.Associate=="SAKINA BATISH")
  {
    Office = "OM INTERIORS"
  }

  if(Order.Associate=="NAYAN PATIL"||Order.Associate=="UTKALIKA")
  {
    Office = "AAREN INTPRO"
  }

  if(Order.Associate=="VIPIN KUMAR")
  {
    Office = "JB GLASS"
  }

  if(Order.Associate=="VISHAL PARIKH")
  {
    Office = "SURFACES PLUS"
  }

  if(Order.Associate=="RAJENDRA BADAYA")
  {
    Office = "BADAYA KITCHENS"
  }
  

  if(Order.Associate=="RAHUL JAISWAL")
  {
    Office = "PRABHUSURAT"
  }

  
  if(Order.Associate=="AAYUSH PANDEY")
  {
    Office = "JB GLASS"
  }

  if(Order.Associate=="ANUJ JAIN")
  {
    Office = "JB GLASS"
  }

  if(Order.Associate=="RUCHIR")
  {
    Office = "WALTZ HYDERABAD"
  }

  if(Order.Associate=="PRAVEEN KANODIA")
  {
    Office = "SPACIO"
  }
  if(Order.Associate=="JB ACCOUNTS")
  {
    Office = "JB ACCOUNTS"
  }

  
 
 



  var LedgerRemark 
  var OrderRemark

  if(Order.LedgerDetails=="nil")
  {
   LedgerRemark = Order.LedgerDetails
   OrderRemark = "|Version:"+Version
  }
  
  if(Order.LedgerDetails!=="nil")
  {
   let PartOne = Order.LedgerDetails.split("Architect:")[0] + "|Version:"+Version;
   let PartTwo = Order.LedgerDetails.split("Architect:")[1];

   LedgerRemark = PartOne
   OrderRemark = PartTwo
  }

  var ProjectName = WinRefNo+"/"+Order.ProjectName;


  

  const res = await fetch(`http://103.203.224.171/Project/api/Rec/SaveProjectData`, {
    method: 'POST',
    headers: {
    'content-type': 'application/json',
     },
    body: JSON.stringify(
      
        {
          projId: "", 
          refno : WinRefNo, 
          projval :BeforeDiscount,
          projname : ProjectName, 
          windate : CommercialWinDate, 
          totsys : DealerDiscount,
          totsqm :ClientDiscount, 
          lasteditdt :LastEditDate, 
          remark :LedgerRemark, 
          Enq_Thr :"ONLINE", 
          Proj_Dt : WinDate, 
          Category :"A", 
          Proj_Importance :"YES",
          job_type :"EOU", 
          Est_SDate :CreationDate, 
          Est_EDate : HandoverDate, 
          Clad_Area :Order.ProValue,  
          Client_Req :OrderRemark, 
          Site_Add : Location, 
          Landmark :Architect, 
          Tel1 :TotalSquareFeet, 
          FaxNo :"", 
          Tel2 :TotalLocations,
          Email  :"TEST@GMAIL.COM",
          No_Layer :"2",
          Description :"LAMINATION WITH IGU",
          Qtuantity :"10",
          Aprx_Prdct_Val :"980000",
          Sell_Rate :"2000",
          city : "XXXXX",
          projtype :  Status,
          buildtype : Source,
          buildperf : Associate,
          facadele : Office,
        


          }
      
    )
   
  })
 
const data = await res.json();


console.log(data)



return data

  


  

 
}
*/

async function CreateProjectCS(Order,LedgerDetail,Users)
{



  let WinRefNo = ""
  let Version= ""

  if(Order.OrderNo.includes("/V-"))
  {
   let hyphen = Order.OrderNo.lastIndexOf("/V-");
   let tempproref = Order.OrderNo.substring(0, hyphen);
   Version =  Order.OrderNo.substring( hyphen,Order.OrderNo.length);
   let slash = tempproref.lastIndexOf("/");
   let proref = tempproref.substring(slash + 1, hyphen); 
   WinRefNo = proref
  }

  if(!Order.OrderNo.includes("/V-"))
  {
   let slash = Order.OrderNo.lastIndexOf("/");
   let proref = Order.OrderNo.substring(slash+ 1, Order.OrderNo.length);
   Version = "V-0"
   WinRefNo = proref
  }




  var ClientDiscount = Order.Discount
  var BeforeDiscount = Order.GrandTotal;
 
  var TotalLocations = Order.Solutions.length;
  var TotalSquareFeet = Order.TotalSquareFeet;
  var LastEditDate = Order.EditDate;
  var Discount = Order.Discount
  var Location = Order.Location
  var WinDate = Order.WinDate
  var EditDate = Order.EditDate
  var SolutionNumber = Order.Solutions.length.toString()
  var Source = Order.Source.toUpperCase();
  var HandoverDate = Order.HandOverDate;
  var CommercialWinDate = Order.CommercialWinDate;
  var Associate = Order.Associate.toUpperCase();
  var Status = Order.Status.toUpperCase();
  var CreationDate = Order.CreationDate
  var Architect = Order.Architect;
  var DealerDiscount = 0
  var Pro
  
  var Office =""

  if(Order.Associate=="AAYUSH PANDEY")
  {
    Order.Associate == "SHASHANK SINGH"
  }
 
   
  if(Order.Associate=="SHASHANK SINGH")
  {
    Office = "JB GLASS"
  }
  if(Order.Associate=="AMIT PANDEY")
  {
    Office = "JB GLASS"
  }

  if(Order.Associate=="AAYUSH PANDEY")
  {
    Office = "JB GLASS"
  }
  if(Order.Associate=="VIKAS SINGHAL")
  {
    Office = "JB GLASS"
  }
  if(Order.Associate=="ANKIT AGGARWAL")
  {
    Office = "JB GLASS"
  }
  if(Order.Associate=="RIYAZ SAYYED")
  {
    Office = "OM INTERIORS"
  }


  if(Order.Associate=="SAKINA BATISH")
  {
    Office = "OM INTERIORS"
  }

  if(Order.Associate=="NAYAN PATIL"||Order.Associate=="UTKALIKA")
  {
    Office = "AAREN INTPRO"
  }

  if(Order.Associate=="VIPIN KUMAR")
  {
    Office = "JB GLASS"
  }

  if(Order.Associate=="VISHAL PARIKH")
  {
    Office = "SURFACES PLUS"
  }

  if(Order.Associate=="RAJENDRA BADAYA")
  {
    Office = "BADAYA KITCHENS"
  }
  

  if(Order.Associate=="RAHUL JAISWAL")
  {
    Office = "PRABHUSURAT"
  }

  
  if(Order.Associate=="AAYUSH PANDEY")
  {
    Office = "JB GLASS"
  }

  if(Order.Associate=="ANUJ JAIN")
  {
    Office = "JB GLASS"
  }

  if(Order.Associate=="RUCHIR")
  {
    Office = "WALTZ HYDERABAD"
  }

  if(Order.Associate=="PRAVEEN KANODIA")
  {
    Office = "SPACIO"
  }
  if(Order.Associate=="JB ACCOUNTS")
  {
    Office = "JB ACCOUNTS"
  }

  
 
 



 
  
 
  var ProjectName = WinRefNo+"/"+Order.ProjectName;


  

  const res = await fetch(`http://103.203.224.171/Project/api/Rec/SaveProjectData`, {
    method: 'POST',
    headers: {
    'content-type': 'application/json',
     },
    body: JSON.stringify(
      
        {
          projId: "", 
          refno : WinRefNo, 
          projval :BeforeDiscount,
          projname : ProjectName, 
          windate : CommercialWinDate, 
          totsys : DealerDiscount,
          totsqm :ClientDiscount, 
          lasteditdt :LastEditDate, 
          remark :"", 
          Enq_Thr :"ONLINE", 
          Proj_Dt : WinDate, 
          Category :"A", 
          Proj_Importance :"YES",
          job_type :"EOU", 
          Est_SDate :CreationDate, 
          Est_EDate : HandoverDate, 
          Clad_Area :Order.ProValue,  
          Client_Req :"", 
          Site_Add : "", 
          Landmark :"", 
          Tel1 :TotalSquareFeet, 
          FaxNo :"", 
          Tel2 :TotalLocations,
          Email  :"TEST@GMAIL.COM",
          No_Layer :"2",
          Description :"LAMINATION WITH IGU",
          Qtuantity :"10",
          Aprx_Prdct_Val :"980000",
          Sell_Rate :"2000",
          city : "XXXXX",
          projtype :  "Win",
          buildtype : "SOCIAL",
          buildperf : "SHASHANK SINGH",
          facadele : "JB GLASS"
        


          }
      
    )
   
  })
 



const data = await res.json();


console.log(data)



return data

 
}

async function CreateGlassProjectCS(Order,LedgerDetail,Users)
{



  let WinRefNo = ""
  let Version= ""

  if(Order.OrderNo.includes("/V-"))
  {
   let hyphen = Order.OrderNo.lastIndexOf("/V-");
   let tempproref = Order.OrderNo.substring(0, hyphen);
   Version =  Order.OrderNo.substring( hyphen,Order.OrderNo.length);
   let slash = tempproref.lastIndexOf("/");
   let proref = tempproref.substring(slash + 1, hyphen); 
   WinRefNo = proref
  }

  if(!Order.OrderNo.includes("/V-"))
  {
   let slash = Order.OrderNo.lastIndexOf("/");
   let proref = Order.OrderNo.substring(slash+ 1, Order.OrderNo.length);
   Version = "V-0"
   WinRefNo = proref
  }




  var ClientDiscount = Order.Discount
  var BeforeDiscount = Order.GrandTotal;
 
  var TotalLocations = Order.Solutions.length;
  var TotalSquareFeet = Order.TotalSquareFeet;
  var LastEditDate = Order.EditDate;
  var Discount = Order.Discount
  var Location = Order.Location
  var WinDate = Order.WinDate
  var EditDate = Order.EditDate
  var SolutionNumber = Order.Solutions.length.toString()
  var Source = Order.Source.toUpperCase();
  var HandoverDate = Order.HandOverDate;
  var CommercialWinDate = Order.CommercialWinDate;
  var Associate = Order.Associate.toUpperCase();
  var Status = Order.Status.toUpperCase();
  var CreationDate = Order.CreationDate
  var Architect = Order.Architect;
  var DealerDiscount = 0
  var Pro
  
  var Office =""

  if(Order.Associate=="AAYUSH PANDEY")
  {
    Order.Associate == "SHASHANK SINGH"
  }
 
   
  if(Order.Associate=="SHASHANK SINGH")
  {
    Office = "JB GLASS"
  }
  if(Order.Associate=="AMIT PANDEY")
  {
    Office = "JB GLASS"
  }

  if(Order.Associate=="AAYUSH PANDEY")
  {
    Office = "JB GLASS"
  }
  if(Order.Associate=="VIKAS SINGHAL")
  {
    Office = "JB GLASS"
  }
  if(Order.Associate=="ANKIT AGGARWAL")
  {
    Office = "JB GLASS"
  }
  if(Order.Associate=="RIYAZ SAYYED")
  {
    Office = "OM INTERIORS"
  }


  if(Order.Associate=="SAKINA BATISH")
  {
    Office = "OM INTERIORS"
  }

  if(Order.Associate=="NAYAN PATIL"||Order.Associate=="UTKALIKA")
  {
    Office = "AAREN INTPRO"
  }

  if(Order.Associate=="VIPIN KUMAR")
  {
    Office = "JB GLASS"
  }

  if(Order.Associate=="VISHAL PARIKH")
  {
    Office = "SURFACES PLUS"
  }

  if(Order.Associate=="RAJENDRA BADAYA")
  {
    Office = "BADAYA KITCHENS"
  }
  

  if(Order.Associate=="RAHUL JAISWAL")
  {
    Office = "PRABHUSURAT"
  }

  
  if(Order.Associate=="AAYUSH PANDEY")
  {
    Office = "JB GLASS"
  }

  if(Order.Associate=="ANUJ JAIN")
  {
    Office = "JB GLASS"
  }

  if(Order.Associate=="RUCHIR")
  {
    Office = "WALTZ HYDERABAD"
  }

  if(Order.Associate=="PRAVEEN KANODIA")
  {
    Office = "SPACIO"
  }
  if(Order.Associate=="JB ACCOUNTS")
  {
    Office = "JB ACCOUNTS"
  }

  
 
 



 
  
 
  var ProjectName = WinRefNo+"/"+Order.ProjectName;


  

  const res = await fetch(`http://103.203.224.171/Project/api/Rec/SaveProjectData`, {
    method: 'POST',
    headers: {
    'content-type': 'application/json',
     },
    body: JSON.stringify(
      
        {
          projId: "", 
          refno : WinRefNo, 
          projval :BeforeDiscount,
          projname : ProjectName, 
          windate : CommercialWinDate, 
          totsys : DealerDiscount,
          totsqm :ClientDiscount, 
          lasteditdt :LastEditDate, 
          remark :"", 
          Enq_Thr :"ONLINE", 
          Proj_Dt : WinDate, 
          Category :"A", 
          Proj_Importance :"YES",
          job_type :"EOU", 
          Est_SDate :CreationDate, 
          Est_EDate : HandoverDate, 
          Clad_Area :Order.ProValue,  
          Client_Req :"", 
          Site_Add : "", 
          Landmark :"", 
          Tel1 :TotalSquareFeet, 
          FaxNo :"", 
          Tel2 :TotalLocations,
          Email  :"TEST@GMAIL.COM",
          No_Layer :"2",
          Description :"LAMINATION WITH IGU",
          Qtuantity :"10",
          Aprx_Prdct_Val :"980000",
          Sell_Rate :"2000",
          city : "XXXXX",
          projtype :  "Win",
          buildtype : "SOCIAL",
          buildperf : "SHASHANK SINGH",
          facadele : "JB GLASS"


          }
      
    )
   
  })
 
const data = await res.json();


console.log(data)

var ProjectsDetails = {
  data : data,
  Order : Order
}



return ProjectsDetails


 
}



async function ListProcoreProjects(access_token,Order,LedgerDetail)
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



var details = { ProcoreOrders : data, AccessToken :access_token ,Order : Order,LedgerDetail : LedgerDetail}
return  details;

}


async function InActiveExistingProject(access_token,ProjectID,Order,LedgerDetail)
{ 
   
  let ProjectRefNo = ''
  let VersionNumber = '';

  if(Order.OrderNo.includes("/V-"))
  {
   let hyphen = Order.OrderNo.lastIndexOf("/V-");
   VersionNumber = Order.OrderNo.substring(hyphen + 1,Order.OrderNo.length);
   let tempproref = Order.OrderNo.substring(0, hyphen);
   let slash = tempproref.lastIndexOf("/");
   let proref = tempproref.substring(slash + 1, hyphen); 
   ProjectRefNo = proref + "/" +VersionNumber
   
  }

  if(!Order.OrderNo.includes("/V-"))
  {
   
   let slash = Order.OrderNo.lastIndexOf("/");
   let proref = Order.OrderNo.substring(slash+ 1, Order.OrderNo.length);
   ProjectRefNo = proref
  }

    
  
    const res = await fetch(`https://api.procore.com/rest/v1.0/projects/${ProjectID}`, {
      method: 'PATCH',
      qs: {run_configurable_validations: 'false'},
      headers: {
      Authorization: `Bearer ${access_token}`,
      'content-type': 'application/json',
      'Procore-Company-Id': 562949953442334
       },
      body: JSON.stringify({
        company_id: 562949953442334,
        project: {
          active: false,
          project_number : ProjectRefNo + "InActive"
        }
  
      })
     
    })
  
  const data = await res.json();

  const ProjectDetails = { Order : Order, LedgerDetail : LedgerDetail, AccessToken : access_token }
  
  return ProjectDetails
  
}


//562949953436831 "Not IN Production"

async function UpdateProcoreProject(access_token,ProjectID,active,address,city,country_code,start_date,completion_date,total_value,name,office_id,phone,project_number,square_feet,time_zone,zip,project_type_id,estimated_value,estimated_start_date,estimated_completion_date,state_code,source,actual_start_date,tz_name,projected_finish_date,editdate,pipelinedate,Solutions,Discount,ProjectName,Associate,WebappAmount,TotalSquareFeet,ProPlus,Version,Order,Region,LedgerDetail)
  {
  
   
    const res = await fetch(`https://api.procore.com/rest/v1.0/projects`, {
      method: 'POST',
      qs: {run_configurable_validations: 'false'},
      headers: {
      Authorization: `Bearer ${access_token}`,
      'content-type': 'application/json',
      'Procore-Company-Id': 562949953442334
       },
      body: JSON.stringify({
        company_id: 562949953442334,
        project: {
          active: true,
          address: address,
          city: city,
          country_code: country_code,
          start_date: start_date,
          completion_date: start_date,
          total_value: total_value,
          name: name,
          office_id: office_id,
          phone: phone,
          project_number:project_number,
          square_feet: square_feet,
          state_code: state_code,
          time_zone: time_zone,
          tz_name: tz_name,
          zip: zip,
          project_type_id: project_type_id,
          project_template_id: 562949953740186,
          project_stage_id : 562949953456358,
          actual_start_date : actual_start_date,
          projected_finish_date : projected_finish_date,
          estimated_value: estimated_value,
          estimated_start_date: estimated_start_date,
          estimated_completion_date: estimated_completion_date,
          project_region_id:  Region,
          department_ids:[562949953438528],
          custom_field_41564: Order.CSValue,
          custom_field_59778: ProPlus,
          custom_field_106965: source,
          custom_field_40043: Order.Discount,
          custom_field_53114 : editdate,
          custom_field_68067 : pipelinedate,
          custom_field_53113 : Version



          
        }
  
      })
     
    })
  
  const data = await res.json();




 

 

  const ProjectDetails = { ProjectID : data.id,Solutions : Solutions,AccessToken : access_token, Discount : Discount, ProjectName : ProjectName,Associate : Associate, WebappAmount : WebappAmount, TotalSquareFeet : TotalSquareFeet,Order: Order,LedgerDetail : LedgerDetail}
  
  return ProjectDetails
  
}

async function CreateProcoreProjectLink(access_token,ProjectID,Order,Title,Link,LedgerDetail)
  {
    
    const res = await fetch(`https://api.procore.com/rest/v1.0/links?project_id=${ProjectID}`, {
      method: 'POST',
      qs: {run_configurable_validations: 'false'},
      headers: {
      Authorization: `Bearer ${access_token}`,
      'content-type': 'application/json',
      'Procore-Company-Id': 562949953442334
       },
      body: JSON.stringify({
        link: {
          title: Title,
          url: Link
        } 
      })
     
    })
  
  const data = await res.json();



  let ProjectDetails = { Link : data, AccessToken : access_token, ProjectID : ProjectID, Order : Order ,LedgerDetail : LedgerDetail }

  return ProjectDetails


  
}


async function CreateProcoreLocations(AccessToken,ProjectID,LocationName,Solution,Order,LocationNumber,LedgerDetail)
{

   
  const res = await fetch(`https://api.procore.com/rest/v1.0/projects/${ProjectID}/locations`, {
    method: 'POST',
    headers: {
    Authorization: `Bearer ${AccessToken}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     },
    body: JSON.stringify(
      {
        "location": {
          "node_name": LocationName
        }
      }

    )
   
  })

const data = await res.json();


const LocationDetails = { AccessToken : AccessToken ,LocationID : data.id, LocationName : LocationName , ProjectID : ProjectID, Solution : Solution, Order : Order,LocationNumber : LocationNumber,LedgerDetail : LedgerDetail}

return  LocationDetails;

}


async function GetProcorePunchItemType(access_token,ProjectId,Locations,LedgerDetail)
{ 
 
  
  const res = await fetch(`https://api.procore.com/rest/v1.0/punch_item_types?project_id=${ProjectId}`, {
    method: 'GET',
    qs: {
      company_id: '562949953442334',
          
    },
    headers: {
    Authorization: `Bearer ${access_token}`,
    'Procore-Company-Id': 562949953442334
     }
   
  })

const data = await res.json();

var PunchtypeDetail = {Punchtypes : data, Locations : Locations,LedgerDetail : LedgerDetail}

return PunchtypeDetail

}


async function CreatePunchItem(access_token,ProjectID,LocationID,SolutionNo,Punches,Punchtypes,Order,status,LedgerDetail)
{



  const res = await fetch('https://api.procore.com/rest/v1.0/punch_items', {
    method: 'POST',
    qs: {run_configurable_validations: 'false'},
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     },
    body: JSON.stringify({
      project_id: ProjectID,
      punch_item: {
        description: Punches.description,
        due: Punches.DueDate,
        name: Punches.itemname,
        schedule_risk: 'ml_high',
        position: Punches.Position,
        priority: Punches.priority,
        private: false,
        date_initiated: '2019-08-24',
        schedule_impact: 'yes_known',
        schedule_impact_days: Punches.schedule_impact_days,
        reference: Punches.reference,
        cost_code_id: null,
        cost_impact: Punches.cost_impact,
        cost_impact_amount: 0,
        trade_id: Punches.trade_id,
        punch_item_type_id: Punches.punch_item_type_id,
        punch_item_manager_id: Punches.PunchitemManager,
        final_approver_id: Punches.FinalApprover,
        location_id: LocationID,
        login_information_ids: [Punches.Assignee],
        distribution_member_ids: [Punches.Assignee],
        custom_field_68346 : Punches.systeminfo,
        custom_field_68076 : Punches.DoorCloser,
        custom_field_68074 : Punches.Grid,
        custom_field_68071 : Punches.glassfinish
      
      }
    })
   
  })

const data = await res.json();




const PunchDetails = { AccessToken :access_token, ProjectID : ProjectID,SolutionNo : SolutionNo, PunchID : data.id, Floor : Punches.Floor , Space : Punches.Space , Type : Punches.itemtype, Order : Order,LedgerDetail : LedgerDetail}

return PunchDetails

}

async function UpdatePunchItem(access_token,PunchID,ProjectID,SolutionNo,Floor,Space,Type,Order,LedgerDetail)
{
  const res = await fetch(`https://api.procore.com/rest/v1.0/punch_items/${PunchID}`, {
    method: 'PATCH',
    qs: {run_configurable_validations: 'false'},
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     },
    body: JSON.stringify({
      project_id: ProjectID,
      punch_item: {
        status: "work_required",
        workflow_status: "work_required"

      }
    })
   
  })
 
const data = await res.json();


const PunchDetails = { AccessToken :access_token, ProjectID : ProjectID,SolutionNo : SolutionNo, PunchID : PunchID, Floor : Floor , Space : Space , Type : Type, Order : Order , LedgerDetail : LedgerDetail}

return PunchDetails
}


async function AddWADirectory(access_token,UserID,ProjectID,response)
{

  const res = await fetch(`https://api.procore.com/rest/v1.0/projects/${ProjectID}/users/${UserID}/actions/add`, {
    method: 'POST',
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     },
     body: JSON.stringify({
       user: {permission_template_id: 562949953575827}
  
    })
   
  })

const data = await res.json();

console.log(data)

let details = { AccessToken : access_token, ProjectID : ProjectID, ReqResposne : response}

return details

}


async function UpdateWinExistingProject(access_token,ProjectID,Order)
{ 
   
  let ProjectRefNo = ''
  let VersionNumber = '';

  var FinalAmount = ((Number(Order.FinalAmount)/100000).toFixed(2)).toString();

  if(Order.OrderNo.includes("/V-"))
  {
   let hyphen = Order.OrderNo.lastIndexOf("/V-");
   VersionNumber = Order.OrderNo.substring(hyphen + 1,Order.OrderNo.length);
   let tempproref = Order.OrderNo.substring(0, hyphen);
   let slash = tempproref.lastIndexOf("/");
   let proref = tempproref.substring(slash + 1, hyphen); 
   ProjectRefNo = proref + "/" + VersionNumber 
   
  }

  if(!Order.OrderNo.includes("/V-"))
  {
   
   let slash = Order.OrderNo.lastIndexOf("/");
   let proref = Order.OrderNo.substring(slash+ 1, Order.OrderNo.length);
   ProjectRefNo = proref
  }


  var ED = Order.EditDate.split("-")[0];
  var EDMonth = Order.EditDate.split("-")[1];
  var EDYear = Order.EditDate.split("-")[2];
  var EDFormat = EDYear+"-"+EDMonth+"-"+ED
  var editdate = new Date(EDFormat)
  


  var Squarefeet = Math.ceil(Number(Order.TotalSquareFeet))


    
  
    const res = await fetch(`https://api.procore.com/rest/v1.0/projects/${ProjectID}`, {
      method: 'PATCH',
      qs: {run_configurable_validations: 'false'},
      headers: {
      Authorization: `Bearer ${access_token}`,
      'content-type': 'application/json',
      'Procore-Company-Id': 562949953442334
       },
      body: JSON.stringify({
        company_id: 562949953442334,
        project: {
          project_number : ProjectRefNo,
          square_feet : Squarefeet,
          custom_field_53114 : editdate,
          custom_field_41564 : Order.CSValue,
          total_value: FinalAmount

        }
  
      })
     
    })
  
  const data = await res.json();


  var UpdateDetails = {ProjectID : data.id , Order : Order}

 
  
  return UpdateDetails
  
}



async function UpdateCommercialWinProject(access_token,ProjectID,Order,start_date,completion_date,estimated_start_date,estimated_completion_date,actual_start_date,projected_finish_date,editdate)
{ 

   
    const res = await fetch(`https://api.procore.com/rest/v1.0/projects/${ProjectID}`, {
      method: 'PATCH',
      qs: {run_configurable_validations: 'false'},
      headers: {
      Authorization: `Bearer ${access_token}`,
      'content-type': 'application/json',
      'Procore-Company-Id': 562949953442334
       },
       
      body: JSON.stringify({
        company_id: 562949953442334,
        project: {
          project_stage_id : 562949953436831,
          start_date: start_date,
          completion_date: completion_date,
          custom_field_53114 : editdate
          
        }
  
      })
     
    })
  
   
  const data = await res.json();

  console.log(data)


  /*
   start_date: start_date,
          completion_date: start_date,
          actual_start_date : actual_start_date,
          projected_finish_date : projected_finish_date,
          estimated_value: estimated_value,
          estimated_start_date: estimated_start_date,
          estimated_completion_date: estimated_completion_date
  */

 
  
  return data
  
}


async function CommercialWinCSProject(Order)
{






  let WinRefNo = ""
  let Version= ""

  if(Order.OrderNo.includes("/V-"))
  {
   let hyphen = Order.OrderNo.lastIndexOf("/V-");
   let tempproref = Order.OrderNo.substring(0, hyphen);
   Version =  Order.OrderNo.substring( hyphen,Order.OrderNo.length);
   let slash = tempproref.lastIndexOf("/");
   let proref = tempproref.substring(slash + 1, hyphen); 
   WinRefNo = proref
  }

  if(!Order.OrderNo.includes("/V-"))
  {
   let slash = Order.OrderNo.lastIndexOf("/");
   let proref = Order.OrderNo.substring(slash+ 1, Order.OrderNo.length);
   Version = "V-0"
   WinRefNo = proref
  }

  var BeforeDiscount = Order.GrandTotal;
  var ProjectName = Order.ProjectName;
  var TotalLocations = Order.Solutions.length;
  var TotalSquareFeet = Order.TotalSquareFeet;
  var Discount = Order.Discount
  var WinDate = Order.WinDate
  var EditDate = Order.EditDate
  var SolutionNumber = Order.Solutions.length.toString()
  var Source = Order.Source.toUpperCase();
  var HandoverDate = Order.HandOverDate;
  var CommercialWinDate= Order.CommercialWinDate





 

 


 


  var OrderRemark  = "ClientName:"+ Order.ClientName +"|Location:"+Order.Location + "|Architect:"+Order.Architect
  +"|Associate:"+Order.Associate+ "|Source:"+Order.Source + "|FinalAmount:" + Order.FinalAmount+ "|Status:"+Order.Status
  +"|Status:"+Order.Status+ "|TotalSolutions :"+SolutionNumber + "|TotalSqft:"+TotalSquareFeet + "|TotalLocations:"+TotalLocations
  +"|Source:"+Source + "|Version:"+Version
  


  


  

  const res = await fetch(`http://103.203.224.171/project/api/Rec/SaveProjectData`, {
    method: 'POST',
    headers: {
    'content-type': 'application/json',
     },
    body: JSON.stringify({

      projId: "", 
      refno : WinRefNo, 
      projval: BeforeDiscount, 
      projname : ProjectName, 
      windate : CommercialWinDate, 
      totsys :Discount,
      lasteditdt :EditDate, 
      Enq_Thr  :"ONLINE", 
      Proj_Dt :WinDate, 
      Category :"A", 
      Proj_Importance :"NO", 
      job_type :"CASH FOR", 
      Est_SDate :EditDate, 
      Est_EDate : HandoverDate,   
      Client_Req :OrderRemark, 
      Site_Add :Order.Location, 
      Landmark :Order.Architect, 
      Tel1 : Order.TotalSquareFeet, 
      FaxNo :Order.FinalAmount, 
      Tel2 :TotalLocations,
      Email :"TEST@GMAIL.COM",
      No_Layer :"2",
      Description :"LAMINATION WIT465465H IGU",
      Qtuantity :"10",
      Aprx_Prdct_Val :"980000",
      Sell_Rate :"2000"

  })
   
  })
 
const data = await res.json();



return data
}


async function UpdateProjectCS(Order)
{
 

  
     var DealerDiscount = ""
  

     /*
    for(var i =0 ; i<Users.length; i++)
    {
      if(Users[i].UserFullName==Order.Associate)
      {
         DealerDiscount = Users[i].DealerDiscount;
      }
    }
   */
  
  
  
  
    let WinRefNo = ""
    let Version= ""
  
    if(Order.OrderNo.includes("/V-"))
    {
     let hyphen = Order.OrderNo.lastIndexOf("/V-");
     let tempproref = Order.OrderNo.substring(0, hyphen);
     Version =  Order.OrderNo.substring( hyphen,Order.OrderNo.length);
     let slash = tempproref.lastIndexOf("/");
     let proref = tempproref.substring(slash + 1, hyphen); 
     WinRefNo = proref
    }
  
    if(!Order.OrderNo.includes("/V-"))
    {
     let slash = Order.OrderNo.lastIndexOf("/");
     let proref = Order.OrderNo.substring(slash+ 1, Order.OrderNo.length);
     Version = "V-0"
     WinRefNo = proref
    }
  
    var ClientDiscount = Order.Discount
    var BeforeDiscount = Order.GrandTotal;
    var ProjectName = WinRefNo+"/"+Order.ProjectName;
    var TotalLocations = Order.Solutions.length;
    var TotalSquareFeet = Order.TotalSquareFeet;
    var LastEditDate = Order.EditDate;
    var Discount = Order.Discount
    var Location = Order.Location
    var WinDate = Order.WinDate
    var EditDate = Order.EditDate
    var SolutionNumber = Order.Solutions.length.toString()
    var Source = Order.Source.toUpperCase();
    var HandoverDate = Order.HandOverDate;
    var CommercialWinDate = Order.CommercialWinDate;
    var Associate = Order.Associate.toUpperCase();
    var Status = Order.Status.toUpperCase();
    var CreationDate = Order.CreationDate
    var Architect = Order.Architect;

    var Office =""
 
   
  if(Order.Associate=="SHASHANK SINGH")
  {
    Office = "JB GLASS"
  }
  if(Order.Associate=="VIKAS SINGHAL")
  {
    Office = "JB GLASS"
  }
  if(Order.Associate=="ANKIT AGGARWAL")
  {
    Office = "JB GLASS"
  }
  if(Order.Associate=="AMIT PANDEY")
  {
    Office = "JB GLASS"
  }
  if(Order.Associate=="RIYAZ SAYYED")
  {
    Office = "OM INTERIORS"
  }

  if(Order.Associate=="SAKINA BATISH")
  {
    Office = "OM INTERIORS"
  }

  if(Order.Associate=="NAYAN PATIL")
  {
    Office = "AAREN INTPRO"
  }

  if(Order.Associate=="VIPIN KUMAR")
  {
    Office = "JB GLASS"
  }

  if(Order.Associate=="VISHAL PARIKH")
  {
    Office = "SURFACES PLUS"
  }

  if(Order.Associate=="RAJENDRA BADAYA")
  {
    Office = "BADAYA KITCHENS"
  }
  

  if(Order.Associate=="RAHUL JAISWAL")
  {
    Office = "PRABHUSURAT"
  }

  
  if(Order.Associate=="AAYUSH PANDEY")
  {
    Office = "JB GLASS"
  }

  if(Order.Associate=="ANUJ JAIN")
  {
    Office = "JB GLASS"
  }

  if(Order.Associate=="RUCHIR")
  {
    Office = "WALTZ HYDERABAD"
  }

  if(Order.Associate=="PRAVEEN KANODIA")
  {
    Office = "SPACIO"
  }

  
  var LedgerRemark 
  var OrderRemark

  if(Order.LedgerDetails=="nil")
  {
   LedgerRemark = Order.LedgerDetails
   OrderRemark = "|Version:"+Version
  }
  
  if(Order.LedgerDetails!=="nil")
  {
   let PartOne = Order.LedgerDetails.split("Architect:")[0] + "|Version:"+Version;
   let PartTwo = Order.LedgerDetails.split("Architect:")[1];

   LedgerRemark = PartOne
   OrderRemark = PartTwo
  }
    
  
    const res = await fetch(`http://103.203.224.171/Project/api/Rec/SaveProjectData`, {
      method: 'POST',
      headers: {
      'content-type': 'application/json',
       },
      body: JSON.stringify(
        
          {
            projId: "", 
            refno : WinRefNo, 
            projval :BeforeDiscount,
            projname : ProjectName, 
            windate : CommercialWinDate, 
            totsys : DealerDiscount,
            totsqm :ClientDiscount, 
            lasteditdt :LastEditDate, 
            remark :LedgerRemark, 
            Enq_Thr :"ONLINE", 
            Proj_Dt : WinDate, 
            Category :"A", 
            Proj_Importance :"YES",
            job_type :"EOU", 
            Est_SDate :CreationDate, 
            Est_EDate : HandoverDate, 
            Clad_Area :Order.ProValue,  
            Client_Req :OrderRemark, 
            Site_Add : Location, 
            Landmark :Architect, 
            Tel1 :TotalSquareFeet, 
            FaxNo :"", 
            Tel2 :TotalLocations,
            Email  :"TEST@GMAIL.COM",
            No_Layer :"2",
            Description :"LAMINATION WITH IGU",
            Qtuantity :"10",
            Aprx_Prdct_Val :"980000",
            Sell_Rate :"2000",
            city : "XXXXX",
            projtype :  Status,
            buildtype : Source,
            buildperf : Associate,
            facadele : Office
          
  
  
            }
        
      )
     
    })
   
  const data = await res.json();
  
  
  console.log(data)
  
  
  
  return data
  
    
  
  
    
  
   
  
  
 
}


async function GetProcoreProjectsForReport(access_token)
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

return  data;

}
/*
async function UpdateCommercialWinProject(access_token,ProjectID)
{ 

   
    const res = await fetch(`https://api.procore.com/rest/v1.0/projects/${ProjectID}`, {
      method: 'PATCH',
      qs: {run_configurable_validations: 'false'},
      headers: {
      Authorization: `Bearer ${access_token}`,
      'content-type': 'application/json',
      'Procore-Company-Id': 562949953442334
       },
       
      body: JSON.stringify({
        company_id: 562949953442334,
        project: {
          project_stage_id : 562949953430484
        }
  
      })
     
    })
  
   
  const data = await res.json();

  console.log(data)

  
  return data
  
}

*/


async function CreateProcoreWebhook(access_token,ProjectID,ReqResposne)
{

    
  const res = await fetch(`https://api.procore.com/rest/v1.0/webhooks/hooks`, {
    method: 'POST',
    qs: {run_configurable_validations: 'false'},
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     },
     
    body: JSON.stringify({
      project_id: ProjectID,
      hook : {
        api_version : "v2",
        namespace : "procore",
        destination_url : "http://waltzwebpro.jbglasshouse.com:3001/api/procore-webhook",
        destination_headers : {
          Authorization: ""
        }
      }
    })
   
  })

const data = await res.json();

var Details = {AccessToken : access_token, ProjectID : ProjectID , WebhookData : data, ReqResposne : ReqResposne}

return  Details;



}



async function CreateWebhookTrigger(access_token,HookID,ProjectID,ReqResposne)
{

    
  const res = await fetch(`https://api.procore.com/rest/v1.0/webhooks/hooks/${HookID}/triggers/bulk`, {
    method: 'POST',
    qs: {run_configurable_validations: 'false'},
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     },
     
    body: JSON.stringify({
      project_id: ProjectID,
      api_version: "v2",
      triggers: [
        {
          "resource_name": "Punch Items",
          "event_type": "delete"
        },
        {
          "resource_name": "Punch Items",
          "event_type": "update"
        },
        {
          "resource_name": "Punch Items",
          "event_type": "create"
        }
      ]
    })
   
  })

const data = await res.json();

console.log(data)

var Details = { ReqResposne : ReqResposne}

return  Details;



}


async function GetProcorePunchID(access_token,ProjectID)
{

   const res = await fetch(`https://api.procore.com/rest/v1.1/punch_items?project_id=${ProjectID}`, {
    method: 'GET',
    qs: {run_configurable_validations: 'false'},
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     }
     
  
   
  })

const data = await res.json();


return  data;



}

















//==============================================CREATE PROJECT=============================================================

app.post('/api/createprocoreproject', async(req, res) => {
 
  var active = "true";
  var address = "";
  var city = "";
  var state_code = "";
  var country_code = "IN";
  var start_date = "";
  var completion_date =  "";
  var total_value =  "";
  var name = req.body.ProjectName
  var office_id = req.body.OfficeID;
  var phone = ""
  var project_number = req.body.OrderNo;
  var square_feet = ""
  var time_zone = "New Delhi"
  var tz_name = "Asia/Kolkata" 
  var zip = ""
  var project_type_id = "562949953511908";
  var estimated_value = ""
  var estimated_start_date = ""
  var estimated_completion_date = ""
  var source = 97592;
  var actual_start_date = ""
  var projected_finish_date = ""
  var editdate = ""
  var pipelinedate = new Date(req.body.CreationDate);

  getAccessToken().then((response)=>{
    return CreateProject(response,active,address,city,country_code,start_date,completion_date,total_value,name,office_id,phone,project_number,square_feet,time_zone,zip,project_type_id,estimated_value,estimated_start_date,estimated_completion_date,state_code,source,actual_start_date,tz_name,projected_finish_date,editdate,pipelinedate) 
  })
  .then((response)=>{
    res.json(response.id)
  })

});







app.post('/api/updateproject', async(req, res) => {
 
    var active = "true";
    var address = req.body.LedgerDetail.AddressLine1;
    var city = req.body.LedgerDetail.City;
    var state_code = req.body.LedgerDetail.State;
    var country_code = "IN"
    var start_date =req.body.Order.WinDate;
    var completion_date =  req.body.Order.CompletionDate;
    var total_value =  Math.ceil(Number(req.body.Order.FinalAmount));
    var name = req.body.Order.ProjectName
    var office_id = req.body.Order.OfficeID;
    var phone = req.body.LedgerDetail.CDMobile1;
    var project_number = req.body.Order.OrderNo;
    var square_feet = Math.ceil(Number(req.body.Order.TotalSquareFeet));
    var time_zone = "New Delhi"
    var tz_name = "Asia/Kolkata" 
    var zip = req.body.LedgerDetail.Pincode;
    var project_type_id = "562949953511908";
    var estimated_value = Math.ceil(Number(req.body.Order.FinalAmount));
    var estimated_start_date = req.body.Order.CreationDate;
    var estimated_completion_date = req.body.Order.CompletionDate;
    var source = 97592;
    var actual_start_date = req.body.Order.WinDate
    var projected_finish_date = req.body.Order.CompletionDate;
    var editdate = new Date(req.body.Order.EditDate);
    var pipelinedate = new Date(req.body.Order.CreationDate);
    var Solutions = req.body.Order.Solutions;
    var Discount = req.body.Order.Discount;
    var ProjectName = req.body.Order.ProjectName;
    var Associate = req.body.Order.Associate;
    var WebappAmount = req.body.Order.FinalAmount;
    var TotalSquareFeet = req.body.Order.TotalSquareFeet;



   



  getAccessToken().then((response)=>{
  // return UpdateProject(response,req.body.Order.ProjectID,active,address,city,country_code,start_date,completion_date,total_value,name,office_id,phone,project_number,square_feet,time_zone,zip,project_type_id,estimated_value,estimated_start_date,estimated_completion_date,state_code,source,actual_start_date,tz_name,projected_finish_date,editdate,pipelinedate,Solutions,Discount,ProjectName,Associate,WebappAmount,TotalSquareFeet) 
   return ListProcoreProjects(response,req.body.Order,req.body.LedgerDetail)
  })
  .then((response)=>{
    var ProcoreOrders = response.ProcoreOrders;
    var Order = response.Order;
    var LedgerDetail = response.LedgerDetail;
    var AccessToken = response.AccessToken;
      
    var ExistingProcoreProjectID=""


    for(var i = 0; i< ProcoreOrders.length; i++)
    {
     // console.log(ProcoreOrders[i].project_number)

      if(ProcoreOrders[i].project_number==Order.OrderNo)
      {
        ExistingProcoreProjectID = ProcoreOrders[i].id;
      }
    }

   

  

   if(ExistingProcoreProjectID!=="")
   {
    var ProjectDetails = {AccessToken : AccessToken , ProjectID : ExistingProcoreProjectID , Order : Order, LedgerDetail : LedgerDetail}
     return  ProjectDetails
   }

   
   if(ExistingProcoreProjectID=="")
   {
    var ProjectDetails = {AccessToken : AccessToken, ProjectID : "", Order : Order, LedgerDetail : LedgerDetail}
     return  ProjectDetails
   }


  })
  .then((response)=>{

    var AccessToken = response.AccessToken;
    var Order = response.Order;
    var ProjectID = response.ProjectID;
    var LedgerDetail = response.LedgerDetail;



    
    if(ProjectID!=="")
    {
      var active = "true";
      var address = LedgerDetail.AddressLine1;
      var city = LedgerDetail.City;
      var state_code = LedgerDetail.State;
      var country_code = "IN"
      var start_date = Order.WinDate;
      var ProPlus = req.body.LedgerDetail.ProPlusCost;
      var completion_date =  Order.CompletionDate;
      var total_value =  Math.ceil(Number(Order.FinalAmount));
      var name = Order.ProjectName
      var office_id = Order.OfficeID;
      var phone = LedgerDetail.CDMobile1;
      var project_number = Order.OrderNo;
      var square_feet = Math.ceil(Number(Order.TotalSquareFeet));
      var time_zone = "New Delhi";
      var tz_name = "Asia/Kolkata"; 
      var zip = LedgerDetail.Pincode;
      var project_type_id = "562949953511908";
      var estimated_value = Math.ceil(Number(Order.FinalAmount));
      var estimated_start_date = Order.CreationDate;
      var estimated_completion_date = Order.CompletionDate;
      var source = 97592;
      var actual_start_date = Order.WinDate
      var projected_finish_date =Order.CompletionDate;
      var editdate = new Date(Order.EditDate);
      var pipelinedate = new Date(Order.CreationDate);
      var Solutions = Order.Solutions;
      var Discount = Order.Discount;
      var ProjectName = Order.ProjectName;
      var Associate = Order.Associate;
      var WebappAmount = Order.FinalAmount;
      var TotalSquareFeet = Order.TotalSquareFeet;

     return  UpdateExistingProject(AccessToken,ProjectID,active,address,city,country_code,start_date,completion_date,total_value,name,office_id,phone,project_number,square_feet,time_zone,zip,project_type_id,estimated_value,estimated_start_date,estimated_completion_date,state_code,source,actual_start_date,tz_name,projected_finish_date,editdate,pipelinedate,Solutions,Discount,ProjectName,Associate,WebappAmount,TotalSquareFeet,ProPlus,Order)
    }

 


   
    

    if(ProjectID=="")
    {
      
      var active = "true";
      var address = req.body.LedgerDetail.AddressLine1;
      var city = req.body.LedgerDetail.City;
      var state_code = req.body.LedgerDetail.State;
      var ProPlus = req.body.LedgerDetail.ProPlusCost;
      var country_code = "IN"
      var start_date =req.body.Order.WinDate;
      var completion_date =  req.body.Order.CompletionDate;
      var total_value =  Math.ceil(Number(req.body.Order.FinalAmount));
      var name = req.body.Order.ProjectName
      var office_id = req.body.Order.OfficeID;
      var phone = req.body.LedgerDetail.CDMobile1;
      var project_number = req.body.Order.OrderNo;
      var square_feet = Math.ceil(Number(req.body.Order.TotalSquareFeet));
      var time_zone = "New Delhi"
      var tz_name = "Asia/Kolkata" 
      var zip = req.body.LedgerDetail.Pincode;
      var project_type_id = "562949953511908";
      var estimated_value = Math.ceil(Number(req.body.Order.FinalAmount));
      var estimated_start_date = req.body.Order.CreationDate;
      var estimated_completion_date = req.body.Order.CompletionDate;
      var source = 97592;
      var actual_start_date = req.body.Order.WinDate
      var projected_finish_date = req.body.Order.CompletionDate;
      var editdate = new Date(req.body.Order.EditDate);
      var pipelinedate = new Date(req.body.Order.CreationDate);
      var Solutions = req.body.Order.Solutions;
      var Discount = req.body.Order.Discount;
      var ProjectName = req.body.Order.ProjectName;
      var Associate = req.body.Order.Associate;
      var WebappAmount = req.body.Order.FinalAmount;
      var TotalSquareFeet = req.body.Order.TotalSquareFeet;

      return UpdateProject(AccessToken,ProjectID,active,address,city,country_code,start_date,completion_date,total_value,name,office_id,phone,project_number,square_feet,time_zone,zip,project_type_id,estimated_value,estimated_start_date,estimated_completion_date,state_code,source,actual_start_date,tz_name,projected_finish_date,editdate,pipelinedate,Solutions,Discount,ProjectName,Associate,WebappAmount,TotalSquareFeet,ProPlus,Order)
  
    }

   

  
  })
 .then((response)=>{
   
  var AccessToken = response.AccessToken;
  var Order = response.Order;
  var ProjectID = response.ProjectID;



  return  ListCreateWinLocations(AccessToken,ProjectID,Order) 
 
 })
 .then((response)=>{
  //{ Locations : data, AccessToken :access_token ,Order : Order}
 
   let ProcoreLocationIDs = [];
   for(var i = 0;i<response.Locations.length;i++)
   {
      ProcoreLocationIDs.push(response.Locations[i].id)
   }

  

   if(ProcoreLocationIDs.length<1)
   {
    
    var ResData = [{ExtraLocations : "False",AccessToken : response.AccessToken, Order : response.Order ,ProjectID : response.ProjectID}]
    return ResData
   }

   let DeletePromises = []
     
   if(ProcoreLocationIDs.length>0)
   {
    for(var i =0;i<ProcoreLocationIDs.length;i++)
    {
      DeletePromises.push(DeleteCreatedWinLocation(response.AccessToken,ProcoreLocationIDs[i],response.Order,response.ProjectID))
    }

    return Promise.all(DeletePromises)
   }
 
})
.then((response)=>{
  var AccessToken = response[0].AccessToken;
  var Order = response[0].Order;
  var ProjectID = response[0].ProjectID


  return  ListCreatedWinPunchIDS(AccessToken,Order,ProjectID)
})
.then((response)=>{
  var Order = response.Order;
  var AccessToken = response.AccessToken;
  var Punches = response.PunchIDs;
  var ProjectID = response.ProjectID;

  var ProcorePunchIDs = [];

  for(var i = 0 ;i < Punches.length; i++)
  {
    ProcorePunchIDs.push(Punches[i].id)
  }


  if(ProcorePunchIDs.length<1)
  {
    var ResData = [{ExtraPunchitems : "False",AccessToken : AccessToken, Order : Order ,ProjectID : ProjectID}]
    return ResData

  }


  var DeletePromises = [];

  if(ProcorePunchIDs.length>0)
  {

    for(var i =0 ; i < ProcorePunchIDs.length; i++)
    {
      DeletePromises.push(DeleteCreatedWinPunch(AccessToken,ProcorePunchIDs[i],Order,ProjectID))
    }
    

    return Promise.all(DeletePromises)

  }


})
.then((response)=>{
    
    var ProjectID = response[0].ProjectID;
    var Solutions = response[0].Order.Solutions;
    var AccessToken = response[0].AccessToken;
    var Discount = response[0].Order.Discount;
    var Project = response[0].Order.ProjectName;
    var Associate = response[0].Order.Associate;
    var WebappAmount = response[0].Order.FinalAmount;
    var TotalSquareFeet = response[0].Order.TotalSquareFeet;
  

    
   
    
    var TestPromises = []

    var Punches = [];

    
    for(var i = 0;i<Solutions.length;i++)
    {
       for(var j= 0; j<Number(Solutions[i].Quantity); j++)
       {
        //======================FOR LOCATIONS================================
        var Sno
        if(Number(Solutions[i].Quantity)<2)
        {
         Sno = i+1
        }
 
        if(Number(Solutions[i].Quantity)>1)
        {
         Sno = (i+1)+ "."+ (j+1)
        }
 
       
        
        var FirstTier = Sno + " "+Solutions[i].Floor+ " "+ Solutions[i].Space+ " " + Solutions[i].System+ " "+ Solutions[i].SubSystem+ " "+ Solutions[i].SystemType

        var Amount = Number(Solutions[i].Amount)/Number(Solutions[i].Quantity)

        var FinalAmount = Amount;
        var Due  = new Date();
        var DueDate = Due.getDate();
        var DueMonth = Due.getMonth() + 1;
        var DueYear = Due.getFullYear();
        var DueFormat =  DueYear+ "-"+ DueMonth+ "-"+ DueDate;

      
        let temp = {
          Serial : Sno,
          ProjectName : ProjectName,
          WebappAmount : WebappAmount,
          Associate : Associate,
          LocationName : FirstTier,
          Serial : Sno, 
          Floor : Solutions[i].Floor,
          Space : Solutions[i].Space,
          System : Solutions[i].System,
          SubSystem : Solutions[i].SubSystem,
          SystemType :Solutions[i].SystemType, 
          Orientation : Solutions[i].Orientation,
          SubOrientation : Solutions[i].SubOrientation,
          Width : Solutions[i].Width,
          Height :Solutions[i].Height,
          Quantity : Solutions[i].Quantity,
          FrameFinish : Solutions[i].Color, 
          GlassFinish : Solutions[i].GlassFinish,
          GlassVariant :Solutions[i].GlassVariant,
          Grid : Solutions[i].Grid, 
          Handle : Solutions[i].Handle, 
          DoorCloser : Solutions[i].DoorCloser,
          DropSeal : Solutions[i].DropSeal,
          Lock : Solutions[i].Lock,
          SquareFeet : Solutions[i].SquareFeet,
          FinalAmount : FinalAmount,
          DueDate : DueFormat,
          TotalSquareFeet : TotalSquareFeet
        }
         

        //=============================================================================
        Punches.push(temp)

       }
  
    }

  //==========================Making Locations=============================================
    for(var i = 0; i<Punches.length; i++ )
    {
     
     TestPromises.push(CreateProjectLocation(AccessToken,ProjectID,Punches[i]))
   
    }
    
    return Promise.all(TestPromises)
 
  })
 
  .then((response)=>{

    var Punchtypes = response.Punchtypes;

    
    var AccessToken = response.AccessToken;

    var PunchItems = [];


    var ProjectPunctype,SystemPunchtype,SubtrackPunchtype,SubframePunchtype

    for(var k=0;k<Punchtypes.length;k++)
    {
      if(Punchtypes[k].name=="System")
      {
        SystemPunchtype = Punchtypes[k].id;
      }
      if(Punchtypes[k].name=="Project")
      {
        ProjectPunctype = Punchtypes[k].id;
      }
      if(Punchtypes[k].name=="Sub Track")
      {
        SubtrackPunchtype = Punchtypes[k].id;
      }
      if(Punchtypes[k].name=="Sub Frame")
      {
        SubframePunchtype = Punchtypes[k].id;
      }
    }


    var Trades = [
      {
          "id": 562949953579180,
          "name": "Architect",
          "active": true,
          "updated_at": "2023-03-24T11:02:18Z"
      },
      {
          "id": 562949953536884,
          "name": "architecture",
          "active": true,
          "updated_at": "2023-03-24T11:02:19Z"
      },
      {
          "id": 562949953536885,
          "name": "associate",
          "active": true,
          "updated_at": "2023-03-24T11:02:19Z"
      },
      {
          "id": 562949953558307,
          "name": "Client",
          "active": true,
          "updated_at": "2023-03-24T11:02:20Z"
      },
      {
          "id": 562949953564090,
          "name": "Existing Architect",
          "active": true,
          "updated_at": "2023-03-24T11:02:17Z"
      },
      {
          "id": 562949953579303,
          "name": "F.I.R",
          "active": true,
          "updated_at": "2023-03-24T11:02:16Z"
      },
      {
          "id": 562949953530044,
          "name": "Glass Shutters",
          "active": true,
          "updated_at": "2023-03-24T11:02:16Z"
      },
      {
          "id": 562949953613348,
          "name": "Lightning Design Consultant",
          "active": true,
          "updated_at": "2023-03-24T11:02:15Z"
      },
      {
          "id": 562949953558308,
          "name": "PMC",
          "active": true,
          "updated_at": "2023-03-24T11:02:14Z"
      },
      {
          "id": 562949953558309,
          "name": "Pro Architect",
          "active": true,
          "updated_at": "2023-03-24T11:02:14Z"
      },
      {
          "id": 562949953611920,
          "name": "Project Expense ",
          "active": true,
          "updated_at": "2023-03-24T11:02:13Z"
      },
      {
          "id": 562949953577548,
          "name": "Pro Plus Architect",
          "active": true,
          "updated_at": "2023-03-24T11:02:13Z"
      },
      {
          "id": 562949953576487,
          "name": "Social Architect",
          "active": true,
          "updated_at": "2023-03-24T11:02:12Z"
      },
      {
          "id": 562949953556079,
          "name": "Travel Expense Summary",
          "active": true,
          "updated_at": "2023-03-24T11:02:12Z"
      },
      {
          "id": 562949953600955,
          "name": "WALTZ.CLOSE 2.O 135 DEGREE BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:02:07Z"
      },
      {
          "id": 562949953600956,
          "name": "WALTZ.CLOSE 2.O 135 DEGREE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:02:06Z"
      },
      {
          "id": 562949953635896,
          "name": "WALTZ.CLOSE 2.O 135 DEGREE GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:04:27Z"
      },
      {
          "id": 562949953600957,
          "name": "WALTZ.CLOSE 2.O 135 DEGREE GOLDEN PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:02:06Z"
      },
      {
          "id": 562949953635897,
          "name": "WALTZ.CLOSE 2.O 135 DEGREE GOLD PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:04:40Z"
      },
      {
          "id": 562949953635982,
          "name": "WALTZ.CLOSE 2.O 135 DEGREE GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:28:31Z"
      },
      {
          "id": 562949953635981,
          "name": "WALTZ.CLOSE 2.O 135 DEGREE GREY PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:28:25Z"
      },
      {
          "id": 562949953600958,
          "name": "WALTZ.CLOSE 2.O 135 DEGREE SILVER PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:02:04Z"
      },
      {
          "id": 562949953600931,
          "name": "WALTZ.CLOSE 2.O 180 DEGREE BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:02:03Z"
      },
      {
          "id": 562949953600932,
          "name": "WALTZ.CLOSE 2.O 180 DEGREE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:02:03Z"
      },
      {
          "id": 562949953635898,
          "name": "WALTZ.CLOSE 2.O 180 DEGREE GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:04:55Z"
      },
      {
          "id": 562949953600933,
          "name": "WALTZ.CLOSE 2.O 180 DEGREE GOLDEN PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:02:01Z"
      },
      {
          "id": 562949953635899,
          "name": "WALTZ.CLOSE 2.O 180 DEGREE GOLD PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:05:29Z"
      },
      {
          "id": 562949953635980,
          "name": "WALTZ.CLOSE 2.O 180 DEGREE GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:28:19Z"
      },
      {
          "id": 562949953635979,
          "name": "WALTZ.CLOSE 2.O 180 DEGREE GREY PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:28:12Z"
      },
      {
          "id": 562949953600934,
          "name": "WALTZ.CLOSE 2.O 180 DEGREE SILVER PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:02:00Z"
      },
      {
          "id": 562949953600927,
          "name": "WALTZ.CLOSE 2.O 90 DEGREE BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:59Z"
      },
      {
          "id": 562949953600928,
          "name": "WALTZ.CLOSE 2.O 90 DEGREE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:58Z"
      },
      {
          "id": 562949953635900,
          "name": "WALTZ.CLOSE 2.O 90 DEGREE GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:05:41Z"
      },
      {
          "id": 562949953600929,
          "name": "WALTZ.CLOSE 2.O 90 DEGREE GOLDEN PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:58Z"
      },
      {
          "id": 562949953635901,
          "name": "WALTZ.CLOSE 2.O 90 DEGREE GOLD PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:05:53Z"
      },
      {
          "id": 562949953635978,
          "name": "WALTZ.CLOSE 2.O 90 DEGREE GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:28:05Z"
      },
      {
          "id": 562949953635977,
          "name": "WALTZ.CLOSE 2.O 90 DEGREE GREY PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:27:55Z"
      },
      {
          "id": 562949953600930,
          "name": "WALTZ.CLOSE 2.O 90 DEGREE SILVER PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:56Z"
      },
      {
          "id": 562949953541348,
          "name": "WALTZ.CLOSE 2.O BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:55Z"
      },
      {
          "id": 562949953541349,
          "name": "WALTZ.CLOSE 2.O CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:55Z"
      },
      {
          "id": 562949953635902,
          "name": "WALTZ.CLOSE 2.O GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:06:01Z"
      },
      {
          "id": 562949953541350,
          "name": "WALTZ.CLOSE 2.O GOLDEN PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:54Z"
      },
      {
          "id": 562949953635903,
          "name": "WALTZ.CLOSE 2.O GOLD PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:06:10Z"
      },
      {
          "id": 562949953635976,
          "name": "WALTZ.CLOSE 2.O GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:27:46Z"
      },
      {
          "id": 562949953635975,
          "name": "WALTZ.CLOSE 2.O GREY PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:27:39Z"
      },
      {
          "id": 562949953541335,
          "name": "WALTZ.CLOSE 2.O SILVER PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:52Z"
      },
      {
          "id": 562949953600939,
          "name": "WALTZ.CLOSE 2.O SLIDE BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:52Z"
      },
      {
          "id": 562949953600940,
          "name": "WALTZ.CLOSE 2.O SLIDE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:51Z"
      },
      {
          "id": 562949953635904,
          "name": "WALTZ.CLOSE 2.O SLIDE GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:06:21Z"
      },
      {
          "id": 562949953600941,
          "name": "WALTZ.CLOSE 2.O SLIDE GOLDEN PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:51Z"
      },
      {
          "id": 562949953635905,
          "name": "WALTZ.CLOSE 2.O SLIDE GOLD PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:06:30Z"
      },
      {
          "id": 562949953635974,
          "name": "WALTZ.CLOSE 2.O SLIDE GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:27:33Z"
      },
      {
          "id": 562949953635973,
          "name": "WALTZ.CLOSE 2.O SLIDE GREY PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:27:25Z"
      },
      {
          "id": 562949953600942,
          "name": "WALTZ.CLOSE 2.O SLIDE SILVER PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:48Z"
      },
      {
          "id": 562949953600935,
          "name": "WALTZ.CLOSE 2.O T JUNCTION BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:49Z"
      },
      {
          "id": 562949953600936,
          "name": "WALTZ.CLOSE 2.O T JUNCTION CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:46Z"
      },
      {
          "id": 562949953635906,
          "name": "WALTZ.CLOSE 2.O T JUNCTION GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:06:39Z"
      },
      {
          "id": 562949953600937,
          "name": "WALTZ.CLOSE 2.O T JUNCTION GOLDEN PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:46Z"
      },
      {
          "id": 562949953635907,
          "name": "WALTZ.CLOSE 2.O T JUNCTION GOLD PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:06:48Z"
      },
      {
          "id": 562949953635972,
          "name": "WALTZ.CLOSE 2.O T JUNCTION GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:27:19Z"
      },
      {
          "id": 562949953635971,
          "name": "WALTZ.CLOSE 2.O T JUNCTION GREY PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:27:13Z"
      },
      {
          "id": 562949953600938,
          "name": "WALTZ.CLOSE 2.O T JUNCTION SILVER PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:44Z"
      },
      {
          "id": 562949953600943,
          "name": "WALTZ.CLOSE 2.O U SHAPE BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:44Z"
      },
      {
          "id": 562949953600944,
          "name": "WALTZ.CLOSE 2.O U SHAPE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:44Z"
      },
      {
          "id": 562949953635908,
          "name": "WALTZ.CLOSE 2.O U SHAPE GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:07:00Z"
      },
      {
          "id": 562949953600945,
          "name": "WALTZ.CLOSE 2.O U SHAPE GOLDEN PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:43Z"
      },
      {
          "id": 562949953635909,
          "name": "WALTZ.CLOSE 2.O U SHAPE GOLD PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:07:11Z"
      },
      {
          "id": 562949953635970,
          "name": "WALTZ.CLOSE 2.O U SHAPE GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:27:07Z"
      },
      {
          "id": 562949953635969,
          "name": "WALTZ.CLOSE 2.O U SHAPE GREY PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:27:00Z"
      },
      {
          "id": 562949953600946,
          "name": "WALTZ.CLOSE 2.O U SHAPE SILVER PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:41Z"
      },
      {
          "id": 562949953545641,
          "name": "WALTZ CLOSE NONE BLACK PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:40Z"
      },
      {
          "id": 562949953545642,
          "name": "WALTZ.CLOSE NONE BLACK PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:40Z"
      },
      {
          "id": 562949953545640,
          "name": "WALTZ CLOSE NONE BRONZE PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:39Z"
      },
      {
          "id": 562949953545643,
          "name": "WALTZ.CLOSE NONE BRONZE PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:39Z"
      },
      {
          "id": 562949953635910,
          "name": "WALTZ CLOSE NONE GOLD PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:07:18Z"
      },
      {
          "id": 562949953635968,
          "name": "WALTZ CLOSE NONE GREY PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:26:52Z"
      },
      {
          "id": 562949953600971,
          "name": "WALTZ.CLOSE NXT 135 DEGREE BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:37Z"
      },
      {
          "id": 562949953600972,
          "name": "WALTZ.CLOSE NXT 135 DEGREE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:37Z"
      },
      {
          "id": 562949953635911,
          "name": "WALTZ.CLOSE NXT 135 DEGREE GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:07:27Z"
      },
      {
          "id": 562949953600973,
          "name": "WALTZ.CLOSE NXT 135 DEGREE GOLDEN PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:36Z"
      },
      {
          "id": 562949953635912,
          "name": "WALTZ.CLOSE NXT 135 DEGREE GOLD PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:07:36Z"
      },
      {
          "id": 562949953635967,
          "name": "WALTZ.CLOSE NXT 135 DEGREE GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:26:44Z"
      },
      {
          "id": 562949953635966,
          "name": "WALTZ.CLOSE NXT 135 DEGREE GREY PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:26:38Z"
      },
      {
          "id": 562949953600974,
          "name": "WALTZ.CLOSE NXT 135 DEGREE SILVER PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:34Z"
      },
      {
          "id": 562949953600963,
          "name": "WALTZ.CLOSE NXT 180 DEGREE BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:34Z"
      },
      {
          "id": 562949953600964,
          "name": "WALTZ.CLOSE NXT 180 DEGREE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:33Z"
      },
      {
          "id": 562949953635913,
          "name": "WALTZ.CLOSE NXT 180 DEGREE GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:07:43Z"
      },
      {
          "id": 562949953600965,
          "name": "WALTZ.CLOSE NXT 180 DEGREE GOLDEN PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:32Z"
      },
      {
          "id": 562949953635914,
          "name": "WALTZ.CLOSE NXT 180 DEGREE GOLD PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:07:51Z"
      },
      {
          "id": 562949953635965,
          "name": "WALTZ.CLOSE NXT 180 DEGREE GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:26:32Z"
      },
      {
          "id": 562949953635964,
          "name": "WALTZ.CLOSE NXT 180 DEGREE GREY PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:26:25Z"
      },
      {
          "id": 562949953600966,
          "name": "WALTZ.CLOSE NXT 180 DEGREE SILVER PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:31Z"
      },
      {
          "id": 562949953600959,
          "name": "WALTZ.CLOSE NXT 90 DEGREE BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:32Z"
      },
      {
          "id": 562949953600960,
          "name": "WALTZ.CLOSE NXT 90 DEGREE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:29Z"
      },
      {
          "id": 562949953635915,
          "name": "WALTZ.CLOSE NXT 90 DEGREE GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:08:06Z"
      },
      {
          "id": 562949953600961,
          "name": "WALTZ.CLOSE NXT 90 DEGREE GOLDEN PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:29Z"
      },
      {
          "id": 562949953635916,
          "name": "WALTZ.CLOSE NXT 90 DEGREE GOLD PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:08:19Z"
      },
      {
          "id": 562949953635963,
          "name": "WALTZ.CLOSE NXT 90 DEGREE GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:26:14Z"
      },
      {
          "id": 562949953635962,
          "name": "WALTZ.CLOSE NXT 90 DEGREE GREY PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:26:07Z"
      },
      {
          "id": 562949953600962,
          "name": "WALTZ.CLOSE NXT 90 DEGREE SILVER PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:27Z"
      },
      {
          "id": 562949953541351,
          "name": "WALTZ.CLOSE NXT BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:26Z"
      },
      {
          "id": 562949953541352,
          "name": "WALTZ.CLOSE NXT CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:25Z"
      },
      {
          "id": 562949953635654,
          "name": "WALTZ.CLOSE NXT GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:24Z"
      },
      {
          "id": 562949953561738,
          "name": "WALTZ.CLOSE NXT GOLDEN PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:23Z"
      },
      {
          "id": 562949953635917,
          "name": "WALTZ.CLOSE NXT GOLD PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:08:40Z"
      },
      {
          "id": 562949953635961,
          "name": "WALTZ.CLOSE NXT GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:26:01Z"
      },
      {
          "id": 562949953635960,
          "name": "WALTZ.CLOSE NXT GREY PVDF",
          "active": true,
          "updated_at": "2023-03-24T10:25:54Z"
      },
      {
          "id": 562949953574110,
          "name": "WALTZ.CLOSE NXT SILVER PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:21Z"
      },
      {
          "id": 562949953600967,
          "name": "WALTZ.CLOSE NXT T JUNCTION BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:21Z"
      },
      {
          "id": 562949953600968,
          "name": "WALTZ.CLOSE NXT T JUNCTION CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:20Z"
      },
      {
          "id": 562949953635918,
          "name": "WALTZ.CLOSE NXT T JUNCTION GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:08:52Z"
      },
      {
          "id": 562949953600969,
          "name": "WALTZ.CLOSE NXT T JUNCTION GOLDEN PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:18Z"
      },
      {
          "id": 562949953635959,
          "name": "WALTZ.CLOSE NXT T JUNCTION GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:25:48Z"
      },
      {
          "id": 562949953600970,
          "name": "WALTZ.CLOSE NXT T JUNCTION SILVER PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:17Z"
      },
      {
          "id": 562949953600975,
          "name": "WALTZ.CLOSE NXT U SHAPE BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:17Z"
      },
      {
          "id": 562949953600976,
          "name": "WALTZ.CLOSE NXT U SHAPE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:16Z"
      },
      {
          "id": 562949953635919,
          "name": "WALTZ.CLOSE NXT U SHAPE GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:09:00Z"
      },
      {
          "id": 562949953600977,
          "name": "WALTZ.CLOSE NXT U SHAPE GOLDEN PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:16Z"
      },
      {
          "id": 562949953635958,
          "name": "WALTZ.CLOSE NXT U SHAPE GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:25:43Z"
      },
      {
          "id": 562949953600978,
          "name": "WALTZ.CLOSE NXT U SHAPE SILVER PVDF",
          "active": true,
          "updated_at": "2023-03-24T11:01:14Z"
      },
      {
          "id": 562949953541345,
          "name": "WALTZ.GLIDE FLUSH BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:13Z"
      },
      {
          "id": 562949953541347,
          "name": "WALTZ.GLIDE FLUSH CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:13Z"
      },
      {
          "id": 562949953635930,
          "name": "WALTZ.GLIDE FLUSH GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:18:41Z"
      },
      {
          "id": 562949953635946,
          "name": "WALTZ.GLIDE FLUSH GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:21:59Z"
      },
      {
          "id": 562949953600921,
          "name": "WALTZ.GLIDE FLUSH NONE BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:11Z"
      },
      {
          "id": 562949953600922,
          "name": "WALTZ.GLIDE FLUSH NONE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:10Z"
      },
      {
          "id": 562949953635931,
          "name": "WALTZ.GLIDE FLUSH NONE GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:18:47Z"
      },
      {
          "id": 562949953635945,
          "name": "WALTZ.GLIDE FLUSH NONE GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:21:52Z"
      },
      {
          "id": 562949953541344,
          "name": "WALTZ.GLIDE REGULAR BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:09Z"
      },
      {
          "id": 562949953541346,
          "name": "WALTZ.GLIDE REGULAR CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:08Z"
      },
      {
          "id": 562949953634734,
          "name": "WALTZ.GLIDE REGULAR GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:08Z"
      },
      {
          "id": 562949953635944,
          "name": "WALTZ.GLIDE REGULAR GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:21:43Z"
      },
      {
          "id": 562949953600979,
          "name": "WALTZ.GLIDE REGULAR NXT BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:07Z"
      },
      {
          "id": 562949953600980,
          "name": "WALTZ.GLIDE REGULAR NXT CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:06Z"
      },
      {
          "id": 562949953635932,
          "name": "WALTZ.GLIDE REGULAR NXT GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:19:01Z"
      },
      {
          "id": 562949953635943,
          "name": "WALTZ.GLIDE REGULAR NXT GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:21:37Z"
      },
      {
          "id": 562949953600919,
          "name": "WALTZ.GLIDE REGULAR REGULAR BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:05Z"
      },
      {
          "id": 562949953600920,
          "name": "WALTZ.GLIDE REGULAR REGULAR CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:05Z"
      },
      {
          "id": 562949953635933,
          "name": "WALTZ.GLIDE REGULAR REGULAR GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:19:07Z"
      },
      {
          "id": 562949953635942,
          "name": "WALTZ.GLIDE REGULAR REGULAR GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:21:31Z"
      },
      {
          "id": 562949953541337,
          "name": "WALTZ.SLIDE FLUSH BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:03Z"
      },
      {
          "id": 562949953541339,
          "name": "WALTZ.SLIDE FLUSH CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:03Z"
      },
      {
          "id": 562949953635920,
          "name": "WALTZ.SLIDE FLUSH GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:16:34Z"
      },
      {
          "id": 562949953635957,
          "name": "WALTZ.SLIDE FLUSH GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:25:30Z"
      },
      {
          "id": 562949953600909,
          "name": "WALTZ.SLIDE FLUSH POCKET DOOR BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:01Z"
      },
      {
          "id": 562949953600910,
          "name": "WALTZ.SLIDE FLUSH POCKET DOOR CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:01:02Z"
      },
      {
          "id": 562949953635921,
          "name": "WALTZ.SLIDE FLUSH POCKET DOOR GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:16:42Z"
      },
      {
          "id": 562949953635956,
          "name": "WALTZ.SLIDE FLUSH POCKET DOOR GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:25:22Z"
      },
      {
          "id": 562949953600907,
          "name": "WALTZ.SLIDE FLUSH SOFT BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:56Z"
      },
      {
          "id": 562949953600908,
          "name": "WALTZ.SLIDE FLUSH SOFT CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:55Z"
      },
      {
          "id": 562949953635922,
          "name": "WALTZ.SLIDE FLUSH SOFT GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:17:16Z"
      },
      {
          "id": 562949953635955,
          "name": "WALTZ.SLIDE FLUSH SOFT GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:25:15Z"
      },
      {
          "id": 562949953600917,
          "name": "WALTZ.SLIDE FLUSH SYNCRO BLACK AN WALTZ.SWING REGULAR NONE BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:54Z"
      },
      {
          "id": 562949953600918,
          "name": "WALTZ.SLIDE FLUSH SYNCRO CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:54Z"
      },
      {
          "id": 562949953635923,
          "name": "WALTZ.SLIDE FLUSH SYNCRO GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:17:27Z"
      },
      {
          "id": 562949953635954,
          "name": "WALTZ.SLIDE FLUSH SYNCRO GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:25:09Z"
      },
      {
          "id": 562949953600913,
          "name": "WALTZ.SLIDE FLUSH TELESCOPIC BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:52Z"
      },
      {
          "id": 562949953600914,
          "name": "WALTZ.SLIDE FLUSH TELESCOPIC CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:52Z"
      },
      {
          "id": 562949953635924,
          "name": "WALTZ.SLIDE FLUSH TELESCOPIC GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:17:36Z"
      },
      {
          "id": 562949953635953,
          "name": "WALTZ.SLIDE FLUSH TELESCOPIC GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:25:03Z"
      },
      {
          "id": 562949953541336,
          "name": "WALTZ.SLIDE REGULAR BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:50Z"
      },
      {
          "id": 562949953541338,
          "name": "WALTZ.SLIDE REGULAR CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:50Z"
      },
      {
          "id": 562949953634733,
          "name": "WALTZ.SLIDE REGULAR GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:49Z"
      },
      {
          "id": 562949953635952,
          "name": "WALTZ.SLIDE REGULAR GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:24:56Z"
      },
      {
          "id": 562949953600981,
          "name": "WALTZ.SLIDE REGULAR MAGLEV BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:49Z"
      },
      {
          "id": 562949953600982,
          "name": "WALTZ.SLIDE REGULAR MAGLEV CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:48Z"
      },
      {
          "id": 562949953635925,
          "name": "WALTZ.SLIDE REGULAR MAGLEV GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:17:53Z"
      },
      {
          "id": 562949953635951,
          "name": "WALTZ.SLIDE REGULAR MAGLEV GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:24:48Z"
      },
      {
          "id": 562949953600905,
          "name": "WALTZ.SLIDE REGULAR POCKET DOOR BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:46Z"
      },
      {
          "id": 562949953600906,
          "name": "WALTZ.SLIDE REGULAR POCKET DOOR CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:46Z"
      },
      {
          "id": 562949953635926,
          "name": "WALTZ.SLIDE REGULAR POCKET DOOR GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:18:05Z"
      },
      {
          "id": 562949953635950,
          "name": "WALTZ.SLIDE REGULAR POCKET DOOR GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:24:39Z"
      },
      {
          "id": 562949953600903,
          "name": "WALTZ.SLIDE REGULAR SOFT BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:45Z"
      },
      {
          "id": 562949953600904,
          "name": "WALTZ.SLIDE REGULAR SOFT CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:44Z"
      },
      {
          "id": 562949953635927,
          "name": "WALTZ.SLIDE REGULAR SOFT GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:18:11Z"
      },
      {
          "id": 562949953635949,
          "name": "WALTZ.SLIDE REGULAR SOFT GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:24:29Z"
      },
      {
          "id": 562949953600915,
          "name": "WALTZ.SLIDE REGULAR SYNCRO BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:43Z"
      },
      {
          "id": 562949953600916,
          "name": "WALTZ.SLIDE REGULAR SYNCRO CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:42Z"
      },
      {
          "id": 562949953635928,
          "name": "WALTZ.SLIDE REGULAR SYNCRO GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:18:19Z"
      },
      {
          "id": 562949953635948,
          "name": "WALTZ.SLIDE REGULAR SYNCRO GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:24:23Z"
      },
      {
          "id": 562949953600911,
          "name": "WALTZ.SLIDE REGULAR TELESCOPIC BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:40Z"
      },
      {
          "id": 562949953600912,
          "name": "WALTZ.SLIDE REGULAR TELESCOPIC CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:39Z"
      },
      {
          "id": 562949953635929,
          "name": "WALTZ.SLIDE REGULAR TELESCOPIC GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:18:27Z"
      },
      {
          "id": 562949953635947,
          "name": "WALTZ.SLIDE REGULAR TELESCOPIC GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:24:17Z"
      },
      {
          "id": 562949953541341,
          "name": "WALTZ.SWING FLUSH BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:38Z"
      },
      {
          "id": 562949953541343,
          "name": "WALTZ.SWING FLUSH CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:36Z"
      },
      {
          "id": 562949953635934,
          "name": "WALTZ.SWING FLUSH GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:19:15Z"
      },
      {
          "id": 562949953635941,
          "name": "WALTZ.SWING FLUSH GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:21:23Z"
      },
      {
          "id": 562949953600925,
          "name": "WALTZ.SWING FLUSH NONE BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:36Z"
      },
      {
          "id": 562949953600926,
          "name": "WALTZ.SWING FLUSH NONE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:35Z"
      },
      {
          "id": 562949953635935,
          "name": "WALTZ.SWING FLUSH NONE GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:19:21Z"
      },
      {
          "id": 562949953635940,
          "name": "WALTZ.SWING FLUSH NONE GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:21:16Z"
      },
      {
          "id": 562949953541340,
          "name": "WALTZ.SWING REGULAR BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:34Z"
      },
      {
          "id": 562949953541342,
          "name": "WALTZ.SWING REGULAR CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:34Z"
      },
      {
          "id": 562949953635936,
          "name": "WALTZ.SWING REGULAR GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:19:27Z"
      },
      {
          "id": 562949953635939,
          "name": "WALTZ.SWING REGULAR GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:19:52Z"
      },
      {
          "id": 562949953600923,
          "name": "WALTZ.SWING REGULAR NONE BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:31Z"
      },
      {
          "id": 562949953600924,
          "name": "WALTZ.SWING REGULAR NONE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:31Z"
      },
      {
          "id": 562949953635937,
          "name": "WALTZ.SWING REGULAR NONE GOLD AN",
          "active": true,
          "updated_at": "2023-03-24T10:19:33Z"
      },
      {
          "id": 562949953635938,
          "name": "WALTZ.SWING REGULAR NONE GREY AN",
          "active": true,
          "updated_at": "2023-03-24T10:19:45Z"
      },
      {
          "id": 562949953545644,
          "name": "WARDROBE AIR HINGE BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:30Z"
      },
      {
          "id": 562949953547437,
          "name": "WARDROBE AIR HINGE BRUSH GOLD ",
          "active": true,
          "updated_at": "2023-03-24T11:00:28Z"
      },
      {
          "id": 562949953600949,
          "name": "WARDROBE AIR HINGE NONE BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:28Z"
      },
      {
          "id": 562949953600950,
          "name": "WARDROBE AIR HINGE NONE BRUSH GOLD",
          "active": true,
          "updated_at": "2023-03-24T11:00:28Z"
      },
      {
          "id": 562949953598847,
          "name": "WARDROBE AIR HINGE WITH GRID BRUSH GOLD",
          "active": true,
          "updated_at": "2023-03-24T11:00:27Z"
      },
      {
          "id": 562949953600947,
          "name": "WARDROBE AIR HINGE WITH GRID NONE BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:26Z"
      },
      {
          "id": 562949953600948,
          "name": "WARDROBE AIR HINGE WITH GRID NONE BRUSH GOLD",
          "active": true,
          "updated_at": "2023-03-24T11:00:25Z"
      },
      {
          "id": 562949953546921,
          "name": "WARDROBE LONG HANDLE BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:25Z"
      },
      {
          "id": 562949953545645,
          "name": "WARDROBE LONG HANDLE BRUSH GOLD",
          "active": true,
          "updated_at": "2023-03-24T11:00:24Z"
      },
      {
          "id": 562949953600951,
          "name": "WARDROBE LONG HANDLE NONE BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:24Z"
      },
      {
          "id": 562949953600952,
          "name": "WARDROBE LONG HANDLE NONE BRUSH GOLD",
          "active": true,
          "updated_at": "2023-03-24T11:00:24Z"
      },
      {
          "id": 562949953559377,
          "name": "WARDROBE SLIDING BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:23Z"
      },
      {
          "id": 562949953546920,
          "name": "WARDROBE SLIDING CHAMPAGNE AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:23Z"
      },
      {
          "id": 562949953600953,
          "name": "WARDROBE SLIDING NONE BLACK AN",
          "active": true,
          "updated_at": "2023-03-24T11:00:23Z"
      },
      {
          "id": 562949953600954,
          "name": "WARDROBE SLIDING NONE BRUSH GOLD",
          "active": true,
          "updated_at": "2023-03-24T11:00:23Z"
      }
  ]


                 

    var Punches = response.Punches;
    var ProjectID = response.ProjectID;
    var SubFrame = ["Sub Frame",""]
    var SubTrack = ["Sub Track",""]
    var schedule_impact = 'yes_known';
    var cost_impact = 'yes_known';
    
  

    
    


    for(var i=0;i<Punches.length;i++)
    {
      var Solutions = Punches[i].Punches;
      var LocationID = Punches[i].LocationID;
      var ProjectName = Solutions.ProjectName;
      var Associate =  Solutions.Associate;

      var TradeName =  Solutions.System + " "+ Solutions.SubSystem + " "+ Solutions.SystemType + " " + Solutions.FrameFinish
      var trade_id
     for(var t=0; t<Trades.length; t++)
     {
      if(Trades[t].name==TradeName)
      {
        trade_id = Trades[t].id;
      }
     } 
   
     //=====Punchitem Managers/Final Approver/Assignee==================
    {
     var PunchitemManager, FinalApprover , Assignee ; 

     if(Associate ==="KALYAN RAO")
     {
      PunchitemManager = 8415196;
      FinalApprover = 8196670;
      Assignee = 8415196;
     }

     if(Associate ==="RAJENDRA BADAYA")
     {
      PunchitemManager = 8035626;
      FinalApprover = 8196670;
      Assignee = 8035626;
     }

     
     if(Associate ==="VIKAS SINGHAL")
     {
      PunchitemManager = 7878837;
      FinalApprover = 8196670;
      Assignee = 7878837;
     }

     if(Associate ==="SHASHANK SINGH")
     {
      PunchitemManager = 8035626;
      FinalApprover = 8196670;
      Assignee = 8035626;
     }

     if(Associate ==="GAURAV SINGHAL")
     {
      PunchitemManager = 8035626;
      FinalApprover = 8196670;
      Assignee = 8035626;
     }

     if(Associate ==="ANUJ JAIN")
     {
      PunchitemManager = 9027148;
      FinalApprover = 8196670;
      Assignee =  9027148;
     }


     if(Associate ==="RUCHIR")
     {
      PunchitemManager = 8383343;
      FinalApprover = 8196670;
      Assignee = 8383343;
     }
  
     if(Associate ==="VIPIN KUMAR")
     {
      PunchitemManager = 9027148;
      FinalApprover = 8196670;
      Assignee =  9027148;
     }
     
     if(Associate ==="ANKIT AGGARWAL")
     {

      PunchitemManager = 9027148;
      FinalApprover = 8196670;
      Assignee =  9027148;

     }

     if(Associate ==="RIYAZ SAYYED")
     {
      PunchitemManager = 8383343;
      FinalApprover = 8196670;
      Assignee = 8383343;
     }

     if(Associate ==="SAKINA BATISH")
     {
      PunchitemManager = 8128262;
      FinalApprover = 8196670;
      Assignee = 8128262;
     }
 
     if(Associate ==="RAHUL JAISWAL")
     {
      PunchitemManager = 8035626;
      FinalApprover = 8196670;
      Assignee = 8035626;
     }
   
     if(Associate ==="VISHAL PARIKH")
     {
      PunchitemManager = 8035626;
      FinalApprover = 8196670;
      Assignee = 8035626;
     }

    }   
    //========================================================================

    var serial
    var itemname
    var priority 
    var schedule_impact = 'yes_known';
    var cost_impact = 'yes_known';
    var schedule_impact_days
    var cost_impact_amount 
    var trade_id
    var punch_item_type_id = 562949953590876
    var glassfinish 
    var PrintName
    if(Solutions.SubOrientation)
    {
      PrintName = Solutions.SubOrientation
    }
    if(!Solutions.SubOrientation)
    {
      PrintName = Solutions.Orientation
    }
    if(Solutions.GlassVariant)
    {
      glassfinish = Solutions.GlassVariant
    }
    if(!Solutions.GlassVariant)
    {
      glassfinish = Solutions.GlassFinish
    }
    
    

    var systeminfo = Solutions.System + "/" + Solutions.SubSystem + "/"+Solutions.SystemType
    var Grid 
    if( Solutions.Grid=="YES")
    {
      Grid = 'YES'
    }
    if(Solutions.Grid!=="YES")
    {
      Grid = 'NO'
    }
    
    var DoorCloser  
    if( Solutions.DoorCloser=="YES")
    {
      DoorCloser = 'YES'
    }
    if( Solutions.DoorCloser!=="YES")
    {
      DoorCloser = 'NO'
    }

    let reference
      
      reference = Solutions.Width + "by"+ Solutions.Height
     
      var description 
      if(Solutions.GlassVariant)
      {
        description = Solutions.GlassFinish + " "+ Solutions.GlassVariant
      }
      if(!Solutions.GlassVariant)
      {
        description =  Solutions.GlassSubCategory + " "+ Solutions.GlassFinish
      }
     


      if(Number(Solutions.Height)<2400)
     {
       priority = 'low'
     }
     if(Number(Solutions.Height)>=3000)
     {
       priority = 'high'
     }
     if(Number(Solutions.Height)>=2400&&Number(Solutions.Height)<3000)
     {
       priority = 'medium'
     }
  
     //========================Project PunchType================================================================

    
     //====================================================================
      //=======================SUB FRAMES /SUBTRACKS========================
      if(Solutions.SystemType =="SOFT"||Solutions.SystemType =="SYNCRO"||Solutions.SystemType =="POCKET DOOR")
      {
        for(var k=0;k<SubTrack.length;k++)
        {

          if(SubTrack[k]=="Sub Track")
          {
            schedule_impact_days = 0;
            cost_impact_amount = 0;
            punch_item_type_id = SubtrackPunchtype
            itemname = Solutions.Serial + " SubTrack "+  Solutions.Floor + " "+ Solutions.Space;
          }
          if(SubTrack[k]!=="Sub Track")
          {
            schedule_impact_days = Solutions.SquareFeet;
            cost_impact_amount = Solutions.FinalAmount;
            punch_item_type_id = SystemPunchtype
            itemname = Solutions.Serial + " " + Solutions.Floor + " " + Solutions.Space + " " + PrintName + " "+ Solutions.FrameFinish + " "+ Solutions.Width+"by"+Solutions.Height
          }
         
            
           let temp =  {SolutionNo:Solutions.Serial,SerialNo :Solutions.Serial,LocationID : LocationID, Position : Solutions.Serial ,itemname: itemname, priority : priority,schedule_impact_days : schedule_impact_days,cost_impact_amount : cost_impact_amount,punch_item_type_id : punch_item_type_id,glassfinish:glassfinish,systeminfo:systeminfo,Grid : Grid,DoorCloser:DoorCloser,reference : reference,description : description,schedule_impact:schedule_impact,cost_impact : cost_impact,trade_id : trade_id,PunchitemManager:PunchitemManager, FinalApprover : FinalApprover, Assignee : Assignee, DueDate: Punches[0].Punches.DueDate,Floor :Solutions.Floor,Space : Solutions.Space}
  
           PunchItems.push(temp)
        }

      }

      if(Solutions.System ==="WALTZ.SWING")
      {
        for(var k=0;k<SubFrame.length;k++)
        {
          if(SubFrame[k]=="Sub Frame")
          {
            schedule_impact_days = 0;
            cost_impact_amount = 0;
            punch_item_type_id = SubframePunchtype;
            itemname = Solutions.Serial + " SubFrame "+  Solutions.Floor + " "+ Solutions.Space
          }
          if(SubFrame[k]!=="Sub Frame")
          {
            schedule_impact_days = Solutions.SquareFeet
            cost_impact_amount = Solutions.FinalAmount
            punch_item_type_id = SystemPunchtype
            itemname = Solutions.Serial + " " + Solutions.Floor + " " + Solutions.Space + " " + PrintName + " "+ Solutions.FrameFinish + " "+ Solutions.Width+"by"+Solutions.Height
          }

          let temp =  {SolutionNo:Solutions.Serial,SerialNo :Solutions.Serial,LocationID : LocationID, Position : Solutions.Serial ,itemname: itemname, priority : priority,schedule_impact_days : schedule_impact_days,cost_impact_amount : cost_impact_amount,punch_item_type_id : punch_item_type_id,glassfinish:glassfinish,systeminfo:systeminfo,Grid : Grid,DoorCloser:DoorCloser,reference : reference,description : description,schedule_impact:schedule_impact,cost_impact : cost_impact,trade_id : trade_id,PunchitemManager:PunchitemManager, FinalApprover : FinalApprover, Assignee : Assignee,DueDate: Punches[0].Punches.DueDate,Floor :Solutions.Floor,Space : Solutions.Space}
  
          PunchItems.push(temp)
        }

      }
     
      if(Solutions.SystemType!=="SOFT"&&Solutions.SystemType!=="SYNCRO"&&Solutions.SystemType !=="POCKET DOOR"&&Solutions.System!=="WALTZ.SWING")
      { 

         schedule_impact_days = Solutions.SquareFeet;
         cost_impact_amount = Solutions.FinalAmount;
         trade_id = SystemPunchtype;
         itemname = Solutions.Serial + " " + Solutions.Floor + " " + Solutions.Space + " " + PrintName + " "+ Solutions.FrameFinish + " "+ Solutions.Width+"by"+Solutions.Height
         let temp =  {SolutionNo:Solutions.Serial, SerialNo :Solutions.Serial, LocationID : LocationID, Position : Solutions.Serial ,itemname: itemname, priority : priority,schedule_impact_days : schedule_impact_days,cost_impact_amount : cost_impact_amount,punch_item_type_id : punch_item_type_id,glassfinish:glassfinish,systeminfo:systeminfo,Grid : Grid,DoorCloser:DoorCloser,reference : reference,description : description,schedule_impact:schedule_impact,cost_impact : cost_impact,trade_id : trade_id,PunchitemManager:PunchitemManager, FinalApprover : FinalApprover, Assignee : Assignee, DueDate: Punches[0].Punches.DueDate, Floor :Solutions.Floor,Space : Solutions.Space}
  
         PunchItems.push(temp)
      }


   
      //=============================================================================


    }
    
    
  var Promises = []
  let temp =  {SolutionNo: 147,SerialNo :"", LocationID : Punches[0].LocationID, Position : 147 ,itemname:Punches[0].Punches.ProjectName, priority : "high",schedule_impact_days : Punches[0].Punches.TotalSquareFeet,cost_impact_amount :Punches[0].Punches.WebappAmount ,punch_item_type_id :ProjectPunctype,glassfinish:"",systeminfo:"",Grid : Grid,DoorCloser: "",reference : "",description : "",schedule_impact:"yes_known",cost_impact : "yes_known",trade_id : "",PunchitemManager:PunchitemManager, FinalApprover : FinalApprover, Assignee : Assignee,  DueDate: Punches[0].Punches.DueDate,Floor :Solutions.Floor,Space : Solutions.Space}
 
 
  PunchItems.push(temp)



  for(var p =0 ; p <PunchItems.length; p++)
  {
    Promises.push(CreatePunchItem(AccessToken,ProjectID,PunchItems[p].LocationID,PunchItems[p],Punchtypes))
  }
    
   return Promise.all(Promises);

  })
  .then((response)=>{


    // {PunchDetails : data, Floor : Punches.Floor, Space : Punches.Space, PunchTypes : PunchTypes}
  
    var Punches = [];
   
    for(var i = 0; i<response.length;i++)
    {
      var Punch = response[i].PunchDetails
      
     

      var temp = {SerialNo :response[i].SerialNo, Floor :response[i].Floor,Space : response[i].Space, PunchID : Punch.id,PunchName : Punch.name,Position :  Punch.position,Location : Punch.location.id,PunchItemType : Punch.punch_item_type.name}
      Punches.push(temp)
    }

      var data = {PunchData : Punches,PunchItemType : response[0].PunchTypes,ProjectID : response[0].ProjectID}

 

   res.json(data)

  })




  
});


async function UpdateExistingProject(access_token,ProjectID,active,address,city,country_code,start_date,completion_date,total_value,name,office_id,phone,project_number,square_feet,time_zone,zip,project_type_id,estimated_value,estimated_start_date,estimated_completion_date,state_code,source,actual_start_date,tz_name,projected_finish_date,editdate,pipelinedate,Solutions,Discount,ProjectName,Associate,WebappAmount,TotalSquareFeet,ProPlus,Order)
  {
  
    const res = await fetch(`https://api.procore.com/rest/v1.0/projects/${ProjectID}`, {
      method: 'PATCH',
      qs: {run_configurable_validations: 'false'},
      headers: {
      Authorization: `Bearer ${access_token}`,
      'content-type': 'application/json',
      'Procore-Company-Id': 562949953442334
       },
      body: JSON.stringify({
        company_id: 562949953442334,
        project: {
          active: true,
          address: address,
          city: city,
          country_code: country_code,
          start_date: start_date,
          completion_date: start_date,
          total_value: total_value,
          name: name,
          office_id: office_id,
          phone: phone,
          project_number:project_number,
          square_feet: square_feet,
          state_code: state_code,
          time_zone: time_zone,
          tz_name: tz_name,
          zip: zip,
          project_type_id: project_type_id,
          project_template_id: 562949953740186,
          project_stage_id : 562949953430239,
          actual_start_date : actual_start_date,
          projected_finish_date : projected_finish_date,
          estimated_value: estimated_value,
          estimated_start_date: estimated_start_date,
          estimated_completion_date: estimated_completion_date,
          department_ids:[562949953438528],
          custom_field_41564: Order.CSValue,
          custom_field_59778: ProPlus,
          custom_field_35082: source,
          custom_field_40043: Order.Discount,
          custom_field_53114 : editdate,
          custom_field_68067 : pipelinedate
        }
  
      })
     
    })
  
  const data = await res.json();

  const ProjectDetails = { ProjectID : data.id,Solutions : Solutions,AccessToken : access_token, Discount : Discount, ProjectName : ProjectName,Associate : Associate, WebappAmount : WebappAmount, TotalSquareFeet : TotalSquareFeet,Order : Order}
  
  return ProjectDetails
  
}


async function ListCreateWinLocations(access_token,projectID,Order)
{

 
  const res = await fetch(`https://api.procore.com/rest/v1.0/projects/${projectID}/locations`, {
    method: 'GET',
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     }
   
  })

const data = await res.json();

var details = { Locations : data, AccessToken :access_token ,Order : Order,ProjectID : projectID}
return  details;

}

async function DeleteCreatedWinLocation(access_token,location_id,Order,ProjectID)
{

  const res = await fetch(`https://api.procore.com/rest/v1.0/projects/${ProjectID}/locations/${location_id}`, {
    method: 'DELETE',
    qs: {},
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     }
   
  })

const data = await res

var Details = {ExtraLocations : data , AccessToken : access_token ,Order : Order,ProjectID : ProjectID}

return Details

}

async function ListCreatedWinPunchIDS(access_token,Order,ProjectID)
{

 
  const res = await fetch(`https://api.procore.com/rest/v1.0/punch_items?project_id=${ProjectID}`, {
    method: 'GET',
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     }
   
  })

const data = await res.json();

var details = { PunchIDs : data, AccessToken :access_token ,Order : Order, ProjectID : ProjectID}
return  details;

}

async function DeleteCreatedWinPunch(access_token,punch_id,Order,ProjectID)
{

  const res = await fetch(`https://api.procore.com/rest/v1.0/punch_items/${punch_id}?project_id=${ProjectID}`, {
    method: 'DELETE',
    qs: {},
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     }
   
  })

const data = await res

var Details = {ExtraPunches : data , AccessToken : access_token ,Order : Order,ProjectID:ProjectID}

return Details

}

/*

app.post('/api/updatewinproject', async(req, res) => {

  var Order  = req.body
  var projectID = req.body.ProjectID;
  var Solutions = ""


  getAccessTokenForPunch(projectID,Solutions,Order)
  .then((response)=>{

    var AccessToken = response.AccessToken;
    var Order = response.Order;
    var ProjectID = response.Order.ProjectID;

    return  ListLocations(AccessToken,ProjectID,Order) 
   
  })
  .then((response)=>{

   
    //{ Locations : data, AccessToken :access_token ,Order : Order}

     let ProcoreLocationIDs = [];
     for(var i = 0;i<response.Locations.length;i++)
     {
        ProcoreLocationIDs.push(response.Locations[i].id)
     }

     let OrderLocationIDs = [];

     for(var j=0;j<response.Order.Solutions.length; j++)
     {
        if(response.Order.Solutions[j].ProcorePunchItemID.length>0)
      {
        for(k=0;k<response.Order.Solutions[j].ProcorePunchItemID.length;k++)
        {
          
          OrderLocationIDs.push(parseInt(response.Order.Solutions[j].ProcorePunchItemID[k].LocationID))
        }
      }

     }


     
     let ExtraLocations = [];

     

      for(j = 0;j< ProcoreLocationIDs.length;j++)
      {
        if(!OrderLocationIDs.includes(ProcoreLocationIDs[j]))
        {
          ExtraLocations.push(ProcoreLocationIDs[j])
        }

      }


     if(ExtraLocations.length<1)
     {
      
      var ResData = [{ExtraLocations : "False",AccessToken : response.AccessToken, Order : response.Order }]
      return ResData
     }
  
     let DeletePromises = []
       
     if(ExtraLocations.length>0)
     {
      for(var i =0;i<ExtraLocations.length;i++)
      {
        DeletePromises.push(DeleteWinLocation(response.AccessToken,ExtraLocations[i],response.Order))
      }

      return Promise.all(DeletePromises)
     }

  })
  .then((response)=>{
    var AccessToken = response[0].AccessToken;
    var Order = response[0].Order;


    return  ListPunchIDS(AccessToken,Order)
  })
  .then((response)=>{
    var Order = response.Order;
    var AccessToken = response.AccessToken;
    var Punches = response.PunchIDs;
    var ProcorePunchIDs = [];

    for(var i = 0 ;i < Punches.length; i++)
    {
      ProcorePunchIDs.push(Punches[i].id)
    }

    var OrderPunchIDs = [];

    for(var j=0;j<Order.Solutions.length; j++)
    {
       if(Order.Solutions[j].ProcorePunchItemID.length>0)
     {
       for(k=0;k<Order.Solutions[j].ProcorePunchItemID.length;k++)
       {
         
        OrderPunchIDs.push(parseInt(Order.Solutions[j].ProcorePunchItemID[k].PunchID))
        OrderPunchIDs.push(parseInt(Order.Solutions[j].ProcoreField))
       }
     }

    }


    let ExtraPunchItems = [];

     

    for(j = 0;j< ProcorePunchIDs.length;j++)
    {
      if(!OrderPunchIDs.includes(ProcorePunchIDs[j]))
      {
        ExtraPunchItems.push(ProcorePunchIDs[j])
      }

    }


    if(ExtraPunchItems.length<1)
    {
      var ResData = [{ExtraPunchitems : "False",AccessToken : AccessToken, Order : Order }]
      return ResData

    }


    var DeletePromises = [];

    if(ExtraPunchItems.length>0)
    {

      for(var i =0 ; i < ExtraPunchItems.length; i++)
      {
        DeletePromises.push(DeleteWinPunch(AccessToken,ExtraPunchItems[i],Order))
      }
      
      
      return Promise.all(DeletePromises)

    }


  })

  .then((response)=>{

    
    var AccessToken = response[0].AccessToken;
    var Order = response[0].Order;
    var ProjectID = response[0].Order.ProjectID;

    var Punches = [];
    var Punchtypes = Order.Solutions[0].ProcoreStatus
  
  
    
    for(var k=0;k<Punchtypes.length;k++)
    {
      if(Punchtypes[k].name==="System")
      {
        SystemPunchtype = Punchtypes[k].id;
      }
      if(Punchtypes[k].name==="Project")
      {
        ProjectPunctype = Punchtypes[k].id;
      }
      if(Punchtypes[k].name==="Sub Track")
      {
        SubtrackPunchtype = Punchtypes[k].id;
      }
      if(Punchtypes[k].name==="Sub Frame")
      {
        SubframePunchtype = Punchtypes[k].id;
      }
    }


    
   for(var i= 0; i<Order.Solutions.length;i++)
   {
  
    var Solutions = Order.Solutions[i];
  
  
  
    let priority 
    let schedule_impact = 'yes_known';
    let cost_impact = 'yes_known';
    let schedule_impact_days 
    let cost_impact_amount  
    var punch_item_type_id
  
    var Trades = [
      {
          "id": 562949953600955,
          "name": "WALTZ.CLOSE 2.O 135 DEGREE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:06:59Z"
      },
      {
          "id": 562949953600956,
          "name": "WALTZ.CLOSE 2.O 135 DEGREE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T07:07:15Z"
      },
      {
          "id": 562949953600957,
          "name": "WALTZ.CLOSE 2.O 135 DEGREE GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:07:24Z"
      },
      {
          "id": 562949953600958,
          "name": "WALTZ.CLOSE 2.O 135 DEGREE SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:16:36Z"
      },
      {
          "id": 562949953600931,
          "name": "WALTZ.CLOSE 2.O 180 DEGREE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:25:07Z"
      },
      {
          "id": 562949953600932,
          "name": "WALTZ.CLOSE 2.O 180 DEGREE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:25:15Z"
      },
      {
          "id": 562949953600933,
          "name": "WALTZ.CLOSE 2.O 180 DEGREE GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T06:25:23Z"
      },
      {
          "id": 562949953600934,
          "name": "WALTZ.CLOSE 2.O 180 DEGREE SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T06:25:31Z"
      },
      {
          "id": 562949953600927,
          "name": "WALTZ.CLOSE 2.O 90 DEGREE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:24:39Z"
      },
      {
          "id": 562949953600928,
          "name": "WALTZ.CLOSE 2.O 90 DEGREE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:24:45Z"
      },
      {
          "id": 562949953600929,
          "name": "WALTZ.CLOSE 2.O 90 DEGREE GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T06:24:53Z"
      },
      {
          "id": 562949953600930,
          "name": "WALTZ.CLOSE 2.O 90 DEGREE SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T06:24:59Z"
      },
      {
          "id": 562949953541348,
          "name": "WALTZ.CLOSE 2.O BLACK AN",
          "active": true,
          "updated_at": "2022-01-22T12:26:55Z"
      },
      {
          "id": 562949953541349,
          "name": "WALTZ.CLOSE 2.O CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-01-22T12:27:51Z"
      },
      {
          "id": 562949953541350,
          "name": "WALTZ.CLOSE 2.O GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-01-22T12:28:12Z"
      },
      {
          "id": 562949953541335,
          "name": "WALTZ.CLOSE 2.O SILVER PVDF",
          "active": true,
          "updated_at": "2022-01-22T12:28:40Z"
      },
      {
          "id": 562949953600939,
          "name": "WALTZ.CLOSE 2.O SLIDE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:26:08Z"
      },
      {
          "id": 562949953600940,
          "name": "WALTZ.CLOSE 2.O SLIDE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:26:14Z"
      },
      {
          "id": 562949953600941,
          "name": "WALTZ.CLOSE 2.O SLIDE GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T06:26:40Z"
      },
      {
          "id": 562949953600942,
          "name": "WALTZ.CLOSE 2.O SLIDE SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T06:26:47Z"
      },
      {
          "id": 562949953600935,
          "name": "WALTZ.CLOSE 2.O T JUNCTION BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:25:38Z"
      },
      {
          "id": 562949953600936,
          "name": "WALTZ.CLOSE 2.O T JUNCTION CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:25:46Z"
      },
      {
          "id": 562949953600937,
          "name": "WALTZ.CLOSE 2.O T JUNCTION GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T06:25:52Z"
      },
      {
          "id": 562949953600938,
          "name": "WALTZ.CLOSE 2.O T JUNCTION SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T06:25:59Z"
      },
      {
          "id": 562949953600943,
          "name": "WALTZ.CLOSE 2.O U SHAPE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:05:19Z"
      },
      {
          "id": 562949953600944,
          "name": "WALTZ.CLOSE 2.O U SHAPE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T07:05:41Z"
      },
      {
          "id": 562949953600945,
          "name": "WALTZ.CLOSE 2.O U SHAPE GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:05:48Z"
      },
      {
          "id": 562949953600946,
          "name": "WALTZ.CLOSE 2.O U SHAPE SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:05:55Z"
      },
      {
          "id": 562949953545642,
          "name": "WALTZ.CLOSE NONE BLACK PVDF",
          "active": true,
          "updated_at": "2022-02-09T09:43:48Z"
      },
      {
          "id": 562949953545643,
          "name": "WALTZ.CLOSE NONE BRONZE PVDF",
          "active": true,
          "updated_at": "2022-02-09T09:44:10Z"
      },
      {
          "id": 562949953600971,
          "name": "WALTZ.CLOSE NXT 135 DEGREE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:18:20Z"
      },
      {
          "id": 562949953600972,
          "name": "WALTZ.CLOSE NXT 135 DEGREE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T07:18:28Z"
      },
      {
          "id": 562949953600973,
          "name": "WALTZ.CLOSE NXT 135 DEGREE GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:18:35Z"
      },
      {
          "id": 562949953600974,
          "name": "WALTZ.CLOSE NXT 135 DEGREE SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:18:42Z"
      },
      {
          "id": 562949953600963,
          "name": "WALTZ.CLOSE NXT 180 DEGREE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:17:24Z"
      },
      {
          "id": 562949953600964,
          "name": "WALTZ.CLOSE NXT 180 DEGREE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T07:17:31Z"
      },
      {
          "id": 562949953600965,
          "name": "WALTZ.CLOSE NXT 180 DEGREE GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:17:36Z"
      },
      {
          "id": 562949953600966,
          "name": "WALTZ.CLOSE NXT 180 DEGREE SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:17:42Z"
      },
      {
          "id": 562949953600959,
          "name": "WALTZ.CLOSE NXT 90 DEGREE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:16:46Z"
      },
      {
          "id": 562949953600960,
          "name": "WALTZ.CLOSE NXT 90 DEGREE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T07:16:59Z"
      },
      {
          "id": 562949953600961,
          "name": "WALTZ.CLOSE NXT 90 DEGREE GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:17:10Z"
      },
      {
          "id": 562949953600962,
          "name": "WALTZ.CLOSE NXT 90 DEGREE SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:17:19Z"
      },
      {
          "id": 562949953541351,
          "name": "WALTZ.CLOSE NXT BLACK AN",
          "active": true,
          "updated_at": "2022-01-22T12:28:50Z"
      },
      {
          "id": 562949953541352,
          "name": "WALTZ.CLOSE NXT CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-01-22T12:29:00Z"
      },
      {
          "id": 562949953561738,
          "name": "WALTZ.CLOSE NXT GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-04-15T11:13:01Z"
      },
      {
          "id": 562949953574110,
          "name": "WALTZ.CLOSE NXT SILVER PVDF",
          "active": true,
          "updated_at": "2022-06-09T12:46:43Z"
      },
      {
          "id": 562949953600967,
          "name": "WALTZ.CLOSE NXT T JUNCTION BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:17:47Z"
      },
      {
          "id": 562949953600968,
          "name": "WALTZ.CLOSE NXT T JUNCTION CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T07:17:53Z"
      },
      {
          "id": 562949953600969,
          "name": "WALTZ.CLOSE NXT T JUNCTION GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:17:59Z"
      },
      {
          "id": 562949953600970,
          "name": "WALTZ.CLOSE NXT T JUNCTION SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:18:12Z"
      },
      {
          "id": 562949953600975,
          "name": "WALTZ.CLOSE NXT U SHAPE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:18:47Z"
      },
      {
          "id": 562949953600976,
          "name": "WALTZ.CLOSE NXT U SHAPE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T07:18:55Z"
      },
      {
          "id": 562949953600977,
          "name": "WALTZ.CLOSE NXT U SHAPE GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:19:50Z"
      },
      {
          "id": 562949953600978,
          "name": "WALTZ.CLOSE NXT U SHAPE SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:19:57Z"
      },
      {
          "id": 562949953541345,
          "name": "WALTZ.GLIDE FLUSH BLACK AN",
          "active": true,
          "updated_at": "2022-01-22T12:26:27Z"
      },
      {
          "id": 562949953541347,
          "name": "WALTZ.GLIDE FLUSH CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-01-22T12:26:46Z"
      },
      {
          "id": 562949953600921,
          "name": "WALTZ.GLIDE FLUSH NONE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:23:56Z"
      },
      {
          "id": 562949953600922,
          "name": "WALTZ.GLIDE FLUSH NONE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:24:02Z"
      },
      {
          "id": 562949953541344,
          "name": "WALTZ.GLIDE REGULAR BLACK AN",
          "active": true,
          "updated_at": "2022-01-22T12:26:18Z"
      },
      {
          "id": 562949953541346,
          "name": "WALTZ.GLIDE REGULAR CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-01-22T12:26:37Z"
      },
      {
          "id": 562949953600979,
          "name": "WALTZ.GLIDE REGULAR NXT BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:20:02Z"
      },
      {
          "id": 562949953600980,
          "name": "WALTZ.GLIDE REGULAR NXT CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T07:20:10Z"
      },
      {
          "id": 562949953600919,
          "name": "WALTZ.GLIDE REGULAR REGULAR BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:23:43Z"
      },
      {
          "id": 562949953600920,
          "name": "WALTZ.GLIDE REGULAR REGULAR CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:23:50Z"
      },
      {
          "id": 562949953541337,
          "name": "WALTZ.SLIDE FLUSH BLACK AN",
          "active": true,
          "updated_at": "2022-01-22T12:25:04Z"
      },
      {
          "id": 562949953541339,
          "name": "WALTZ.SLIDE FLUSH CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-01-22T12:25:22Z"
      },
      {
          "id": 562949953600909,
          "name": "WALTZ.SLIDE FLUSH POCKET DOOR BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:22:25Z"
      },
      {
          "id": 562949953600910,
          "name": "WALTZ.SLIDE FLUSH POCKET DOOR CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:22:30Z"
      },
      {
          "id": 562949953600907,
          "name": "WALTZ.SLIDE FLUSH SOFT BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:22:12Z"
      },
      {
          "id": 562949953600908,
          "name": "WALTZ.SLIDE FLUSH SOFT CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:22:19Z"
      },
      {
          "id": 562949953600917,
          "name": "WALTZ.SLIDE FLUSH SYNCRO BLACK AN WALTZ.SWING REGULAR NONE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:23:22Z"
      },
      {
          "id": 562949953600918,
          "name": "WALTZ.SLIDE FLUSH SYNCRO CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:23:36Z"
      },
      {
          "id": 562949953600913,
          "name": "WALTZ.SLIDE FLUSH TELESCOPIC BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:22:49Z"
      },
      {
          "id": 562949953600914,
          "name": "WALTZ.SLIDE FLUSH TELESCOPIC CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:22:55Z"
      },
      {
          "id": 562949953541336,
          "name": "WALTZ.SLIDE REGULAR BLACK AN",
          "active": true,
          "updated_at": "2022-01-22T12:24:42Z"
      },
      {
          "id": 562949953541338,
          "name": "WALTZ.SLIDE REGULAR CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-01-22T12:25:12Z"
      },
      {
          "id": 562949953600981,
          "name": "WALTZ.SLIDE REGULAR MAGLEV BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:20:18Z"
      },
      {
          "id": 562949953600982,
          "name": "WALTZ.SLIDE REGULAR MAGLEV CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T07:20:24Z"
      },
      {
          "id": 562949953600905,
          "name": "WALTZ.SLIDE REGULAR POCKET DOOR BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:21:59Z"
      },
      {
          "id": 562949953600906,
          "name": "WALTZ.SLIDE REGULAR POCKET DOOR CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:22:06Z"
      },
      {
          "id": 562949953600903,
          "name": "WALTZ.SLIDE REGULAR SOFT BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:21:25Z"
      },
      {
          "id": 562949953600904,
          "name": "WALTZ.SLIDE REGULAR SOFT CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:21:34Z"
      },
      {
          "id": 562949953600915,
          "name": "WALTZ.SLIDE REGULAR SYNCRO BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:23:02Z"
      },
      {
          "id": 562949953600916,
          "name": "WALTZ.SLIDE REGULAR SYNCRO CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:23:09Z"
      },
      {
          "id": 562949953600911,
          "name": "WALTZ.SLIDE REGULAR TELESCOPIC BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:22:36Z"
      },
      {
          "id": 562949953600912,
          "name": "WALTZ.SLIDE REGULAR TELESCOPIC CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:22:42Z"
      },
      {
          "id": 562949953541341,
          "name": "WALTZ.SWING FLUSH BLACK AN",
          "active": true,
          "updated_at": "2022-01-22T12:25:42Z"
      },
      {
          "id": 562949953541343,
          "name": "WALTZ.SWING FLUSH CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-01-22T12:26:09Z"
      },
      {
          "id": 562949953600925,
          "name": "WALTZ.SWING FLUSH NONE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:24:25Z"
      },
      {
          "id": 562949953600926,
          "name": "WALTZ.SWING FLUSH NONE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:24:32Z"
      },
      {
          "id": 562949953541340,
          "name": "WALTZ.SWING REGULAR BLACK AN",
          "active": true,
          "updated_at": "2022-01-22T12:25:34Z"
      },
      {
          "id": 562949953541342,
          "name": "WALTZ.SWING REGULAR CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-01-22T12:25:59Z"
      },
      {
          "id": 562949953600923,
          "name": "WALTZ.SWING REGULAR NONE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:24:11Z"
      },
      {
          "id": 562949953600924,
          "name": "WALTZ.SWING REGULAR NONE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:24:17Z"
      },
      {
          "id": 562949953545644,
          "name": "WARDROBE AIR HINGE BLACK AN",
          "active": true,
          "updated_at": "2022-02-09T10:55:42Z"
      },
      {
          "id": 562949953547437,
          "name": "WARDROBE AIR HINGE BRUSH GOLD ",
          "active": true,
          "updated_at": "2022-02-16T12:49:03Z"
      },
      {
          "id": 562949953600949,
          "name": "WARDROBE AIR HINGE NONE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:06:15Z"
      },
      {
          "id": 562949953600950,
          "name": "WARDROBE AIR HINGE NONE BRUSH GOLD",
          "active": true,
          "updated_at": "2022-10-11T07:06:20Z"
      },
      {
          "id": 562949953600947,
          "name": "WARDROBE AIR HINGE WITH GRID NONE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:06:02Z"
      },
      {
          "id": 562949953600948,
          "name": "WARDROBE AIR HINGE WITH GRID NONE BRUSH GOLD",
          "active": true,
          "updated_at": "2022-10-11T07:06:10Z"
      },
      {
          "id": 562949953545645,
          "name": "WARDROBE LONG HANDLE BRUSH GOLD",
          "active": true,
          "updated_at": "2022-02-09T10:56:04Z"
      },
      {
          "id": 562949953600951,
          "name": "WARDROBE LONG HANDLE NONE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:06:27Z"
      },
      {
          "id": 562949953600952,
          "name": "WARDROBE LONG HANDLE NONE BRUSH GOLD",
          "active": true,
          "updated_at": "2022-10-11T07:06:32Z"
      },
      {
          "id": 562949953559377,
          "name": "WARDROBE SLIDING BLACK AN",
          "active": true,
          "updated_at": "2022-04-06T06:17:34Z"
      },
     
      {
          "id": 562949953600953,
          "name": "WARDROBE SLIDING NONE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:06:39Z"
      },
      {
          "id": 562949953600954,
          "name": "WARDROBE SLIDING NONE BRUSH GOLD",
          "active": true,
          "updated_at": "2022-10-11T07:06:50Z"
      }
                 ]
  
  
    var TradeName =  Solutions.System + " "+ Solutions.SubSystem + " "+ Solutions.SystemType + " " + Solutions.Color
    var trade_id
    for(var t=0; t<Trades.length; t++)
    {
      if(Trades[t].name===TradeName)
        {
         trade_id = Trades[t].id;
        }
    }   
  
   
  
    var glassfinish 
      var PrintName
      if(Solutions.SubOrientation)
      {
        PrintName = Solutions.SubOrientation
      }
      if(!Solutions.SubOrientation)
      {
        PrintName = Solutions.Orientation
      }
      if(Solutions.GlassVariant)
      {
        glassfinish = Solutions.GlassVariant
      }
      if(!Solutions.GlassVariant)
      {
        glassfinish = Solutions.GlassFinish
      }
    let Grid 
    if( Solutions.Grid==="YES")
    {
      Grid = 'YES'
    }
    if(Solutions.Grid!=="YES")
    {
      Grid = 'NO'
    }
    
    let DoorCloser  
    if( Solutions.DoorCloser==="YES")
    {
      DoorCloser = 'YES'
    }
    if( Solutions.DoorCloser!=="YES")
    {
      DoorCloser = 'NO'
    }
  
    let reference
        
    reference = Solutions.Width + "by"+ Solutions.Height
   
    var description 
    if(Solutions.GlassVariant)
    {
      description = Solutions.GlassFinish + " "+ Solutions.GlassVariant
    }
    if(!Solutions.GlassVariant)
    {
      description =  Solutions.GlassSubCategory + " "+ Solutions.GlassFinish
    }
   
  
    if(Number(Solutions.Height)<2400)
    {
      priority = "low"
    }
    if(Number(Solutions.Height)>=3000)
    {
      priority = "high"
    }
    if(Number(Solutions.Height)>=2400&&Number(Solutions.Height)<3000)
    {
      priority = "medium"
    }
  
  
  
     for(var j= 0; j<Solutions.ProcorePunchItemID.length; j++)
     {  
       if(Solutions.ProcorePunchItemID[j].PunchType ==="Sub Track")
       {
      
        itemname = Solutions.ProcorePunchItemID[j].Serial + " SubTrack "+  Solutions.Floor + " "+ Solutions.Space;
        cost_impact_amount = 0;
        schedule_impact_days  = 0;
        punch_item_type_id = SubtrackPunchtype
  
       }
       if(Solutions.ProcorePunchItemID[j].PunchType ==="Sub Frame")
       {
      
        itemname = Solutions.ProcorePunchItemID[j].Serial + " SubFrame "+  Solutions.Floor + " "+ Solutions.Space;
        cost_impact_amount = 0;
        schedule_impact_days  = 0; 
        punch_item_type_id = SubframePunchtype
  
       }
  
       if(Solutions.ProcorePunchItemID[j].PunchType ==="System")
       {
    
      
        itemname = Solutions.ProcorePunchItemID[j].Serial + " " + Solutions.Floor + " " + Solutions.Space + " " + PrintName + " "+ Solutions.Color + " "+ Solutions.Width+"by"+Solutions.Height
        cost_impact_amount = Solutions.Amount
        schedule_impact_days  = Solutions.SquareFeet
        punch_item_type_id  = SystemPunchtype
      
  
       }
       
       let temp = {PunchID : Solutions.ProcorePunchItemID[j].PunchID, name : itemname,priority : priority,schedule_impact_days : schedule_impact_days,cost_impact_amount : cost_impact_amount,punch_item_type_id : punch_item_type_id,glassfinish:glassfinish,Grid : Grid,DoorCloser:DoorCloser,reference : reference,description : description,schedule_impact:schedule_impact,cost_impact : cost_impact,trade_id : trade_id}
       Punches.push(temp)
  
     }
  
  
    }


    
  
  var PunchPromises = []
  
    for(var i=0;i<Punches.length;i++)
    {
     PunchPromises.push(UpdatePunchItem(AccessToken,Punches[i].PunchID,ProjectID,Punches[i],Order));
    }
 
   return Promise.all(PunchPromises)
    
  })
  .then((response)=>{

    
    var AccessToken = response[0].AccessToken;
    var Order = response[0].Order;
    
 
   

    var count = 0

    for(var i = 0; i<Order.Solutions.length;i++)
    {
      if(Order.Solutions[i].ProcorePunchItemID.length<1)
      {
       count = count+ 1;
      }
    }


    if(count<1)
    {
     
      var Details = [{ AccessToken : AccessToken,LocationID : "", Punches : "" , Order : Order, ProjectID : Order.ProjectID }]
    
     
      return Details
    }



   if(count>0)
   {
 
   
    var Punches = [];

    for(var i = 0; i<Order.Solutions.length;i++)
    {
     

      if(Order.Solutions[i].ProcorePunchItemID.length<1)
      {
       
       if(Number(Order.Solutions[i].Quantity)===0)
        {
         //======================FOR LOCATIONS================================
         var Sno  = i+1
       
  
        
         
         var FirstTier = Sno + " "+Order.Solutions[i].Floor+ " "+ Order.Solutions[i].Space+ " " + Order.Solutions[i].System+ " "+ Order.Solutions[i].SubSystem+ " "+ Order.Solutions[i].SystemType
 


         
         var Amount = 0
 
         var FinalAmount = Amount;
         var Due  = new Date();
         var DueDate = Due.getDate();
         var DueMonth = Due.getMonth() + 1;
         var DueYear = Due.getFullYear();
         var DueFormat =  DueYear+ "-"+ DueMonth+ "-"+ DueDate;
 
       
         let temp = {
           Serial : Sno,
           ProjectName : Order.ProjectName,
           WebappAmount : Order.FinalAmount,
           Associate : Order.Associate,
           LocationName : FirstTier,
           Serial : Sno, 
           Floor : Order.Solutions[i].Floor,
           Space : Order.Solutions[i].Space,
           System : Order.Solutions[i].System,
           SubSystem : Order.Solutions[i].SubSystem,
           SystemType :Order.Solutions[i].SystemType, 
           Orientation : Order.Solutions[i].Orientation,
           SubOrientation : Order.Solutions[i].SubOrientation,
           Width : Order.Solutions[i].Width,
           Height :Order.Solutions[i].Height,
           Quantity : Order.Solutions[i].Quantity,
           FrameFinish : Order.Solutions[i].Color, 
           GlassFinish : Order.Solutions[i].GlassFinish,
           GlassVariant :Order.Solutions[i].GlassVariant,
           Grid : Order.Solutions[i].Grid, 
           Handle : Order.Solutions[i].Handle, 
           DoorCloser : Order.Solutions[i].DoorCloser,
           DropSeal : Order.Solutions[i].DropSeal,
           Lock : Order.Solutions[i].Lock,
           SquareFeet : Order.Solutions[i].SquareFeet,
           FinalAmount : FinalAmount,
           DueDate : DueFormat,
           TotalSquareFeet : 0
         }
     
         //=============================================================================
         Punches.push(temp)
 
        }
        

        if(Number(Order.Solutions[i].Quantity)!==0) {
           for(var j= 0; j<Number(Order.Solutions[i].Quantity); j++)
           {
            //======================FOR LOCATIONS================================
            var Sno
            if(Number(Order.Solutions[i].Quantity)<2)
            {
             Sno = i+1
            }
     
            if(Number(Order.Solutions[i].Quantity)>1)
            {
             Sno = (i+1)+ "."+ (j+1)
            }
     
           
            
            var FirstTier = Sno + " "+Order.Solutions[i].Floor+ " "+ Order.Solutions[i].Space+ " " + Order.Solutions[i].System+ " "+ Order.Solutions[i].SubSystem+ " "+ Order.Solutions[i].SystemType
    


            
            var Amount = Number(Order.Solutions[i].Amount)/Number(Order.Solutions[i].Quantity)
    
            var FinalAmount = Amount;
            var Due  = new Date();
            var DueDate = Due.getDate();
            var DueMonth = Due.getMonth() + 1;
            var DueYear = Due.getFullYear();
            var DueFormat =  DueYear+ "-"+ DueMonth+ "-"+ DueDate;
    
          
            let temp = {
              Serial : Sno,
              ProjectName : Order.ProjectName,
              WebappAmount : Order.FinalAmount,
              Associate : Order.Associate,
              LocationName : FirstTier,
              Serial : Sno, 
              Floor : Order.Solutions[i].Floor,
              Space : Order.Solutions[i].Space,
              System : Order.Solutions[i].System,
              SubSystem : Order.Solutions[i].SubSystem,
              SystemType :Order.Solutions[i].SystemType, 
              Orientation : Order.Solutions[i].Orientation,
              SubOrientation : Order.Solutions[i].SubOrientation,
              Width : Order.Solutions[i].Width,
              Height :Order.Solutions[i].Height,
              Quantity : Order.Solutions[i].Quantity,
              FrameFinish : Order.Solutions[i].Color, 
              GlassFinish : Order.Solutions[i].GlassFinish,
              GlassVariant :Order.Solutions[i].GlassVariant,
              Grid : Order.Solutions[i].Grid, 
              Handle : Order.Solutions[i].Handle, 
              DoorCloser : Order.Solutions[i].DoorCloser,
              DropSeal : Order.Solutions[i].DropSeal,
              Lock : Order.Solutions[i].Lock,
              SquareFeet : Order.Solutions[i].SquareFeet,
              FinalAmount : FinalAmount,
              DueDate : DueFormat,
              TotalSquareFeet : Order.TotalSquareFeet
            }
        
            //=============================================================================
            Punches.push(temp)
    
           }
      
          }
      //==========================Making Locations=============================================
       


      }
    }

    var TestPromises = []

   
    for(var i = 0; i<Punches.length; i++ )
    {
     TestPromises.push(CreateWinProjectLocation(AccessToken,Order.ProjectID,Punches[i],Order))           
    }
 
    return Promise.all(TestPromises)



   }
     






  })  
  .then((response)=>{

   
    var AccessToken = response[0].AccessToken;
    var Order = response[0].Order
 
    var count = 0;
   
    for(var i = 0; i<response.length; i++)
    {
      if(response[i].LocationID==="")
      {
        count = count + 1;
      }

    }
     
    if(count>0)
    {
      
      var details = [{PunchDetails : "",SerialNo: "", Floor : "", Space : "", PunchTypes : "",ProjectID : "",Order: Order,LocationID : "",AccessToken : AccessToken}]

      return details
    } 




    if(count===0){

    var PunchItems = [];
   
    for(var i = 0; i<response.length; i++)
    {
      
       {

       
        
        var Punchtypes = Order.Solutions[0].ProcoreStatus;
        var ProjectPunctype,SystemPunchtype,SubtrackPunchtype,SubframePunchtype
    
        for(var k=0;k<Punchtypes.length;k++)
        {
          if(Punchtypes[k].name==="System")
          {
            SystemPunchtype = Punchtypes[k].id;
          }
          if(Punchtypes[k].name==="Project")
          {
            ProjectPunctype = Punchtypes[k].id;
          }
          if(Punchtypes[k].name==="Sub Track")
          {
            SubtrackPunchtype = Punchtypes[k].id;
          }
          if(Punchtypes[k].name==="Sub Frame")
          {
            SubframePunchtype = Punchtypes[k].id;
          }
        }
    

    
        var Trades = [
          {
              "id": 562949953600955,
              "name": "WALTZ.CLOSE 2.O 135 DEGREE BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T07:06:59Z"
          },
          {
              "id": 562949953600956,
              "name": "WALTZ.CLOSE 2.O 135 DEGREE CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T07:07:15Z"
          },
          {
              "id": 562949953600957,
              "name": "WALTZ.CLOSE 2.O 135 DEGREE GOLDEN PVDF",
              "active": true,
              "updated_at": "2022-10-11T07:07:24Z"
          },
          {
              "id": 562949953600958,
              "name": "WALTZ.CLOSE 2.O 135 DEGREE SILVER PVDF",
              "active": true,
              "updated_at": "2022-10-11T07:16:36Z"
          },
          {
              "id": 562949953600931,
              "name": "WALTZ.CLOSE 2.O 180 DEGREE BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T06:25:07Z"
          },
          {
              "id": 562949953600932,
              "name": "WALTZ.CLOSE 2.O 180 DEGREE CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T06:25:15Z"
          },
          {
              "id": 562949953600933,
              "name": "WALTZ.CLOSE 2.O 180 DEGREE GOLDEN PVDF",
              "active": true,
              "updated_at": "2022-10-11T06:25:23Z"
          },
          {
              "id": 562949953600934,
              "name": "WALTZ.CLOSE 2.O 180 DEGREE SILVER PVDF",
              "active": true,
              "updated_at": "2022-10-11T06:25:31Z"
          },
          {
              "id": 562949953600927,
              "name": "WALTZ.CLOSE 2.O 90 DEGREE BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T06:24:39Z"
          },
          {
              "id": 562949953600928,
              "name": "WALTZ.CLOSE 2.O 90 DEGREE CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T06:24:45Z"
          },
          {
              "id": 562949953600929,
              "name": "WALTZ.CLOSE 2.O 90 DEGREE GOLDEN PVDF",
              "active": true,
              "updated_at": "2022-10-11T06:24:53Z"
          },
          {
              "id": 562949953600930,
              "name": "WALTZ.CLOSE 2.O 90 DEGREE SILVER PVDF",
              "active": true,
              "updated_at": "2022-10-11T06:24:59Z"
          },
          {
              "id": 562949953541348,
              "name": "WALTZ.CLOSE 2.O BLACK AN",
              "active": true,
              "updated_at": "2022-01-22T12:26:55Z"
          },
          {
              "id": 562949953541349,
              "name": "WALTZ.CLOSE 2.O CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-01-22T12:27:51Z"
          },
          {
              "id": 562949953541350,
              "name": "WALTZ.CLOSE 2.O GOLDEN PVDF",
              "active": true,
              "updated_at": "2022-01-22T12:28:12Z"
          },
          {
              "id": 562949953541335,
              "name": "WALTZ.CLOSE 2.O SILVER PVDF",
              "active": true,
              "updated_at": "2022-01-22T12:28:40Z"
          },
          {
              "id": 562949953600939,
              "name": "WALTZ.CLOSE 2.O SLIDE BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T06:26:08Z"
          },
          {
              "id": 562949953600940,
              "name": "WALTZ.CLOSE 2.O SLIDE CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T06:26:14Z"
          },
          {
              "id": 562949953600941,
              "name": "WALTZ.CLOSE 2.O SLIDE GOLDEN PVDF",
              "active": true,
              "updated_at": "2022-10-11T06:26:40Z"
          },
          {
              "id": 562949953600942,
              "name": "WALTZ.CLOSE 2.O SLIDE SILVER PVDF",
              "active": true,
              "updated_at": "2022-10-11T06:26:47Z"
          },
          {
              "id": 562949953600935,
              "name": "WALTZ.CLOSE 2.O T JUNCTION BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T06:25:38Z"
          },
          {
              "id": 562949953600936,
              "name": "WALTZ.CLOSE 2.O T JUNCTION CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T06:25:46Z"
          },
          {
              "id": 562949953600937,
              "name": "WALTZ.CLOSE 2.O T JUNCTION GOLDEN PVDF",
              "active": true,
              "updated_at": "2022-10-11T06:25:52Z"
          },
          {
              "id": 562949953600938,
              "name": "WALTZ.CLOSE 2.O T JUNCTION SILVER PVDF",
              "active": true,
              "updated_at": "2022-10-11T06:25:59Z"
          },
          {
              "id": 562949953600943,
              "name": "WALTZ.CLOSE 2.O U SHAPE BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T07:05:19Z"
          },
          {
              "id": 562949953600944,
              "name": "WALTZ.CLOSE 2.O U SHAPE CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T07:05:41Z"
          },
          {
              "id": 562949953600945,
              "name": "WALTZ.CLOSE 2.O U SHAPE GOLDEN PVDF",
              "active": true,
              "updated_at": "2022-10-11T07:05:48Z"
          },
          {
              "id": 562949953600946,
              "name": "WALTZ.CLOSE 2.O U SHAPE SILVER PVDF",
              "active": true,
              "updated_at": "2022-10-11T07:05:55Z"
          },
          {
              "id": 562949953545642,
              "name": "WALTZ.CLOSE NONE BLACK PVDF",
              "active": true,
              "updated_at": "2022-02-09T09:43:48Z"
          },
          {
              "id": 562949953545643,
              "name": "WALTZ.CLOSE NONE BRONZE PVDF",
              "active": true,
              "updated_at": "2022-02-09T09:44:10Z"
          },
          {
              "id": 562949953600971,
              "name": "WALTZ.CLOSE NXT 135 DEGREE BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T07:18:20Z"
          },
          {
              "id": 562949953600972,
              "name": "WALTZ.CLOSE NXT 135 DEGREE CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T07:18:28Z"
          },
          {
              "id": 562949953600973,
              "name": "WALTZ.CLOSE NXT 135 DEGREE GOLDEN PVDF",
              "active": true,
              "updated_at": "2022-10-11T07:18:35Z"
          },
          {
              "id": 562949953600974,
              "name": "WALTZ.CLOSE NXT 135 DEGREE SILVER PVDF",
              "active": true,
              "updated_at": "2022-10-11T07:18:42Z"
          },
          {
              "id": 562949953600963,
              "name": "WALTZ.CLOSE NXT 180 DEGREE BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T07:17:24Z"
          },
          {
              "id": 562949953600964,
              "name": "WALTZ.CLOSE NXT 180 DEGREE CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T07:17:31Z"
          },
          {
              "id": 562949953600965,
              "name": "WALTZ.CLOSE NXT 180 DEGREE GOLDEN PVDF",
              "active": true,
              "updated_at": "2022-10-11T07:17:36Z"
          },
          {
              "id": 562949953600966,
              "name": "WALTZ.CLOSE NXT 180 DEGREE SILVER PVDF",
              "active": true,
              "updated_at": "2022-10-11T07:17:42Z"
          },
          {
              "id": 562949953600959,
              "name": "WALTZ.CLOSE NXT 90 DEGREE BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T07:16:46Z"
          },
          {
              "id": 562949953600960,
              "name": "WALTZ.CLOSE NXT 90 DEGREE CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T07:16:59Z"
          },
          {
              "id": 562949953600961,
              "name": "WALTZ.CLOSE NXT 90 DEGREE GOLDEN PVDF",
              "active": true,
              "updated_at": "2022-10-11T07:17:10Z"
          },
          {
              "id": 562949953600962,
              "name": "WALTZ.CLOSE NXT 90 DEGREE SILVER PVDF",
              "active": true,
              "updated_at": "2022-10-11T07:17:19Z"
          },
          {
              "id": 562949953541351,
              "name": "WALTZ.CLOSE NXT BLACK AN",
              "active": true,
              "updated_at": "2022-01-22T12:28:50Z"
          },
          {
              "id": 562949953541352,
              "name": "WALTZ.CLOSE NXT CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-01-22T12:29:00Z"
          },
          {
              "id": 562949953561738,
              "name": "WALTZ.CLOSE NXT GOLDEN PVDF",
              "active": true,
              "updated_at": "2022-04-15T11:13:01Z"
          },
          {
              "id": 562949953574110,
              "name": "WALTZ.CLOSE NXT SILVER PVDF",
              "active": true,
              "updated_at": "2022-06-09T12:46:43Z"
          },
          {
              "id": 562949953600967,
              "name": "WALTZ.CLOSE NXT T JUNCTION BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T07:17:47Z"
          },
          {
              "id": 562949953600968,
              "name": "WALTZ.CLOSE NXT T JUNCTION CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T07:17:53Z"
          },
          {
              "id": 562949953600969,
              "name": "WALTZ.CLOSE NXT T JUNCTION GOLDEN PVDF",
              "active": true,
              "updated_at": "2022-10-11T07:17:59Z"
          },
          {
              "id": 562949953600970,
              "name": "WALTZ.CLOSE NXT T JUNCTION SILVER PVDF",
              "active": true,
              "updated_at": "2022-10-11T07:18:12Z"
          },
          {
              "id": 562949953600975,
              "name": "WALTZ.CLOSE NXT U SHAPE BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T07:18:47Z"
          },
          {
              "id": 562949953600976,
              "name": "WALTZ.CLOSE NXT U SHAPE CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T07:18:55Z"
          },
          {
              "id": 562949953600977,
              "name": "WALTZ.CLOSE NXT U SHAPE GOLDEN PVDF",
              "active": true,
              "updated_at": "2022-10-11T07:19:50Z"
          },
          {
              "id": 562949953600978,
              "name": "WALTZ.CLOSE NXT U SHAPE SILVER PVDF",
              "active": true,
              "updated_at": "2022-10-11T07:19:57Z"
          },
          {
              "id": 562949953541345,
              "name": "WALTZ.GLIDE FLUSH BLACK AN",
              "active": true,
              "updated_at": "2022-01-22T12:26:27Z"
          },
          {
              "id": 562949953541347,
              "name": "WALTZ.GLIDE FLUSH CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-01-22T12:26:46Z"
          },
          {
              "id": 562949953600921,
              "name": "WALTZ.GLIDE FLUSH NONE BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T06:23:56Z"
          },
          {
              "id": 562949953600922,
              "name": "WALTZ.GLIDE FLUSH NONE CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T06:24:02Z"
          },
          {
              "id": 562949953541344,
              "name": "WALTZ.GLIDE REGULAR BLACK AN",
              "active": true,
              "updated_at": "2022-01-22T12:26:18Z"
          },
          {
              "id": 562949953541346,
              "name": "WALTZ.GLIDE REGULAR CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-01-22T12:26:37Z"
          },
          {
              "id": 562949953600979,
              "name": "WALTZ.GLIDE REGULAR NXT BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T07:20:02Z"
          },
          {
              "id": 562949953600980,
              "name": "WALTZ.GLIDE REGULAR NXT CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T07:20:10Z"
          },
          {
              "id": 562949953600919,
              "name": "WALTZ.GLIDE REGULAR REGULAR BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T06:23:43Z"
          },
          {
              "id": 562949953600920,
              "name": "WALTZ.GLIDE REGULAR REGULAR CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T06:23:50Z"
          },
          {
              "id": 562949953541337,
              "name": "WALTZ.SLIDE FLUSH BLACK AN",
              "active": true,
              "updated_at": "2022-01-22T12:25:04Z"
          },
          {
              "id": 562949953541339,
              "name": "WALTZ.SLIDE FLUSH CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-01-22T12:25:22Z"
          },
          {
              "id": 562949953600909,
              "name": "WALTZ.SLIDE FLUSH POCKET DOOR BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T06:22:25Z"
          },
          {
              "id": 562949953600910,
              "name": "WALTZ.SLIDE FLUSH POCKET DOOR CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T06:22:30Z"
          },
          {
              "id": 562949953600907,
              "name": "WALTZ.SLIDE FLUSH SOFT BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T06:22:12Z"
          },
          {
              "id": 562949953600908,
              "name": "WALTZ.SLIDE FLUSH SOFT CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T06:22:19Z"
          },
          {
              "id": 562949953600917,
              "name": "WALTZ.SLIDE FLUSH SYNCRO BLACK AN WALTZ.SWING REGULAR NONE BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T06:23:22Z"
          },
          {
              "id": 562949953600918,
              "name": "WALTZ.SLIDE FLUSH SYNCRO CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T06:23:36Z"
          },
          {
              "id": 562949953600913,
              "name": "WALTZ.SLIDE FLUSH TELESCOPIC BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T06:22:49Z"
          },
          {
              "id": 562949953600914,
              "name": "WALTZ.SLIDE FLUSH TELESCOPIC CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T06:22:55Z"
          },
          {
              "id": 562949953541336,
              "name": "WALTZ.SLIDE REGULAR BLACK AN",
              "active": true,
              "updated_at": "2022-01-22T12:24:42Z"
          },
          {
              "id": 562949953541338,
              "name": "WALTZ.SLIDE REGULAR CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-01-22T12:25:12Z"
          },
          {
              "id": 562949953600981,
              "name": "WALTZ.SLIDE REGULAR MAGLEV BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T07:20:18Z"
          },
          {
              "id": 562949953600982,
              "name": "WALTZ.SLIDE REGULAR MAGLEV CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T07:20:24Z"
          },
          {
              "id": 562949953600905,
              "name": "WALTZ.SLIDE REGULAR POCKET DOOR BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T06:21:59Z"
          },
          {
              "id": 562949953600906,
              "name": "WALTZ.SLIDE REGULAR POCKET DOOR CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T06:22:06Z"
          },
          {
              "id": 562949953600903,
              "name": "WALTZ.SLIDE REGULAR SOFT BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T06:21:25Z"
          },
          {
              "id": 562949953600904,
              "name": "WALTZ.SLIDE REGULAR SOFT CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T06:21:34Z"
          },
          {
              "id": 562949953600915,
              "name": "WALTZ.SLIDE REGULAR SYNCRO BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T06:23:02Z"
          },
          {
              "id": 562949953600916,
              "name": "WALTZ.SLIDE REGULAR SYNCRO CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T06:23:09Z"
          },
          {
              "id": 562949953600911,
              "name": "WALTZ.SLIDE REGULAR TELESCOPIC BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T06:22:36Z"
          },
          {
              "id": 562949953600912,
              "name": "WALTZ.SLIDE REGULAR TELESCOPIC CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T06:22:42Z"
          },
          {
              "id": 562949953541341,
              "name": "WALTZ.SWING FLUSH BLACK AN",
              "active": true,
              "updated_at": "2022-01-22T12:25:42Z"
          },
          {
              "id": 562949953541343,
              "name": "WALTZ.SWING FLUSH CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-01-22T12:26:09Z"
          },
          {
              "id": 562949953600925,
              "name": "WALTZ.SWING FLUSH NONE BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T06:24:25Z"
          },
          {
              "id": 562949953600926,
              "name": "WALTZ.SWING FLUSH NONE CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T06:24:32Z"
          },
          {
              "id": 562949953541340,
              "name": "WALTZ.SWING REGULAR BLACK AN",
              "active": true,
              "updated_at": "2022-01-22T12:25:34Z"
          },
          {
              "id": 562949953541342,
              "name": "WALTZ.SWING REGULAR CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-01-22T12:25:59Z"
          },
          {
              "id": 562949953600923,
              "name": "WALTZ.SWING REGULAR NONE BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T06:24:11Z"
          },
          {
              "id": 562949953600924,
              "name": "WALTZ.SWING REGULAR NONE CHAMPAGNE AN",
              "active": true,
              "updated_at": "2022-10-11T06:24:17Z"
          },
          {
              "id": 562949953545644,
              "name": "WARDROBE AIR HINGE BLACK AN",
              "active": true,
              "updated_at": "2022-02-09T10:55:42Z"
          },
          {
              "id": 562949953547437,
              "name": "WARDROBE AIR HINGE BRUSH GOLD ",
              "active": true,
              "updated_at": "2022-02-16T12:49:03Z"
          },
          {
              "id": 562949953600949,
              "name": "WARDROBE AIR HINGE NONE BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T07:06:15Z"
          },
          {
              "id": 562949953600950,
              "name": "WARDROBE AIR HINGE NONE BRUSH GOLD",
              "active": true,
              "updated_at": "2022-10-11T07:06:20Z"
          },
          {
              "id": 562949953600947,
              "name": "WARDROBE AIR HINGE WITH GRID NONE BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T07:06:02Z"
          },
          {
              "id": 562949953600948,
              "name": "WARDROBE AIR HINGE WITH GRID NONE BRUSH GOLD",
              "active": true,
              "updated_at": "2022-10-11T07:06:10Z"
          },
          {
              "id": 562949953545645,
              "name": "WARDROBE LONG HANDLE BRUSH GOLD",
              "active": true,
              "updated_at": "2022-02-09T10:56:04Z"
          },
          {
              "id": 562949953600951,
              "name": "WARDROBE LONG HANDLE NONE BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T07:06:27Z"
          },
          {
              "id": 562949953600952,
              "name": "WARDROBE LONG HANDLE NONE BRUSH GOLD",
              "active": true,
              "updated_at": "2022-10-11T07:06:32Z"
          },
          {
              "id": 562949953559377,
              "name": "WARDROBE SLIDING BLACK AN",
              "active": true,
              "updated_at": "2022-04-06T06:17:34Z"
          },
         
          {
              "id": 562949953600953,
              "name": "WARDROBE SLIDING NONE BLACK AN",
              "active": true,
              "updated_at": "2022-10-11T07:06:39Z"
          },
          {
              "id": 562949953600954,
              "name": "WARDROBE SLIDING NONE BRUSH GOLD",
              "active": true,
              "updated_at": "2022-10-11T07:06:50Z"
          }
                     ]
    
    
                     
    
      //  var Punches = response.Punches;
        var ProjectID = Order.ProjectID;
        var SubFrame = ["Sub Frame",""]
        var SubTrack = ["Sub Track",""]
        var schedule_impact = 'yes_known';
        var cost_impact = 'yes_known';
        
      
    
          var Solutions = response[i].Punches;

          
          var LocationID = response[i].LocationID;
          var ProjectName = Order.ProjectName;
          var Associate =  Solutions.Associate;
    
          var TradeName =  Solutions.System + " "+ Solutions.SubSystem + " "+ Solutions.SystemType + " " + Solutions.FrameFinish
          var trade_id
         for(var t=0; t<Trades.length; t++)
         {
          if(Trades[t].name===TradeName)
          {
            trade_id = Trades[t].id;
          }
         } 
       
         //=====Punchitem Managers/Final Approver/Assignee==================
        {
         var PunchitemManager, FinalApprover , Assignee ; 
    
         if(Associate ==="KALYAN RAO")
         {
          PunchitemManager = 8415196;
          FinalApprover =  8196670;
          Assignee = 8415196;
         }
    
         if(Associate ==="RAJENDRA BADAYA")
         {
          PunchitemManager = 8035626;
          FinalApprover =   8196670;
          Assignee = 8035626;
         }
    
         
         if(Associate ==="VIKAS SINGHAL")
         {
          PunchitemManager = 7878837;
          FinalApprover =   8196670;
          Assignee = 7878837;
         }
    
         if(Associate ==="SHASHANK SINGH")
         {
          PunchitemManager = 8035626;
          FinalApprover =   8196670;
          Assignee = 8035626;
         }
    
         if(Associate ==="GAURAV SINGHAL")
         {
          PunchitemManager = 8035626;
          FinalApprover =   8196670;
          Assignee = 8035626;
         }
    
         if(Associate ==="ANUJ JAIN")
         {
          PunchitemManager =  9027148;
          FinalApprover =   8196670;
          Assignee =  9027148;
         }
      
         if(Associate ==="VIPIN KUMAR")
         {
          PunchitemManager =  9027148;
          FinalApprover =   8196670;
          Assignee =  9027148;
         }
         
         if(Associate ==="ANKIT AGGARWAL")
         {
          PunchitemManager = 9027148;
          FinalApprover =   8196670;
          Assignee =  9027148;
         }
    
         if(Associate ==="RIYAZ SAYYED")
         {
          PunchitemManager = 8383343;
          FinalApprover =   8196670;
          Assignee = 8383343;
         }
    
         if(Associate ==="SAKINA BATISH")
         {
          PunchitemManager = 8128262;
          FinalApprover =   8196670;
          Assignee = 8128262;
         }
     
         if(Associate ==="RAHUL JAISWAL")
         {
          PunchitemManager = 8035626;
          FinalApprover =   8196670;
          Assignee = 8035626;
         }
       
         if(Associate ==="VISHAL PARIKH")
         {
          PunchitemManager = 8035626;
          FinalApprover =   8196670;
          Assignee = 8035626;
         }
    
        }   
        //========================================================================
    
        var serial
        var itemname
        var priority 
        var schedule_impact = 'yes_known';
        var cost_impact = 'yes_known';
        var schedule_impact_days
        var cost_impact_amount 
        var trade_id
        var punch_item_type_id = 562949953590876
        var glassfinish 
        var PrintName
        if(Solutions.SubOrientation)
        {
          PrintName = Solutions.SubOrientation
        }
        if(!Solutions.SubOrientation)
        {
          PrintName = Solutions.Orientation
        }
        if(Solutions.GlassVariant)
        {
          glassfinish = Solutions.GlassVariant
        }
        if(!Solutions.GlassVariant)
        {
          glassfinish = Solutions.GlassFinish
        }
        
        
    
        var systeminfo = Solutions.System + "/" + Solutions.SubSystem + "/"+Solutions.SystemType
        var Grid 
        if( Solutions.Grid==="YES")
        {
          Grid = 'YES'
        }
        if(Solutions.Grid!=="YES")
        {
          Grid = 'NO'
        }
        
        var DoorCloser  
        if( Solutions.DoorCloser==="YES")
        {
          DoorCloser = 'YES'
        }
        if( Solutions.DoorCloser!=="YES")
        {
          DoorCloser = 'NO'
        }
    
        let reference
          
          reference = Solutions.Width + "by"+ Solutions.Height
         
          var description 
          if(Solutions.GlassVariant)
          {
            description = Solutions.GlassFinish + " "+ Solutions.GlassVariant
          }
          if(!Solutions.GlassVariant)
          {
            description =  Solutions.GlassSubCategory + " "+ Solutions.GlassFinish
          }
         
    
    
          if(Number(Solutions.Height)<2400)
         {
           priority = 'low'
         }
         if(Number(Solutions.Height)>=3000)
         {
           priority = 'high'
         }
         if(Number(Solutions.Height)>=2400&&Number(Solutions.Height)<3000)
         {
           priority = 'medium'
         }
      
         //========================Project PunchType================================================================
    
        
         //====================================================================
          //=======================SUB FRAMES /SUBTRACKS========================
          if(Solutions.SystemType ==="SOFT"||Solutions.SystemType ==="SYNCRO"||Solutions.SystemType ==="POCKET DOOR")
          {
            for(var k=0;k<SubTrack.length;k++)
            {
    
              if(SubTrack[k]=="Sub Track")
              {
                schedule_impact_days = 0;
                cost_impact_amount = 0;
                punch_item_type_id = SubtrackPunchtype
                itemname = Solutions.Serial + " SubTrack "+  Solutions.Floor + " "+ Solutions.Space;
              }
              if(SubTrack[k]!=="Sub Track")
              {
                schedule_impact_days = Solutions.SquareFeet;
                cost_impact_amount = Solutions.FinalAmount;
                punch_item_type_id = SystemPunchtype
                itemname = Solutions.Serial + " " + Solutions.Floor + " " + Solutions.Space + " " + PrintName + " "+ Solutions.FrameFinish + " "+ Solutions.Width+"by"+Solutions.Height
              }
             
                
               let temp =  {SolutionNo:Solutions.Serial,SerialNo :Solutions.Serial,LocationID : LocationID, Position : Solutions.Serial ,itemname: itemname, priority : priority,schedule_impact_days : schedule_impact_days,cost_impact_amount : cost_impact_amount,punch_item_type_id : punch_item_type_id,glassfinish:glassfinish,systeminfo:systeminfo,Grid : Grid,DoorCloser:DoorCloser,reference : reference,description : description,schedule_impact:schedule_impact,cost_impact : cost_impact,trade_id : trade_id,PunchitemManager:PunchitemManager, FinalApprover : FinalApprover, Assignee : Assignee, DueDate: Solutions.DueDate,Floor :Solutions.Floor,Space : Solutions.Space}
      
               PunchItems.push(temp)
            }
    
          }
    
          if(Solutions.System ==="WALTZ.SWING")
          {
            for(var k=0;k<SubFrame.length;k++)
            {
              if(SubFrame[k]=="Sub Frame")
              {
                schedule_impact_days = 0;
                cost_impact_amount = 0;
                punch_item_type_id = SubframePunchtype;
                itemname = Solutions.Serial + " SubFrame "+  Solutions.Floor + " "+ Solutions.Space
              }
              if(SubFrame[k]!=="Sub Frame")
              {
                schedule_impact_days = Solutions.SquareFeet
                cost_impact_amount = Solutions.FinalAmount
                punch_item_type_id = SystemPunchtype
                itemname = Solutions.Serial + " " + Solutions.Floor + " " + Solutions.Space + " " + PrintName + " "+ Solutions.FrameFinish + " "+ Solutions.Width+"by"+Solutions.Height
              }
    
              let temp =  {SolutionNo:Solutions.Serial,SerialNo :Solutions.Serial,LocationID : LocationID, Position : Solutions.Serial ,itemname: itemname, priority : priority,schedule_impact_days : schedule_impact_days,cost_impact_amount : cost_impact_amount,punch_item_type_id : punch_item_type_id,glassfinish:glassfinish,systeminfo:systeminfo,Grid : Grid,DoorCloser:DoorCloser,reference : reference,description : description,schedule_impact:schedule_impact,cost_impact : cost_impact,trade_id : trade_id,PunchitemManager:PunchitemManager, FinalApprover : FinalApprover, Assignee : Assignee,DueDate: Solutions.DueDate,Floor :Solutions.Floor,Space : Solutions.Space}
      
              PunchItems.push(temp)
            }
    
          }
         
          if(Solutions.SystemType!=="SOFT"&&Solutions.SystemType!=="SYNCRO"&&Solutions.SystemType !=="POCKET DOOR"&&Solutions.System!=="WALTZ.SWING")
          { 
    
             schedule_impact_days = Solutions.SquareFeet;
             cost_impact_amount = Solutions.FinalAmount;
             trade_id = SystemPunchtype;
             itemname = Solutions.Serial + " " + Solutions.Floor + " " + Solutions.Space + " " + PrintName + " "+ Solutions.FrameFinish + " "+ Solutions.Width+"by"+Solutions.Height
             let temp =  {SolutionNo:Solutions.Serial, SerialNo :Solutions.Serial, LocationID : LocationID, Position : Solutions.Serial ,itemname: itemname, priority : priority,schedule_impact_days : schedule_impact_days,cost_impact_amount : cost_impact_amount,punch_item_type_id : punch_item_type_id,glassfinish:glassfinish,systeminfo:systeminfo,Grid : Grid,DoorCloser:DoorCloser,reference : reference,description : description,schedule_impact:schedule_impact,cost_impact : cost_impact,trade_id : trade_id,PunchitemManager:PunchitemManager, FinalApprover : FinalApprover, Assignee : Assignee, DueDate: Solutions.DueDate, Floor :Solutions.Floor,Space : Solutions.Space}
      
             PunchItems.push(temp)
          }
    
    
       
          //=============================================================================
    
       



       }
    }
    

   
    //========================================
    var Promises = []
    
    for(var p =0 ; p <PunchItems.length; p++)
    {
      Promises.push(CreateWinPunchItem(AccessToken,ProjectID,PunchItems[p].LocationID,PunchItems[p],Punchtypes,Order))
    }
      
     return Promise.all(Promises);

  
    }
   
  
  })
  .then((response)=>{

    
    var count = 0
  
    for(var i = 0; i <response.length; i++)
    {
      if(response[i].PunchDetails==="")
      {
        count = count + 1
      }
    }


    if(count>0)
    {
     
      var details = {AccessToken : response[0].AccessToken, Order : response[0].Order}
      return details
    }

    if(count==0)
    {
     
     
      
      var Order = response[0].Order
      var NewOrder 

      var NewPunches = [];

      for(var k = 0 ; k<response.length;k++)
      {
           var temp = {PunchID : response[k].PunchDetails.id,Serial : response[k].SerialNo,Floor :response[k].Floor,Space :response[k].Space,PunchType : response[k].PunchDetails.punch_item_type.name, LocationID :response[k].LocationID }
           NewPunches.push(temp)
      }

      for(var i=0; i<Order.Solutions.length;i++)
      {
        var SolSno = i+ 1;
        for(var j=0; j<NewPunches.length; j++)
        {
          var PunchSno = Math.floor(Number(NewPunches[j].Serial))
          if(Order.Solutions[i].Floor===NewPunches[j].Floor&&Order.Solutions[i].Space===NewPunches[j].Space&&SolSno===PunchSno)
          {
            Order.Solutions[i].ProcorePunchItemID.push(NewPunches[j])
            Order.Solutions[i].ProcoreStatus = Order.Solutions[0].ProcoreStatus
          }

        }
       

      }


      var details = {AccessToken : response[0].AccessToken, Order : Order}
      return details
      
  
    }
    // [{PunchDetails : "",SerialNo: "", Floor : "", Space : "", PunchTypes : "",ProjectID : "",Order: Order, AccessToken : AccessToken}]
  })
  .then((response)=>{

    
    var AccessToken = response.AccessToken;
    var Order = response.Order;
    var DeletePunches = [];  

    for(var i = 0; i<Order.Solutions.length;i++)
    {
     
     if(Number(Order.Solutions[i].Quantity)==0&&Order.Solutions[i].ProcorePunchItemID.length>0)
     {
      for(var j=0;j<Order.Solutions[i].ProcorePunchItemID.length;j++)
      {
        DeletePunches.push(Order.Solutions[i].ProcorePunchItemID[j].PunchID)
      } 
     }
    }

   if(DeletePunches.length<1)
   {
    var details = [{AccessToken :AccessToken, Order : Order}]
    return details
   }
   
   console.log(DeletePunches)

   if(DeletePunches.length>0)
   {
    
    var  DeletePromises = [];


    for(var i = 0; i < DeletePunches.length; i++)
    {
      DeletePromises.push(DeleteWinPunchItem(AccessToken,Order.ProjectID,DeletePunches[i],Order))
    }

  
   return Promise.all(DeletePromises)


   }
   

  })
  .then((response)=>{
    
    var AccessToken = response[0].AccessToken;
    var Order = response[0].Order;
    var ProjectID = Order.ProjectID
    var project_number = Order.OrderNo;
    var square_feet = Order.TotalSquareFeet;
    var estimated_value = Order.FinalAmount;
    var editdate = new Date(Order.EditDate);
    var Discount = Order.Discount;
    var ProjectName = Order.ProjectName;
    var WebappAmount = Order.FinalAmount;
    var TotalSquareFeet = parseInt(Order.TotalSquareFeet);
    var CSValue = Order.CSValue;
    var pipelinedate = "";
  

    return UpdateWinProject(AccessToken,ProjectID,project_number,square_feet,estimated_value,editdate,pipelinedate,Discount,ProjectName,WebappAmount,TotalSquareFeet,CSValue,Order)

  })
  .then((response)=>{
    var ProjectID = response.ProjectID;
    var PunchID = response.Order.Solutions[0].ProcoreField;
    var Order = response.Order;
    var AccessToken = response.AccessToken;

   return UpdateProjectPunchItem(AccessToken,PunchID,ProjectID,Order)

  })
  .then((response=>{
    res.json(response.Order)
  }))



})

*/

app.post('/api/createwinpunchitem', async(req, res) => {
  
  var projectID = req.body.projectID
  var Solutions = req.body.Solution
  var Order = req.body.Order
  

  getAccessTokenForPunch(projectID,Solutions,Order)
  .then((response)=>{

    var AccessToken = response.AccessToken;
    var Solutions = response.Solutions;
    var Order = response.Order;
    var ProjectID = response.projectID;
    var Associate = Order.Associate;
    var SolutionNumber = Order.Solutions.length + 1;
   
    
    var TestPromises = []

    var Punches = [];

    
   
       for(var j= 0; j<Number(Solutions.Quantity); j++)
       {
        //======================FOR LOCATIONS================================
        var Sno
        if(Number(Solutions.Quantity)<2)
        {
         Sno = SolutionNumber;
        }
 
        if(Number(Solutions.Quantity)>1)
        {
         Sno = SolutionNumber+ "."+ (j+1)
        }
 
       
        
        var FirstTier = Sno + " "+Solutions.Floor+ " "+ Solutions.Space+ " " + Solutions.System+ " "+ Solutions.SubSystem+ " "+ Solutions.SystemType

        var Amount = Number(Solutions.Amount)/Number(Solutions.Quantity)

        var FinalAmount = Amount;
        var Due  = new Date();
        var DueDate = Due.getDate();
        var DueMonth = Due.getMonth() + 1;
        var DueYear = Due.getFullYear();
        var DueFormat =  DueYear+ "-"+ DueMonth+ "-"+ DueDate;

      
        let temp = {
          Serial : Sno,
          ProjectName : Order,
          WebappAmount : 0,
          Associate : Associate,
          LocationName : FirstTier,
          Serial : Sno, 
          Floor : Solutions.Floor,
          Space : Solutions.Space,
          System : Solutions.System,
          SubSystem : Solutions.SubSystem,
          SystemType :Solutions.SystemType, 
          Orientation : Solutions.Orientation,
          SubOrientation : Solutions.SubOrientation,
          Width : Solutions.Width,
          Height :Solutions.Height,
          Quantity : Solutions.Quantity,
          FrameFinish : Solutions.Color, 
          GlassFinish : Solutions.GlassFinish,
          GlassVariant :Solutions.GlassVariant,
          Grid : Solutions.Grid, 
          Handle : Solutions.Handle, 
          DoorCloser : Solutions.DoorCloser,
          DropSeal : Solutions.DropSeal,
          Lock : Solutions.Lock,
          SquareFeet : Solutions.SquareFeet,
          FinalAmount : FinalAmount,
          DueDate : DueFormat,
          TotalSquareFeet : ""
        }
    
        //=============================================================================
        Punches.push(temp)

       }
  
    

  //==========================Making Locations=============================================
    for(var i = 0; i<Punches.length; i++ )
    {
     
     TestPromises.push(CreateProjectLocation(AccessToken,ProjectID,Punches[i]))
   
    }
    
    return Promise.all(TestPromises)
 
  })
  .then((response)=>{ 

  

    var Punchtypes = response[0].Punches.ProjectName.Solutions[0].ProcoreStatus;

    var AccessToken = response[0].AccessToken;
    var LocationID = response[0].LocationID;

    var PunchItems = [];


    var ProjectPunctype,SystemPunchtype,SubtrackPunchtype,SubframePunchtype

    for(var k=0;k<Punchtypes.length;k++)
    {
      if(Punchtypes[k].name==="System")
      {
        SystemPunchtype = Punchtypes[k].id;
      }
      if(Punchtypes[k].name==="Project")
      {
        ProjectPunctype = Punchtypes[k].id;
      }
      if(Punchtypes[k].name==="Sub Track")
      {
        SubtrackPunchtype = Punchtypes[k].id;
      }
      if(Punchtypes[k].name==="Sub Frame")
      {
        SubframePunchtype = Punchtypes[k].id;
      }
    }


    var Trades = [
      {
          "id": 562949953600955,
          "name": "WALTZ.CLOSE 2.O 135 DEGREE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:06:59Z"
      },
      {
          "id": 562949953600956,
          "name": "WALTZ.CLOSE 2.O 135 DEGREE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T07:07:15Z"
      },
      {
          "id": 562949953600957,
          "name": "WALTZ.CLOSE 2.O 135 DEGREE GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:07:24Z"
      },
      {
          "id": 562949953600958,
          "name": "WALTZ.CLOSE 2.O 135 DEGREE SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:16:36Z"
      },
      {
          "id": 562949953600931,
          "name": "WALTZ.CLOSE 2.O 180 DEGREE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:25:07Z"
      },
      {
          "id": 562949953600932,
          "name": "WALTZ.CLOSE 2.O 180 DEGREE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:25:15Z"
      },
      {
          "id": 562949953600933,
          "name": "WALTZ.CLOSE 2.O 180 DEGREE GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T06:25:23Z"
      },
      {
          "id": 562949953600934,
          "name": "WALTZ.CLOSE 2.O 180 DEGREE SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T06:25:31Z"
      },
      {
          "id": 562949953600927,
          "name": "WALTZ.CLOSE 2.O 90 DEGREE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:24:39Z"
      },
      {
          "id": 562949953600928,
          "name": "WALTZ.CLOSE 2.O 90 DEGREE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:24:45Z"
      },
      {
          "id": 562949953600929,
          "name": "WALTZ.CLOSE 2.O 90 DEGREE GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T06:24:53Z"
      },
      {
          "id": 562949953600930,
          "name": "WALTZ.CLOSE 2.O 90 DEGREE SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T06:24:59Z"
      },
      {
          "id": 562949953541348,
          "name": "WALTZ.CLOSE 2.O BLACK AN",
          "active": true,
          "updated_at": "2022-01-22T12:26:55Z"
      },
      {
          "id": 562949953541349,
          "name": "WALTZ.CLOSE 2.O CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-01-22T12:27:51Z"
      },
      {
          "id": 562949953541350,
          "name": "WALTZ.CLOSE 2.O GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-01-22T12:28:12Z"
      },
      {
          "id": 562949953541335,
          "name": "WALTZ.CLOSE 2.O SILVER PVDF",
          "active": true,
          "updated_at": "2022-01-22T12:28:40Z"
      },
      {
          "id": 562949953600939,
          "name": "WALTZ.CLOSE 2.O SLIDE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:26:08Z"
      },
      {
          "id": 562949953600940,
          "name": "WALTZ.CLOSE 2.O SLIDE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:26:14Z"
      },
      {
          "id": 562949953600941,
          "name": "WALTZ.CLOSE 2.O SLIDE GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T06:26:40Z"
      },
      {
          "id": 562949953600942,
          "name": "WALTZ.CLOSE 2.O SLIDE SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T06:26:47Z"
      },
      {
          "id": 562949953600935,
          "name": "WALTZ.CLOSE 2.O T JUNCTION BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:25:38Z"
      },
      {
          "id": 562949953600936,
          "name": "WALTZ.CLOSE 2.O T JUNCTION CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:25:46Z"
      },
      {
          "id": 562949953600937,
          "name": "WALTZ.CLOSE 2.O T JUNCTION GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T06:25:52Z"
      },
      {
          "id": 562949953600938,
          "name": "WALTZ.CLOSE 2.O T JUNCTION SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T06:25:59Z"
      },
      {
          "id": 562949953600943,
          "name": "WALTZ.CLOSE 2.O U SHAPE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:05:19Z"
      },
      {
          "id": 562949953600944,
          "name": "WALTZ.CLOSE 2.O U SHAPE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T07:05:41Z"
      },
      {
          "id": 562949953600945,
          "name": "WALTZ.CLOSE 2.O U SHAPE GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:05:48Z"
      },
      {
          "id": 562949953600946,
          "name": "WALTZ.CLOSE 2.O U SHAPE SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:05:55Z"
      },
      {
          "id": 562949953545642,
          "name": "WALTZ.CLOSE NONE BLACK PVDF",
          "active": true,
          "updated_at": "2022-02-09T09:43:48Z"
      },
      {
          "id": 562949953545643,
          "name": "WALTZ.CLOSE NONE BRONZE PVDF",
          "active": true,
          "updated_at": "2022-02-09T09:44:10Z"
      },
      {
          "id": 562949953600971,
          "name": "WALTZ.CLOSE NXT 135 DEGREE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:18:20Z"
      },
      {
          "id": 562949953600972,
          "name": "WALTZ.CLOSE NXT 135 DEGREE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T07:18:28Z"
      },
      {
          "id": 562949953600973,
          "name": "WALTZ.CLOSE NXT 135 DEGREE GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:18:35Z"
      },
      {
          "id": 562949953600974,
          "name": "WALTZ.CLOSE NXT 135 DEGREE SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:18:42Z"
      },
      {
          "id": 562949953600963,
          "name": "WALTZ.CLOSE NXT 180 DEGREE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:17:24Z"
      },
      {
          "id": 562949953600964,
          "name": "WALTZ.CLOSE NXT 180 DEGREE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T07:17:31Z"
      },
      {
          "id": 562949953600965,
          "name": "WALTZ.CLOSE NXT 180 DEGREE GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:17:36Z"
      },
      {
          "id": 562949953600966,
          "name": "WALTZ.CLOSE NXT 180 DEGREE SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:17:42Z"
      },
      {
          "id": 562949953600959,
          "name": "WALTZ.CLOSE NXT 90 DEGREE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:16:46Z"
      },
      {
          "id": 562949953600960,
          "name": "WALTZ.CLOSE NXT 90 DEGREE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T07:16:59Z"
      },
      {
          "id": 562949953600961,
          "name": "WALTZ.CLOSE NXT 90 DEGREE GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:17:10Z"
      },
      {
          "id": 562949953600962,
          "name": "WALTZ.CLOSE NXT 90 DEGREE SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:17:19Z"
      },
      {
          "id": 562949953541351,
          "name": "WALTZ.CLOSE NXT BLACK AN",
          "active": true,
          "updated_at": "2022-01-22T12:28:50Z"
      },
      {
          "id": 562949953541352,
          "name": "WALTZ.CLOSE NXT CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-01-22T12:29:00Z"
      },
      {
          "id": 562949953561738,
          "name": "WALTZ.CLOSE NXT GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-04-15T11:13:01Z"
      },
      {
          "id": 562949953574110,
          "name": "WALTZ.CLOSE NXT SILVER PVDF",
          "active": true,
          "updated_at": "2022-06-09T12:46:43Z"
      },
      {
          "id": 562949953600967,
          "name": "WALTZ.CLOSE NXT T JUNCTION BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:17:47Z"
      },
      {
          "id": 562949953600968,
          "name": "WALTZ.CLOSE NXT T JUNCTION CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T07:17:53Z"
      },
      {
          "id": 562949953600969,
          "name": "WALTZ.CLOSE NXT T JUNCTION GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:17:59Z"
      },
      {
          "id": 562949953600970,
          "name": "WALTZ.CLOSE NXT T JUNCTION SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:18:12Z"
      },
      {
          "id": 562949953600975,
          "name": "WALTZ.CLOSE NXT U SHAPE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:18:47Z"
      },
      {
          "id": 562949953600976,
          "name": "WALTZ.CLOSE NXT U SHAPE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T07:18:55Z"
      },
      {
          "id": 562949953600977,
          "name": "WALTZ.CLOSE NXT U SHAPE GOLDEN PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:19:50Z"
      },
      {
          "id": 562949953600978,
          "name": "WALTZ.CLOSE NXT U SHAPE SILVER PVDF",
          "active": true,
          "updated_at": "2022-10-11T07:19:57Z"
      },
      {
          "id": 562949953541345,
          "name": "WALTZ.GLIDE FLUSH BLACK AN",
          "active": true,
          "updated_at": "2022-01-22T12:26:27Z"
      },
      {
          "id": 562949953541347,
          "name": "WALTZ.GLIDE FLUSH CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-01-22T12:26:46Z"
      },
      {
          "id": 562949953600921,
          "name": "WALTZ.GLIDE FLUSH NONE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:23:56Z"
      },
      {
          "id": 562949953600922,
          "name": "WALTZ.GLIDE FLUSH NONE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:24:02Z"
      },
      {
          "id": 562949953541344,
          "name": "WALTZ.GLIDE REGULAR BLACK AN",
          "active": true,
          "updated_at": "2022-01-22T12:26:18Z"
      },
      {
          "id": 562949953541346,
          "name": "WALTZ.GLIDE REGULAR CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-01-22T12:26:37Z"
      },
      {
          "id": 562949953600979,
          "name": "WALTZ.GLIDE REGULAR NXT BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:20:02Z"
      },
      {
          "id": 562949953600980,
          "name": "WALTZ.GLIDE REGULAR NXT CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T07:20:10Z"
      },
      {
          "id": 562949953600919,
          "name": "WALTZ.GLIDE REGULAR REGULAR BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:23:43Z"
      },
      {
          "id": 562949953600920,
          "name": "WALTZ.GLIDE REGULAR REGULAR CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:23:50Z"
      },
      {
          "id": 562949953541337,
          "name": "WALTZ.SLIDE FLUSH BLACK AN",
          "active": true,
          "updated_at": "2022-01-22T12:25:04Z"
      },
      {
          "id": 562949953541339,
          "name": "WALTZ.SLIDE FLUSH CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-01-22T12:25:22Z"
      },
      {
          "id": 562949953600909,
          "name": "WALTZ.SLIDE FLUSH POCKET DOOR BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:22:25Z"
      },
      {
          "id": 562949953600910,
          "name": "WALTZ.SLIDE FLUSH POCKET DOOR CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:22:30Z"
      },
      {
          "id": 562949953600907,
          "name": "WALTZ.SLIDE FLUSH SOFT BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:22:12Z"
      },
      {
          "id": 562949953600908,
          "name": "WALTZ.SLIDE FLUSH SOFT CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:22:19Z"
      },
      {
          "id": 562949953600917,
          "name": "WALTZ.SLIDE FLUSH SYNCRO BLACK AN WALTZ.SWING REGULAR NONE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:23:22Z"
      },
      {
          "id": 562949953600918,
          "name": "WALTZ.SLIDE FLUSH SYNCRO CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:23:36Z"
      },
      {
          "id": 562949953600913,
          "name": "WALTZ.SLIDE FLUSH TELESCOPIC BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:22:49Z"
      },
      {
          "id": 562949953600914,
          "name": "WALTZ.SLIDE FLUSH TELESCOPIC CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:22:55Z"
      },
      {
          "id": 562949953541336,
          "name": "WALTZ.SLIDE REGULAR BLACK AN",
          "active": true,
          "updated_at": "2022-01-22T12:24:42Z"
      },
      {
          "id": 562949953541338,
          "name": "WALTZ.SLIDE REGULAR CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-01-22T12:25:12Z"
      },
      {
          "id": 562949953600981,
          "name": "WALTZ.SLIDE REGULAR MAGLEV BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:20:18Z"
      },
      {
          "id": 562949953600982,
          "name": "WALTZ.SLIDE REGULAR MAGLEV CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T07:20:24Z"
      },
      {
          "id": 562949953600905,
          "name": "WALTZ.SLIDE REGULAR POCKET DOOR BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:21:59Z"
      },
      {
          "id": 562949953600906,
          "name": "WALTZ.SLIDE REGULAR POCKET DOOR CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:22:06Z"
      },
      {
          "id": 562949953600903,
          "name": "WALTZ.SLIDE REGULAR SOFT BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:21:25Z"
      },
      {
          "id": 562949953600904,
          "name": "WALTZ.SLIDE REGULAR SOFT CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:21:34Z"
      },
      {
          "id": 562949953600915,
          "name": "WALTZ.SLIDE REGULAR SYNCRO BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:23:02Z"
      },
      {
          "id": 562949953600916,
          "name": "WALTZ.SLIDE REGULAR SYNCRO CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:23:09Z"
      },
      {
          "id": 562949953600911,
          "name": "WALTZ.SLIDE REGULAR TELESCOPIC BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:22:36Z"
      },
      {
          "id": 562949953600912,
          "name": "WALTZ.SLIDE REGULAR TELESCOPIC CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:22:42Z"
      },
      {
          "id": 562949953541341,
          "name": "WALTZ.SWING FLUSH BLACK AN",
          "active": true,
          "updated_at": "2022-01-22T12:25:42Z"
      },
      {
          "id": 562949953541343,
          "name": "WALTZ.SWING FLUSH CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-01-22T12:26:09Z"
      },
      {
          "id": 562949953600925,
          "name": "WALTZ.SWING FLUSH NONE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:24:25Z"
      },
      {
          "id": 562949953600926,
          "name": "WALTZ.SWING FLUSH NONE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:24:32Z"
      },
      {
          "id": 562949953541340,
          "name": "WALTZ.SWING REGULAR BLACK AN",
          "active": true,
          "updated_at": "2022-01-22T12:25:34Z"
      },
      {
          "id": 562949953541342,
          "name": "WALTZ.SWING REGULAR CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-01-22T12:25:59Z"
      },
      {
          "id": 562949953600923,
          "name": "WALTZ.SWING REGULAR NONE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T06:24:11Z"
      },
      {
          "id": 562949953600924,
          "name": "WALTZ.SWING REGULAR NONE CHAMPAGNE AN",
          "active": true,
          "updated_at": "2022-10-11T06:24:17Z"
      },
      {
          "id": 562949953545644,
          "name": "WARDROBE AIR HINGE BLACK AN",
          "active": true,
          "updated_at": "2022-02-09T10:55:42Z"
      },
      {
          "id": 562949953547437,
          "name": "WARDROBE AIR HINGE BRUSH GOLD ",
          "active": true,
          "updated_at": "2022-02-16T12:49:03Z"
      },
      {
          "id": 562949953600949,
          "name": "WARDROBE AIR HINGE NONE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:06:15Z"
      },
      {
          "id": 562949953600950,
          "name": "WARDROBE AIR HINGE NONE BRUSH GOLD",
          "active": true,
          "updated_at": "2022-10-11T07:06:20Z"
      },
      {
          "id": 562949953600947,
          "name": "WARDROBE AIR HINGE WITH GRID NONE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:06:02Z"
      },
      {
          "id": 562949953600948,
          "name": "WARDROBE AIR HINGE WITH GRID NONE BRUSH GOLD",
          "active": true,
          "updated_at": "2022-10-11T07:06:10Z"
      },
      {
          "id": 562949953545645,
          "name": "WARDROBE LONG HANDLE BRUSH GOLD",
          "active": true,
          "updated_at": "2022-02-09T10:56:04Z"
      },
      {
          "id": 562949953600951,
          "name": "WARDROBE LONG HANDLE NONE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:06:27Z"
      },
      {
          "id": 562949953600952,
          "name": "WARDROBE LONG HANDLE NONE BRUSH GOLD",
          "active": true,
          "updated_at": "2022-10-11T07:06:32Z"
      },
      {
          "id": 562949953559377,
          "name": "WARDROBE SLIDING BLACK AN",
          "active": true,
          "updated_at": "2022-04-06T06:17:34Z"
      },
     
      {
          "id": 562949953600953,
          "name": "WARDROBE SLIDING NONE BLACK AN",
          "active": true,
          "updated_at": "2022-10-11T07:06:39Z"
      },
      {
          "id": 562949953600954,
          "name": "WARDROBE SLIDING NONE BRUSH GOLD",
          "active": true,
          "updated_at": "2022-10-11T07:06:50Z"
      }
                 ]


                 

    var Punches = []

    for(var i = 0; i< response.length;i++)
    {
      Punches.push(response[i].Punches)
    }

    var ProjectID = response[0].ProjectID;
    var SubFrame = ["Sub Frame",""]
    var SubTrack = ["Sub Track",""]
    var schedule_impact = 'yes_known';
    var cost_impact = 'yes_known';
    


    for(var i=0;i<Punches.length;i++)
    {

    

      var Solutions = Punches[i];
      var Associate =  Punches[i].Associate;

      var TradeName =  Solutions.System + " "+ Solutions.SubSystem + " "+ Solutions.SystemType + " " + Solutions.FrameFinish
      var trade_id
     for(var t=0; t<Trades.length; t++)
     {
      if(Trades[t].name===TradeName)
      {
        trade_id = Trades[t].id;
      }
     } 
   
     //=====Punchitem Managers/Final Approver/Assignee==================
    {
     var PunchitemManager, FinalApprover , Assignee ; 

     if(Associate ==="KALYAN RAO")
     {
      PunchitemManager = 8415196;
      FinalApprover =  8196670;
      Assignee = 8415196;
     }

     if(Associate ==="RAJENDRA BADAYA")
     {
      PunchitemManager = 8035626;
      FinalApprover =   8196670;
      Assignee = 8035626;
     }

     
     if(Associate ==="VIKAS SINGHAL")
     {
      PunchitemManager = 7878837;
      FinalApprover =   8196670;
      Assignee = 7878837;
     }

     if(Associate ==="SHASHANK SINGH")
     {
      PunchitemManager = 8035626;
      FinalApprover =   8196670;
      Assignee = 8035626;
     }

     if(Associate ==="GAURAV SINGHAL")
     {
      PunchitemManager = 8035626;
      FinalApprover =   8196670;
      Assignee = 8035626;
     }

     if(Associate ==="ANUJ JAIN")
     {
      PunchitemManager =  9027148;
      FinalApprover =   8196670;
      Assignee =  9027148;
     }
  
     if(Associate ==="VIPIN KUMAR")
     {
      PunchitemManager =  9027148;
      FinalApprover =   8196670;
      Assignee =  9027148;
     }
     
     if(Associate ==="ANKIT AGGARWAL")
     {
      PunchitemManager = 9027148;
      FinalApprover =   8196670;
      Assignee =  9027148;
     }

     if(Associate ==="RIYAZ SAYYED")
     {
      PunchitemManager = 8383343;
      FinalApprover =   8196670;
      Assignee = 8383343;
     }

     if(Associate ==="SAKINA BATISH")
     {
      PunchitemManager = 8128262;
      FinalApprover =   8196670;
      Assignee = 8128262;
     }
 
     if(Associate ==="RAHUL JAISWAL")
     {
      PunchitemManager = 8035626;
      FinalApprover =   8196670;
      Assignee = 8035626;
     }
   
     if(Associate ==="VISHAL PARIKH")
     {
      PunchitemManager = 8035626;
      FinalApprover =   8196670;
      Assignee = 8035626;
     }

    }   
    //========================================================================

    var serial
    var itemname
    var priority 
    var schedule_impact = 'yes_known';
    var cost_impact = 'yes_known';
    var schedule_impact_days
    var cost_impact_amount 
    var trade_id
    var punch_item_type_id = 562949953590876
    var glassfinish 
    var PrintName
    if(Solutions.SubOrientation)
    {
      PrintName = Solutions.SubOrientation
    }
    if(!Solutions.SubOrientation)
    {
      PrintName = Solutions.Orientation
    }
    if(Solutions.GlassVariant)
    {
      glassfinish = Solutions.GlassVariant
    }
    if(!Solutions.GlassVariant)
    {
      glassfinish = Solutions.GlassFinish
    }
    
    

    var systeminfo = Solutions.System + "/" + Solutions.SubSystem + "/"+Solutions.SystemType
    var Grid 
    if( Solutions.Grid==="YES")
    {
      Grid = 'YES'
    }
    if(Solutions.Grid!=="YES")
    {
      Grid = 'NO'
    }
    
    var DoorCloser  
    if( Solutions.DoorCloser==="YES")
    {
      DoorCloser = 'YES'
    }
    if( Solutions.DoorCloser!=="YES")
    {
      DoorCloser = 'NO'
    }

    let reference
      
      reference = Solutions.Width + "by"+ Solutions.Height
     
      var description 
      if(Solutions.GlassVariant)
      {
        description = Solutions.GlassFinish + " "+ Solutions.GlassVariant
      }
      if(!Solutions.GlassVariant)
      {
        description =  Solutions.GlassSubCategory + " "+ Solutions.GlassFinish
      }
     


      if(Number(Solutions.Height)<2400)
     {
       priority = 'low'
     }
     if(Number(Solutions.Height)>=3000)
     {
       priority = 'high'
     }
     if(Number(Solutions.Height)>=2400&&Number(Solutions.Height)<3000)
     {
       priority = 'medium'
     }
  
     //========================Project PunchType================================================================

    
     //====================================================================
      //=======================SUB FRAMES /SUBTRACKS========================
      if(Solutions.SystemType ==="SOFT"||Solutions.SystemType ==="SYNCRO"||Solutions.SystemType ==="POCKET DOOR")
      {
        for(var k=0;k<SubTrack.length;k++)
        {

          if(SubTrack[k]=="Sub Track")
          {
            schedule_impact_days = 0;
            cost_impact_amount = 0;
            punch_item_type_id = SubtrackPunchtype
            itemname = Solutions.Serial + " SubTrack "+  Solutions.Floor + " "+ Solutions.Space;
          }
          if(SubTrack[k]!=="Sub Track")
          {
            schedule_impact_days = Solutions.SquareFeet;
            cost_impact_amount = Solutions.FinalAmount;
            punch_item_type_id = SystemPunchtype
            itemname = Solutions.Serial + " " + Solutions.Floor + " " + Solutions.Space + " " + PrintName + " "+ Solutions.FrameFinish + " "+ Solutions.Width+"by"+Solutions.Height
          }
         
            
           let temp =  {SolutionNo:Solutions.Serial,SerialNo :Solutions.Serial,LocationID : LocationID, Position : Solutions.Serial ,itemname: itemname, priority : priority,schedule_impact_days : schedule_impact_days,cost_impact_amount : cost_impact_amount,punch_item_type_id : punch_item_type_id,glassfinish:glassfinish,systeminfo:systeminfo,Grid : Grid,DoorCloser:DoorCloser,reference : reference,description : description,schedule_impact:schedule_impact,cost_impact : cost_impact,trade_id : trade_id,PunchitemManager:PunchitemManager, FinalApprover : FinalApprover, Assignee : Assignee, DueDate: Solutions.DueDate,Floor :Solutions.Floor,Space : Solutions.Space}
  
           PunchItems.push(temp)
        }

      }

      if(Solutions.System ==="WALTZ.SWING")
      {
        for(var k=0;k<SubFrame.length;k++)
        {
          if(SubFrame[k]=="Sub Frame")
          {
            schedule_impact_days = 0;
            cost_impact_amount = 0;
            punch_item_type_id = SubframePunchtype;
            itemname = Solutions.Serial + " SubFrame "+  Solutions.Floor + " "+ Solutions.Space
          }
          if(SubFrame[k]!=="Sub Frame")
          {
            schedule_impact_days = Solutions.SquareFeet
            cost_impact_amount = Solutions.FinalAmount
            punch_item_type_id = SystemPunchtype
            itemname = Solutions.Serial + " " + Solutions.Floor + " " + Solutions.Space + " " + PrintName + " "+ Solutions.FrameFinish + " "+ Solutions.Width+"by"+Solutions.Height
          }

          let temp =  {SolutionNo:Solutions.Serial,SerialNo :Solutions.Serial,LocationID : LocationID, Position : Solutions.Serial ,itemname: itemname, priority : priority,schedule_impact_days : schedule_impact_days,cost_impact_amount : cost_impact_amount,punch_item_type_id : punch_item_type_id,glassfinish:glassfinish,systeminfo:systeminfo,Grid : Grid,DoorCloser:DoorCloser,reference : reference,description : description,schedule_impact:schedule_impact,cost_impact : cost_impact,trade_id : trade_id,PunchitemManager:PunchitemManager, FinalApprover : FinalApprover, Assignee : Assignee,DueDate: Solutions.DueDate,Floor :Solutions.Floor,Space : Solutions.Space}
  
          PunchItems.push(temp)
        }

      }
     
      if(Solutions.SystemType!=="SOFT"&&Solutions.SystemType!=="SYNCRO"&&Solutions.SystemType !=="POCKET DOOR")
      { 

         schedule_impact_days = Solutions.SquareFeet;
         cost_impact_amount = Solutions.FinalAmount;
         trade_id = SystemPunchtype;
         itemname = Solutions.Serial + " " + Solutions.Floor + " " + Solutions.Space + " " + PrintName + " "+ Solutions.FrameFinish + " "+ Solutions.Width+"by"+Solutions.Height
         let temp =  {SolutionNo:Solutions.Serial, SerialNo :Solutions.Serial, LocationID : LocationID, Position : Solutions.Serial ,itemname: itemname, priority : priority,schedule_impact_days : schedule_impact_days,cost_impact_amount : cost_impact_amount,punch_item_type_id : punch_item_type_id,glassfinish:glassfinish,systeminfo:systeminfo,Grid : Grid,DoorCloser:DoorCloser,reference : reference,description : description,schedule_impact:schedule_impact,cost_impact : cost_impact,trade_id : trade_id,PunchitemManager:PunchitemManager, FinalApprover : FinalApprover, Assignee : Assignee, DueDate: Solutions.DueDate, Floor :Solutions.Floor,Space : Solutions.Space}
  
         PunchItems.push(temp)
      }


   
      //=============================================================================

   








    }
    
    
  var Promises = []
  
  for(var p =0 ; p <PunchItems.length; p++)
  {
    Promises.push(CreatePunchItem(AccessToken,ProjectID,PunchItems[p].LocationID,PunchItems[p],Punchtypes))
  }
    
   return Promise.all(Promises);

  






  })
  .then((response)=>{

    // {PunchDetails : data, Floor : Punches.Floor, Space : Punches.Space, PunchTypes : PunchTypes}
  
    var Punches = [];

    
   
    for(var i = 0; i<response.length;i++)
    {
      var Punch = response[i].PunchDetails

     
     

      var temp = {SerialNo :response[i].SerialNo, Floor :response[i].Floor,Space : response[i].Space, PunchID : Punch.id,PunchName : Punch.name,Position :  Punch.position,Location : Punch.location.id,PunchItemType : Punch.punch_item_type.name}
      Punches.push(temp)
    }

   var data = {PunchData : Punches,PunchItemType : response[0].PunchTypes,ProjectID : response[0].ProjectID}

 

   res.json(data)

  })
 

});


app.post('/api/createprojectlocation', async(req, res) => {

  var projectID = req.body.ProjectID
  var Solutions = req.body.Solutions;
 

  getAccessToken()
  .then((response)=>{

  
  })

});


/*
app.post('/api/createprojectlocation', async(req, res) => {

  var projectID = req.body.ProjectID
  var Solutions = req.body.Solutions;
 
  var Tier = [];
  
  for(var i = 0; i<Solutions.length; i++ )
  {
    for(var j = 0;j<Number(Solutions[i].Quantity);j++)
    {
     var Sno
     if(Number(Solutions[i].Quantity)<2)
     {
      Sno = i+1
     }

     if(Number(Solutions[i].Quantity)>1)
     {
      Sno = (i+1)+ "."+ (j+1)
     }

    var FirstTier
     if(Solutions[i].SubOrientation)
     {
      if(!Solutions[i].GlassVariant)
      {
        FirstTier = Sno + " "+Solutions[i].Floor+ " "+ Solutions[i].Space+ " " + Solutions[i].System+ " "+ Solutions[i].SubSystem+ " "+ Solutions[i].SystemType + " "+ Solutions[i].SubOrientation + " " + Solutions[i].Color + " "+ Solutions[i].GlassFinish
      }

      if(Solutions[i].GlassVariant)
      {
        FirstTier = Sno + " "+Solutions[i].Floor+ " "+ Solutions[i].Space+ " " + Solutions[i].System+ " "+ Solutions[i].SubSystem+ " "+ Solutions[i].SystemType + " "+ Solutions[i].SubOrientation + " " + Solutions[i].Color + " "+ Solutions[i].GlassVariant
      }
     
     }

     if(!Solutions[i].SubOrientation)
     {
      if(!Solutions[i].GlassVariant)
      {
        FirstTier = Sno + " "+Solutions[i].Floor+ " "+ Solutions[i].Space+ " " + Solutions[i].System+ " "+ Solutions[i].SubSystem+ " "+ Solutions[i].SystemType + " "+ Solutions[i].Orientation + " " + Solutions[i].Color + " "+ Solutions[i].GlassFinish
      }

      if(Solutions[i].GlassVariant)
      {
        FirstTier = Sno + " "+Solutions[i].Floor+ " "+ Solutions[i].Space+ " " + Solutions[i].System+ " "+ Solutions[i].SubSystem+ " "+ Solutions[i].SystemType + " "+ Solutions[i].Orientation + " " + Solutions[i].Color + " "+ Solutions[i].GlassVariant
      }
     }
      
     var temp = [FirstTier,Sno,Solutions[i].Floor,Solutions[i].Space]
     Tier.push(temp)
    }
  }

 
  getAccessToken()
  .then((response)=>{

    var Test = []
    

    for(var i = 0; i<Tier.length; i++ )
    {
     
      CreateProjectLocation(response,projectID,Tier[i][0],)
      .then((response)=>{
       
        Test.push({id : response.id, name : response.name })
        if(Test.length===Tier.length)
        {res.json(Test)}      
      })
      
    }
  })

});
*/
app.post('/api/createpunchitem', async(req, res) => {

  var projectID = req.body.ProjectID
  var Solutions = req.body.Solutions;
  var Punches = [];

  for(var i = 0;i<Solutions.length;i++)
  {

    let serial
    let itemname
    let priority 
    let SubFrame = ["Sub Frame",""]
    let SubTrack = ["Sub Track",""]
    let schedule_impact = 'yes_known';
    let cost_impact = 'yes_known';
    let schedule_impact_days
    let cost_impact_amount 
    let trade_id
    let punch_item_type_id = 562949953590876
    let glassfinish = Solutions[i].GlassFinish;
    let description = Solutions[i].Width + "by"+ Solutions[i].Height
    let systeminfo = Solutions[i].System + "/" + Solutions[i].SubSystem + "/"+Solutions[i].SystemType
    let Grid 
    if( Solutions[i].Grid==="YES")
    {
      Grid = 'YES'
    }
    if(Solutions[i].Grid!=="YES")
    {
      Grid = 'NO'
    }
    
    let DoorCloser  
    if( Solutions[i].DoorCloser==="YES")
    {
      DoorCloser = 'YES'
    }
    if( Solutions[i].DoorCloser!=="YES")
    {
      DoorCloser = 'NO'
    }

    let reference
      if(Solutions[i].SubOrientation)
      {
      reference = Solutions[i].SubOrientation
      }
      if(!Solutions[i].SubOrientation)
      {
       reference = Solutions[i].Orientation
      }
   
     


    if(Number(Solutions[i].Height)<2400)
    {
      priority = 'low'
    }
    if(Number(Solutions[i].Height)>=3000)
    {
      priority = 'high'
    }
    if(Number(Solutions[i].Height)>=2400&&Number(Solutions[i].Height)<3000)
    {
      priority = 'medium'
    }
  


     for(var j= 0; j<Number(Solutions[i].Quantity); j++)
     {

      //=======================SERIAL NUMBER================================

      if(Number(Solutions[i].Quantity)==1&&Number(Solutions[i].Quantity)<1)
      {
        serial = i+1
      }
      if(Number(Solutions[i].Quantity)>1)
      {
        var pre = i+1
        var suf = j+1
        serial = pre.toString() + "." +suf.toString()
      }

      //====================================================================
      //=======================SUB FRAMES /SUBTRACKS========================
      if(Solutions[i].SystemType ==="SOFT"||Solutions[i].SystemType ==="SYNCRO"||Solutions[i].SystemType ==="POCKET DOOR")
      {
        for(var k=0;k<SubTrack.length;k++)
        {

          if(SubTrack[k]=="Sub Track")
          {
            schedule_impact_days = 0;
            cost_impact_amount = 0
          }
          if(SubTrack[k]!=="Sub Track")
          {
            schedule_impact_days = Solutions[i].SquareFeet
            cost_impact_amount = Solutions[i].Amount
          }

           itemname = serial + " "+ "LL" + " " +SubTrack[k] +" "+ Solutions[i].Floor + " "+ Solutions[i].Space
           let temp =  {SolutionNo: Solutions[i].SolutionNo ,LocationID : Solutions[i].ProcoreLocationID, Position : Solutions[i].SolutionNo ,itemname: itemname, priority : priority,schedule_impact_days : schedule_impact_days,cost_impact_amount : cost_impact_amount,punch_item_type_id : punch_item_type_id,glassfinish:glassfinish,systeminfo:systeminfo,Grid : Grid,DoorCloser:DoorCloser,reference : reference,description : description,schedule_impact:schedule_impact,cost_impact : cost_impact}
  
           Punches.push(temp)
        }

      }

      if(Solutions[i].System ==="WALTZ.SWING")
      {
        for(var k=0;k<SubFrame.length;k++)
        {
          if(SubFrame[k]=="Sub Frame")
          {
            schedule_impact_days = 0;
            cost_impact_amount = 0
          }
          if(SubFrame[k]!=="Sub Frame")
          {
            schedule_impact_days = Solutions[i].SquareFeet
            cost_impact_amount = Solutions[i].Amount
          }

          itemname = serial + " "+ "LL" + " " +SubFrame[k]+" "+ Solutions[i].Floor + " "+ Solutions[i].Space
          let temp =  {SolutionNo: Solutions[i].SolutionNo ,LocationID : Solutions[i].ProcoreLocationID, Position : Solutions[i].SolutionNo ,itemname: itemname, priority : priority,schedule_impact_days : schedule_impact_days,cost_impact_amount : cost_impact_amount,punch_item_type_id : punch_item_type_id,glassfinish:glassfinish,systeminfo:systeminfo,Grid : Grid,DoorCloser:DoorCloser,reference : reference,description : description,schedule_impact:schedule_impact,cost_impact : cost_impact}
           Punches.push(temp)
        }

      }
     
      if(Solutions[i].SystemType !=="SOFT"&&Solutions[i].SystemType !=="SYNCRO"&&Solutions[i].SystemType !=="POCKET DOOR")
      { 

         schedule_impact_days = Solutions[i].SquareFeet
         cost_impact_amount = Solutions[i].Amount
         itemname  = serial + " "+ "LL"+" "+ Solutions[i].Floor + " "+ Solutions[i].Space
         let temp =  {SolutionNo: Solutions[i].SolutionNo ,LocationID : Solutions[i].ProcoreLocationID, Position : Solutions[i].SolutionNo ,itemname: itemname, priority : priority,schedule_impact_days : schedule_impact_days,cost_impact_amount : cost_impact_amount,punch_item_type_id : punch_item_type_id,glassfinish:glassfinish,systeminfo:systeminfo,Grid : Grid,DoorCloser:DoorCloser,reference : reference,description : description,schedule_impact:schedule_impact,cost_impact : cost_impact}
         Punches.push(temp)
      }

      //=============================================================================

     }

  }

 

 
  getAccessToken()
  .then((response)=>{
   var PunchData = [];
  

    for(var i=0;i<Punches.length;i++)
    {
      
      CreatePunchItem(response,projectID,Punches[i].LocationID,Punches[i])
      .then((response)=>{ 

      
        PunchData.push({id : response.id, SolutionNo:response.position,ItemName : response.name, Location : response.location.id})
        if(PunchData.length===Punches.length)
        {
          {res.json(PunchData)} 
        }
       })
    }
    
  })





});


app.post('/api/deletepunchitem', async(req, res) => {

  var ProjectID = req.body.projectID
  var Punches = req.body.Punches

  getAccessToken().then((response)=>{
   
   for(var i = 0; i<Punches.length;i++)
   {
    DeletePunchItem(response,ProjectID,Punches[i].PunchID)
    .then((response)=>{
      if(i =(Punches.length +1)){
        res.json("Deleted")
      }
      
    })
   }
      
  })
 
});


app.post('/api/updatewinpunchitem', async(req, res) => {

  var projectID = req.body.projectID
  var Solutions = req.body.Solution;
  var Punches = [];

  var Punchtypes = req.body.Solution.ProcoreStatus



  
  for(var k=0;k<Punchtypes.length;k++)
  {
    if(Punchtypes[k].name==="System")
    {
      SystemPunchtype = Punchtypes[k].id;
    }
    if(Punchtypes[k].name==="Project")
    {
      ProjectPunctype = Punchtypes[k].id;
    }
    if(Punchtypes[k].name==="Sub Track")
    {
      SubtrackPunchtype = Punchtypes[k].id;
    }
    if(Punchtypes[k].name==="Sub Frame")
    {
      SubframePunchtype = Punchtypes[k].id;
    }
  }


  let priority 
  let schedule_impact = 'yes_known';
  let cost_impact = 'yes_known';
  let schedule_impact_days 
  let cost_impact_amount  
  var punch_item_type_id

  var Trades = [
    {
        "id": 562949953600955,
        "name": "WALTZ.CLOSE 2.O 135 DEGREE BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T07:06:59Z"
    },
    {
        "id": 562949953600956,
        "name": "WALTZ.CLOSE 2.O 135 DEGREE CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T07:07:15Z"
    },
    {
        "id": 562949953600957,
        "name": "WALTZ.CLOSE 2.O 135 DEGREE GOLDEN PVDF",
        "active": true,
        "updated_at": "2022-10-11T07:07:24Z"
    },
    {
        "id": 562949953600958,
        "name": "WALTZ.CLOSE 2.O 135 DEGREE SILVER PVDF",
        "active": true,
        "updated_at": "2022-10-11T07:16:36Z"
    },
    {
        "id": 562949953600931,
        "name": "WALTZ.CLOSE 2.O 180 DEGREE BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T06:25:07Z"
    },
    {
        "id": 562949953600932,
        "name": "WALTZ.CLOSE 2.O 180 DEGREE CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T06:25:15Z"
    },
    {
        "id": 562949953600933,
        "name": "WALTZ.CLOSE 2.O 180 DEGREE GOLDEN PVDF",
        "active": true,
        "updated_at": "2022-10-11T06:25:23Z"
    },
    {
        "id": 562949953600934,
        "name": "WALTZ.CLOSE 2.O 180 DEGREE SILVER PVDF",
        "active": true,
        "updated_at": "2022-10-11T06:25:31Z"
    },
    {
        "id": 562949953600927,
        "name": "WALTZ.CLOSE 2.O 90 DEGREE BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T06:24:39Z"
    },
    {
        "id": 562949953600928,
        "name": "WALTZ.CLOSE 2.O 90 DEGREE CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T06:24:45Z"
    },
    {
        "id": 562949953600929,
        "name": "WALTZ.CLOSE 2.O 90 DEGREE GOLDEN PVDF",
        "active": true,
        "updated_at": "2022-10-11T06:24:53Z"
    },
    {
        "id": 562949953600930,
        "name": "WALTZ.CLOSE 2.O 90 DEGREE SILVER PVDF",
        "active": true,
        "updated_at": "2022-10-11T06:24:59Z"
    },
    {
        "id": 562949953541348,
        "name": "WALTZ.CLOSE 2.O BLACK AN",
        "active": true,
        "updated_at": "2022-01-22T12:26:55Z"
    },
    {
        "id": 562949953541349,
        "name": "WALTZ.CLOSE 2.O CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-01-22T12:27:51Z"
    },
    {
        "id": 562949953541350,
        "name": "WALTZ.CLOSE 2.O GOLDEN PVDF",
        "active": true,
        "updated_at": "2022-01-22T12:28:12Z"
    },
    {
        "id": 562949953541335,
        "name": "WALTZ.CLOSE 2.O SILVER PVDF",
        "active": true,
        "updated_at": "2022-01-22T12:28:40Z"
    },
    {
        "id": 562949953600939,
        "name": "WALTZ.CLOSE 2.O SLIDE BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T06:26:08Z"
    },
    {
        "id": 562949953600940,
        "name": "WALTZ.CLOSE 2.O SLIDE CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T06:26:14Z"
    },
    {
        "id": 562949953600941,
        "name": "WALTZ.CLOSE 2.O SLIDE GOLDEN PVDF",
        "active": true,
        "updated_at": "2022-10-11T06:26:40Z"
    },
    {
        "id": 562949953600942,
        "name": "WALTZ.CLOSE 2.O SLIDE SILVER PVDF",
        "active": true,
        "updated_at": "2022-10-11T06:26:47Z"
    },
    {
        "id": 562949953600935,
        "name": "WALTZ.CLOSE 2.O T JUNCTION BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T06:25:38Z"
    },
    {
        "id": 562949953600936,
        "name": "WALTZ.CLOSE 2.O T JUNCTION CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T06:25:46Z"
    },
    {
        "id": 562949953600937,
        "name": "WALTZ.CLOSE 2.O T JUNCTION GOLDEN PVDF",
        "active": true,
        "updated_at": "2022-10-11T06:25:52Z"
    },
    {
        "id": 562949953600938,
        "name": "WALTZ.CLOSE 2.O T JUNCTION SILVER PVDF",
        "active": true,
        "updated_at": "2022-10-11T06:25:59Z"
    },
    {
        "id": 562949953600943,
        "name": "WALTZ.CLOSE 2.O U SHAPE BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T07:05:19Z"
    },
    {
        "id": 562949953600944,
        "name": "WALTZ.CLOSE 2.O U SHAPE CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T07:05:41Z"
    },
    {
        "id": 562949953600945,
        "name": "WALTZ.CLOSE 2.O U SHAPE GOLDEN PVDF",
        "active": true,
        "updated_at": "2022-10-11T07:05:48Z"
    },
    {
        "id": 562949953600946,
        "name": "WALTZ.CLOSE 2.O U SHAPE SILVER PVDF",
        "active": true,
        "updated_at": "2022-10-11T07:05:55Z"
    },
    {
        "id": 562949953545642,
        "name": "WALTZ.CLOSE NONE BLACK PVDF",
        "active": true,
        "updated_at": "2022-02-09T09:43:48Z"
    },
    {
        "id": 562949953545643,
        "name": "WALTZ.CLOSE NONE BRONZE PVDF",
        "active": true,
        "updated_at": "2022-02-09T09:44:10Z"
    },
    {
        "id": 562949953600971,
        "name": "WALTZ.CLOSE NXT 135 DEGREE BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T07:18:20Z"
    },
    {
        "id": 562949953600972,
        "name": "WALTZ.CLOSE NXT 135 DEGREE CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T07:18:28Z"
    },
    {
        "id": 562949953600973,
        "name": "WALTZ.CLOSE NXT 135 DEGREE GOLDEN PVDF",
        "active": true,
        "updated_at": "2022-10-11T07:18:35Z"
    },
    {
        "id": 562949953600974,
        "name": "WALTZ.CLOSE NXT 135 DEGREE SILVER PVDF",
        "active": true,
        "updated_at": "2022-10-11T07:18:42Z"
    },
    {
        "id": 562949953600963,
        "name": "WALTZ.CLOSE NXT 180 DEGREE BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T07:17:24Z"
    },
    {
        "id": 562949953600964,
        "name": "WALTZ.CLOSE NXT 180 DEGREE CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T07:17:31Z"
    },
    {
        "id": 562949953600965,
        "name": "WALTZ.CLOSE NXT 180 DEGREE GOLDEN PVDF",
        "active": true,
        "updated_at": "2022-10-11T07:17:36Z"
    },
    {
        "id": 562949953600966,
        "name": "WALTZ.CLOSE NXT 180 DEGREE SILVER PVDF",
        "active": true,
        "updated_at": "2022-10-11T07:17:42Z"
    },
    {
        "id": 562949953600959,
        "name": "WALTZ.CLOSE NXT 90 DEGREE BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T07:16:46Z"
    },
    {
        "id": 562949953600960,
        "name": "WALTZ.CLOSE NXT 90 DEGREE CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T07:16:59Z"
    },
    {
        "id": 562949953600961,
        "name": "WALTZ.CLOSE NXT 90 DEGREE GOLDEN PVDF",
        "active": true,
        "updated_at": "2022-10-11T07:17:10Z"
    },
    {
        "id": 562949953600962,
        "name": "WALTZ.CLOSE NXT 90 DEGREE SILVER PVDF",
        "active": true,
        "updated_at": "2022-10-11T07:17:19Z"
    },
    {
        "id": 562949953541351,
        "name": "WALTZ.CLOSE NXT BLACK AN",
        "active": true,
        "updated_at": "2022-01-22T12:28:50Z"
    },
    {
        "id": 562949953541352,
        "name": "WALTZ.CLOSE NXT CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-01-22T12:29:00Z"
    },
    {
        "id": 562949953561738,
        "name": "WALTZ.CLOSE NXT GOLDEN PVDF",
        "active": true,
        "updated_at": "2022-04-15T11:13:01Z"
    },
    {
        "id": 562949953574110,
        "name": "WALTZ.CLOSE NXT SILVER PVDF",
        "active": true,
        "updated_at": "2022-06-09T12:46:43Z"
    },
    {
        "id": 562949953600967,
        "name": "WALTZ.CLOSE NXT T JUNCTION BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T07:17:47Z"
    },
    {
        "id": 562949953600968,
        "name": "WALTZ.CLOSE NXT T JUNCTION CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T07:17:53Z"
    },
    {
        "id": 562949953600969,
        "name": "WALTZ.CLOSE NXT T JUNCTION GOLDEN PVDF",
        "active": true,
        "updated_at": "2022-10-11T07:17:59Z"
    },
    {
        "id": 562949953600970,
        "name": "WALTZ.CLOSE NXT T JUNCTION SILVER PVDF",
        "active": true,
        "updated_at": "2022-10-11T07:18:12Z"
    },
    {
        "id": 562949953600975,
        "name": "WALTZ.CLOSE NXT U SHAPE BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T07:18:47Z"
    },
    {
        "id": 562949953600976,
        "name": "WALTZ.CLOSE NXT U SHAPE CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T07:18:55Z"
    },
    {
        "id": 562949953600977,
        "name": "WALTZ.CLOSE NXT U SHAPE GOLDEN PVDF",
        "active": true,
        "updated_at": "2022-10-11T07:19:50Z"
    },
    {
        "id": 562949953600978,
        "name": "WALTZ.CLOSE NXT U SHAPE SILVER PVDF",
        "active": true,
        "updated_at": "2022-10-11T07:19:57Z"
    },
    {
        "id": 562949953541345,
        "name": "WALTZ.GLIDE FLUSH BLACK AN",
        "active": true,
        "updated_at": "2022-01-22T12:26:27Z"
    },
    {
        "id": 562949953541347,
        "name": "WALTZ.GLIDE FLUSH CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-01-22T12:26:46Z"
    },
    {
        "id": 562949953600921,
        "name": "WALTZ.GLIDE FLUSH NONE BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T06:23:56Z"
    },
    {
        "id": 562949953600922,
        "name": "WALTZ.GLIDE FLUSH NONE CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T06:24:02Z"
    },
    {
        "id": 562949953541344,
        "name": "WALTZ.GLIDE REGULAR BLACK AN",
        "active": true,
        "updated_at": "2022-01-22T12:26:18Z"
    },
    {
        "id": 562949953541346,
        "name": "WALTZ.GLIDE REGULAR CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-01-22T12:26:37Z"
    },
    {
        "id": 562949953600979,
        "name": "WALTZ.GLIDE REGULAR NXT BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T07:20:02Z"
    },
    {
        "id": 562949953600980,
        "name": "WALTZ.GLIDE REGULAR NXT CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T07:20:10Z"
    },
    {
        "id": 562949953600919,
        "name": "WALTZ.GLIDE REGULAR REGULAR BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T06:23:43Z"
    },
    {
        "id": 562949953600920,
        "name": "WALTZ.GLIDE REGULAR REGULAR CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T06:23:50Z"
    },
    {
        "id": 562949953541337,
        "name": "WALTZ.SLIDE FLUSH BLACK AN",
        "active": true,
        "updated_at": "2022-01-22T12:25:04Z"
    },
    {
        "id": 562949953541339,
        "name": "WALTZ.SLIDE FLUSH CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-01-22T12:25:22Z"
    },
    {
        "id": 562949953600909,
        "name": "WALTZ.SLIDE FLUSH POCKET DOOR BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T06:22:25Z"
    },
    {
        "id": 562949953600910,
        "name": "WALTZ.SLIDE FLUSH POCKET DOOR CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T06:22:30Z"
    },
    {
        "id": 562949953600907,
        "name": "WALTZ.SLIDE FLUSH SOFT BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T06:22:12Z"
    },
    {
        "id": 562949953600908,
        "name": "WALTZ.SLIDE FLUSH SOFT CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T06:22:19Z"
    },
    {
        "id": 562949953600917,
        "name": "WALTZ.SLIDE FLUSH SYNCRO BLACK AN WALTZ.SWING REGULAR NONE BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T06:23:22Z"
    },
    {
        "id": 562949953600918,
        "name": "WALTZ.SLIDE FLUSH SYNCRO CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T06:23:36Z"
    },
    {
        "id": 562949953600913,
        "name": "WALTZ.SLIDE FLUSH TELESCOPIC BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T06:22:49Z"
    },
    {
        "id": 562949953600914,
        "name": "WALTZ.SLIDE FLUSH TELESCOPIC CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T06:22:55Z"
    },
    {
        "id": 562949953541336,
        "name": "WALTZ.SLIDE REGULAR BLACK AN",
        "active": true,
        "updated_at": "2022-01-22T12:24:42Z"
    },
    {
        "id": 562949953541338,
        "name": "WALTZ.SLIDE REGULAR CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-01-22T12:25:12Z"
    },
    {
        "id": 562949953600981,
        "name": "WALTZ.SLIDE REGULAR MAGLEV BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T07:20:18Z"
    },
    {
        "id": 562949953600982,
        "name": "WALTZ.SLIDE REGULAR MAGLEV CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T07:20:24Z"
    },
    {
        "id": 562949953600905,
        "name": "WALTZ.SLIDE REGULAR POCKET DOOR BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T06:21:59Z"
    },
    {
        "id": 562949953600906,
        "name": "WALTZ.SLIDE REGULAR POCKET DOOR CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T06:22:06Z"
    },
    {
        "id": 562949953600903,
        "name": "WALTZ.SLIDE REGULAR SOFT BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T06:21:25Z"
    },
    {
        "id": 562949953600904,
        "name": "WALTZ.SLIDE REGULAR SOFT CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T06:21:34Z"
    },
    {
        "id": 562949953600915,
        "name": "WALTZ.SLIDE REGULAR SYNCRO BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T06:23:02Z"
    },
    {
        "id": 562949953600916,
        "name": "WALTZ.SLIDE REGULAR SYNCRO CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T06:23:09Z"
    },
    {
        "id": 562949953600911,
        "name": "WALTZ.SLIDE REGULAR TELESCOPIC BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T06:22:36Z"
    },
    {
        "id": 562949953600912,
        "name": "WALTZ.SLIDE REGULAR TELESCOPIC CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T06:22:42Z"
    },
    {
        "id": 562949953541341,
        "name": "WALTZ.SWING FLUSH BLACK AN",
        "active": true,
        "updated_at": "2022-01-22T12:25:42Z"
    },
    {
        "id": 562949953541343,
        "name": "WALTZ.SWING FLUSH CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-01-22T12:26:09Z"
    },
    {
        "id": 562949953600925,
        "name": "WALTZ.SWING FLUSH NONE BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T06:24:25Z"
    },
    {
        "id": 562949953600926,
        "name": "WALTZ.SWING FLUSH NONE CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T06:24:32Z"
    },
    {
        "id": 562949953541340,
        "name": "WALTZ.SWING REGULAR BLACK AN",
        "active": true,
        "updated_at": "2022-01-22T12:25:34Z"
    },
    {
        "id": 562949953541342,
        "name": "WALTZ.SWING REGULAR CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-01-22T12:25:59Z"
    },
    {
        "id": 562949953600923,
        "name": "WALTZ.SWING REGULAR NONE BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T06:24:11Z"
    },
    {
        "id": 562949953600924,
        "name": "WALTZ.SWING REGULAR NONE CHAMPAGNE AN",
        "active": true,
        "updated_at": "2022-10-11T06:24:17Z"
    },
    {
        "id": 562949953545644,
        "name": "WARDROBE AIR HINGE BLACK AN",
        "active": true,
        "updated_at": "2022-02-09T10:55:42Z"
    },
    {
        "id": 562949953547437,
        "name": "WARDROBE AIR HINGE BRUSH GOLD ",
        "active": true,
        "updated_at": "2022-02-16T12:49:03Z"
    },
    {
        "id": 562949953600949,
        "name": "WARDROBE AIR HINGE NONE BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T07:06:15Z"
    },
    {
        "id": 562949953600950,
        "name": "WARDROBE AIR HINGE NONE BRUSH GOLD",
        "active": true,
        "updated_at": "2022-10-11T07:06:20Z"
    },
    {
        "id": 562949953600947,
        "name": "WARDROBE AIR HINGE WITH GRID NONE BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T07:06:02Z"
    },
    {
        "id": 562949953600948,
        "name": "WARDROBE AIR HINGE WITH GRID NONE BRUSH GOLD",
        "active": true,
        "updated_at": "2022-10-11T07:06:10Z"
    },
    {
        "id": 562949953545645,
        "name": "WARDROBE LONG HANDLE BRUSH GOLD",
        "active": true,
        "updated_at": "2022-02-09T10:56:04Z"
    },
    {
        "id": 562949953600951,
        "name": "WARDROBE LONG HANDLE NONE BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T07:06:27Z"
    },
    {
        "id": 562949953600952,
        "name": "WARDROBE LONG HANDLE NONE BRUSH GOLD",
        "active": true,
        "updated_at": "2022-10-11T07:06:32Z"
    },
    {
        "id": 562949953559377,
        "name": "WARDROBE SLIDING BLACK AN",
        "active": true,
        "updated_at": "2022-04-06T06:17:34Z"
    },
   
    {
        "id": 562949953600953,
        "name": "WARDROBE SLIDING NONE BLACK AN",
        "active": true,
        "updated_at": "2022-10-11T07:06:39Z"
    },
    {
        "id": 562949953600954,
        "name": "WARDROBE SLIDING NONE BRUSH GOLD",
        "active": true,
        "updated_at": "2022-10-11T07:06:50Z"
    }
               ]


  var TradeName =  Solutions.System + " "+ Solutions.SubSystem + " "+ Solutions.SystemType + " " + Solutions.Color
  var trade_id
  for(var t=0; t<Trades.length; t++)
  {
    if(Trades[t].name===TradeName)
      {
       trade_id = Trades[t].id;
      }
  }   

 

  var glassfinish 
    var PrintName
    if(Solutions.SubOrientation)
    {
      PrintName = Solutions.SubOrientation
    }
    if(!Solutions.SubOrientation)
    {
      PrintName = Solutions.Orientation
    }
    if(Solutions.GlassVariant)
    {
      glassfinish = Solutions.GlassVariant
    }
    if(!Solutions.GlassVariant)
    {
      glassfinish = Solutions.GlassFinish
    }
  let Grid 
  if( Solutions.Grid==="YES")
  {
    Grid = 'YES'
  }
  if(Solutions.Grid!=="YES")
  {
    Grid = 'NO'
  }
  
  let DoorCloser  
  if( Solutions.DoorCloser==="YES")
  {
    DoorCloser = 'YES'
  }
  if( Solutions.DoorCloser!=="YES")
  {
    DoorCloser = 'NO'
  }

  let reference
      
  reference = Solutions.Width + "by"+ Solutions.Height
 
  var description 
  if(Solutions.GlassVariant)
  {
    description = Solutions.GlassFinish + " "+ Solutions.GlassVariant
  }
  if(!Solutions.GlassVariant)
  {
    description =  Solutions.GlassSubCategory + " "+ Solutions.GlassFinish
  }
 

  if(Number(Solutions.Height)<2400)
  {
    priority = "low"
  }
  if(Number(Solutions.Height)>=3000)
  {
    priority = "high"
  }
  if(Number(Solutions.Height)>=2400&&Number(Solutions.Height)<3000)
  {
    priority = "medium"
  }



   for(var j= 0; j<Solutions.ProcorePunchItemID.length; j++)
   {  
     if(Solutions.ProcorePunchItemID[j].PunchType ==="Sub Track")
     {
    
      itemname = Solutions.ProcorePunchItemID[j].Serial + " SubTrack "+  Solutions.Floor + " "+ Solutions.Space;
      cost_impact_amount = 0;
      schedule_impact_days  = 0;
      punch_item_type_id = SubtrackPunchtype

     }
     if(Solutions.ProcorePunchItemID[j].PunchType ==="Sub Frame")
     {
    
      itemname = Solutions.ProcorePunchItemID[j].Serial + " SubFrame "+  Solutions.Floor + " "+ Solutions.Space;
      cost_impact_amount = 0;
      schedule_impact_days  = 0; 
      punch_item_type_id = SubframePunchtype

     }

     if(Solutions.ProcorePunchItemID[j].PunchType ==="System")
     {
  
    
      itemname = Solutions.ProcorePunchItemID[j].Serial + " " + Solutions.Floor + " " + Solutions.Space + " " + PrintName + " "+ Solutions.Color + " "+ Solutions.Width+"by"+Solutions.Height
      cost_impact_amount = Solutions.Amount
      schedule_impact_days  = Solutions.SquareFeet
      punch_item_type_id  = SystemPunchtype
    

     }
     
     let temp = {PunchID : Solutions.ProcorePunchItemID[j].PunchID, name : itemname,priority : priority,schedule_impact_days : schedule_impact_days,cost_impact_amount : cost_impact_amount,punch_item_type_id : punch_item_type_id,glassfinish:glassfinish,Grid : Grid,DoorCloser:DoorCloser,reference : reference,description : description,schedule_impact:schedule_impact,cost_impact : cost_impact,trade_id : trade_id}
     Punches.push(temp)

   }





getAccessToken()
.then((response)=>{

  for(var i=0;i<Punches.length;i++)
  {
    var PunchData = [];
    UpdatePunchItem(response,Punches[i].PunchID,projectID,Punches[i])
    .then((response)=>{ 
     
      PunchData.push({id : response.id, SolutionNo:response.position,ItemName : response.name, Location : response.location.id})
      if(PunchData.length===Punches.length)
      {
        {res.json(PunchData)} 
      }
     })
  }
 
}) 



});

app.post('/api/getpunchitem', async(req, res) => {
 
  var projectID = req.body.projectID;
  var Solutions = req.body.Solution;
  let Punches = []

  for(var i = 0 ; i <Solutions.length;i++)
  {
   
    for(var j=0;j<Solutions[i].ProcorePunchItemID.length;j++)
    {
      Punches.push(Solutions[i].ProcorePunchItemID[j].id)
    }
  }




  getAccessToken().then((response)=>{
    let List = []
    for(var i = 0 ; i < Punches.length ; i++)
    {
      ShowPunchItems(response,projectID,Punches[i])
      .then((response)=>{
        List.push(response)
        if(List.length===Punches.length)
        {
          res.json(List)
        }
      })
    }
    
    
  })


});


//===============Create Project==========================================================
async function CreateProject(access_token,active,address,city,country_code,start_date,completion_date,total_value,name,office_id,phone,project_number,square_feet,time_zone,zip,project_type_id,estimated_value,estimated_start_date,estimated_completion_date,state_code,source,actual_start_date,tz_name,projected_finish_date,editdate,pipelinedate)
  {
  
    const res = await fetch('https://api.procore.com/rest/v1.0/projects', {
      method: 'POST',
      qs: {run_configurable_validations: 'false'},
      headers: {
      Authorization: `Bearer ${access_token}`,
      'content-type': 'application/json',
      'Procore-Company-Id': 562949953442334
       },
      body: JSON.stringify({
        company_id: 562949953442334,
        project: {
          active: true,
          address: address,
          city: city,
          country_code: country_code,
          start_date: start_date,
          completion_date: start_date,
          total_value: total_value,
          name: name,
          office_id: office_id,
          phone: phone,
          project_number:project_number,
          square_feet: square_feet,
          state_code: state_code,
          time_zone: time_zone,
          tz_name: tz_name,
          zip: zip,
          project_type_id: project_type_id,
          project_template_id: 562949953740186,
          project_stage_id : 562949953430239,
          actual_start_date : actual_start_date,
          projected_finish_date : projected_finish_date,
          estimated_value: estimated_value,
          estimated_start_date: estimated_start_date,
          estimated_completion_date: estimated_completion_date,
          department_ids:[562949953438528],
          custom_field_41564: 77141714,
          custom_field_59778: 69,
          custom_field_35082: source,
          custom_field_40043: 15,
          custom_field_53114 : editdate,
          custom_field_68067 : pipelinedate
        }
  
      })
     
    })
  
  const data = await res.json();
  
  return data
  
}

async function UpdateWinProject(AccessToken,ProjectID,project_number,square_feet,estimated_value,editdate,pipelinedate,Discount,ProjectName,WebappAmount,TotalSquareFeet,CSValue,Order)
  {
  
    const res = await fetch(`https://api.procore.com/rest/v1.0/projects/${ProjectID}`, {
      method: 'PATCH',
      qs: {run_configurable_validations: 'false'},
      headers: {
      Authorization: `Bearer ${AccessToken}`,
      'content-type': 'application/json',
      'Procore-Company-Id': 562949953442334
       },
      body: JSON.stringify({
        company_id: 562949953442334,
        project: {
          total_value: estimated_value,
          project_number:project_number,
          square_feet: TotalSquareFeet,
          estimated_value: estimated_value,
          custom_field_41564: CSValue,
          custom_field_40043: Discount,
          custom_field_53114 : editdate,
        }
  
      })
     
    })
  
  const data = await res.json();



  const ProjectDetails = {AccessToken : AccessToken, ProjectID : ProjectID,Order : Order}
  
  return ProjectDetails
  
}
//============================CREATE PROJECT LOCATIONS=======================================

async function CreateProjectLocation(access_token,projectID,Punches)
{

   var LocationName = Punches.LocationName.toString()
  
  const res = await fetch(`https://api.procore.com/rest/v1.0/projects/${projectID}/locations`, {
    method: 'POST',
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     },
    body: JSON.stringify(
      {
        "location": {
          "node_name": LocationName
        }
      }

    )
   
  })

const data = await res.json();


const LocationDetails = { LocationID : data.id, Punches : Punches , AccessToken : access_token, ProjectID : projectID }

return  LocationDetails;

}


async function CreateWinProjectLocation(access_token,projectID,Punches,Order)
{

   var LocationName = Punches.LocationName.toString()
  
  const res = await fetch(`https://api.procore.com/rest/v1.0/projects/${projectID}/locations`, {
    method: 'POST',
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     },
    body: JSON.stringify(
      {
        "location": {
          "node_name": LocationName
        }
      }

    )
   
  })

const data = await res.json();


const LocationDetails = { AccessToken : access_token,LocationID : data.id, Punches : Punches , Order : Order, ProjectID : projectID }

return  LocationDetails;

}
//================CREATE PROJECT PUNCH ITEMS=================================================


async function CreateWinPunchItem(access_token,ProjectID,LocationID,Punches,PunchTypes,Order)
{

  const res = await fetch('https://api.procore.com/rest/v1.0/punch_items', {
    method: 'POST',
    qs: {run_configurable_validations: 'false'},
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     },
    body: JSON.stringify({
      project_id: ProjectID,
      punch_item: {
        description: Punches.description,
        due: Punches.DueDate,
        name: Punches.itemname,
        schedule_risk: 'ml_high',
        position: Punches.Position,
        priority: Punches.priority,
        private: false,
        status: 'Open',
        date_initiated: '2019-08-24',
        schedule_impact: 'yes_known',
        schedule_impact_days: Punches.schedule_impact_days,
        reference: Punches.reference,
        cost_code_id: null,
        cost_impact: Punches.cost_impact,
        cost_impact_amount: Punches.cost_impact_amount,
        trade_id: Punches.trade_id,
        punch_item_type_id: Punches.punch_item_type_id,
        punch_item_manager_id: Punches.PunchitemManager,
        final_approver_id: Punches.FinalApprover,
        location_id: LocationID,
        login_information_ids: [Punches.Assignee],
        distribution_member_ids: [Punches.Assignee],
        workflow_status: 'initiated',
        custom_field_68346 : Punches.systeminfo,
        custom_field_68076 : Punches.DoorCloser,
        custom_field_68074 : Punches.Grid,
        custom_field_68071 : Punches.glassfinish
      
      }
    })
   
  })

const data = await res.json();

const PunchDetails = {PunchDetails : data,SerialNo: Punches.SerialNo, Floor : Punches.Floor, Space : Punches.Space, PunchTypes : PunchTypes,ProjectID : ProjectID,Order: Order,AccessToken : access_token,LocationID : LocationID}

return PunchDetails

}
//===========================================================================================
async function DeletePunchItem(access_token,ProjectID,PunchitemID)
{

  const res = await fetch(`https://api.procore.com/rest/v1.0/punch_items/${PunchitemID}?project_id=${ProjectID}`, {
    method: 'DELETE',
    qs: {},
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     }
   
  })

const data = await res.json();

return data

}

//===========================================================================================
async function DeletePunchItem(access_token,ProjectID,PunchitemID)
{

  const res = await fetch(`https://api.procore.com/rest/v1.0/punch_items/${PunchitemID}?project_id=${ProjectID}`, {
    method: 'DELETE',
    qs: {},
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     }
   
  })

const data = await res.json();

return data

}

async function DeleteWinLocation(access_token,location_id,Order)
{

  const res = await fetch(`https://api.procore.com/rest/v1.0/projects/${Order.ProjectID}/locations/${location_id}`, {
    method: 'DELETE',
    qs: {},
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     }
   
  })

const data = await res

var Details = {ExtraLocations : data , AccessToken : access_token ,Order : Order}

return Details

}

async function DeleteWinPunch(access_token,punch_id,Order)
{

  const res = await fetch(`https://api.procore.com/rest/v1.0/punch_items/${punch_id}?project_id=${Order.ProjectID}`, {
    method: 'DELETE',
    qs: {},
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     }
   
  })

const data = await res

var Details = {ExtraPunches : data , AccessToken : access_token ,Order : Order}

return Details

}

async function DeleteWinPunchItem(access_token,ProjectID,PunchitemID,Order)
{

  const res = await fetch(`https://api.procore.com/rest/v1.0/punch_items/${PunchitemID}?project_id=${ProjectID}`, {
    method: 'DELETE',
    qs: {},
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     }
   
  })

const data = await res


var Details = {AccessToken :access_token, Order : Order,DeletedPunches : data}

return Details

}
/*
async function UpdatePunchItem(access_token,PunchID,ProjectID,Punches,Order)
{
 
  const res = await fetch(`https://api.procore.com/rest/v1.0/punch_items/${PunchID}`, {
    method: 'PATCH',
    qs: {run_configurable_validations: 'false'},
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     },
    body: JSON.stringify({
      project_id: ProjectID,
      punch_item: {
        name :Punches.name,
        description: Punches.description,
        priority: Punches.priority,
        schedule_impact: 'yes_known',
        schedule_impact_days: Punches.schedule_impact_days,
        reference: Punches.reference,
        cost_impact: Punches.cost_impact,
        cost_impact_amount: Punches.cost_impact_amount,
        trade_id: Punches.trade_id,
        punch_item_type_id: Punches.punch_item_type_id,
        custom_field_68346 : Punches.systeminfo,
        custom_field_68076 : Punches.DoorCloser,
        custom_field_68074 : Punches.Grid,
        custom_field_68071 : Punches.glassfinish
      
      }
    })
   
  })
 
const data = await res.json();

var  Details = {AccessToken : access_token, Order:Order, UpdatedPunches : data}

return Details

}
*/

async function UpdateProjectPunchItem(access_token,PunchID,ProjectID,Order)
{
 



  const res = await fetch(`https://api.procore.com/rest/v1.0/punch_items/${PunchID}`, {
    method: 'PATCH',
    qs: {run_configurable_validations: 'false'},
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     },
    body: JSON.stringify({
      project_id: ProjectID,
      punch_item: {
        schedule_impact: 'yes_known',
        schedule_impact_days: Order.TotalSquareFeet,
        cost_impact: "yes_known",
        cost_impact_amount: Order.FinalAmount,
        
      
      }
    })
   
  })

const data = await res.json();


var details = {Punch : data, Order : Order}

return details

}

//===================LIST PUNCH ITEM========================================================

async function ListLocations(access_token,projectID,Order)
{

 
  const res = await fetch(`https://api.procore.com/rest/v1.0/projects/${projectID}/locations`, {
    method: 'GET',
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     }
   
  })

const data = await res.json();

var details = { Locations : data, AccessToken :access_token ,Order : Order}
return  details;

}


async function ListPunchIDS(access_token,Order)
{

 
  const res = await fetch(`https://api.procore.com/rest/v1.0/punch_items?project_id=${Order.ProjectID}`, {
    method: 'GET',
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     }
   
  })

const data = await res.json();

var details = { PunchIDs : data, AccessToken :access_token ,Order : Order}
return  details;

}

async function GetPunchItemType(access_token,ProjectId,Punches)
{ 
 
  
  const res = await fetch(`https://api.procore.com/rest/v1.0/punch_item_types?project_id=${ProjectId}`, {
    method: 'GET',
    qs: {
      company_id: '562949953442334',
          
    },
    headers: {
    Authorization: `Bearer ${access_token}`,
    'Procore-Company-Id': 562949953442334
     }
   
  })

const data = await res.json();

var PunchtypeDetail = {Punchtypes : data,AccessToken : access_token, ProjectID : ProjectId, Punches : Punches}

return PunchtypeDetail

}


//==================================UPDATE PROJECT ORDER IN PROCORE========================================

//=============================ROUTE FOR CREATING LOCATION===============================================

app.post('/api/createprojectlocation', async(req, res) => {

  var projectID = req.body.ProjectID;
  var Floor = req.body.Floor;
  var Space = req.body.Space;
  var MainPosition = req.body.SolutionNo;
  var Position = req.body.SolutionNo;
  var System =  req.body.System;
  var SubSystem = req.body.SubSystem;
  var SystemType = req.body.SystemType;
  var Sqft =  req.body.SquareFeet;
  var Quantity =  req.body.Quantity;
  var Amount  = req.body.Amount;
  var PunchItemName = Floor + "-" + Space
  
  const token = await  getAccessToken();

  let access_key = token;

  let PunchIDs = [];

  


  const ProjectLocation = await CreateProjectLocation(access_key,projectID,Floor,Space)

  for(var i = 0; i<Quantity; i++)
  {
    if(System=="WALTZ.SLIDE")
    {
      if(SystemType=="SOFT"||SystemType=="SYNCRO"||SystemType=="POCKET DOOR")
      {
        let Position = MainPosition + "."+ i+1;

        let PunchItemNameMf = Position + Floor + "-" + Space + "-MainFrame"

       
        
        const MainFramePunchItem =  await CreatePunchItem(access_key,projectID,ProjectLocation.id,PunchItemNameMf,Position)
        PunchIDs.push(MainFramePunchItem.id)

        
         
        let PunchItemNameSb = Position + Floor + "-" + Space + "-SubFrame"

        const SubFramePunchItem =await CreatePunchItem(access_key,projectID,ProjectLocation.id,PunchItemNameSb,Position)
        PunchIDs.push(SubFramePunchItem.id)

      }
    }


  }

  const PunchItem = await CreatePunchItem(access_key,projectID,ProjectLocation.id,PunchItemName,Position)



  var Ids = {
    PunchItemID :PunchIDs,
    LocationID : ProjectLocation.id
  }




  
  res.json(Ids)


});

//=====================================ROUTE FOR CREATING PUNCH ITEM======================================
























//===================MIscellaneous use===============================
//562949953775975

app.get('/api/getclients', async(req, res) => {

 
  const token = await  getAccessToken();

  let access_key = token;


  const Clients = await GetCustom(access_key)
  res.json(Clients)

});


async function GetCustom(access_token)
{ 
 //562949953921529 pro
 // 562949954760572 pun

 //test 562949953758264
 
  const res = await fetch('https://api.procore.com/rest/v1.0/projects/562949953911994/available_punch_item_managers', {
    method: 'GET',
    qs: {
      company_id: '562949953442334',
          
    },
    headers: {
    Authorization: `Bearer ${access_token}`,
    'Procore-Company-Id': 562949953442334
     }
   
  })

const data = await res.json();

return data

}


async function CreateProjectLink(access_token)
  {
  
    const res = await fetch('https://api.procore.com/rest/v1.0/links?project_id=562949954034743', {
      method: 'POST',
      qs: {run_configurable_validations: 'false'},
      headers: {
      Authorization: `Bearer ${access_token}`,
      'content-type': 'application/json',
      'Procore-Company-Id': 562949953442334
       },
      body: JSON.stringify({
        link: {
          title: "Project cam",
          url: "https://developers.procore.com/reference/authentication"
        }
  
      })
     
    })
  
  const data = await res.json();
  
  return data
  
}








//========================================ROUTE FOR CREATING PUNCH ITEM=============================================




//====================================GET CLIENTS=====================================================================

app.get('/api/getclients', async(req, res) => {

 
  const token = await  getAccessToken();

  let access_key = token;

  const Clients = await GetClients(access_key)
  res.json(Clients)

});


//==========================================CS POST================================================================

app.post('/api/updatecs', async(req, res) => {


  var refno = req.body.RefNo;
  var FinalValue = req.body.FinalAmount

 
 


  const UpdateCs = await UpdateAmountValue(refno,FinalValue)

  console.log(UpdateCs)

  //res.json(UpdateCs)

});



app.get('/api/connectprocore', async(req, res) => {
 
 
  const token = await  getAccessToken();

  let access_key = token;

  const list = await ListProjects(access_key) //GetProjectTemplates(access_key) 

  
  res.json(list)
});
//======================================FUNCTIONS FOR ROUTE=========================================================
//==================================================================================================================
//==================================================================================================================

//===========================GET CLIENTS===========================================================================

async function GetClients(access_token)
{

  const res = await fetch('https://api.procore.com/rest/v1.0/companies/562949953442334/users', {
    method: 'GET',
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     }
   
  })

const data = await res.json();

var ClientNames = [];
 
  data.map(item =>{
    if(item.job_title==="Architect")
    {
      ClientNames.push(item.name)
    }
  
    })

  return  ClientNames


}

//===========================UPDATE PROJECT=====================================================================



//===============================DELETE PROJECT LOCATION=====================================

async function DeleteProjectLocation(access_token,projectID,locationID)
{
 
  const res = await fetch(`https://api.procore.com/rest/v1.0/projects/${projectID}/locations/${locationID}`, {
    method: 'DELETE',
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     }
   
   
  })


}

//================================DELETE PUNCH ITEMS=========================================

async function DeletePunchItem(access_token,ProjectID,PunchItemID)
{


  const res = await fetch(`https://api.procore.com/rest/v1.0/punch_items/${PunchItemID}?` + new URLSearchParams({
    project_id: ProjectID
}), {
    method: 'DELETE',
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     }
  })




  const data = await res


  return data
  
}

//==============================UPDATE CS FINALE AMOUNT==========================================

async function UpdateAmountValue(refno,FinalValue)
 {

  const res = await fetch(`https://103.203.224.171/api/Rec/SaveProjectData` , {
    method: 'POST',
    headers: {
    'content-type': 'application/json',

     },
     body: JSON.stringify(
      { "projId": "", 
      "refno" :refno,
       "amt": FinalValue
     }
    )

     
  })




  const data = await res


  return data
  
} 


async function GetProjectTemplates(access_token)
{

const res = await fetch('https://api.procore.com/rest/v1.0/projects/562949953743072/locations', {
 method: 'GET',
 headers: {
   Authorization: `Bearer ${access_token}`,
   'Procore-Company-Id': 562949953442334
  }

})


const data = await res.json();



return data

}



async function ListProjects(access_token)
{

  const res = await fetch('https://api.procore.com/rest/v1.0/companies/562949953442334/projects', {
    method: 'GET',
    qs: {
      page: '240', per_page: '240'
    },
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json'
     }
   
  })

const data = await res.json();

return data

}


//====================================================================================================
async function GetProjects(access_token)
{

  const res = await fetch('https://api.procore.com/rest/v1.0/departments?company_id=562949953442334&view=extended', {
    method: 'GET',
    qs: {
      company_id: '562949953442334',
      view:"extended"     
    },
    headers: {
    Authorization: `Bearer ${access_token}`,
    'Procore-Company-Id': 562949953442334
     }
   
  })

const data = await res.json();

return data

}
//=====================================================================================================
async function ListProjects(access_token)
{

const res = await fetch('https://api.procore.com/rest/v1.0/companies/562949953442334/projects', {
  method: 'GET',
  qs: {
    page: '240', per_page: '240'
  },
  headers: {
  Authorization: `Bearer ${access_token}`,
  'Procore-Company-Id': '562949953442334',
  'content-type': 'application/json'
   }
 
})

const data = await res.json();

return data

}

/*
app.post('/api/createprojectlocation', async(req, res) => {

  var projectID = req.body.ProjectID;
  var Floor = req.body.Floor;
  var Space = req.body.Space;
  var MainPosition = req.body.SolutionNo;
  var Position = req.body.SolutionNo;
  var System =  req.body.System;
  var SubSystem = req.body.SubSystem;
  var SystemType = req.body.SystemType;
  var Sqft =  req.body.SquareFeet;
  var Quantity =  req.body.Quantity;
  var Amount  = req.body.Amount;
  var PunchItemName = Floor + "-" + Space
  
  const token = await  getAccessToken();

  let access_key = token;

  let PunchIDs = [];

  


  const ProjectLocation = await CreateProjectLocation(access_key,projectID,Floor,Space)

  for(var i = 0; i<Quantity; i++)
  {
    if(System=="WALTZ.SLIDE")
    {
      if(SystemType=="SOFT"||SystemType=="SYNCRO"||SystemType=="POCKET DOOR")
      {
        let Position = MainPosition + "."+ i+1;

        let PunchItemNameMf = Position + Floor + "-" + Space + "-MainFrame"

       
        
        const MainFramePunchItem =  await CreatePunchItem(access_key,projectID,ProjectLocation.id,PunchItemNameMf,Position)
        PunchIDs.push(MainFramePunchItem.id)

        
         
        let PunchItemNameSb = Position + Floor + "-" + Space + "-SubFrame"

        const SubFramePunchItem =await CreatePunchItem(access_key,projectID,ProjectLocation.id,PunchItemNameSb,Position)
        PunchIDs.push(SubFramePunchItem.id)

      }
    }


  }

  const PunchItem = await CreatePunchItem(access_key,projectID,ProjectLocation.id,PunchItemName,Position)



  var Ids = {
    PunchItemID :PunchIDs,
    LocationID : ProjectLocation.id
  }


  console.log(Ids)

  
  res.json(Ids)


});

//=========================================================================================================================

app.post('/api/createprocoreproject', async(req, res) => {
 
    //=========================================================================
    
    const order = new Order({

      OrderNo : req.body.Order.OrderNo,
      ProjectName : req.body.Order.ProjectName,
      ClientName : req.body.Order.ClientName,
      Location : req.body.Order.Location,
      Architect : req.body.Order.Architect,
      Source : req.body.Order.Source,
      Solutions: req.body.Order.Solutions,
      Discount : req.body.Order.Discount,
      Advance : req.body.Order.Advance,
      FinalAmount : req.body.Order.FinalAmount,
      GrandTotal : req.body.Order.GrandTotal,
      Status : req.body.Order.Status,
      Active : req.body.Order.Active,
      Completed : req.body.Order.Completed,
      CreationDate :  req.body.Order.CreationDate,
      EditDate : req.body.Order.EditDate,
      WinDate : req.body.Order.WinDate,
      Associate : req.body.Order.Associate,
      ProjectManager : req.body.Order.ProjectManager,
      ProjectID : req.body.ProjectID,
      OfficeID : req.body.Order.OfficeID,
      TotalSquareFeet : req.body.TotalSquareFeet,
      CSValue : req.body.Order.CSValue,
      CompletionDate : req.body.Order.CompletionDate,
      DateCreated : req.body.Order.DateCreated
  
  });

 //=========================================================================

    var active = "true";
    var address = req.body.LedgerDetail.AddressLine1;
    var city = req.body.LedgerDetail.City;
    var state_code = req.body.LedgerDetail.State;
    var country_code = "IN"
    var start_date =req.body.Order.WinDate;
    var completion_date =  req.body.Order.CompletionDate;
    var total_value =  Math.ceil(Number(req.body.Order.FinalAmount));
    var name = req.body.Order.ProjectName
    var office_id = req.body.Order.OfficeID;
    var phone = req.body.LedgerDetail.CDMobile1;
    var project_number = req.body.Order.OrderNo;
    var square_feet = Math.ceil(Number(req.body.Order.TotalSquareFeet));
    var time_zone = "New Delhi"
    var tz_name = "Asia/Kolkata" 
    var zip = req.body.LedgerDetail.Pincode;
    var project_type_id = "562949953511908";
    var estimated_value = Math.ceil(Number(req.body.Order.FinalAmount));
    var estimated_start_date = req.body.Order.CreationDate;
    var estimated_completion_date = req.body.Order.CompletionDate;
    var source = 97592;
    var actual_start_date = req.body.Order.WinDate
    var projected_finish_date = req.body.Order.CompletionDate;
    var editdate = new Date(req.body.Order.EditDate);
    var pipelinedate = new Date(req.body.Order.CreationDate);

    let restoken 
    //var ProjectI = CreateProject(responseP,active,address,city,country_code,start_date,completion_date,total_value,name,office_id,phone,project_number,square_feet,time_zone,zip,project_type_id,estimated_value,estimated_start_date,estimated_completion_date,state_code,source,actual_start_date,tz_name,projected_finish_date,editdate,pipelinedate)
     

    getAccessToken().then((response)=>{
      restoken  = response
      return response
     })
     .then((responseP)=>{

      let project_id =  562949954023137

      for(var i = 0; i<req.body.Order.Solutions.length;i++)
      {
        CreateProjectLocation(responseP,project_id,req.body.Order.Solutions[i].Floor,req.body.Order.Solutions[i].Space).then((res)=>{
          console.log(res)
        })
      }
      
    
    })
    
   
   
    var projectID , Access

    getAccessToken().then((response)=>{
      console.log(response)

      Access = response
      CreateProject(response,active,address,city,country_code,start_date,completion_date,total_value,name,office_id,phone,project_number,square_feet,time_zone,zip,project_type_id,estimated_value,estimated_start_date,estimated_completion_date,state_code,source,actual_start_date,tz_name,projected_finish_date,editdate,pipelinedate)
       .then((responseP)=>{
        console.log(response)   
      
        let access = response;
        let projectid = responseP.id;
       
        console.log(projectid)
       
        projectID = responseP.id;
     for(var j = 0;j<req.body.Order.Solutions.length;j++)
     {

      let floor = req.body.Order.Solutions[j].Floor;
      let Space = req.body.Order.Solutions[j].Space
      const Location =  CreateProjectLocation(access,projectid,floor,Space)
      console.log(Location)

     }
        
        
      
       })
     })
 

   


    
    



  });
*/
