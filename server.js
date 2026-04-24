const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require("./routes/authRoutes");


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// MongoDB connection
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));


// Routes
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
