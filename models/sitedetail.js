
const mongoose = require('mongoose');


const sitedetailSchema = mongoose.Schema({

    OrderNumber : { type: String }, 
    ContactPerson : { type: String }, 
    Phone : { type: String }, 
    AddressLineOne : { type: String }, 
    AddressLineTwo : { type: String }, 
    AddressLineThree : { type: String }, 
    City : { type: String }, 
    State : { type: String }, 
    Pincode : { type: String }, 
    DeliveryDate : { type: String }, 
    InvoiceNumber : { type: String }, 
    Panels : { type: String }, 
    Boxes : { type: String }, 
    Glasses : { type: String }, 
    Remarks : { type: String }

});

module.exports = mongoose.model('SiteDetail',  sitedetailSchema);