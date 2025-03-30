import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="restaurant-card">
      <Link to={`/restaurant/${restaurant.id}`} className="restaurant-link">
        <div className="restaurant-image">
          <img src={restaurant.image} alt={restaurant.nom} />
        </div>
        <div className="restaurant-info">
          <h3 className="restaurant-name">{restaurant.nom}</h3>
          <div className="restaurant-categories">
            {restaurant.categories.slice(0, 3).map((category, index) => (
              <span key={index} className="category-tag">
                {category}
              </span>
            ))}
          </div>
          <div className="restaurant-meta">
            <span className="restaurant-rating">★ {restaurant.notation}</span>
            <span className="restaurant-delivery-time">{restaurant.tempsLivraison}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard; 