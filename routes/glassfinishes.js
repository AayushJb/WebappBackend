const express = require("express");
const multer = require("multer");


const router = express.Router();
const  MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg'
};

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mimetype") ;
    if(isValid){
        error = null;
    }  
    cb(error,"glassfinishes")
    }, 
    filename : (req,file,cb)=>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,name + '-'+Date.now()+'.'+ext);
    }
});

var Glassfinish = require('../models/glassfinish');


//=====================Post Request=====================

router.post("", multer({storage:storage}).single("image"),(req, res, next) => {
   
    {
            
        const url = req.protocol + '://' + req.get("host");

        const glassfinish = new Glassfinish({

            GlassModel : req.body.GlassModel,
            GlassPrintName : req.body.GlassPrintName,
            MinThick : req.body.MinThick,
            MaxThick : req.body.MaxThick,
            Matte : req.body.Matte,
            MatteCost : req.body.MatteCost,
            MaxHeight : req.body.MaxHeight,
            MaxWidth : req.body.MaxWidth,
            Price : req.body.Price,
            imagePath : url + "/glassfinishes/" + req.file.filename,
            Temperable : req.body.Temperable,
            Status : req.body.Status,
            Label : req.body.Label,
            GlassVariants : req.body.GlassVariants,
            WriteUp : req.body.WriteUp,
            DateCreated : req.body.DateCreated  
    
        });


        glassfinish.save().then(createdGlassfinish =>{
            res.status(201).json({
                message: "Glass Finish added successfully.",
                glassfinish : {
                    _id : createdGlassfinish._id,
                    GlassModel : createdGlassfinish.Model,
                    GlassPrintName : createdGlassfinish.GlassPrintName,
                    MinThick : createdGlassfinish.MinThick,
                    MaxThick : createdGlassfinish.MaxThick,
                    Matte : createdGlassfinish.Matte,
                    MatteCost : createdGlassfinish.MatteCost,
                    MaxHeight : createdGlassfinish.MaxHeight,
                    MaxWidth : createdGlassfinish.MaxWidth,
                    Price : createdGlassfinish.Price,
                    imagePath : createdGlassfinish.imagePath,
                    Temperable : createdGlassfinish.Temperable,
                    Status : createdGlassfinish.Status,
                    Label : createdGlassfinish.Label,
                    GlassVariants : createdGlassfinish.GlassVariants,
                    WriteUp : createdGlassfinish.WriteUp,
                    DateCreated : createdGlassfinish.DateCreated 
                   
                }
            });
            const text = "Saved Successfully"
            return  text;
        });
    }


});

//=========================================================================

//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    Glassfinish.find()
    .then(documents=>{
     res.status(200).json({
         message: "Glasses fetched successfully.",
         glassfinishes : documents
     });  
    }); 
});
//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    Glassfinish.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "Glass deleted."
          });

    });
   
});

//===============================Put/Edit Request=================================


router.put("/:id",multer({storage:storage}).single("image"), (req, res, next) => {
    
    let imagePath =req.body.imagePath;
    if(req.file){
   
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/glassfinishes/" + req.file.filename
         
    }
   
    const glassfinish = new Glassfinish({
        _id : req.body._id,
        GlassModel : req.body.GlassModel,
        GlassPrintName : req.body.GlassPrintName,
        MinThick : req.body.MinThick,
        MaxThick : req.body.MaxThick,
        Matte : req.body.Matte,
        MatteCost : req.body.MatteCost,
        MaxHeight : req.body.MaxHeight,
        MaxWidth : req.body.MaxWidth,
        Price : req.body.Price,
        imagePath : imagePath,
        Temperable : req.body.Temperable,
        Status : req.body.Status,
        Label : req.body.Label,
        GlassVariants : req.body.GlassVariants,
        WriteUp : req.body.WriteUp,
        DateCreated : req.body.DateCreated 

    });
  

    Glassfinish.updateOne({_id:req.params.id},glassfinish).then(result =>{
        res.status(200).json({message : "Update Successful."});

    });



});


//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{
    Glassfinish.findById(req.params.id).then(glassfinish => {
        if(glassfinish){
          res.status(200).json(glassfinish)

        }else{
         res.status(404).json({message : "Glass not found."});

        }
    });
});


 
module.exports = router;
