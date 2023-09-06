const mongoose = require('mongoose');


const sizesSchema = mongoose.Schema({
   
  
    Width : { type: String },
    Height : { type: String },
    Quantity : { type: String }
   
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
    TempChargeSol : { type: String }
  
});


module.exports = mongoose.model('GlassSolution', glasssolutionSchema);
