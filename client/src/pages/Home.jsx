import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PopularDishCard from '../components/PopularDishCard';
import RestaurantCard from '../components/RestaurantCard';
import '../assets/css/home.css';
import { restaurantService, platService } from '../services/api';

const Home = () => {
  const [popularDishes, setPopularDishes] = useState([]);
  const [popularRestaurants, setPopularRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les plats populaires et les restaurants populaires en parallèle
        const [dishes, restaurants] = await Promise.all([
          platService.getPopular(),
          restaurantService.getPopular()
        ]);
        
        setPopularDishes(dishes);
        setPopularRestaurants(restaurants);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Erreur lors du chargement des données. Veuillez réessayer.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <div className="home-page">
      {/* Bannière d'accueil */}
      <div className="home-banner" style={{ 
        backgroundColor: 'black', 
        color: 'white', 
        padding: '60px 0',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=500)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="banner-content" style={{ maxWidth: '600px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', fontWeight: '700' }}>Délicieux plats livrés chez vous</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px', lineHeight: '1.6' }}>Commandez vos plats favoris auprès des meilleurs restaurants de votre ville</p>
            <Link to="/restaurants" style={{ 
              backgroundColor: '#FF6B57', 
              color: 'white', 
              padding: '14px 28px', 
              borderRadius: '30px', 
              textDecoration: 'none',
              fontWeight: '600',
              display: 'inline-block',
              transition: 'all 0.3s ease'
            }}>Commander maintenant</Link>
          </div>
        </div>
      </div>

      {/* Section des catégories */}
      <section className="categories-section" style={{ padding: '60px 0', backgroundColor: '#f8f9fa' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 className="section-title" style={{ 
            fontSize: '2rem', 
            marginBottom: '40px', 
            textAlign: 'center',
            position: 'relative',
            paddingBottom: '15px'
          }}>
            Catégories
            <span style={{ 
              display: 'block', 
              width: '50px', 
              height: '3px', 
              backgroundColor: '#FF6B57', 
              margin: '15px auto 0' 
            }}></span>
          </h2>
          <div className="categories-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
            gap: '20px' 
          }}>
            {[
              { name: 'Burgers', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250', category: 'burgers' },
              { name: 'Pizzas', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250', category: 'pizzas' },
              { name: 'Japonais', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250', category: 'japonais' },
              { name: 'Healthy', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250', category: 'healthy' },
              { name: 'Asiatique', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250', category: 'asiatique' },
              { name: 'Desserts', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250', category: 'desserts' }
            ].map((item) => (
              <Link key={item.category} to={`/search?category=${item.category}`} style={{ 
                textDecoration: 'none', 
                color: 'inherit',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative',
                display: 'block'
              }} className="category-hover">
                <div style={{ 
                  height: '180px', 
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    zIndex: 1
                  }}></div>
                  <img src={item.image} alt={item.name} style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover'
                  }} />
                  <span style={{ 
                    position: 'absolute',
                    bottom: '20px',
                    left: '0',
                    width: '100%',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    zIndex: 2
                  }}>
                    {item.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section des plats populaires */}
      <section className="popular-dishes-section" style={{ padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="section-header" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '30px' 
          }}>
            <h2 className="section-title" style={{ 
              fontSize: '2rem', 
              position: 'relative',
              paddingBottom: '15px'
            }}>
              Plats populaires
              <span style={{ 
                display: 'block', 
                width: '50px', 
                height: '3px', 
                backgroundColor: '#FF6B57', 
                marginTop: '15px' 
              }}></span>
            </h2>
            <Link to="/search" style={{ 
              color: '#FF6B57', 
              textDecoration: 'none', 
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center'
            }}>
              Voir tout
              <span style={{ marginLeft: '5px' }}>→</span>
            </Link>
          </div>
          <div className="dishes-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '30px' 
          }}>
            {popularDishes.slice(0, 4).map(dish => (
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
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section des restaurants */}
      <section className="restaurants-section" style={{ padding: '60px 0', backgroundColor: '#f8f9fa' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="section-header" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '30px' 
          }}>
            <h2 className="section-title" style={{ 
              fontSize: '2rem', 
              position: 'relative',
              paddingBottom: '15px'
            }}>
              Restaurants populaires
              <span style={{ 
                display: 'block', 
                width: '50px', 
                height: '3px', 
                backgroundColor: '#FF6B57', 
                marginTop: '15px' 
              }}></span>
            </h2>
            <Link to="/restaurants" style={{ 
              color: '#FF6B57', 
              textDecoration: 'none', 
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center'
            }}>
              Voir tout
              <span style={{ marginLeft: '5px' }}>→</span>
            </Link>
          </div>
          <div className="restaurants-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '30px' 
          }}>
            {popularRestaurants.slice(0, 6).map(restaurant => (
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
                          <span key={`${restaurant._id}-${category}-${index}`} style={{ 
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 