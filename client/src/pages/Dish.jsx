import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { platService, restaurantService } from '../services/api';

const Dish = () => {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarDishes, setSimilarDishes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les détails du plat
        const dishData = await platService.getById(id);
        setDish(dishData);
        
        if (dishData && dishData.restaurantId) {
          // Récupérer les détails du restaurant
          const restaurantData = await restaurantService.getById(dishData.restaurantId);
          setRestaurant(restaurantData);
          
          // Récupérer d'autres plats du même restaurant de la même catégorie
          const restaurantDishes = await platService.getByRestaurant(dishData.restaurantId);
          const similar = restaurantDishes
            .filter(p => p._id !== dishData._id && p.categorie === dishData.categorie)
            .slice(0, 4);
          setSimilarDishes(similar);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Erreur lors du chargement des données. Veuillez réessayer.');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const addToCart = () => {
    alert(`${quantity} ${dish.nom} ajouté${quantity > 1 ? 's' : ''} au panier`);
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

  if (error || !dish) {
    return (
      <div className="error-container" style={{ 
        textAlign: 'center', 
        padding: '50px 0', 
        color: 'red' 
      }}>
        <div className="error-message">
          {error || "Ce plat n'existe pas ou a été supprimé."}
        </div>
      </div>
    );
  }

  return (
    <div className="dish-page" style={{ padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          {/* Image du plat */}
          <div style={{ flex: '0 0 500px' }}>
            <div style={{ 
              borderRadius: '10px', 
              overflow: 'hidden', 
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)' 
            }}>
              <img src={dish.image} alt={dish.nom} style={{ 
                width: '100%', 
                height: 'auto', 
                display: 'block' 
              }} />
            </div>
          </div>
          
          {/* Détails du plat */}
          <div style={{ flex: '1 1 400px' }}>
            {restaurant && (
              <Link to={`/restaurant/${restaurant._id}`} style={{ textDecoration: 'none' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  marginBottom: '15px' 
                }}>
                  <img src={restaurant.image} alt={restaurant.nom} style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    objectFit: 'cover' 
                  }} />
                  <span style={{ color: '#FF6B57', fontWeight: '500' }}>{restaurant.nom}</span>
                </div>
              </Link>
            )}
            
            <h1 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{dish.nom}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#FFD700', marginRight: '5px' }}>★</span>
                <span>{dish.notation}</span>
              </div>
              <div>|</div>
              <div>{dish.categorie}</div>
            </div>
            
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#555', 
              lineHeight: '1.6', 
              marginBottom: '30px' 
            }}>
              {dish.description}
            </p>
            
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              color: '#FF6B57', 
              marginBottom: '30px' 
            }}>
              {(dish.prix * quantity).toFixed(2)} €
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '20px', 
              marginBottom: '30px' 
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                border: '1px solid #ddd', 
                borderRadius: '50px', 
                overflow: 'hidden' 
              }}>
                <button 
                  onClick={decrementQuantity}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    fontSize: '1.2rem',
                    cursor: 'pointer'
                  }}
                >
                  -
                </button>
                <div style={{ 
                  width: '40px', 
                  textAlign: 'center', 
                  fontSize: '1.1rem' 
                }}>
                  {quantity}
                </div>
                <button 
                  onClick={incrementQuantity}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    fontSize: '1.2rem',
                    cursor: 'pointer'
                  }}
                >
                  +
                </button>
              </div>
              
              <button 
                onClick={addToCart}
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '12px 30px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flex: '1'
                }}
              >
                Ajouter au panier
              </button>
            </div>
            
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              borderRadius: '10px', 
              padding: '20px', 
              marginTop: '20px' 
            }}>
              <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Informations</h3>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '15px' 
              }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                  </svg>
                  <span>Poids: environ {(150 + Math.random() * 400).toFixed(0)}g</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                  </svg>
                  <span>Calories: environ {(200 + Math.random() * 600).toFixed(0)} kcal</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                  </svg>
                  <span>Temps de préparation: {(10 + Math.random() * 20).toFixed(0)} minutes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Plats similaires */}
        {similarDishes.length > 0 && (
          <div style={{ marginTop: '60px' }}>
            <h2 style={{ 
              marginBottom: '30px', 
              fontSize: '1.8rem', 
              borderBottom: '2px solid #f0f0f0',
              paddingBottom: '10px'
            }}>
              Vous pourriez aussi aimer
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
              gap: '30px' 
            }}>
              {similarDishes.map((similarDish, index) => (
                <div key={index} style={{ 
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  backgroundColor: 'white'
                }} className="dish-card-hover">
                  <Link to={`/dish/${similarDish._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ height: '180px', overflow: 'hidden' }}>
                      <img src={similarDish.image} alt={similarDish.nom} style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover'
                      }} />
                    </div>
                    <div style={{ padding: '20px' }}>
                      <h3 style={{ marginBottom: '8px', fontSize: '1.2rem' }}>{similarDish.nom}</h3>
                      <p style={{ color: '#666', marginBottom: '12px', fontSize: '0.9rem' }}>{similarDish.categorie}</p>
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
                          {similarDish.prix?.toFixed(2) || '0.00'} €
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
                          {similarDish.notation}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dish; 