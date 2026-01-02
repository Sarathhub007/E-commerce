const mongoose=require('mongoose');
const userschema=new mongoose.Schema({
    username : {
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    }
})
const user= mongoose.model("user",userschema);
module.exports=user;