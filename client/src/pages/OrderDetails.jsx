import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simuler la récupération des détails de la commande
    setTimeout(() => {
      // Données de démonstration
      const mockOrder = {
        _id: id,
        numeroCommande: 'CMD-12345',
        restaurant: {
          _id: 'rest1',
          nom: 'Le Bistro Français',
          image: 'https://via.placeholder.com/300x200',
          adresse: '123 Rue de Paris, 75001 Paris',
          telephone: '01 23 45 67 89'
        },
        items: [
          { 
            _id: 'item1', 
            nom: 'Steak Frites', 
            description: 'Steak de bœuf grillé servi avec des frites maison et sauce au poivre',
            quantite: 1, 
            prix: 15.90,
            image: 'https://via.placeholder.com/100'
          },
          { 
            _id: 'item2', 
            nom: 'Mousse au Chocolat', 
            description: 'Mousse au chocolat noir avec éclats de noisettes',
            quantite: 2, 
            prix: 6.50,
            image: 'https://via.placeholder.com/100'
          }
        ],
        statut: 'livré',
        total: 28.90,
        sousTotal: 25.90,
        fraisLivraison: 3.00,
        date: new Date('2023-04-15T18:30:00'),
        estimationLivraison: new Date('2023-04-15T19:15:00'),
        adresseLivraison: '123 Rue de la Paix, 75001 Paris',
        methodePaiement: 'Carte de crédit',
        livreur: {
          nom: 'Martin Dupont',
          telephone: '06 12 34 56 78'
        },
        historique: [
          { statut: 'commandé', date: new Date('2023-04-15T18:30:00') },
          { statut: 'confirmé', date: new Date('2023-04-15T18:35:00') },
          { statut: 'en préparation', date: new Date('2023-04-15T18:40:00') },
          { statut: 'prêt', date: new Date('2023-04-15T19:00:00') },
          { statut: 'en livraison', date: new Date('2023-04-15T19:05:00') },
          { statut: 'livré', date: new Date('2023-04-15T19:25:00') }
        ]
      };
      
      setOrder(mockOrder);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Chargement des détails de la commande...</div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="error-container">
        <div className="error-message">
          {error || "Cette commande n'existe pas ou a été supprimée."}
        </div>
        <Link to="/orders" className="btn btn-primary">
          Retour à mes commandes
        </Link>
      </div>
    );
  }

  return (
    <div className="order-details-page">
      <div className="container">
        <div className="order-details-header">
          <Link to="/orders" className="back-link">
            ← Retour à mes commandes
          </Link>
          <h1>Détails de la commande #{order.numeroCommande}</h1>
          <p className="order-date">
            Commandé le {new Date(order.date).toLocaleDateString('fr-FR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
        
        <div className="order-details-grid">
          {/* Colonne principale */}
          <div className="order-details-main">
            {/* Statut actuel */}
            <div className="order-status-card">
              <h2>Statut de la commande</h2>
              <div className={`order-current-status status-${order.statut}`}>
                <div>
                  <h3>{formatStatus(order.statut)}</h3>
                  <p>
                    {getStatusMessage(order.statut, order.estimationLivraison)}
                  </p>
                </div>
                <div className="status-icon">
                  {getStatusIcon(order.statut)}
                </div>
              </div>
            </div>
            
            {/* Liste des articles */}
            <div className="order-items-card">
              <h2>Articles commandés</h2>
              
              <div className="restaurant-info">
                <img src={order.restaurant.image} alt={order.restaurant.nom} />
                <div>
                  <h3>{order.restaurant.nom}</h3>
                  <p>{order.restaurant.adresse}</p>
                </div>
              </div>
              
              <hr />
              
              <div className="order-items-list">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-info">
                      <img src={item.image} alt={item.nom} />
                      <div>
                        <h4>{item.nom}</h4>
                        <p>{item.description}</p>
                      </div>
                    </div>
                    <div className="item-price">
                      <div>{item.quantite} × {item.prix.toFixed(2)} €</div>
                      <div className="item-total">{(item.quantite * item.prix).toFixed(2)} €</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Historique de la commande */}
            <div className="order-timeline-card">
              <h2>Suivi de commande</h2>
              
              <div className="order-timeline">
                {order.historique.map((event, index) => (
                  <div key={index} className="timeline-event">
                    <div className="timeline-dot"></div>
                    {index < order.historique.length - 1 && <div className="timeline-line"></div>}
                    <div className="timeline-content">
                      <div className="timeline-status">{formatStatus(event.statut)}</div>
                      <div className="timeline-date">
                        {new Date(event.date).toLocaleDateString('fr-FR', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Colonne latérale */}
          <div className="order-details-sidebar">
            {/* Résumé de la commande */}
            <div className="order-summary-card">
              <h2>Résumé</h2>
              
              <div className="order-summary">
                <div className="summary-row">
                  <span>Sous-total</span>
                  <span>{order.sousTotal.toFixed(2)} €</span>
                </div>
                <div className="summary-row">
                  <span>Frais de livraison</span>
                  <span>{order.fraisLivraison.toFixed(2)} €</span>
                </div>
                <hr />
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{order.total.toFixed(2)} €</span>
                </div>
              </div>
              
              <div className="payment-info">
                <div className="info-row">
                  <span>Méthode de paiement</span>
                  <span>{order.methodePaiement}</span>
                </div>
              </div>
            </div>
            
            {/* Infos de livraison */}
            <div className="delivery-info-card">
              <h2>Informations de livraison</h2>
              
              <div className="info-row">
                <span>Adresse de livraison</span>
                <span>{order.adresseLivraison}</span>
              </div>
              
              {order.statut === 'en livraison' && order.livreur && (
                <div className="livreur-info">
                  <h3>Votre livreur</h3>
                  <div className="livreur-details">
                    <div className="livreur-avatar">
                      {order.livreur.nom.charAt(0)}
                    </div>
                    <div>
                      <p>{order.livreur.nom}</p>
                      <p>{order.livreur.telephone}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fonctions auxiliaires
function formatStatus(status) {
  switch(status) {
    case 'commandé': return 'Commandé';
    case 'confirmé': return 'Confirmé';
    case 'en préparation': return 'En préparation';
    case 'prêt': return 'Prêt';
    case 'en livraison': return 'En livraison';
    case 'livré': return 'Livré';
    case 'annulé': return 'Annulé';
    default: return status;
  }
}

function getStatusMessage(status, estimationLivraison) {
  switch(status) {
    case 'en attente': 
      return 'Votre commande est en attente de confirmation par le restaurant.';
    case 'confirmé': 
      return 'Votre commande a été confirmée par le restaurant.';
    case 'en préparation': 
      return 'Le restaurant prépare votre commande.';
    case 'prêt': 
      return 'Votre commande est prête et attend d\'être récupérée par un livreur.';
    case 'en livraison': 
      return `Votre commande est en route ! Livraison estimée à ${new Date(estimationLivraison).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}.`;
    case 'livré': 
      return 'Votre commande a été livrée. Bon appétit !';
    case 'annulé': 
      return 'Cette commande a été annulée.';
    default: 
      return '';
  }
}

function getStatusIcon(status) {
  switch(status) {
    case 'en attente': return '⏳';
    case 'confirmé': return '✓';
    case 'en préparation': return '👨‍🍳';
    case 'prêt': return '📦';
    case 'en livraison': return '🚚';
    case 'livré': return '🎉';
    case 'annulé': return '❌';
    default: return '❓';
  }
}

function getStatusBackgroundColor(status) {
  switch(status) {
    case 'en attente': return '#fff9c4';
    case 'confirmé': return '#e3f2fd';
    case 'en préparation': return '#e0f7fa';
    case 'prêt': return '#e8f5e9';
    case 'en livraison': return '#ede7f6';
    case 'livré': return '#e8f5e9';
    case 'annulé': return '#ffebee';
    default: return '#f5f5f5';
  }
}

function getStatusTextColor(status) {
  switch(status) {
    case 'en attente': return '#f57f17';
    case 'confirmé': return '#1976d2';
    case 'en préparation': return '#0097a7';
    case 'prêt': return '#388e3c';
    case 'en livraison': return '#5e35b1';
    case 'livré': return '#388e3c';
    case 'annulé': return '#d32f2f';
    default: return '#424242';
  }
}

export default OrderDetails; 