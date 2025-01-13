const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensures email is unique
  },
  password: {
    type: String,
    required: true,  // Make sure password is required
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
