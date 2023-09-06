const express = require("express");
const nodemail = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path')


const router = express.Router();

var GlassOrder = require('../models/glassorder.js');
var GlassSolution = require('../models/glasssolution.js');





//=====================Post Request=====================

router.post("",(req, res, next) => {

    const glassorder = new GlassOrder({


      WaltzOrderNo : req.body.WaltzOrderNo,
      OrderNo :   req.body.OrderNo,
      ProjectName : req.body.ProjectName,
      ClientName : req.body.ClientName,
      Location : req.body.Location,
      Architect : req.body.Architect,
      GST : req.body.GST,
      Source : req.body.Source,
      Solutions: req.body.Solutions,
      Discount : req.body.Discount,
      Advance : req.body.Advance,
      FinalAmount : req.body.FinalAmount,
      GrandTotal : req.body.GrandTotal,
      TempCharge: req.body.TempCharge,
      Packing : req.body.Packing,
      Freight : req.body.Freight,
      OtherCharges : req.body.OtherCharges, 
      Status : req.body.Status,
      Active : req.body.Active,
      Completed : req.body.Completed,
      CreationDate :req.body.CreationDate,
      EditDate : req.body.EditDate,
      WinDate : req.body.WinDate,
      Associate : req.body.Associate,
      ProjectManager : req.body.ProjectManager,
      TotalSquareFeet : req.body.TotalSquareFeet,
      CSValue : req.body.CSValue,
      CompletionDate : req.body.CompletionDate,
      DateCreated : req.body.DateCreated,
      CommercialWinDate : req.body.CommercialWinDate,
      HandOverDate : req.body.HandOverDate,
      LedgerDetails : req.body.LedgerDetails,
      ProPlan : req.body.ProPlan,
      ProValue : req.body.ProValue,
      Pieces : req.body.Pieces,
      DiscountPercent : req.body.DiscountPercent,
      FreightPercent : req.body.FreightPercent,
      PackingPercent : req.body.PackingPercent,
      OtherChargesPercent : req.body.OtherChargesPercent,
      Insurance : req.body.Insurance,
      InsuranceCost : req.body.InsuranceCost
    
    });
     

    
    glassorder.save().then(createdOrder =>{
        res.status(201).json({
            message: "Order added successfully.",
            orderId: createdOrder._id
        }); 
        const text = "Saved Successfully"
        return  text;
    });
 
});



//=========================================================================

//======================================Get Request========================

router.get("",(req,res,next)=>{ 
 
console.log(req.query.user)
    if(req.query.user!=="ALL"){
    GlassOrder.find({Associate:req.query.user})
    .then(documents=>{
     res.status(200).json({
         message: "Orders fetched successfully.",
         orders : documents
     });  
    }); 
   }

  
   if(req.query.user==="ALL"){
    GlassOrder.find()
    .then(documents=>{
     res.status(200).json({
         message: "Orders fetched successfully.",
         orders : documents
     });  
    }); 
   }



});


router.get("/allusers",(req,res,next)=>{ 
 
  
      GlassOrder.find({$or: [ { Status : "Win" }, {Status : "Old Win" } , {Status : "Handover" }] })
      .then(documents=>{
       res.status(200).json({
           message: "Orders fetched successfully.",
           orders : documents
       });  
      }); 
     
  
  });


  router.get("/allanalyticsorders",(req,res,next)=>{ 
 
  
    GlassOrder.find({$or: [ { Status : "Win" },{Status : "Pipeline" } ,{Status : "Handover" },{Status : "Commercial Hold" }] })
    .then(documents=>{
     res.status(200).json({
         message: "Orders fetched successfully.",
         orders : documents
     });  
    }); 
   


});


  


  
router.get("/projectmanagerorders",(req,res,next)=>{ 
 
  
  GlassOrder.find({$or: [ { Status : "Win" }, {Status : "Handover" }, {Status : "Old Win" } ] })
  .then(documents=>{
   res.status(200).json({
       message: "Orders fetched successfully.",
       orders : documents
   });  
  }); 
 






});




//==========================For downloads=========================================

router.get("/downloads/:ordernumber",(req,res,next)=>{ 
 
  GlassOrder.find({$or: [ { Status : "Win" }, {Status : "Commercial Hold" } ] })
  .then(documents=>{
   res.status(200).json({
       message: "Orders fetched successfully.",
       orders : documents
   });  
  }); 
 
});


//=======================FOr Mrunal===============================================
router.get("/socialpipeline",(req,res,next)=>{ 
 
  GlassOrder.find({$and: [ { Source : "SOCIAL" }, {Status : "Pipeline" } ] })
  .then(documents=>{
   res.status(200).json({
       message: "Orders fetched successfully.",
       orders : documents
   });  
  }); 
 
});



router.get("/ledgerdownloads/:ordernumber",(req,res,next)=>{ 
 
  GlassOrder.find({$or: [ { Status : "Win" }, {Status : "Commercial Hold" } ] })
  .then(documents=>{
   res.status(200).json({
       message: "Orders fetched successfully.",
       orders : documents
   });  
  }); 
 
});



//================================Bulk Edit======================================

router.get("/bulkedit",(req,res,next)=>{ 
 
  GlassOrder.find( {} )
  .then(documents=>{
   res.status(200).json(documents);  
  }); 
 
});



//===============================Put/Edit Request=================================


router.put("/updateorder/:id", (req, res, next) => {
  
  const glassorder = new GlassOrder({
    _id : req.body._id,
    WaltzOrderNo : req.body.WaltzOrderNo,
    OrderNo : req.body.OrderNo,
    ProjectName : req.body.ProjectName,
    ClientName : req.body.ClientName,
    Location : req.body.Location,
    Architect : req.body.Architect,
    GST : req.body.GST,
    Source : req.body.Source,
    Solutions: req.body.Solutions,
    Discount : req.body.Discount,
    Advance : req.body.Advance,
    FinalAmount : req.body.FinalAmount,
    GrandTotal : req.body.GrandTotal,
    TempCharge: req.body.TempCharge,
    Packing : req.body.Packing,
    Freight : req.body.Freight,
    OtherCharges : req.body.OtherCharges, 
    Status : req.body.Status,
    Active : req.body.Active,
    Completed : req.body.Completed,
    CreationDate :  req.body.CreationDate,
    EditDate : req.body.EditDate,
    WinDate : req.body.WinDate,
    Associate : req.body.Associate,
    ProjectManager : req.body.ProjectManager,
    TotalSquareFeet : req.body.TotalSquareFeet,
    CSValue : req.body.CSValue,
    CompletionDate : req.body.CompletionDate,
    DateCreated : req.body.DateCreated,
    CommercialWinDate : req.body.CommercialWinDate,
    HandOverDate : req.body.HandOverDate,
    LedgerDetails : req.body.LedgerDetails,
    ProPlan : req.body.ProPlan,
    ProValue : req.body.ProValue,
    Pieces : req.body.Pieces,
    DiscountPercent : req.body.DiscountPercent,
    FreightPercent : req.body.FreightPercent,
    PackingPercent : req.body.PackingPercent,
    OtherChargesPercent : req.body.OtherChargesPercent,
    Insurance : req.body.Insurance,
    InsuranceCost : req.body.InsuranceCost

});


  GlassOrder.updateOne({_id:req.params.id},glassorder).then(result =>{
      res.status(200).json({message : "Update Successful."});
  });

});

//================================================================================

router.put("/updateold/:id", (req, res, next) => { 

    var myquery =  req.params.id 
    var newvalues = { $set : {'Status' : "Edited"}};
    GlassOrder.findByIdAndUpdate(myquery, newvalues, {
      new: true
    }).then(result => {
  
    
      if(result){
        res.status(200).json({
          message: "Order updated successfully.",
          orders : result
      })
  
      }else{
       res.result(404).json({message : "Error in Updating Order"});
      }
      
    });
           
});

router.post("/createnew", (req, res, next) => {

   var NewOrder = req.body.NewOrder;
   var OldOrder = req.body.OldOrder;
   var Userid = req.body.UserID;
   var Profile = req.body.Profile;

  
   

 
 

    const glassorder = new GlassOrder({
    
      WaltzOrderNo : NewOrder.WaltzOrderNo,
      OrderNo : NewOrder.OrderNo,
      ProjectName : NewOrder.ProjectName,
      ClientName : NewOrder.ClientName,
      Location : NewOrder.Location,
      Architect : NewOrder.Architect,
      GST : NewOrder.GST,
      Source : NewOrder.Source,
      Solutions: NewOrder.Solutions,
      Discount : NewOrder.Discount,
      Advance : NewOrder.Advance,
      FinalAmount : NewOrder.FinalAmount,
      GrandTotal : NewOrder.GrandTotal,
      TempCharge: NewOrder.TempCharge,
      Packing : NewOrder.Packing,
      Freight : NewOrder.Freight,
      OtherCharges : NewOrder.OtherCharges, 
      Status : NewOrder.Status,
      Active : NewOrder.Active,
      Completed : NewOrder.Completed,
      CreationDate :  NewOrder.CreationDate,
      EditDate : NewOrder.EditDate,
      WinDate : NewOrder.WinDate,
      Associate : NewOrder.Associate,
      ProjectManager : NewOrder.ProjectManager,
      TotalSquareFeet : NewOrder.TotalSquareFeet,
      CSValue : NewOrder.CSValue,
      CompletionDate : NewOrder.CompletionDate,
      DateCreated : NewOrder.DateCreated,
      CommercialWinDate : NewOrder.CommercialWinDate,
      HandOverDate : NewOrder.HandOverDate,
      LedgerDetails : NewOrder.LedgerDetails,
      ProPlan : NewOrder.ProPlan,
      ProValue : NewOrder.ProValue,
      Pieces : NewOrder.Pieces,
      DiscountPercent : NewOrder.DiscountPercent,
      FreightPercent : NewOrder.FreightPercent,
      PackingPercent : NewOrder.PackingPercent,
      OtherChargesPercent : NewOrder.OtherChargesPercent,
      Insurance : NewOrder.Insurance,
      InsuranceCost : NewOrder.InsuranceCost
    
    });


    glassorder.save().then(createdOrder =>{
        res.status(201).json({
            message: "Order added successfully.",
            orderId: createdOrder._id
        }); 
        const text = "Saved Successfully"
        return  text;
    });

 

});


//================================Edit when Refresh=================================================

router.get("/:id",(req,res,next)=>{
    GlassOrder.findById(req.params.id).then(glassorder => {
        if(glassorder){
          res.status(200).json(glassorder)

        }else{
         res.status(404).json({message : "Order not found."});

        }
    });
});


//======================================Get Request========================

router.get("/?user",(req,res,next)=>{ 

    
    if(req.query.user!=="ALL")
    {
     GlassOrder.find({Associate:req.query.user})
     .then(documents=>{
      res.status(200).json({
         message: "Orders fetched successfully.",
         orders : documents
      });  
     }); 
   }
 
   if(req.query.user==="ALL")
   {
    GlassOrder.find()
    .then(documents=>{
     res.status(200).json({
        message: "Orders fetched successfully.",
        orders : documents
     });  
    }); 

   }

   

});




//========================================For Changing Win Status And Date

router.put("/win/:id", (req, res, next) => {

  var Users = req.body.Users;
  var LedgerDetails = req.body.LedgerDetail;

  var Userid; 

  
 
  
  for(var i = 0; i<Users.length; i++)
  {

    
    if(Users[i].UserFullName==req.body.Order.Associate)
    {
     
      Userid = Users[i].EmailId
    }

  }

 

  const glassorder = new GlassOrder({
    _id : req.body.Order._id,
    WaltzOrderNo : req.body.Order.WaltzOrderNo,
    OrderNo : req.body.Order.OrderNo,
    ProjectName : req.body.Order.ProjectName,
    ClientName : req.body.Order.ClientName,
    Location : req.body.Order.Location,
    Architect : req.body.Order.Architect,
    GST : req.body.Order.GST,
    Source : req.body.Order.Source,
    Solutions: req.body.Order.Solutions,
    Discount : req.body.Order.Discount,
    Advance : req.body.Order.Advance,
    FinalAmount : req.body.Order.FinalAmount,
    GrandTotal : req.body.Order.GrandTotal,
    TempCharge: req.body.Order.TempCharge,
    Packing : req.body.Order.Packing,
    Freight : req.body.Order.Freight,
    OtherCharges : req.body.Order.OtherCharges, 
    Status : req.body.Order.Status,
    Active : req.body.Order.Active,
    Completed : req.body.Order.Completed,
    CreationDate :  req.body.Order.CreationDate,
    EditDate : req.body.Order.EditDate,
    WinDate : req.body.Order.WinDate,
    Associate : req.body.Order.Associate,
    ProjectManager : req.body.Order.ProjectManager,
    TotalSquareFeet : req.body.Order.TotalSquareFeet,
    CSValue : req.body.Order.CSValue,
    CompletionDate : req.body.Order.CompletionDate,
    DateCreated : req.body.Order.DateCreated,
    CommercialWinDate : req.body.Order.CommercialWinDate,
    HandOverDate : req.body.Order.HandOverDate,
    LedgerDetails : req.body.Order.LedgerDetails,
    ProPlan : req.body.Order.ProPlan,
    ProValue : req.body.Order.ProValue,
    Pieces : req.body.Order.Pieces,
    DiscountPercent : req.body.Order.DiscountPercent,
    FreightPercent : req.body.Order.FreightPercent,
    PackingPercent :  req.body.Order.PackingPercent,
    OtherChargesPercent :  req.body.Order.OtherChargesPercent,
    Insurance : req.body.Order.Insurance,
    InsuranceCost : req.body.Order.InsuranceCost
    

});

  
   
    GlassOrder.updateOne({_id:req.params.id},glassorder).then(result => {

     
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
            partialsDir: path.resolve(__dirname, "views"),
            defaultLayout: false,
          },
          viewPath : path.resolve(__dirname, "views"),
          extName: ".handlebars"
         }
      ));
   
     
 

      var ordercounternumber = '';
      var version;

     

      if(req.body.Order.OrderNo.includes("/V-"))
      {
       let hyphen =  req.body.Order.OrderNo.lastIndexOf("/V-");
       version = req.body.Order.OrderNo.substring(hyphen + 1, req.body.Order.OrderNo.length);
       let tempproref =  req.body.Order.OrderNo.substring(0, hyphen);
       let slash = tempproref.lastIndexOf("/");
       let proref = tempproref.substring(slash + 1, hyphen); 
       ordercounternumber = proref
       
      }
   
      if(!req.body.Order.OrderNo.includes("/V-"))
      {
       let slash =  req.body.Order.OrderNo.lastIndexOf("/");
       let proref = req.body.Order.OrderNo.substring(slash+ 1,  req.body.Order.OrderNo.length);
       ordercounternumber = proref
      }
    
      var MailOrderNumber

      if(version)
      {
        MailOrderNumber = ordercounternumber + "/" + version
      }

      if(!version)
      {
        MailOrderNumber = ordercounternumber
      }
      
      var mailOptions = {
        from : 'it@jbglass.in',
        to :  Userid,
        bcc : 'billing@jbglass.in,accounts1@jbglass.in',
        subject : 'Commercial Hold @ ' + MailOrderNumber + "/" +req.body.Order.ProjectName,
        template : 'winmail',
        context: {
          OrderNo: MailOrderNumber,
          ProjectName : req.body.Order.ProjectName,
          FinAmt  :req.body.Order.FinalAmount,
          Dis  :req.body.Order.Discount,
          GranTot :  req.body.Order.GrandTotal,
          ProjectAss : req.body.Order.Associate,
          OrderSerial : ordercounternumber,
          BillingName : LedgerDetails.BillingName,
          Add1Bil : LedgerDetails.AddressLine1,
          Add2Bil : LedgerDetails.AddressLine2,
          Add3Bil : LedgerDetails.AddressLine3,
          CityBil : LedgerDetails.City,
          StateBil : LedgerDetails.State,
          PinBil : LedgerDetails.Pincode,
          CmType1 : LedgerDetails.CDProfile1,
          Name1 : LedgerDetails.CDName1,
          PhoneNumber1 : LedgerDetails.CDMobile1,
          emailID1 : LedgerDetails.CDEmail1,
          CmType2 : LedgerDetails.CDProfile2,
          Name2 : LedgerDetails.CDName2,
          PhoneNumber2 : LedgerDetails.CDMobile2,
          emailID2 : LedgerDetails.CDEmail2,
          CmType3 : LedgerDetails.CDProfile3,
          Name3 : LedgerDetails.CDName3,
          PhoneNumber3 : LedgerDetails.CDMobile3,
          emailID3 : LedgerDetails.CDEmail3,
          CompConsul  : LedgerDetails.CompanyName,
          WebConsul : LedgerDetails.Website,
          Add1BilConsul : LedgerDetails.AddressLine1Con,
          Add2BilConsul : LedgerDetails.AddressLine2Con,
          Add3BilConsul : LedgerDetails.AddressLine3Con,
          CityBilConsul : LedgerDetails.CityCon,
          StateBilConsul : LedgerDetails.StateCon,
          EmpType1 : LedgerDetails.ConProfile1,
          Name1Emp : LedgerDetails.ConName1,
          PhoneNumber1Emp : LedgerDetails.ConPhone1,
          emailID1Emp : LedgerDetails.ConEmail1,
          EmpType2 : LedgerDetails.ConProfile2,
          Name2Emp : LedgerDetails.ConName2,
          PhoneNumber2Emp : LedgerDetails.ConPhone2,
          emailID2Emp : LedgerDetails.ConEmail2,
          Plan : LedgerDetails.ProPlus,
          plancost : LedgerDetails.ProPlusCost,
          LedgerDetails : req.body.LedgerDetails,
          ProPlan : req.body.ProPlan,
          ProValue : req.body.ProValue,
          Pieces : req.body.Pieces,
          DiscountPercent : req.body.DiscountPercent

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

  
      if(result){
        res.status(200).json({
          message: "Congratulations! on winning the Project",
          orders : result
      })
  
      }else{
       res.result(404).json({message : "Error in Winning the Project"});
      }
      
    });
  

  });
//========================================================================
  router.put("/wincommercial/:id", (req, res, next) => {

    var Users = req.body.Users;
    var Userid;
   
    for(var i = 0; i<Users.length; i++)
    {
   
      if(Users[i].UserFullName==req.body.Order.Associate)
      {
       
        Userid = Users[i].EmailId
      }
  
    }
  
   
  
    const glassorder = new GlassOrder({
      _id : req.body.Order._id,
      WaltzOrderNo : req.body.Order.WaltzOrderNo,
      OrderNo : req.body.Order.OrderNo,
      ProjectName : req.body.Order.ProjectName,
      ClientName : req.body.Order.ClientName,
      Location : req.body.Order.Location,
      Architect : req.body.Order.Architect,
      GST : req.body.Order.GST,
      Source : req.body.Order.Source,
      Solutions: req.body.Order.Solutions,
      Discount : req.body.Order.Discount,
      Advance : req.body.Order.Advance,
      FinalAmount : req.body.Order.FinalAmount,
      GrandTotal : req.body.Order.GrandTotal,
      TempCharge: req.body.Order.TempCharge,
      Packing : req.body.Order.Packing,
      Freight : req.body.Order.Freight,
      OtherCharges : req.body.Order.OtherCharges, 
      Status : req.body.Order.Status,
      Active : req.body.Order.Active,
      Completed : req.body.Order.Completed,
      CreationDate :  req.body.Order.CreationDate,
      EditDate : req.body.Order.EditDate,
      WinDate : req.body.Order.WinDate,
      Associate : req.body.Order.Associate,
      ProjectManager : req.body.Order.ProjectManager,
      TotalSquareFeet : req.body.Order.TotalSquareFeet,
      CSValue : req.body.Order.CSValue,
      CompletionDate : req.body.Order.CompletionDate,
      DateCreated : req.body.Order.DateCreated,
      CommercialWinDate : req.body.Order.CommercialWinDate,
      HandOverDate : req.body.Order.HandOverDate,
      LedgerDetails : req.body.LedgerDetails,
      ProPlan : req.body.ProPlan,
      ProValue : req.body.ProValue,
      Pieces : req.body.Pieces,
      DiscountPercent : req.body.DiscountPercent,
      FreightPercent : req.body.FreightPercent,
      PackingPercent :  req.body.PackingPercent,
      OtherChargesPercent :  req.body.OtherChargesPercent,
      Insurance : req.body.Insurance,
      InsuranceCost : req.body.InsuranceCost
      
  
  });
  
    
     
      GlassOrder.updateOne({_id:req.params.id},glassorder).then(result => {
  
        console.log(result)
  
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
              partialsDir: path.resolve(__dirname, "views2"),
              defaultLayout: false,
            },
            viewPath : path.resolve(__dirname, "views2"),
            extName: ".handlebars"
           }
        ));
     

        var ordercounternumber = '';
        var version;
  
       
  
        if(req.body.Order.OrderNo.includes("/V-"))
        {
         let hyphen =  req.body.Order.OrderNo.lastIndexOf("/V-");
         version = req.body.Order.OrderNo.substring(hyphen + 1, req.body.Order.OrderNo.length);
         let tempproref =  req.body.Order.OrderNo.substring(0, hyphen);
         let slash = tempproref.lastIndexOf("/");
         let proref = tempproref.substring(slash + 1, hyphen); 
         ordercounternumber = proref
         
        }
     
        if(!req.body.Order.OrderNo.includes("/V-"))
        {
         
         let slash =  req.body.Order.OrderNo.lastIndexOf("/");
         let proref = req.body.Order.OrderNo.substring(slash+ 1,  req.body.Order.OrderNo.length);
         ordercounternumber = proref
        }
      
  
        var MailOrderNumber
  
        if(version)
        {
          MailOrderNumber = ordercounternumber + "/" + version
        }
  
        if(!version)
        {
          MailOrderNumber = ordercounternumber
        }
  
        
        var mailOptions = {
          from : 'it@jbglass.in',
          to :   Userid,
          bcc : 'billing@jbglass.in,shashank@jbglass.in,anuj@jbglass.in,gaurav@jbglass.in,waltzpro@jbglass.in,accounts1@jbglass.in',
          subject : 'Win @ ' + MailOrderNumber + "/"+req.body.Order.ProjectName,
          template : 'winmail',
          context: {
            OrderNo: MailOrderNumber,
            ProjectName : req.body.Order.ProjectName,
            Associate :  req.body.Order.Associate,
            OrderSerial : ordercounternumber,
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
  
    
        if(result){
          res.status(200).json({
            message: "Congratulations! on winning the Project",
            orders : result
        })
    
        }else{
         res.result(404).json({message : "Error in Winning the Project"});
        }
        
      });
    
    
    
  
    });



//========================================================================
//========================================================================
router.put("/handoverorder/:id", (req, res, next) => {

  var Users = req.body.Users;

  var Userid;
 
  

 
  
  for(var i = 0; i<Users.length; i++)
  {

    
    if(Users[i].UserFullName==req.body.Order.Associate)
    {
     
      Userid = Users[i].EmailId
    }

  }

 

  const glassorder = new GlassOrder({
    _id : req.body.Order._id,
    WaltzOrderNo : req.body.Order.WaltzOrderNo,
    OrderNo : req.body.Order.OrderNo,
    ProjectName : req.body.Order.ProjectName,
    ClientName : req.body.Order.ClientName,
    Location : req.body.Order.Location,
    Architect : req.body.Order.Architect,
    GST : req.body.Order.GST,
    Source : req.body.Order.Source,
    Solutions: req.body.Order.Solutions,
    Discount : req.body.Order.Discount,
    Advance : req.body.Order.Advance,
    FinalAmount : req.body.Order.FinalAmount,
    GrandTotal : req.body.Order.GrandTotal,
    TempCharge: req.body.Order.TempCharge,
    Packing : req.body.Order.Packing,
    Freight : req.body.Order.Freight,
    OtherCharges : req.body.Order.OtherCharges, 
    Status : req.body.Order.Status,
    Active : req.body.Order.Active,
    Completed : req.body.Order.Completed,
    CreationDate :  req.body.Order.CreationDate,
    EditDate : req.body.Order.EditDate,
    WinDate : req.body.Order.WinDate,
    Associate : req.body.Order.Associate,
    ProjectManager : req.body.Order.ProjectManager,
    ProjectID : req.body.Order.ProjectID,
    OfficeID : req.body.Order.OfficeID,
    TotalSquareFeet : req.body.Order.TotalSquareFeet,
    CSValue : req.body.Order.CSValue,
    CompletionDate : req.body.Order.CompletionDate,
    DateCreated : req.body.Order.DateCreated,
    CommercialWinDate : req.body.Order.CommercialWinDate,
    HandOverDate : req.body.Order.HandOverDate,
    LedgerDetails : req.body.Order.LedgerDetails,
    ProPlan : req.body.Order.ProPlan,
    ProValue : req.body.Order.ProValue,
    Pieces : req.body.Order.Pieces,
    DiscountPercent : req.body.Order.DiscountPercent,
    FreightPercent : req.body.Order.FreightPercent,
    PackingPercent :  req.body.Order.PackingPercent,
    OtherChargesPercent :  req.body.Order.OtherChargesPercent,
    Insurance : req.body.Order.Insurance,
    InsuranceCost : req.body.Order.InsuranceCost
    

});

  
   
    GlassOrder.updateOne({_id:req.params.id},glassorder).then(result => {

      console.log(result)

      if(result){
        res.status(200).json({
          message: " The Project is Handover",
          orders : result
      })
  
      }else{
       res.result(404).json({message : "Error in Handingover the Project"});
      }
      
    });
  
  
  

  });  
 

//============================Push Solutions=================================

router.post("/pushsolutions/:id", (req, res, next) => {

 
  var Sols = req.body

  var myquery =  req.params.id 
  var newvalues = { $set : {'Solutions' : Sols}};
  GlassOrder.findByIdAndUpdate(myquery, newvalues, {
    new: true
  }).then(result => {

  
    if(result){
      res.status(200).json({
        message: "Order updated successfully.",
        orders : result
    })

    }else{
     res.result(404).json({message : "Error in Updating Order"});
    }
    
  });



         
});




//===============================================================================================


//================================================================================================
module.exports = router;
