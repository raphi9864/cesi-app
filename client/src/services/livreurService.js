import axiosInstance from './axiosConfig';

const livreurService = {
  // Mettre à jour la disponibilité du livreur
  updateAvailability: async (isAvailable) => {
    try {
      const response = await axiosInstance.put('/livreur/availability', { isAvailable });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erreur lors de la mise à jour de la disponibilité';
    }
  },

  // Mettre à jour la position du livreur
  updateLocation: async (longitude, latitude) => {
    try {
      const response = await axiosInstance.put('/livreur/location', { longitude, latitude });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erreur lors de la mise à jour de la position';
    }
  },

  // Récupérer les commandes disponibles pour livraison
  getAvailableOrders: async () => {
    try {
      const response = await axiosInstance.get('/livreur/orders/available');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erreur lors de la récupération des commandes disponibles';
    }
  },

  // Récupérer l'historique des livraisons
  getDeliveryHistory: async () => {
    try {
      const response = await axiosInstance.get('/livreur/orders/history');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erreur lors de la récupération de l\'historique des livraisons';
    }
  },

  // Accepter une commande pour livraison
  acceptOrder: async (orderId) => {
    try {
      const response = await axiosInstance.put(`/livreur/orders/${orderId}/accept`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erreur lors de l\'acceptation de la commande';
    }
  },

  // Marquer une commande comme livrée
  deliverOrder: async (orderId) => {
    try {
      const response = await axiosInstance.put(`/livreur/orders/${orderId}/deliver`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erreur lors de la livraison de la commande';
    }
  }
};

export default livreurService; 