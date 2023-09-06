const express = require("express");

const router = express.Router();

var Solution = require('../models/solution.js');


//=====================Post Request=====================

router.post("", (req, res, next) => {

    const solution = new Solution({

        SolutionNo : req.body.SolutionNo,
        Floor : req.body.Floor,
        Space : req.body.Space,
        System : req.body.System,
        SubSystem : req.body.SubSystem,
        SystemType : req.body.SystemType,
        Orientation : req.body.Orientation,
        SubOrientation : req.body.SubOrientation,
        Grid  : req.body.Grid,
        Width : req.body.Width,
        Height : req.body.Height,
        Quantity : req.body.Quantity,
        Color : req.body.Color,
        GlassCategory : req.body.GlassCategory,
        GlassSubCategory : req.body.GlassSubCategory,
        GlassFinish : req.body.GlassFinish,
        GlassVariant : req.body.GlassVariant,
        Matte : req.body.Matte,
        OuterGlassCategory : req.body.OuterGlassCategory,
        OuterGlassSubCategory : req.body.OuterGlassSubCategory,
        OuterGlassFinish : req.body.OuterGlassFinish,
        OuterGlassVariant : req.body.OuterGlassVariant,
        OuterMatte : req.body.OuterMatte,
        Handle : req.body.Handle,
        HandleVariant : req.body.HandleVariant,
        DoorCloser : req.body.DoorCloser,
        DropSeal : req.body.DropSeal,
        Remarks : req.body.Remarks,
        SystemRemarks : req.body.SystemRemarks,
        Amount : req.body.Amount,
        ProcoreLocationID : req.body.ProcoreLocationID,
        ProcorePunchItemID : req.body.ProcorePunchItemID,
        ProcoreStatus : req.body.ProcoreStatus
    
    });


    solution.save().then(createdSolution =>{
       
        res.status(201).json({
            message: "Solution added successfully.",
            solutionId: createdSolution._id
           
           
        });
       
        const text = "Saved Successfully"
        return  text;
    });
 
});



//=========================================================================

//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    Solution.find()
    .then(documents=>{
     res.status(200).json({
         message: "Solutions fetched successfully.",
         solutions : documents
     });  
    }); 
});

//===============================Put/Edit Request=================================


router.put("/:id", (req, res, next) => {

    const solution = new Solution({

        SolutionNo : req.body.SolutionNo,
        Floor : req.body.Floor,
        Space : req.body.Space,
        System : req.body.System,
        SubSystem : req.body.SubSystem,
        SystemType : req.body.SystemType,
        Orientation : req.body.Orientation,
        SubOrientation : req.body.SubOrientation,
        Grid  : req.body.Grid,
        Width : req.body.Width,
        Height : req.body.Height,
        Quantity : req.body.Quantity,
        Color : req.body.Color,
        GlassCategory : req.body.GlassCategory,
        GlassSubCategory : req.body.GlassSubCategory,
        GlassFinish : req.body.GlassFinish,
        GlassVariant : req.body.GlassVariant,
        Matte : req.body.Matte,
        OuterGlassCategory : req.body.OuterGlassCategory,
        OuterGlassSubCategory : req.body.OuterGlassSubCategory,
        OuterGlassFinish : req.body.OuterGlassFinish,
        OuterGlassVariant : req.body.OuterGlassVariant,
        OuterMatte : req.body.OuterMatte,
        Handle : req.body.Handle,
        HandleVariant : req.body.HandleVariant,
        DoorCloser : req.body.DoorCloser,
        DropSeal : req.body.DropSeal,
        Remarks : req.body.Remarks,
        SystemRemarks : req.body.SystemRemarks,
        Amount : req.body.Amount,
        ProcoreLocationID : req.body.ProcoreLocationID,
        ProcorePunchItemID : req.body.ProcorePunchItemID,
        ProcoreStatus : req.body.ProcoreStatus
    
    });
          

    Solution.updateOne({_id:req.params.id},solution).then(result =>{
                res.status(200).json({message : "Update Successful."});

            });
 
});


//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    Solution.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "Solution deleted."
          });

    });
   
});

//================================Edit when Refresh=================================================

router.get("/:id",(req,res,next)=>{
    Solution.findById(req.params.id).then(solution => {
        if(solution){
          res.status(200).json(solution)

        }else{
         res.status(404).json({message : "Solution not found."});

        }
    });
});


 
module.exports = router;
