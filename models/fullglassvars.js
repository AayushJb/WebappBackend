const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator")

const glassvarSchema = mongoose.Schema({
    
    
    GlassSubCategory : { type: String},
    Glassfinish : { type: String},
    GlassPrintName : { type: String},
    MinThick : { type: String },
    MaxThick : { type: String },
    Matte : { type: String },
    MatteCost : { type: String },
    MaxHeight : { type: String },
    MaxWidth : { type: String },
    Price : { type: String },
    imagePath : { type: String },
    Temperable : { type: String },
    Status : { type: String },
    Label : { type: String },
    WriteUp : { type: String },
    DateCreated : { type: String }  

});

glassvarSchema.plugin(uniqueValidator);

module.exports = mongoose.model('FullGlassVarient',glassvarSchema);