// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  // Add more fields as needed for user-related information
});

module.exports = mongoose.model('User', userSchema);
