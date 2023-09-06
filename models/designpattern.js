const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator")

const designpatternSchema = mongoose.Schema({

    System : { type: String },
    SubSystem : {type : String},
    SystemType : {type : String},
    Orientation : { type: String },
    SubOrientation : { type: String },
    GridType : { type: String },
    Design : { type: String },
    DesignPatternName : { type: String },
    DesignPatternCode : { type: String },
    Color :  { type: String },
    GlassFinishCount :  { type: String },
    GLOnePercent :  { type: String },
    GLTwoPercent : { type: String },
    DesignPatternCost :  { type: String },
    Status : { type: String },
    MinGlassHeight : { type: String },
    MinGlassWidth : { type: String },
    ParamOne : { type: String },
    ParamTwo : { type: String },
    ParamThree : { type: String },
    ParamFour : { type: String },
    ParamFive : { type: String },
    imageRIpath : { type: String },
    imagePSEpath : { type: String },
    imageExtrapath : { type: String },
    DateCreated : { type: String }  

});

designpatternSchema.plugin(uniqueValidator);

module.exports = mongoose.model('DesignPattern',designpatternSchema);