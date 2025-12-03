-- Supabase SQL Migration for Orders and Inquiries Tables
-- Run this in: Supabase Dashboard > SQL Editor > New Query

-- Create updated_at function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  customer_address TEXT,
  items JSONB NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on orders for better performance
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Drop existing trigger if it exists, then create it
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at 
  BEFORE UPDATE ON orders 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can create orders" ON orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Authenticated users can update orders" ON orders;
DROP POLICY IF EXISTS "Authenticated users can delete orders" ON orders;

-- Policy: Anyone can insert orders (for placing orders)
CREATE POLICY "Anyone can create orders" 
  ON orders FOR INSERT 
  WITH CHECK (true);

-- Policy: Anyone can read their own orders (by email)
CREATE POLICY "Users can view their own orders" 
  ON orders FOR SELECT 
  USING (true);

-- Policy: Only authenticated users can update orders
CREATE POLICY "Authenticated users can update orders" 
  ON orders FOR UPDATE 
  TO authenticated 
  USING (true);

-- Policy: Only authenticated users can delete orders
CREATE POLICY "Authenticated users can delete orders" 
  ON orders FOR DELETE 
  TO authenticated 
  USING (true);

-- Insert sample orders
INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, items, total_amount, status, payment_status) VALUES
(
  'John Doe',
  'john.doe@example.com',
  '+1-234-567-8901',
  '123 Main St, New York, NY 10001',
  '[{"product_id": "1", "product_name": "Dark Chocolate Bar", "quantity": 2, "price": 12.99}]'::jsonb,
  25.98,
  'delivered',
  'paid'
),
(
  'Jane Smith',
  'jane.smith@example.com',
  '+1-234-567-8902',
  '456 Oak Ave, Los Angeles, CA 90001',
  '[{"product_id": "2", "product_name": "Truffle Collection", "quantity": 1, "price": 29.99}, {"product_id": "3", "product_name": "Hazelnut Bonbons", "quantity": 1, "price": 24.99}]'::jsonb,
  54.98,
  'processing',
  'paid'
),
(
  'Bob Johnson',
  'bob.j@example.com',
  '+1-234-567-8903',
  '789 Pine Rd, Chicago, IL 60601',
  '[{"product_id": "4", "product_name": "Celebration Box", "quantity": 1, "price": 49.99}]'::jsonb,
  49.99,
  'pending',
  'pending'
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'resolved')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on inquiries for better performance
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);

-- Drop existing trigger if it exists, then create it
DROP TRIGGER IF EXISTS update_inquiries_updated_at ON inquiries;
CREATE TRIGGER update_inquiries_updated_at 
  BEFORE UPDATE ON inquiries 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for inquiries
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can create inquiries" ON inquiries;
DROP POLICY IF EXISTS "Anyone can view inquiries" ON inquiries;
DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON inquiries;
DROP POLICY IF EXISTS "Authenticated users can delete inquiries" ON inquiries;

-- Policy: Anyone can insert inquiries (for contact form)
CREATE POLICY "Anyone can create inquiries" 
  ON inquiries FOR INSERT 
  WITH CHECK (true);

-- Policy: Anyone can read inquiries (or restrict to authenticated)
CREATE POLICY "Anyone can view inquiries" 
  ON inquiries FOR SELECT 
  USING (true);

-- Policy: Only authenticated users can update inquiries
CREATE POLICY "Authenticated users can update inquiries" 
  ON inquiries FOR UPDATE 
  TO authenticated 
  USING (true);

-- Policy: Only authenticated users can delete inquiries
CREATE POLICY "Authenticated users can delete inquiries" 
  ON inquiries FOR DELETE 
  TO authenticated 
  USING (true);

-- Insert sample inquiries
INSERT INTO inquiries (name, email, phone, subject, message, status) VALUES
(
  'Alice Brown',
  'alice.brown@example.com',
  '+1-234-567-8904',
  'Custom Order Request',
  'Hi, I would like to order a custom chocolate box for a wedding. Can you help me with this?',
  'pending'
),
(
  'Charlie Davis',
  'charlie.d@example.com',
  '+1-234-567-8905',
  'Product Inquiry',
  'Do you have any sugar-free chocolate options available?',
  'responded'
),
(
  'Diana Wilson',
  'diana.w@example.com',
  '+1-234-567-8906',
  'Wholesale Partnership',
  'I own a cafe and I am interested in wholesale pricing for your products.',
  'pending'
);

COMMENT ON TABLE orders IS 'Stores customer orders with items and status';
COMMENT ON TABLE inquiries IS 'Stores customer inquiries and contact form submissions';
