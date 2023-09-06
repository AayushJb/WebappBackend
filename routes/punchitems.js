const express = require("express");

const router = express.Router();

const PunchItemData = require('../models/punchitem')

//=========================post request========

router.get("",(req,res,next)=>{ 
 
 
    
      
   
        PunchItemData.find()
        .then(documents=>{
         res.status(200).json({
             message: "Orders fetched successfully.",
             punchitems : documents
         });  
        }); 
       
    
    
    
    });


//========================Posting System===============================




module.exports = router;
