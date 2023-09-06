const express = require("express");
const router = express.Router();

var Company = require('../models/company');


//=========================Post request for saving new user===========

router.post("", (req, res, next) => {

    const company = new Company({

        CompanyName : req.body.CompanyName,
        Profile : req.body.Profile,
        AddressLine : req.body.AddressLine,
        Location : req.body.Location,
        AddressLineThree : req.body.AddressLineThree,
        City : req.body.City,
        State : req.body.State,
        Country : req.body.Country,
        Source : req.body.Source,
        Associate : req.body.Associate
    })

    company.save().then(createdCompany =>{
       return res.status(201).json({
            message: "Company created successfully",
            company: createdCompany
        });

       
     });  
    

});


//========================Getting Users===============================

router.get("",(req,res,next)=>{ 
    Company.find()
    .then(documents=>{
     res.status(200).json({
         message: "Companies fetched successfully.",
         companies : documents
     });  
    }); 
});


//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{

    Company.findById(req.params.id).then(company => {
        if(company){
          res.status(200).json(company)

        }else{
         res.status(404).json({message : "Company not found."});
        }
    });
});



//============================Update Users===========================================================


router.put("/:id", (req, res, next) => {

// ==================TRY UNIQUE VALIDATOR BY MONGOOSE===================!!!!
   const company = new Company({

    CompanyName : req.body.CompanyName,
    Profile : req.body.Profile,
    AddressLine : req.body.AddressLine,
    Location : req.body.Location,
    AddressLineThree : req.body.AddressLineThree,
    City : req.body.City,
    State : req.body.State,
    Country : req.body.Country,
    Source : req.body.Source,
    Associate : req.body.Associate

   })
 

  Company.updateOne({_id:req.params.id},company).then(result =>{
   res.status(200).json({message : "Update Successful."});
   });
    
});

module.exports = router;
