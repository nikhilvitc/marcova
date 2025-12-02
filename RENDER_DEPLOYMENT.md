# Deploy Marcova to Render

This guide will help you deploy the complete Marcova website (frontend + backend) to Render.

## Prerequisites

- GitHub account with your Marcova repository
- Supabase account (for database) - https://supabase.com
- Render account - https://render.com

## Step 1: Supabase Setup

Your database is already configured in Supabase. Make sure you have:

1. **Supabase Project URL** - Found in Project Settings → API
2. **Supabase Anon Key** - Found in Project Settings → API

These will be needed for environment variables.

## Step 2: Deploy Frontend to Render

### Option A: Using Render Dashboard (Recommended)

1. **Create New Web Service:**
   - Go to https://dashboard.render.com
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository

2. **Configure Service:**
   - **Name:** `marcova-frontend` (or your preferred name)
   - **Environment:** `Node`
   - **Region:** Choose closest to your users
   - **Branch:** `main` (or your default branch)
   - **Root Directory:** Leave empty
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

3. **Set Environment Variables:**
   Click "Advanced" and add these environment variables:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Deploy:**
   - Click **"Create Web Service"**
   - Wait 5-10 minutes for deployment
   - Your site will be live at `https://marcova-frontend.onrender.com`

### Option B: Using render.yaml (Automatic)

1. The `render.yaml` file is already in your repository
2. Go to Render Dashboard → **"New +"** → **"Blueprint"**
3. Connect your repository
4. Render will detect `render.yaml` and configure automatically
5. Add your environment variables when prompted

## Step 3: Deploy Backend to Render (Optional)

If you want to use the Node.js backend:

1. **Create New Web Service:**
   - Click **"New +"** → **"Web Service"**
   - Connect same repository

2. **Configure Service:**
   - **Name:** `marcova-backend`
   - **Environment:** `Node`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

3. **Set Environment Variables:**
   ```
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=your-super-secret-random-string-change-this
   MONGODB_URI=your-mongodb-connection-string
   ```

4. **Deploy:**
   - Click **"Create Web Service"**
   - Note the backend URL: `https://marcova-backend.onrender.com`

## Step 4: Configure Admin Access

1. **Access Admin Login:**
   - Go to `https://your-app.onrender.com/admin/login`

2. **Login with Supabase Credentials:**
   - Use the admin credentials you created in Supabase

## Step 5: Custom Domain (Optional)

1. In Render Dashboard, go to your service
2. Click **"Settings"** → **"Custom Domains"**
3. Click **"Add Custom Domain"**
4. Enter your domain (e.g., `www.marcova.com`)
5. Update DNS records as instructed:
   - Add CNAME record pointing to your Render URL
   - Or add A record if using root domain

## Step 6: Environment Variables Reference

### Required for Frontend:
```
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Optional for Backend:
```
NODE_ENV=production
PORT=10000
JWT_SECRET=random-secret-string-min-32-chars
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/marcova
```

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Verify all dependencies are in `package.json`
- Ensure Node version compatibility (uses Node 18 by default)

### Site Loads but Shows Errors
- Check environment variables are set correctly
- Verify Supabase URL and keys
- Check browser console for errors

### Images Not Loading
- Ensure images are in `public/assets/images/` folder
- Check Next.js image configuration in `next.config.js`
- Verify image paths start with `/assets/`

### Admin Login Not Working
- Check Supabase authentication is configured
- Verify admin user exists in Supabase auth table
- Check browser console for API errors

## Post-Deployment Checklist

- [ ] Site loads correctly at Render URL
- [ ] All pages are accessible (Home, Products, Cakes, About, Contact)
- [ ] Product images display properly
- [ ] Admin login works
- [ ] Admin can view/create/edit/delete products
- [ ] Contact form submits successfully
- [ ] Mobile responsive design works

## Render Free Tier Limitations

- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free (enough for one service)
- Consider upgrading for production use

## Updating Your Site

1. Push changes to GitHub
2. Render automatically detects changes
3. New build starts automatically
4. Site updates in 5-10 minutes

Or manually:
1. Go to Render Dashboard
2. Click on your service
3. Click **"Manual Deploy"** → **"Deploy latest commit"**

## Support & Resources

- **Render Docs:** https://render.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs

## Cost Estimation

**Free Tier:**
- Frontend: Free (with limitations)
- Backend: Free (if needed)
- Supabase: Free tier (500MB database)
- **Total: $0/month**

**Paid Tier (Recommended for Production):**
- Frontend: $7/month (Starter)
- Backend: $7/month (if needed)
- Supabase: $25/month (Pro)
- Custom Domain: Free
- **Total: ~$14-39/month**

---

**Ready to Deploy?** Follow Step 1 above and your site will be live in minutes! 🚀
