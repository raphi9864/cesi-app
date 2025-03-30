const Dish = require('../models/Dish');

// GET tous les plats
exports.getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find().populate('restaurant');
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET les plats populaires
exports.getPopularDishes = async (req, res) => {
  try {
    const popularDishes = await Dish.find({ isPopular: true })
      .populate('restaurant');
    res.json(popularDishes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET un plat spécifique par ID
exports.getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id).populate('restaurant');
    if (!dish) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }
    res.json(dish);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET tous les plats d'un restaurant spécifique
exports.getRestaurantDishes = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const dishes = await Dish.find({ restaurant: restaurantId });
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST créer un nouveau plat
exports.createDish = async (req, res) => {
  const dish = new Dish(req.body);
  try {
    const newDish = await dish.save();
    res.status(201).json(newDish);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT mettre à jour un plat
exports.updateDish = async (req, res) => {
  try {
    const updatedDish = await Dish.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDish) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }
    res.json(updatedDish);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE supprimer un plat
exports.deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }
    res.json({ message: 'Plat supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 