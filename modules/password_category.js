const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/pms', {useNewUrlParser: true , useCreateIndex:true,});
var conn=mongoose.Collection;
var passcatSchema= new mongoose.Schema({
    
    
password_category:{
    type:String,
    required:true,
    index:{
        unique:true,
    }
},

Date:{
    type:Date,
    default:Date.now,
}
});


var passcateModel =mongoose.model('password_categories',passcatSchema);
module.exports=passcateModel;

