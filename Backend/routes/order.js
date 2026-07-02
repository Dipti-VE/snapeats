import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// 📌 Get all orders of a user by email
router.get("/user/:email", async (req, res) => {
  try {
    const orders = await Order.find({ userEmail: req.params.email });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

export default router;
