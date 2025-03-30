import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 20px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '20px', fontSize: '2rem' }}>Votre panier est vide</h1>
        <p style={{ marginBottom: '30px', color: '#666' }}>Ajoutez des plats à votre panier pour commander</p>
        <Link to="/" style={{ 
          backgroundColor: 'black', 
          color: 'white', 
          padding: '12px 24px', 
          borderRadius: '30px', 
          textDecoration: 'none', 
          display: 'inline-block' 
        }}>
          Parcourir les restaurants
        </Link>
      </div>
    );
  }
  
  return (
    <div className="cart-page" style={{ padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ marginBottom: '30px', fontSize: '2rem' }}>Votre panier</h1>
        
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 600px' }}>
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '10px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              overflow: 'hidden',
              marginBottom: '30px'
            }}>
              <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
                <h2 style={{ fontSize: '1.3rem' }}>Articles ({cartItems.length})</h2>
              </div>
              
              {cartItems.map(item => (
                <div key={item.id} style={{ 
                  padding: '20px', 
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  gap: '20px'
                }}>
                  <div style={{ width: '80px', height: '80px' }}>
                    <img 
                      src={item.image} 
                      alt={item.nom} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }}
                    />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: '5px', fontSize: '1.1rem' }}>{item.nom}</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '10px' }}>
                      {item.restaurantNom || "Restaurant"}
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center' 
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{ 
                            width: '30px', 
                            height: '30px', 
                            borderRadius: '50%', 
                            border: '1px solid #ddd', 
                            background: 'white',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{ 
                            width: '30px', 
                            height: '30px', 
                            borderRadius: '50%', 
                            border: '1px solid #ddd', 
                            background: 'white',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          +
                        </button>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span style={{ fontWeight: '600', color: '#FF6B57' }}>
                          {(item.prix * item.quantity).toFixed(2)} €
                        </span>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          style={{ 
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer', 
                            color: '#999',
                            fontSize: '1.2rem'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div style={{ padding: '20px', textAlign: 'right' }}>
                <button 
                  onClick={clearCart}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#FF6B57', 
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Vider le panier
                </button>
              </div>
            </div>
          </div>
          
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '10px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              padding: '20px',
              position: 'sticky',
              top: '20px'
            }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Résumé de la commande</h2>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '10px' 
                }}>
                  <span>Sous-total</span>
                  <span>{cartTotal.toFixed(2)} €</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '10px' 
                }}>
                  <span>Frais de livraison</span>
                  <span>2.99 €</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  marginTop: '15px',
                  paddingTop: '15px',
                  borderTop: '1px solid #eee'
                }}>
                  <span>Total</span>
                  <span>{(cartTotal + 2.99).toFixed(2)} €</span>
                </div>
              </div>
              
              <button style={{ 
                width: '100%', 
                backgroundColor: 'black', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                padding: '12px', 
                fontSize: '1rem', 
                fontWeight: '600', 
                cursor: 'pointer',
                marginBottom: '15px'
              }}>
                Passer commande
              </button>
              
              <Link to="/" style={{ 
                display: 'block', 
                textAlign: 'center', 
                color: '#666', 
                textDecoration: 'none', 
                fontSize: '0.9rem' 
              }}>
                Continuer vos achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 