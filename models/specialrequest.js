const mongoose = require('mongoose');

const specialrequestSchema = mongoose.Schema({

    OrderNo : { type : String},
    ProjectName : { type : String},
    RequestDate : { type : String},
    ResolveDate : { type : String},
    RequestType : { type : String},
    NewClientDiscount : { type : String},
    NewDealerDiscount : { type : String},
    NewSource : { type : String},
    NewProjectName: { type : String},
    NewArchitectName : { type : String},
    Remarks : { type : String},
    Associate : { type : String},
    Status : { type : String}

});



module.exports = mongoose.model('SpecialRequest',specialrequestSchema);