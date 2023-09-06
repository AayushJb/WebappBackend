const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator")

const gridSchema = mongoose.Schema({

    GridName : { type: String },
    Design : { type: String },
    Price : { type : String },
    Status : { type : String},
    GlassNumber : { type : String },
    GLOnePercent : { type : String},
    imagePath : { type: String },
    DateCreated : { type: String }

});

gridSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Grid',gridSchema);