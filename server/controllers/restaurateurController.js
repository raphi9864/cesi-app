const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Dish = require('../models/Dish');

// @desc    Obtenir les restaurants du restaurateur connecté
// @route   GET /api/restaurateur/restaurants
// @access  Private/Restaurateur
exports.getMyRestaurants = async (req, res) => {
  try {
    // Vérifier si l'utilisateur a un profil restaurateur
    if (!req.user.restaurateurProfile) {
      return res.status(400).json({ message: 'Profil restaurateur non trouvé' });
    }

    // Récupérer les restaurants liés à ce restaurateur
    const restaurants = await Restaurant.find({
      _id: { $in: req.user.restaurateurProfile.restaurants }
    });

    res.json(restaurants);
  } catch (error) {
    console.error('Erreur lors de la récupération des restaurants:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Créer un nouveau restaurant
// @route   POST /api/restaurateur/restaurants
// @access  Private/Restaurateur
exports.createRestaurant = async (req, res) => {
  try {
    const {
      nom,
      adresse,
      image,
      categories,
      horaires,
      tempsLivraison,
      fraisLivraison,
      commandeMinimum
    } = req.body;

    // Créer le restaurant
    const restaurant = await Restaurant.create({
      nom,
      adresse,
      image,
      categories: typeof categories === 'string' ? categories.split(',') : categories,
      horaires,
      tempsLivraison,
      fraisLivraison,
      commandeMinimum
    });

    // Mettre à jour le profil du restaurateur pour inclure ce restaurant
    if (!req.user.restaurateurProfile) {
      req.user.restaurateurProfile = { restaurants: [] };
    }
    
    req.user.restaurateurProfile.restaurants.push(restaurant._id);
    await req.user.save();

    res.status(201).json(restaurant);
  } catch (error) {
    console.error('Erreur lors de la création du restaurant:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Mettre à jour un restaurant
// @route   PUT /api/restaurateur/restaurants/:id
// @access  Private/Restaurateur
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    
    // Vérifier si le restaurant existe et appartient à ce restaurateur
    const restaurant = await Restaurant.findById(restaurantId);
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant non trouvé' });
    }
    
    // Vérifier si le restaurateur possède ce restaurant
    if (!req.user.restaurateurProfile || 
        !req.user.restaurateurProfile.restaurants.includes(restaurantId)) {
      return res.status(403).json({ message: 'Non autorisé, ce restaurant ne vous appartient pas' });
    }
    
    // Mettre à jour le restaurant
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    res.json(updatedRestaurant);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du restaurant:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Obtenir les plats d'un restaurant
// @route   GET /api/restaurateur/restaurants/:id/dishes
// @access  Private/Restaurateur
exports.getRestaurantDishes = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    
    // Vérifier si le restaurant existe et appartient à ce restaurateur
    const restaurantExists = await Restaurant.findById(restaurantId);
    
    if (!restaurantExists) {
      return res.status(404).json({ message: 'Restaurant non trouvé' });
    }
    
    // Vérifier si le restaurateur possède ce restaurant
    if (!req.user.restaurateurProfile || 
        !req.user.restaurateurProfile.restaurants.includes(restaurantId)) {
      return res.status(403).json({ message: 'Non autorisé, ce restaurant ne vous appartient pas' });
    }
    
    // Récupérer les plats du restaurant
    const dishes = await Dish.find({ restaurantId });
    
    res.json(dishes);
  } catch (error) {
    console.error('Erreur lors de la récupération des plats:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Créer un nouveau plat pour un restaurant
// @route   POST /api/restaurateur/restaurants/:id/dishes
// @access  Private/Restaurateur
exports.createDish = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    
    // Vérifier si le restaurant existe et appartient à ce restaurateur
    const restaurant = await Restaurant.findById(restaurantId);
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant non trouvé' });
    }
    
    // Vérifier si le restaurateur possède ce restaurant
    if (!req.user.restaurateurProfile || 
        !req.user.restaurateurProfile.restaurants.includes(restaurantId)) {
      return res.status(403).json({ message: 'Non autorisé, ce restaurant ne vous appartient pas' });
    }
    
    const {
      nom,
      description,
      prix,
      image,
      categorie,
      popular = false
    } = req.body;
    
    // Créer le plat
    const dish = await Dish.create({
      nom,
      description,
      prix,
      image,
      categorie,
      restaurantId,
      restaurant: restaurant.nom,
      popular
    });
    
    res.status(201).json(dish);
  } catch (error) {
    console.error('Erreur lors de la création du plat:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Mettre à jour un plat
// @route   PUT /api/restaurateur/dishes/:id
// @access  Private/Restaurateur
exports.updateDish = async (req, res) => {
  try {
    const dishId = req.params.id;
    
    // Récupérer le plat
    const dish = await Dish.findById(dishId);
    
    if (!dish) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }
    
    // Vérifier si le restaurateur possède le restaurant de ce plat
    if (!req.user.restaurateurProfile || 
        !req.user.restaurateurProfile.restaurants.includes(dish.restaurantId)) {
      return res.status(403).json({ message: 'Non autorisé, ce plat ne vous appartient pas' });
    }
    
    // Mettre à jour le plat
    const updatedDish = await Dish.findByIdAndUpdate(
      dishId,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    res.json(updatedDish);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du plat:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}; 