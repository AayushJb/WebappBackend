const express = require("express");

const router = express.Router();

var Systemtype = require('../models/systemtype.js');

//========================Posting System Type===============================

router.post("", (req, res, next) => {

    const systemtype = new Systemtype({

        SystemType : req.body.SystemType,
        DateCreated : req.body.DateCreated

    });


    systemtype.save().then(createdSystemtype =>{
        res.status(201).json({
            message: "Post added successfully.",
            systemtypeId: createdSystemtype._id
        });
        const text = "Saved Successfully"
        return  text;
    });
 
   
});



//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    Systemtype.find()
    .then(documents=>{
     res.status(200).json({
         message: "SystemTypes fetched successfully.",
         systemtypes : documents
     });  
    }); 
});
//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    Systemtype.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "Systemtype deleted."
          });

    });
   
});


//===============================Put/Edit Request=================================


router.put("/:id", (req, res, next) => {

    
    const systemtype = new Systemtype({
        _id : req.body._id,   
        SystemType : req.body.SystemType,
        DateCreated : req.body.DateCreated

    });
  

    Systemtype.updateOne({_id:req.params.id},systemtype).then(result =>{
        res.status(200).json({message : "Update Successful."});

    });
});



router.get("/:id",(req,res,next)=>{
    Systemtype.findById(req.params.id).then(systemtype => {
        if(systemtype){
          res.status(200).json(systemtype)
          
        }else{
         res.status(404).json({message : "Systemtype not found."});

        }
    });
});


 
module.exports = router;

