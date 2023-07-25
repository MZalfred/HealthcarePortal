const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  content: String,
  // Add more fields as needed for medical record-related information
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
