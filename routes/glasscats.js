const express = require("express");

const router = express.Router();

var Glasscat = require('../models/glasscat');

//=========================post request========


//========================Posting System===============================

router.post("", (req, res, next) => {
 
    const glasscat = new Glasscat({

        GlassCategory : req.body.GlassCategory,
        GlassSubCategory : req.body.GlassSubCategory,
        DateCreated : req.body.DateCreated

    });


    glasscat.save().then(createdGlassCat =>{
        res.status(201).json({
            message: "Glass Category added successfully.",
            glasscatId: createdGlassCat._id
        });
        const text = "Saved Successfully"
        return  text;
    });
});



//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    Glasscat.find()
    .then(documents=>{
     res.status(200).json({
         message: "Glass Category fetched successfully.",
         glasscats : documents
     });  
    }); 
});


//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    Glasscat.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "Glass Category deleted."
          });

    });
   
});

//===============================Put/Edit Request=================================


router.put("/:id", (req, res, next) => {
  
    const glasscat = new Glasscat({
        _id : req.body._id,  
        GlassCategory : req.body.GlassCategory,
        GlassSubCategory : req.body.GlassSubCategory,
        DateCreated : req.body.DateCreated

    });
  

    Glasscat.updateOne({_id:req.params.id},glasscat).then(result =>{
        res.status(200).json({message : "Update Successful."});
    });
  
});



//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{
    Glasscat.findById(req.params.id).then(glasscat => {
        if(glasscat){
          res.status(200).json(glasscat)

        }else{
         res.status(404).json({message : "Glass Category not found."});
        }
    });
});


module.exports = router;
