const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');

// GET tous les plats
router.get('/', dishController.getAllDishes);

// GET les plats populaires
router.get('/popular', dishController.getPopularDishes);

// GET un plat spécifique par ID
router.get('/:id', dishController.getDishById);

// POST créer un nouveau plat
router.post('/', dishController.createDish);

// PUT mettre à jour un plat
router.put('/:id', dishController.updateDish);

// DELETE supprimer un plat
router.delete('/:id', dishController.deleteDish);

module.exports = router; 