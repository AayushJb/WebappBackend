const mongoose = require('mongoose');

const uniqueValidator = require("mongoose-unique-validator")
const glasscatSchema = mongoose.Schema({

    GlassCategory : { type: String ,unique : true},
    GlassSubCategory : { type: [String] },
    DateCreated : { type: String }  

});

glasscatSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Glasscat',glasscatSchema);