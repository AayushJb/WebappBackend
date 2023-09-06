const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator")

const framefinishSchema = mongoose.Schema({

    FrameFinish : { type: String ,unique:true},
    Color : { type: [String] },
    DateCreated : { type: String }  

});

framefinishSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Framefinish',framefinishSchema);