  // file handling

  // requiring multer for handling files
  const multer = require('multer')
  // crypto for generating random names
  const crypto = require('crypto')
  // path for adding extention
  const path = require('path')

 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/images/uploads')); 
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12, function (err,bytes){
        const fn = bytes.toString("hex") + path.extname(file.originalname)
        cb(null, fn) // cb function generates file name
      })
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload