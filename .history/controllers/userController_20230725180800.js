// controllers/userController.js
const User = require('../models/User');

// User registration route
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  
  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'User with this email already exists' });
  }

  // Create a new user
  const user = new User({ username, email, password });
  await user.save();

  res.status(201).json({ message: 'User registered successfully' });
};
