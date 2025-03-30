const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Routes d'authentification publiques
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// Routes protégées nécessitant un token valide
router.get('/user', protect, authController.getUserProfile);

module.exports = router; 