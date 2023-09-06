const mongoose = require('mongoose');

const uniqueValidator = require("mongoose-unique-validator")


const drawingSchema = mongoose.Schema({

    DrawingName : { type: String ,unique : true},
    HandleType : {type : String},
    HandlePosition : {type : String},
    HingePosition : {type : String},
    imagePath : {type : String},
    Price  : {type : String},
    AdditionalPrice  : {type : String},
    DateCreated : { type: String }  

});

drawingSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Drawing',drawingSchema);