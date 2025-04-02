const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');
const { auth, checkRole } = require('../middleware/authMiddleware');

// GET tous les plats (public)
router.get('/', dishController.getAllDishes);

// GET les plats populaires (public)
router.get('/popular', dishController.getPopularDishes);

// GET un plat spécifique par ID (public)
router.get('/:id', dishController.getDishById);

// Routes protégées (admin/restaurateur uniquement)
// POST créer un nouveau plat
router.post('/', auth, checkRole('admin', 'restaurateur'), dishController.createDish);

// PUT mettre à jour un plat
router.put('/:id', auth, checkRole('admin', 'restaurateur'), dishController.updateDish);

// DELETE supprimer un plat
router.delete('/:id', auth, checkRole('admin', 'restaurateur'), dishController.deleteDish);

module.exports = router; 