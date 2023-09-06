const mongoose = require('mongoose');

const uniqueValidator = require("mongoose-unique-validator")


const kitchentypeSchema = mongoose.Schema({
    
    SolutionType : { type : String },
    KitchenTypeName : { type: String ,unique : true},
    KitchenHandles : {type : [String]},
    Colors : {type : [String]},
    GlassFinish : {type : [String]},
    imagePath : { type : String },
    DateCreated : { type: String }  

});

kitchentypeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('KitchenType',kitchentypeSchema);