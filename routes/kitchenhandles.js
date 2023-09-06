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
    cb(error,"kitchenhandles")
    }, 
    filename : (req,file,cb)=>{ 
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,name + '-'+Date.now()+'.'+ext);
    }
});

var KitchenHandle = require('../models/kitchenhandle');


//=====================Post Request=====================

router.post("", multer({storage:storage}).single("image"),(req, res, next) => {

   
 
        const url = req.protocol + '://' + req.get("host");

            const kitchenhandle = new KitchenHandle({

                HandleName : req.body.HandleName,
                HandlePositions : req.body.HandlePositions,
                imagePath : url + "/kitchenhandles/" + req.file.filename,
                DateCreated : req.body.DateCreated              
        
            });

  
            kitchenhandle.save().then(createdPosition =>{
                res.status(201).json({
                    message: "Kitchen Handle added successfully.",
                    kitchenhandles : {
                        _id : createdPosition._id,
                        HandleName : createdPosition.HandleName,
                        HandlePositions :  createdPosition.HandlePositions,
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
    KitchenHandle.find()
    .then(documents=>{
     res.status(200).json({
         message: "Kitchen Handle fetched successfully.",
         kitchenhandles : documents
     });  
    }); 
});
//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    KitchenHandle.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "Kitchen Handle deleted."
          });

    });
   
});

//===============================Put/Edit Request=================================


router.put("/:id",multer({storage:storage}).single("image"), (req, res, next) => {
    
    let imagePath =req.body.imagePath;
    if(req.file){
   
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/kitchenhandles/" + req.file.filename
         
    }
    
    const kitchenhandle = new KitchenHandle({
        _id : req.body._id,   
        HandleName : req.body.HandleName,
        HandlePositions :  req.body.HandlePositions,
        imagePath : imagePath,
        DateCreated : req.body.DateCreated

    });
  

    KitchenHandle.updateOne({_id:req.params.id},kitchenhandle).then(result =>{
        res.status(200).json({message : "Update Successful."});

    });


});


//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{
    KitchenHandle.findById(req.params.id).then(kitchenhandle => {
        if(kitchenhandle){
          res.status(200).json(kitchenhandle)

        }else{
         res.status(404).json({message : "Kitchen Handle not found."});

        }
    });
});


 
module.exports = router;
