import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import livreurService from '../../services/livreurService';

const LivreurDashboard = () => {
  const { user } = useAuth();
  const [availableOrders, setAvailableOrders] = useState([]);
  const [isAvailable, setIsAvailable] = useState(user?.isAvailable || false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await livreurService.getAvailableOrders();
        setAvailableOrders(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des commandes: ' + err.message);
        setLoading(false);
      }
    };

    if (isAvailable) {
      fetchOrders();
      // Rafraîchir les commandes disponibles toutes les 30 secondes
      const interval = setInterval(fetchOrders, 30000);
      return () => clearInterval(interval);
    } else {
      setLoading(false);
    }
  }, [isAvailable]);

  const toggleAvailability = async () => {
    try {
      setLoading(true);
      await livreurService.updateAvailability(!isAvailable);
      setIsAvailable(!isAvailable);
      if (!isAvailable) {
        // Si on passe à disponible, activer la géolocalisation
        activateGeolocation();
      }
    } catch (err) {
      setError('Erreur lors de la mise à jour de la disponibilité: ' + err.message);
      setLoading(false);
    }
  };

  const activateGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            await livreurService.updateLocation(
              position.coords.longitude,
              position.coords.latitude
            );
          } catch (err) {
            setError('Erreur lors de la mise à jour de la position: ' + err.message);
          }
        },
        (err) => {
          setError('Erreur de géolocalisation: ' + err.message);
        }
      );

      // Mettre à jour la position tous les 5 minutes
      const watchId = navigator.geolocation.watchPosition(
        async (position) => {
          try {
            await livreurService.updateLocation(
              position.coords.longitude,
              position.coords.latitude
            );
          } catch (err) {
            console.error('Erreur lors de la mise à jour de la position:', err);
          }
        },
        (err) => {
          console.error('Erreur de géolocalisation:', err);
        },
        { maximumAge: 300000 } // 5 minutes
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setError('La géolocalisation n\'est pas disponible sur votre navigateur');
    }
  };

  const acceptOrder = async (orderId) => {
    try {
      setLoading(true);
      await livreurService.acceptOrder(orderId);
      // Rediriger vers la page de détails de la commande
      window.location.href = `/livreur/orders/${orderId}`;
    } catch (err) {
      setError('Erreur lors de l\'acceptation de la commande: ' + err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Chargement des données...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Dashboard Livreur</h1>
          <p>Bienvenue, {user.firstName} {user.lastName}</p>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-sidebar">
            <div className="user-profile">
              <img src="https://via.placeholder.com/100x100?text=Avatar" alt="Avatar" className="user-avatar" />
              <div className="user-info">
                <h3>{user.firstName} {user.lastName}</h3>
                <p>{user.email}</p>
                <span className="badge badge-livreur">Livreur</span>
              </div>
            </div>

            <ul className="dashboard-menu">
              <li className="active">
                <Link to="/livreur/dashboard">Tableau de bord</Link>
              </li>
              <li>
                <Link to="/livreur/orders/current">Livraison en cours</Link>
              </li>
              <li>
                <Link to="/livreur/history">Historique</Link>
              </li>
              <li>
                <Link to="/profile">Mon Profil</Link>
              </li>
            </ul>

            <div className="availability-toggle">
              <h3>Disponibilité</h3>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={isAvailable} 
                  onChange={toggleAvailability} 
                />
                <span className="slider round"></span>
              </label>
              <p>{isAvailable ? 'Disponible' : 'Indisponible'}</p>
            </div>
          </div>

          <div className="dashboard-main">
            <div className="section-header">
              <h2>Commandes disponibles</h2>
            </div>

            {error && <div className="error-message">{error}</div>}

            {!isAvailable ? (
              <div className="empty-state">
                <div className="empty-icon">🚫</div>
                <h3>Vous êtes hors ligne</h3>
                <p>Activez votre disponibilité pour voir les commandes disponibles.</p>
                <button className="btn btn-primary" onClick={toggleAvailability}>
                  Devenir disponible
                </button>
              </div>
            ) : availableOrders.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <h3>Aucune commande disponible</h3>
                <p>Il n'y a aucune commande à livrer pour le moment. Revenez plus tard.</p>
              </div>
            ) : (
              <div className="orders-list">
                {availableOrders.map(order => (
                  <div key={order._id} className="order-card">
                    <div className="order-header">
                      <h3>Commande #{order.orderNumber}</h3>
                      <span className={`order-status status-${order.status}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-details">
                      <div className="order-restaurant">
                        <h4>{order.restaurant.nom}</h4>
                        <p>{order.restaurant.adresse}</p>
                      </div>
                      <div className="order-destination">
                        <h4>Adresse de livraison:</h4>
                        <p>{order.deliveryAddress}</p>
                      </div>
                      <div className="order-meta">
                        <div className="meta-item">
                          <span className="meta-label">Distance</span>
                          <span className="meta-value">{order.distance} km</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Valeur</span>
                          <span className="meta-value">{order.total.toFixed(2)} €</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Pourboire</span>
                          <span className="meta-value">{order.tip ? order.tip.toFixed(2) + ' €' : '0.00 €'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="order-actions">
                      <button 
                        className="btn btn-primary" 
                        onClick={() => acceptOrder(order._id)}
                      >
                        Accepter la livraison
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivreurDashboard; 