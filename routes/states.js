const express = require("express");

const router = express.Router();

var State = require('../models/state.js');

//=========================================================================

//======================================Get Request========================

router.get("",(req,res,next)=>{ 
    State.find()
    .then(documents=>{
     res.status(200).json({
         message: "States fetched successfully.",
         states : documents
     });  
    }); 
});





 
module.exports = router;
