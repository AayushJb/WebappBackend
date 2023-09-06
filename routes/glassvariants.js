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
    cb(error,"glassvariants")
    }, 
    filename : (req,file,cb)=>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,name + '-'+Date.now()+'.'+ext);
    }
});

var Glassvarient = require('../models/glassvariant');


//=====================Post Request=====================

router.post("", multer({storage:storage}).single("image"),(req, res, next) => {

    const url = req.protocol + '://' + req.get("host");

    const glassvariant = new Glassvarient({

        GlassVariantModel : req.body.GlassVariantModel,
        GlassPrintName : req.body.GlassPrintName,
        MinThick : req.body.MinThick,
        MaxThick : req.body.MaxThick,
        Matte : req.body.Matte,
        MatteCost : req.body.MatteCost,
        MaxHeight : req.body.MaxHeight,
        MaxWidth : req.body.MaxWidth,
        Price : req.body.Price,
        imagePath : url + "/glassvariants/" + req.file.filename,
        Temperable : req.body.Temperable,
        Status : req.body.Status,
        Label : req.body.Label,
        WriteUp : req.body.WriteUp,
        DateCreated : req.body.DateCreated  

    });


    glassvariant.save().then(createdGlassvarient =>{
        res.status(201).json({
            message: "Glass Variant added successfully.",
            glassvariant : {
                _id : createdGlassvarient._id,
                GlassVariantModel : createdGlassvarient.GlassVariantModel,
                GlassPrintName : createdGlassvarient.GlassPrintName,
                MinThick : createdGlassvarient.MinThick,
                MaxThick : createdGlassvarient.MaxThick,
                Matte : createdGlassvarient.Matte,
                MatteCost : createdGlassvarient.MatteCost,
                MaxHeight : createdGlassvarient.MaxHeight,
                MaxWidth : createdGlassvarient.MaxWidth,
                Price : createdGlassvarient.Price,
                imagePath : createdGlassvarient.imagePath,
                Temperable : createdGlassvarient.Temperable,
                Status : createdGlassvarient.Status,
                Label : createdGlassvarient.Label,
                WriteUp : createdGlassvarient.WriteUp,
                DateCreated : createdGlassvarient.DateCreated 
               
            }
        });
        const text = "Saved Successfully"
        return  text;
    }); 
  
   
});

//=========================================================================

//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    Glassvarient.find()
    .then(documents=>{
     res.status(200).json({
         message: "Colors fetched successfully.",
         glassvariants : documents
     });  
    }); 
});
//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    Glassvarient.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "Glass Varient deleted."
          });

    });
   
});

//===============================Put/Edit Request=================================


router.put("/:id",multer({storage:storage}).single("image"), (req, res, next) => {
    
    let imagePath =req.body.imagePath;
    if(req.file){
   
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/glassvariants/" + req.file.filename
         
    }
    const glassvariant = new Glassvarient({
        _id : req.body._id, 
        GlassVariantModel : req.body.GlassVariantModel,
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
        WriteUp : req.body.WriteUp,
        DateCreated : req.body.DateCreated 

    });
  

    Glassvarient.updateOne({_id:req.params.id},glassvariant).then(result =>{
        res.status(200).json({message : "Update Successful."});

    });
});


//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{
    Glassvarient.findById(req.params.id).then(glassvariant => {
        if(glassvariant){
          res.status(200).json(glassvariant)

        }else{
         res.status(404).json({message : "Glass Variant not found."});

        }
    });
});


 
module.exports = router;
