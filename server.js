require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
// Read DB
const getData = () => {
  const data = fs.readFileSync("db.json");
  return JSON.parse(data);
};

// Write DB
const saveData = (data) => {
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
};


// ✅ GET Rooms
app.get("/api/rooms", (req, res) => {
  const data = getData();
  res.json(data.rooms);
});

// ✅ ADD Room
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

// ✅ GET Bookings
app.get("/api/bookings", (req, res) => {
  const data = getData();
  res.json(data.bookings);
});

// ✅ ADD Booking
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


// Test route
app.get("/", (req, res) => {
  res.send("Server running 🚀 (JSON DB)");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});