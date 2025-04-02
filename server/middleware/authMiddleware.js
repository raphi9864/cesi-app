const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  // Vérifier si le token est présent dans les headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extraire le token du header
      token = req.headers.authorization.split(' ')[1];

      // Vérifier le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Ajouter l'utilisateur à la requête sans le mot de passe
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé' });
      }

      return next();
    } catch (error) {
      console.error('Erreur dans le middleware d\'authentification:', error);
      return res.status(401).json({ message: 'Non autorisé, token invalide' });
    }
  }

  return res.status(401).json({ message: 'Non autorisé, aucun token' });
};

// Middleware pour vérifier si l'utilisateur est admin
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Non autorisé, accès admin requis' });
};

// Middleware pour vérifier si l'utilisateur a un rôle spécifique
exports.hasRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Non autorisé, utilisateur non connecté' });
    }

    // Si roles est une chaîne, la convertir en tableau
    const roleArray = typeof roles === 'string' ? [roles] : roles;

    if (roleArray.includes(req.user.role)) {
      return next();
    }

    return res.status(403).json({ 
      message: `Non autorisé, rôle requis: ${roleArray.join(' ou ')}`
    });
  };
};

// Middleware pour vérifier si l'utilisateur est restaurateur
exports.isRestaurateur = (req, res, next) => {
  if (req.user && req.user.role === 'restaurateur') {
    return next();
  }
  return res.status(403).json({ message: 'Non autorisé, accès restaurateur requis' });
};

// Middleware pour vérifier si l'utilisateur est livreur
exports.isLivreur = (req, res, next) => {
  if (req.user && req.user.role === 'livreur') {
    return next();
  }
  return res.status(403).json({ message: 'Non autorisé, accès livreur requis' });
}; 