const mongoose = require('mongoose');

const uniqueValidator = require("mongoose-unique-validator")


const handlevarSchema = mongoose.Schema({

    HandleVariant : { type: String ,unique : true},
    Price : {type : String},
    Color : {type : String},
    imagePath : { type: String },
    DateCreated : { type: String }  

});

handlevarSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Handlevariant',handlevarSchema);