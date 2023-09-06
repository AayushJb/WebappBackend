
const mongoose = require('mongoose');


const punchitemSchema = mongoose.Schema({

    ProjectID: { type: String }, 
    PunchID : { type: String }, 
    OrderNumber :{ type: String }, 
    ItemTitle : { type: String }, 
    ItemNumber : { type: String }, 
    ItemStatus : { type: String }, 
    ItemLocation : { type: String }, 
    DueDate : { type: String }, 
    BallinCourt : { type: String },
    BallinCourtProfile : { type: String },
    DateNotified : { type: String },
    Assignee : { type: String }, 
    EditDate : { type: String },
    EditTime : { type: String }
   
});

module.exports = mongoose.model('PunchItemData',  punchitemSchema);