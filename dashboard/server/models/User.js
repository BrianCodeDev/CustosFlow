// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  profilePicture: String
});

module.exports = mongoose.model('User', userSchema);
