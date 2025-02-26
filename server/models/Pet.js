// models/Pet.js
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  breed: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  size: {
    type: String,
    enum: ['Small', 'Medium', 'Large'],
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'Adopted', 'Pending', 'Foster'],
    default: 'Available'
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['Dog', 'Cat', 'Rabbit', 'Bird', 'Other'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;