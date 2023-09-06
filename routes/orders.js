const express = require("express");
const nodemail = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path')


const router = express.Router();

var Order = require('../models/order.js');
var Solution = require('../models/solution.js');





//=====================Post Request=====================

router.post("",(req, res, next) => {

    const order = new Order({



      OrderNo :   req.body.OrderNo,
      ProjectName : req.body.ProjectName,
      ClientName : req.body.ClientName,
      Location : req.body.Location,
      Architect : req.body.Architect,
      Source : req.body.Source,
      Solutions: req.body.Solutions,
      Discount : req.body.Discount,
      Advance : req.body.Advance,
      FinalAmount : req.body.FinalAmount,
      GrandTotal : req.body.GrandTotal,
      Status : req.body.Status,
      Active : req.body.Active,
      Completed : req.body.Completed,
      CreationDate :req.body.CreationDate,
      EditDate : req.body.EditDate,
      WinDate : req.body.WinDate,
      Associate : req.body.Associate,
      ProjectManager : req.body.ProjectManager,
      ProjectID : req.body.ProjectID,
      OfficeID : req.body.OfficeID,
      TotalSquareFeet : req.body.TotalSquareFeet,
      CSValue : req.body.CSValue,
      CompletionDate : req.body.CompletionDate,
      DateCreated : req.body.DateCreated,
      CommercialWinDate : req.body.CommercialWinDate,
      HandOverDate : req.body.HandOverDate,
      LedgerDetails : req.body.LedgerDetails,
      ProPlan : req.body.ProPlan,
      ProValue : req.body.ProValue
    
    });
     

    
    order.save().then(createdOrder =>{
        res.status(201).json({
            message: "Order added successfully.",
            orderId: createdOrder._id
        }); 
        const text = "Saved Successfully"
        return  text;
    });
 
});



//=========================================================================

//======================================Get Request========================

router.get("",(req,res,next)=>{ 
 
console.log(req.query.user)
    if(req.query.user!=="ALL"){
    Order.find({Associate:req.query.user})
    .then(documents=>{
     res.status(200).json({
         message: "Orders fetched successfully.",
         orders : documents
     });  
    }); 
   }

  
   if(req.query.user==="ALL"){
    Order.find()
    .then(documents=>{
     res.status(200).json({
         message: "Orders fetched successfully.",
         orders : documents
     });  
    }); 
   }



});


router.get("/allusers",(req,res,next)=>{ 
 
  
      Order.find({$or: [ { Status : "Win" }, {Status : "Old Win" } , {Status : "Handover" }] })
      .then(documents=>{
       res.status(200).json({
           message: "Orders fetched successfully.",
           orders : documents
       });  
      }); 
     
  
  });


  router.get("/allanalyticsorders",(req,res,next)=>{ 
 
  
    Order.find({$or: [ { Status : "Win" }, {Status : "Old Win" },{Status : "Pipeline" } ,{Status : "Handover" },{Status : "Commercial Hold" }] })
    .then(documents=>{
     res.status(200).json({
         message: "Orders fetched successfully.",
         orders : documents
     });  
    }); 
   

  
  



});


  


  
router.get("/projectmanagerorders",(req,res,next)=>{ 
 
  
  Order.find({$or: [ { Status : "Win" }, {Status : "Handover" }, {Status : "Old Win" } ] })
  .then(documents=>{
   res.status(200).json({
       message: "Orders fetched successfully.",
       orders : documents
   });  
  }); 
 






});




//==========================For downloads=========================================

router.get("/downloads/:ordernumber",(req,res,next)=>{ 
 
  Order.find({$or: [ { Status : "Win" }, {Status : "Commercial Hold" } ] })
  .then(documents=>{
   res.status(200).json({
       message: "Orders fetched successfully.",
       orders : documents
   });  
  }); 
 
});


//=======================FOr Mrunal===============================================
router.get("/socialpipeline",(req,res,next)=>{ 
 
  Order.find({$and: [ { Source : "SOCIAL" }, {Status : "Pipeline" } ] })
  .then(documents=>{
   res.status(200).json({
       message: "Orders fetched successfully.",
       orders : documents
   });  
  }); 
 
});



router.get("/ledgerdownloads/:ordernumber",(req,res,next)=>{ 
 
  Order.find({$or: [ { Status : "Win" }, {Status : "Commercial Hold" } ] })
  .then(documents=>{
   res.status(200).json({
       message: "Orders fetched successfully.",
       orders : documents
   });  
  }); 
 
});



//================================Bulk Edit======================================

router.get("/bulkedit",(req,res,next)=>{ 
 
  Order.find( {} )
  .then(documents=>{
   res.status(200).json(documents);  
  }); 
 
});



//===============================Put/Edit Request=================================


router.put("/updateorder/:id", (req, res, next) => {
  
  const order = new Order({
    _id : req.body._id,
    OrderNo : req.body.OrderNo,
    ProjectName : req.body.ProjectName,
    ClientName : req.body.ClientName,
    Location : req.body.Location,
    Architect : req.body.Architect,
    Source : req.body.Source,
    Solutions: req.body.Solutions,
    Discount : req.body.Discount,
    Advance : req.body.Advance,
    FinalAmount : req.body.FinalAmount,
    GrandTotal : req.body.GrandTotal,
    Status : req.body.Status,
    Active : req.body.Active,
    Completed : req.body.Completed,
    CreationDate :  req.body.CreationDate,
    EditDate : req.body.EditDate,
    WinDate : req.body.WinDate,
    Associate : req.body.Associate,
    ProjectManager : req.body.ProjectManager,
    ProjectID : req.body.ProjectID,
    OfficeID : req.body.OfficeID,
    TotalSquareFeet : req.body.TotalSquareFeet,
    CSValue : req.body.CSValue,
    CompletionDate : req.body.CompletionDate,
    DateCreated : req.body.DateCreated,
    CommercialWinDate : req.body.CommercialWinDate,
    HandOverDate : req.body.HandOverDate,
    LedgerDetails : req.body.LedgerDetails,
    ProPlan : req.body.ProPlan,
    ProValue : req.body.ProValue

});


  Order.updateOne({_id:req.params.id},order).then(result =>{
      res.status(200).json({message : "Update Successful."});
  });

});

//================================================================================

router.put("/updateold/:id", (req, res, next) => { 

    var myquery =  req.params.id 
    var newvalues = { $set : {'Status' : "Edited"}};
    Order.findByIdAndUpdate(myquery, newvalues, {
      new: true
    }).then(result => {
  
    
      if(result){
        res.status(200).json({
          message: "Order updated successfully.",
          orders : result
      })
  
      }else{
       res.result(404).json({message : "Error in Updating Order"});
      }
      
    });
           
});

router.post("/createnew", (req, res, next) => {

   var NewOrder = req.body.NewOrder;
   var OldOrder = req.body.OldOrder;
   var Userid = req.body.UserID;
   var Profile = req.body.Profile;

  
   

 
 

    const order = new Order({

      OrderNo : NewOrder.OrderNo,
      ProjectName : NewOrder.ProjectName,
      ClientName : NewOrder.ClientName,
      Location : NewOrder.Location,
      Architect : NewOrder.Architect,
      Source : NewOrder.Source,
      Solutions: NewOrder.Solutions,
      Discount : NewOrder.Discount,
      Advance : NewOrder.Advance,
      FinalAmount : NewOrder.FinalAmount,
      GrandTotal : NewOrder.GrandTotal,
      Status : NewOrder.Status,
      Active : NewOrder.Active,
      Completed : NewOrder.Completed,
      CreationDate :  NewOrder.CreationDate,
      EditDate : NewOrder.EditDate,
      WinDate : NewOrder.WinDate,
      Associate : NewOrder.Associate,
      ProjectManager : NewOrder.ProjectManager,
      ProjectID : NewOrder.ProjectID,
      OfficeID : NewOrder.OfficeID,
      TotalSquareFeet : NewOrder.TotalSquareFeet,
      CSValue : NewOrder.CSValue,
      CompletionDate : NewOrder.CompletionDate,
      DateCreated : NewOrder.DateCreated,
      CommercialWinDate : NewOrder.CommercialWinDate,
      HandOverDate : NewOrder.HandOverDate,
      LedgerDetails : NewOrder.LedgerDetails,
      ProPlan : NewOrder.ProPlan,
      ProValue : NewOrder.ProValue
    
    });


    order.save().then(createdOrder =>{
        res.status(201).json({
            message: "Order added successfully.",
            orderId: createdOrder._id
        }); 
        const text = "Saved Successfully"
        return  text;
    });

    let UpdatedSolutions  = [];
    let NewSolutions = [];
    let DeletedSolutions = [];


    

 
    if(NewOrder.Status=="Win"||NewOrder.Status=="Old Win"||NewOrder.Status=="Commercial Hold")
    {



        for(var i = 0;i < OldOrder.Solutions.length;i++)
        {
//=====================For Deleted Solutions========================
          if(NewOrder.Solutions[i].Quantity!==OldOrder.Solutions[i].Quantity&&NewOrder.Solutions[i].Quantity=="0")
          {
            var DelSolNo = i+1;
            var temp = {SolutionNumber : DelSolNo , Floor : NewOrder.Solutions[i].Floor, Space :NewOrder.Solutions[i].Space , EditedFields : "",  OldAmount : OldOrder.Solutions[i].Amount, NewAmount : "0" }
            DeletedSolutions.push(temp)
          }




//=======================For Updated Solutions======================           
            let Changes = '';

             
            if(NewOrder.Solutions[i].System!==OldOrder.Solutions[i].System)
            {
               Changes+="System : "+ NewOrder.Solutions[i].System + " . "
            }

            if(NewOrder.Solutions[i].SubSystem!==OldOrder.Solutions[i].SubSystem)
            {
               Changes+="Sub System : "+ NewOrder.Solutions[i].SubSystem + " . "
            }

            if(NewOrder.Solutions[i].SystemType!==OldOrder.Solutions[i].SystemType)
            {
               Changes+="SystemType : "+ NewOrder.Solutions[i].SystemType + " . "
            }

            if(NewOrder.Solutions[i].Orientation!==OldOrder.Solutions[i].Orientation)
            {
               Changes+="Orientation : "+ NewOrder.Solutions[i].Orientation + " . "
            }

            if(NewOrder.Solutions[i].SubOrientation!==OldOrder.Solutions[i].SubOrientation&&NewOrder.Solutions[i].SubOrientation)
            {
               Changes+="SubOrientation : "+ NewOrder.Solutions[i].SubOrientation + " . "
            }

            if(NewOrder.Solutions[i].Width!==OldOrder.Solutions[i].Width)
            {
               Changes+="Width : "+ NewOrder.Solutions[i].Width + " . "
            }

            if(NewOrder.Solutions[i].Height!==OldOrder.Solutions[i].Height)
            {
               Changes+="Height : "+ NewOrder.Solutions[i].Height + " . "
            }

            if(NewOrder.Solutions[i].Quantity!==OldOrder.Solutions[i].Quantity&&NewOrder.Solutions[i].Quantity>0)
            {
               Changes+="Quantity : "+ NewOrder.Solutions[i].Quantity + " . "
            }

            if(NewOrder.Solutions[i].Grid!==OldOrder.Solutions[i].Grid&&NewOrder.Solutions[i].Grid)     
            {
                Changes+="Grid : "+ NewOrder.Solutions[i].Grid + " . "
            }

            if(NewOrder.Solutions[i].Color!==OldOrder.Solutions[i].Color)
            {
               Changes+="Frame Finish : "+ NewOrder.Solutions[i].Color + " . "
            }

          
            if(NewOrder.Solutions[i].GlassFinish!==OldOrder.Solutions[i].GlassFinish)
            {
              Changes+="Glass Finish : "+ NewOrder.Solutions[i].GlassFinish + " . "
            }

            if(NewOrder.Solutions[i].GlassVariant!==OldOrder.Solutions[i].GlassVariant&&NewOrder.Solutions[i].GlassVariant)
            {
               Changes+="Glass Variant : "+ NewOrder.Solutions[i].GlassVariant + " . "
            }

            if(NewOrder.Solutions[i].Matte!==OldOrder.Solutions[i].Matte&&NewOrder.Solutions[i].Matte)
            {
                Changes+="Matte : "+ NewOrder.Solutions[i].Matte + " . "
            }

            if(NewOrder.Solutions[i].OuterGlassFinish!==OldOrder.Solutions[i].OuterGlassFinish)
            {
                Changes+="Glass Outer Finish : "+ NewOrder.Solutions[i].OuterGlassFinish + " . "
            }

            
            if(NewOrder.Solutions[i].OuterGlassVariant!==OldOrder.Solutions[i].OuterGlassVariant&&NewOrder.Solutions[i].OuterGlassVariant)
            {
               Changes+="Glass Outer Variant : "+ NewOrder.Solutions[i].OuterGlassVariant + " . "
            }

            if(NewOrder.Solutions[i].OuterMatte!==OldOrder.Solutions[i].OuterMatte&&NewOrder.Solutions[i].OuterMatte)
            {
               Changes+="Glass Outer Matte : "+ NewOrder.Solutions[i].OuterMatte + " . "
            }

            if(NewOrder.Solutions[i].Handle!==OldOrder.Solutions[i].Handle&&NewOrder.Solutions[i].Handle)
            {
               Changes+="Handle : "+ NewOrder.Solutions[i].Handle + " . "
            }

            if(NewOrder.Solutions[i].DoorCloser!==OldOrder.Solutions[i].DoorCloser&&NewOrder.Solutions[i].DoorCloser)
            {
                Changes+="Door Closer : "+ NewOrder.Solutions[i].DoorCloser + " . "
            }

            if(NewOrder.Solutions[i].DropSeal!==OldOrder.Solutions[i].DropSeal&&NewOrder.Solutions[i].DropSeal)
            {
              Changes+="Drop Seal : "+ NewOrder.Solutions[i].DropSeal + " . "
            }

            if(NewOrder.Solutions[i].Lock!==OldOrder.Solutions[i].Lock&&NewOrder.Solutions[i].Lock)
            {
                Changes+="Lock : "+ NewOrder.Solutions[i].Lock + " . "
            }

            let SolutionNumber = i + 1
            if(Changes!=="")
            {

              var temp = {SolutionNumber : SolutionNumber ,Floor :NewOrder.Solutions[i].Floor,Space :NewOrder.Solutions[i].Space,EditedFields : Changes,  OldAmount : OldOrder.Solutions[i].Amount, NewAmount : NewOrder.Solutions[i].Amount}
              UpdatedSolutions.push(temp)
            }

          
        }

 

 //==================For Added Solutions====================================================
 
    if(NewOrder.Solutions.length>OldOrder.Solutions.length)
    {
      for(var j= OldOrder.Solutions.length;j <NewOrder.Solutions.length;j++)
      {
         let AddedSolNumber = j+1;

         var temp = { SolutionNumber : AddedSolNumber, Floor :NewOrder.Solutions[j].Floor,Space :NewOrder.Solutions[j].Space, EditedFields : "-",OldAmount : "-",NewAmount :NewOrder.Solutions[j].Amount }
         NewSolutions.push(temp)
      }
    }




    var NewSolutionslength = NewSolutions.length;
    var UpdatedSolutionslength = UpdatedSolutions.length;
    var DeletedSolutionslength = DeletedSolutions.length;


     
        let CommDiff = Number(NewOrder.FinalAmount)-Number(OldOrder.FinalAmount)
        let CommercialDiff = '';
        if(CommDiff>0)
        {
          CommercialDiff = "+"+CommDiff.toFixed(0).toString()
        }

        if(CommDiff<0)
        {
          CommercialDiff = CommDiff.toFixed(0).toString()
        }

        if(CommDiff==0)
        {
          CommercialDiff = "0"
        }
         

        let TableConstruct = 0;

        if(UpdatedSolutionslength>0||NewSolutionslength>0||DeletedSolutionslength>0)
        {
          TableConstruct = 1;
        }





//=====================================================================================================================
   
 if(Profile==="PRE PRODUCTION")
 {
  
        var transporter = nodemail.createTransport({
          service : 'gmail',
          auth : {
            user : 'it@jbglass.in',
            pass : 'aayushp@121188'
          }
        }); 
    



        transporter.use('compile', hbs(
          {
            viewEngine : 
            {
              extName: ".handlebars",
              partialsDir: path.resolve(__dirname, "views3"),
              defaultLayout: false,
            },
            viewPath : path.resolve(__dirname, "views3"),
            extName: ".handlebars"
           }
        ));


        var newordercounternumber = '';
        var newversion;
      
          
        
            if(NewOrder.OrderNo.includes("/V-"))
            {
             let hyphen =  NewOrder.OrderNo.lastIndexOf("/V-");
             newversion = NewOrder.OrderNo.substring(hyphen + 1, NewOrder.OrderNo.length);
             let tempproref =  NewOrder.OrderNo.substring(0, hyphen);
             let slash = tempproref.lastIndexOf("/");
             let proref = tempproref.substring(slash + 1, hyphen); 
             newordercounternumber = proref
             
            }
         
            if(!NewOrder.OrderNo.includes("/V-"))
            {
             
             let slash =  NewOrder.OrderNo.lastIndexOf("/");
             let proref = NewOrder.OrderNo.substring(slash+ 1, NewOrder.OrderNo.length);
             newordercounternumber = proref
            }
          
      
            var NewMailOrderNumber
      
            if(newversion)
            {
              NewMailOrderNumber = newordercounternumber + "/" + newversion
            }
      
            if(!newversion)
            {
              NewMailOrderNumber = newordercounternumber
            }
      
    
    
    
            var oldordercounternumber = '';
            var oldversion;
          
              
            
                if(OldOrder.OrderNo.includes("/V-"))
                {
                 let hyphen =  OldOrder.OrderNo.lastIndexOf("/V-");
                 oldversion = OldOrder.OrderNo.substring(hyphen + 1, OldOrder.OrderNo.length);
                 let tempproref =  OldOrder.OrderNo.substring(0, hyphen);
                 let slash = tempproref.lastIndexOf("/");
                 let proref = tempproref.substring(slash + 1, hyphen); 
                 oldordercounternumber = proref          
                }
             
                if(!OldOrder.OrderNo.includes("/V-"))
                {
                 
                 let slash =  OldOrder.OrderNo.lastIndexOf("/");
                 let proref = OldOrder.OrderNo.substring(slash+ 1, OldOrder.OrderNo.length);
                 oldordercounternumber = proref
                }
              
          
                var OldMailOrderNumber
          
                if(oldversion)
                {
                  OldMailOrderNumber = oldordercounternumber + "/" + oldversion
                }
          
                if(!oldversion)
                {
                  OldMailOrderNumber = oldordercounternumber
                }
          
           
        var mailOptions = {
          from : 'it@jbglass.in',
          to :  Userid,
          cc :  'waltzpro@jbglass.in,sales@jbglass.in,billing@jbglass.in,accounts1@jbglass.in',
          subject : 'PRE-PRODUCTION @ '+  NewMailOrderNumber +"/"+ NewOrder.ProjectName,
          template : 'editmail',
          context: {
            OrderNo: NewOrder.OrderNo,
            NewOrderNumber : NewOrder.OrderNo,
            OldOrderNumber : OldOrder.OrderNo,
            NewVersion : newversion,
            ProjectName : NewOrder.ProjectName,
            FinAmt  : NewOrder.FinalAmount,
            Dis  : NewOrder.Discount,
            GranTot :  NewOrder.GrandTotal,
            ProjectAss : NewOrder.Associate,
            NewSolutions  : NewSolutions,
            NewSolutionslength : NewSolutionslength,
            Solutions : UpdatedSolutions,
            TableConstruct : TableConstruct,
            UpdatedSolutionslength : Number(UpdatedSolutionslength),
            UpdatedSolutionslengthtable : Number(UpdatedSolutionslength)+1,
            DeletedSolutions : DeletedSolutions,
            DeletedSolutionslength : DeletedSolutionslength,
            GrandTotal : NewOrder.GrandTotal,
            Discount : NewOrder.Discount,
            FinalAmount : NewOrder.FinalAmount,
            NewAmount : NewOrder.FinalAmount,
            OldAmount : OldOrder.FinalAmount,
            User : req.body.User,
            TotalSquareFeet : NewOrder.TotalSquareFeet,
            CommercialDiff : CommercialDiff
            
          }
        }
    
          
       transporter.sendMail(mailOptions,function(error,info){
        if(error)
        {
         console.log(error)
        }else{
         console.log('Email Sent : '+ info.response);
        }
    
       })

  }

  if(Profile!=="PRE PRODUCTION")
  {
     
    var transporter = nodemail.createTransport({
      service : 'gmail',
      auth : {
        user : 'it@jbglass.in',
        pass : 'aayushp@121188'
      }
    }); 




    transporter.use('compile', hbs(
      {
        viewEngine : 
        {
          extName: ".handlebars",
          partialsDir: path.resolve(__dirname, "views3"),
          defaultLayout: false,
        },
        viewPath : path.resolve(__dirname, "views3"),
        extName: ".handlebars"
       }
    ));


    var newordercounternumber = '';
    var newversion;
  
      
    
        if(NewOrder.OrderNo.includes("/V-"))
        {
         let hyphen =  NewOrder.OrderNo.lastIndexOf("/V-");
         newversion = NewOrder.OrderNo.substring(hyphen + 1, NewOrder.OrderNo.length);
         let tempproref =  NewOrder.OrderNo.substring(0, hyphen);
         let slash = tempproref.lastIndexOf("/");
         let proref = tempproref.substring(slash + 1, hyphen); 
         newordercounternumber = proref
         
        }
     
        if(!NewOrder.OrderNo.includes("/V-"))
        {
         
         let slash =  NewOrder.OrderNo.lastIndexOf("/");
         let proref = NewOrder.OrderNo.substring(slash+ 1, NewOrder.OrderNo.length);
         newordercounternumber = proref
        }
      
  
        var NewMailOrderNumber
  
        if(newversion)
        {
          NewMailOrderNumber = newordercounternumber + "/" + newversion
        }
  
        if(!newversion)
        {
          NewMailOrderNumber = newordercounternumber
        }
  



        var oldordercounternumber = '';
        var oldversion;
      
          
        
            if(OldOrder.OrderNo.includes("/V-"))
            {
             let hyphen =  OldOrder.OrderNo.lastIndexOf("/V-");
             oldversion = OldOrder.OrderNo.substring(hyphen + 1, OldOrder.OrderNo.length);
             let tempproref =  OldOrder.OrderNo.substring(0, hyphen);
             let slash = tempproref.lastIndexOf("/");
             let proref = tempproref.substring(slash + 1, hyphen); 
             oldordercounternumber = proref          
            }
         
            if(!OldOrder.OrderNo.includes("/V-"))
            {
             
             let slash =  OldOrder.OrderNo.lastIndexOf("/");
             let proref = OldOrder.OrderNo.substring(slash+ 1, OldOrder.OrderNo.length);
             oldordercounternumber = proref
            }
          
      
            var OldMailOrderNumber
      
            if(oldversion)
            {
              OldMailOrderNumber = oldordercounternumber + "/" + oldversion
            }
      
            if(!oldversion)
            {
              OldMailOrderNumber = oldordercounternumber
            }
      

    var mailOptions = {
      from : 'it@jbglass.in',
      to :  Userid,
      cc : 'billing@jbglass.in',
      subject : "Rs"+CommercialDiff.toString()+' '+ NewMailOrderNumber+"/"+ NewOrder.ProjectName,
      template : 'edituser',
      context: {
        OrderNo: NewMailOrderNumber,
        NewOrderNumber : NewMailOrderNumber,
        OldOrderNumber : OldMailOrderNumber,
        ProjectName : NewOrder.ProjectName,
        OldVersion : oldversion,
        NewVersion : newversion,
        FinAmt  : NewOrder.FinalAmount,
        Dis  : NewOrder.Discount,
        GranTot :  NewOrder.GrandTotal,
        ProjectAss : NewOrder.Associate,
        NewSolutions  : NewSolutions,
        NewSolutionslength : NewSolutionslength,
        Solutions : UpdatedSolutions,
        TableConstruct : TableConstruct,
        UpdatedSolutionslength : Number(UpdatedSolutionslength),
        UpdatedSolutionslengthtable : Number(UpdatedSolutionslength)+1,
        DeletedSolutions : DeletedSolutions,
        DeletedSolutionslength : DeletedSolutionslength,
        GrandTotal : NewOrder.GrandTotal,
        Discount : NewOrder.Discount,
        FinalAmount : NewOrder.FinalAmount,
        NewAmount : NewOrder.FinalAmount,
        OldAmount : OldOrder.FinalAmount,
        User : req.body.User,
        TotalSquareFeet : NewOrder.TotalSquareFeet,
        CommercialDiff : CommercialDiff
        
      }
    }

      
   transporter.sendMail(mailOptions,function(error,info){
    if(error)
    {
      console.log(error)
    }else{
     console.log('Email Sent : '+ info.response);
    }

   })

  }



  if(NewSolutionslength>0)
  {
     
    var transporter = nodemail.createTransport({
      service : 'gmail',
      auth : {
        user : 'it@jbglass.in',
        pass : 'aayushp@121188'
      }
    }); 

    transporter.use('compile', hbs(
      {
        viewEngine : 
        {
          extName: ".handlebars",
          partialsDir: path.resolve(__dirname, "views3"),
          defaultLayout: false,
        },
        viewPath : path.resolve(__dirname, "views3"),
        extName: ".handlebars"
       }
    ));

  }


//====================================================================================================================

    }

});


//================================Edit when Refresh=================================================

router.get("/:id",(req,res,next)=>{
    Order.findById(req.params.id).then(order => {
        if(order){
          res.status(200).json(order)

        }else{
         res.status(404).json({message : "Order not found."});

        }
    });
});


//======================================Get Request========================

router.get("/?user",(req,res,next)=>{ 

    
    if(req.query.user!=="ALL")
    {
     Order.find({Associate:req.query.user})
     .then(documents=>{
      res.status(200).json({
         message: "Orders fetched successfully.",
         orders : documents
      });  
     }); 
   }
 
   if(req.query.user==="ALL")
   {
    Order.find()
    .then(documents=>{
     res.status(200).json({
        message: "Orders fetched successfully.",
        orders : documents
     });  
    }); 

   }

   

});




//========================================For Changing Win Status And Date

router.put("/win/:id", (req, res, next) => {

  var Users = req.body.Users;
  var LedgerDetails = req.body.LedgerDetail;

  var Userid; 

  
 
  
  for(var i = 0; i<Users.length; i++)
  {

    
    if(Users[i].UserFullName==req.body.Order.Associate)
    {
     
      Userid = Users[i].EmailId
    }

  }

 

  const order = new Order({
    _id : req.body.Order._id,
    OrderNo : req.body.Order.OrderNo,
    ProjectName : req.body.Order.ProjectName,
    ClientName : req.body.Order.ClientName,
    Location : req.body.Order.Location,
    Architect : req.body.Order.Architect,
    Source : req.body.Order.Source,
    Solutions: req.body.Order.Solutions,
    Discount : req.body.Order.Discount,
    Advance : req.body.Order.Advance,
    FinalAmount : req.body.Order.FinalAmount,
    GrandTotal : req.body.Order.GrandTotal,
    Status : req.body.Order.Status,
    Active : req.body.Order.Active,
    Completed : req.body.Order.Completed,
    CreationDate :  req.body.Order.CreationDate,
    EditDate : req.body.Order.EditDate,
    WinDate : req.body.Order.WinDate,
    Associate : req.body.Order.Associate,
    ProjectManager : req.body.Order.ProjectManager,
    ProjectID : req.body.Order.ProjectID,
    OfficeID : req.body.Order.OfficeID,
    TotalSquareFeet : req.body.Order.TotalSquareFeet,
    CSValue : req.body.Order.CSValue,
    CompletionDate : req.body.Order.CompletionDate,
    DateCreated : req.body.Order.DateCreated,
    CommercialWinDate : req.body.Order.CommercialWinDate,
    HandOverDate : req.body.Order.HandOverDate,
    LedgerDetails : req.body.Order.LedgerDetails,
    ProPlan : req.body.Order.ProPlan,
    ProValue : req.body.Order.ProValue
    

});

  
   
    Order.updateOne({_id:req.params.id},order).then(result => {

     
      var transporter = nodemail.createTransport({
        service : 'gmail',
        auth : {
          user : 'it@jbglass.in',
          pass : 'aayushp@121188'
        }
      }); 
  
      transporter.use('compile', hbs(
        {
          viewEngine : 
          {
            extName: ".handlebars",
            partialsDir: path.resolve(__dirname, "views"),
            defaultLayout: false,
          },
          viewPath : path.resolve(__dirname, "views"),
          extName: ".handlebars"
         }
      ));
   

 

      var ordercounternumber = '';
      var version;

     

      if(req.body.Order.OrderNo.includes("/V-"))
      {
       let hyphen =  req.body.Order.OrderNo.lastIndexOf("/V-");
       version = req.body.Order.OrderNo.substring(hyphen + 1, req.body.Order.OrderNo.length);
       let tempproref =  req.body.Order.OrderNo.substring(0, hyphen);
       let slash = tempproref.lastIndexOf("/");
       let proref = tempproref.substring(slash + 1, hyphen); 
       ordercounternumber = proref
       
      }
   
      if(!req.body.Order.OrderNo.includes("/V-"))
      {
       let slash =  req.body.Order.OrderNo.lastIndexOf("/");
       let proref = req.body.Order.OrderNo.substring(slash+ 1,  req.body.Order.OrderNo.length);
       ordercounternumber = proref
      }
    
      var MailOrderNumber

      if(version)
      {
        MailOrderNumber = ordercounternumber + "/" + version
      }

      if(!version)
      {
        MailOrderNumber = ordercounternumber
      }
      
      var mailOptions = {
        from : 'it@jbglass.in',
        to :  Userid,
        bcc : 'billing@jbglass.in,accounts1@jbglass.in',
        subject : 'Commercial Hold @ ' + MailOrderNumber + "/" +req.body.Order.ProjectName,
        template : 'winmail',
        context: {
          OrderNo: MailOrderNumber,
          ProjectName : req.body.Order.ProjectName,
          FinAmt  :req.body.Order.FinalAmount,
          Dis  :req.body.Order.Discount,
          GranTot :  req.body.Order.GrandTotal,
          ProjectAss : req.body.Order.Associate,
          OrderSerial : ordercounternumber,
          BillingName : LedgerDetails.BillingName,
          Add1Bil : LedgerDetails.AddressLine1,
          Add2Bil : LedgerDetails.AddressLine2,
          Add3Bil : LedgerDetails.AddressLine3,
          CityBil : LedgerDetails.City,
          StateBil : LedgerDetails.State,
          PinBil : LedgerDetails.Pincode,
          CmType1 : LedgerDetails.CDProfile1,
          Name1 : LedgerDetails.CDName1,
          PhoneNumber1 : LedgerDetails.CDMobile1,
          emailID1 : LedgerDetails.CDEmail1,
          CmType2 : LedgerDetails.CDProfile2,
          Name2 : LedgerDetails.CDName2,
          PhoneNumber2 : LedgerDetails.CDMobile2,
          emailID2 : LedgerDetails.CDEmail2,
          CmType3 : LedgerDetails.CDProfile3,
          Name3 : LedgerDetails.CDName3,
          PhoneNumber3 : LedgerDetails.CDMobile3,
          emailID3 : LedgerDetails.CDEmail3,
          CompConsul  : LedgerDetails.CompanyName,
          WebConsul : LedgerDetails.Website,
          Add1BilConsul : LedgerDetails.AddressLine1Con,
          Add2BilConsul : LedgerDetails.AddressLine2Con,
          Add3BilConsul : LedgerDetails.AddressLine3Con,
          CityBilConsul : LedgerDetails.CityCon,
          StateBilConsul : LedgerDetails.StateCon,
          EmpType1 : LedgerDetails.ConProfile1,
          Name1Emp : LedgerDetails.ConName1,
          PhoneNumber1Emp : LedgerDetails.ConPhone1,
          emailID1Emp : LedgerDetails.ConEmail1,
          EmpType2 : LedgerDetails.ConProfile2,
          Name2Emp : LedgerDetails.ConName2,
          PhoneNumber2Emp : LedgerDetails.ConPhone2,
          emailID2Emp : LedgerDetails.ConEmail2,
          Plan : LedgerDetails.ProPlus,
          plancost : LedgerDetails.ProPlusCost,
          LedgerDetails : req.body.LedgerDetails,
          ProPlan : req.body.ProPlan,
          ProValue : req.body.ProValue

        }
      }
  
        
     transporter.sendMail(mailOptions,function(error,info){
      if(error)
      {
        console.log(error)
      }else{
       console.log('Email Sent : '+ info.response);
      }
  
     })

  
      if(result){
        res.status(200).json({
          message: "Congratulations! on winning the Project",
          orders : result
      })
  
      }else{
       res.result(404).json({message : "Error in Winning the Project"});
      }
      
    });
  

  });
//========================================================================
  router.put("/wincommercial/:id", (req, res, next) => {

    var Users = req.body.Users;
    var Userid;
   
    for(var i = 0; i<Users.length; i++)
    {
   
      if(Users[i].UserFullName==req.body.Order.Associate)
      {
       
        Userid = Users[i].EmailId
      }
  
    }
  
   
  
    const order = new Order({
      _id : req.body.Order._id,
      OrderNo : req.body.Order.OrderNo,
      ProjectName : req.body.Order.ProjectName,
      ClientName : req.body.Order.ClientName,
      Location : req.body.Order.Location,
      Architect : req.body.Order.Architect,
      Source : req.body.Order.Source,
      Solutions: req.body.Order.Solutions,
      Discount : req.body.Order.Discount,
      Advance : req.body.Order.Advance,
      FinalAmount : req.body.Order.FinalAmount,
      GrandTotal : req.body.Order.GrandTotal,
      Status : req.body.Order.Status,
      Active : req.body.Order.Active,
      Completed : req.body.Order.Completed,
      CreationDate :  req.body.Order.CreationDate,
      EditDate : req.body.Order.EditDate,
      WinDate : req.body.Order.WinDate,
      Associate : req.body.Order.Associate,
      ProjectManager : req.body.Order.ProjectManager,
      ProjectID : req.body.Order.ProjectID,
      OfficeID : req.body.Order.OfficeID,
      TotalSquareFeet : req.body.Order.TotalSquareFeet,
      CSValue : req.body.Order.CSValue,
      CompletionDate : req.body.Order.CompletionDate,
      DateCreated : req.body.Order.DateCreated,
      CommercialWinDate : req.body.Order.CommercialWinDate,
      HandOverDate : req.body.Order.HandOverDate,
      LedgerDetails : req.body.LedgerDetails,
      ProPlan : req.body.ProPlan,
      ProValue : req.body.ProValue
      
  
  });
  
    
     
      Order.updateOne({_id:req.params.id},order).then(result => {
  
        console.log(result)
  
        var transporter = nodemail.createTransport({
          service : 'gmail',
          auth : {
            user : 'it@jbglass.in',
            pass : 'aayushp@121188'
          }
        }); 
    
        transporter.use('compile', hbs(
          {
            viewEngine : 
            {
              extName: ".handlebars",
              partialsDir: path.resolve(__dirname, "views2"),
              defaultLayout: false,
            },
            viewPath : path.resolve(__dirname, "views2"),
            extName: ".handlebars"
           }
        ));
     

        var ordercounternumber = '';
        var version;
  
       
  
        if(req.body.Order.OrderNo.includes("/V-"))
        {
         let hyphen =  req.body.Order.OrderNo.lastIndexOf("/V-");
         version = req.body.Order.OrderNo.substring(hyphen + 1, req.body.Order.OrderNo.length);
         let tempproref =  req.body.Order.OrderNo.substring(0, hyphen);
         let slash = tempproref.lastIndexOf("/");
         let proref = tempproref.substring(slash + 1, hyphen); 
         ordercounternumber = proref
         
        }
     
        if(!req.body.Order.OrderNo.includes("/V-"))
        {
         
         let slash =  req.body.Order.OrderNo.lastIndexOf("/");
         let proref = req.body.Order.OrderNo.substring(slash+ 1,  req.body.Order.OrderNo.length);
         ordercounternumber = proref
        }
      
  
        var MailOrderNumber
  
        if(version)
        {
          MailOrderNumber = ordercounternumber + "/" + version
        }
  
        if(!version)
        {
          MailOrderNumber = ordercounternumber
        }
  
        
        var mailOptions = {
          from : 'it@jbglass.in',
          to :   Userid,
          bcc : 'billing@jbglass.in,shashank@jbglass.in,anuj@jbglass.in,gaurav@jbglass.in,waltzpro@jbglass.in,accounts1@jbglass.in',
          subject : 'Win @ ' + MailOrderNumber + "/"+req.body.Order.ProjectName,
          template : 'winmail',
          context: {
            OrderNo: MailOrderNumber,
            ProjectName : req.body.Order.ProjectName,
            Associate :  req.body.Order.Associate,
            OrderSerial : ordercounternumber,
          }
        }
    
          
       transporter.sendMail(mailOptions,function(error,info){
        if(error)
        {
          console.log(error)
        }else{
         console.log('Email Sent : '+ info.response);
        }
    
       })
  
    
        if(result){
          res.status(200).json({
            message: "Congratulations! on winning the Project",
            orders : result
        })
    
        }else{
         res.result(404).json({message : "Error in Winning the Project"});
        }
        
      });
    
    
    
  
    });



//========================================================================
//========================================================================
router.put("/handoverorder/:id", (req, res, next) => {

  var Users = req.body.Users;

  var Userid;
 
  

 
  
  for(var i = 0; i<Users.length; i++)
  {

    
    if(Users[i].UserFullName==req.body.Order.Associate)
    {
     
      Userid = Users[i].EmailId
    }

  }

 

  const order = new Order({
    _id : req.body.Order._id,
    OrderNo : req.body.Order.OrderNo,
    ProjectName : req.body.Order.ProjectName,
    ClientName : req.body.Order.ClientName,
    Location : req.body.Order.Location,
    Architect : req.body.Order.Architect,
    Source : req.body.Order.Source,
    Solutions: req.body.Order.Solutions,
    Discount : req.body.Order.Discount,
    Advance : req.body.Order.Advance,
    FinalAmount : req.body.Order.FinalAmount,
    GrandTotal : req.body.Order.GrandTotal,
    Status : req.body.Order.Status,
    Active : req.body.Order.Active,
    Completed : req.body.Order.Completed,
    CreationDate :  req.body.Order.CreationDate,
    EditDate : req.body.Order.EditDate,
    WinDate : req.body.Order.WinDate,
    Associate : req.body.Order.Associate,
    ProjectManager : req.body.Order.ProjectManager,
    ProjectID : req.body.Order.ProjectID,
    OfficeID : req.body.Order.OfficeID,
    TotalSquareFeet : req.body.Order.TotalSquareFeet,
    CSValue : req.body.Order.CSValue,
    CompletionDate : req.body.Order.CompletionDate,
    DateCreated : req.body.Order.DateCreated,
    CommercialWinDate : req.body.Order.CommercialWinDate,
    HandOverDate : req.body.Order.HandOverDate,
    LedgerDetails : req.body.LedgerDetails,
    ProPlan : req.body.ProPlan,
    ProValue : req.body.ProValue
    

});

  
   
    Order.updateOne({_id:req.params.id},order).then(result => {

      console.log(result)

      if(result){
        res.status(200).json({
          message: " The Project is Handover",
          orders : result
      })
  
      }else{
       res.result(404).json({message : "Error in Handingover the Project"});
      }
      
    });
  
  
  

  });  
 

//============================Push Solutions=================================

router.post("/pushsolutions/:id", (req, res, next) => {

 
  var Sols = req.body

  var myquery =  req.params.id 
  var newvalues = { $set : {'Solutions' : Sols}};
  Order.findByIdAndUpdate(myquery, newvalues, {
    new: true
  }).then(result => {

  
    if(result){
      res.status(200).json({
        message: "Order updated successfully.",
        orders : result
    })

    }else{
     res.result(404).json({message : "Error in Updating Order"});
    }
    
  });



         
});




//===============================================================================================
router.get("/handlesdata",(req,res,next)=>{ 

    
  Order.find({$or: [ { Status : "Win" }, {Status : "Commercial Hold" }, {Status : "Pipeline" }, {Status : "Handover"} ] })
  .then(documents=>{

   res.status(200).json({
       message: "Orders fetched successfully.",
       orders : documents
   }); 
    
  }); 



});

//================================================================================================
module.exports = router;











  