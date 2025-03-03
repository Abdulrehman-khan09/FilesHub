const express = require('express')

const router = express.Router()
const Auth = require("../auth/auth")
const filemodel = require("../model/files.model")
const path = require("path");
const fs = require("fs")

router.get("/home",Auth, async (req,res)=>{
      const userfiles = await filemodel.find({
        user: req.user.userid
      })
      res.render('home',{
        files : userfiles
      })
    })
    // this route will hit when register link is clicked
    router.get("/register",(req,res)=>{
        res.render("register")
    })
    
router.get("/download/:path", Auth, async (req, res) => {
  try {
    let filePath = req.params.path;

    // Decoding files path
    filePath = decodeURIComponent(filePath);

    // Construct the full path to the file
    const fullPath = path.join(__dirname, "..", "public", "images", "uploads", filePath);

    // Check if the file exists at the constructed path
    fs.access(fullPath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).send("File not found.");
      }

      // If the file exists, serve it for download
      res.download(fullPath, (err) => {
        if (err) {
          res.status(500).send("Error downloading file.");
        }
      });
    });
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});




   


  
module.exports = router