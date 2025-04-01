const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// GET tous les restaurants
router.get('/', restaurantController.getAllRestaurants);

// GET les restaurants populaires
router.get('/popular', restaurantController.getPopularRestaurants);

// GET un restaurant spécifique par ID
router.get('/:id', restaurantController.getRestaurantById);

// POST créer un nouveau restaurant
router.post('/', restaurantController.createRestaurant);

// PUT mettre à jour un restaurant
router.put('/:id', restaurantController.updateRestaurant);

// DELETE supprimer un restaurant
router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router; 