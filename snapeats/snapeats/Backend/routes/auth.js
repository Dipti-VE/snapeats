import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import OTP from "../models/OTP.js";
import bcrypt from "bcryptjs";

dotenv.config();

const router = express.Router();


// ==========================
// ⭐ SIGNUP (NO PASSWORD)
// ==========================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    if (!name || !email || !mobile) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      mobile
    });

    res.json({
      success: true,
      message: "Account created successfully",
      user
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ==========================
// ⭐ SEND OTP
// ==========================
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    await OTP.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "diptibhowmik2004@gmail.com",
        pass: "ailghmdojwhvospp",
      },
    });

    await transporter.sendMail({
      from: "diptibhowmik2004@gmail.com",
      to: email,
      subject: "SnapEats OTP",
      text: `Your OTP is ${otp}`,
    });

    res.json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (err) {
    console.log("Send OTP Error:", err);
    res.status(500).json({ message: "Error sending OTP" });
  }
});


// ==========================
// ⭐ VERIFY OTP (LOGIN / SIGNUP)
// ==========================
router.post("/verify-otp", async (req, res) => {
  try {
    const { name, email, otp } = req.body; // ❌ removed mobile

    // ✅ Check required fields
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }

    // ✅ Get latest OTP
    const record = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!record) {
      return res.status(400).json({ message: "No OTP found" });
    }

    // ✅ Compare OTP manually
    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ✅ Check expiry
    if (record.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email
       
      });
    }

    // ✅ login tracking
    user.loginTime = new Date();
    user.logoutTime = null;
    user.loginDuration = null;
    user.offerSent = false;

    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ clear OTP
    await OTP.deleteMany({ email });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.log("Verify OTP Error:", err);
    res.status(500).json({ message: "Error verifying OTP" });
  }
});
// ==========================
// ⭐ ADMIN LOGIN (FIXED)
// ==========================
router.post("/admin-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.role !== "admin") {
      return res.status(400).json({ message: "Not an admin" });
    }

    if (!user.password) {
      return res.status(400).json({ message: "Admin password not set" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.log("Admin Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// ==========================
// ⭐ LOGOUT
// ==========================
router.post("/logout", async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const logoutTime = new Date();

    if (!user.loginTime) {
      user.logoutTime = logoutTime;
      user.loginDuration = "0m 0s";
    } else {
      const durationMs = logoutTime - user.loginTime;

      const minutes = Math.floor(durationMs / 60000);
      const seconds = Math.floor((durationMs % 60000) / 1000);

      user.logoutTime = logoutTime;
      user.loginDuration = `${minutes}m ${seconds}s`;
    }

    await user.save();

    res.json({ success: true });

  } catch (err) {
    console.log("Logout Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;