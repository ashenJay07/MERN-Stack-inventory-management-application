const express = require('express');
const router = express.Router();

// Importing Controllers
const {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
} = require('../controllers/userController');
const protectUserRoutes = require('../middleWare/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.get('/get-user', protectUserRoutes, getUser);
router.get('/logged-in', loginStatus);
router.patch('/update-user', protectUserRoutes, updateUser);
router.patch('/change-password', protectUserRoutes, changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:resetToken', resetPassword);

module.exports = router;
