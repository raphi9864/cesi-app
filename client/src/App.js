import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Importez les fournisseurs de contexte
import AuthProvider from './context/AuthContext';
import CartProvider from './context/CartContext';
import AppRouter from './components/AppRouter';

// Importez les CSS
import './App.css';
import './assets/css/main.css';
import './assets/css/auth.css';
import './styles/dashboard.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <React.StrictMode>
      <AuthProvider>
        <CartProvider>
          <Router>
            <AppRouter />
          </Router>
          <ToastContainer position="top-right" autoClose={3000} />
        </CartProvider>
      </AuthProvider>
    </React.StrictMode>
  );
};

export default App;
