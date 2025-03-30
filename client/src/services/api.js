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
  getAllRestaurants: () => api.get('/restaurants'),
  getRestaurantById: (id) => api.get(`/restaurants/${id}`),
  getRestaurantDishes: (id) => api.get(`/restaurants/${id}/dishes`),
};

// Services pour les plats
export const dishService = {
  getAllDishes: () => api.get('/dishes'),
  getPopularDishes: () => api.get('/dishes/popular'),
  getDishById: (id) => api.get(`/dishes/${id}`),
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