// backend/models/Room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: Number,
  type: String,
  price: Number,
  status: { type: String, default: 'available' }
});

module.exports = mongoose.model('Room', roomSchema);
