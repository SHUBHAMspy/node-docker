const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router()

// router.route('/').get(authController.getAllusers)
router.route('/signUp').post(authController.signUp)
router.route('/login').post(authController.login)
// router.route('/:id').get(authController.getuser)
// router.route('/:id').put(authController.updateuser)
// router.route('/:id').delete(authController.deleteuser)

module.exports= router