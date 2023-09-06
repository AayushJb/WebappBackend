const mongoose = require('mongoose');

const handoverSchema = mongoose.Schema({
    
    OrderId : { type: String },
    OrderNo : { type: String },
    Party : { type: String },
    Expense : { type: String },
    ExpensePercent :  { type: String },
    OutStanding : { type: String },
    OutStandingPercent : { type: String },
    Billed : { type: String },
    SpecialDiscount :  { type: String },
    BadDebt : {type: String},
    ReceiptAdvance : { type: String },
    ChequeRequired : { type: String },
    Type : { type: String },
    Remark : { type: String }

});



module.exports = mongoose.model('Handover',handoverSchema);