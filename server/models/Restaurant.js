const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  categories: [String],
  adresse: {
    type: String,
    required: true
  },
  horaires: {
    type: String,
    required: true
  },
  notation: {
    type: Number,
    default: 0
  },
  tempsLivraison: String,
  fraisLivraison: {
    type: Number,
    default: 0
  },
  commandeMinimum: {
    type: Number,
    default: 0
  },
  popular: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema); 