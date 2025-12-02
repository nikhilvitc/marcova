const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const authMiddleware = require('../middleware/auth');

// Create inquiry
router.post('/', async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();
    res.status(201).json({ inquiry, message: 'Inquiry submitted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all inquiries (Admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ inquiries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single inquiry (Admin only)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    res.json({ inquiry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update inquiry status (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    res.json({ inquiry });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete inquiry (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
