import React, { createContext, useContext, useState, useEffect } from 'react';

// Créer le contexte
const CartContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useCart = () => useContext(CartContext);

// Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Charger le panier depuis le localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Erreur lors du chargement du panier:", e);
      }
    }
  }, []);

  // Mettre à jour le localStorage quand le panier change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Calculer le total
    const total = cartItems.reduce((sum, item) => sum + (item.prix * item.quantity), 0);
    setCartTotal(total);
  }, [cartItems]);

  // Ajouter un article au panier
  const addToCart = (item) => {
    setCartItems(prevItems => {
      // Vérifier si l'article est déjà dans le panier
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
      
      if (existingItemIndex !== -1) {
        // Si l'article existe, augmenter la quantité
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Sinon, ajouter le nouvel article avec quantité 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };
  
  // Supprimer un article du panier
  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  
  // Mettre à jour la quantité d'un article
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };
  
  // Vider le panier
  const clearCart = () => {
    setCartItems([]);
  };
  
  // Valeurs exposées par le contexte
  const value = {
    cartItems,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider; 