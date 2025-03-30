const express = require('express');
const router = express.Router({ mergeParams: true });
const dishController = require('../controllers/dishController');

// GET tous les plats d'un restaurant spécifique
router.get('/', dishController.getRestaurantDishes);

module.exports = router; 