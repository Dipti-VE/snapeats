import express from "express";
import FoodItem from "../models/Product.js";

const router = express.Router();

// Get all menu items
router.get("/", async (req, res) => {
  try {
    const items = await FoodItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new food item (admin only, optional)
router.post("/", async (req, res) => {
  try {
    const newItem = await FoodItem.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

