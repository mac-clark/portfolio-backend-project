// routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const isAuthenticated = require('../middleware/authMiddleware');

// Create a new expense (only accessible if authenticated)
router.post('/expense', isAuthenticated, async (req, res) => {
    const { userId } = req.session;
    const { amount, description, category, date } = req.body;

    try {
        const expense = new Expense({
            user: userId,
            amount,
            description,
            category,
            date: date || new Date(),
        });

        await expense.save();
        res.status(201).json({ message: 'Expense created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
});

// Get all expenses for a specific user (only accessible if authenticated)
router.get('/', isAuthenticated, async (req, res) => {
    const { userId } = req.session;  // Get userId from the session

    try {
        const expenses = await Expense.find({ user: userId }).populate('category', 'name');
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
});

// Delete expense route (protected)
router.delete('/expense/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.json({ message: 'Expense deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
});

// Get expenses within a range
router.get('/range', isAuthenticated, async (req, res) => {
    const { userId } = req.session;
    const { startDate, endDate } = req.query;

    try {
        const expenses = await Expense.find({
            user: userId,
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }).populate('category', 'name'); // Populate category name
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
});

module.exports = router;
