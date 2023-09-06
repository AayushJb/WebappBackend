const express = require("express");

const router = express.Router();

var System = require('../models/system.js');

//=========================post request========


//========================Posting System===============================

router.post("", (req, res, next) => {

    
    const system = new System({

        System : req.body.System,
        SubSystem : req.body.SubSystem,
        SystemType : req.body.SystemType,
        DateCreated : req.body.DateCreated

    });


    system.save().then(createdSystem =>{
        res.status(201).json({
            message: "System added successfully.",
            systemId: createdSystem._id
        });
        const text = "Saved Successfully"
        return  text;
    });

});



//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    System.find()
    .then(documents=>{
     res.status(200).json({
         message: "Systems fetched successfully.",
         systems : documents
     });  
    }); 
});


//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    System.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "System deleted."
          });

    });
   
});

//===============================Put/Edit Request=================================


router.put("/:id", (req, res, next) => {

    const system = new System({
        _id : req.body._id,  
        System : req.body.System, 
        SubSystem : req.body.SubSystem,
        SystemType : req.body.SystemType,
        DateCreated : req.body.DateCreated

    });
  

    System.updateOne({_id:req.params.id},system).then(result =>{
        res.status(200).json({message : "Update Successful."});
    });
});



//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{
    System.findById(req.params.id).then(system => {
        if(system){
          res.status(200).json(system)

        }else{
         res.status(404).json({message : "System not found."});
        }
    });
});


module.exports = router;
