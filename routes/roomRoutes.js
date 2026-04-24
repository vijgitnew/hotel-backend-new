const express = require('express');
const Room = require('../models/Room');
const Booking = require('../models/Booking');

const router = express.Router();

// Get all rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Add new room
router.post("/", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body); // 🔥 IMPORTANT

    const room = new Room(req.body);
    await room.save();

    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update room
router.delete("/:id", async (req, res) => {
  try {
    const existingBooking = await Booking.findOne({
      roomId: req.params.id
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "Cannot delete room. It has active bookings"
      });
    }

    const deleted = await Room.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Delete room
router.delete("/:id", async (req, res) => {
  try {
    const existingBooking = await Booking.findOne({
      roomId: req.params.id
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "Cannot delete room. It has active bookings"
      });
    }

    const deleted = await Room.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;