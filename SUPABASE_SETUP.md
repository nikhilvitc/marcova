# Supabase Setup Guide for Markova

## Prerequisites
- Supabase account (free tier works)
- Your Supabase project created

## Step 1: Get Your Supabase Project URL

1. Go to your Supabase dashboard: https://app.supabase.com
2. Click on your project (`marcova`)
3. Go to **Project Settings** > **API**
4. Copy your **Project URL** (looks like: `https://xxxxx.supabase.co`)

## Step 2: Update Environment Variables

Open `.env.local` and replace the placeholder URL:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
```

Your API keys are already configured:
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Publishable key (safe for browser)
- `SUPABASE_SERVICE_ROLE_KEY` - Secret key (server-side only)

## Step 3: Run Database Migration

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New query**
4. Copy the entire content from `supabase-migration.sql`
5. Paste it into the SQL editor
6. Click **Run** to execute the migration

This will create:
- `products` table with sample data
- `admin_users` table for authentication
- Row Level Security (RLS) policies
- Indexes for better performance

## Step 4: Set Up Admin Authentication

### Option A: Use Supabase Auth (Recommended)

1. Go to **Authentication** > **Users** in Supabase dashboard
2. Click **Add user** > **Create new user**
3. Enter:
   - Email: `admin@markova.com`
   - Password: Choose a strong password
   - Check "Auto Confirm User"
4. Click **Create user**

### Option B: Use Custom Admin Table

The migration already created an `admin_users` table. To add an admin:

1. Go to **Table Editor** > `admin_users`
2. Click **Insert** > **Insert row**
3. Enter:
   - email: `admin@markova.com`
   - password_hash: (hash your password with bcrypt)

For testing, you can use this SQL to create an admin with password `admin123`:

```sql
-- Generate bcrypt hash for 'admin123' (you should change this!)
-- In production, use a proper password hashing library
INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  role
) VALUES (
  'admin@markova.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  'authenticated'
);
```

## Step 5: Configure Row Level Security (Optional but Recommended)

The migration already set up basic RLS policies:
- ✅ Anyone can read products (public access)
- ✅ Only authenticated users can modify products
- ✅ Admin users table is service-role only

To verify RLS is enabled:
1. Go to **Authentication** > **Policies**
2. Select `products` table
3. You should see policies listed

## Step 6: Test the Integration

1. **Restart your Next.js dev server:**
   ```bash
   # Kill the current process (use the PID from earlier)
   kill 30505
   
   # Start again
   cd /Users/nikhilkumar/Downloads/marcova
   nohup env PORT=3000 npm run dev < /dev/null > /tmp/next-dev.log 2>&1 & echo $!
   ```

2. **Test product pages:**
   - Visit http://localhost:3000/products
   - Products should load from Supabase
   - Check browser console for any errors

3. **Test admin login:**
   - Visit http://localhost:3000/admin/login
   - Enter the admin credentials you created
   - Should redirect to `/admin/dashboard`

4. **Verify authentication:**
   - Try accessing http://localhost:3000/admin/dashboard without logging in
   - Should redirect to login page

## Troubleshooting

### Products not loading?
- Check browser console for errors
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct in `.env.local`
- Ensure SQL migration ran successfully
- Check Supabase dashboard > Table Editor > products has data

### Admin login fails?
- Make sure you created an admin user in Supabase Auth
- Check the email and password are correct
- Look at browser console for specific error messages
- Verify Supabase Auth is enabled (Authentication > Settings)

### "Invalid API key" error?
- Double-check your API keys in `.env.local`
- Ensure you copied the full key without extra spaces
- The publishable key should start with `sb_publishable_`
- The secret key should start with `sb_secret_`

### CORS errors?
- Supabase should handle CORS automatically
- If issues persist, check Project Settings > API > CORS settings
- Add `http://localhost:3000` to allowed origins if needed

## Next Steps

1. **Customize the schema:** Add more fields to products table as needed
2. **Add more products:** Use Supabase Table Editor or create an admin interface
3. **Set up Storage:** For product images, use Supabase Storage
4. **Add more admin features:** Create forms to manage products via admin panel
5. **Deploy:** When ready, update environment variables in your hosting platform

## Security Best Practices

1. ✅ Never commit `.env.local` to git (already in `.gitignore`)
2. ✅ Use RLS policies to protect sensitive data
3. ✅ Keep `SUPABASE_SERVICE_ROLE_KEY` secret (server-side only)
4. ✅ Use strong passwords for admin accounts
5. ⚠️ Change the default admin password immediately
6. ⚠️ Consider adding rate limiting for login attempts

## Support

For more information:
- Supabase Docs: https://supabase.com/docs
- Supabase Auth: https://supabase.com/docs/guides/auth
- RLS Policies: https://supabase.com/docs/guides/auth/row-level-security
