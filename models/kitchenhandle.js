const mongoose = require('mongoose');

const uniqueValidator = require("mongoose-unique-validator")


const kitchenhandleSchema = mongoose.Schema({

    HandleName : { type: String ,unique : true},
    HandlePositions : {type : [String]},
    imagePath : {type : String},
    DateCreated : { type: String }  


});

kitchenhandleSchema.plugin(uniqueValidator);

module.exports = mongoose.model('KitchenHandle',kitchenhandleSchema);