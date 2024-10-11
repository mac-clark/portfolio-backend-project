// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Create a new category
router.post('/category', async (req, res) => {
  const { name } = req.body;

  try {
    let category = await Category.findOne({ name });
    if (category) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    category = new Category({ name });
    await category.save();

    res.status(201).json({ message: 'Category created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
});

// Get all categories
router.get('/category', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
});

module.exports = router;
