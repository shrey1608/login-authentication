const mongoose=require('mongoose');

const userScehma =new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        max:255,
    },
    password:{
        type:String,
        required:true,
        max:1024,
        min:6,
    },
    date:{
        type:Date,
        default:Date.now,
    }
});
module.exports=mongoose.model('User',userScehma);