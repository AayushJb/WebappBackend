const mongoose = require('mongoose');

const generalsettingsSchema = mongoose.Schema({

    Counter : { type: Number },
    Prefix : { type: String },
    Factor: { type: Number },
    GridCost: { type: Number },
    DoorCloserCost: { type: Number },
    DropSealCost: { type: Number },
    GlassFactor : { type: Number },
    GlassCounter :  { type: Number },
    GlassCategoryCounter : {type: Number},
    GlassSubCategoryCounter : {type : Number},
    GlassVariantCounter : {type : Number}

});

module.exports = mongoose.model('GeneralSettings',generalsettingsSchema);