// controllers/dishController.js
const Dish = require('../models/Dish');

// Get all dishes
exports.getAllDishes = async (req, res) => {
  try {
    const filters = {
      restaurantId: req.query.restaurantId,
      categorie: req.query.categorie,
      popular: req.query.popular === 'true'
    };
    
    const dishes = await Dish.findAll(filters);
    res.json(dishes);
  } catch (error) {
    console.error('Error getting dishes:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des plats' });
  }
};

// Get popular dishes
exports.getPopularDishes = async (req, res) => {
  try {
    const dishes = await Dish.findAll({ popular: true });
    res.json(dishes);
  } catch (error) {
    console.error('Error getting popular dishes:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des plats populaires' });
  }
};

// Get dish by ID
exports.getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    
    if (!dish) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }
    
    res.json(dish);
  } catch (error) {
    console.error('Error getting dish:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du plat' });
  }
};

// Create dish
exports.createDish = async (req, res) => {
  try {
    const newDish = await Dish.create(req.body);
    res.status(201).json(newDish);
  } catch (error) {
    console.error('Error creating dish:', error);
    res.status(500).json({ message: 'Erreur lors de la création du plat' });
  }
};

// Update dish
exports.updateDish = async (req, res) => {
  try {
    const updated = await Dish.update(req.params.id, req.body);
    
    if (!updated) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }
    
    res.json(updated);
  } catch (error) {
    console.error('Error updating dish:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du plat' });
  }
};

// Delete dish
exports.deleteDish = async (req, res) => {
  try {
    const deleted = await Dish.delete(req.params.id);
    
    if (deleted === 0) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }
    
    res.json({ message: 'Plat supprimé avec succès' });
  } catch (error) {
    console.error('Error deleting dish:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du plat' });
  }
};

// Get dishes by restaurant ID
exports.getDishesByRestaurant = async (req, res) => {
  try {
    const dishes = await Dish.findAll({ restaurantId: req.params.restaurantId });
    res.json(dishes);
  } catch (error) {
    console.error('Error getting dishes by restaurant:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des plats du restaurant' });
  }
};

// Get dish categories by restaurant
exports.getCategoriesByRestaurant = async (req, res) => {
  try {
    const categories = await Dish.getCategoriesByRestaurant(req.params.restaurantId);
    res.json(categories);
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des catégories' });
  }
};