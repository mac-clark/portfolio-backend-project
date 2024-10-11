// routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Create a new expense
router.post('/expense', async (req, res) => {
    const { userId, amount, description, categoryId } = req.body;

    try {
        const expense = new Expense({
            user: userId,
            amount,
            description,
            category: categoryId,
            date: new Date(),
        });

        await expense.save();
        res.status(201).json({ message: 'Expense created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
});

// Get al expenses for a specific user
router.get('/expense/:id', async (req, res) => {
    const { userId } = req.params;

    try {
        const expenses = await Expense.find({ user: userId }).populate('category', 'name');
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
});

module.exports = router;