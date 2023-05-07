const User = require("../models/userSchema")
const bcrypt = require("bcryptjs")

const signUp = async(req,res,next) => { 
  const {username,email,password} = req.body
  const hashedPassword = await bcrypt.hash(password,12)
  try {
    const newUser = await User.create({
      username,
      email,
      password:hashedPassword
    })
    res.status(201).json({
      status: 'success',
      data:{
        user:newUser
      }
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error.message
    })
  }  
}
const login = async(req,res,next) => { 
  const {username,email,password} = req.body
  
  try {
    const user = await User.findOne({username})
    
    if(!user){
      res.status(404).json({
        status: 'fail',
        message: "User not found" 
      })
    }
    const matched = await bcrypt.compare(password,user.password)
    if(matched){
      res.status(200).json({
        status: 'success',
      })
    }else{
      res.status(400).json({
        status: 'fail',
        message:"Username or password is incorrect"
      })
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error.message
    })
  }  
}


module.exports={
  signUp,login
}