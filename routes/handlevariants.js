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
    cb(error,"handlevariants")
    }, 
    filename : (req,file,cb)=>{ 
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,name + '-'+Date.now()+'.'+ext);
    }
});

var Handlevariant = require('../models/handlevariant');


//=====================Post Request=====================

router.post("", multer({storage:storage}).single("image"),(req, res, next) => {

   
 
        const url = req.protocol + '://' + req.get("host");

            const handlevariant = new Handlevariant({

                HandleVariant : req.body.HandleVariant,
                Price : req.body.Price,
                Color : req.body.Color,
                imagePath : url + "/handlevariants/" + req.file.filename,
                DateCreated : req.body.DateCreated              
        
            });

  
            handlevariant.save().then(createdHandlevariant =>{
                res.status(201).json({
                    message: "Handlevariant added successfully.",
                    handlevariant : {
                        _id : createdHandlevariant._id,
                        HandleVariant : createdHandlevariant.HandleVariant,
                        Price : createdHandlevariant.Price,
                        Color : createdHandlevariant.Color,
                        imagePath : createdHandlevariant.imagePath,
                        DateCreated : createdHandlevariant.DateCreated
                       
                    }
                });
                const text = "Saved Successfully"
                return  text;
            });
  
});

//=========================================================================

//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    Handlevariant.find()
    .then(documents=>{
     res.status(200).json({
         message: "Handle Variants fetched successfully.",
         handlevariants : documents
     });  
    }); 
});
//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    Handlevariant.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "Handle Variant deleted."
          });

    });
   
});

//===============================Put/Edit Request=================================


router.put("/:id",multer({storage:storage}).single("image"), (req, res, next) => {
    
    let imagePath =req.body.imagePath;
    if(req.file){
   
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/handlevariants/" + req.file.filename
         
    }
    
    const handlevariant = new Handlevariant({
        _id : req.body._id,   
        HandleVariant : req.body.HandleVariant,
        Price : req.body.Price,
        Color : req.body.Color,
        imagePath : imagePath,
        DateCreated : req.body.DateCreated

    });
  

    Handlevariant.updateOne({_id:req.params.id},handlevariant).then(result =>{
        res.status(200).json({message : "Update Successful."});

    });


});


//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{
    Handlevariant.findById(req.params.id).then(handlevariant => {
        if(handlevariant){
          res.status(200).json(handlevariant)

        }else{
         res.status(404).json({message : "Handlevariant not found."});

        }
    });
});


 
module.exports = router;
