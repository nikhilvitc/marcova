# 🚀 Quick Start: Deploy Marcova to Render

## ⚡ Fast Track (5 Minutes)

### 1. Prepare Your Code
```bash
# Fix any errors and commit
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### 2. Deploy on Render
1. Go to: **https://dashboard.render.com**
2. Click: **"New +" → "Web Service"**
3. Connect your GitHub repo
4. Use these settings:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

### 3. Add Environment Variables
In Render dashboard, add:
```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-key>
```

### 4. Deploy!
Click "Create Web Service" and wait 5-10 minutes.

---

## 📚 Full Documentation

- **Complete Guide:** See `RENDER_DEPLOYMENT.md`
- **Checklist:** See `DEPLOYMENT_CHECKLIST.md`
- **Helper Script:** Run `./deploy-to-render.sh`

---

## 🆘 Need Help?

### Common Issues:

**Build fails?**
- Check Node version is 18+
- Verify all packages in package.json

**Environment variables?**
- Get from Supabase dashboard → Settings → API
- Must include `NEXT_PUBLIC_` prefix

**Images not loading?**
- Images should be in `public/assets/images/`
- Use `/assets/images/filename.png` in code

---

## ✅ After Deployment

Test these URLs:
- `/` - Home page
- `/products` - Products page
- `/cakes` - Cakes page
- `/about` - About page
- `/contact` - Contact page
- `/admin/login` - Admin login

---

**Your site will be live at:** `https://your-app-name.onrender.com`

**Deployment time:** ~5-10 minutes

**Cost:** FREE (with Render free tier)

---

Good luck! 🎉
