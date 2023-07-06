const express = require('express')
const postController = require('../controllers/postController')
const { authorize } = require('../middlewares/authorize')

const router = express.Router()

router.route('/').get(authorize,postController.getAllPosts)
router.route('/').post(authorize,postController.createPost)
router.route('/:id').get(authorize,postController.getPost)
router.route('/:id').put(authorize,postController.updatePost)
router.route('/:id').delete(authorize,postController.deletePost)

module.exports= router