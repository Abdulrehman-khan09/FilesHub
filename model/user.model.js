const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
       type:String,
       required:true,
       trim:true,
       minLength:[3,"Username Cannot be less than 3"],
       unique:[true,"Username is already taken"]
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:[true,"Email is already taken"],
        minLength:[13," Cannot be less than 13"]
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:[3," Cannot be less than 3"]
    }
})

const userModel = mongoose.model("user",UserSchema)

module.exports = userModel