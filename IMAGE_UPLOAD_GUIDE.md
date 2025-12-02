# Product Image Upload Guide

## Overview

Currently, the Marcova admin panel uses **Image URLs** for product images. You have several options for hosting and adding images to your products.

## Option 1: Use Supabase Storage (Recommended)

Supabase provides free storage that integrates seamlessly with your project.

### Setup Supabase Storage:

1. **Go to Supabase Dashboard** → Your Project → **Storage**
2. **Create a new bucket**:
   - Click "New bucket"
   - Name: `product-images`
   - Public bucket: ✅ Yes (so images are publicly accessible)
   - Click "Create bucket"

3. **Upload Images**:
   - Click on the `product-images` bucket
   - Click "Upload file"
   - Select your product images
   - After upload, click on the image
   - Copy the **Public URL**

4. **Use in Admin Panel**:
   - Go to Products → Edit or New Product
   - Paste the Public URL in the "Image URL" field
   - Example: `https://fkyhiwukdsczhlbprcwd.supabase.co/storage/v1/object/public/product-images/dark-chocolate.jpg`

### Storage Limits (Free Tier):
- 1 GB storage
- Unlimited bandwidth
- Perfect for product images!

## Option 2: Use External Image Hosting

You can use free image hosting services:

### Popular Options:

1. **Imgur** (https://imgur.com)
   - Free, no account needed
   - Right-click image → "Copy image address"

2. **Cloudinary** (https://cloudinary.com)
   - Free tier: 25 GB storage, 25 GB bandwidth/month
   - Advanced image transformations

3. **ImgBB** (https://imgbb.com)
   - Simple drag-and-drop
   - Get direct image link

### How to Use:
1. Upload your image to any hosting service
2. Copy the direct image URL (must end in .jpg, .png, etc.)
3. Paste it in the admin panel

## Option 3: Use Placeholder Images

For testing, you can use placeholder services:

### Placeholder Services:

1. **Unsplash** (https://unsplash.com)
   - High-quality free images
   - Example: `https://images.unsplash.com/photo-1511381939415-e44015466834?w=400`

2. **Picsum** (https://picsum.photos)
   - Random placeholder images
   - Example: `https://picsum.photos/400/300`

3. **Placeholder.com**
   - Simple placeholders
   - Example: `https://via.placeholder.com/400x300`

## Image Best Practices

### Recommended Image Specifications:

- **Format**: JPG or PNG
- **Dimensions**: 800x800px (square) or 1200x800px (landscape)
- **File Size**: Under 500 KB for fast loading
- **Quality**: 80-90% compression

### Image Naming:
- Use descriptive names: `dark-chocolate-bar.jpg`
- Avoid spaces: use hyphens instead
- Keep lowercase for consistency

## Update Sample Products

The sample products in your database currently have placeholder paths like `/products/dark-bar.jpg`. You'll need to update these with real URLs.

### Quick Update via Supabase:

1. Go to Supabase Dashboard → Table Editor → `products`
2. Click on a product row
3. Edit the `image` field
4. Paste the new image URL
5. Save

### Or via SQL:

```sql
UPDATE products 
SET image = 'https://your-image-url.com/dark-chocolate.jpg'
WHERE name = 'Dark Chocolate Bar';
```

## Future Enhancement: Direct Upload

If you want to add direct image upload to the admin panel in the future, you would need to:

1. Install Supabase Storage SDK (already included)
2. Add a file input field in the product forms
3. Upload file to Supabase Storage
4. Get the public URL
5. Save URL to the database

This can be implemented later as an enhancement!

## Need Help?

- **Supabase Storage Docs**: https://supabase.com/docs/guides/storage
- **Image Optimization**: Use tools like TinyPNG or Squoosh
- **Free Stock Photos**: Unsplash, Pexels, Pixabay

## Quick Start

For now, the simplest approach:
1. Upload images to Imgur or ImgBB
2. Copy the direct link
3. Paste in the "Image URL" field when creating/editing products
4. Done! ✅
