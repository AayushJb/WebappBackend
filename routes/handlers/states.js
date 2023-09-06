const express = require("express");

const router = express.Router();

var Subsystem = require('../models/subsystem.js');


//=====================Post Request=====================

router.post("", (req, res, next) => {

    const subsystem = new Subsystem({

        SubSystem : req.body.SubSystem,
        DateCreated : req.body.DateCreated

    });


    subsystem.save().then(createdSubsystem =>{
        res.status(201).json({
            message: "Post added successfully.",
            subsystemId: createdSubsystem._id
        });
        const text = "Saved Successfully"
        return  text;
    });
});




//=========================================================================

//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    Subsystem.find()
    .then(documents=>{
     res.status(200).json({
         message: "Subsystems fetched successfully.",
         subsystems : documents
     });  
    }); 
});
//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    Subsystem.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "Subsystem deleted."
          });

    });
   
});

//===============================Put/Edit Request=================================


router.put("/:id", (req, res, next) => {
 
    const subsystem = new Subsystem({
        _id : req.body._id,   
        SubSystem : req.body.SubSystem,
        DateCreated : req.body.DateCreated

    });
  

    Subsystem.updateOne({_id:req.params.id},subsystem).then(result =>{
        res.status(200).json({message : "Update Successful."});

    });

});


//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{
    Subsystem.findById(req.params.id).then(subsystem => {
        if(subsystem){
          res.status(200).json(subsystem)

        }else{
         res.status(404).json({message : "Subsystem not found."});

        }
    });
});


 
module.exports = router;
