import express from "express";
import {
  createOrder,
  verifyPayment,
  handleWebhook,
  refundPayment
} from "../controllers/PaymentController.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);

// ⭐ FINAL FIXED WEBHOOK
router.post(
  "/webhook",
  express.raw({ type: "*/*" }), // ✅ IMPORTANT FIX
  handleWebhook
);

router.post("/refund", refundPayment);

export default router;