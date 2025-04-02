const express = require('express');
const router = express.Router({ mergeParams: true });
const dishController = require('../controllers/dishController');

// GET tous les plats d'un restaurant spécifique
router.get('/', dishController.getDishesByRestaurant);

// GET les catégories de plats d'un restaurant
router.get('/categories', dishController.getCategoriesByRestaurant);

module.exports = router; 