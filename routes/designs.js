const express = require("express");

const router = express.Router();

var Design = require('../models/design');


//=====================Post Request=====================

router.post("", (req, res, next) => {

    const design = new Design({

        Design  : req.body.Design,
        DateCreated : req.body.DateCreated

    });


    design.save().then(createddesign =>{
        res.status(201).json({
            message: "design added successfully.",
            designId: createddesign._id
        });
        const text = "Saved Successfully"
        return  text;
    });
});




//=========================================================================

//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    Design.find()
    .then(documents=>{
     res.status(200).json({
         message: "designs fetched successfully.",
         designs : documents
     });  
    }); 
});
//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    Design.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "Design deleted."
          });

    });
   
});

//===============================Put/Edit Request=================================


router.put("/:id", (req, res, next) => {
 
    const design = new Design({
        _id : req.body._id,   
        Design : req.body.Design,
        DateCreated : req.body.DateCreated

    });
  

    Design.updateOne({_id:req.params.id},design).then(result =>{
        res.status(200).json({message : "Update Successful."});

    });

});


//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{
    Design.findById(req.params.id).then(design => {
        if(design){
          res.status(200).json(design)

        }else{
         res.status(404).json({message : "Design not found."});

        }
    });
});


 
module.exports = router;