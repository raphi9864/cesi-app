const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Générer un JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Inscription d'un nouvel utilisateur
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      phone, 
      address, 
      zipCode, 
      city, 
      country,
      role = 'client',
      // Champs spécifiques au restaurateur
      restaurants,
      description,
      cuisineSpeciality,
      businessHours,
      // Champs spécifiques au livreur
      vehicleType,
      licenseNumber
    } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Créer un nouvel utilisateur avec les champs de base
    const userData = {
      email,
      password,
      firstName,
      lastName,
      phone,
      address,
      zipCode,
      city,
      country,
      role
    };

    // Ajouter les profils spécifiques selon le rôle
    if (role === 'restaurateur') {
      userData.restaurateurProfile = {
        description,
        cuisineSpeciality: cuisineSpeciality ? cuisineSpeciality.split(',') : [],
        businessHours,
        isVerified: false
      };
    } else if (role === 'livreur') {
      userData.livreurProfile = {
        vehicleType: vehicleType || 'vélo',
        licenseNumber,
        isAvailable: false
      };
    }

    // Créer l'utilisateur
    const user = await User.create(userData);

    if (user) {
      // Mettre à jour la date de dernière connexion
      user.lastLogin = new Date();
      await user.save();

      // Générer un token pour l'utilisateur inscrit
      const token = generateToken(user._id, user.role);

      res.status(201).json({
        token,
        user: {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }
      });
    } else {
      res.status(400).json({ message: 'Données utilisateur invalides' });
    }
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Connexion d'un utilisateur
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier si le mot de passe correspond
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Mettre à jour la date de dernière connexion
    user.lastLogin = new Date();
    await user.save();

    // Générer un token pour l'utilisateur connecté
    const token = generateToken(user._id, user.role);

    res.json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Obtenir les infos de l'utilisateur connecté
// @route   GET /api/auth/me
// @access  Private
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate({
        path: 'restaurateurProfile.restaurants',
        model: 'Restaurant'
      });
      
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Mettre à jour le profil de l'utilisateur
// @route   PUT /api/auth/me
// @access  Private
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Mise à jour des champs de base
    const fieldsToUpdate = [
      'firstName', 'lastName', 'phone', 'address', 
      'zipCode', 'city', 'country', 'profileImage'
    ];
    
    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    // Mise à jour des champs spécifiques selon le rôle
    if (user.role === 'restaurateur' && req.body.restaurateurProfile) {
      const { description, cuisineSpeciality, businessHours } = req.body.restaurateurProfile;
      
      if (description) user.restaurateurProfile.description = description;
      if (cuisineSpeciality) user.restaurateurProfile.cuisineSpeciality = cuisineSpeciality;
      if (businessHours) user.restaurateurProfile.businessHours = businessHours;
    }
    
    if (user.role === 'livreur' && req.body.livreurProfile) {
      const { vehicleType, licenseNumber, isAvailable, currentLocation } = req.body.livreurProfile;
      
      if (vehicleType) user.livreurProfile.vehicleType = vehicleType;
      if (licenseNumber) user.livreurProfile.licenseNumber = licenseNumber;
      if (isAvailable !== undefined) user.livreurProfile.isAvailable = isAvailable;
      if (currentLocation) user.livreurProfile.currentLocation = currentLocation;
    }

    // Mise à jour du mot de passe si fourni
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    
    res.json({
      message: 'Profil mis à jour avec succès',
      user: {
        _id: updatedUser._id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        role: updatedUser.role
      }
    });
    
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}; 