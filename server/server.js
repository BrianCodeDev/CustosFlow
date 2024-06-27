// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://coffee:Blue1088!@coffee.uvzn1x4.mongodb.net/test?retryWrites=true&w=majority&appName=coffee';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
  console.log('Server running on port ' + port);
});
db.on('error', err => console.error('MongoDB connection error:', err));

// Define MongoDB schema and model
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  subscribe: Boolean
});

const User = mongoose.model('User', UserSchema);

// Routes
app.post('/api/register', async (req, res) => {
  const { firstName, lastName, email, password, subscribe } = req.body;

  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      subscribe
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Start server
app.listen(port, () => {
  console.log('Server running on port ' + port);
});
