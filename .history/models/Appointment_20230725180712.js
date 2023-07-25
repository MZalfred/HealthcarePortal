// models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctor: String,
  date: Date,
  // Add more fields as needed for appointment-related information
});

module.exports = mongoose.model('Appointment', appointmentSchema);
