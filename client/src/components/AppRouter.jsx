import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import RoleProtectedRoute from './RoleProtectedRoute';
import Header from './Header';
import Footer from './Footer';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import RestaurantDetails from '../pages/RestaurantDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderConfirmation from '../pages/OrderConfirmation';
import Profile from '../pages/Profile';
import Orders from '../pages/Orders';
import OrderDetails from '../pages/OrderDetails';
import RestaurateurDashboard from '../pages/restaurateur/RestaurateurDashboard';
import LivreurDashboard from '../pages/livreur/LivreurDashboard';
import NotFound from '../pages/NotFound';
import Search from '../pages/Search';

const AppRouter = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurants" element={<Search />} />
          <Route path="/search" element={<Search />} />
          <Route path="/restaurants/:id" element={<RestaurantDetails />} />
          
          {/* Protected routes for all authenticated users */}
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/orders/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
          
          {/* Role-protected routes */}
          <Route path="/restaurateur/*" element={<RoleProtectedRoute allowedRoles={['restaurateur']}><RestaurateurRoutes /></RoleProtectedRoute>} />
          <Route path="/livreur/*" element={<RoleProtectedRoute allowedRoles={['livreur']}><LivreurRoutes /></RoleProtectedRoute>} />
          
          {/* Redirect users based on role */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>} />
          
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

// Composants pour les sous-routes
const RestaurateurRoutes = () => (
  <Routes>
    <Route path="dashboard" element={<RestaurateurDashboard />} />
    <Route path="restaurants/new" element={<div>Créer Restaurant</div>} />
    <Route path="restaurants/:id" element={<div>Gérer Restaurant</div>} />
    <Route path="restaurants/:id/menu" element={<div>Gérer Menu</div>} />
    <Route path="restaurants/:id/orders" element={<div>Commandes Restaurant</div>} />
    <Route path="orders" element={<div>Toutes les Commandes</div>} />
    <Route path="*" element={<Navigate to="/restaurateur/dashboard" />} />
  </Routes>
);

const LivreurRoutes = () => (
  <Routes>
    <Route path="dashboard" element={<LivreurDashboard />} />
    <Route path="orders/current" element={<div>Livraison en Cours</div>} />
    <Route path="orders/:id" element={<div>Détails Livraison</div>} />
    <Route path="history" element={<div>Historique des Livraisons</div>} />
    <Route path="*" element={<Navigate to="/livreur/dashboard" />} />
  </Routes>
);

const DashboardRedirect = () => {
  const { user } = useAuth();
  
  if (user.role === 'restaurateur') return <Navigate to="/restaurateur/dashboard" />;
  if (user.role === 'livreur') return <Navigate to="/livreur/dashboard" />;
  return <Navigate to="/profile" />;
};

export default AppRouter; 