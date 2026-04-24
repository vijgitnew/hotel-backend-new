const express = require("express");
const router = express.Router();
const axios = require("axios");

const BASE_URL = "http://localhost:3001";

// ✅ GET all bookings
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/bookings`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET single booking
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const response = await axios.get(`${BASE_URL}/bookings/${id}`);
    res.json(response.data);
  } catch (err) {
    res.status(404).json({ message: "Booking not found" });
  }
});


// ✅ CREATE booking
router.post("/", async (req, res) => {
  try {
    const newBooking = {
      id: Date.now(), // generate unique id
      ...req.body
    };

    const response = await axios.post(`${BASE_URL}/bookings`, newBooking);

    res.status(201).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ UPDATE booking (PUT)
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const response = await axios.put(
      `${BASE_URL}/bookings/${id}`,
      req.body
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ UPDATE booking (PATCH - optional, better)
router.patch("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const response = await axios.patch(
      `${BASE_URL}/bookings/${id}`,
      req.body
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ DELETE booking
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await axios.delete(`${BASE_URL}/bookings/${id}`);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;