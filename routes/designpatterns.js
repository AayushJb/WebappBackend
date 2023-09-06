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
    cb(error,"designpatterns")
    }, 
    filename : (req,file,cb)=>{ 
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,name + '-'+Date.now()+'.'+ext);
    }
});

var DesignPattern = require('../models/designpattern');


//=====================Post Request=====================

router.post("", multer({storage:storage}).fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }])
,(req, res, next) => {

   
    const url = req.protocol + '://' + req.get("host");

    const designpattern = new DesignPattern({
          
        System : req.body.System,
        SubSystem : req.body.SubSystem,
        SystemType : req.body.SystemType,
        Orientation : req.body.Orientation,
        SubOrientation : req.body.SubOrientation,
        GridType : req.body.GridType,
        Design : req.body.Design,
        DesignPatternName : req.body.DesignPatternName,
        DesignPatternCode : req.body.DesignPatternCode,
        Color :  req.body.Color,
        GlassFinishCount : req.body.GlassFinishCount,
        GLOnePercent : req.body.GLOnePercent,
        GLTwoPercent : req.body.GLTwoPercent,
        DesignPatternCost : req.body.DesignPatternCost,
        Status : req.body.Status,
        MinGlassHeight : req.body.MinGlassHeight,
        MinGlassWidth : req.body.MinGlassWidth,
        ParamOne : req.body.ParamOne,
        ParamTwo : req.body.ParamTwo,
        ParamThree : req.body.ParamThree,
        ParamFour : req.body.ParamFour,
        ParamFive : req.body.ParamFive,
        imageRIpath : url + "/designpatterns/" + req.files['image1'][0].filename,
        imagePSEpath : url + "/designpatterns/" + req.files['image2'][0].filename,
        imageExtrapath : url + "/designpatterns/" + req.files['image3'][0].filename,
        DateCreated : req.body.DateCreated             

    });


    designpattern.save().then(createddesignpattern =>{
        res.status(201).json({
            message: "designpattern added successfully.",
            designpattern : {

                _id : createddesignpattern._id,
                System : createddesignpattern.System,
                SubSystem : createddesignpattern.SubSystem,
                SystemType : createddesignpattern.SystemType,
                Orientation : createddesignpattern.Orientation,
                SubOrientation : createddesignpattern.SubOrientation,
                GridType : createddesignpattern.GridType,
                Design : createddesignpattern.Design,
                DesignPatternName : createddesignpattern.DesignPatternName,
                DesignPatternCode : createddesignpattern.DesignPatternCode,
                Color :  createddesignpattern.Color,
                GlassFinishCount : createddesignpattern.GlassFinishCount,
                GLOnePercent : createddesignpattern.GLOnePercent,
                GLTwoPercent : createddesignpattern.GLTwoPercent,
                DesignPatternCost : createddesignpattern.DesignPatternCost,
                Status : createddesignpattern.Status,
                MinGlassHeight : createddesignpattern.MinGlassHeight,
                MinGlassWidth : createddesignpattern.MinGlassWidth,
                ParamOne : createddesignpattern.ParamOne,
                ParamTwo : createddesignpattern.ParamTwo,
                ParamThree : createddesignpattern.ParamThree,
                ParamFour : createddesignpattern.ParamFour,
                ParamFive : createddesignpattern.ParamFive,
                imageRIpath : createddesignpattern.imageRIpath,
                imagePSEpath : createddesignpattern.imagePSEpath,
                imageExtrapath : createddesignpattern.imageExtrapath,
                DateCreated : createddesignpattern.DateCreated 
               
            }
        });
        const text = "Saved Successfully"
        return  text;
    });
});

//=========================================================================

//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    DesignPattern.find()
    .then(documents=>{
     res.status(200).json({
         message: "Design Patterns fetched successfully.",
         designpatterns : documents
     });  
    }); 
});
//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    DesignPattern.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "Design Pattern deleted."
          });

    });
   
});

//===============================Put/Edit Request=================================


router.put("/:id",multer({storage:storage}).fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }])
, (req, res, next) => {
    
 


   let imageRIpath = req.body.imageRIpath;
   let imagePSEpath =  req.body.imagePSEpath;
   let imageExtrapath =  req.body.imageExtrapath;
  

    if(req.file){
   
        const url = req.protocol + '://' + req.get("host");
        
        imageRIpath = url + "/designpatterns/" + req.files['image1'][0].filename
        imagePSEpath = url + "/designpatterns/" + req.files['image2'][0].filename
        imageExtrapath = url + "/designpatterns/" + req.files['image3'][0].filename   
         
    }
  
       

            const designpattern = new DesignPattern({

                _id : req.body._id,
                System : req.body.System,
                SubSystem : req.body.SubSystem,
                SystemType : req.body.SystemType,
                Orientation : req.body.Orientation,
                SubOrientation : req.body.SubOrientation,
                GridType : req.body.GridType,
                Design : req.body.Design,
                DesignPatternName : req.body.DesignPatternName,
                DesignPatternCode : req.body.DesignPatternCode,
                Color :  req.body.Color,
                GlassFinishCount : req.body.GlassFinishCount,
                GLOnePercent : req.body.GLOnePercent,
                GLTwoPercent : req.body.GLTwoPercent,
                DesignPatternCost : req.body.DesignPatternCost,
                Status : req.body.Status,
                MinGlassHeight : req.body.MinGlassHeight,
                MinGlassWidth : req.body.MinGlassWidth,
                ParamOne : req.body.ParamOne,
                ParamTwo : req.body.ParamTwo,
                ParamThree : req.body.ParamThree,
                ParamFour : req.body.ParamFour,
                ParamFive : req.body.ParamFive,
                imageRIpath : imageRIpath,
                imagePSEpath : imagePSEpath,
                imageExtrapath : imageExtrapath,
                DateCreated : req.body.DateCreated    

        
            });
          

            DesignPattern.updateOne({_id:req.params.id},designpattern).then(result =>{
                res.status(200).json({message : "Update Successful."});

            });
        
    
});


//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{
    DesignPattern.findById(req.params.id).then(designpattern => {
        if(designpattern){
          res.status(200).json(designpattern)

        }else{
         res.status(404).json({message : "designpattern not found."});

        }
    });
});




 
module.exports = router;
