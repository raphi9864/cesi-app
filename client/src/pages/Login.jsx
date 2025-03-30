import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    try {
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Échec de la connexion');
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-form-container">
            <h1>Connexion</h1>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-options">
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Se souvenir de moi</label>
                </div>
                <Link to="/forgot-password" className="forgot-password">
                  Mot de passe oublié?
                </Link>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary auth-btn"
                disabled={loading}
              >
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </form>
            
            <div className="auth-separator">
              <span>ou</span>
            </div>
            
            <div className="social-auth">
              <button className="social-btn google-btn">
                Continuer avec Google
              </button>
              <button className="social-btn facebook-btn">
                Continuer avec Facebook
              </button>
            </div>
            
            <div className="auth-switch">
              Pas encore de compte? <Link to="/register">S'inscrire</Link>
            </div>
          </div>
          
          <div className="auth-image">
            <img src="https://via.placeholder.com/600x800?text=Food+Delivery" alt="Livraison de nourriture" />
            <div className="auth-image-overlay">
              <div className="auth-image-content">
                <h2>Savourez de délicieux repas livrés chez vous</h2>
                <p>Rejoignez CESI EAT et découvrez une nouvelle expérience de livraison de nourriture</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 