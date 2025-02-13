import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// For simplicity, we hardcode a single "user". In a real app, you'd check a DB.
const USERNAME = "admin";
const PASSWORD = "password123";

// POST /api/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === USERNAME && password === PASSWORD) {
    // Create a payload with user info, typically you'd put user ID, roles, etc.
    const payload = { username };

    // Sign a token valid for e.g. 1 hour
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token });
  } else {
    return res.status(401).json({ error: "Invalid username or password" });
  }
});

export default router;
