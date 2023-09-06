const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator")

const glassfinSchema = mongoose.Schema({

    GlassModel : { type: String , unique : true },
    GlassPrintName : { type: String , unique : true },
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
    GlassVariants : {type : [String]},
    WriteUp : { type: String },
    DateCreated : { type: String } 

 

});


glassfinSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Glassfinish',glassfinSchema);