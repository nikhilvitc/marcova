# 🚀 Deploying Marcova to Vercel

This guide will help you deploy your Marcova chocolate e-commerce website to Vercel.

## Prerequisites

- GitHub account with the marcova repository
- Supabase account with your database set up
- Vercel account (free tier works great!)

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your repositories

### Step 2: Import Your Project

1. Click "Add New Project" or "Import Project"
2. Find and select your `marcova` repository
3. Click "Import"

### Step 3: Configure Your Project

Vercel will auto-detect Next.js settings:

- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Step 4: Add Environment Variables

Click on "Environment Variables" and add these:

```
NEXT_PUBLIC_SUPABASE_URL=https://fkyhiwukdsczhlbprcwd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

**To find your Supabase Anon Key:**
1. Go to your Supabase project dashboard
2. Click "Settings" → "API"
3. Copy the `anon` `public` key

### Step 5: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for the build to complete
3. Your site will be live at `https://marcova-xyz.vercel.app`

### Step 6: Custom Domain (Optional)

1. Go to your project settings on Vercel
2. Click "Domains"
3. Add your custom domain (e.g., `marcova.com`)
4. Follow the DNS configuration instructions

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

From your project directory:

```bash
cd /Users/nikhilkumar/Downloads/marcova
vercel
```

Follow the prompts:
- **Set up and deploy**: Yes
- **Which scope**: Choose your account
- **Link to existing project**: No
- **Project name**: marcova
- **Directory**: `./`
- **Override settings**: No

### Step 4: Add Environment Variables

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Enter the values when prompted.

### Step 5: Deploy to Production

```bash
vercel --prod
```

## Automatic Deployments

Once connected to GitHub, Vercel will automatically:
- Deploy every push to `main` branch to production
- Create preview deployments for pull requests
- Run builds and show deployment status

## Post-Deployment Checklist

- [ ] Test all pages (home, products, cakes, about, contact)
- [ ] Verify Supabase connection (contact form, admin panel)
- [ ] Check mobile responsiveness
- [ ] Test cart functionality
- [ ] Verify images are loading correctly
- [ ] Check admin login at `/admin/login`

## Troubleshooting

### Build Fails

**Issue**: Build command fails
**Solution**: Check your `package.json` scripts and ensure all dependencies are installed

### Environment Variables Not Working

**Issue**: Supabase connection fails
**Solution**: 
1. Verify environment variables are set correctly in Vercel dashboard
2. Check that variables start with `NEXT_PUBLIC_`
3. Redeploy after adding variables

### Images Not Loading

**Issue**: Product images don't show
**Solution**: 
1. Check Supabase storage configuration
2. Verify CORS settings in Supabase
3. Ensure image URLs are accessible publicly

### Admin Panel Not Working

**Issue**: Can't access admin features
**Solution**:
1. Make sure you've run the Supabase migrations
2. Check RLS policies are set up correctly
3. Verify admin credentials

## Performance Tips

1. **Image Optimization**: Next.js automatically optimizes images
2. **Caching**: Vercel provides automatic caching
3. **CDN**: Your site is served from Vercel's global CDN
4. **Analytics**: Enable Vercel Analytics in project settings

## Custom Domain Setup

### Add Domain in Vercel

1. Go to Project Settings → Domains
2. Add your domain (e.g., `marcova.com` and `www.marcova.com`)

### Configure DNS

Add these records to your domain provider:

**For root domain (marcova.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### SSL Certificate

Vercel automatically provisions SSL certificates for your domain. This usually takes 1-2 minutes.

## Monitoring Your Deployment

### View Deployment Logs
1. Go to your project on Vercel
2. Click "Deployments"
3. Click on any deployment to see logs

### Analytics
Enable Vercel Analytics to track:
- Page views
- Performance metrics
- User behavior

### Speed Insights
Enable Speed Insights to monitor:
- Core Web Vitals
- Performance scores
- Real user data

## Updating Your Site

After making changes locally:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will automatically detect the push and redeploy your site!

## Cost

- **Free Tier**: Perfect for this project
  - Unlimited personal projects
  - 100GB bandwidth per month
  - Automatic HTTPS
  - Continuous deployment

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Support](https://vercel.com/support)

## Your Deployment URLs

After deployment, you'll get:
- **Production**: `https://marcova.vercel.app` (or your custom domain)
- **Preview**: Unique URL for each git branch/PR
- **Development**: Your local `http://localhost:3000`

---

🎉 **Congratulations!** Your Marcova chocolate e-commerce website is now live on Vercel!
