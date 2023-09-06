const express = require("express");
const ledgerdetail = require("../models/ledgerdetail");
const nodemail = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');

const router = express.Router();
var LedgerDetail = require('../models/ledgerdetail');
const path = require('path')



//=====================Post Request=====================

router.post("", (req, res, next) => {

    const ledgerdetail = new LedgerDetail({
        OrderId : req.body.OrderId,
        OrderNumber :req.body.OrderNumber,
        BillingName : req.body.BillingName,
        AddressLine1 : req.body.AddressLine1,
        AddressLine2: req.body.AddressLine2,
        AddressLine3: req.body.AddressLine3,
        City: req.body.City,
        State: req.body.State,
        Pincode: req.body.Pincode,
        CDProfile1: req.body.CDProfile1,
        CDName1: req.body.CDName1,
        CDMobile1: req.body.CDMobile1,
        CDEmail1: req.body.CDEmail1,
        CDProfile2: req.body.CDProfile2,
        CDName2: req.body.CDName2,
        CDMobile2: req.body.CDMobile2,
        CDEmail2: req.body.CDEmail2,
        CDProfile3: req.body.CDProfile3,
        CDName3: req.body.CDName3,
        CDMobile3: req.body.CDMobile3,
        CDEmail3: req.body.CDEmail3,
        CompanyName: req.body.CompanyName,
        Website: req.body.Website,
        AddressLine1Con: req.body.AddressLine1Con,
        AddressLine2Con: req.body.AddressLine2Con,
        AddressLine3Con: req.body.AddressLine3Con,
        CityCon: req.body.CityCon,
        StateCon: req.body.StateCon,
        PincodeCon: req.body.PincodeCon,
        ConProfile1: req.body.ConProfile1,
        ConName1: req.body.ConName1,
        ConPhone1: req.body.ConPhone1,
        ConEmail1: req.body.ConEmail1,
        ConProfile2: req.body.ConProfile2,
        ConName2: req.body.ConName2,
        ConPhone2: req.body.ConPhone2,
        ConEmail2: req.body.ConEmail2,
        ProPlus: req.body.ProPlus,
        ProPlusCost: req.body.ProPlusCost

    
      
    })
    
        ledgerdetail.save().then(createdLedger =>{
            res.status(201).json({
                message: "Ledger Details added successfully.",
                ledgerId: createdLedger._id
            });
            const text = "Saved Ledger Successfully"
            return  text;
        });

});


//=========================================================================

//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    LedgerDetail.find()
    .then(documents=>{
     res.status(200).json({
         message: "Ledger Details fetched successfully.",
         ledgerdetails : documents
     });  
    }); 
});
router.get("/getorder",(req,res,next)=>{
  
    LedgerDetail.find({OrderNumber : req.query.ordernumber})
    .then(documents=>{
     res.status(200).json({
         message: "Ledger details fetched successfully.",
         ledgerdetails : documents
     });  
    }); 

});

//================================Get By ID=================================================
router.get("/:id",(req,res,next)=>{
    LedgerDetail.findById(req.params.id).then(ledgerdetail => {
        if(ledgerdetail){
          res.status(200).json(ledgerdetail)

        }else{
         res.status(404).json({message : "LedgerDetail not found."});

        }
    });
});




router.post("/newledgermail",(req,res,next)=>{


  
  
    var transporter = nodemail.createTransport({
        service : 'gmail',
        auth : {
          user : 'it@jbglass.in',
          pass : 'pandey@121188'
        }
      }); 
  



      transporter.use('compile', hbs(
        {
          viewEngine : 
          {
            extName: ".handlebars",
            partialsDir: path.resolve(__dirname, "views3"),
            defaultLayout: false,
          },
          viewPath : path.resolve(__dirname, "views3"),
          extName: ".handlebars"
         }
      ));


      var mailOptions = {
        from : 'it@jbglass.in',
        to :  'it@jbglass.in',
        subject : 'NEW ARCHITECT',
        template : 'ledgermail',
        context: {
            CompanyName: req.body.CompanyName,
            Website: req.body.Website,
            AddressLine1Con: req.body.AddressLine1Con,
            AddressLine2Con: req.body.AddressLine2Con,
            AddressLine3Con: req.body.AddressLine3Con,
            CityCon: req.body.CityCon,
          
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



});





 
module.exports = router;
