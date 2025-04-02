const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { auth, checkRole } = require('../middleware/authMiddleware');

// Routes nécessitant un token valide
router.use(auth);

// Créer une commande
router.post('/', orderController.createOrder);

// Obtenir les commandes de l'utilisateur connecté
router.get('/', orderController.getUserOrders);

// Obtenir une commande par son ID
router.get('/:id', orderController.getOrderById);

// Mettre à jour le statut d'une commande (admin seulement)
router.put('/:id/status', checkRole('admin', 'restaurateur'), orderController.updateOrderStatus);

// Supprimer une commande
router.delete('/:id', orderController.deleteOrder);

module.exports = router; 