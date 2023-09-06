const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator")

const customerfeedbackSchema = mongoose.Schema({

    Quality : { type: String },
    Schedule : { type: String },
    Installation : { type: String },
    Professionalism : { type: String },
    Overall : { type: String },
    imagePath : { type: String },
    ProcoreHandOverDate : { type: String },
    ProjectID  : { type: String }

});



module.exports = mongoose.model('CustomerFeedBack',customerfeedbackSchema);