const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: [true,"User must have a name"],
    unique: true
  },
  email:{
    type: String,
    required: [true,"User must have a body"]
  },
  password:{
    type: String,
    required: [true,"User must have a password"]
  }
  
})

const User = mongoose.model("User",userSchema)
module.exports = User