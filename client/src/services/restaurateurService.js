import axiosInstance from './axiosConfig';

const restaurateurService = {
  // Récupérer les restaurants du restaurateur
  getMyRestaurants: async () => {
    try {
      const response = await axiosInstance.get('/restaurateur/restaurants');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erreur lors de la récupération des restaurants';
    }
  },

  // Créer un nouveau restaurant
  createRestaurant: async (restaurantData) => {
    try {
      const response = await axiosInstance.post('/restaurateur/restaurants', restaurantData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erreur lors de la création du restaurant';
    }
  },

  // Mettre à jour un restaurant
  updateRestaurant: async (restaurantId, restaurantData) => {
    try {
      const response = await axiosInstance.put(`/restaurateur/restaurants/${restaurantId}`, restaurantData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erreur lors de la mise à jour du restaurant';
    }
  },

  // Récupérer les plats d'un restaurant
  getRestaurantDishes: async (restaurantId) => {
    try {
      const response = await axiosInstance.get(`/restaurateur/restaurants/${restaurantId}/dishes`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erreur lors de la récupération des plats';
    }
  },

  // Créer un nouveau plat pour un restaurant
  createDish: async (restaurantId, dishData) => {
    try {
      const response = await axiosInstance.post(`/restaurateur/restaurants/${restaurantId}/dishes`, dishData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erreur lors de la création du plat';
    }
  },

  // Mettre à jour un plat
  updateDish: async (dishId, dishData) => {
    try {
      const response = await axiosInstance.put(`/restaurateur/dishes/${dishId}`, dishData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erreur lors de la mise à jour du plat';
    }
  }
};

export default restaurateurService; 