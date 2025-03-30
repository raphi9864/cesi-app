import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { restaurantService, dishService } from '../services/api';
import RestaurantCard from '../components/RestaurantCard';
import PopularDishCard from '../components/PopularDishCard';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [restaurants, setRestaurants] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Dans un environnement réel, nous aurions une route dédiée pour la recherche
        // Pour cette démo, nous allons récupérer toutes les données et filtrer côté client
        const [restaurantsRes, dishesRes] = await Promise.all([
          restaurantService.getAllRestaurants(),
          dishService.getAllDishes()
        ]);
        
        // Filtrer les résultats en fonction de la requête
        const filteredRestaurants = restaurantsRes.data.filter(restaurant => 
          restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
          restaurant.cuisine.some(type => 
            type.toLowerCase().includes(query.toLowerCase())
          )
        );
        
        const filteredDishes = dishesRes.data.filter(dish => 
          dish.name.toLowerCase().includes(query.toLowerCase()) ||
          dish.description?.toLowerCase().includes(query.toLowerCase()) ||
          dish.tags?.some(tag => 
            tag.toLowerCase().includes(query.toLowerCase())
          )
        );
        
        setRestaurants(filteredRestaurants);
        setDishes(filteredDishes);
      } catch (err) {
        console.error('Erreur lors de la recherche:', err);
        setError('Une erreur est survenue lors de la recherche. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };
    
    if (query) {
      fetchSearchResults();
    } else {
      setRestaurants([]);
      setDishes([]);
      setLoading(false);
    }
  }, [query]);
  
  const renderContent = () => {
    if (loading) {
      return <div className="loading">Recherche en cours...</div>;
    }
    
    if (error) {
      return <div className="error-message">{error}</div>;
    }
    
    if (!query) {
      return <div className="no-query">Veuillez entrer un terme de recherche</div>;
    }
    
    if (restaurants.length === 0 && dishes.length === 0) {
      return (
        <div className="no-results">
          <h3>Aucun résultat trouvé pour "{query}"</h3>
          <p>Essayez d'autres termes de recherche ou consultez nos suggestions populaires</p>
        </div>
      );
    }
    
    if (activeTab === 'all' || activeTab === 'restaurants') {
      const showRestaurants = activeTab === 'all' ? restaurants.slice(0, 4) : restaurants;
      
      if (showRestaurants.length > 0) {
        return (
          <div className="search-restaurants">
            <h2>Restaurants</h2>
            <div className="restaurants-grid">
              {showRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant._id} restaurant={restaurant} />
              ))}
            </div>
          </div>
        );
      }
    }
    
    if (activeTab === 'all' || activeTab === 'dishes') {
      const showDishes = activeTab === 'all' ? dishes.slice(0, 4) : dishes;
      
      if (showDishes.length > 0) {
        return (
          <div className="search-dishes">
            <h2>Plats</h2>
            <div className="dishes-grid">
              {showDishes.map(dish => (
                <PopularDishCard key={dish._id} dish={dish} />
              ))}
            </div>
          </div>
        );
      }
    }
  };
  
  return (
    <div className="search-results-page">
      <div className="container">
        <div className="search-header">
          <h1>Résultats pour "{query}"</h1>
          <div className="search-tabs">
            <button 
              className={activeTab === 'all' ? 'active' : ''}
              onClick={() => setActiveTab('all')}
            >
              Tous
            </button>
            <button 
              className={activeTab === 'restaurants' ? 'active' : ''}
              onClick={() => setActiveTab('restaurants')}
            >
              Restaurants ({restaurants.length})
            </button>
            <button 
              className={activeTab === 'dishes' ? 'active' : ''}
              onClick={() => setActiveTab('dishes')}
            >
              Plats ({dishes.length})
            </button>
          </div>
        </div>
        
        <div className="search-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SearchResults; 