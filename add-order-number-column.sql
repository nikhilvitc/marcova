-- Quick Migration: Add Order Number Column to Existing Orders Table
-- Run this in: Supabase Dashboard > SQL Editor > New Query
-- Only use this if you already have an 'orders' table

-- Add order_number column if it doesn't exist
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_number TEXT UNIQUE;

-- Create index for fast lookups
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);

-- Optional: Update existing orders with retroactive order numbers
-- This generates order numbers for existing orders based on their creation date
-- Format: C (Year) (Month) - (Sequential Number)
DO $$
DECLARE
    r RECORD;
    counter INTEGER;
    year_month TEXT;
    prev_year_month TEXT := '';
BEGIN
    counter := 0;
    
    FOR r IN 
        SELECT id, created_at 
        FROM orders 
        WHERE order_number IS NULL 
        ORDER BY created_at ASC
    LOOP
        year_month := TO_CHAR(r.created_at, 'YYMM');
        
        -- Reset counter for new month
        IF year_month != prev_year_month THEN
            counter := 0;
            prev_year_month := year_month;
        END IF;
        
        counter := counter + 1;
        
        -- Update order with formatted order number
        UPDATE orders 
        SET order_number = 'C' || year_month || '-' || LPAD(counter::TEXT, 2, '0')
        WHERE id = r.id;
    END LOOP;
END $$;

-- Verify the update
SELECT order_number, customer_name, created_at 
FROM orders 
ORDER BY created_at DESC 
LIMIT 10;
