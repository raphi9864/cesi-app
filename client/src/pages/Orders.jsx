import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulation de chargement des commandes
    setTimeout(() => {
      // Commandes factices pour la démonstration
      const mockOrders = [
        {
          _id: 'ord123',
          restaurant: {
            _id: 'rest1',
            nom: 'Le Bistro Français',
            image: 'https://via.placeholder.com/150'
          },
          items: [
            { nom: 'Steak Frites', quantite: 1, prix: 15.90 },
            { nom: 'Mousse au Chocolat', quantite: 2, prix: 6.50 }
          ],
          statut: 'livré',
          total: 28.90,
          date: new Date('2023-04-15T18:30:00'),
          adresseLivraison: '123 Rue de la Paix, 75001 Paris'
        },
        {
          _id: 'ord456',
          restaurant: {
            _id: 'rest2',
            nom: 'Sushi Paradise',
            image: 'https://via.placeholder.com/150'
          },
          items: [
            { nom: 'Plateau Mixte', quantite: 1, prix: 22.50 },
            { nom: 'Mochi', quantite: 3, prix: 2.00 }
          ],
          statut: 'en livraison',
          total: 28.50,
          date: new Date('2023-04-18T19:15:00'),
          adresseLivraison: '123 Rue de la Paix, 75001 Paris'
        }
      ];
      
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, [user]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Chargement de vos commandes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <h1>Mes Commandes</h1>
        
        {orders.length === 0 ? (
          <div className="no-orders">
            <h3>Vous n'avez pas encore de commande</h3>
            <p>Découvrez nos restaurants et passez votre première commande !</p>
            <Link to="/restaurants" className="btn btn-primary">
              Explorer les restaurants
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="restaurant-info">
                    <img src={order.restaurant.image} alt={order.restaurant.nom} />
                    <div>
                      <h3>{order.restaurant.nom}</h3>
                      <div className="order-date">
                        {new Date(order.date).toLocaleDateString('fr-FR', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                  <div className={`order-status status-${order.statut}`}>
                    {formatStatus(order.statut)}
                  </div>
                </div>
                
                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <span key={idx} className="order-item">
                      {item.quantite}× {item.nom}
                      {idx < order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>
                
                <div className="order-footer">
                  <div className="order-total">
                    Total: {order.total.toFixed(2)} €
                  </div>
                  <Link to={`/orders/${order._id}`} className="btn btn-outline">
                    Voir les détails
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Fonctions auxiliaires pour formater les statuts
function formatStatus(status) {
  switch(status) {
    case 'en attente': return 'En attente';
    case 'confirmé': return 'Confirmé';
    case 'en préparation': return 'En préparation';
    case 'prêt': return 'Prêt';
    case 'en livraison': return 'En livraison';
    case 'livré': return 'Livré';
    case 'annulé': return 'Annulé';
    default: return status;
  }
}

export default Orders; 