import React from 'react';
import { useCart } from '../context/CartContext';

const DishCard = ({ dish }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      id: dish._id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      restaurant: dish.restaurant,
      quantity: 1
    });
  };
  
  return (
    <div className="dish-card">
      <div className="dish-image">
        <img src={dish.image} alt={dish.name} />
      </div>
      <div className="dish-content">
        <h3 className="dish-name">{dish.name}</h3>
        <p className="dish-description">{dish.description}</p>
        <div className="dish-price-actions">
          <span className="dish-price">${dish.price.toFixed(2)}</span>
          <button onClick={handleAddToCart} className="add-to-cart-btn">
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard; 