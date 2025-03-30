import React, { createContext, useState, useContext, useEffect } from 'react';

// Créer le contexte
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);

// Provider
export const AuthProvider = ({ children }) => {
  // Initialiser l'état depuis localStorage si disponible
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('user') ? true : false;
  });
  
  // Mettre à jour le localStorage quand l'état de l'utilisateur change
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('user');
      setIsAuthenticated(false);
    }
  }, [user]);
  
  // Simuler une connexion
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simuler un délai de réseau
      setTimeout(() => {
        // Pour la démo, accepter n'importe quelle combinaison valide d'email et mot de passe
        if (email && password && password.length >= 6) {
          // Utilisateur fictif pour la démo
          const mockUser = {
            id: '123456',
            firstName: 'John',
            lastName: 'Doe',
            email: email,
            phone: '+33 6 12 34 56 78',
            address: '123 Rue de Paris',
            zipCode: '75001',
            city: 'Paris',
            country: 'France',
            createdAt: new Date().toISOString()
          };
          
          setUser(mockUser);
          resolve(mockUser);
        } else {
          reject(new Error('Email ou mot de passe invalide'));
        }
      }, 1000);
    });
  };
  
  // Simuler une inscription
  const register = (userData) => {
    return new Promise((resolve, reject) => {
      // Simuler un délai de réseau
      setTimeout(() => {
        if (!userData.email || !userData.password || userData.password.length < 6) {
          reject(new Error('Données d\'inscription invalides'));
          return;
        }
        
        // Créer un utilisateur fictif avec les données fournies
        const newUser = {
          id: 'user_' + Math.random().toString(36).substr(2, 9),
          ...userData,
          createdAt: new Date().toISOString()
        };
        
        setUser(newUser);
        resolve(newUser);
      }, 1000);
    });
  };
  
  // Déconnexion
  const logout = () => {
    setUser(null);
  };
  
  // Mettre à jour le profil
  const updateProfile = (updatedData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(prevUser => ({
          ...prevUser,
          ...updatedData
        }));
        resolve(true);
      }, 1000);
    });
  };
  
  // Valeurs exposées par le contexte
  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 