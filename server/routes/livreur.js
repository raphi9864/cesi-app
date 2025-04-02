const express = require('express');
const router = express.Router();
const livreurController = require('../controllers/livreurController');
const { auth, checkRole } = require('../middleware/authMiddleware');

// Toutes les routes nécessitent une authentification et un rôle de livreur
router.use(auth);
router.use(checkRole('livreur', 'admin'));

// Routes pour la gestion du statut du livreur
router.put('/availability', livreurController.updateAvailability);
router.put('/location', livreurController.updateLocation);

// Routes pour la gestion des commandes
router.get('/orders/available', livreurController.getAvailableOrders);
router.get('/orders/history', livreurController.getDeliveryHistory);
router.put('/orders/:id/accept', livreurController.acceptOrder);
router.put('/orders/:id/deliver', livreurController.deliverOrder);

module.exports = router; 