-- Migration Script for MongoDB to SQL

USE food_delivery;

-- Disable foreign key checks temporarily to avoid constraint issues during insertion
SET FOREIGN_KEY_CHECKS = 0;

-- Clear existing data (if any)
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE restaurateur_specialities;
TRUNCATE TABLE restaurateur_restaurants;
TRUNCATE TABLE livreur_profiles;
TRUNCATE TABLE restaurateur_profiles;
TRUNCATE TABLE dishes;
TRUNCATE TABLE restaurant_categories;
TRUNCATE TABLE restaurants;
TRUNCATE TABLE users;

-- Enable foreign key checks again
SET FOREIGN_KEY_CHECKS = 1;

-- Insert restaurants
-- Note: We're using the MongoDB ObjectId last part as our ID to maintain relationships
INSERT INTO restaurants (id, nom, image, adresse, horaires, notation, temps_livraison, frais_livraison, commande_minimum, popular, created_at)
VALUES
(1, 'Le Bistrot Moderne', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400', '15 rue des Gourmets, 75001 Paris', '11h00 - 23h00', 4.7, '25-35 min', 2.5, 15, true, '2025-03-31 08:40:03'),
(2, 'Napoli Express', 'https://images.unsplash.com/photo-1579751626657-72bc17010498?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400', '42 avenue Italienne, 75002 Paris', '11h30 - 22h30', 4.5, '30-40 min', 3, 20, true, '2025-03-31 08:40:03'),
(3, 'Fresh & Co', 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400', '7 rue de la Santé, 75006 Paris', '10h00 - 21h00', 4.8, '15-25 min', 2, 12, true, '2025-03-31 08:40:03'),
(4, 'Tokyo Fusion', 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400', '23 boulevard Asiatique, 75008 Paris', '11h30 - 22h00', 4.6, '35-45 min', 3.5, 18, true, '2025-03-31 08:40:03'),
(5, 'Green Garden', 'https://images.unsplash.com/photo-1564759191971-5f7a21a3d515?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400', '10 rue Végétale, 75003 Paris', '10h00 - 21h30', 4.3, '20-30 min', 2.5, 15, false, '2025-03-31 08:40:03'),
(6, 'Casa Mexicana', 'https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400', '33 rue du Sombrero, 75012 Paris', '11h30 - 23h00', 4.7, '30-40 min', 3, 20, true, '2025-03-31 08:40:03'),
(7, 'Sushi Paradise', 'https://images.unsplash.com/photo-1531973486364-5fa64260d75b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400', '18 avenue du Japon, 75016 Paris', '11h00 - 22h30', 4.9, '25-40 min', 4, 25, true, '2025-03-31 08:40:03'),
(8, 'Médina', 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400', '5 rue du Maghreb, 75005 Paris', '12h00 - 23h00', 4.6, '30-45 min', 3.5, 22, false, '2025-03-31 08:40:03'),
(9, 'Bangkok Street', 'https://images.unsplash.com/photo-1553443175-e1ce8896d8f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400', '27 rue de Bangkok, 75009 Paris', '11h30 - 22h30', 4.5, '25-35 min', 3, 18, true, '2025-03-31 08:40:03'),
(10, 'Dolce Vita', 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400', '12 rue de Rome, 75017 Paris', '10h00 - 22h00', 4.8, '20-30 min', 2.5, 15, true, '2025-03-31 08:40:03');

-- Insert restaurant categories
INSERT INTO restaurant_categories (restaurant_id, category) VALUES
(1, 'Burgers'), (1, 'Français'), (1, 'Fusion'),
(2, 'Italien'), (2, 'Pizzas'), (2, 'Pâtes'),
(3, 'Healthy'), (3, 'Bowls'), (3, 'Salades'),
(4, 'Japonais'), (4, 'Asiatique'), (4, 'Fusion'),
(5, 'Végétarien'), (5, 'Vegan'), (5, 'Salades'),
(6, 'Mexicain'), (6, 'Tacos'), (6, 'Tex-Mex'),
(7, 'Japonais'), (7, 'Sushi'), (7, 'Asiatique'),
(8, 'Marocain'), (8, 'Africain'), (8, 'Méditerranéen'),
(9, 'Thaïlandais'), (9, 'Asiatique'), (9, 'Street Food'),
(10, 'Italien'), (10, 'Desserts'), (10, 'Café');

-- Insert dishes
INSERT INTO dishes (nom, description, prix, image, categorie, restaurant_id, restaurant, notation, popular, created_at) VALUES
('Burger Gourmet Supreme', 'Délicieux burger avec steak de bœuf, fromage fondu, bacon croustillant, oignons caramélisés et sauce signature.', 14.9, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400', 'Burgers', 1, 'Le Bistrot Moderne', 4.7, true, '2025-03-31 08:40:03'),
('Pizza Quattro Formaggi', 'Une pizza savoureuse aux quatre fromages: mozzarella, gorgonzola, parmesan et chèvre, sur une base de sauce tomate maison.', 13.5, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400', 'Pizzas', 2, 'Napoli Express', 4.5, true, '2025-03-31 08:40:03'),
('Poke Bowl Hawaïen', 'Bowl frais avec riz, saumon mariné, avocat, mangue, concombre, edamame et sauce soja au sésame.', 15.9, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400', 'Healthy', 3, 'Fresh & Co', 4.8, true, '2025-03-31 08:40:03'),
('Ramen Traditionnel', 'Ramen savoureux au bouillon de porc tonkotsu, nouilles fraîches, poitrine de porc chashu, œuf mollet, algues nori et oignons verts.', 16.5, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400', 'Asiatique', 4, 'Tokyo Fusion', 4.6, false, '2025-03-31 08:40:03'),
('Salade César au Poulet', 'Salade romaine, poulet grillé, croûtons à l\'ail, parmesan, bacon et sauce César crémeuse.', 12.9, 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400', 'Salades', 5, 'Green Garden', 4.3, false, '2025-03-31 08:40:03'),
('Tacos Mexicains', 'Trois tacos de maïs garnis de bœuf épicé, guacamole, pico de gallo, fromage et crème fraîche.', 13.9, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400', 'Mexicain', 6, 'Casa Mexicana', 4.7, true, '2025-03-31 08:40:03'),
('Sushi Combo Deluxe', 'Assortiment de 16 pièces: California rolls, maki saumon, nigiri thon et crevettes tempura rolls.', 24.9, 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400', 'Japonais', 7, 'Sushi Paradise', 4.9, true, '2025-03-31 08:40:03'),
('Couscous Royal', 'Couscous traditionnel avec agneau, poulet, merguez, pois chiches et légumes de saison.', 19.9, 'https://images.unsplash.com/photo-1585419522120-d2a8d8a9f0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400', 'Africain', 8, 'Médina', 4.6, false, '2025-03-31 08:40:03'),
('Pad Thaï aux Crevettes', 'Nouilles de riz sautées avec crevettes, tofu, œuf, germes de soja, cacahuètes et sauce tamarin.', 14.5, 'https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400', 'Thaïlandais', 9, 'Bangkok Street', 4.5, true, '2025-03-31 08:40:03'),
('Tiramisu Classique', 'Dessert italien avec biscuits à la cuillère imbibés de café, mascarpone et cacao.', 7.9, 'https://images.unsplash.com/photo-1551529227-e241c3c5ce38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400', 'Desserts', 10, 'Dolce Vita', 4.8, true, '2025-03-31 08:40:03'),
('Classic Cheese Burger', 'Steak haché de bœuf, cheddar affiné, tomate, oignon rouge, salade et sauce burger maison', 12.9, 'https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250', 'Burgers', 1, 'Le Bistrot Moderne', 4.5, true, '2025-03-31 08:40:03'),
('Veggie Burger', 'Galette de légumes, guacamole, roquette, tomate séchée, oignon rouge et sauce au yaourt', 13.5, 'https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250', 'Burgers', 1, 'Le Bistrot Moderne', 4.2, false, '2025-03-31 08:40:03'),
('Spaghetti Carbonara', 'Spaghetti avec crème, œuf, pancetta, parmesan et poivre noir', 12.5, 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250', 'Pâtes', 2, 'Napoli Express', 4.6, true, '2025-03-31 08:40:03'),
('Lasagne alla Bolognese', 'Lasagnes avec sauce bolognaise, béchamel et parmesan', 13.9, 'https://images.unsplash.com/photo-1619895092538-128f6e1e10a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250', 'Pâtes', 2, 'Napoli Express', 4.7, true, '2025-03-31 08:40:03');

-- Insert users
INSERT INTO users (id, email, password, role, first_name, last_name, phone, is_active, created_at, last_login) VALUES
(1, 'raphi98.attal@gmail.com', '$2a$10$qU90qxMuBYL3R3G1FoMJgOFG8ygZb3lE30.8fB5YhBLk5jpOATbRC', 'client', 'Raphael', 'Attal', '+330648302135', true, '2025-03-31 08:48:28', '2025-04-02 08:50:44'),
(2, 'test@example.com', '$2a$10$TqytoD6zvibmnrrAC24wuOgZmgiK3xaJ2kC3Qb0e7.g.28930OqfG', 'client', 'Test', 'User', NULL, true, '2025-03-31 08:59:44', NULL),
(3, 'raz@b.com', '$2a$10$dtwm4mkY4C.CmF3ysltNm.daYVXjvTZkUr5XhhY544DMQVHust/tW', 'client', 'ze', 'z', '+330648302135', true, '2025-03-31 09:03:19', NULL),
(4, 'raphaelattal98@gmail.com', '$2a$10$FKP38lpCTQUS5gvPjFsT5utW8Byz7km5l1XS1m4Kx6RY9iEwKJztW', 'client', 'Raphael', 'Attal', '+330648302135', true, '2025-04-01 20:36:44', NULL),
(5, 'test.restaurateur@example.com', '$2a$10$L.mQqnwQwErR96KUgKYlVefrZYiKrgCPQGzAfM6sWuDdrtM/JzYPu', 'restaurateur', 'Test', 'Restaurateur', '0612345678', true, '2025-04-01 20:49:11', NULL),
(6, 'admin.resto@test.com', '$2a$10$Z1lXaaPnhK0wDNXZGPrv1Ol62Aw1wQO4VXRsvJqNzulvXexXS8uCC', 'restaurateur', 'Admin', 'Restaurateur', NULL, true, '2025-04-01 20:56:25', '2025-04-01 21:12:07'),
(7, 'jsdhbfks@g.com', '$2a$10$4VvOEfhGWHg6E4C2d7X8juw1hNciZ2nnIIhKbtN/t5J8QIyqPxHlS', 'restaurateur', 'sdffd', 'sfsdfdsf', 'zae', true, '2025-04-01 21:44:58', '2025-04-02 06:55:57'),
(8, 'yuguyg@gmail.com', '$2a$10$7aKO8lJGn5okKeSAa6Sm1.Slb0/ybSYzMUckTfsKqlQ2MKceZqVOu', 'livreur', 'z', 'Attal', 'a', true, '2025-04-01 21:46:01', '2025-04-02 08:06:17');

-- Insert restaurateur profiles
INSERT INTO restaurateur_profiles (user_id, description, business_hours, is_verified) VALUES
(5, NULL, NULL, false),
(6, NULL, NULL, false),
(7, 'azeazeza', 'azeazezz', false);

-- Insert restaurateur specialities
INSERT INTO restaurateur_specialities (restaurateur_profile_id, speciality) VALUES
(3, 'azzeaze');

-- Insert livreur profile
INSERT INTO livreur_profiles (user_id, vehicle_type, license_number, is_available, location_lat, location_lng, rating_average, rating_count) VALUES
(8, 'voiture', 'a', false, 43.71876391318597, 7.258645360855561, 0, 0);

-- Commit the transaction
COMMIT;

-- Show status message
SELECT 'Data migration completed successfully.' as 'Status';