import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const PopularDishCard = ({ dish }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      ...dish,
      quantity: 1,
    });
  };
  
  // On vérifie que dish et dish.prix existent avant d'appeler toFixed
  const formatPrice = (price) => {
    return price ? price.toFixed(2) : '0.00';
  };

  // Si dish est undefined, on affiche un composant vide
  if (!dish) {
    return null;
  }

  return (
    <div className="dish-card">
      <Link to={`/dish/${dish._id}`} className="dish-link">
        <div className="dish-image">
          <img src={dish.image} alt={dish.nom} />
        </div>
        <div className="dish-info">
          <h3 className="dish-name">{dish.nom}</h3>
          <p className="dish-restaurant">{dish.restaurant}</p>
          <div className="dish-meta">
            <span className="dish-price">{formatPrice(dish.prix)} €</span>
            <span className="dish-rating">
              ★ {dish.notation}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PopularDishCard; 