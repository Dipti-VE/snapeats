import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const restaurantData = [
  {
    id: 1,
    name: "Noodles",
    area: "Howrah",
    image:
      "https://img.freepik.com/premium-photo/bar-with-sign-that-says-cafe_1273293-5152.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 2,
    name: "chicken peri peri",
    area: "Kolkata",
    image:
      "https://static1.squarespace.com/static/5134cbefe4b0c6fb04df8065/5dcb2d0669b294381f8ffb16/619e7c8606c2b2230c1c0810/1760113749404/?format=1500w",
  },
  {
    id: 3,
    name: "Noodles",
    area: "Bally",
    image:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/delicious-food-corner-template-design-77b3b6d3d683e1d5695b44beb99005d1_screen.jpg?ts=1693906366",
  },
  {
    id: 4,
    name: "Pizza",
    area: "Liluah",
    image:
      "https://st4.depositphotos.com/4590583/21856/i/450/depositphotos_218562984-stock-photo-set-pizza-black-wooden-background.jpg",
  },
  {
    id: 5,
    name: "Sandwich",
    area: "Kolkata",
    image:
      "https://content3.jdmagicbox.com/comp/hojai/v4/9999p3674.3674.220417005330.v5v4/catalogue/forks-and-spoons-hojai-hojai-fast-food-9o4u42hbmv.jpg",
  },
];


export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const restaurant = restaurantData.find((r) => r.id === Number(id));

  const handleAddToCart = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      // ❌ If not logged in → show red toast and redirect
      toast.error("Please sign up to add items to cart!");
      setTimeout(() => navigate("/signup"), 1200);
      return;
    }

    // ✅ If logged in → show success toast
    toast.success(`${restaurant.name} added to cart!`);
  };

  if (!restaurant) {
    return (
      <div className="text-center py-20 text-gray-600">
        Restaurant not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light dark:bg-dark text-dark dark:text-light py-12 text-center">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        {/* Restaurant Image */}
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-72 object-cover rounded-xl mb-6"
        />

        {/* Restaurant Info */}
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          {restaurant.name}
        </h2>
        <p className="text-gray-500 mb-3">{restaurant.area}</p>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {restaurant.description}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
