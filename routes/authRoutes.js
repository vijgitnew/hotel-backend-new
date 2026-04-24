const express = require("express");
const router = express.Router();

// ✅ Fake login (no DB)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "1234") {
    return res.json({
      token: "fake-jwt-token"
    });
  }

  return res.status(401).json({
    message: "Invalid credentials"
  });
});

module.exports = router;