const mongoose = require('mongoose');

const systemSchema = mongoose.Schema({

    System : { type: String },
    SubSystem : { type: String },
    SystemType : { type: [String] },
    DateCreated : { type: String }  

});



module.exports = mongoose.model('System',systemSchema);