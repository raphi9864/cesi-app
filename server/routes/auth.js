const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getCurrentUser,
  updateProfile
} = require('../controllers/authController');
const { auth } = require('../middleware/authMiddleware');

// Routes publiques
router.post('/register', register);
router.post('/login', login);

// Routes protégées
router.get('/me', auth, getCurrentUser);
router.put('/update', auth, updateProfile);

module.exports = router; 