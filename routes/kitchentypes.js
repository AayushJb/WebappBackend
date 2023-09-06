const express = require("express");
const multer = require("multer");

var KitchenType = require('../models/kitchentype');

//=========================post request========
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
    cb(error,"kitchentypes")
    }, 
    filename : (req,file,cb)=>{ 
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,name + '-'+Date.now()+'.'+ext);
    }
});


//========================Posting System===============================

router.post("", multer({storage:storage}).single("image"),(req, res, next) => {

    const url = req.protocol + '://' + req.get("host");
    
    const kitchentype = new KitchenType({
        SolutionType : req.body.SolutionType,
        KitchenTypeName : req.body.KitchenTypeName,
        KitchenHandles : req.body.KitchenHandles,
        Colors : req.body.Colors,
        GlassFinish : req.body.GlassFinish,
        imagePath : url + "/kitchenhandles/" + req.file.filename,
        DateCreated : req.body.DateCreated

    });


    kitchentype.save().then(createdKitchen =>{
        res.status(201).json({
            message: "Kitchen added successfully.",
            kitchentypes : {
                _id : createdKitchen._id,
                SolutionType : createdKitchen.SolutionType,
                KitchenTypeName : createdKitchen.KitchenTypeName,
                KitchenHandles : createdKitchen.KitchenHandles,
                Colors : createdKitchen.Colors,
                GlassFinish : createdKitchen.GlassFinish,
                imagePath : createdKitchen.imagePath,
                DateCreated : createdKitchen.DateCreated
               
            }
           
        });
        const text = "Saved Successfully"
        return  text;
    });

});



//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    KitchenType.find()
    .then(documents=>{
     res.status(200).json({
         message: "Kitchens fetched successfully.",
         kitchentypes : documents
     });  
    }); 
});


//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    KitchenType.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "Kitchen Type deleted."
          });

    });
   
});

//===============================Put/Edit Request=================================


router.put("/:id",multer({storage:storage}).single("image"), (req, res, next) => {
    
    let imagePath =req.body.imagePath;
    if(req.file){
   
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/kitchentypes/" + req.file.filename
         
    }

    const kitchentype = new KitchenType({
        _id : req.body._id, 
        SolutionType : req.body.SolutionType, 
        KitchenTypeName : req.body.KitchenTypeName,
        KitchenHandles : req.body.KitchenHandles,
        Colors : req.body.Colors,
        GlassFinish : req.body.GlassFinish,
        imagePath : imagePath,
        DateCreated : req.body.DateCreated

    });

  
  

    KitchenType.updateOne({_id:req.params.id},kitchentype).then(result =>{
        res.status(200).json({message : "Update Successful."});
    });
});



//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{
    KitchenType.findById(req.params.id).then(kitchentype => {
        if(kitchentype){
          res.status(200).json(kitchentype)

        }else{
         res.status(404).json({message : "Kitchen Type not found."});
        }
    });
});


module.exports = router;
