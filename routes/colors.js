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
    cb(error,"colors")
    }, 
    filename : (req,file,cb)=>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,name + '-'+Date.now()+'.'+ext);
    }
});

var Color = require('../models/color');


//=====================Post Request=====================

router.post("", multer({storage:storage}).single("image"),(req, res, next) => {

    const url = req.protocol + '://' + req.get("host");

    const color = new Color({

        Color : req.body.Color,
        DateCreated : req.body.DateCreated,
        imagePath : url + "/colors/" + req.file.filename

    });


    color.save().then(createdColor =>{
        res.status(201).json({
            message: "Color added successfully.",
            color : {
                _id : createdColor._id,
                Color : createdColor.Color,
                imagePath : createdColor.imagePath,
                DateCreated : createdColor.DateCreated
               
            }
        });
        const text = "Saved Successfully"
        return  text;
    });
});

//=========================================================================

//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    Color.find()
    .then(documents=>{
     res.status(200).json({
         message: "Colors fetched successfully.",
         colors : documents
     });  
    }); 
});
//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    Color.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "Color deleted."
          });

    });
   
});

//===============================Put/Edit Request=================================


router.put("/:id",multer({storage:storage}).single("image"), (req, res, next) => {
    
    let imagePath =req.body.imagePath;
    if(req.file){
   
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/colors/" + req.file.filename
         
    }


    const color = new Color({
        _id : req.body._id,   
        Color : req.body.Color,
        imagePath : imagePath,
        DateCreated : req.body.DateCreated

    });
  

    Color.updateOne({_id:req.params.id},color).then(result =>{
        res.status(200).json({message : "Update Successful."});

    });
});


//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{


   
    Color.findById(req.params.id).then(color => {
        if(color){
          res.status(200).json(color)

        }else{
         res.status(404).json({message : "Color not found."});

        }
    });
});


 
module.exports = router;
