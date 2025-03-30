# CESI EAT - Application de Livraison de Repas

## Description

CESI EAT est une application web de livraison de repas permettant aux utilisateurs de parcourir des restaurants, consulter leurs menus et commander des plats en ligne. L'interface utilisateur moderne et intuitive offre une expérience agréable pour découvrir et commander de délicieux plats.

## Fonctionnalités principales

- 🏠 **Page d'accueil** présentant les catégories de cuisine, les plats populaires et les restaurants en vedette
- 🔍 **Recherche** de restaurants et de plats par nom ou par catégorie
- 🍔 **Fiches détaillées** des restaurants avec leurs menus complets
- 🛒 **Panier d'achat** pour gérer les commandes
- 👤 **Profil utilisateur** pour gérer les informations personnelles
- 📱 **Interface responsive** adaptée à tous les appareils

## Captures d'écran

![Page d'accueil](https://via.placeholder.com/800x450?text=Page+d%27accueil)
![Menu d'un restaurant](https://via.placeholder.com/800x450?text=Menu+Restaurant)
![Panier](https://via.placeholder.com/800x450?text=Panier)

## Technologies utilisées

- ⚛️ **React.js** - Bibliothèque JavaScript pour construire l'interface utilisateur
- 🔄 **React Router** - Navigation entre les pages
- 🔐 **Context API** - Gestion de l'état global (authentification, panier)
- 💅 **CSS-in-JS** - Styles intégrés pour un design moderne
- 📦 **localStorage** - Persistance des données côté client

## Installation et démarrage

```bash
# Cloner le dépôt
git clone https://github.com/raphi9864/cesi-eat.git

# Accéder au dossier du projet
cd cesi-eat/client

# Installer les dépendances
npm install

# Démarrer l'application en mode développement
npm start
```

L'application sera disponible à l'adresse http://localhost:3000.

## Structure du projet

```
client/
├── public/              # Fichiers statiques
├── src/                 # Code source
│   ├── assets/          # Images, styles et ressources
│   ├── components/      # Composants réutilisables
│   ├── context/         # Contextes React (auth, panier)
│   ├── data/            # Données fictives (restaurants, plats)
│   ├── pages/           # Composants de pages
│   ├── App.js           # Composant principal
│   └── index.js         # Point d'entrée
└── package.json         # Dépendances et scripts
```

## Routes principales

- `/` - Page d'accueil
- `/search` - Recherche de restaurants et plats
- `/restaurant/:id` - Détails d'un restaurant et son menu
- `/cart` - Panier d'achat
- `/profile` - Profil utilisateur
- `/register` - Inscription
- `/login` - Connexion

## Fonctionnalités à venir

- 🌐 Backend avec API RESTful
- 💳 Intégration de systèmes de paiement
- 📍 Géolocalisation pour trouver les restaurants à proximité
- 🔔 Notifications en temps réel pour le suivi des commandes
- 📊 Tableau de bord administrateur

## Contributeurs

- [Raphaël](https://github.com/raphi9864)

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails. 