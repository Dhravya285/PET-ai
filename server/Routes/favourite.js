// favorites.js route file
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenticateToken'); // Your authentication middleware
const Favorite = require('../models/favourites'); // You'll need to create this model

// Add a pet to favorites
router.post('/add', auth, async (req, res) => {
  try {
    const { petId, petName, petBreed, petImage } = req.body;
    const userId = req.user.id; // From your auth middleware
    
    // Check if already favorited
    const existingFavorite = await Favorite.findOne({ userId, petId });
    if (existingFavorite) {
      return res.status(400).json({ message: 'Pet already in favorites' });
    }
    
    // Create new favorite
    const newFavorite = new Favorite({
      userId,
      petId,
      petName,
      petBreed,
      petImage,
      dateAdded: new Date()
    });
    
    await newFavorite.save();
    
    res.status(200).json({ message: 'Pet added to favorites' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all favorites for a user
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const favorites = await Favorite.find({ userId })
      .sort({ dateAdded: -1 });
    
    res.json(favorites);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove a pet from favorites
router.delete('/:petId', auth, async (req, res) => {
  try {
    const petId = req.params.petId;
    const userId = req.user.id;
    
    const result = await Favorite.findOneAndDelete({ userId, petId });
    
    if (!result) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    
    res.json({ message: 'Pet removed from favorites' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;