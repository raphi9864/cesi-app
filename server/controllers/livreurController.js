const User = require('../models/User');
const Order = require('../models/Order');

// @desc    Mettre à jour la disponibilité du livreur
// @route   PUT /api/livreur/availability
// @access  Private/Livreur
exports.updateAvailability = async (req, res) => {
  try {
    const { isAvailable } = req.body;
    
    // Vérifier si l'utilisateur a un profil livreur
    if (!req.user.livreurProfile) {
      return res.status(400).json({ message: 'Profil livreur non trouvé' });
    }
    
    // Mettre à jour la disponibilité
    req.user.livreurProfile.isAvailable = isAvailable;
    await req.user.save();
    
    res.json({ 
      message: `Disponibilité mise à jour : ${isAvailable ? 'Disponible' : 'Non disponible'}`,
      isAvailable 
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la disponibilité:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Mettre à jour la position du livreur
// @route   PUT /api/livreur/location
// @access  Private/Livreur
exports.updateLocation = async (req, res) => {
  try {
    const { longitude, latitude } = req.body;
    
    // Vérifier si l'utilisateur a un profil livreur
    if (!req.user.livreurProfile) {
      return res.status(400).json({ message: 'Profil livreur non trouvé' });
    }
    
    // Mettre à jour la position
    req.user.livreurProfile.currentLocation = {
      type: 'Point',
      coordinates: [longitude, latitude]
    };
    await req.user.save();
    
    res.json({ 
      message: 'Position mise à jour avec succès',
      location: req.user.livreurProfile.currentLocation
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la position:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Obtenir les commandes disponibles pour livraison
// @route   GET /api/livreur/orders/available
// @access  Private/Livreur
exports.getAvailableOrders = async (req, res) => {
  try {
    // Récupérer les commandes prêtes pour livraison et non assignées
    const orders = await Order.find({ 
      status: 'ready_for_delivery',
      deliveryPerson: { $exists: false }
    })
    .populate('restaurant', 'nom adresse')
    .populate('user', 'firstName lastName address');
    
    res.json(orders);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes disponibles:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Accepter une commande pour livraison
// @route   PUT /api/livreur/orders/:id/accept
// @access  Private/Livreur
exports.acceptOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    
    // Vérifier si la commande existe et est disponible
    const order = await Order.findOne({ 
      _id: orderId,
      status: 'ready_for_delivery',
      deliveryPerson: { $exists: false }
    });
    
    if (!order) {
      return res.status(404).json({ 
        message: 'Commande non trouvée ou déjà assignée à un autre livreur' 
      });
    }
    
    // Vérifier si le livreur est disponible
    if (!req.user.livreurProfile || !req.user.livreurProfile.isAvailable) {
      return res.status(400).json({ 
        message: 'Vous devez être disponible pour accepter des commandes' 
      });
    }
    
    // Assigner la commande au livreur et mettre à jour le statut
    order.deliveryPerson = req.user._id;
    order.status = 'out_for_delivery';
    
    // Estimer le temps de livraison
    const now = new Date();
    const estimatedDeliveryTime = new Date(now.getTime() + 30 * 60000); // +30 minutes
    order.estimatedDeliveryTime = estimatedDeliveryTime;
    
    await order.save();
    
    res.json({
      message: 'Commande acceptée avec succès',
      order
    });
  } catch (error) {
    console.error('Erreur lors de l\'acceptation de la commande:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Marquer une commande comme livrée
// @route   PUT /api/livreur/orders/:id/deliver
// @access  Private/Livreur
exports.deliverOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    
    // Vérifier si la commande existe et est assignée à ce livreur
    const order = await Order.findOne({ 
      _id: orderId,
      status: 'out_for_delivery',
      deliveryPerson: req.user._id
    });
    
    if (!order) {
      return res.status(404).json({ 
        message: 'Commande non trouvée ou non assignée à vous' 
      });
    }
    
    // Mettre à jour le statut et l'heure de livraison
    order.status = 'delivered';
    order.actualDeliveryTime = new Date();
    await order.save();
    
    res.json({
      message: 'Commande marquée comme livrée avec succès',
      order
    });
  } catch (error) {
    console.error('Erreur lors de la livraison de la commande:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Obtenir l'historique des livraisons du livreur
// @route   GET /api/livreur/orders/history
// @access  Private/Livreur
exports.getDeliveryHistory = async (req, res) => {
  try {
    // Récupérer les commandes livrées par ce livreur
    const orders = await Order.find({ 
      deliveryPerson: req.user._id,
      status: 'delivered'
    })
    .populate('restaurant', 'nom adresse')
    .populate('user', 'firstName lastName address')
    .sort({ actualDeliveryTime: -1 });
    
    res.json(orders);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique des livraisons:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}; 