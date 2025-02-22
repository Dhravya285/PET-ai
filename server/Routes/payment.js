
const express = require('express');
const router = express.Router();
const { createPayment, getReceipt } = require('../controllers/paymentController');

// POST: Make a Payment and Generate Receipt
router.post('/pay', createPayment);

// GET: Get Receipt by Payment ID
router.get('/receipt/:id', getReceipt);

module.exports = router;
