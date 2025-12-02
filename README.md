# Markova - Premium Chocolate & Cake Brand Website

A full-stack e-commerce website for Markova, featuring premium handcrafted chocolates and celebration cakes.

## 🚀 Features

- **Modern Frontend**: Next.js 14 with React, TailwindCSS, and Framer Motion
- **RESTful Backend**: Express.js with MongoDB and Mongoose
- **Admin Dashboard**: Secure JWT-based authentication with CRUD operations
- **Product Management**: Categories, filtering, and detailed product pages
- **Order Management**: Track orders and customer inquiries
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Premium Styling**: Elegant chocolate-themed color palette with smooth animations

## 📁 Project Structure

```
marcova/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── products/          # Product pages
│   ├── cakes/             # Cakes page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── AdminLayout.tsx
├── backend/               # Express backend
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   └── server.js         # Express server
└── package.json
```

## 🛠️ Setup Instructions

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. Run development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/markova
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

4. Make sure MongoDB is running, then start the server:
```bash
npm run dev
```

The backend API will be available at `http://localhost:5000`

### Initial Admin Setup

To create an admin account, make a POST request to `/api/auth/register`:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@markova.com",
    "password": "your-password"
  }'
```

Then login at `http://localhost:3000/admin/login`

## 🎨 Product Categories

- **Bar Chocolates**: Milk, Dark, White, Fruit & Nut, Tutti Frutti, Rasmalai, Rose, Strawberry, Mango, Pineapple, Pista
- **Chocolate Bites**: Same variants as Bar Chocolates
- **Bonbon Chocolates**: Caramel, Strawberry Blast, Rose Blossom, Strawberry Blossom
- **Celebration Chocolates**: Happy Birthday, Happy Anniversary, Happy Diwali, Merry Christmas, Happy New Year
- **Others**: Gulkand Shot, Peanut Butter Cups
- **Cakes**: Custom and occasion cakes

## 📦 API Endpoints

### Products
- `GET /api/products` - Get all products (with optional query params: category, featured, limit)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders (Admin only)
- `GET /api/orders/:id` - Get single order (Admin only)
- `PUT /api/orders/:id` - Update order status (Admin only)

### Inquiries
- `POST /api/inquiries` - Create inquiry
- `GET /api/inquiries` - Get all inquiries (Admin only)
- `PUT /api/inquiries/:id` - Update inquiry status (Admin only)
- `DELETE /api/inquiries/:id` - Delete inquiry (Admin only)

### Authentication
- `POST /api/auth/register` - Register admin (initial setup)
- `POST /api/auth/login` - Login admin
- `GET /api/auth/verify` - Verify token

### Admin Dashboard
- `GET /api/admin/dashboard` - Get dashboard stats (Admin only)

## 🚢 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL` to your backend URL
4. Deploy

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Add environment variables:
   - `MONGODB_URI` (MongoDB Atlas connection string)
   - `JWT_SECRET`
   - `PORT` (Render will provide this)
6. Deploy

## 🔐 Security Notes

- Change `JWT_SECRET` to a strong random string in production
- Use MongoDB Atlas or secure MongoDB instance for production
- Enable CORS only for your frontend domain in production
- Use environment variables for all sensitive data

## 📝 License

This project is proprietary and confidential.

## 🎯 Future Enhancements

- Shopping cart functionality
- Payment gateway integration
- Email notifications
- Image upload to Cloudinary
- Newsletter subscription
- Product reviews and ratings
- Advanced search and filtering

---

Built with ❤️ for Markova
