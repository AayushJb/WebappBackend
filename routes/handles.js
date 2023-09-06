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
    cb(error,"handles")
    }, 
    filename : (req,file,cb)=>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,name + '-'+Date.now()+'.'+ext);
    }
});

var Handle = require('../models/handle');


//=====================Post Request=====================

router.post("", multer({storage:storage}).single("image"),(req, res, next) => {

    const url = req.protocol + '://' + req.get("host");

    const handle = new Handle({

        Handle : req.body.Handle,
        Price : req.body.Price,
        Color : req.body.Color,
        HandleVariant : req.body.HandleVariant,
        imagePath : url + "/handles/" + req.file.filename,
        DateCreated : req.body.DateCreated  

    });


    handle.save().then(createdHandle =>{
        res.status(201).json({
            message: "Handle added successfully.",
            handle : {
                _id : createdHandle._id,
                Handle : createdHandle.Handle,
                Price : createdHandle.Price,
                Color : createdHandle.Color,
                HandleVariant : createdHandle.HandleVariant,
                imagePath : createdHandle.imagePath,
                DateCreated : createdHandle.DateCreated 
               
            }
        });
        const text = "Saved Successfully"
        return  text;
    });  
 
});

//=========================================================================

//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    Handle.find()
    .then(documents=>{
     res.status(200).json({
         message: "Handles fetched successfully.",
         handles : documents
     });  
    }); 
});
//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    Handle.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "handle deleted."
          });

    });
   
});

//===============================Put/Edit Request=================================


router.put("/:id",multer({storage:storage}).single("image"), (req, res, next) => {
    
    let imagePath =req.body.imagePath;
    if(req.file){
   
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/handles/" + req.file.filename
         
    }
    const handle = new Handle({
        _id : req.body._id,
        Handle : req.body.Handle,
        Price : req.body.Price,
        Color : req.body.Color,
        HandleVariant : req.body.HandleVariant,
        imagePath : imagePath,
        DateCreated : req.body.DateCreated
    });
  

    Handle.updateOne({_id:req.params.id},handle).then(result =>{
        res.status(200).json({message : "Update Successful."});

    });
});


//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{
    Handle.findById(req.params.id).then(handle => {
        if(handle){
          res.status(200).json(handle)

        }else{
         res.status(404).json({message : "Handle not found."});

        }
    });
});


 
module.exports = router;
