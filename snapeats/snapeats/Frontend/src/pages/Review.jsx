import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Review = () => {
  const { id } = useParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReview = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/reviews/add",
        {
          rating,
          comment,
          restaurantId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Review submitted ❤️");
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

      <h2 className="text-2xl font-bold text-center mb-4">
        Rate Your Order ⭐
      </h2>

      {/* ⭐ Stars */}
      <div className="flex justify-center mb-4">
        {[1,2,3,4,5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className={`text-3xl cursor-pointer ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* 💬 Comment */}
      <textarea
        placeholder="Write your experience..."
        className="w-full border p-3 rounded mb-4"
        onChange={(e) => setComment(e.target.value)}
      />

      {/* Submit */}
      <button
        onClick={submitReview}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Submit Review
      </button>
    </div>
  </div>
);
};

export default Review;