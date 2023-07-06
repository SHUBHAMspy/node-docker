const authorize = (req,res,next) => { 
  const {user} = req.session
  
  if(!user) {
    return res.status(401).json({
      status:'fail',
      message: 'Unauthorized'
    })
  }

  next() // transfer control to next middleware in stack or controller
}

module.exports={
  authorize
}