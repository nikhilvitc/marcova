# Orders Table Setup Instructions

If you're seeing "Failed to fetch orders" error, it means the orders table hasn't been created yet in your Supabase database.

## Quick Setup Steps:

### Step 1: Go to Supabase Dashboard
1. Visit: https://app.supabase.com
2. Select your `marcova` project
3. Click on **SQL Editor** in the left sidebar

### Step 2: Run the Migration
1. Click **New query**
2. Copy the entire contents of `supabase-orders-inquiries-migration.sql` file
3. Paste it into the SQL editor
4. Click **Run** (or press Cmd/Ctrl + Enter)

### Step 3: Verify Tables Created
1. Go to **Table Editor** in the left sidebar
2. You should see:
   - `orders` table
   - `inquiries` table
   - `admin_users` table (if not already exists)

### Step 4: Check Row Level Security (RLS)
The migration automatically sets up RLS policies to allow:
- Anyone can create orders (for checkout)
- Anyone can view orders (for admin)
- Authenticated users can update orders

### Step 5: Refresh Your Application
1. Go back to your application at `http://localhost:3000/admin/orders`
2. Refresh the page
3. Orders table should now be empty but functional

## Testing the Orders System

1. Go to `http://localhost:3000/products`
2. Add a product to cart
3. Go to checkout
4. Fill in customer details
5. Submit order
6. Check admin orders page - your order should appear!

## Common Issues

### Error: "relation 'orders' does not exist"
**Solution**: Run the SQL migration file in Supabase dashboard

### Error: "new row violates row-level security policy"
**Solution**: Check that RLS policies are created correctly. Run the migration again.

### Error: "permission denied for table orders"
**Solution**: Make sure the RLS policies in the migration file are applied correctly.

## Environment Variables Check

Make sure your `.env.local` has:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Need Help?

If you're still having issues:
1. Check the browser console for detailed error messages
2. Check Supabase logs in the dashboard
3. Verify your Supabase project is active and not paused
