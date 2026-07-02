import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import Order from "../models/Order.js";
import generateInvoice from "../utils/pdfGenerator.js";
import sendEmail from "../utils/sendEmail.js";
import path from "path";

dotenv.config();

// ==============================
// ⭐ CREATE ORDER
// ==============================
export const createOrder = async (req, res) => {
  try {
    const { amount, email, cartItems, userDetails } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
      notes: {
        email: email || "test@gmail.com",
        cart: JSON.stringify(cartItems || []),
        user: JSON.stringify(userDetails || {}),
      },
    });

    res.json(order);

  } catch (error) {
    console.error("Order Create Error:", error);
    res.status(500).json({ message: "Order creation failed" });
  }
};


// ==============================
// ⭐ WEBHOOK (FINAL FIXED 🔥)
// ==============================
export const handleWebhook = async (req, res) => {
 console.log("🔥 Webhook triggered");

  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];

    const rawBody = Buffer.isBuffer(req.body)
      ? req.body
      : Buffer.from(JSON.stringify(req.body));

    // ✅ VERIFY SIGNATURE
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      console.log("❌ Invalid signature");
      return res.status(400).send("Invalid signature");
    }

    const event = JSON.parse(rawBody.toString());
    console.log("Webhook event:", event.event);

    // ===============================
    // 💳 PAYMENT SUCCESS
    // ===============================
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      console.log("💰 Payment success:", payment.id);

      // ❗ prevent duplicate
      const existingOrder = await Order.findOne({
        paymentId: payment.id,
      });

      if (existingOrder) {
        console.log("⚠️ Order already exists");
        return res.status(200).send("Duplicate");
      }

      const notes = payment.notes || {};
      const email = notes.email || "test@gmail.com";

      const items = JSON.parse(notes.cart || "[]");
      const userDetails = JSON.parse(notes.user || "{}");

      const order = await Order.create({
        userEmail: email,
        items,
        userDetails,
        totalAmount: payment.amount / 100,
        paymentId: payment.id,
        orderId: payment.order_id,

        // ✅ FIXED
        status: "Paid",
        payment: true,

        refundedAmount: 0,
        refundHistory: [],
      });

      console.log("✅ Order saved:", order._id);

      // 📄 Invoice
      const invoicePath = await generateInvoice(order);
      const fileName = path.basename(invoicePath);

      order.invoice = `/invoices/${fileName}`;
      await order.save();

      // 📧 Email
      await sendEmail(
        email,
        "Order Confirmation",
        "Your order has been placed successfully.",
        invoicePath
      );
    }

    // ===============================
    // 💸 REFUND SUCCESS
    // ===============================
    if (event.event === "refund.processed") {
      const refund = event.payload.refund.entity;

      console.log("💸 Refund success:", refund.id);

      const order = await Order.findOne({
        paymentId: refund.payment_id,
      });

      if (order) {
        const amount = refund.amount / 100;

        // ✅ update total refunded
        order.refundedAmount += amount;

        // ✅ push history
        order.refundHistory.push({
          amount: amount,
          razorpayRefundId: refund.id,
        });

        // ✅ update status
        if (order.refundedAmount >= order.totalAmount) {
          order.status = "Refunded";
        } else {
          order.status = "Partially Refunded";
        }

        await order.save();

        console.log("✅ Refund updated in DB");
      }
    }

    res.status(200).send("OK");

  } catch (error) {
    console.log("Webhook Error:", error);
    res.status(500).send("Server Error");
  }
};


// ==============================
// ⭐ REFUND API
// ==============================
export const refundPayment = async (req, res) => {
  try {
    const { paymentId, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const refund = await razorpay.payments.refund(paymentId, {
      amount: order.totalAmount * 100,
    });

    console.log("💸 Refund initiated:", refund.id);

    // ✅ initial status
    order.status = "Refund Initiated";
    await order.save();

    res.json({
      success: true,
      message: "Refund started",
    });

  } catch (error) {
    console.log("❌ Refund error:", error);
    res.status(500).json({ message: "Refund failed" });
  }
};


// ==============================
// ⭐ VERIFY (NOT USED)
// ==============================
export const verifyPayment = async (req, res) => {
  return res.status(200).json({
    message: "Webhook handles payment",
  });
};