import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container">
        <div className="loading">Chargement du profil...</div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-grid">
          <div className="profile-sidebar">
            <ul className="profile-nav">
              <li>
                <a href="#profile" className="active">
                  <span>Profil</span>
                </a>
              </li>
              <li>
                <a href="#payment">
                  <span>Modes de paiement</span>
                </a>
              </li>
              <li>
                <a href="#address">
                  <span>Adresses</span>
                </a>
              </li>
              <li>
                <a href="#orders">
                  <span>Commandes</span>
                </a>
              </li>
              <li>
                <a href="#notifications">
                  <span>Notifications</span>
                </a>
              </li>
              <li>
                <a href="#logout">
                  <span>Déconnexion</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="profile-content">
            <div className="profile-header">
              <h1>Détails du profil</h1>
              <p>Mettez à jour vos informations</p>
            </div>
            
            <div className="profile-avatar">
              <div className="avatar-container">
                <img src="https://via.placeholder.com/100x100?text=Avatar" alt="Avatar de profil" />
              </div>
            </div>
            
            <div className="profile-details">
              <div className="profile-field">
                <label>Nom complet</label>
                <span>{user.firstName} {user.lastName}</span>
              </div>
              
              <div className="profile-field">
                <label>Email</label>
                <span>{user.email}</span>
              </div>
              
              <div className="profile-field">
                <label>Téléphone</label>
                <span>{user.phone || 'Non renseigné'}</span>
              </div>
              
              <div className="profile-field">
                <label>Adresse</label>
                <span>{user.address || 'Non renseignée'}</span>
              </div>
              
              <div className="profile-field">
                <label>Code postal</label>
                <span>{user.zipCode || 'Non renseigné'}</span>
              </div>
              
              <div className="profile-field">
                <label>Ville</label>
                <span>{user.city || 'Non renseignée'}</span>
              </div>
              
              <div className="profile-field">
                <label>Pays</label>
                <span>{user.country || 'Non renseigné'}</span>
              </div>
              
              <div className="profile-field">
                <label>Inscrit depuis</label>
                <span>{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            <button className="btn btn-primary">
              Modifier le profil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 