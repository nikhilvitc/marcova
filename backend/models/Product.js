const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'bar-chocolates',
      'chocolate-bites',
      'bonbon-chocolates',
      'celebration-chocolates',
      'cakes',
      'others',
    ],
  },
  subcategory: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    default: '',
  },
  images: [{
    type: String,
  }],
  featured: {
    type: Boolean,
    default: false,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
