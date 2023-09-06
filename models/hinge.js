const mongoose = require('mongoose');

const uniqueValidator = require("mongoose-unique-validator")


const hingeSchema = mongoose.Schema({

    HingeName : { type: String ,unique : true},
    imagePath : {type : String},
    DateCreated : { type: String }  

});

hingeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Hinge',hingeSchema);