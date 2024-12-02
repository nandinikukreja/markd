import express from 'express';
import jwt from 'jsonwebtoken';
import bcrpyt from 'bcrypt';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrpyt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );
    res.status(200).json({ message: "Login Successful", token, userId: user._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET /api/auth/verify-token
router.get("/verify-token", auth, (req, res) => {
  res.status(200).json({ valid: true, user: req.user });
});

export default router;