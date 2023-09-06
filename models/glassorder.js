const mongoose = require('mongoose');


const sizesSchema = mongoose.Schema({
   
  
   Width : { type: String },
   Height : { type: String },
   Quantity : { type: String },
   Drawing : { type: String }
  
});


const glasssolutionSchema = mongoose.Schema({
   
  
    SolutionName :{ type: String },
    GlassApplication :{ type: String },
    GlassCategory : { type: String },
    GlassSubCategory : { type: String },
    ThicknessFrom: { type: String },
    ThicknessTo: { type: String },
    GlassFinish: { type: String },
    GlassVariant: { type: String },
    Sizes: { type: [sizesSchema] },
    Tempered: { type: String },
    Matte: { type: String },
    Amount: { type: String },
    Squarefeet: { type: String },
    Weight: { type: String },
    Pieces : { type: String },
    TempChargeSol  : { type: String }
  
});




const glassorderSchema = mongoose.Schema({
    
    WaltzOrderNo :{ type: String },
    OrderNo : { type: String },
    ProjectName : { type: String },
    ClientName : { type: String },
    Location : { type: String },
    Architect : { type: String },
    GST : { type: String },
    Source : { type: String },
    Solutions: { type: [glasssolutionSchema] },
    Discount : { type: String },
    Advance : { type: String },
    FinalAmount : { type: String },
    GrandTotal : { type: String },
    TempCharge: { type: String },
    Packing : { type: String },
    Freight : { type: String },
    OtherCharges : { type: String },
    Status : { type: String },
    Active : { type: String },
    Completed : { type: String },
    CreationDate : { type: String },
    EditDate : { type: String },
    WinDate : { type: String },
    Associate : { type: String },
    ProjectManager : { type: String },
    TotalSquareFeet : { type : String},
    CSValue : {type : String},
    CompletionDate : {type : String},
    DateCreated : { type: String },
    CommercialWinDate : {type : String},
    HandOverDate : {type : String},
    LedgerDetails : {type : String},
    ProPlan : {type : String},
    ProValue : {type : String},
    Pieces : {type : String},
    DiscountPercent : {type : String},
    FreightPercent : {type : String},
    PackingPercent : {type : String},
    OtherChargesPercent : {type : String},
    Insurance : {type : String},
    InsuranceCost : {type : String}


});



module.exports = mongoose.model('GlassOrder',glassorderSchema);