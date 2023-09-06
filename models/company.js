const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    
    CompanyName : { type: String},
    Profile : { type: String},
    AddressLine : { type: String},
    Location : { type: String},
    AddressLineThree : { type: String},
    City : { type: String},
    State : { type: String},
    Country : { type: String},
    Source : { type: String},
    Associate : { type: [String]}

});



module.exports = mongoose.model('Company',companySchema);