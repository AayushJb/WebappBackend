const mongoose = require('mongoose');

const vendorSchema = mongoose.Schema({

    ArchitectName : { type: String },
    ArchitectID : { type: String }  

});

//test

module.exports = mongoose.model('Vendor',vendorSchema);