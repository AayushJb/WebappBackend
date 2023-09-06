const express = require("express");
const multer = require("multer");
const kitchenhandleposition = require("../models/kitchenhandleposition");



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
    cb(error,"kitchenhandlepositions")
    }, 
    filename : (req,file,cb)=>{ 
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,name + '-'+Date.now()+'.'+ext);
    }
});

var KitchenHandlePosition = require('../models/kitchenhandleposition');


//=====================Post Request=====================

router.post("", multer({storage:storage}).single("image"),(req, res, next) => {

   
 
        const url = req.protocol + '://' + req.get("host");

            const kitchenhandleposition = new KitchenHandlePosition({

                KitchenHandlePosition : req.body.KitchenHandlePosition,
                Hinge : req.body.Hinge,
                imagePath : url + "/kitchenhandlepositions/" + req.file.filename,
                DateCreated : req.body.DateCreated              
        
            });

  
            kitchenhandleposition.save().then(createdPosition =>{
                res.status(201).json({
                    message: "Kitchen Handle Position added successfully.",
                    kitchenhandleposition : {
                        _id : createdPosition._id,
                        KitchenHandlePosition : createdPosition.KitchenHandlePosition,
                        Hinge :  createdPosition.Hinge,
                        imagePath : createdPosition.imagePath,
                        DateCreated : createdPosition.DateCreated
                       
                    }
                });
                const text = "Saved Successfully"
                return  text;
            });
  
});

//=========================================================================

//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    KitchenHandlePosition.find()
    .then(documents=>{
     res.status(200).json({
         message: "Kitchen Handle Positions fetched successfully.",
         kitchenhandlepositions : documents
     });  
    }); 
});
//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    KitchenHandlePosition.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "Kitchen Handle Position deleted."
          });

    });
   
});

//===============================Put/Edit Request=================================


router.put("/:id",multer({storage:storage}).single("image"), (req, res, next) => {
    
    let imagePath =req.body.imagePath;
    if(req.file){
   
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/kitchenhandlepositions/" + req.file.filename
         
    }
    
    const kitchenhandleposition = new KitchenHandlePosition({
        _id : req.body._id,   
        KitchenHandlePosition : req.body.KitchenHandlePosition,
        Hinge :  req.body.Hinge,
        imagePath : imagePath,
        DateCreated : req.body.DateCreated

    });
  

    KitchenHandlePosition.updateOne({_id:req.params.id},kitchenhandleposition).then(result =>{
        res.status(200).json({message : "Update Successful."});

    });


});


//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{
    KitchenHandlePosition.findById(req.params.id).then(kitchenhandleposition => {
        if(kitchenhandleposition){
          res.status(200).json(kitchenhandleposition)

        }else{
         res.status(404).json({message : "Kitchen Handle Position not found."});

        }
    });
});


 
module.exports = router;
