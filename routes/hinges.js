const express = require("express");
const multer = require("multer");



const router = express.Router();
const  MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg'
};



//test
const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mimetype") ;
    if(isValid){
        error = null;
    }  
    cb(error,"hinges")
    }, 
    filename : (req,file,cb)=>{ 
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,name + '-'+Date.now()+'.'+ext);
    }
});

var Hinge = require('../models/hinge');


//=====================Post Request=====================

router.post("", multer({storage:storage}).single("image"),(req, res, next) => {

   
 
        const url = req.protocol + '://' + req.get("host");

            const hinge = new Hinge({

                HingeName : req.body.HingeName,
                imagePath : url + "/hinges/" + req.file.filename,
                DateCreated : req.body.DateCreated              
        
            });

  
            hinge.save().then(createdHinge =>{
                res.status(201).json({
                    message: "Hinge added successfully.",
                    hinge : {
                        _id : createdHinge._id,
                        HingeName : createdHinge.HingeName,
                        imagePath : createdHinge.imagePath,
                        DateCreated : createdHinge.DateCreated
                       
                    }
                });
                const text = "Saved Successfully"
                return  text;
            });
  
});

//=========================================================================

//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    Hinge.find()
    .then(documents=>{
     res.status(200).json({
         message: "Hinges fetched successfully.",
         hinges : documents
     });  
    }); 
});
//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    Hinge.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "Hinge deleted."
          });

    });
   
});

//===============================Put/Edit Request=================================


router.put("/:id",multer({storage:storage}).single("image"), (req, res, next) => {
    
    let imagePath =req.body.imagePath;
    if(req.file){
   
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/hinges/" + req.file.filename
         
    }
    
    const hinge = new Hinge({
        _id : req.body._id,   
        HingeName : req.body.HingeName,
        imagePath : imagePath,
        DateCreated : req.body.DateCreated

    });
  

    Hinge.updateOne({_id:req.params.id},hinge).then(result =>{
        res.status(200).json({message : "Update Successful."});

    });


});


//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{
    Hinge.findById(req.params.id).then(hinge => {
        if(hinge){
          res.status(200).json(hinge)

        }else{
         res.status(404).json({message : "Hinge not found."});

        }
    });
});


 
module.exports = router;
