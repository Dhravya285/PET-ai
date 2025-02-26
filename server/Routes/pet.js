// routes/petRoutes.js
const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet'); // Adjust based on your model structure

// GET all pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single pet by ID
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new pet
router.post('/', async (req, res) => {
  const pet = new Pet({
    name: req.body.name,
    breed: req.body.breed,
    age: req.body.age,
    size: req.body.size,
    location: req.body.location,
    image: req.body.image,
    type:req.body.type,
    status: req.body.status || 'Available'
  });

  try {
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT/UPDATE a pet
router.put('/:id', async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json(updatedPet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a pet
router.delete('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;