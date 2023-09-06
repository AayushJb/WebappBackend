const express = require("express");

const router = express.Router();

var SpecialRequest = require('../models/specialrequest');

var Order = require('../models/order.js');






router.get("",(req,res,next)=>{ 
   

    if(req.query.user!=="ALL"){

        SpecialRequest.find({Associate:req.query.user})
        .then(documents=>{
         res.status(200).json({
             message: "SpecialRequests fetched successfully.",
             specialrequests : documents
         });  
        }); 
    
   
     }

  
   if(req.query.user==="ALL"){
   
    SpecialRequest.find()
    .then(documents=>{
     res.status(200).json({
         message: "SpecialRequests fetched successfully.",
         specialrequests : documents
     });  
    }); 


   }

    
});

 





router.post("", (req, res, next) => {
 
    const specialrequest = new SpecialRequest({
      OrderNo : req.body.OrderNo,
      ProjectName : req.body.ProjectName,
      RequestDate : req.body.RequestDate,
      ResolveDate : req.body.ResolveDate,
      RequestType : req.body.RequestType,
      NewClientDiscount : req.body.NewClientDiscount,
      NewDealerDiscount : req.body.NewDealerDiscount,
      NewSource : req.body.NewSource,
      NewProjectName: req.body.NewProjectName,
      NewArchitectName : req.body.NewArchitectName,
      Remarks : req.body.Remarks,
      Associate : req.body.Associate,
      Status : req.body.Status
    });


   

    specialrequest.save().then(createdspecialreq =>{
        res.status(201).json({
            message: "Request added successfully.",
            requestId: createdspecialreq._id
        });
        const text = "Saved Successfully"
        return  text;
    });  
 
});



router.delete("/:id",(req,res,next)=>{
    SpecialRequest.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: "Request Deleted"
          });

    });
   
});

router.put("reject/:id", (req, res, next) => {

   var Request =  req.body.Request
   var RejectDate = req.body.RejectDate

   console.log(Request)
 
    const specialrequest = new SpecialRequest({
        _id : Request._id,   
        OrderNo : Request.OrderNo,
        ProjectName : Request.ProjectName,
        RequestDate : Request.RequestDate,
        ResolveDate : RejectDate,
        RequestType : Request.RequestType,
        NewClientDiscount : Request.NewClientDiscount,
        NewDealerDiscount : Request.NewDealerDiscount,
        NewSource : Request.NewSource,
        NewProjectName: Request.NewProjectName,
        NewArchitectName : Request.NewArchitectName,
        Remarks : Request.Remarks,
        Associate : Request.Associate,
        Status : "Rejected"
    });
  

    SpecialRequest.updateOne({_id:Request._id,},specialrequest).then(result =>{
        res.status(200).json({message : "Update Successful."});

    });

});


router.post("/edit/:id", (req, res, next) => {

    var Request =  req.body.Request
    var ApproveDate = req.body.RejectDate
    var OrderNumber = Request.OrderNo

    
    var OrderProjectRefNo = ""

    if(OrderNumber.includes("/V-"))
    {
     let hyphen = OrderNumber.lastIndexOf("/V-");
     let tempproref = OrderNumber.substring(0, hyphen);
     let slash = tempproref.lastIndexOf("/");
     let proref = tempproref.substring(slash + 1, hyphen); 
     OrderProjectRefNo = proref
    }
 
    if(!OrderNumber.includes("/V-"))
    {
     let slash = OrderNumber.lastIndexOf("/");
     let proref = OrderNumber.substring(slash+ 1, OrderNumber.length);
     OrderProjectRefNo = proref
    }
 


 
  


    Order.find({Associate : Request.Associate})
    .then((response)=>{

       var LatestOrderNumber = "";

        for(var i =0; i<response.length; i++ )
        {
            var OrderCounter = ""

            if(response[i].OrderNo.includes("/V-"))
            {
             let hyphen = response[i].OrderNo.lastIndexOf("/V-");
             let tempproref = response[i].OrderNo.substring(0, hyphen);
             let slash = tempproref.lastIndexOf("/");
             let proref = tempproref.substring(slash + 1, hyphen); 
             OrderCounter = proref
            }
         
            if(!response[i].OrderNo.includes("/V-"))
            {
             let slash = response[i].OrderNo.lastIndexOf("/");
             let proref = response[i].OrderNo.substring(slash+ 1, response[i].OrderNo.length);
             OrderCounter = proref
            }
          

          if(OrderCounter==OrderProjectRefNo&&response[i].Status!=="Edited")
          {
            LatestOrderNumber =   response[i].OrderNo
          }
        }


       return LatestOrderNumber
       

    })
    .then((response)=>{
       
    })


    
    
  

    /*
     const specialrequest = new SpecialRequest({
         _id : Request._id,   
         OrderNo : Request.OrderNo,
         ProjectName : Request.ProjectName,
         RequestDate : Request.RequestDate,
         ResolveDate : RejectDate,
         RequestType : Request.RequestType,
         NewClientDiscount : Request.NewClientDiscount,
         NewDealerDiscount : Request.NewDealerDiscount,
         NewSource : Request.NewSource,
         NewProjectName: Request.NewProjectName,
         NewArchitectName : Request.NewArchitectName,
         Remarks : Request.Remarks,
         Associate : Request.Associate,
         Status : "Rejected"
     });
   
 
     SpecialRequest.updateOne({_id:Request._id,},specialrequest).then(result =>{
         res.status(200).json({message : "Update Successful."});
 
     });

     */
 
 });




module.exports = router;