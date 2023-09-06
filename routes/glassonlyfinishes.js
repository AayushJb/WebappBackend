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
    cb(error,"glassonlyfinishes")
    }, 
    filename : (req,file,cb)=>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        const prefixes = ['JBTN-', 'JBP-', 'JBAP-'];
        const index = req.fileIndex % prefixes.length;
        const prefix = prefixes[index];


          console.log(prefix +name +'.'+ext)
        cb(null,prefix +name +'.'+ext);
    }
});

router.use((req, res, next) => {
    req.fileIndex = 0;
    next();
  });

var GlassOnlyFinish = require('../models/glassonlyfinish');


router.post("", multer({storage:storage}).fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 },{ name: 'image4', maxCount: 1 }])
,(req, res, next) => {

   
    const url = req.protocol + '://' + req.get("host");

    console.log()

    const glassonlyfinish = new GlassOnlyFinish({

                GlassCategory :req.body.GlassCategory,
                GlassSubCategory :req.body.GlassSubCategory,	 
                GlassFinish :req.body.GlassFinish,
                GlassVariantModel : req.body.GlassVariantModel,
                GlassVariantModelWithThickness : req.body.GlassVariantModelWithThickness,
                Thickness : req.body.Thickness,
                GlassPrintName : req.body.GlassPrintName,
                MinThick : req.body.MinThick,
                MaxThick : req.body.MaxThick,
                Matte : req.body.Matte,
                MatteCost : req.body.MatteCost,
                MaxHeight : req.body.MaxHeight,
                MaxWidth : req.body.MaxWidth,
                Price : req.body.Price,
                Temperable : req.body.Temperable,
                TemperableCost : req.body.TemperableCost,
                Status : req.body.Status,
                Label : req.body.Label,
                Lamination: req.body.Lamination,
                Weigth : req.body. Weigth, 
                LeadTime : req.body.LeadTime,
                imagethumbnailpath : url + "/glassonlyfinishes/JBTN-"+req.body.GlassVariantModel,
                imageorientationpath : url + "/glassonlyfinishes/JBO-"+req.body.GlassVariantModel,
                imageapplicationpath :  url + "/glassonlyfinishes/JBAP-"+req.body.GlassVariantModel,
                imagepotraitpath :  url + "/glassonlyfinishes/JBP-"+req.body.GlassVariantModel,
                WriteUp : req.body.WriteUp,
                DateCreated : req.body.DateCreated  
        
    });


    glassonlyfinish.save().then(createdGlassonly =>{
        res.status(201).json({
            message: "Glassonly added successfully.",
            glassonlyfinish : {

                _id : createdGlassonly._id,
                GlassCategory :createdGlassonly.GlassCategory,
                GlassSubCategory :createdGlassonly.GlassSubCategory,	 
                GlassFinish :createdGlassonly.GlassFinish,
                GlassVariantModel : createdGlassonly.GlassVariantModel,
                GlassVariantModelWithThickness : createdGlassonly.GlassVariantModelWithThickness,
                Thickness : createdGlassonly.Thickness,
                GlassPrintName : createdGlassonly.GlassPrintName,
                MinThick : createdGlassonly.MinThick,
                MaxThick : createdGlassonly.MaxThick,
                Matte : createdGlassonly.Matte,
                MatteCost : createdGlassonly.MatteCost,
                MaxHeight : createdGlassonly.MaxHeight,
                MaxWidth : createdGlassonly.MaxWidth,
                Price : createdGlassonly.Price,
                Temperable : createdGlassonly.Temperable,
                TemperableCost : createdGlassonly.TemperableCost,
                Status : createdGlassonly.Status,
                Label : createdGlassonly.Label,
                Lamination: createdGlassonly.Lamination,
                Weigth : createdGlassonly.Weigth, 
                LeadTime : createdGlassonly.LeadTime,
                imagethumbnailpath : createdGlassonly.imagethumbnailpath,
                imageorientationpath :createdGlassonly.imageorientationpath,
                imageapplicationpath : createdGlassonly.imageapplicationpath,
                imagepotraitpath : createdGlassonly.imagepotraitpath,
                WriteUp : createdGlassonly.WriteUp,
                DateCreated : createdGlassonly.DateCreated  
               
            }
        });
        const text = "Saved Successfully"
        return  text;
    });
});

//===================================================================================================================


router.put("/:id",multer({storage:storage}).fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 },{ name: 'image4', maxCount: 1 }])
, (req, res, next) => {
    


  let imagethumbnailpath = req.body.imagethumbnailpath
  let imageorientationpath =req.body.imageorientationpath
  let imageapplicationpath = req.body.imageapplicationpath
  let imagepotraitpath = req.body.imagepotraitpath
  

    if(req.file){
   
        const url = req.protocol + '://' + req.get("host");

        imagethumbnailpath = url + "/glassonlyfinishes/JBTN-"+req.body.GlassVariantModel
        imageorientationpath = url + "/glassonlyfinishes/JBO-"+req.body.GlassVariantModel
        imageapplicationpath =  url + "/glassonlyfinishes/JBAP-"+req.body.GlassVariantModel
        imagepotraitpath =  url + "/glassonlyfinishes/JBP-"+req.body.GlassVariantModel
        
      
        
         
    }
   
    
       

            const glassonlyfinish = new GlassOnlyFinish({

                _id : req.body._id,
                GlassCategory :req.body.GlassCategory,
                GlassSubCategory :req.body.GlassSubCategory,	 
                GlassFinish :req.body.GlassFinish,
                GlassVariantModel : req.body.GlassVariantModel,
                GlassVariantModelWithThickness : req.body.GlassVariantModelWithThickness,
                Thickness : req.body.Thickness,
                GlassPrintName : req.body.GlassPrintName,
                MinThick : req.body.MinThick,
                MaxThick : req.body.MaxThick,
                Matte : req.body.Matte,
                MatteCost : req.body.MatteCost,
                MaxHeight : req.body.MaxHeight,
                MaxWidth : req.body.MaxWidth,
                Price : req.body.Price,
                Temperable : req.body.Temperable,
                TemperableCost : req.body.TemperableCost,
                Status : req.body.Status,
                Label : req.body.Label,
                Lamination: req.body.Lamination,
                Weigth : req.body. Weigth, 
                LeadTime : req.body.LeadTime,
                imagethumbnailpath : imagethumbnailpath,
                imageorientationpath : imageorientationpath,
                imageapplicationpath : imageapplicationpath ,
                imagepotraitpath :imagepotraitpath,
                WriteUp : req.body.WriteUp,
                DateCreated : req.body.DateCreated  

        
            });
          

            GlassOnlyFinish.updateOne({_id:req.params.id},glassonlyfinish).then(result =>{
                res.status(200).json({message : "Update Successful."});

            });
        
    
});



//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    GlassOnlyFinish.find()
    .then(documents=>{
     res.status(200).json({
         message: "Glasses fetched successfully.",
         glassonlyfinish : documents
     });  
    }); 
});
//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    GlassOnlyFinish.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "Glass deleted."
          });

    });
   
});


//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{

  
    GlassOnlyFinish.findById(req.params.id).then(glassfinish => {
      
        if(glassfinish){
          res.status(200).json(glassfinish)

        }else{
         res.status(404).json({message : "Glass not found."});

        }
    });
});


 
module.exports = router;
