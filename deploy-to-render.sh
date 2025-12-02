#!/bin/bash

# Marcova Deployment Script for Render
# This script helps you prepare and deploy your app to Render

echo "🚀 Marcova Deployment Helper"
echo "=============================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Git repository not found. Initializing..."
    git init
    git add .
    git commit -m "Initial commit for Render deployment"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository found"
fi

# Check if remote is set
if ! git remote | grep -q origin; then
    echo ""
    echo "⚠️  No git remote found. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/yourusername/marcova.git"
    echo ""
else
    echo "✅ Git remote configured"
fi

# Check environment variables
echo ""
echo "📋 Environment Variables Needed for Render:"
echo "--------------------------------------------"
echo "NEXT_PUBLIC_SUPABASE_URL=your-supabase-url"
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key"
echo ""

# Check if .env.local exists
if [ -f .env.local ]; then
    echo "✅ Found .env.local file"
    echo "⚠️  Remember: Copy these values to Render dashboard"
else
    echo "⚠️  No .env.local file found"
    echo "   Create one with your Supabase credentials"
fi

echo ""
echo "📦 Next Steps:"
echo "-------------"
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Ready for deployment'"
echo "   git push origin main"
echo ""
echo "2. Go to Render Dashboard: https://dashboard.render.com"
echo ""
echo "3. Click 'New +' → 'Web Service'"
echo ""
echo "4. Connect your GitHub repository"
echo ""
echo "5. Configure with these settings:"
echo "   - Build Command: npm install && npm run build"
echo "   - Start Command: npm start"
echo "   - Add environment variables from .env.local"
echo ""
echo "6. Click 'Create Web Service'"
echo ""
echo "✨ Your site will be live in 5-10 minutes!"
echo ""
echo "📖 Full guide: See RENDER_DEPLOYMENT.md"
echo ""
