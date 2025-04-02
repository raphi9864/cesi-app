import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Récupérer le paramètre from pour rediriger après connexion
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    
    try {
      setLoading(true);
      const user = await login(email, password);
      
      // Rediriger vers le dashboard approprié en fonction du rôle
      if (user.role === 'restaurateur') {
        navigate('/restaurateur/dashboard');
      } else if (user.role === 'livreur') {
        navigate('/livreur/dashboard');
      } else {
        // Si on venait d'une page protégée, y retourner, sinon aller à la page d'accueil
        navigate(from === '/' ? '/' : from);
      }
      
      toast.success('Connexion réussie !');
    } catch (error) {
      toast.error(error.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-form-container">
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Entrez votre email"
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
                  placeholder="Entrez votre mot de passe"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary btn-block" 
                disabled={loading}
              >
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </form>
            <div className="auth-links">
              <p>
                Pas encore de compte ? <Link to="/register">S'inscrire</Link>
              </p>
              <p>
                <Link to="/forgot-password">Mot de passe oublié ?</Link>
              </p>
            </div>
          </div>
          <div className="auth-info">
            <div className="auth-info-content">
              <h2>Bienvenue sur Cesi-Eat</h2>
              <p>Connectez-vous pour accéder à votre compte et profiter de toutes les fonctionnalités de notre plateforme.</p>
              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-icon">🍔</span>
                  <span className="feature-text">Commandez vos plats préférés</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🚚</span>
                  <span className="feature-text">Livraison rapide à domicile</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💳</span>
                  <span className="feature-text">Paiement sécurisé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 