// here we will authenticate the user

function Auth (req,res,next) {
const jwt = require('jsonwebtoken')

const token = req.cookies.token

if(!token){
    return  res.status(401).json({
    message:"UnAuthorized"
   })
}
  try {
      const decoded = jwt.verify(token,process.env.JWT_SECRET)
      req.user = decoded
      return next()

  } catch (error) {
    return  res.status(401).json({
        message:"UnAuthorized"
       })
  }
  
}

module.exports = Auth