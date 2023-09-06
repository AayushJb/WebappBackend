const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator")

const designSchema = mongoose.Schema({

    Design : { type: String },
    DateCreated : { type: String }

});

designSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Design',designSchema);