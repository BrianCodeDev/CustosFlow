// server/api/register.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../routes/User'); // Assuming User model is defined in ../models/User.js

// Handle file uploads with multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// POST /api/register endpoint
router.post('/', upload.single('profilePicture'), async (req, res) => {
  try {
    const { firstName, lastName, email, password, subscribe } = req.body;
    const profilePicture = req.file ? `/uploads/${req.file.originalname}` : null;

    const newUser = new User({ firstName, lastName, email, password, subscribe, profilePicture });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration failed', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;
