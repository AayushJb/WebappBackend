const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator")

const glassonlyvarSchema = mongoose.Schema({

    GlassCategory :{ type: String},
    GlassSubCategory :{ type: String},	 
    GlassFinish :{ type: String},
    GlassVariantModel : { type: String,unique : true },
    GlassVariantModelWithThickness  :{ type: String},
    Thickness :{ type: String},
    GlassPrintName : { type: String},
    MinThick : { type: String },
    MaxThick : { type: String },
    Matte : { type: String },
    MatteCost : { type: String },
    MaxHeight : { type: String },
    MaxWidth : { type: String },
    Price : { type: String },
    Temperable : { type: String },
    TemperableCost : { type: String },
    Status : { type: String },
    Label : { type: String },
    Lamination:{ type: String },
    Weigth :{ type: String}, 
    LeadTime :{ type: String},
    imagethumbnailpath :{ type: String},
    imageorientationpath :{ type: String},
    imageapplicationpath :{ type: String},
    imagepotraitpath :{ type: String},
    WriteUp : { type: String },
    DateCreated : { type: String }  

});

glassonlyvarSchema.plugin(uniqueValidator);

module.exports = mongoose.model('GlassOnlyFinish',glassonlyvarSchema);