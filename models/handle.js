const mongoose = require('mongoose');

const uniqueValidator = require("mongoose-unique-validator")



const handleSchema = mongoose.Schema({

    Handle : { type: String },
    Price : {type : String},
    Color : {type : String},
    HandleVariant : {type : [String]},
    imagePath : { type: String },
    DateCreated : { type: String }  

});

handleSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Handle',handleSchema);