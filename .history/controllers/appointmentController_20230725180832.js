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
