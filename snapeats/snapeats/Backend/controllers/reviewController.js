import Review from "../models/Review.js";

export const addReview = async (req, res) => {
  try {
    const { rating, comment, restaurantId } = req.body;

    const review = new Review({
      user: req.user._id,
      restaurant: restaurantId,
      rating: Number(rating),
      comment,
    });

    await review.save();

    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      restaurant: req.params.id,
    }).populate("user", "name");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};