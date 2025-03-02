// models/Favorite.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  petId: {
    type: Number,
    required: true
  },
  petName: {
    type: String,
    required: true
  },
  petBreed: {
    type: String,
    required: true
  },
  petImage: {
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure a user can't favorite the same pet twice
FavoriteSchema.index({ userId: 1, petId: 1 }, { unique: true });

module.exports = mongoose.model('favorite', FavoriteSchema);