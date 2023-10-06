
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Webapp',(err)=>{
 if(!err)
 console.log('MongoDb connection succeeded..'); 
 else
 console.log('Error in Db Connection : '+ JSON.stringify(err,undefined,2));

});

module.exports = mongoose;


 