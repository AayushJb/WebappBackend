const express = require("express");

const router = express.Router();
var SiteDetail = require('../models/sitedetail');


//=====================Post Request=====================

router.post("", (req, res, next) => {

    const sitedetail = new SiteDetail({
       
        
        OrderNumber : req.body.OrderNumber, 
        ContactPerson : req.body.ContactPerson, 
        Phone : req.body.Phone, 
        AddressLineOne : req.body.AddressLineOne, 
        AddressLineTwo : req.body.AddressLineTwo, 
        AddressLineThree : req.body.AddressLineThree, 
        City : req.body.City, 
        State : req.body.State, 
        Pincode : req.body.Pincode, 
        DeliveryDate : req.body.DeliveryDate, 
        InvoiceNumber : req.body.InvoiceNumber, 
        Panels : req.body.Panels, 
        Boxes : req.body.Boxes, 
        Glasses : req.body.Glasses, 
        Remarks : req.body.Remarks

      
    })
    
        sitedetail.save().then(createdDetails =>{
            res.status(201).json({
                message: "Site Details added successfully.",
                sitedetailsId: createdDetails._id
            });
            const text = "Saved Site Details Successfully"
            return  text;
        });

});


//=========================================================================

//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    SiteDetail.find()
    .then(documents=>{
     res.status(200).json({
         message: "Site Details fetched successfully.",
         sitedetails : documents
     });  
    }); 
});

//=========================================================================================

router.put("/:id", (req, res, next) => {
  
    const sitedetails = new SiteDetail({
        _id : req.params.id,
        OrderNumber : req.body.OrderNumber, 
        ContactPerson : req.body.ContactPerson, 
        Phone : req.body.Phone, 
        AddressLineOne : req.body.AddressLineOne, 
        AddressLineTwo : req.body.AddressLineTwo, 
        AddressLineThree : req.body.AddressLineThree, 
        City : req.body.City, 
        State : req.body.State, 
        Pincode : req.body.Pincode, 
        DeliveryDate : req.body.DeliveryDate, 
        InvoiceNumber : req.body.InvoiceNumber, 
        Panels : req.body.Panels, 
        Boxes : req.body.Boxes, 
        Glasses : req.body.Glasses, 
        Remarks : req.body.Remarks
  
  });
  
 
  
    SiteDetail.updateOne({_id:req.params.id},sitedetails).then(result =>{
        res.status(200).json({message : "Update Successful."});
    });
  
  });
  


//================================Get By ID=================================================
router.get("/:id",(req,res,next)=>{
    SiteDetail.findById(req.params.id).then(sitedetail => {
        if(sitedetail){
          res.status(200).json(sitedetail)

        }else{
         res.status(404).json({message : "SiteDetail not found."});

        }
    });
});


 
module.exports = router;