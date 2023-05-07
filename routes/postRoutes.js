const express = require('express')
const postController = require('../controllers/postController')

const router = express.Router()

router.route('/').get(postController.getAllPosts)
router.route('/').post(postController.createPost)
router.route('/:id').get(postController.getPost)
router.route('/:id').put(postController.updatePost)
router.route('/:id').delete(postController.deletePost)

module.exports= router