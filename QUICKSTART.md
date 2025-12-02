# Quick Start Guide - Markova Website

## 🚀 Getting Started (5 Minutes)

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Using Homebrew (macOS)
brew services start mongodb-community

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

### 3. Configure Environment Variables

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Backend (.env):**
```env
MONGODB_URI=mongodb://localhost:27017/markova
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 5. Create Admin Account

Open a new terminal and run:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@markova.com",
    "password": "admin123"
  }'
```

### 6. Access the Website

- **Frontend:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3000/admin/login
  - Email: `admin@markova.com`
  - Password: `admin123`

## 📝 Next Steps

1. **Login to Admin Dashboard** and add your products
2. **Customize** the contact information in `components/Footer.tsx`
3. **Update** the Google Maps embed in `app/contact/page.tsx` with your shop location
4. **Add product images** (use Cloudinary URLs or Firebase Storage)
5. **Test** all features before deploying

## 🎨 Customization

### Update Brand Colors
Edit `tailwind.config.js` to modify the color palette:
- `chocolate-*` - Main brand colors
- `cream-*` - Accent colors
- `gold-*` - Highlight colors

### Add Product Categories
Edit `app/products/page.tsx` and `backend/models/Product.js` to add/remove categories.

### Modify Content
- Home page: `app/page.tsx`
- About page: `app/about/page.tsx`
- Footer: `components/Footer.tsx`

## 🔧 Troubleshooting

**MongoDB Connection Error:**
- Make sure MongoDB is running
- Check `MONGODB_URI` in `.env`

**Port Already in Use:**
- Change `PORT` in backend `.env`
- Update `NEXT_PUBLIC_API_URL` in frontend `.env.local`

**CORS Errors:**
- Check backend CORS settings in `backend/server.js`
- Verify API URL in frontend environment variables

## 📚 Additional Resources

- See `README.md` for detailed documentation
- See `DEPLOYMENT.md` for production deployment guide

---

Happy coding! 🍫✨
