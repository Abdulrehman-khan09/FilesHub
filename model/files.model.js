const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema({
    originalname:{
        type:String,
        required:true,
     },
     path:{
         type:String,
         required:true,
     },
     user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'user',
       required:true
     }
})

const filemodel = mongoose.model("file",fileSchema)

module.exports = filemodel