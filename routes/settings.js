const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get user settings
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('settings');
        res.json(user.settings);
    } catch (err) {
        console.error('Error fetching settings:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user settings
router.put('/', auth, async (req, res) => {
    try {
        const { language, currency } = req.body.settings;

        // Validate language
        const validLanguages = ['en', 'es', 'fr', 'de', 'hi', 'ta', 'ml', 'te', 'kn'];
        if (language && !validLanguages.includes(language)) {
            return res.status(400).json({ message: 'Invalid language selection' });
        }

        // Validate currency
        if (currency && !['USD', 'EUR', 'GBP', 'JPY', 'INR'].includes(currency)) {
            return res.status(400).json({ message: 'Invalid currency selection' });
        }

        // Update user settings
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                $set: {
                    'settings.language': language,
                    'settings.currency': currency
                }
            },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ 
            message: 'Settings updated successfully',
            user 
        });
    } catch (err) {
        console.error('Error updating settings:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
