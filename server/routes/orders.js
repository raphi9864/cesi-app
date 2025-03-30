const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// Routes nécessitant un token valide
router.use(protect);

// Créer une commande
router.post('/', orderController.createOrder);

// Obtenir les commandes de l'utilisateur connecté
router.get('/user', orderController.getUserOrders);

// Obtenir une commande par son ID
router.get('/:id', orderController.getOrderById);

// Mettre à jour le statut d'une commande (admin seulement)
router.put('/:id/status', admin, orderController.updateOrderStatus);

module.exports = router; 