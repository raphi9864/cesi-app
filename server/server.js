// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import controllers
const restaurantController = require('./controllers/restaurantController');
const dishController = require('./controllers/dishController');
const authController = require('./controllers/authController');
const orderController = require('./controllers/orderController');

// Import middleware
const { auth, checkRole } = require('./middleware/authMiddleware');

// Routes publiques
// Restaurant routes
app.get('/api/restaurants', restaurantController.getAllRestaurants);
app.get('/api/restaurants/:id', restaurantController.getRestaurantById);

// Dish routes
app.get('/api/dishes', dishController.getAllDishes);
app.get('/api/dishes/:id', dishController.getDishById);

// Restaurant dishes routes
app.get('/api/restaurants/:restaurantId/dishes', dishController.getDishesByRestaurant);
app.get('/api/restaurants/:restaurantId/categories', dishController.getCategoriesByRestaurant);

// Auth routes
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);
app.get('/api/auth/me', auth, authController.getCurrentUser);
app.put('/api/auth/update', auth, authController.updateProfile);

// Order routes (authenticated)
app.post('/api/orders', auth, orderController.createOrder);
app.get('/api/orders', auth, orderController.getUserOrders);
app.get('/api/orders/:id', auth, orderController.getOrderById);
app.put('/api/orders/:id/status', auth, orderController.updateOrderStatus);
app.delete('/api/orders/:id', auth, orderController.deleteOrder);

// Restaurateur routes
app.get('/api/restaurateur/restaurants/:restaurantId/orders', 
  auth, 
  checkRole('restaurateur', 'admin'), 
  orderController.getRestaurantOrders
);
app.post('/api/restaurateur/restaurants', 
  auth, 
  checkRole('restaurateur', 'admin'), 
  restaurantController.createRestaurant
);
app.put('/api/restaurateur/restaurants/:id', 
  auth, 
  checkRole('restaurateur', 'admin'), 
  restaurantController.updateRestaurant
);
app.delete('/api/restaurateur/restaurants/:id', 
  auth, 
  checkRole('restaurateur', 'admin'), 
  restaurantController.deleteRestaurant
);
app.post('/api/restaurateur/dishes', 
  auth, 
  checkRole('restaurateur', 'admin'), 
  dishController.createDish
);
app.put('/api/restaurateur/dishes/:id', 
  auth, 
  checkRole('restaurateur', 'admin'), 
  dishController.updateDish
);
app.delete('/api/restaurateur/dishes/:id', 
  auth, 
  checkRole('restaurateur', 'admin'), 
  dishController.deleteDish
);

// Route de test pour vérifier que l'API fonctionne
app.get('/api/test', (req, res) => {
  res.json({ message: 'API CESI EAT fonctionne!' });
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Une erreur est survenue sur le serveur' });
});

// Tester la connexion à la base de données
db.raw('SELECT 1')
  .then(() => {
    console.log('MySQL connecté');
    
    // Démarrage du serveur
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erreur de connexion MySQL:', err);
  });