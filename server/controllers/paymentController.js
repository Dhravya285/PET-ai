const mongoose = require('mongoose');
const Payment = require('../models/payment');
const { v4: uuidv4 } = require('uuid');
const Web3 = require("web3");
const dotenv = require("dotenv");

dotenv.config();

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));
console.log("Connected to Ethereum:", web3.eth.net.isListening());


console.log("Connected to Ethereum:", web3.eth.net.isListening());

const YOUR_WALLET_ADDRESS = "0x8F356f33F2b04D911f758e3a9c3e292e607B0f4E"; // Replace with your wallet address

// Create Payment and Generate Receipt
exports.createPayment = async (req, res) => {
  try {
    const { userId, petName, adopterName, amount, paymentMethod, transactionHash } = req.body;

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId format' });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    // MetaMask Payment Verification
    if (paymentMethod === "MetaMask") {
      if (!transactionHash) {
        return res.status(400).json({ message: "Transaction hash is required for MetaMask payments" });
      }

      // Verify transaction on blockchain
      const receipt = await web3.eth.getTransactionReceipt(transactionHash);

      if (!receipt) {
        return res.status(400).json({ message: "Invalid transaction hash" });
      }

      if (receipt.to.toLowerCase() !== YOUR_WALLET_ADDRESS.toLowerCase()) {
        return res.status(400).json({ message: "Transaction was not sent to the correct address" });
      }
    }

    // Generate a random schedule date (7 to 14 days from today)
    const today = new Date();
    const randomDays = Math.floor(Math.random() * 8) + 7; // Random between 7 and 14
    const scheduleDate = new Date(today);
    scheduleDate.setDate(today.getDate() + randomDays);

    // Generate a unique receipt number
    const receiptNumber = `REC-${uuidv4().slice(0, 8).toUpperCase()}`;

    const payment = new Payment({
      userId: userObjectId,
      petName,
      adopterName,
      amount,
      paymentMethod,
      transactionHash, // Store transaction hash
      scheduleDate,
      receiptNumber,
    });

    await payment.save();

    res.status(201).json({
      message: 'Payment successful and receipt generated',
      receipt: {
        receiptNumber,
        adopterName,
        petName,
        amount,
        paymentMethod,
        paymentDate: payment.paymentDate,
        scheduleDate,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
};

// Get Payment Receipt by ID
exports.getReceipt = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate payment ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid payment ID format' });
    }

    // Fetch payment details
    const payment = await Payment.findById(new mongoose.Types.ObjectId(id));

    if (!payment) {
      return res.status(404).json({ message: 'Receipt not found' });
    }

    res.status(200).json({
      receipt: {
        receiptNumber: payment.receiptNumber,
        adopterName: payment.adopterName,
        petName: payment.petName,
        amount: payment.amount,
        paymentMethod: payment.paymentMethod,
        transactionHash: payment.transactionHash, // Include transaction hash in response
        paymentDate: payment.paymentDate,
        scheduleDate: payment.scheduleDate,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching receipt', error: error.message });
  }
};
