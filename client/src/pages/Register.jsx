import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'client',
    // Champs pour restaurateur
    description: '',
    cuisineSpeciality: '',
    businessHours: '',
    // Champs pour livreur
    vehicleType: 'vélo',
    licenseNumber: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation des champs
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    // Validation des champs spécifiques au rôle
    if (formData.role === 'restaurateur') {
      if (!formData.businessHours) {
        setError('Veuillez indiquer vos horaires d\'ouverture');
        return;
      }
    } else if (formData.role === 'livreur') {
      if (!formData.vehicleType) {
        setError('Veuillez sélectionner un type de véhicule');
        return;
      }
    }
    
    try {
      setLoading(true);
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Échec de l\'inscription');
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-form-container">
            <h1>Inscription</h1>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">Prénom *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName">Nom *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="role">Type de compte *</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="client">Client</option>
                  <option value="restaurateur">Restaurateur</option>
                  <option value="livreur">Livreur</option>
                </select>
              </div>
              
              {/* Champs spécifiques pour restaurateur */}
              {formData.role === 'restaurateur' && (
                <div className="role-specific-fields">
                  <h3>Informations restaurateur</h3>
                  
                  <div className="form-group">
                    <label htmlFor="description">Description du restaurant</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Décrivez votre établissement"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="cuisineSpeciality">Spécialités culinaires</label>
                    <input
                      type="text"
                      id="cuisineSpeciality"
                      name="cuisineSpeciality"
                      value={formData.cuisineSpeciality}
                      onChange={handleChange}
                      placeholder="Ex: Italien, Français, Japonais (séparés par des virgules)"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="businessHours">Horaires d'ouverture *</label>
                    <input
                      type="text"
                      id="businessHours"
                      name="businessHours"
                      value={formData.businessHours}
                      onChange={handleChange}
                      placeholder="Ex: Lun-Ven 9h-22h, Sam-Dim 10h-23h"
                      required={formData.role === 'restaurateur'}
                    />
                  </div>
                </div>
              )}
              
              {/* Champs spécifiques pour livreur */}
              {formData.role === 'livreur' && (
                <div className="role-specific-fields">
                  <h3>Informations livreur</h3>
                  
                  <div className="form-group">
                    <label htmlFor="vehicleType">Type de véhicule *</label>
                    <select
                      id="vehicleType"
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      required={formData.role === 'livreur'}
                    >
                      <option value="vélo">Vélo</option>
                      <option value="scooter">Scooter</option>
                      <option value="voiture">Voiture</option>
                      <option value="à pied">À pied</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="licenseNumber">Numéro de permis</label>
                    <input
                      type="text"
                      id="licenseNumber"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      placeholder="Si applicable"
                    />
                  </div>
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="password">Mot de passe *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmer le mot de passe *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-options">
                <div className="remember-me">
                  <input type="checkbox" id="terms" required />
                  <label htmlFor="terms">J'accepte les conditions d'utilisation</label>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary auth-btn"
                disabled={loading}
              >
                {loading ? 'Inscription en cours...' : 'S\'inscrire'}
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
              Déjà inscrit? <Link to="/login">Se connecter</Link>
            </div>
          </div>
          
          <div className="auth-image">
            <img src="https://via.placeholder.com/600x800?text=Food+Delivery" alt="Livraison de nourriture" />
            <div className="auth-image-overlay">
              <div className="auth-image-content">
                <h2>Rejoignez CESI EAT et découvrez une nouvelle façon de vous restaurer</h2>
                <p>Inscrivez-vous pour commander facilement auprès des meilleurs restaurants</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 