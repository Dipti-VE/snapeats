import express from "express";
import Order from "../models/Order.js";
import path from "path";
import Razorpay from "razorpay";

const router = express.Router();


// ==============================
// 👤 Get all orders of user
// ==============================
router.get("/user/:email", async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);

    const orders = await Order.find({ userEmail: email })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});


// ==============================
// 📦 GET ALL ORDERS (ADMIN)
// ==============================
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all orders" });
  }
});


// ==============================
// ⭐ GET SINGLE ORDER DETAILS
// ==============================
router.get("/details/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error loading order details" });
  }
});


// ==============================
// 💸 CANCEL ORDER (REFUND)
// ==============================
router.post("/cancel", async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ❌ Already refunded
    if (order.status === "Refunded") {
      return res.json({ message: "Already refunded" });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // 💸 Refund
    const refund = await razorpay.payments.refund(order.paymentId);

    console.log("💸 Refund triggered:", refund.id);

    // 🟡 Update status
    order.status = "Refund Initiated";
    await order.save();

    res.json({
      success: true,
      message: "Order cancelled & refund started",
    });

  } catch (err) {
    console.log("Cancel error:", err);
    res.status(500).json({ message: "Cancel failed" });
  }
});


// ==============================
// 📄 DOWNLOAD INVOICE
// ==============================
router.get("/download/:file", (req, res) => {
  try {
    const filePath = path.join("invoices", req.params.file);
    res.download(filePath);
  } catch (err) {
    res.status(500).json({ message: "Download failed" });
  }
});


export default router;