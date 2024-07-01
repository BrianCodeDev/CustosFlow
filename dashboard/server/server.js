const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const User = require('./models/User'); // Replace with your User model path
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for JSON parsing
app.use(express.json());
app.use(cors()); // Enable CORS

// Connect to MongoDB (example connection string)
mongoose.connect('mongodb+srv://coffee:Blue1088!@coffee.uvzn1x4.mongodb.net/test?retryWrites=true&w=majority&appName=coffee', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define your upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Define filename (here using timestamp + original name)
  },
});
const upload = multer({ storage: storage });

// API endpoint for user registration
app.post('/api/register', upload.single('profilePicture'), async (req, res) => {
  try {
    const { firstName, lastName, email, password, subscribe } = req.body;
    const profilePicture = req.file.path; // Assuming the path is saved to the database

    // Save user data to MongoDB
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      profilePicture,
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration failed', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// API endpoint for user login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Implement your login logic here (query MongoDB, validate credentials, etc.)
    // Example: const user = await User.findOne({ email, password });

    // For demo purposes, assume successful login
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login failed', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Define other API routes as needed

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
