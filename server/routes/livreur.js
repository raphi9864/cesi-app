const express = require('express');
const router = express.Router();
const { 
  updateAvailability,
  updateLocation,
  getAvailableOrders,
  acceptOrder,
  deliverOrder,
  getDeliveryHistory
} = require('../controllers/livreurController');
const { protect, isLivreur } = require('../middleware/authMiddleware');

// Toutes les routes nécessitent une authentification et un rôle de livreur
router.use(protect);
router.use(isLivreur);

// Routes pour la gestion du statut du livreur
router.put('/availability', updateAvailability);
router.put('/location', updateLocation);

// Routes pour la gestion des commandes
router.get('/orders/available', getAvailableOrders);
router.get('/orders/history', getDeliveryHistory);
router.put('/orders/:id/accept', acceptOrder);
router.put('/orders/:id/deliver', deliverOrder);

module.exports = router; 