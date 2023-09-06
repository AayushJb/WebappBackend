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
    cb(error,"orientations")
    }, 
    filename : (req,file,cb)=>{ 
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,name + '-'+Date.now()+'.'+ext);
    }
});

var Model = require('../models/model');


//=====================Post Request=====================

router.post("", multer({storage:storage}).fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 },{ name: 'image4', maxCount: 1 },{ name: 'image5', maxCount: 1 },{ name: 'image6', maxCount: 1 }])
,(req, res, next) => {

   
    const url = req.protocol + '://' + req.get("host");

    const model = new Model({
        
        System : req.body.System,
        SubSystem : req.body.SubSystem,
        SystemType : req.body.SystemType,
        SOFlag : req.body.SOFlag,
        PrintName : req.body.PrintName,
        SubOrientation : req.body.SubOrientation,
        Orientation : req.body.Orientation,
        GlassFinishes : req.body.GlassFinishes,
        Colors : req.body.Colors,
        Handles : req.body.Handles,
        Grid : req.body.Grid,
        DoorCloser : req.body.DoorCloser,
        DropSeal : req.body.DropSeal,
        Temperable : req.body.Temperable,
        Status : req.body.Status,
        Code : req.body.Code,
        MinThick : req.body.MinThick,
        MaxThick : req.body.MaxThick,
        MinWidth : req.body.MinWidth,
        MaxWidth : req.body.MaxWidth,
        MinHeight : req.body.MinHeight,
        MaxHeight : req.body.MaxHeight,
        ProfileCost : req.body.ProfileCost,
        HardwareCost : req.body.HardwareCost,
        FCost : req.body.FCost,
        Dcost : req.body.Dcost,
        Lock : req.body.Lock,
        imageMRIpath : url + "/orientations/" + req.files['image1'][0].filename,
        imageSORIpath : url + "/orientations/" + req.files['image2'][0].filename,
        imageRIpath : url + "/orientations/" + req.files['image3'][0].filename,
        imagePSEpath : url + "/orientations/" + req.files['image4'][0].filename,
        imageExpath : url + "/orientations/" + req.files['image5'][0].filename,
        imageMSpath : url + "/orientations/" + req.files['image6'][0].filename,
        DateCreated : req.body.DateCreated  
                    

    });


    model.save().then(createdModel =>{
        res.status(201).json({
            message: "Model added successfully.",
            model : {

                _id : createdModel._id,
                System : createdModel.System,
                SubSystem : createdModel.SubSystem,
                SystemType : createdModel.SystemType,
                SOFlag : createdModel.SOFlag,
                PrintName : createdModel.PrintName,
                SubOrientation : createdModel.SubOrientation,
                Orientation : createdModel.Orientation,
                GlassFinishes : createdModel.GlassFinishes,
                Colors : createdModel.Colors,
                Handles : createdModel.Handles,
                Grid : createdModel.Grid,
                DoorCloser : createdModel.DoorCloser,
                DropSeal : createdModel.DropSeal,
                Temperable : createdModel.Temperable,
                Status : createdModel.Status,
                Code : createdModel.Code,
                MinThick : createdModel.MinThick,
                MaxThick : createdModel.MaxThick,
                MinWidth : createdModel.MinWidth,
                MaxWidth : createdModel.MaxWidth,
                MinHeight : createdModel.MinHeight,
                MaxHeight : createdModel.MaxHeight,
                ProfileCost : createdModel.ProfileCost,
                HardwareCost : createdModel.HardwareCost,
                FCost : createdModel.FCost,
                Dcost : createdModel.Dcost,
                Lock : createdModel.Lock,
                imageMRIpath : createdModel.imageMRIpath,
                imageSORIpath : createdModel.imageSORIpath,
                imageRIpath : createdModel.imageRIpath,
                imagePSEpath : createdModel.imagePSEpath,
                imageExpath : createdModel.imageExpath,
                imageMSpath : createdModel.imageMSpath,
                DateCreated :createdModel.DateCreated
               
            }
        });
        const text = "Saved Successfully"
        return  text;
    });
});

//=========================================================================

router.get("/:id",(req,res,next)=>{
    
    Model.findById(req.params.id).then(model => {
        if(model){
          res.status(200).json(model)

        }else{
         res.status(404).json({message : "Model not found."});

        }
    });
});

//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    Model.find()
    .then(documents=>{
     res.status(200).json({
         message: "Model Variants fetched successfully.",
         models : documents
     });  
    }); 
});
//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    Model.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "Model deleted."
          });

    });
   
});

//===============================Put/Edit Request=================================


router.put("/:id",multer({storage:storage}).fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 },{ name: 'image4', maxCount: 1 },{ name: 'image5', maxCount: 1 },{ name: 'image6', maxCount: 1 }])
, (req, res, next) => {
    
  let imageMRIpath =req.body.imageMRIpath;
  let imageSORIpath =req.body.imageSORIpath;
  let imageRIpath =req.body.imageRIpath;
  let imagePSEpath =req.body.imagePSEpath;
  let imageExpath =req.body.imageExpath;
  let imageMSpath =req.body.imageMSpath;
  

    if(req.file){
   
        const url = req.protocol + '://' + req.get("host");
        
        imageMRIpath = url + "/orientations/" + req.files['image1'][0].filename
        imageSORIpath = url + "/orientations/" + req.files['image2'][0].filename
        imageRIpath = url + "/orientations/" + req.files['image3'][0].filename
        imagePSEpath = url + "/orientations/" + req.files['image4'][0].filename
        imageExpath = url + "/orientations/" + req.files['image5'][0].filename
        imageMSpath = url + "/orientations/" + req.files['image6'][0].filename

        
         
    }
    var query = req.body.GlassModel; //Extract title from input form
    
       

            const model = new Model({
                _id : req.body._id,
                System : req.body.System,
                SubSystem : req.body.SubSystem,
                SystemType : req.body.SystemType,
                SOFlag : req.body.SOFlag,
                PrintName : req.body.PrintName,
                SubOrientation : req.body.SubOrientation,
                Orientation : req.body.Orientation,
                GlassFinishes : req.body.GlassFinishes,
                Colors : req.body.Colors,
                Handles : req.body.Handles,
                Grid : req.body.Grid,
                DoorCloser : req.body.DoorCloser,
                DropSeal : req.body.DropSeal,
                Temperable : req.body.Temperable,
                Status : req.body.Status,
                Code : req.body.Code,
                MinThick : req.body.MinThick,
                MaxThick : req.body.MaxThick,
                MinWidth : req.body.MinWidth,
                MaxWidth : req.body.MaxWidth,
                MinHeight : req.body.MinHeight,
                MaxHeight : req.body.MaxHeight,
                ProfileCost : req.body.ProfileCost,
                HardwareCost : req.body.HardwareCost,
                FCost : req.body.FCost,
                Dcost : req.body.Dcost,
                Lock : req.body.Lock,
                imageMRIpath : imageMRIpath ,
                imageSORIpath : imageSORIpath,
                imageRIpath : imageRIpath,
                imagePSEpath : imagePSEpath,
                imageExpath : imageExpath,
                imageMSpath : imageMSpath,
                DateCreated : req.body.DateCreated  

        
            });
          

            Model.updateOne({_id:req.params.id},model).then(result =>{
                res.status(200).json({message : "Update Successful."});

            });
        
    
});


//================================Edit when Refresh=================================================





 
module.exports = router;
