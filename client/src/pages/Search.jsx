import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { restaurantService, platService } from '../services/api';

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchTerm = queryParams.get('q') || '';
  const initialCategory = queryParams.get('category') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [allDishes, setAllDishes] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('restaurants');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer toutes les données au chargement
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Récupérer tous les restaurants et plats en parallèle
        const [restaurants, dishes] = await Promise.all([
          restaurantService.getAll(),
          platService.getAll()
        ]);
        
        setAllRestaurants(restaurants);
        setAllDishes(dishes);
        
        // Extraire toutes les catégories uniques des restaurants
        const categories = [...new Set(restaurants
          .filter(r => Array.isArray(r.categories))
          .flatMap(r => r.categories))];
        setAllCategories(categories);
        
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Erreur lors du chargement des données. Veuillez réessayer.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrer les résultats lorsque les critères changent
  useEffect(() => {
    if (loading) return;
    
    filterItems();
  }, [searchTerm, selectedCategory, activeTab, allRestaurants, allDishes, loading]);

  const filterItems = () => {
    // Filtrer les restaurants
    let restaurantResults = [...allRestaurants];
    
    if (searchTerm) {
      restaurantResults = restaurantResults.filter(restaurant => 
        restaurant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(restaurant.categories) && restaurant.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }
    
    if (selectedCategory) {
      restaurantResults = restaurantResults.filter(restaurant => 
        Array.isArray(restaurant.categories) && restaurant.categories.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase())
      );
    }
    
    setFilteredRestaurants(restaurantResults);
    
    // Filtrer les plats
    let dishResults = [...allDishes];
    
    if (searchTerm) {
      dishResults = dishResults.filter(dish => 
        dish.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.categorie.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      dishResults = dishResults.filter(dish => 
        dish.categorie.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    setFilteredDishes(dishResults);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  if (loading) {
    return (
      <div className="loading-container" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '300px' 
      }}>
        <div className="loading-spinner">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" style={{ 
        textAlign: 'center', 
        padding: '50px 0', 
        color: 'red' 
      }}>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="search-page" style={{ padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div className="search-header" style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '20px' }}>
            {searchTerm 
              ? `Résultats pour "${searchTerm}"` 
              : selectedCategory 
                ? `Catégorie: ${selectedCategory}` 
                : 'Tous les restaurants et plats'}
          </h1>
          
          <div className="search-bar" style={{ 
            backgroundColor: 'white', 
            borderRadius: '50px', 
            padding: '5px', 
            boxShadow: '0 3px 15px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px'
          }}>
            <input 
              type="text" 
              placeholder="Rechercher un restaurant ou un plat..." 
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                flex: 1,
                border: 'none',
                padding: '12px 20px',
                fontSize: '1rem',
                outline: 'none',
                borderRadius: '50px'
              }}
            />
            <button style={{
              backgroundColor: 'black',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '12px 25px',
              fontSize: '1rem',
              cursor: 'pointer',
              marginRight: '5px'
            }}>
              Rechercher
            </button>
          </div>
          
          <div className="categories-filter" style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '15px', fontSize: '1.2rem' }}>Catégories</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {allCategories.map((category, index) => (
                <button 
                  key={index}
                  onClick={() => handleCategorySelect(category)}
                  style={{
                    backgroundColor: selectedCategory === category ? 'black' : 'white',
                    color: selectedCategory === category ? 'white' : '#333',
                    border: '1px solid #ddd',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="tabs" style={{ 
            display: 'flex', 
            borderBottom: '1px solid #ddd', 
            marginBottom: '30px' 
          }}>
            <button 
              onClick={() => setActiveTab('restaurants')}
              style={{
                padding: '12px 20px',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'restaurants' ? '3px solid black' : 'none',
                fontWeight: activeTab === 'restaurants' ? '600' : '400',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.2s ease'
              }}
            >
              Restaurants ({filteredRestaurants.length})
            </button>
            <button 
              onClick={() => setActiveTab('dishes')}
              style={{
                padding: '12px 20px',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'dishes' ? '3px solid black' : 'none',
                fontWeight: activeTab === 'dishes' ? '600' : '400',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.2s ease'
              }}
            >
              Plats ({filteredDishes.length})
            </button>
          </div>
        </div>
        
        {activeTab === 'restaurants' ? (
          <div className="restaurants-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '30px' 
          }}>
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map(restaurant => (
                <div key={restaurant._id} style={{ 
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  backgroundColor: 'white'
                }} className="restaurant-card-hover">
                  <Link to={`/restaurant/${restaurant._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                      <img src={restaurant.image} alt={restaurant.nom} style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover'
                      }} />
                      <div style={{ 
                        position: 'absolute', 
                        bottom: '15px', 
                        left: '15px', 
                        backgroundColor: 'rgba(0,0,0,0.7)', 
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        fontSize: '0.85rem'
                      }}>
                        {restaurant.tempsLivraison}
                      </div>
                    </div>
                    <div style={{ padding: '20px' }}>
                      <h3 style={{ marginBottom: '8px', fontSize: '1.2rem' }}>{restaurant.nom}</h3>
                      <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '6px', 
                        marginBottom: '12px' 
                      }}>
                        {Array.isArray(restaurant.categories) ? 
                          restaurant.categories.slice(0, 3).map((category, index) => (
                            <span key={index} style={{ 
                              backgroundColor: '#f0f0f0', 
                              color: '#666',
                              padding: '3px 8px', 
                              borderRadius: '4px', 
                              fontSize: '0.8rem'
                            }}>
                              {category}
                            </span>
                          )) : (
                            <span style={{ 
                              backgroundColor: '#f0f0f0', 
                              color: '#666',
                              padding: '3px 8px', 
                              borderRadius: '4px', 
                              fontSize: '0.8rem'
                            }}>
                              Général
                            </span>
                          )
                        }
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                      }}>
                        <span style={{ 
                          backgroundColor: '#f8f9fa', 
                          padding: '5px 10px', 
                          borderRadius: '15px', 
                          fontSize: '0.9rem', 
                          display: 'flex', 
                          alignItems: 'center'
                        }}>
                          <span style={{ color: '#FFD700', marginRight: '3px' }}>★</span>
                          {restaurant.notation}
                        </span>
                        <span style={{ fontSize: '0.9rem', color: '#666' }}>
                          Frais: {typeof restaurant.fraisLivraison === 'number' ? restaurant.fraisLivraison.toFixed(2) : parseFloat(restaurant.fraisLivraison)?.toFixed(2) || '0.00'} €
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div style={{ 
                gridColumn: '1 / -1', 
                textAlign: 'center', 
                padding: '40px 0' 
              }}>
                <h3>Aucun restaurant ne correspond à votre recherche</h3>
                <p style={{ marginTop: '10px', color: '#666' }}>Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>
        ) : (
          <div className="dishes-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '30px' 
          }}>
            {filteredDishes.length > 0 ? (
              filteredDishes.map(dish => (
                <div key={dish._id} style={{ 
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  backgroundColor: 'white'
                }} className="dish-card-hover">
                  <Link to={`/dish/${dish._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ height: '180px', overflow: 'hidden' }}>
                      <img src={dish.image} alt={dish.nom} style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover'
                      }} />
                    </div>
                    <div style={{ padding: '20px' }}>
                      <h3 style={{ marginBottom: '8px', fontSize: '1.2rem' }}>{dish.nom}</h3>
                      <p style={{ color: '#666', marginBottom: '12px', fontSize: '0.9rem' }}>{dish.restaurant}</p>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                      }}>
                        <span style={{ 
                          fontWeight: '700', 
                          color: '#FF6B57',
                          fontSize: '1.1rem'
                        }}>
                          {typeof dish.prix === 'number' ? dish.prix.toFixed(2) : parseFloat(dish.prix)?.toFixed(2) || '0.00'} €
                        </span>
                        <span style={{ 
                          backgroundColor: '#f8f9fa', 
                          padding: '5px 10px', 
                          borderRadius: '15px', 
                          fontSize: '0.9rem', 
                          display: 'flex', 
                          alignItems: 'center'
                        }}>
                          <span style={{ color: '#FFD700', marginRight: '3px' }}>★</span>
                          {dish.notation}
                        </span>
                      </div>
                      <button style={{
                        width: '100%',
                        marginTop: '15px',
                        backgroundColor: 'black',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}>
                        Ajouter au panier
                      </button>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div style={{ 
                gridColumn: '1 / -1', 
                textAlign: 'center', 
                padding: '40px 0' 
              }}>
                <h3>Aucun plat ne correspond à votre recherche</h3>
                <p style={{ marginTop: '10px', color: '#666' }}>Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search; 