// controllers/orderController.js
const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    // Use user ID from token
    const order = {
      ...req.body,
      user_id: req.user.id
    };
    
    const newOrder = await Order.create(order);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la commande' });
  }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findByUser(req.user.id);
    res.json(orders);
  } catch (error) {
    console.error('Error getting user orders:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    
    // Check if user is authorized to view this order
    if (req.user.role === 'client' && order.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Non autorisé' });
    }
    
    // If user is restaurateur, check if order belongs to their restaurant
    if (req.user.role === 'restaurateur') {
      const userRestaurants = req.user.restaurateurProfile.restaurants || [];
      if (!userRestaurants.includes(order.restaurant_id)) {
        return res.status(403).json({ message: 'Non autorisé' });
      }
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error getting order:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la commande' });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: 'Le statut est requis' });
    }
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    
    // Check permissions based on role and status
    if (req.user.role === 'client') {
      // Clients can only cancel their own orders
      if (status !== 'cancelled' || order.user_id !== req.user.id) {
        return res.status(403).json({ message: 'Non autorisé' });
      }
    } else if (req.user.role === 'restaurateur') {
      // Restaurateurs can only update orders for their restaurants
      const userRestaurants = req.user.restaurateurProfile.restaurants || [];
      if (!userRestaurants.includes(order.restaurant_id)) {
        return res.status(403).json({ message: 'Non autorisé' });
      }
      
      // Restaurateurs can only set specific statuses
      const allowedStatuses = ['confirmed', 'preparing', 'cancelled'];
      if (!allowedStatuses.includes(status)) {
        return res.status(403).json({ message: 'Statut non autorisé' });
      }
    } else if (req.user.role === 'livreur') {
      // Livreurs can only set specific statuses
      const allowedStatuses = ['out_for_delivery', 'delivered'];
      if (!allowedStatuses.includes(status)) {
        return res.status(403).json({ message: 'Statut non autorisé' });
      }
    }
    
    const updatedOrder = await Order.updateStatus(req.params.id, status);
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du statut de la commande' });
  }
};

// Get restaurant orders (for restaurateur)
exports.getRestaurantOrders = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    
    // Check if user is authorized to view restaurant orders
    if (req.user.role === 'restaurateur') {
      const userRestaurants = req.user.restaurateurProfile.restaurants || [];
      if (!userRestaurants.includes(parseInt(restaurantId))) {
        return res.status(403).json({ message: 'Non autorisé' });
      }
    } else if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Non autorisé' });
    }
    
    const orders = await Order.findByRestaurant(restaurantId);
    res.json(orders);
  } catch (error) {
    console.error('Error getting restaurant orders:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des commandes du restaurant' });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    
    // Only the user who created the order or an admin can delete it
    if (req.user.role !== 'admin' && order.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Non autorisé' });
    }
    
    await Order.delete(req.params.id);
    res.json({ message: 'Commande supprimée avec succès' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la commande' });
  }
};