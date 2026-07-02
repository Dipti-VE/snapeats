import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },

  items: [
    {
      id: String,
      name: String,
      image: String,
      price: Number,
      quantity: Number
    }
  ],

  userDetails: {
    name: String,
    email: String,
    contact: String,
    address: String,
    city: String,
    pincode: String
  },

  totalAmount: Number,
  paymentId: String,
  orderId: String,

  // ✅ PAYMENT STATUS
  payment: {
    type: Boolean,
    default: false
  },

  // ✅ ORDER STATUS
  status: {
    type: String,
    default: "Pending"
  },

  // ✅ REFUND TOTAL
  refundedAmount: {
    type: Number,
    default: 0
  },

  // ✅ REFUND HISTORY (LIKE YOUR FRIEND)
  refundHistory: [
    {
      amount: Number,
      razorpayRefundId: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],

  invoice: { type: String },

  createdAt: { type: Date, default: Date.now }

});

export default mongoose.model("Order", orderSchema);