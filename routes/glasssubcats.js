const express = require("express");
const glasssubcat = require("../models/glasssubcat.js");

const router = express.Router();

var Glasssubcat = require('../models/glasssubcat.js');


//=====================Post Request=====================

router.post("", (req, res, next) => {

    const glasssubcat= new Glasssubcat({

        GlassSubCategory : req.body.GlassSubCategory,
        GlassFinish : req.body.GlassFinish,
        GlassSubCategoryCost : req.body.GlassSubCategoryCost,
        DateCreated : req.body.DateCreated

    });


    glasssubcat.save().then(createdGlasssubcat =>{
        res.status(201).json({
            message: "Post added successfully.",
            glasssubcatId: createdGlasssubcat._id
        });
        const text = "Saved Successfully"
        return  text;
    });
});



//=========================================================================

//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    Glasssubcat.find()
    .then(documents=>{
     res.status(200).json({
         message: "glasssubcategory fetched successfully.",
         glasssubcats : documents
     });  
    }); 
});
//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    Glasssubcat.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "Glass sub category deleted."
          });

    });
   
});

//===============================Put/Edit Request=================================


router.put("/:id", (req, res, next) => {
    const glasssubcat = new Glasssubcat({
        _id : req.body._id,   
        GlassSubCategory : req.body.GlassSubCategory,
        GlassFinish : req.body.GlassFinish,
        GlassSubCategoryCost : req.body.GlassSubCategoryCost,
        DateCreated : req.body.DateCreated

    });
  

    Glasssubcat.updateOne({_id:req.params.id},glasssubcat).then(result =>{
        res.status(200).json({message : "Update Successful."});

    });

});



//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{
    Glasssubcat.findById(req.params.id).then(glasssubcat => {
        if(glasssubcat){
          res.status(200).json(glasssubcat)
          
        }else{
         res.status(404).json({message : "GlassSubCategory not found."});

        }
    });
});


 
module.exports = router;
