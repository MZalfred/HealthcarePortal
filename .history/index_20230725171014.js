// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

// middleware to parse incoming requests bodies as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to MongoDB database
const mongoURI = 'mongodb://localhost/healthcare_portal'; // change this URT for your database
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('mongodb connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  // Add more fields as needed for user-related information
});

module.exports = mongoose.model('User', userSchema);

// models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctor: String,
  date: Date,
  // Add more fields as needed for appointment-related information
});

module.exports = mongoose.model('Appointment', appointmentSchema);

// models/MedicalRecord.js
const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  content: String,
  // Add more fields as needed for medical record-related information
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);

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

// controllers/appointmentController.js
const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Book an appointment route
exports.bookAppointment = async (req, res) => {
  const { doctor, date } = req.body;
  const { userId } = req.params;

  // Check if the user exists
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Create a new appointment
  const appointment = new Appointment({ user: userId, doctor, date });
  await appointment.save();

  res.status(201).json({ message: 'Appointment booked successfully' });
};

// index.js
// ... (previous code)
const userController = require('./controllers/userController');
const appointmentController = require('./controllers/appointmentController');

// Route for user registration
app.post('/api/register', userController.registerUser);

// Route for booking an appointment
app.post('/api/users/:userId/appointments', appointmentController.bookAppointment);

// Your other API routes will be added here

// ... (remaining code)
