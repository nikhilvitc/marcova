-- Supabase SQL Migration for Markova
-- Run this in: Supabase Dashboard > SQL Editor > New Query

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  stock INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on category for faster queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON products 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read products
CREATE POLICY "Products are viewable by everyone" 
  ON products FOR SELECT 
  USING (true);

-- Policy: Only authenticated users can insert products
CREATE POLICY "Authenticated users can insert products" 
  ON products FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Policy: Only authenticated users can update products
CREATE POLICY "Authenticated users can update products" 
  ON products FOR UPDATE 
  TO authenticated 
  USING (true);

-- Policy: Only authenticated users can delete products
CREATE POLICY "Authenticated users can delete products" 
  ON products FOR DELETE 
  TO authenticated 
  USING (true);

-- Insert sample products
INSERT INTO products (name, description, price, category, image, stock, featured) VALUES
('Dark Chocolate Bar', 'Rich 70% dark chocolate made from premium cocoa beans', 12.99, 'bar-chocolates', '/products/dark-bar.jpg', 50, true),
('Milk Chocolate Bar', 'Smooth and creamy milk chocolate', 10.99, 'bar-chocolates', '/products/milk-bar.jpg', 75, true),
('White Chocolate Bar', 'Luxurious white chocolate with vanilla notes', 11.99, 'bar-chocolates', '/products/white-bar.jpg', 40, false),
('Hazelnut Bonbons', 'Handcrafted bonbons with roasted hazelnut center', 24.99, 'bonbon-chocolates', '/products/hazelnut-bonbon.jpg', 30, true),
('Truffle Collection', 'Assorted chocolate truffles with various fillings', 29.99, 'chocolate-bites', '/products/truffle-box.jpg', 25, true),
('Celebration Box', 'Special occasion chocolate gift box', 49.99, 'celebration-chocolates', '/products/celebration-box.jpg', 20, true);

-- Create admin_users table for custom admin authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Only service role can access admin_users
CREATE POLICY "Service role can manage admin users" 
  ON admin_users 
  USING (auth.role() = 'service_role');

-- Create a sample admin user (password: admin123)
-- Note: In production, hash this password properly on the backend
INSERT INTO admin_users (email, password_hash) VALUES
('admin@markova.com', '$2a$10$rXKZ5qH5qH5qH5qH5qH5qH5qH5qH5qH5qH5qH5qH5qH5qH5qH5');

-- Note: You should replace the password_hash with a properly hashed password
-- The above is a placeholder. Use bcrypt to hash 'admin123' or your chosen password

COMMENT ON TABLE products IS 'Stores all Markova products';
COMMENT ON TABLE admin_users IS 'Stores admin user credentials for backend authentication';
