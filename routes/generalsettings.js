const express = require("express");

const router = express.Router();

var GeneralSetting = require('../models/generalsetting');

//=========================post request========


//========================Posting System===============================


//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{

    GeneralSetting.findById(req.params.id).then(setting => {
        if(setting){
          res.status(200).json(setting)

        }else{
         res.status(404).json({message : "Settings not found."});
        }
    });
});


router.put("/:id", (req, res, next) => {


  const generalsetting = new GeneralSetting({
    _id : req.body._id,   
    Counter: req.body.Counter,
    Prefix : req.body.Prefix,
    Factor : req.body.Factor,
    GridCost : req.body.GridCost,
    DoorCloserCost : req.body.DoorCloserCost,
    DropSealCost : req.body.DropSealCost,
    GlassFactor : req.body.GlassFactor,
    GlassCounter :   req.body.GlassCounter,
    GlassCategoryCounter : req.body.GlassCategoryCounter,
    GlassSubCategoryCounter : req.body.GlassSubCategoryCounter,
    GlassVariantCounter : req.body.GlassVariantCounter

});

 GeneralSetting.updateOne({_id:req.params.id},generalsetting).then(result =>{
   res.status(200).json({message : "Update Successful."});
 });
    
});



router.put("/counter/:id", (req, res, next) => {
  
  var myquery =  req.params.id 
  var newvalues = { $inc : {'Counter' : 1}};
  GeneralSetting.findByIdAndUpdate(myquery, newvalues, {
    new: false
  }).then(result => {

    if(result){
      res.status(200).json({
        message: "Counter updated successfully.",
        generalsettings : result
    })

    }else{
     res.result(404).json({message : "Error in Updating Counter"});
    }
    
  });

    
});

router.put("/glasscounter/:id", (req, res, next) => {
  
  var myquery =  req.params.id 
  var newvalues = { $inc : {'GlassCounter' : 1}};
  GeneralSetting.findByIdAndUpdate(myquery, newvalues, {
    new: false
  }).then(result => {

    if(result){
      res.status(200).json({
        message: "Counter updated successfully.",
        generalsettings : result
    })

    }else{
     res.result(404).json({message : "Error in Updating Counter"});
    }
    
  });

    
});




module.exports = router;
