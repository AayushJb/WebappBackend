const express = require("express");
const router = express.Router();


var Grid = require('../models/grid');

const multer = require("multer");
 
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
    cb(error,"grids")
    }, 
    filename : (req,file,cb)=>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,name + '-'+Date.now()+'.'+ext);
    }
});


//=====================Post Request=====================

router.post("", multer({storage:storage}).single("image"),(req, res, next) => {

    const url = req.protocol + '://' + req.get("host");

    const grid = new Grid({

    GridName : req.body.GridName.toUpperCase(),
    Design :  req.body.Design,
    Price : req.body.Price,
    Status : req.body.Status,
    GlassNumber : req.body.GlassNumber,
    GLOnePercent : req.body.GLOnePercent,
    imagePath : url + "/grids/" + req.file.filename,
    DateCreated : req.body.DateCreated,
      
    });


    grid.save().then(createdGrid =>{
       
        res.status(201).json({
        
            message: "Grid added successfully.",
            grids : {
                _id : createdGrid._id,
               GridName : createdGrid.GridName,
               Design :  createdGrid.Design,
               Price : createdGrid.Price,
               Status : createdGrid.Status,
               GlassNumber : createdGrid.GlassNumber,
               GLOnePercent : createdGrid.GLOnePercent,
               imagePath : createdGrid.imagePath,
               DateCreated : createdGrid.DateCreated    
            }
        });
        const text = "Saved Successfully"
        return  text;
    });
});

//=========================================================================

//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    Grid.find()
    .then(documents=>{
     res.status(200).json({
         message: "Grids fetched successfully.",
         grids : documents
     });  
    }); 
});
//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    Grid.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "Grid deleted."
          });

    });
   
});

//===============================Put/Edit Request=================================


router.put("/:id",multer({storage:storage}).single("image"), (req, res, next) => {
    
    let imagePath =req.body.imagePath;
    if(req.file){
   
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/grids/" + req.file.filename
         
    }

 
    const grid = new Grid({
        _id : req.body._id,   
        GridName : req.body.GridName.toUpperCase(),
        Design :  req.body.Design,
        Price : req.body.Price,
        Status : req.body.Status,
        GlassNumber : req.body.GlassNumber,
        GLOnePercent : req.body.GLOnePercent,
        imagePath : imagePath,
        DateCreated : req.body.DateCreated  

    });
  

    Grid.updateOne({_id:req.params.id},grid).then(result =>{
        res.status(200).json({message : "Update Successful."});

    });
});


//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{
   
    Grid.findById(req.params.id).then(grid => {
        if(grid){
          res.status(200).json(grid)

        }else{
         res.status(404).json({message : "Grid not found."});

        }
    });
});


 
module.exports = router;