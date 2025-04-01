import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { restaurantService, platService } from '../services/api';

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Récupérer les détails du restaurant
        const restaurantData = await restaurantService.getById(id);
        setRestaurant(restaurantData);

        // Récupérer les plats du restaurant
        const restaurantDishes = await platService.getByRestaurantId(id);
        setDishes(restaurantDishes);

        // Définir la première catégorie comme active si nous avons des plats
        if (restaurantDishes.length > 0) {
          const categories = [...new Set(restaurantDishes.map(dish => dish.categorie))];
          setActiveCategory(categories[0] || '');
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

  // Obtenir toutes les catégories uniques
  const getCategories = () => {
    if (!dishes || dishes.length === 0) return [];
    return [...new Set(dishes.map(dish => dish.categorie))];
  };

  // Filtrer les plats par catégorie
  const getDishesByCategory = (category) => {
    return dishes.filter(dish => dish.categorie === category);
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

  if (error || !restaurant) {
    return (
      <div className="error-container" style={{ 
        textAlign: 'center', 
        padding: '50px 0', 
        color: 'red' 
      }}>
        <div className="error-message">
          {error || "Ce restaurant n'existe pas ou a été supprimé."}
        </div>
      </div>
    );
  }

  const categories = getCategories();

  return (
    <div className="restaurant-page">
      {/* Hero section avec l'image du restaurant */}
      <div className="restaurant-hero" style={{ 
        height: '250px', 
        position: 'relative' 
      }}>
        <img src={restaurant.image} alt={restaurant.nom} style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover' 
        }} />
        <div style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          padding: '20px', 
          color: 'white' 
        }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{restaurant.nom}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#FFD700', marginRight: '5px' }}>★</span>
                <span>{restaurant.notation} ({restaurant.avis} avis)</span>
              </div>
              <div>|</div>
              <div>{restaurant.categories.join(', ')}</div>
              <div>|</div>
              <div>{restaurant.tempsLivraison}</div>
              <div>|</div>
              <div>Frais de livraison: {restaurant.fraisLivraison?.toFixed(2) || '0.00'} €</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal du restaurant */}
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px' }}>
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          {/* Sidebar avec les catégories */}
          <div className="categories-sidebar" style={{ flex: '0 0 250px' }}>
            <h3 style={{ marginBottom: '15px', fontSize: '1.2rem' }}>Menu</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {categories.map((category, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  <button 
                    onClick={() => setActiveCategory(category)}
                    style={{
                      backgroundColor: activeCategory === category ? 'black' : 'transparent',
                      color: activeCategory === category ? 'white' : '#333',
                      border: activeCategory === category ? 'none' : '1px solid #ddd',
                      padding: '10px 15px',
                      borderRadius: '5px',
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
          </div>

          {/* Contenu principal avec les plats */}
          <div className="menu-content" style={{ flex: '1 1 0' }}>
            {categories.length > 0 ? (
              categories.map((category, categoryIndex) => (
                <div 
                  key={categoryIndex} 
                  style={{ 
                    marginBottom: '40px',
                    display: activeCategory === category || activeCategory === '' ? 'block' : 'none'
                  }}
                >
                  <h2 style={{ 
                    marginBottom: '20px', 
                    fontSize: '1.8rem', 
                    borderBottom: '2px solid #f0f0f0',
                    paddingBottom: '10px'
                  }}>
                    {category}
                  </h2>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                    gap: '20px' 
                  }}>
                    {getDishesByCategory(category).map((dish, dishIndex) => (
                      <div 
                        key={dishIndex} 
                        style={{ 
                          borderRadius: '10px',
                          overflow: 'hidden',
                          boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                          backgroundColor: 'white',
                          transition: 'transform 0.3s ease'
                        }} 
                        className="dish-card-hover"
                      >
                        <Link to={`/dish/${dish._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <div style={{ height: '160px', overflow: 'hidden' }}>
                            <img src={dish.image} alt={dish.nom} style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover'
                            }} />
                          </div>
                          <div style={{ padding: '15px' }}>
                            <h3 style={{ marginBottom: '8px', fontSize: '1.1rem' }}>{dish.nom}</h3>
                            <p style={{ 
                              color: '#666', 
                              marginBottom: '10px', 
                              fontSize: '0.9rem',
                              height: '40px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical'
                            }}>
                              {dish.description}
                            </p>
                            <div style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center' 
                            }}>
                              <span style={{ fontWeight: '700', color: '#FF6B57', fontSize: '1.1rem' }}>
                                {dish.prix?.toFixed(2) || '0.00'} €
                              </span>
                              <button style={{
                                backgroundColor: 'black',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '8px 12px',
                                fontSize: '0.9rem',
                                cursor: 'pointer'
                              }}>
                                Ajouter
                              </button>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '50px 0' }}>
                <h3>Aucun plat disponible pour ce restaurant</h3>
                <p style={{ color: '#666', marginTop: '10px' }}>Veuillez revenir plus tard</p>
              </div>
            )}
          </div>
        </div>

        {/* Informations complémentaires */}
        <div style={{ marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '30px' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '1.8rem' }}>Informations</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px' 
          }}>
            {/* Adresse */}
            <div>
              <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Adresse</h3>
              <p style={{ color: '#666' }}>{restaurant.adresse}</p>
            </div>

            {/* Horaires */}
            <div>
              <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Horaires d'ouverture</h3>
              <p style={{ color: '#666' }}>Du lundi au vendredi: 11h00 - 22h00</p>
              <p style={{ color: '#666' }}>Weekend: 10h00 - 23h00</p>
            </div>

            {/* Contact */}
            <div>
              <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Contact</h3>
              <p style={{ color: '#666' }}>Téléphone: {restaurant.telephone || '+33 1 23 45 67 89'}</p>
              <p style={{ color: '#666' }}>Email: {restaurant.email || 'contact@' + restaurant.nom.toLowerCase().replace(/\s+/g, '') + '.com'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant; 