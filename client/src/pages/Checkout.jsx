import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    zipCode: user?.zipCode || '',
    city: user?.city || '',
    country: user?.country || 'France',
    useForBilling: true
  });
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDeliveryDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (cartItems.length === 0) {
      setError('Votre panier est vide');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Simulation d'une commande réussie
      setTimeout(() => {
        clearCart();
        navigate('/order-confirmation', { 
          state: { orderId: 'ORD-' + Math.floor(Math.random() * 10000) }
        });
      }, 1500);
      
    } catch (err) {
      console.error('Erreur lors de la création de la commande:', err);
      setError('Une erreur est survenue lors de la création de votre commande. Veuillez réessayer.');
      setIsSubmitting(false);
    }
  };
  
  const deliveryFee = 3.99;
  const total = totalPrice + deliveryFee;
  
  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Finaliser la commande</h1>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="checkout-grid">
          <div className="checkout-form">
            <form onSubmit={handleSubmit}>
              <h2>Informations de livraison</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">Prénom</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={deliveryDetails.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName">Nom</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={deliveryDetails.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={deliveryDetails.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={deliveryDetails.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Adresse</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={deliveryDetails.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="zipCode">Code postal</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={deliveryDetails.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="city">Ville</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={deliveryDetails.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="country">Pays</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={deliveryDetails.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <h2>Mode de paiement</h2>
              
              <div className="payment-methods">
                <div 
                  className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="payment-icon">
                    <i className="fas fa-credit-card"></i>
                  </div>
                  <div className="payment-info">
                    <h3>Carte bancaire</h3>
                    <p>Paiement sécurisé par carte</p>
                  </div>
                </div>
                
                <div 
                  className={`payment-method ${paymentMethod === 'cash' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('cash')}
                >
                  <div className="payment-icon">
                    <i className="fas fa-money-bill-wave"></i>
                  </div>
                  <div className="payment-info">
                    <h3>Espèces</h3>
                    <p>Paiement à la livraison</p>
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary checkout-btn"
                disabled={isSubmitting || cartItems.length === 0}
              >
                {isSubmitting ? 'Traitement en cours...' : 'Passer la commande'}
              </button>
            </form>
          </div>
          
          <div className="order-summary">
            <h2>Récapitulatif de la commande</h2>
            
            <div className="cart-items">
              {cartItems.length === 0 ? (
                <p className="empty-cart">Votre panier est vide</p>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-quantity">Quantité: {item.quantity}</p>
                    </div>
                    <div className="item-price">{(item.price * item.quantity).toFixed(2)} €</div>
                  </div>
                ))
              )}
            </div>
            
            <div className="order-totals">
              <div className="subtotal">
                <span>Sous-total</span>
                <span>{totalPrice.toFixed(2)} €</span>
              </div>
              <div className="delivery-fee">
                <span>Frais de livraison</span>
                <span>{deliveryFee.toFixed(2)} €</span>
              </div>
              <div className="total">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 