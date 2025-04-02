// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
exports.register = async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findByEmail(req.body.email);
    
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }
    
    // Create the new user
    const newUser = await User.create(req.body);
    
    // Remove password from response
    newUser.password = undefined;
    
    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      token,
      user: newUser
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findByEmail(email);
    
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
    
    // Check password
    const isMatch = await User.comparePassword(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
    
    // Update last login
    await User.update(user.id, { lastLogin: new Date() });
    
    // Remove password from response
    user.password = undefined;
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      user
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    // User should be attached to req from auth middleware
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    // Remove password from response
    user.password = undefined;
    
    res.json(user);
  } catch (error) {
    console.error('Error getting current user:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    // User should be attached to req from auth middleware
    const userId = req.user.id;
    
    // Update user
    const updatedUser = await User.update(userId, req.body);
    
    // Remove password from response
    updatedUser.password = undefined;
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
  }
};