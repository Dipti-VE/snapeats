import express from "express";
import { addReview, getReviews } from "../controllers/reviewController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add review
router.post("/add", authMiddleware, addReview);

// Get reviews
router.get("/:id", getReviews);

export default router;