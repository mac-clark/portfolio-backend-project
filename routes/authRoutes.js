// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const axios = require('axios');

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

        // Initialize default categories after successful user registration
        try {
            await axios.post('http://localhost:5000/categories/init-default-categories');
            console.log('Default categories initialized');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('Default categories already exist');
            } else {
                console.error('Error initializing default categories:', error);
            }
        }

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

        // Create a session
        req.session.userId = user._id;
        req.session.username = user.username;
        res.json({ message: 'Login successful', userId: user._id });
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
});

// Log a user out
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }

        res.clearCookie('connect.sid'); // Clear session cookie
        res.json({ message: 'Logged out successfully' });
    })
});

module.exports = router;