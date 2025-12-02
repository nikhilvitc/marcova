# Render Deployment Checklist

## Pre-Deployment ✅

### 1. Code Ready
- [ ] All features working locally
- [ ] No console errors
- [ ] Images loading correctly
- [ ] Admin panel functional
- [ ] Contact form working

### 2. Supabase Setup
- [ ] Supabase project created
- [ ] Products table created and populated
- [ ] Admin user created
- [ ] Authentication configured
- [ ] Note down:
  - [ ] Supabase URL: `https://xxxxx.supabase.co`
  - [ ] Supabase Anon Key: `eyJxxx...`

### 3. Git Repository
- [ ] Code committed to Git
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
  ```bash
  git add .
  git commit -m "Ready for Render deployment"
  git push origin main
  ```

## Deployment Steps 🚀

### Step 1: Create Render Account
- [ ] Go to https://render.com
- [ ] Sign up with GitHub account
- [ ] Verify email

### Step 2: Deploy Frontend
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository
- [ ] Configure service:
  ```
  Name: marcova
  Environment: Node
  Build Command: npm install && npm run build
  Start Command: npm start
  ```
- [ ] Add environment variables:
  ```
  NODE_ENV=production
  NEXT_PUBLIC_SUPABASE_URL=<your-url>
  NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-key>
  ```
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (5-10 minutes)

### Step 3: Verify Deployment
- [ ] Site loads at Render URL
- [ ] Home page displays correctly
- [ ] Product images show up
- [ ] Navigation works
- [ ] Admin login accessible at `/admin/login`
- [ ] Can login to admin panel
- [ ] Can view/edit products in admin

## Post-Deployment 🎉

### Test Everything
- [ ] Browse all pages (Home, Products, Cakes, About, Contact)
- [ ] Test on mobile device
- [ ] Submit contact form
- [ ] Admin login works
- [ ] Admin can CRUD products

### Configure Custom Domain (Optional)
- [ ] In Render: Settings → Custom Domains
- [ ] Add your domain
- [ ] Update DNS records:
  ```
  Type: CNAME
  Name: www
  Value: your-app.onrender.com
  ```
- [ ] Wait for DNS propagation (up to 24 hours)

### Security
- [ ] Change default admin password
- [ ] Review Supabase RLS policies
- [ ] Enable 2FA on Render account
- [ ] Monitor error logs

## Troubleshooting 🔧

### Build Fails
```bash
# Check Node version locally
node --version

# Should be v18 or higher
```

### Environment Variables Missing
- Double-check in Render Dashboard → Environment
- No quotes needed around values
- Must start with `NEXT_PUBLIC_` for client-side

### Images Not Loading
- Check `public/assets/images/` folder exists
- Verify image paths in code
- Check browser console for 404 errors

### Admin Login Issues
- Verify Supabase credentials
- Check browser console for errors
- Test Supabase connection from Render logs

## Quick Commands

### View Logs
```bash
# In Render Dashboard
Services → Your Service → Logs
```

### Redeploy
```bash
# Push to GitHub
git add .
git commit -m "Update"
git push

# Or in Render Dashboard
Manual Deploy → Deploy Latest Commit
```

### Rollback
```bash
# In Render Dashboard
Deploys → Previous Deploy → Rollback
```

## Environment Variables Reference

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional
NODE_ENV=production
```

## Support

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs

---

**Status:** 
- [ ] Not Started
- [ ] In Progress
- [ ] Deployed
- [ ] Live & Tested

**Live URL:** _________________

**Admin URL:** ________________/admin/login

**Deployment Date:** __________
