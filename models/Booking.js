const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: String,
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  checkIn: Date,
  checkOut: Date,
  status: { type: String, default: 'booked' }
});

module.exports = mongoose.model('Booking', bookingSchema);
