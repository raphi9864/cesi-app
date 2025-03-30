import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Afficher un indicateur de chargement pendant la vérification de l'authentification
  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!isAuthenticated) {
    // Enregistrer l'emplacement actuel pour y revenir après connexion
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Rendre le composant enfant si l'utilisateur est authentifié
  return children;
};

export default ProtectedRoute; 