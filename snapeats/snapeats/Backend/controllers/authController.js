import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

/**
 * ---------------------------------------------------
 * ⭐ SIGNUP (name + email + password)
 * ---------------------------------------------------
 */

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    const user = new User({
      name,
      email,
      password, // will be hashed by mongoose pre-save hook
    });

    await user.save();

    return res.json({
      success: true,
      message: "Signup successful",
    });

  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


/**
 * ---------------------------------------------------
 * ⭐ LOGIN (email + password)
 * ---------------------------------------------------
 */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const makeAdmin = async (req, res) => {
  try {

    const { email } = req.body;

    const user = await User.findOneAndUpdate(
      { email },
      { role: "admin" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      message: "User is now admin",
      user
    });


  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};