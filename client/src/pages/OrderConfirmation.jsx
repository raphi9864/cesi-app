import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderId } = location.state || {};
  
  // Si pas d'ID de commande, rediriger vers la page d'accueil
  if (!orderId) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="order-confirmation-page">
      <div className="container">
        <div className="confirmation-content">
          <div className="confirmation-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          
          <h1>Commande confirmée!</h1>
          
          <div className="order-info">
            <p className="order-id">Numéro de commande: <strong>{orderId}</strong></p>
            <p className="order-message">
              Merci pour votre commande! Vous recevrez un email de confirmation 
              avec tous les détails de votre commande.
            </p>
          </div>
          
          <div className="delivery-info">
            <h2>Informations de livraison</h2>
            <p>
              Votre commande est en cours de préparation. Le temps de livraison 
              estimé est de 30-45 minutes.
            </p>
            <p>
              Vous pouvez suivre l'état de votre commande dans la section 
              "Mes commandes" de votre compte.
            </p>
          </div>
          
          <div className="confirmation-actions">
            <Link to="/" className="btn btn-primary">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 