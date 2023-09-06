const mongoose = require('mongoose');

const uniqueValidator = require("mongoose-unique-validator")

const ledgerdetailSchema = mongoose.Schema({
    OrderId : { type: String },
    OrderNumber :{ type: String },
    BillingName : { type: String  },
    AddressLine1 : { type: String },
    AddressLine2: { type: String },
    AddressLine3: { type: String },
    City: { type: String },
    State: { type: String },
    Pincode: { type: String },
    CDProfile1: { type: String },
    CDName1: { type: String },
    CDMobile1: { type: String },
    CDEmail1: { type: String },
    CDProfile2: { type: String },
    CDName2: { type: String },
    CDMobile2: { type: String },
    CDEmail2: { type: String },
    CDProfile3: { type: String },
    CDName3: { type: String },
    CDMobile3: { type: String },
    CDEmail3: { type: String },
    CompanyName: { type: String },
    Website: { type: String },
    AddressLine1Con: { type: String },
    AddressLine2Con: { type: String },
    AddressLine3Con: { type: String },
    CityCon: { type: String },
    StateCon: { type: String },
    PincodeCon: { type: String },
    ConProfile1: { type: String },
    ConName1: { type: String },
    ConPhone1: { type: String },
    ConEmail1: { type: String },
    ConProfile2: { type: String },
    ConName2: { type: String },
    ConPhone2: { type: String },
    ConEmail2: { type: String },
    ProPlus: { type: String },
    ProPlusCost: { type: String }


}); 

module.exports = mongoose.model('LedgerDetail',ledgerdetailSchema); 







