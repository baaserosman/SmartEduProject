const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const User = require('../models/User')

const router = express.Router();

router.route('/signup').post(
  [
    body('name').not().isEmpty().withMessage('Please enter your NAME'),

    body('email')
      .isEmail()
      .withMessage('Please enter a valid EMAIL')
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject('Email is already exists!');
          }
        });
      }),

    body('password').not().isEmpty().withMessage('Please enter your PASSWORD'),
  ],

  authController.createUser);  //*  http://localhost:3000/users/signup
router.route('/login').post(authController.loginUser);  
router.route('/logout').get(authController.logoutUser);  
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);  
router.route('/:id').delete(authController.deleteUser);

module.exports = router;
