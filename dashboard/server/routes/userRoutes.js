const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// POST /api/signup endpoint to handle user registration
router.post('/signup', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword, firstName, lastName });
    await newUser.save();
    
    res.status(201).send('User created');
  } catch (error) {
    res.status(400).send('Error creating user: ' + error.message);
  }
});

// GET /api/users endpoint to fetch all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'email firstName lastName profileImage');
    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST /api/login endpoint to handle user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Login successful
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login failed', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
