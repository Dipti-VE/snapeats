import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  category: {
    type: String
  },

  price: {
    type: Number,
    required: true
  },

  stock: {
    type: Number,
    default: 0
  },

  images: [
    {
      type: String
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Product", productSchema);