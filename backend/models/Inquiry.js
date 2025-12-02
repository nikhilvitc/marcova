const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    required: true,
  },
  cakeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    default: null,
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'resolved'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Inquiry', inquirySchema);
