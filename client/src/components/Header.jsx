import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header className="header" style={{ backgroundColor: 'black', color: 'white' }}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo-container">
            <h1 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>CESI EAT</h1>
          </Link>
          
          <form className="search-form" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Rechercher un restaurant ou un plat" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                backgroundColor: '#333', 
                color: 'white', 
                border: 'none', 
                borderRadius: '20px',
                padding: '10px 15px'
              }}
            />
            <button 
              type="submit" 
              className="search-button"
              style={{ color: 'white' }}
            >
              🔍
            </button>
          </form>
          
          <nav className="main-nav">
            <ul style={{ display: 'flex', gap: '30px' }}>
              <li>
                <Link to="/restaurants" style={{ color: 'white' }}>
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="/search" style={{ color: 'white' }}>
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/order-confirmation" style={{ color: 'white' }}>
                  Commandes
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="header-actions">
            {isAuthenticated ? (
              <>
                <Link to="/profile" style={{ color: 'white' }}>
                  {user.firstName}
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="btn"
                  style={{ 
                    backgroundColor: 'transparent', 
                    color: 'white', 
                    border: '1px solid white',
                    borderRadius: '20px',
                    padding: '5px 15px',
                    fontSize: '14px'
                  }}
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="sign-in-btn"
                style={{ 
                  backgroundColor: 'white', 
                  color: 'black',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontWeight: '500',
                  fontSize: '14px'
                }}
              >
                Connexion
              </Link>
            )}
            
            <Link to="/cart" className="cart-link" style={{ color: 'white', position: 'relative', fontSize: '20px' }}>
              🛒
              {cartItems.length > 0 && (
                <span 
                  className="cart-count"
                  style={{ 
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    backgroundColor: '#FF6B57',
                    color: 'white',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 