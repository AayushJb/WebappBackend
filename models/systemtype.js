const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator")

const systemtypeSchema = mongoose.Schema({

    SystemType : { type : String , unique : true  },
    DateCreated : { type : String }

});

systemtypeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Systemtype',systemtypeSchema);