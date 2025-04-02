const express = require('express');
const router = express.Router();
const restaurateurController = require('../controllers/restaurateurController');
const restaurantController = require('../controllers/restaurantController');
const dishController = require('../controllers/dishController');
const orderController = require('../controllers/orderController');
const { auth, checkRole } = require('../middleware/authMiddleware');

// Toutes les routes nécessitent une authentification et un rôle de restaurateur
router.use(auth);
router.use(checkRole('restaurateur', 'admin'));

// Routes pour les restaurants du restaurateur
router.get('/restaurants', restaurateurController.getMyRestaurants);
router.post('/restaurants', restaurantController.createRestaurant);
router.put('/restaurants/:id', restaurantController.updateRestaurant);
router.delete('/restaurants/:id', restaurantController.deleteRestaurant);

// Routes pour les commandes des restaurants
router.get('/restaurants/:restaurantId/orders', orderController.getRestaurantOrders);

// Routes pour les plats des restaurants
router.get('/restaurants/:restaurantId/dishes', dishController.getDishesByRestaurant);
router.post('/dishes', dishController.createDish);
router.put('/dishes/:id', dishController.updateDish);
router.delete('/dishes/:id', dishController.deleteDish);

module.exports = router; 