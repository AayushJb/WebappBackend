const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator")

const colorSchema = mongoose.Schema({

    Color : { type: String ,unique : true},
    imagePath : { type: String },
    DateCreated : { type: String }  

});

colorSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Color',colorSchema);