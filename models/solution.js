const mongoose = require('mongoose');


const solutionSchema = mongoose.Schema({



    SolutionNo : { type: String },       
    Floor : { type: String },
    Space : { type: String },
    System : { type: String },
    SubSystem : { type: String },
    SystemType : { type: String },
    Orientation : { type: String },
    SubOrientation : { type: String },
    Grid  : { type: String },
    Width : { type: String },
    Height : { type: String },
    Quantity : { type: String },
    Color : { type: String },
    GlassCategory : { type: String },
    GlassSubCategory : { type: String },
    GlassFinish : { type: String },
    GlassVariant : { type: String },
    Matte : { type: String },
    OuterGlassCategory : { type: String },
    OuterGlassSubCategory : { type: String },
    OuterGlassFinish : { type: String },
    OuterGlassVariant : { type: String },
    OuterMatte : { type: String },
    Handle : { type: String },
    HandleVariant : { type: String },
    DoorCloser : { type: String },
    DropSeal : { type: String },
    Remarks : { type: String },
    SystemRemarks : { type: String },
    Amount : { type: String },
    SquareFeet : { type: String },
    ProcoreLocationID : {type : String},
    ProcorePunchItemID : {type : [String]},
    ProcoreStatus : { type : String},
    ProcoreBIC : { type : String},
    ProcoreField : { type : String}



});

module.exports = mongoose.model('Solution', solutionSchema);