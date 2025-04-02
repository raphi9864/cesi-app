import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupérer directement les informations de l'utilisateur
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoadingUser(false);
          return;
        }
        
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        console.log("Données utilisateur récupérées:", response.data);
        setUserInfo(response.data);
        setLoadingUser(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des données utilisateur:", err);
        setError(err.message);
        setLoadingUser(false);
      }
    };
    
    fetchUserInfo();
  }, []);

  // Afficher les informations de débogage
  if (loadingUser) {
    return (
      <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
        <h2>Vérification des autorisations...</h2>
        <p>Veuillez patienter pendant que nous vérifions vos droits d'accès.</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto', color: 'red'}}>
        <h2>Erreur d'authentification</h2>
        <p>Une erreur s'est produite: {error}</p>
        <div style={{marginTop: '20px'}}>
          <button onClick={() => window.location.href = '/login'} 
                  style={{padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>
            Retour à la page de connexion
          </button>
        </div>
      </div>
    );
  }
  
  // Afficher les informations utilisateur pour le débogage
  if (userInfo) {
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    
    // Vérifier si le rôle de l'utilisateur est autorisé
    if (roles.includes(userInfo.role)) {
      return children;
    } else {
      return (
        <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
          <h2>Accès refusé</h2>
          <p>Vous n'avez pas les autorisations nécessaires pour accéder à cette page.</p>
          <p>Votre rôle: {userInfo.role || 'Non défini'}</p>
          <p>Rôles autorisés: {roles.join(', ')}</p>
          <div style={{marginTop: '20px'}}>
            <button onClick={() => window.location.href = '/'} 
                    style={{padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>
              Retour à l'accueil
            </button>
          </div>
        </div>
      );
    }
  }
  
  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RoleProtectedRoute; 