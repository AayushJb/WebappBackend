const express = require("express");


const router = express.Router();

var Handover = require('../models/handover');


//=====================Post Request=====================

router.post("", (req, res, next) => {

    const handover= new Handover({

        OrderId : req.body.OrderId,
        OrderNo : req.body.OrderNo,
        Party : req.body.Party,
        Expense : req.body.Expense,
        ExpensePercent :  req.body.ExpensePercent,
        OutStanding : req.body.OutStanding,
        OutStandingPercent : req.body.OutStandingPercent,
        Billed : req.body.Billed,
        SpecialDiscount :  req.body.SpecialDiscount,
        BadDebt :  req.body.BadDebt,
        ReceiptAdvance : req.body.ReceiptAdvance,
        ChequeRequired : req.body.ChequeRequired,
        Type : req.body.Type,
        Remark : req.body.Remark
    });


    handover.save().then(createdHandover =>{
        res.status(201).json({
            message: "Handover details added successfully.",
            handoverId: createdHandover._id
        });
        const text = "Saved Successfully"
        return  text;
    });
});



router.get("",(req,res,next)=>{ 
    Handover.find()
    .then(documents=>{
     res.status(200).json({
         message: "Handover fetched successfully.",
         handovers : documents
     });  
    }); 
});
 
module.exports = router;