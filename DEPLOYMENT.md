# Deployment Guide for Markova

This guide will help you deploy the Markova website to production.

## Prerequisites

- GitHub account
- MongoDB Atlas account (or MongoDB instance)
- Vercel account (for frontend)
- Render account (for backend)

## Step 1: MongoDB Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier is fine)
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for Render)
5. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (replace `<password>` with your password)

Example: `mongodb+srv://username:password@cluster.mongodb.net/markova?retryWrites=true&w=majority`

## Step 2: Backend Deployment (Render)

1. **Create a New Web Service on Render:**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure the Service:**
   - **Name:** `markova-backend`
   - **Environment:** `Node`
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Root Directory:** (leave empty or set to `/backend`)

3. **Set Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/markova?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-to-random-string
   NODE_ENV=production
   PORT=10000
   ```
   (Note: Render will automatically set PORT, but you can include it)

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL (e.g., `https://markova-backend.onrender.com`)

## Step 3: Frontend Deployment (Vercel)

1. **Import Project to Vercel:**
   - Go to https://vercel.com
   - Click "Add New..." → "Project"
   - Import your GitHub repository

2. **Configure Project:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (or leave default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)

3. **Set Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
   ```
   Replace `your-backend-url` with your actual Render backend URL

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be live at `https://your-project.vercel.app`

## Step 4: Initial Admin Setup

1. **Register Admin Account:**
   - Use the backend API to create an admin account:
   
   ```bash
   curl -X POST https://your-backend-url.onrender.com/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "username": "admin",
       "email": "admin@markova.com",
       "password": "your-secure-password"
     }'
   ```

2. **Access Admin Dashboard:**
   - Go to `https://your-frontend-url.vercel.app/admin/login`
   - Login with your credentials

## Step 5: Domain Configuration (Optional)

### Vercel Custom Domain:
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Render Custom Domain:
1. Go to your service settings in Render
2. Navigate to "Custom Domains"
3. Add your custom domain
4. Configure DNS records as instructed

## Step 6: Security Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Use MongoDB Atlas with proper authentication
- [ ] Update CORS settings if needed (currently allows all origins)
- [ ] Set up environment variables securely
- [ ] Use HTTPS (Vercel and Render provide this by default)
- [ ] Regularly update dependencies
- [ ] Monitor logs for errors

## Troubleshooting

### Backend Issues:
- **Connection refused:** Check MONGODB_URI and network access
- **Port issues:** Render sets PORT automatically, don't hardcode it
- **Build fails:** Check Node.js version in package.json

### Frontend Issues:
- **API calls failing:** Verify NEXT_PUBLIC_API_URL is correct
- **Build errors:** Check for TypeScript/ESLint errors
- **404 on routes:** Ensure Next.js app router is configured correctly

### MongoDB Issues:
- **Connection timeout:** Check IP whitelist in MongoDB Atlas
- **Authentication failed:** Verify username/password in connection string
- **Database not found:** MongoDB will create it automatically on first connection

## Post-Deployment

1. **Add Sample Products:**
   - Login to admin dashboard
   - Add products through the admin interface

2. **Test All Features:**
   - Browse products
   - Submit contact form
   - Test admin login
   - Create/edit/delete products

3. **Set Up Monitoring:**
   - Enable error tracking (Sentry, LogRocket, etc.)
   - Set up uptime monitoring
   - Configure backup for MongoDB

## Support

For issues or questions, refer to:
- Next.js Documentation: https://nextjs.org/docs
- Render Documentation: https://render.com/docs
- Vercel Documentation: https://vercel.com/docs
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com

---

**Note:** Remember to keep your `.env` files secure and never commit them to Git!
