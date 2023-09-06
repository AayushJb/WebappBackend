const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

var User = require('../models/user.js');


//=========================Post request for saving new user===========

router.post("", (req, res, next) => {


 /*   
   bcrypt.hash(req.body.Password,10).then(hash =>{

    const user = new User({

        UserName : req.body.UserName, 
        Password : hash, 
        UserFullName : req.body.UserFullName, 
        Profile : req.body.Profile, 
        Associate : req.body.Associate, 
        Code : req.body.Code, 
        AssociatedSince : req.body.AssociatedSince, 
        Address : req.body.Address, 
        PhoneNo : req.body.PhoneNo, 
        EmailId : req.body.EmailId, 
        BeneficiaryName : req.body.BeneficiaryName, 
        AccountNo : req.body.AccountNo, 
        IfscCode : req.body.IfscCode, 
        Swift : req.body.Swift, 
        MaxDiscount : req.body.MaxDiscount, 
        Status : req.body.Status, 
        ProjectManager :  req.body.ProjectManager, 
        Freight :  req.body.Freight, 
        DealerDiscount :  req.body.DealerDiscount, 
        ProcoreOfficeID : req.body.ProcoreOfficeID,
        DateCreated : req.body.DateCreated

    });

    user.save().then(createdUser =>{
        res.status(201).json({
            message: "User added successfully.",
            userId: createdUser._id
        });
        const text = "Saved Successfully"
        return  text;
    }).catch(err =>{
        res.status(500).json({
            error : err
        });
    });

   });
   
*/


const user = new User({

    UserName : req.body.UserName, 
    Password : req.body.Password, 
    UserFullName : req.body.UserFullName, 
    Profile : req.body.Profile, 
    GlassOnly : req.body.GlassOnly, 
    Chargeable : req.body.Chargeable, 
    TempCharge : req.body.TempCharge, 
    Packing : req.body.Packing, 
    FreightGlass : req.body.FreightGlass, 
    OtherCharge : req.body.OtherCharge, 
    GST : req.body.GST, 
    Associate : req.body.Associate, 
    Code : req.body.Code, 
    AssociatedSince : req.body.AssociatedSince, 
    Address : req.body.Address, 
    PhoneNo : req.body.PhoneNo, 
    EmailId : req.body.EmailId, 
    BeneficiaryName : req.body.BeneficiaryName, 
    AccountNo : req.body.AccountNo, 
    IfscCode : req.body.IfscCode, 
    Swift : req.body.Swift, 
    MaxDiscount : req.body.MaxDiscount, 
    Status : req.body.Status, 
    ProjectManager :  req.body.ProjectManager, 
    Freight :  req.body.Freight, 
    DealerDiscount :  req.body.DealerDiscount, 
    ProcoreOfficeID : req.body.ProcoreOfficeID,
    DateCreated : req.body.DateCreated

});

user.save().then(createdUser =>{
    res.status(201).json({
        message: "User added successfully.",
        userId: createdUser._id
    });
    const text = "Saved Successfully"
    return  text;
}).catch(err =>{
    res.status(500).json({
        error : err
    });
});

    

});




//========================Getting Users===============================

router.get("",(req,res,next)=>{ 
    User.find()
    .then(documents=>{
     res.status(200).json({
         message: "Users fetched successfully.",
         users : documents
     });  
    }); 
});


//================================Edit when Refresh=================================================
router.get("/:id",(req,res,next)=>{
    User.findById(req.params.id).then(user => {
        if(user){
          res.status(200).json(user)
          
        }else{
         res.status(404).json({message : "User not found."});

        }
    });
});





//===============================Deleting User======================================================

router.delete("/:id",(req,res,next)=>{
    User.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "User deleted."
          });

    });
   
});

//============================Update Users===========================================================
router.put("/:id", (req, res, next) => {


    const user = new User({
        _id : req.body._id, 
        UserName : req.body.UserName, 
        Password : req.body.Password, 
        UserFullName : req.body.UserFullName, 
        Profile : req.body.Profile,
        GlassOnly : req.body.GlassOnly, 
        Chargeable : req.body.Chargeable, 
        TempCharge : req.body.TempCharge, 
        Packing : req.body.Packing, 
        FreightGlass : req.body.FreightGlass, 
        OtherCharge : req.body.OtherCharge, 
        GST : req.body.GST,
        Associate : req.body.Associate, 
        Code : req.body.Code, 
        AssociatedSince : req.body.AssociatedSince, 
        Address : req.body.Address, 
        PhoneNo : req.body.PhoneNo, 
        EmailId : req.body.EmailId, 
        BeneficiaryName : req.body.BeneficiaryName, 
        AccountNo : req.body.AccountNo, 
        IfscCode : req.body.IfscCode, 
        Swift : req.body.Swift, 
        MaxDiscount : req.body.MaxDiscount, 
        Status : req.body.Status, 
        ProjectManager :  req.body.ProjectManager, 
        Freight :  req.body.Freight, 
        DealerDiscount :  req.body.DealerDiscount, 
        ProcoreOfficeID : req.body.ProcoreOfficeID,
        DateCreated : req.body.DateCreated

    });

  
    User.updateOne({_id:req.params.id},user).then(result =>{
        res.status(200).json({message : "Update Successful."});

      });
/*
    bcrypt.hash(req.body.Password,10).then(hash =>{

        const user = new User({
            _id : req.body._id, 
            UserName : req.body.UserName, 
            Password : req.body.Password, 
            UserFullName : req.body.UserFullName, 
            Profile : req.body.Profile, 
            Associate : req.body.Associate, 
            Code : req.body.Code, 
            AssociatedSince : req.body.AssociatedSince, 
            Address : req.body.Address, 
            PhoneNo : req.body.PhoneNo, 
            EmailId : req.body.EmailId, 
            BeneficiaryName : req.body.BeneficiaryName, 
            AccountNo : req.body.AccountNo, 
            IfscCode : req.body.IfscCode, 
            Swift : req.body.Swift, 
            MaxDiscount : req.body.MaxDiscount, 
            Status : req.body.Status, 
            ProjectManager :  req.body.ProjectManager, 
            Freight :  req.body.Freight, 
            DealerDiscount :  req.body.DealerDiscount, 
            ProcoreOfficeID : req.body.ProcoreOfficeID,
            DateCreated : req.body.DateCreated
    
        });
    
      
        User.updateOne({_id:req.params.id},user).then(result =>{
            res.status(200).json({message : "Update Successful."});

          });

       });
 
*/

// ==================TRY UNIQUE VALIDATOR BY MONGOOSE===================!!!!

});


//===================================Authentication Routes=====================================
/*
router.post("/login",(req,res,next)=>{
    let fetchedUser;

    User.findOne({UserName: req.body.Username})
    .then(user =>{
        
        if(!user){
            return res.status(401).json({
                message: "Incorrect Login Credentials."
            });
        }
       fetchedUser = user;
       return bcrypt.compare(req.body.Password,user.Password);
    })
    .then(result =>{
       
        if(!result){
            return res.status(401).json({
                message : "Incorrect Login Credentials."
            })
        }

        const token = jwt.sign({UserName : fetchedUser.UserName,UserFullName : fetchedUser.UserFullName ,userId : fetchedUser._id},
            'secret_this_should_be_longer',
            {expiresIn:'1h'}
            );
        
        res.status(200).json({
            token : token,
            UserFullName : fetchedUser.UserFullName,
            expiresIn : 3600
        })

    })
    .catch(err =>{
        return res.status(401).json({
            message : "Incorrect Login Credentials."
        })
    })


    

});

*/

module.exports = router;
