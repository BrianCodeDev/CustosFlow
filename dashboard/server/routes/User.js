const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profileImage: { type: String, default: 'http://placekitten.com/200/200' } // Default profile image URL
});

module.exports = mongoose.model('User', userSchema);
