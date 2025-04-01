import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { restaurantService, platService } from '../services/api';
import { useCart } from '../context/CartContext';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les informations du restaurant
        const restaurantData = await restaurantService.getById(id);
        setRestaurant(restaurantData);
        
        // Récupérer les plats du restaurant
        const dishesData = await platService.getByRestaurant(id);
        setDishes(dishesData);
        
        // Extraire les catégories uniques des plats
        const uniqueCategories = [...new Set(dishesData.map(dish => dish.categorie))];
        setCategories(uniqueCategories);
        
        // Définir la première catégorie comme active par défaut
        if (uniqueCategories.length > 0) {
          setActiveCategory(uniqueCategories[0]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        setError('Erreur lors du chargement du restaurant. Veuillez réessayer.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  // Si les données ne sont pas encore chargées
  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px 0' }}>
        <div className="loading">Chargement du restaurant...</div>
      </div>
    );
  }
  
  // Si une erreur s'est produite
  if (error || !restaurant) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px 0' }}>
        <div className="error">{error || "Ce restaurant n'existe pas ou a été supprimé."}</div>
      </div>
    );
  }
  
  const handleAddToCart = (plat) => {
    addToCart({
      ...plat,
      restaurantId: restaurant._id,
      restaurantNom: restaurant.nom
    });
    
    // Afficher une notification de succès
    alert(`${plat.nom} ajouté au panier`);
  };
  
  return (
    <div className="restaurant-details">
      {/* Bannière du restaurant */}
      <div className="restaurant-banner" style={{ 
        height: '300px', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        <img 
          src={restaurant.image} 
          alt={restaurant.nom} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }}
        />
        <div style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', 
          padding: '30px 20px 20px',
          color: 'white'
        }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{restaurant.nom}</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#FFD700', marginRight: '5px' }}>★</span>
                <span>{restaurant.notation}</span>
              </div>
              <div>
                {restaurant.categories.map((cat, index) => (
                  <span key={index} style={{ 
                    marginRight: '10px',
                    color: 'rgba(255,255,255,0.8)'
                  }}>
                    {cat}{index < restaurant.categories.length - 1 ? ' • ' : ''}
                  </span>
                ))}
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '15px' }}>
                <div>
                  <span>Livraison: {restaurant.tempsLivraison}</span>
                </div>
                <div>
                  <span>Frais: {restaurant.fraisLivraison.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contenu principal */}
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px' }}>
        <div style={{ display: 'flex', gap: '30px' }}>
          {/* Navigation des catégories */}
          <div style={{ width: '250px', flexShrink: 0 }}>
            <h3 style={{ marginBottom: '20px', fontSize: '1.3rem' }}>Menu</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {categories.map((category, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  <button
                    onClick={() => setActiveCategory(category)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '10px 15px',
                      borderLeft: activeCategory === category ? '3px solid black' : '3px solid transparent',
                      fontWeight: activeCategory === category ? '600' : '400',
                      color: activeCategory === category ? 'black' : '#666',
                      width: '100%',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
            
            <div style={{ 
              marginTop: '30px', 
              padding: '20px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '10px'
            }}>
              <h4 style={{ marginBottom: '15px' }}>Informations</h4>
              <div style={{ marginBottom: '10px' }}>
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '5px' }}>Adresse</p>
                <p>{restaurant.adresse}</p>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '5px' }}>Horaires</p>
                <p>{restaurant.horaires}</p>
              </div>
              <div>
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '5px' }}>Commande minimum</p>
                <p>{restaurant.commandeMinimum.toFixed(2)} €</p>
              </div>
            </div>
          </div>
          
          {/* Affichage des plats */}
          <div style={{ flex: 1 }}>
            {categories.map((category, categoryIndex) => (
              <div 
                key={categoryIndex} 
                id={category.toLowerCase().replace(/\s+/g, '-')}
                style={{ 
                  marginBottom: '40px', 
                  scrollMarginTop: '20px',
                  display: activeCategory === category ? 'block' : 'none'
                }}
              >
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  marginBottom: '25px',
                  position: 'relative',
                  paddingBottom: '10px'
                }}>
                  {category}
                  <span style={{ 
                    display: 'block', 
                    width: '50px', 
                    height: '3px', 
                    backgroundColor: '#FF6B57', 
                    marginTop: '10px' 
                  }}></span>
                </h2>
                
                <div className="category-dishes" style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                  gap: '25px' 
                }}>
                  {dishes.filter(dish => dish.categorie === category).map((plat, platIndex) => (
                    <div 
                      key={platIndex} 
                      style={{ 
                        backgroundColor: 'white', 
                        borderRadius: '10px', 
                        overflow: 'hidden',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                      }}
                      className="dish-card-hover"
                    >
                      <div style={{ height: '180px', overflow: 'hidden' }}>
                        <img 
                          src={plat.image} 
                          alt={plat.nom} 
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                      <div style={{ padding: '20px' }}>
                        <h3 style={{ marginBottom: '8px', fontSize: '1.2rem' }}>{plat.nom}</h3>
                        <p style={{ 
                          color: '#666', 
                          marginBottom: '15px', 
                          fontSize: '0.9rem',
                          display: '-webkit-box',
                          WebkitLineClamp: '2',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {plat.description}
                        </p>
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
                            {plat.prix.toFixed(2)} €
                          </span>
                          <button
                            onClick={() => handleAddToCart(plat)}
                            style={{
                              backgroundColor: 'black',
                              color: 'white',
                              border: 'none',
                              borderRadius: '50%',
                              width: '35px',
                              height: '35px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.5rem',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bouton flottant pour le panier */}
      <Link
        to="/cart"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          backgroundColor: 'black',
          color: 'white',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
          textDecoration: 'none',
          fontSize: '24px',
          zIndex: 100
        }}
      >
        🛒
      </Link>
    </div>
  );
};

export default RestaurantDetails; 