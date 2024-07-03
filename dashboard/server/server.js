// server.js

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const User = require('./routes/User'); // Replace with your User model path
const cors = require('cors');
const path = require('path');

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

// Ensure the 'uploads' directory exists
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

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
    const profilePicture = req.file ? req.file.path : null; // Handle cases where profilePicture may not be uploaded

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user data to MongoDB
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
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

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Login successful
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login failed', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// API endpoint to get user data by email
app.get('/api/users', async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ firstName: user.firstName });
  } catch (error) {
    console.error('Error fetching user', error);
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle all other routes with a simple message or 404 Not Found
app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
