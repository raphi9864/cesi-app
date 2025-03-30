import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../assets/css/restaurant-details.css';

const RestaurantDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simuler le chargement des données du restaurant
    setTimeout(() => {
      const restaurantData = {
        _id: id,
        name: 'Delicious Pizza',
        description: "Explorez nos pizzas délicieuses, préparées avec les meilleurs ingrédients. Goûtez à notre sauce succulente et nos garnitures fraîches. Commandez maintenant et découvrez la vraie saveur italienne !",
        rating: 4.7,
        reviewCount: 253,
        deliveryTime: 30,
        minOrder: 15,
        images: [
          'https://via.placeholder.com/800x600?text=Restaurant+Main+Image',
          'https://via.placeholder.com/400x300?text=Food+Image+1',
          'https://via.placeholder.com/400x300?text=Food+Image+2',
        ],
        categories: ['Pizza', 'Italien', 'Pâtes'],
        address: '123 Rue Saint-Antoine, 75004 Paris',
        phone: '+33 1 45 67 89 10',
        email: 'contact@deliciouspizza.com',
        openingHours: {
          monday: '11:00 - 22:00',
          tuesday: '11:00 - 22:00',
          wednesday: '11:00 - 22:00',
          thursday: '11:00 - 22:00',
          friday: '11:00 - 23:00',
          saturday: '11:00 - 23:00',
          sunday: '12:00 - 22:00'
        }
      };
      
      const menuData = [
        {
          id: 'special-offers',
          name: 'Offres spéciales',
          items: [
            {
              _id: 'offer1',
              name: 'Signature Dish',
              description: 'Notre plat signature avec des ingrédients frais et locaux',
              price: 19.99,
              image: 'https://via.placeholder.com/300x200?text=Signature+Dish'
            },
            {
              _id: 'offer2',
              name: 'Boissons',
              description: 'Sélection de boissons fraîches et de saison',
              price: 4.99,
              image: 'https://via.placeholder.com/300x200?text=Boissons'
            },
            {
              _id: 'offer3',
              name: 'Desserts',
              description: 'Desserts faits maison pour satisfaire vos envies de sucré',
              price: 6.99,
              image: 'https://via.placeholder.com/300x200?text=Desserts'
            }
          ]
        },
        {
          id: 'starters',
          name: 'Entrées',
          items: [
            {
              _id: 'starter1',
              name: 'Bruschetta',
              description: 'Pain grillé avec tomates, basilic et huile d\'olive',
              price: 7.99,
              image: 'https://via.placeholder.com/300x200?text=Bruschetta'
            },
            {
              _id: 'starter2',
              name: 'Salade César',
              description: 'Laitue romaine, croûtons, parmesan et sauce César',
              price: 8.99,
              image: 'https://via.placeholder.com/300x200?text=Salade+César'
            }
          ]
        },
        {
          id: 'pizza',
          name: 'Pizzas',
          items: [
            {
              _id: 'pizza1',
              name: 'Margherita',
              description: 'Tomate, mozzarella, basilic frais',
              price: 12.99,
              image: 'https://via.placeholder.com/300x200?text=Margherita'
            },
            {
              _id: 'pizza2',
              name: 'Quatre Fromages',
              description: 'Mozzarella, gorgonzola, parmesan, chèvre',
              price: 14.99,
              image: 'https://via.placeholder.com/300x200?text=Quatre+Fromages'
            },
            {
              _id: 'pizza3',
              name: 'Pepperoni',
              description: 'Tomate, mozzarella, pepperoni',
              price: 13.99,
              image: 'https://via.placeholder.com/300x200?text=Pepperoni'
            }
          ]
        },
        {
          id: 'pasta',
          name: 'Pâtes',
          items: [
            {
              _id: 'pasta1',
              name: 'Spaghetti Bolognaise',
              description: 'Spaghetti avec sauce bolognaise maison',
              price: 11.99,
              image: 'https://via.placeholder.com/300x200?text=Spaghetti+Bolognaise'
            },
            {
              _id: 'pasta2',
              name: 'Penne Arrabiata',
              description: 'Penne avec sauce tomate épicée',
              price: 10.99,
              image: 'https://via.placeholder.com/300x200?text=Penne+Arrabiata'
            }
          ]
        },
        {
          id: 'desserts',
          name: 'Desserts',
          items: [
            {
              _id: 'dessert1',
              name: 'Tiramisu',
              description: 'Dessert italien traditionnel au café',
              price: 6.99,
              image: 'https://via.placeholder.com/300x200?text=Tiramisu'
            },
            {
              _id: 'dessert2',
              name: 'Panna Cotta',
              description: 'Crème cuite à la vanille avec coulis de fruits rouges',
              price: 5.99,
              image: 'https://via.placeholder.com/300x200?text=Panna+Cotta'
            }
          ]
        }
      ];
      
      setRestaurant(restaurantData);
      setMenu(menuData);
      setLoading(false);
    }, 1000);
  }, [id]);
  
  const handleAddToCart = (item) => {
    addToCart({
      id: item._id,
      name: item.name,
      price: item.price,
      quantity: 1,
      restaurant: restaurant.name
    });
  };
  
  const filteredMenu = selectedCategory === 'all' 
    ? menu 
    : menu.filter(category => category.id === selectedCategory);
  
  if (loading) {
    return (
      <div className="container">
        <div className="loading">Chargement du restaurant...</div>
      </div>
    );
  }
  
  return (
    <div className="restaurant-detail-page">
      <div className="restaurant-header">
        <div className="container">
          <div className="restaurant-images">
            <div className="main-image">
              <img src={restaurant.images[0]} alt={restaurant.name} />
            </div>
            <div className="gallery-images">
              <img src={restaurant.images[1]} alt={`${restaurant.name} food 1`} />
              <img src={restaurant.images[2]} alt={`${restaurant.name} food 2`} />
            </div>
          </div>
          
          <div className="restaurant-info">
            <h1>{restaurant.name}</h1>
            <p className="description">{restaurant.description}</p>
            
            <div className="restaurant-actions">
              <div className="rating">
                <span>★ {restaurant.rating}</span> ({restaurant.reviewCount} avis)
              </div>
              <div className="delivery-time">
                <span>{restaurant.deliveryTime} min</span> Temps de livraison
              </div>
              <div className="min-order">
                <span>{restaurant.minOrder} €</span> Commande min.
              </div>
            </div>
            
            <div className="restaurant-tags">
              {restaurant.categories.map((category, index) => (
                <span key={index} className="tag">{category}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        <section className="special-offers-section">
          <h2>Offres spéciales</h2>
          <div className="offers-grid">
            {menu[0]?.items.map(item => (
              <div key={item._id} className="offer-card">
                <img src={item.image} alt={item.name} />
                <div className="offer-content">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="price">{item.price.toFixed(2)} €</div>
                  <button 
                    className="add-btn"
                    onClick={() => handleAddToCart(item)}
                    aria-label={`Ajouter ${item.name} au panier`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="menu-section">
          <div className="category-tabs">
            <button 
              className={selectedCategory === 'all' ? 'active' : ''}
              onClick={() => setSelectedCategory('all')}
            >
              Tous
            </button>
            {menu.map(category => (
              <button 
                key={category.id}
                className={selectedCategory === category.id ? 'active' : ''}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {filteredMenu.map(category => (
            <div key={category.id} className="menu-category">
              <h2>{category.name}</h2>
              <div className="dishes-grid">
                {category.items.map(item => (
                  <div key={item._id} className="dish-card">
                    <img src={item.image} alt={item.name} />
                    <div className="dish-content">
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <div className="dish-footer">
                        <div className="price">{item.price.toFixed(2)} €</div>
                        <button 
                          className="add-btn"
                          onClick={() => handleAddToCart(item)}
                          aria-label={`Ajouter ${item.name} au panier`}
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
        </section>
      </div>
    </div>
  );
};

export default RestaurantDetail; 