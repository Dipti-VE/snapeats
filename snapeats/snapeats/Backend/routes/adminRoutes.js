import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ✅ GET all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});
// ✅ UPDATE order status
router.put("/orders/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating order" });
  }
});

export default router;