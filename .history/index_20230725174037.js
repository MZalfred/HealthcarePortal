// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middleware to parse incoming request bodies as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB database
const mongoURI = 'mongodb://localhost/healthcare_portal'; // Change this URI for your database
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import models
const User = require('./models/User');
const Appointment = require('./models/Appointment');
const MedicalRecord = require('./models/MedicalRecord');

// Controllers
const userController = require('./controllers/userController');
const appointmentController = require('./controllers/appointmentController');

// Routes for user registration and booking appointments
app.post('/api/register', userController.registerUser);
app.post('/api/users/:userId/appointments', appointmentController.bookAppointment);

// Your other API routes will be added here

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
