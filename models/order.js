
const mongoose = require('mongoose');


const punchitemSchema = mongoose.Schema({

  SolutionNo : { type: String },
  PunchID :  { type: String },
  Floor :  { type: String },
  Space : { type: String },
  Type :  { type: String },

});


const solutionSchema = mongoose.Schema({
   
    SolutionNo :{ type: String },  
    Floor :{ type: String },  
    Space :{ type: String },  
    System :{ type: String },  
    SubSystem : { type: String },  
    SystemType : { type: String },  
    Orientation : { type: String },  
    SubOrientation : { type: String },  
    Grid  : { type: String },  
    Width : { type: String },  
    Height : { type: String },  
    Quantity :{ type: String },  
    Color : { type: String },  
    GlassCategory :  { type: String },  
    GlassSubCategory : { type: String },  
    GlassFinish : { type: String },  
    GlassVariant : { type: String },  
    Matte : { type: String },  
    OuterGlassCategory :{ type: String },  
    OuterGlassSubCategory :{ type: String },  
    OuterGlassFinish : { type: String },  
    OuterGlassVariant : { type: String },  
    OuterMatte : { type: String },  
    Handle : { type: String },  
    HandleVariant : { type: String },  
    DoorCloser : { type: String },  
    DropSeal : { type: String },
    Lock : { type: String },  
    Remarks :{ type: String },  
    SystemRemarks : { type: String },  
    Amount : { type: String },  
    SquareFeet : { type: String },  
    ProcoreLocationID :{ type: String },
    ProcorePunchItemID : { type: [punchitemSchema] },  
    ProcoreStatus : { type: Array },  
    ProcoreBIC : { type: String },  
    ProcoreField :{ type: String }
  
});




const orderSchema = mongoose.Schema({
    
   
    OrderNo : { type: String },
    ProjectName : { type: String },
    ClientName : { type: String },
    Location : { type: String },
    Architect : { type: String },
    Source : { type: String },
    Solutions: { type: [solutionSchema] },
    Discount : { type: String },
    Advance : { type: String },
    FinalAmount : { type: String },
    GrandTotal : { type: String },
    Status : { type: String },
    Active : { type: String },
    Completed : { type: String },
    CreationDate : { type: String },
    EditDate : { type: String },
    WinDate : { type: String },
    Associate : { type: String },
    ProjectManager : { type: String },
    ProjectID :{ type: String },
    OfficeID : { type: String },
    TotalSquareFeet : { type : String},
    CSValue : {type : String},
    CompletionDate : {type : String},
    DateCreated : { type: String },
    CommercialWinDate : {type : String},
    HandOverDate : {type : String},
    LedgerDetails : {type : String},
    ProPlan : {type : String},
    ProValue : {type : String}


});



module.exports = mongoose.model('Order',orderSchema);