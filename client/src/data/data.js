// Fichier de données pour les plats et restaurants fictifs
export const plats = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
    nom: "Tiramisu Classique",
    description: "Dessert italien avec biscuits à la cuillère imbibés de café, mascarpone et cacao.",
    prix: 7.90,
    image: "https://images.unsplash.com/photo-1551529227-e241c3c5ce38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400",
    categorie: "Desserts",
    restaurant: "Dolce Vita",
    notation: 4.8,
    popular: true
  }
];

export const restaurants = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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

// Structure pour organiser les plats par restaurant
export const menus = {
  // Le Bistrot Moderne (ID: 1)
  1: {
    categories: [
      {
        nom: "Burgers Gourmet",
        plats: [
          {
            id: 101,
            nom: "Classic Cheese Burger",
            description: "Steak haché de bœuf, cheddar affiné, tomate, oignon rouge, salade et sauce burger maison",
            prix: 12.90,
            image: "https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: true
          },
          {
            id: 102,
            nom: "Burger Gourmet Supreme",
            description: "Délicieux burger avec steak de bœuf, fromage fondu, bacon croustillant, oignons caramélisés et sauce signature",
            prix: 14.90,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: true
          },
          {
            id: 103,
            nom: "Veggie Burger",
            description: "Galette de légumes, guacamole, roquette, tomate séchée, oignon rouge et sauce au yaourt",
            prix: 13.50,
            image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: false
          }
        ]
      },
      {
        nom: "Entrées",
        plats: [
          {
            id: 104,
            nom: "Salade César",
            description: "Salade romaine, croûtons, parmesan, poulet grillé et sauce César",
            prix: 9.90,
            image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: false
          },
          {
            id: 105,
            nom: "Nachos Supreme",
            description: "Tortillas, guacamole, crème fraîche, cheddar fondu, jalapenos et salsa",
            prix: 8.50,
            image: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: true
          }
        ]
      },
      {
        nom: "Desserts",
        plats: [
          {
            id: 106,
            nom: "Cheesecake New York",
            description: "Gâteau au fromage crémeux avec coulis de fruits rouges",
            prix: 6.90,
            image: "https://images.unsplash.com/photo-1533134242453-b3e6d7d5c87f?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: true
          },
          {
            id: 107,
            nom: "Brownie au Chocolat",
            description: "Brownie tiède servi avec boule de glace vanille et sauce chocolat",
            prix: 7.50,
            image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: false
          }
        ]
      }
    ]
  },
  
  // Napoli Express (ID: 2)
  2: {
    categories: [
      {
        nom: "Pizzas",
        plats: [
          {
            id: 201,
            nom: "Pizza Margherita",
            description: "Sauce tomate, mozzarella, basilic frais et huile d'olive",
            prix: 10.90,
            image: "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: true
          },
          {
            id: 202,
            nom: "Pizza Quattro Formaggi",
            description: "Une pizza savoureuse aux quatre fromages: mozzarella, gorgonzola, parmesan et chèvre, sur une base de sauce tomate maison",
            prix: 13.50,
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: true
          },
          {
            id: 203,
            nom: "Pizza Diavola",
            description: "Sauce tomate, mozzarella, salami piquant, poivrons et olives",
            prix: 12.90,
            image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: false
          }
        ]
      },
      {
        nom: "Pâtes",
        plats: [
          {
            id: 204,
            nom: "Spaghetti Carbonara",
            description: "Spaghetti avec crème, œuf, pancetta, parmesan et poivre noir",
            prix: 12.50,
            image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: true
          },
          {
            id: 205,
            nom: "Lasagne alla Bolognese",
            description: "Lasagnes avec sauce bolognaise, béchamel et parmesan",
            prix: 13.90,
            image: "https://images.unsplash.com/photo-1619895092538-128f6e1e10a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: true
          }
        ]
      },
      {
        nom: "Antipasti",
        plats: [
          {
            id: 206,
            nom: "Bruschetta Tomate Basilic",
            description: "Pain grillé, tomates, basilic, ail et huile d'olive",
            prix: 7.50,
            image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: false
          },
          {
            id: 207,
            nom: "Burrata",
            description: "Burrata crémeuse servie avec tomates cerises, roquette et huile d'olive",
            prix: 9.90,
            image: "https://images.unsplash.com/photo-1648649749638-7e82829d442a?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: true
          }
        ]
      }
    ]
  },
  
  // Fresh & Co (ID: 3)
  3: {
    categories: [
      {
        nom: "Bowls Healthy",
        plats: [
          {
            id: 301,
            nom: "Poke Bowl Hawaïen",
            description: "Bowl frais avec riz, saumon mariné, avocat, mangue, concombre, edamame et sauce soja au sésame",
            prix: 15.90,
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: true
          },
          {
            id: 302,
            nom: "Buddha Bowl",
            description: "Quinoa, avocat, carottes, brocoli, patate douce, houmous et graines de courge",
            prix: 14.50,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: true
          },
          {
            id: 303,
            nom: "Bowl Protéiné",
            description: "Poulet grillé, riz brun, épinards, œuf mollet, avocat et sauce tahini",
            prix: 16.90,
            image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: false
          }
        ]
      },
      {
        nom: "Salades",
        plats: [
          {
            id: 304,
            nom: "Salade Méditerranéenne",
            description: "Roquette, concombre, tomates, olives, feta et vinaigrette au citron",
            prix: 11.90,
            image: "https://images.unsplash.com/photo-1529059997568-3d847b1154f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: false
          },
          {
            id: 305,
            nom: "Salade César au Poulet",
            description: "Salade romaine, poulet grillé, croûtons à l'ail, parmesan, bacon et sauce César crémeuse",
            prix: 12.90,
            image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: true
          }
        ]
      },
      {
        nom: "Smoothies & Jus",
        plats: [
          {
            id: 306,
            nom: "Smoothie Détox",
            description: "Épinards, pomme, concombre, citron, gingembre et menthe",
            prix: 6.50,
            image: "https://images.unsplash.com/photo-1638176037362-9acff9f8dd25?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: true
          },
          {
            id: 307,
            nom: "Smoothie Énergie",
            description: "Banane, fraise, myrtille, avoine et lait d'amande",
            prix: 6.90,
            image: "https://images.unsplash.com/photo-1589734435753-747b757e048e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: false
          }
        ]
      }
    ]
  },
  
  // Tokyo Fusion (ID: 4)
  4: {
    categories: [
      {
        nom: "Ramen & Soupes",
        plats: [
          {
            id: 401,
            nom: "Ramen Traditionnel",
            description: "Ramen savoureux au bouillon de porc tonkotsu, nouilles fraîches, poitrine de porc chashu, œuf mollet, algues nori et oignons verts",
            prix: 16.50,
            image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: true
          },
          {
            id: 402,
            nom: "Miso Ramen",
            description: "Bouillon au miso, nouilles, porc, maïs, œuf mollet et oignons verts",
            prix: 15.90,
            image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: false
          },
          {
            id: 403,
            nom: "Soupe Miso",
            description: "Bouillon miso avec tofu, algues wakame et oignons verts",
            prix: 5.50,
            image: "https://images.unsplash.com/photo-1578020190497-d7f3a353cebe?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: false
          }
        ]
      },
      {
        nom: "Spécialités",
        plats: [
          {
            id: 404,
            nom: "Gyoza",
            description: "6 raviolis japonais au porc et légumes, grillés et servis avec sauce ponzu",
            prix: 7.90,
            image: "https://images.unsplash.com/photo-1625938146369-aaa1e458c4e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: true
          },
          {
            id: 405,
            nom: "Donburi au Poulet",
            description: "Bol de riz avec poulet teriyaki, oignons, œuf, légumes et sauce sucrée",
            prix: 14.50,
            image: "https://images.unsplash.com/photo-1619124998988-05da0a903ef0?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250",
            popular: true
          }
        ]
      }
    ]
  }
}; 