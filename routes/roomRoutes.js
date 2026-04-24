const express = require("express");
const router = express.Router();
const axios = require("axios");

const BASE_URL = "http://localhost:3001";

// ✅ GET all rooms
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/rooms`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET single room
router.get("/:id", async (req, res) => {
  try {
    const roomId = parseInt(req.params.id);

    const response = await axios.get(`${BASE_URL}/rooms/${roomId}`);
    res.json(response.data);
  } catch (err) {
    res.status(404).json({ message: "Room not found" });
  }
});


// ✅ CREATE room
router.post("/", async (req, res) => {
  try {
    const newRoom = {
      ...req.body,
      id: Date.now() // generate ID
    };

    const response = await axios.post(`${BASE_URL}/rooms`, newRoom);

    res.status(201).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ UPDATE room (PATCH)
router.patch("/:id", async (req, res) => {
  try {
    const roomId = parseInt(req.params.id);

    const response = await axios.patch(
      `${BASE_URL}/rooms/${roomId}`,
      req.body
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ DELETE room (with booking check)
router.delete("/:id", async (req, res) => {
  try {
    const roomId = parseInt(req.params.id);

    // 🔹 Get bookings
    const bookingRes = await axios.get(`${BASE_URL}/bookings`);

    const existingBooking = bookingRes.data.find(
      (b) => b.room === roomId
    );

    if (existingBooking) {
      return res.status(400).json({
        message: "Cannot delete room. It has active bookings"
      });
    }

    // 🔹 Delete room
    await axios.delete(`${BASE_URL}/rooms/${roomId}`);

    res.json({ message: "Room deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;