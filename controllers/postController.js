const Post = require("../models/postSchema")

const getAllPosts = async(req,res,next) => {
  try {
    const posts = await Post.find()
    res.status(200).json({
      status: 'success',
      results: posts.length,
      data:{posts}
    })
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      data: error.message
    })
  }
}
const getPost = async(req,res,next) => {
  const {params:{id}} = req
  try {
    const post = await Post.findById(id)
    if(post){
      res.status(200).json({
        status: 'success',
        data:{post}
      })
    }else{
      res.status(404).json({
        status: 'fail',
        data: "Not Found"
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      data: error.message
    })
  }
}
const createPost = async(req,res,next) => {
  const {params:{id}} = req
  try {
    const post = await Post.create(req.body)
    res.status(200).json({
      status: 'success',
      data:{post}
    })
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      data: error.message
    })
  }
}
const updatePost = async(req,res,next) => {
  const {params:{id}} = req
  try {
    const post = await Post.findByIdAndUpdate(id,req.body,{
      new:true,
      runValidators:true
    })
    res.status(200).json({
      status: 'success',
      data:{post}
    })
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      data: error.message
    })
  }
}
const deletePost = async(req,res,next) => {
  const {params:{id}} = req
  try {
    const post = await Post.findByIdAndDelete(id)
    res.status(200).json({
      status: 'success',
    })
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      data: error.message
    })
  }
}
module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
}