-- Add some sample cakes to the products table
-- Run this in your Supabase SQL Editor

INSERT INTO products (name, description, price, category, image, featured, stock, created_at, updated_at) VALUES
('Chocolate Celebration Cake', 'Rich chocolate cake with layers of chocolate ganache and fresh cream. Perfect for birthdays and celebrations.', 1200, 'cakes', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800', true, 10, NOW(), NOW()),
('Red Velvet Cake', 'Classic red velvet cake with cream cheese frosting. A timeless favorite for any celebration.', 1500, 'cakes', 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800', true, 10, NOW(), NOW()),
('Black Forest Cake', 'Traditional Black Forest cake with layers of chocolate sponge, cherries, and whipped cream.', 1400, 'cakes', 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800', true, 10, NOW(), NOW()),
('Vanilla Dream Cake', 'Light and fluffy vanilla cake with buttercream frosting. Customizable for any occasion.', 1000, 'cakes', 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800', false, 10, NOW(), NOW()),
('Strawberry Delight Cake', 'Fresh strawberry cake with strawberry cream and real fruit toppings.', 1300, 'cakes', 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800', false, 10, NOW(), NOW()),
('Butterscotch Bliss Cake', 'Rich butterscotch flavored cake with crunchy butterscotch bits and cream.', 1100, 'cakes', 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800', false, 10, NOW(), NOW());

-- Note: You can also add cakes through the admin panel at /admin/products/new
-- Just set the category to "cakes" when creating a new product
