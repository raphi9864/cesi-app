const express = require('express');
const router = express.Router();
const { 
  getMyRestaurants,
  createRestaurant,
  updateRestaurant,
  getRestaurantDishes,
  createDish,
  updateDish
} = require('../controllers/restaurateurController');
const { protect, isRestaurateur } = require('../middleware/authMiddleware');

// Toutes les routes nécessitent une authentification et un rôle de restaurateur
router.use(protect);
router.use(isRestaurateur);

// Routes pour les restaurants
router.route('/restaurants')
  .get(getMyRestaurants)
  .post(createRestaurant);

router.route('/restaurants/:id')
  .put(updateRestaurant);

// Routes pour les plats d'un restaurant
router.route('/restaurants/:id/dishes')
  .get(getRestaurantDishes)
  .post(createDish);

router.route('/dishes/:id')
  .put(updateDish);

module.exports = router; 