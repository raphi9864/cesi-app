require('dotenv').config();
const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');
const Dish = require('../models/Dish');

// Données frontend
const frontend_restaurants = [
  {
    nom: "Le Bistrot Moderne",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400",
    categories: ["Burgers", "Français", "Fusion"],
    adresse: "15 rue des Gourmets, 75001 Paris",
    horaires: "11h00 - 23h00",
    notation: 4.7,
    tempsLivraison: "25-35 min",
    fraisLivraison: 2.50,
    commandeMinimum: 15.00,
    popular: true
  },
  {
    nom: "Napoli Express",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400",
    categories: ["Italien", "Pizzas", "Pâtes"],
    adresse: "42 avenue Italienne, 75002 Paris",
    horaires: "11h30 - 22h30",
    notation: 4.5,
    tempsLivraison: "30-40 min",
    fraisLivraison: 3.00,
    commandeMinimum: 20.00,
    popular: true
  },
  {
    nom: "Fresh & Co",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400",
    categories: ["Healthy", "Bowls", "Salades"],
    adresse: "7 rue de la Santé, 75006 Paris",
    horaires: "10h00 - 21h00",
    notation: 4.8,
    tempsLivraison: "15-25 min",
    fraisLivraison: 2.00,
    commandeMinimum: 12.00,
    popular: true
  },
  {
    nom: "Tokyo Fusion",
    image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400",
    categories: ["Japonais", "Asiatique", "Fusion"],
    adresse: "23 boulevard Asiatique, 75008 Paris",
    horaires: "11h30 - 22h00",
    notation: 4.6,
    tempsLivraison: "35-45 min",
    fraisLivraison: 3.50,
    commandeMinimum: 18.00,
    popular: true
  },
  {
    nom: "Green Garden",
    image: "https://images.unsplash.com/photo-1564759191971-5f7a21a3d515?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400",
    categories: ["Végétarien", "Vegan", "Salades"],
    adresse: "10 rue Végétale, 75003 Paris",
    horaires: "10h00 - 21h30",
    notation: 4.3,
    tempsLivraison: "20-30 min",
    fraisLivraison: 2.50,
    commandeMinimum: 15.00,
    popular: false
  },
  {
    nom: "Casa Mexicana",
    image: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400",
    categories: ["Mexicain", "Tacos", "Tex-Mex"],
    adresse: "33 rue du Sombrero, 75012 Paris",
    horaires: "11h30 - 23h00",
    notation: 4.7,
    tempsLivraison: "30-40 min",
    fraisLivraison: 3.00,
    commandeMinimum: 20.00,
    popular: true
  },
  {
    nom: "Sushi Paradise",
    image: "https://images.unsplash.com/photo-1531973486364-5fa64260d75b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400",
    categories: ["Japonais", "Sushi", "Asiatique"],
    adresse: "18 avenue du Japon, 75016 Paris",
    horaires: "11h00 - 22h30",
    notation: 4.9,
    tempsLivraison: "25-40 min",
    fraisLivraison: 4.00,
    commandeMinimum: 25.00,
    popular: true
  },
  {
    nom: "Médina",
    image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400",
    categories: ["Marocain", "Africain", "Méditerranéen"],
    adresse: "5 rue du Maghreb, 75005 Paris",
    horaires: "12h00 - 23h00",
    notation: 4.6,
    tempsLivraison: "30-45 min",
    fraisLivraison: 3.50,
    commandeMinimum: 22.00,
    popular: false
  },
  {
    nom: "Bangkok Street",
    image: "https://images.unsplash.com/photo-1553443175-e1ce8896d8f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400",
    categories: ["Thaïlandais", "Asiatique", "Street Food"],
    adresse: "27 rue de Bangkok, 75009 Paris",
    horaires: "11h30 - 22h30",
    notation: 4.5,
    tempsLivraison: "25-35 min",
    fraisLivraison: 3.00,
    commandeMinimum: 18.00,
    popular: true
  },
  {
    nom: "Dolce Vita",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400",
    categories: ["Italien", "Desserts", "Café"],
    adresse: "12 rue de Rome, 75017 Paris",
    horaires: "10h00 - 22h00",
    notation: 4.8,
    tempsLivraison: "20-30 min",
    fraisLivraison: 2.50,
    commandeMinimum: 15.00,
    popular: true
  }
];

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connecté à MongoDB, début du processus de migration...');
    migrateData();
  })
  .catch(err => {
    console.error('Erreur de connexion MongoDB:', err);
    process.exit(1);
  });

const migrateData = async () => {
  try {
    // Supprimer les données existantes
    await Restaurant.deleteMany({});
    await Dish.deleteMany({});
    console.log('Données existantes supprimées');

    // Insérer les restaurants
    const insertedRestaurants = await Restaurant.insertMany(frontend_restaurants);
    console.log(`${insertedRestaurants.length} restaurants insérés`);

    // Créer un mapping entre noms de restaurants et IDs MongoDB
    const restaurantMap = {};
    insertedRestaurants.forEach(restaurant => {
      restaurantMap[restaurant.nom] = restaurant._id;
    });

    // Données pour les plats
    const frontend_plats = [
      {
        nom: "Burger Gourmet Supreme",
        description: "Délicieux burger avec steak de bœuf, fromage fondu, bacon croustillant, oignons caramélisés et sauce signature.",
        prix: 14.90,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400",
        categorie: "Burgers",
        restaurant: "Le Bistrot Moderne",
        notation: 4.7,
        popular: true
      },
      {
        nom: "Pizza Quattro Formaggi",
        description: "Une pizza savoureuse aux quatre fromages: mozzarella, gorgonzola, parmesan et chèvre, sur une base de sauce tomate maison.",
        prix: 13.50,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400",
        categorie: "Pizzas",
        restaurant: "Napoli Express",
        notation: 4.5,
        popular: true
      },
      {
        nom: "Poke Bowl Hawaïen",
        description: "Bowl frais avec riz, saumon mariné, avocat, mangue, concombre, edamame et sauce soja au sésame.",
        prix: 15.90,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400",
        categorie: "Healthy",
        restaurant: "Fresh & Co",
        notation: 4.8,
        popular: true
      },
      {
        nom: "Ramen Traditionnel",
        description: "Ramen savoureux au bouillon de porc tonkotsu, nouilles fraîches, poitrine de porc chashu, œuf mollet, algues nori et oignons verts.",
        prix: 16.50,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400",
        categorie: "Asiatique",
        restaurant: "Tokyo Fusion",
        notation: 4.6,
        popular: false
      },
      {
        nom: "Salade César au Poulet",
        description: "Salade romaine, poulet grillé, croûtons à l'ail, parmesan, bacon et sauce César crémeuse.",
        prix: 12.90,
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400",
        categorie: "Salades",
        restaurant: "Green Garden",
        notation: 4.3,
        popular: false
      },
      {
        nom: "Tacos Mexicains",
        description: "Trois tacos de maïs garnis de bœuf épicé, guacamole, pico de gallo, fromage et crème fraîche.",
        prix: 13.90,
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400",
        categorie: "Mexicain",
        restaurant: "Casa Mexicana",
        notation: 4.7,
        popular: true
      },
      {
        nom: "Sushi Combo Deluxe",
        description: "Assortiment de 16 pièces: California rolls, maki saumon, nigiri thon et crevettes tempura rolls.",
        prix: 24.90,
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400",
        categorie: "Japonais",
        restaurant: "Sushi Paradise",
        notation: 4.9,
        popular: true
      },
      {
        nom: "Couscous Royal",
        description: "Couscous traditionnel avec agneau, poulet, merguez, pois chiches et légumes de saison.",
        prix: 19.90,
        image: "https://images.unsplash.com/photo-1585419522120-d2a8d8a9f0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400",
        categorie: "Africain",
        restaurant: "Médina",
        notation: 4.6,
        popular: false
      },
      {
        nom: "Pad Thaï aux Crevettes",
        description: "Nouilles de riz sautées avec crevettes, tofu, œuf, germes de soja, cacahuètes et sauce tamarin.",
        prix: 14.50,
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400",
        categorie: "Thaïlandais",
        restaurant: "Bangkok Street",
        notation: 4.5,
        popular: true
      },
      {
        nom: "Tiramisu Classique",
        description: "Dessert italien avec biscuits à la cuillère imbibés de café, mascarpone et cacao.",
        prix: 7.90,
        image: "https://images.unsplash.com/photo-1551529227-e241c3c5ce38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400",
        categorie: "Desserts",
        restaurant: "Dolce Vita",
        notation: 4.8,
        popular: true
      },
      // Plats supplémentaires pour le Bistrot Moderne
      {
        nom: "Classic Cheese Burger",
        description: "Steak haché de bœuf, cheddar affiné, tomate, oignon rouge, salade et sauce burger maison",
        prix: 12.90,
        image: "https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
        categorie: "Burgers",
        restaurant: "Le Bistrot Moderne",
        notation: 4.5,
        popular: true
      },
      {
        nom: "Veggie Burger",
        description: "Galette de légumes, guacamole, roquette, tomate séchée, oignon rouge et sauce au yaourt",
        prix: 13.50,
        image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
        categorie: "Burgers",
        restaurant: "Le Bistrot Moderne",
        notation: 4.2,
        popular: false
      },
      // Plats supplémentaires pour Napoli Express
      {
        nom: "Spaghetti Carbonara",
        description: "Spaghetti avec crème, œuf, pancetta, parmesan et poivre noir",
        prix: 12.50,
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
        categorie: "Pâtes",
        restaurant: "Napoli Express",
        notation: 4.6,
        popular: true
      },
      {
        nom: "Lasagne alla Bolognese",
        description: "Lasagnes avec sauce bolognaise, béchamel et parmesan",
        prix: 13.90,
        image: "https://images.unsplash.com/photo-1619895092538-128f6e1e10a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
        categorie: "Pâtes",
        restaurant: "Napoli Express",
        notation: 4.7,
        popular: true
      }
    ];

    // Préparer les plats avec les bons IDs de restaurant
    const dishesWithRestaurantIds = frontend_plats.map(plat => ({
      ...plat,
      restaurantId: restaurantMap[plat.restaurant] // Lier au bon restaurant
    }));

    // Insérer les plats
    const insertedDishes = await Dish.insertMany(dishesWithRestaurantIds);
    console.log(`${insertedDishes.length} plats insérés`);

    console.log('Migration terminée avec succès!');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la migration:', error);
    process.exit(1);
  }
}; 