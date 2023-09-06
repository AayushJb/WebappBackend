const mongoose = require('mongoose');

const commercialSchema = mongoose.Schema({

    OrderId : { type: String},
    OrderNo : { type: String},
    Invoice : { type: String},
    Amount : { type: String },
    Percent : { type: String },
    Type : { type: String },
    Remark : { type: String }    
});



module.exports = mongoose.model('CommercialWin',commercialSchema);