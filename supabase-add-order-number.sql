-- Quick Fix: Add order_number column to existing orders table
-- Run this in: Supabase Dashboard > SQL Editor > New Query

-- Add order_number column if it doesn't exist
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS order_number TEXT UNIQUE;

-- Create index on order_number for better performance
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);

-- Update existing orders to have order numbers (if any exist)
-- This generates order numbers for existing orders without one
DO $$
DECLARE
  r RECORD;
  counter INT := 1;
  now_year TEXT := TO_CHAR(NOW(), 'YY');
  now_month TEXT := TO_CHAR(NOW(), 'MM');
BEGIN
  FOR r IN SELECT id FROM orders WHERE order_number IS NULL ORDER BY created_at
  LOOP
    UPDATE orders 
    SET order_number = 'C' || now_year || now_month || '-' || LPAD(counter::TEXT, 2, '0')
    WHERE id = r.id;
    counter := counter + 1;
  END LOOP;
END $$;

-- Verify the column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'orders' AND column_name = 'order_number';
