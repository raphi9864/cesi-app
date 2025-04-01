import axios from 'axios';

// Créer une instance axios avec l'URL de base de l'API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Services pour les restaurants
export const restaurantService = {
  getAll: async () => {
    try {
      const response = await api.get('/restaurants');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des restaurants:', error);
      throw error;
    }
  },

  getPopular: async () => {
    try {
      const response = await api.get('/restaurants/popular');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des restaurants populaires:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/restaurants/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du restaurant ${id}:`, error);
      throw error;
    }
  }
};

// Services pour les plats
export const platService = {
  getAll: async () => {
    try {
      const response = await api.get('/dishes');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des plats:', error);
      throw error;
    }
  },

  getPopular: async () => {
    try {
      const response = await api.get('/dishes/popular');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des plats populaires:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/dishes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du plat ${id}:`, error);
      throw error;
    }
  },

  getByRestaurant: async (restaurantId) => {
    try {
      const response = await api.get(`/restaurants/${restaurantId}/dishes`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des plats du restaurant ${restaurantId}:`, error);
      throw error;
    }
  }
};

// Services pour les commandes
export const orderService = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getOrderById: (id) => api.get(`/orders/${id}`),
  getUserOrders: () => api.get('/orders/user'),
};

// Services pour l'authentification
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/user'),
};

export default api; 