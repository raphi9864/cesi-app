const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Sous-schéma pour le profil restaurateur
const RestaurateurProfileSchema = new mongoose.Schema({
  restaurants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  }],
  description: String,
  cuisineSpeciality: [String],
  businessHours: String,
  isVerified: {
    type: Boolean,
    default: false
  }
});

// Sous-schéma pour le profil livreur
const LivreurProfileSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    enum: ['vélo', 'scooter', 'voiture', 'à pied'],
    default: 'vélo'
  },
  licenseNumber: String,
  isAvailable: {
    type: Boolean,
    default: false
  },
  currentLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  ratings: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  }
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['client', 'restaurateur', 'livreur', 'admin'],
    default: 'client'
  },
  firstName: String,
  lastName: String,
  phone: String,
  address: String,
  zipCode: String,
  city: String,
  country: String,
  // Profils spécifiques aux rôles
  restaurateurProfile: RestaurateurProfileSchema,
  livreurProfile: LivreurProfileSchema,
  // Informations supplémentaires pour tous les utilisateurs
  profileImage: String,
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date
});

// Hash le mot de passe avant de sauvegarder
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour comparer les mots de passe
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Méthode pour récupérer le profil en fonction du rôle
UserSchema.methods.getProfileByRole = function() {
  switch (this.role) {
    case 'restaurateur':
      return this.restaurateurProfile;
    case 'livreur':
      return this.livreurProfile;
    default:
      return {};
  }
};

// Indexation géospatiale pour les livreurs
UserSchema.index({ 'livreurProfile.currentLocation': '2dsphere' });

module.exports = mongoose.model('User', UserSchema); 