const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = mongoose.Schema({

   
    UserName : { type: String , unique : true},
    Password : {type :String},
    UserFullName : { type: String, unique : true },
    Profile : {type :String},
    GlassOnly : {type :String},
    Chargeable : {type :String},
    TempCharge : {type :String},
    Packing : {type :String},
    FreightGlass : {type :String},
    OtherCharge : {type :String},
    GST : {type :String},
    Associate : {type :String},
    Code : {type :String},
    AssociatedSince : {type :String},
    Address :  {type :String},
    PhoneNo : {type :String},
    EmailId : {type :String},
    BeneficiaryName : {type :String},
    AccountNo : {type :String},
    IfscCode : {type :String},
    Swift : {type :String},
    MaxDiscount : {type :String},
    Status : {type :String},
    ProjectManager : {type :String},
    Freight : {type :String},
    DealerDiscount:  {type :String},
    ProcoreOfficeID : {type :String},
    DateCreated : { type: String }  

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);