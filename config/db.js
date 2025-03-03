const mongoose = require("mongoose")
// not directly writing url in production we will store that url in a variable

function ConnectToDb () {
    mongoose.connect(process.env.Mongo_url).then(()=>{
        console.log("connected to db")
    })
}

module.exports = ConnectToDb