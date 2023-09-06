const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator")

const glasssubcatSchema = mongoose.Schema({

    GlassSubCategory : { type: String ,unique : true},
    GlassFinish : { type: [String]},
    GlassSubCategoryCost : {type : String},
    DateCreated : { type: String }  

});

glasssubcatSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Glasssubcat',glasssubcatSchema);