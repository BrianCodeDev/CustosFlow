// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection setup (using mongoose)
mongoose.connect('mongodb+srv://coffee:Blue1088!@coffee.uvzn1x4.mongodb.net/?retryWrites=true&w=majority&appName=coffee', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a user schema and model
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  subscribed: Boolean,
});
const User = mongoose.model('User', UserSchema);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.post('/api/register', async (req, res) => {
  const { firstName, lastName, email, password, subscribe } = req.body;

  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      subscribed: subscribe || false,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
