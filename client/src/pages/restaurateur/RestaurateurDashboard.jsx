import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import restaurateurService from '../../services/restaurateurService';

const RestaurateurDashboard = () => {
  const { user } = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await restaurateurService.getMyRestaurants();
        setRestaurants(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des restaurants: ' + err.message);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

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
          <h1>Dashboard Restaurateur</h1>
          <p>Bienvenue, {user.firstName} {user.lastName}</p>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-sidebar">
            <div className="user-profile">
              <img src="https://via.placeholder.com/100x100?text=Avatar" alt="Avatar" className="user-avatar" />
              <div className="user-info">
                <h3>{user.firstName} {user.lastName}</h3>
                <p>{user.email}</p>
                <span className="badge badge-restaurateur">Restaurateur</span>
              </div>
            </div>

            <ul className="dashboard-menu">
              <li className="active">
                <Link to="/restaurateur/dashboard">Mes Restaurants</Link>
              </li>
              <li>
                <Link to="/restaurateur/orders">Commandes</Link>
              </li>
              <li>
                <Link to="/profile">Mon Profil</Link>
              </li>
            </ul>
          </div>

          <div className="dashboard-main">
            <div className="section-header">
              <h2>Mes Restaurants</h2>
              <Link to="/restaurateur/restaurants/new" className="btn btn-primary">
                Ajouter un restaurant
              </Link>
            </div>

            {error && <div className="error-message">{error}</div>}

            {restaurants.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🍽️</div>
                <h3>Aucun restaurant</h3>
                <p>Vous n'avez pas encore de restaurant. Créez-en un pour commencer à recevoir des commandes.</p>
                <Link to="/restaurateur/restaurants/new" className="btn btn-primary">
                  Créer un restaurant
                </Link>
              </div>
            ) : (
              <div className="restaurants-grid">
                {restaurants.map(restaurant => (
                  <div key={restaurant._id} className="restaurant-card dashboard-card">
                    <div className="restaurant-image">
                      <img src={restaurant.image} alt={restaurant.nom} />
                    </div>
                    <div className="restaurant-info">
                      <h3>{restaurant.nom}</h3>
                      <p className="restaurant-address">{restaurant.adresse}</p>
                      <div className="restaurant-meta">
                        <span className="restaurant-rating">★ {restaurant.notation}</span>
                        <span className="restaurant-delivery-time">{restaurant.tempsLivraison}</span>
                      </div>
                      <div className="restaurant-actions">
                        <Link to={`/restaurateur/restaurants/${restaurant._id}`} className="btn btn-sm">
                          Gérer
                        </Link>
                        <Link to={`/restaurateur/restaurants/${restaurant._id}/menu`} className="btn btn-sm">
                          Menu
                        </Link>
                        <Link to={`/restaurateur/restaurants/${restaurant._id}/orders`} className="btn btn-sm">
                          Commandes
                        </Link>
                      </div>
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

export default RestaurateurDashboard; 