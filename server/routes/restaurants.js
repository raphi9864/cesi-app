const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const { auth, checkRole } = require('../middleware/authMiddleware');

// GET tous les restaurants (public)
router.get('/', restaurantController.getAllRestaurants);

// GET les restaurants populaires (public)
router.get('/popular', restaurantController.getPopularRestaurants);

// GET un restaurant spécifique par ID (public)
router.get('/:id', restaurantController.getRestaurantById);

// Routes protégées (admin/restaurateur uniquement)
// POST créer un nouveau restaurant
router.post('/', auth, checkRole('admin', 'restaurateur'), restaurantController.createRestaurant);

// PUT mettre à jour un restaurant
router.put('/:id', auth, checkRole('admin', 'restaurateur'), restaurantController.updateRestaurant);

// DELETE supprimer un restaurant
router.delete('/:id', auth, checkRole('admin', 'restaurateur'), restaurantController.deleteRestaurant);

module.exports = router; 