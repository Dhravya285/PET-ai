const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
//   adoptionId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'Adoption', 
//     required: true 
//   },
  petName: { 
    type: String, 
    required: true 
  },
  adopterName: { 
    type: String, 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  paymentMethod: { 
    type: String, 
    enum: ['Card', 'UPI', 'MetaMask'], 
    required: true 
  },
  paymentDate: { 
    type: Date, 
    default: Date.now 
  },
  scheduleDate: { 
    type: Date, 
    required: true 
  },
  receiptNumber: { 
    type: String, 
    unique: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
