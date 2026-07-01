import Razorpay from "razorpay";
import Order from "../models/Order.js";

// ==============================
// 📦 GET ALL ORDERS (Admin)
// ==============================
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.log("Get orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};


// ==============================
// ❌ CANCEL ORDER (Refund)
// ==============================
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ❌ already refunded
    if (order.status === "Refunded") {
      return res.json({ message: "Already refunded" });
    }

    // 💳 Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // 💸 REFUND
    const refund = await razorpay.payments.refund(order.paymentId);

    console.log("💸 Refund triggered:", refund.id);

    // 🟡 update status
    order.status = "Refund Initiated";
    await order.save();

    res.json({
      success: true,
      message: "Order cancelled & refund started",
    });

  } catch (error) {
    console.log("Cancel order error:", error);
    res.status(500).json({ message: "Cancel failed" });
  }
};