# 🚨 QUICK FIX: Order Number Column Missing

## Error You're Seeing:
```
Error: Failed to run sql query: ERROR: 42703: column "order_number" does not exist
```

## What This Means:
The orders table exists but doesn't have the `order_number` column. This happens if the table was created before we added the order number feature.

---

## ✅ SOLUTION (Choose One):

### Option 1: Add Just the Missing Column (Fastest)
**If your orders table already exists:**

1. Go to: https://app.supabase.com
2. Select your `marcova` project
3. Click **SQL Editor** → **New Query**
4. Copy and paste this SQL:

```sql
-- Add order_number column
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS order_number TEXT UNIQUE;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);

-- Update existing orders with order numbers
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
```

5. Click **Run** (or press Cmd/Ctrl + Enter)
6. You should see: "Success. No rows returned"

### Option 2: Drop and Recreate (If You Don't Have Important Data)
**If your orders table is empty or you want to start fresh:**

1. Go to: https://app.supabase.com → SQL Editor
2. Copy and paste this:

```sql
-- Drop existing table
DROP TABLE IF EXISTS orders CASCADE;

-- Create table with all columns
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE,
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

-- Create indexes
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create orders (for checkout)
CREATE POLICY "Anyone can create orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Allow anyone to view orders (for admin - add auth later)
CREATE POLICY "Anyone can view orders" ON orders
  FOR SELECT USING (true);

-- Allow anyone to update orders (for admin - add auth later)
CREATE POLICY "Anyone can update orders" ON orders
  FOR UPDATE USING (true);
```

3. Click **Run**

---

## 🔍 Verify It Worked:

1. Go to **Table Editor** in Supabase
2. Click on **orders** table
3. You should see the `order_number` column in the list

OR run this SQL to check:
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'orders' 
ORDER BY ordinal_position;
```

---

## 🧪 Test Your Orders System:

1. Go to http://localhost:3000/products
2. Add a product to cart
3. Go to checkout
4. Fill in details and submit
5. Go to http://localhost:3000/admin/orders
6. Your order should appear with format: **C2512-01**

---

## 📝 Files Reference:

- Quick fix SQL: `supabase-add-order-number.sql`
- Full migration: `supabase-orders-inquiries-migration.sql`

---

## Still Having Issues?

Check the browser console (F12) for detailed error messages and let me know what you see!
