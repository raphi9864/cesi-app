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

// Import routes
const authRoutes = require('./routes/auth');
const restaurantRoutes = require('./routes/restaurants');
const dishRoutes = require('./routes/dishes');
const orderRoutes = require('./routes/orders');
const restaurantDishesRoutes = require('./routes/restaurantDishes');
const restaurateurRoutes = require('./routes/restaurateur');
const livreurRoutes = require('./routes/livreur');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/dishes', dishRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/restaurants/:restaurantId/dishes', restaurantDishesRoutes);
app.use('/api/restaurateur', restaurateurRoutes);
app.use('/api/livreur', livreurRoutes);

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