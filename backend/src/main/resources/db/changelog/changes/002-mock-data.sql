-- liquibase formatted sql

-- changeset seanhammack:2
INSERT INTO restaurants (id, name)
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'The Gourmet Kitchen'),
       ('550e8400-e29b-41d4-a716-446655440001', 'Pasta Paradise');

INSERT INTO users (restaurant_id, email, password_hash)
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'chef@gourmet.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00dmReIQK5dgS.'),
       ('550e8400-e29b-41d4-a716-446655440001', 'manager@pasta.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00dmReIQK5dgS.');

INSERT INTO recipes (restaurant_id, name, instructions, yield_amount, yield_unit, ingredients)
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'Truffle Risotto', '1. Sauté onions.
2. Add rice.
3. Slowly add broth.
4. Finish with truffle oil.', 4.00, 'servings', '300g Arborio rice
1L vegetable broth
1 medium onion
50g butter
50g parmesan
1 tbsp truffle oil'),
       ('550e8400-e29b-41d4-a716-446655440001', 'Classic Lasagna', '1. Layer pasta sheets.
2. Spread meat sauce and ricotta.
3. Repeat.
4. Bake at 375F.', 8.00, 'servings', '12 pasta sheets
500g ground beef
750ml tomato sauce
500g ricotta cheese
300g mozzarella'),
       ('550e8400-e29b-41d4-a716-446655440000', 'Pan-Seared Scallops', '1. Pat scallops dry.
2. Season with salt and pepper.
3. Sear in a hot pan with butter for 2 minutes per side.', 2.00, 'servings', '10 large sea scallops
30g butter
1 tsp salt
1/2 tsp black pepper
1/2 lemon'),
       ('550e8400-e29b-41d4-a716-446655440000', 'Chocolate Lava Cake', '1. Melt chocolate and butter.
2. Whisk eggs and sugar.
3. Combine and fold in flour.
4. Bake at 425F for 12 minutes.', 2.00, 'servings', '100g dark chocolate
50g butter
2 eggs
50g sugar
30g flour
1 tsp vanilla extract'),
       ('550e8400-e29b-41d4-a716-446655440001', 'Spaghetti Carbonara', '1. Boil spaghetti.
2. Sauté guanciale.
3. Mix eggs, pecorino, and pepper.
4. Toss pasta with guanciale and egg mixture.', 2.00, 'servings', '200g spaghetti
100g guanciale
3 large eggs
50g pecorino romano
1 tsp black pepper'),
       ('550e8400-e29b-41d4-a716-446655440001', 'Tiramisu', '1. Dip ladyfingers in coffee.
2. Layer with mascarpone cream.
3. Dust with cocoa powder.
4. Refrigerate for 4 hours.', 6.00, 'servings', '24 ladyfingers
250ml espresso
500g mascarpone cheese
3 eggs
100g sugar
2 tbsp cocoa powder');