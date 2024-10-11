// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password, fullName } = req.body;

    try {
        // Check if the user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        user = new User({ username, email, password, fullName });
        await user.save();

        res.status(201).json({ message: 'User registered succsessfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
});

// Log a user in
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Check if password matches
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Create a session or send back a token here (not implemented yet)
        res.json({ message: 'Login successful', userId: user._id });
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
});

module.exports = router;