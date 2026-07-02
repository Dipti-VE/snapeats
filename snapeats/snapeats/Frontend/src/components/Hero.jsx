import React, { useState } from "react";

// 🏨 Sample restaurant data with images
const restaurants = [
  {
    id: 1,
    name: "Bridge View Rooftop Hotel",
    area: "Howrah",
    image:
      "https://img.freepik.com/premium-photo/bar-with-sign-that-says-cafe_1273293-5152.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 2,
    name: "The Royal Dine",
    area: "Kolkata",
    image:
      "https://static1.squarespace.com/static/5134cbefe4b0c6fb04df8065/5dcb2d0669b294381f8ffb16/619e7c8606c2b2230c1c0810/1760113749404/?format=1500w",
  },
  {
    id: 3,
    name: "Flames",
    area: "Bally",
    image:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/delicious-food-corner-template-design-77b3b6d3d683e1d5695b44beb99005d1_screen.jpg?ts=1693906366",
  },
  {
    id: 4,
    name: "Pizza Hut",
    area: "Liluah",
    image:
      "https://st4.depositphotos.com/4590583/21856/i/450/depositphotos_218562984-stock-photo-set-pizza-black-wooden-background.jpg",
  },
  {
    id: 5,
    name: "Spoon & Fork Cafe",
    area: "Kolkata",
    image:
      "https://content3.jdmagicbox.com/comp/hojai/v4/9999p3674.3674.220417005330.v5v4/catalogue/forks-and-spoons-hojai-hojai-fast-food-9o4u42hbmv.jpg",
  },
];

export default function Hero() {
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  // 🔍 Handle Search
  const handleSearch = (e) => {
    e.preventDefault();

    const loc = location.toLowerCase().trim();
    const q = query.toLowerCase().trim();

    // 🚫 Stop if both fields are empty
    if (!loc && !q) {
      setError("Please enter a restaurant name or location to search!");
      setResults([]);
      return;
    }

    setError("");

    // ✅ Filter logic
    const filtered = restaurants.filter((r) => {
      const matchesLocation = loc ? r.area.toLowerCase().includes(loc) : true;
      const matchesName = q ? r.name.toLowerCase().includes(q) : true;
      return matchesLocation && matchesName;
    });

    if (filtered.length === 0) {
      setError("No restaurants are available in this location!");
    }

    setResults(filtered);
  };

  return (
    <section className="bg-cream dark:bg-gray-900 py-12 text-center transition-all">
      <h1 className="text-4xl font-bold text-red-600 dark:text-orange-400 mb-4">
        Delicious Food Delivered To You 🍽️
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Find the best restaurants near you — fresh, fast, and flavorful!
      </p>

      {/* 🔍 Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center gap-2 flex-wrap px-4"
      >
        <input
          type="text"
          placeholder="Enter your delivery location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-4 py-3 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 dark:bg-gray-800 dark:text-light"
        />
        <input
          type="text"
          placeholder="Search for restaurant, item or more"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-3 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 dark:bg-gray-800 dark:text-light"
        />
        <button
          type="submit"
          disabled={!location.trim() && !query.trim()}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            !location.trim() && !query.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          Search
        </button>
      </form>

      {/* 🌸 Clean Text Error Message */}
      {error && (
        <div className="flex justify-center mt-10 animate-fadeIn">
          <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 border border-red-200 dark:border-gray-700 rounded-xl shadow-sm p-5 w-[90%] md:w-[450px] text-center">
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">
              {error}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
              Try searching with another location or restaurant name.
            </p>
          </div>
        </div>
      )}

      {/* 🍴 Results */}
      <div className="mt-10 flex flex-wrap justify-center gap-6 px-4">
        {results.length > 0 &&
          results.map((r) => (
            <div
              key={r.id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden w-64 border border-gray-200 dark:border-gray-700 transition hover:scale-105"
            >
              <img
                src={r.image}
                alt={r.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-red-600 dark:text-orange-400">
                  {r.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {r.area}
                </p>
                <button
                  onClick={() => (window.location.href = `/restaurant/${r.id}`)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-full"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* ✨ Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out;
          }
        `}
      </style>
    </section>
  );
}
