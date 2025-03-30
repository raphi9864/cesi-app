const Order = require('../models/Order');

// @desc    Créer une nouvelle commande
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { 
      items,
      totalPrice,
      deliveryFee,
      deliveryAddress,
      paymentMethod 
    } = req.body;

    if (items && items.length === 0) {
      return res.status(400).json({ message: 'Aucun article dans la commande' });
    }

    // Créer la commande
    const order = new Order({
      user: req.user._id,
      restaurant: items[0].restaurant, // Supposant tous les articles du même restaurant
      items,
      totalPrice,
      deliveryFee,
      deliveryAddress,
      paymentMethod
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Obtenir une commande par son ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'firstName lastName email')
      .populate({
        path: 'items.dish',
        select: 'name price image',
        populate: {
          path: 'restaurant',
          select: 'name'
        }
      });

    if (order) {
      // Vérifier si l'utilisateur est le propriétaire de la commande
      if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        return res.status(403).json({ message: 'Non autorisé à voir cette commande' });
      }
      res.json(order);
    } else {
      res.status(404).json({ message: 'Commande non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la commande:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Obtenir toutes les commandes d'un utilisateur
// @route   GET /api/orders/user
// @access  Private
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate({
        path: 'restaurant',
        select: 'name'
      })
      .sort('-createdAt');

    res.json(orders);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Mettre à jour le statut d'une commande
// @route   PUT /api/orders/:id/status
// @access  Private (Admin/Restaurant)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut de la commande:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}; 