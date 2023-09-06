const mongoose = require('mongoose');

const uniqueValidator = require("mongoose-unique-validator")


const kitchenhandlepositionSchema = mongoose.Schema({

    KitchenHandlePosition : { type: String ,unique : true},
    Hinge : {type : [String]},
    imagePath : {type : String},
    DateCreated : { type: String }  


});

kitchenhandlepositionSchema.plugin(uniqueValidator);

module.exports = mongoose.model('KitchenHandlePosition', kitchenhandlepositionSchema);