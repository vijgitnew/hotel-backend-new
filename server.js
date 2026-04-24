require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// ================= AUTH =================
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "1234") {
    return res.json({ token: "fake-jwt-token" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

// ================= DB HELPERS =================
const getData = () => {
  const data = fs.readFileSync("db.json");
  return JSON.parse(data);
};

const saveData = (data) => {
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
};

// ================= ROOMS =================

// GET all rooms
app.get("/api/rooms", (req, res) => {
  const data = getData();
  res.json(data.rooms);
});

// ADD room
app.post("/api/rooms", (req, res) => {
  const data = getData();

  const newRoom = {
    id: Date.now(),
    ...req.body
  };

  data.rooms.push(newRoom);
  saveData(data);

  res.json(newRoom);
});

// UPDATE room
app.patch("/api/rooms/:id", (req, res) => {
  const data = getData();
  const id = parseInt(req.params.id);

  const index = data.rooms.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Room not found" });
  }

  data.rooms[index] = {
    ...data.rooms[index],
    ...req.body
  };

  saveData(data);

  res.json(data.rooms[index]);
});

// DELETE room
app.delete("/api/rooms/:id", (req, res) => {
  const data = getData();
  const id = parseInt(req.params.id);

  const newRooms = data.rooms.filter(r => r.id !== id);

  if (newRooms.length === data.rooms.length) {
    return res.status(404).json({ message: "Room not found" });
  }

  data.rooms = newRooms;
  saveData(data);

  res.json({ message: "Room deleted" });
});

// ================= BOOKINGS =================

// GET bookings
app.get("/api/bookings", (req, res) => {
  const data = getData();
  res.json(data.bookings);
});

// ADD booking
app.post("/api/bookings", (req, res) => {
  const data = getData();

  const newBooking = {
    id: Date.now(),
    ...req.body
  };

  data.bookings.push(newBooking);
  saveData(data);

  res.json(newBooking);
});

// UPDATE booking
app.patch("/api/bookings/:id", (req, res) => {
  const data = getData();
  const id = parseInt(req.params.id);

  const index = data.bookings.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Booking not found" });
  }

  data.bookings[index] = {
    ...data.bookings[index],
    ...req.body
  };

  saveData(data);

  res.json(data.bookings[index]);
});

// DELETE booking
app.delete("/api/bookings/:id", (req, res) => {
  const data = getData();
  const id = parseInt(req.params.id);

  const newBookings = data.bookings.filter(b => b.id !== id);

  if (newBookings.length === data.bookings.length) {
    return res.status(404).json({ message: "Booking not found" });
  }

  data.bookings = newBookings;
  saveData(data);

  res.json({ message: "Booking deleted" });
});

// ================= TEST =================
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// ================= PORT =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});