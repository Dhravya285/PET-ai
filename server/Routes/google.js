const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, sub: googleId } = ticket.getPayload();
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, googleId, isVerified: true });
      await user.save();
    }

    const jwtToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token: jwtToken, userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Google authentication failed' });
  }
});

module.exports = router;
