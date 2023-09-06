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
    cb(error,"drawings")
    }, 
    filename : (req,file,cb)=>{ 
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,name + '-'+Date.now()+'.'+ext);
    }
});

var Drawing = require('../models/drawing');


//=====================Post Request=====================

router.post("", multer({storage:storage}).single("image"),(req, res, next) => {

   
 
        const url = req.protocol + '://' + req.get("host");

            const drawing = new Drawing({

                DrawingName : req.body.DrawingName,
                HandleType : req.body.HandleType,
                HandlePosition : req.body.HandlePosition,
                HingePosition : req.body.HingePosition,
                imagePath : url + "/drawings/" + req.file.filename,
                Price : req.body.Price,
                AdditionalPrice : req.body.AdditionalPrice,
                DateCreated : req.body.DateCreated              
        
            });

  
            drawing.save().then(createdDrawing =>{
                res.status(201).json({
                    message: "Drawing added successfully.",
                    drawings : {
                        _id : createdDrawing._id,
                        DrawingName : createdDrawing.DrawingName,
                        HandleType : createdDrawing.HandleType,
                        HandlePosition : createdDrawing.HandlePosition,
                        HingePosition : createdDrawing.HingePosition,
                        imagePath : createdDrawing.imagePath,
                        Price : createdDrawing.Price,
                        AdditionalPrice : createdDrawing.AdditionalPrice,
                        DateCreated : createdDrawing.DateCreated
                       
                    }
                });
                const text = "Saved Successfully"
                return  text;
            });
  
});

//=========================================================================

//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    Drawing.find()
    .then(documents=>{
     res.status(200).json({
         message: "drawings fetched successfully.",
         drawings : documents
     });  
    }); 
});
//===============================Delete Request=============================

router.delete("/:id",(req,res,next)=>{
    Drawing.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "Drawing deleted."
          });

    });
   
});

//===============================Put/Edit Request=================================


router.put("/:id",multer({storage:storage}).single("image"), (req, res, next) => {
    
    let imagePath =req.body.imagePath;
    if(req.file){
   
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/drawings/" + req.file.filename
         
    }
    


    const drawing = new Drawing({  
        _id : req.body._id,   
        DrawingName : req.body.DrawingName,
        HandleType : req.body.HandleType,
        HandlePosition : req.body.HandlePosition,
        HingePosition : req.body.HingePosition,
        imagePath : imagePath,
        Price : req.body.Price,
        AdditionalPrice : req.body.AdditionalPrice,
        DateCreated : req.body.DateCreated              

    });
  

    Drawing.updateOne({_id:req.params.id},drawing).then(result =>{
        res.status(200).json({message : "Update Successful."});

    });


});


//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{
    Drawing.findById(req.params.id).then(drawing => {
        if(drawing){
          res.status(200).json(drawing)

        }else{
         res.status(404).json({message : "Drawing not found."});

        }
    });
});


 
module.exports = router;
