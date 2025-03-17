const express = require('express')
const router = express.Router()
// for verifying or controlling validation of form data we use express validator pkg
const {body , validationResult} = require('express-validator')
// requiring usermodel of schema
const userModel = require("../model/user.model")
// requiring filemodel
const filemodel = require("../model/files.model")
// requiring bcrypt
const bcrypt = require("bcrypt")
// requiring jwt token
const jwt = require("jsonwebtoken")
// upload function for file handling
const upload = require('../config/files')
// requring authenticating middleware
const Auth = require('../auth/auth')
const crypto = require('crypto')
router.get("/register",(req,res)=>{
  res.render("register")
})

router.post("/register",
  body('email').trim().isEmail().isLength({min:13}),
  body('password').trim().isLength({min:5}),
  body('username').trim().isLength({min:3}),
    
  async (req, res) => {
    // Handling errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("register", {
        errors: errors.array(),
        message: "Invalid Data"
      });
    }

    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({
      $or: [{ email: email }, { username: username }]
    });

    if (existingUser) {
      console.log("User already exists"); // Logs in the backend
      return res.status(400).send("Username is already taken"); // Sends to the frontend
    
      return;
    }

  



    // Hash password and save user
    const hashPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      username,
      email,
      password: hashPassword
    });

    res.redirect("login");
  }
);


router.get("/login",(req,res)=>{
       res.render("login")
})



router.post("/login",
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:6}),
    
    async (req,res)=>{
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        return res.status(400).json({
            error:errors.array,
            message:"InValid data"
        })
      }
     // comparing username of req.body from database
      const {username,password} = req.body

      const Authuser =await userModel.findOne({
        username:username
      })

      if(!Authuser){
         return res.status(400).render("login", {
            message: "Username or password is incorrect"
          })
      }
         // comparing password

         const AuthPassword =  await bcrypt.compare(password,Authuser.password)
         if (!AuthPassword) {
           return res.status(400).json({
                message:"username or password is incorrect"
              })
         } 
        
         // now if username and password are matched we will log in user
          
        // jwt tokens keep the user authorized once user logins 

        const token = jwt.sign({
          userid : Authuser._id,
          email :Authuser.email,
          password : Authuser.password
        },process.env.JWT_SECRET)

        res.cookie("token",token)
        res.redirect("/home")
})


// route for handling files 
// const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

router.post("/file-upload", Auth, upload.single("file"), async (req, res) => {
  try {
    // just to be on safe side this is error handling
    const uploadDir = path.join(__dirname, "..", "public", "images", "uploads");
    // error handling
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate a unique file name using crypto
    const fileExtension = path.extname(req.file.originalname);
    const uniqueName = crypto.randomBytes(16).toString("hex") + fileExtension; // Unique file name
    const filePath = `images/uploads/${uniqueName}`; // Save path to database

    // Move the uploaded file to the public directory
    const destination = path.join(uploadDir, uniqueName);
    fs.renameSync(req.file.path, destination); // Move file to correct directory

    // Save file info to the database
    const newFile = await filemodel.create({
      originalname: req.file.originalname,
      path: filePath,  // Store relative path
      user: req.user.userid,
    });
    res.send(newFile); // Respond with file data
  } catch (error) {
    res.status(500).send("Error uploading file.");
  }
});



module.exports = router 