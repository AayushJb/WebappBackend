const express = require("express");
const multer = require("multer");

const router = express.Router();

var FullGlassVarient = require('../models/fullglassvars');


//=====================Post Request=====================


//=========================================================================

//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    FullGlassVarient.find()
    .then(documents=>{
     res.status(200).json({
         message: "Glass Full fetched successfully.",
         glassfullvariants : documents
     });  
    }); 
});
//===============================Delete Request=============================


//===============================Put/Edit Request=================================




module.exports = router;
