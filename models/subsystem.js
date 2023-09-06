const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator")

const subsystemSchema = mongoose.Schema({

    SubSystem : { type: String , unique : true },
    DateCreated : { type: String }  

}); 


subsystemSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Subsystem',subsystemSchema); 

