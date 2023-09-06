const express = require("express");
const framefinish = require("../models/framefinish");

const router = express.Router();

var Framefinish = require('../models/framefinish');

//=========================post request========


//========================Posting System===============================

router.post("", (req, res, next) => {
 
    const framefinish = new Framefinish({

        FrameFinish : req.body.FrameFinish,
        Color : req.body.Color,
        DateCreated : req.body.DateCreated

    });


    framefinish.save().then(createdFramefinish =>{
        res.status(201).json({
            message: "Frame finish added successfully.",
            framefinishId: createdFramefinish._id
        });
        const text = "Saved Successfully"
        return  text;
    });  
 
});



//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    Framefinish.find()
    .then(documents=>{
     res.status(200).json({
         message: "Glass Category fetched successfully.",
         framefinishes : documents
     });  
    }); 
});


//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    Framefinish.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "Framefinish deleted."
          });

    });
   
});

//===============================Put/Edit Request=================================


router.put("/:id", (req, res, next) => {

    const framefinish = new Framefinish({
        _id : req.body._id,  
        FrameFinish : req.body.FrameFinish,
        Color : req.body.Color,
        DateCreated : req.body.DateCreated

    });
  

    Framefinish.updateOne({_id:req.params.id},framefinish).then(result =>{
        res.status(200).json({message : "Update Successful."});
    });

});



//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{
    Framefinish.findById(req.params.id).then(framefinish => {
        if(framefinish){
          res.status(200).json(framefinish)

        }else{
         res.status(404).json({message : "Frame finish not found."});
        }
    });
});


module.exports = router;
