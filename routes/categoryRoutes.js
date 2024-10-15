// routes/categoryRoutes.js

const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const isAuthenticated = require('../middleware/authMiddleware');

// Preset default categories
const defaultCategories = [
    { name: 'Rent' },
    { name: 'Groceries' },
    { name: 'Transport' },
    { name: 'Dining Out' },
    { name: 'Bills/Utilities' },
    { name: 'Entertainment' },
];

// Create a new category (used for custom categories)
router.post('/category', isAuthenticated, async (req, res) => {
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

// Initialize default categories (run this once or on demand)
router.post('/init-default-categories', isAuthenticated, async (req, res) => {
    try {
        const existingCategories = await Category.find({});
        if (existingCategories.length > 0) {
            return res.status(400).json({ message: 'Default categories already exist' });
        }

        await Category.insertMany(defaultCategories);
        res.status(201).json({ message: 'Default categories initialized successfully' });
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

// Delete a category (only authenticated users can delete categories)
router.delete('/category/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
});

module.exports = router;
