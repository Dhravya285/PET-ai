// Routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');

// Get user data
router.get('/userget', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/update-profile', authenticateToken, async (req, res) => {
  try {
    const { name, bio, profilePicture, socialLinks } = req.body;
    
    // Find and update user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update only provided fields
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (profilePicture) user.profilePicture = profilePicture;
    if (socialLinks) user.socialLinks = new Map(Object.entries(socialLinks));

    await user.save();

    // Return updated user without password
    const updatedUser = await User.findById(req.user.id).select('-password');
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;