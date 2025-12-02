const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Inquiry = require('../models/Inquiry');

// Dashboard stats
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalInquiries = await Inquiry.countDocuments();
    const pendingInquiries = await Inquiry.countDocuments({ status: 'pending' });
    const pendingOrders = await Order.countDocuments({ status: 'pending' });

    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);

    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      { $group: { _id: '$items.product', quantity: { $sum: '$items.quantity' } } },
      { $sort: { quantity: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
      { $project: { name: '$product.name', quantity: 1 } },
    ]);

    res.json({
      stats: {
        totalProducts,
        totalOrders,
        totalInquiries,
        pendingInquiries,
        pendingOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
      },
      topProducts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
