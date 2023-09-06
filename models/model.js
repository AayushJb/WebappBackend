const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator")

const modelSchema = mongoose.Schema({

    System : { type: String },
    SubSystem : {type : String},
    SystemType : {type : String},
    SOFlag : { type: String },
    PrintName : { type: String },
    SubOrientation : { type: String },
    Orientation : { type: String },
    GlassFinishes : { type: [String] },
    Colors : { type: [String] },
    Handles : { type: [String] },
    Grid : { type: String },
    DoorCloser : { type: String },
    DropSeal : { type: String  },
    Temperable : { type: String },
    Status : { type: String },
    Code : { type: String },
    MinThick : { type: String },
    MaxThick : { type: String },
    MinWidth : { type: String },
    MaxWidth : { type: String },
    MinHeight : { type: String },
    MaxHeight : { type: String },
    ProfileCost : { type: String },
    HardwareCost : { type: String },
    FCost : { type: String },
    Dcost : { type: String },
    Lock : { type: String },
    imageMRIpath : { type: String },
    imageSORIpath : { type: String },
    imageRIpath : { type: String },
    imagePSEpath : { type: String },
    imageExpath : { type: String },
    imageMSpath : { type: String },
    DateCreated : { type: String }  

});

modelSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Model',modelSchema);


