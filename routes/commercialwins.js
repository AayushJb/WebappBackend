const express = require("express");


const router = express.Router();

var CommercialWin = require('../models/commercialwin');


//=====================Post Request=====================

router.post("", (req, res, next) => {

    const commercialwin= new CommercialWin({
        
        OrderId : req.body.OrderId,
        OrderNo : req.body.OrderNo,
        Invoice : req.body.Invoice,
        Amount : req.body.Amount,
        Percent : req.body.Percent,
        Type : req.body.Type,
        Remark : req.body.Remark 
    });


    commercialwin.save().then(createdCommercialWin =>{
        res.status(201).json({
            message: "Win details added successfully.",
            commercialwinId: createdCommercialWin._id
        });
        const text = "Saved Successfully"
        return  text;
    });
});



router.get("",(req,res,next)=>{ 
    CommercialWin.find()
    .then(documents=>{
     res.status(200).json({
         message: "CommercialWins fetched successfully.",
         commercialwins : documents
     });  
    }); 
});


 
module.exports = router;
