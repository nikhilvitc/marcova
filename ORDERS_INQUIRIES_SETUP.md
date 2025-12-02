# Orders and Inquiries Tables Setup

This guide will help you create the Orders and Inquiries tables in your Supabase database.

## 📋 Prerequisites

- Your Supabase project is set up
- You've already created the `products` table using `supabase-migration.sql`
- You're logged into your Supabase dashboard

## 🚀 Quick Setup

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project (`marcova`)
3. Click **SQL Editor** in the left sidebar
4. Click **New query** button

### Step 2: Run the Migration

1. Open the file: `supabase-orders-inquiries-migration.sql`
2. Copy the entire SQL script
3. Paste it into the SQL Editor
4. Click **Run** (or press Cmd/Ctrl + Enter)

### Step 3: Verify Tables Created

After running the SQL, verify the tables were created:

1. Go to **Table Editor** in the left sidebar
2. You should see three tables:
   - ✅ `products` (already exists)
   - ✅ `orders` (newly created)
   - ✅ `inquiries` (newly created)

## 📊 What Gets Created

### Orders Table

**Stores customer orders with the following fields:**

- `id` - Unique order ID (UUID)
- `customer_name` - Customer's full name
- `customer_email` - Customer's email address
- `customer_phone` - Customer's phone number
- `customer_address` - Delivery address
- `items` - Order items (JSONB array)
- `total_amount` - Total order amount
- `status` - Order status (pending, processing, shipped, delivered, cancelled)
- `payment_status` - Payment status (pending, paid, failed, refunded)
- `payment_method` - Payment method used
- `notes` - Additional order notes
- `created_at` - Order creation timestamp
- `updated_at` - Last update timestamp

**Sample Data:** 3 sample orders will be inserted

### Inquiries Table

**Stores customer contact form submissions:**

- `id` - Unique inquiry ID (UUID)
- `name` - Customer's name
- `email` - Customer's email
- `phone` - Customer's phone number
- `subject` - Inquiry subject
- `message` - Inquiry message
- `status` - Inquiry status (pending, responded, resolved)
- `admin_notes` - Internal admin notes
- `created_at` - Inquiry creation timestamp
- `updated_at` - Last update timestamp

**Sample Data:** 3 sample inquiries will be inserted

## 🔒 Security (Row Level Security)

Both tables have RLS enabled with the following policies:

### Orders Policies:
- ✅ Anyone can create orders (for checkout)
- ✅ Anyone can view orders
- ✅ Only authenticated admins can update orders
- ✅ Only authenticated admins can delete orders

### Inquiries Policies:
- ✅ Anyone can create inquiries (for contact form)
- ✅ Anyone can view inquiries
- ✅ Only authenticated admins can update inquiries
- ✅ Only authenticated admins can delete inquiries

## ✨ Testing Your Admin Panel

After running the migration:

1. **Refresh your admin panel**: http://localhost:3000/admin/dashboard
2. **Check Orders**: Navigate to `/admin/orders`
   - You should see 3 sample orders
   - Try clicking on different orders
3. **Check Inquiries**: Navigate to `/admin/inquiries`
   - You should see 3 sample inquiries
   - Try updating status or deleting inquiries

## 📝 Next Steps

### Update Order Status

You can update order status from the admin panel or via SQL:

```sql
UPDATE orders 
SET status = 'shipped', updated_at = NOW() 
WHERE id = 'your-order-id';
```

### Respond to Inquiries

Update inquiry status when you respond:

```sql
UPDATE inquiries 
SET status = 'responded', 
    admin_notes = 'Sent pricing information via email',
    updated_at = NOW() 
WHERE id = 'your-inquiry-id';
```

## 🛠️ Troubleshooting

### If tables already exist:

If you see an error like "relation already exists", you can either:

1. **Drop and recreate** (WARNING: This deletes all data):
```sql
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS inquiries CASCADE;
-- Then run the migration again
```

2. **Or just add sample data**:
```sql
-- Copy just the INSERT statements from the migration file
```

### If RLS policies conflict:

If you see policy errors, drop existing policies first:

```sql
DROP POLICY IF EXISTS "Anyone can create orders" ON orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
-- etc...
-- Then run the migration again
```

## 📞 Need Help?

- Check the Supabase docs: https://supabase.com/docs
- View your database logs: Supabase Dashboard > Database > Logs
- Check the admin panel console for errors: Browser DevTools > Console

## 🎉 Success!

Once the migration is complete, your Marcova admin panel will have full orders and inquiries management functionality!
