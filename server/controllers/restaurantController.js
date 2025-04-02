// controllers/restaurantController.js
const Restaurant = require('../models/Restaurant');

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const filters = {
      popular: req.query.popular === 'true',
      category: req.query.category
    };
    
    const restaurants = await Restaurant.findAll(filters);
    res.json(restaurants);
  } catch (error) {
    console.error('Error getting restaurants:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des restaurants' });
  }
};

// Get restaurant by ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant non trouvé' });
    }
    
    res.json(restaurant);
  } catch (error) {
    console.error('Error getting restaurant:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du restaurant' });
  }
};

// Create restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const newRestaurant = await Restaurant.create(req.body);
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({ message: 'Erreur lors de la création du restaurant' });
  }
};

// Update restaurant
exports.updateRestaurant = async (req, res) => {
  try {
    const updated = await Restaurant.update(req.params.id, req.body);
    
    if (!updated) {
      return res.status(404).json({ message: 'Restaurant non trouvé' });
    }
    
    res.json(updated);
  } catch (error) {
    console.error('Error updating restaurant:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du restaurant' });
  }
};

// Delete restaurant
exports.deleteRestaurant = async (req, res) => {
  try {
    const deleted = await Restaurant.delete(req.params.id);
    
    if (deleted === 0) {
      return res.status(404).json({ message: 'Restaurant non trouvé' });
    }
    
    res.json({ message: 'Restaurant supprimé avec succès' });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du restaurant' });
  }
};