const express = require("express")
const app = express()
const userRoutes = require("./routes/routes.user")
const homeRoutes = require("./routes/home.routes")

// requiring env file
const dotenv = require("dotenv")
dotenv.config() // this command gives access of env to whole app
const ConnectToDb = require("./config/db")
ConnectToDb() // calling function which connects us to db
app.set('view engine',"ejs") // setting enjine to ejs
app.use(express.json())  // controlling form
app.use(express.urlencoded({extended:true}))  // controlling form
// requiring cookies
const cookieParser = require("cookie-parser")
// using cookie parser
app.use(cookieParser())
app.use(express.static('public'));

// we will not create routes on main file 
app.use("/",homeRoutes)
app.use("/user",userRoutes)  // handling routes
app.get("/",(req,res)=>{
    res.render("login")
})
app.listen(3000,()=>{
    console.log("server running on port 3000")
})

