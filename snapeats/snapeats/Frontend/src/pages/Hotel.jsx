import React, { useState, useEffect } from "react";
import axios from "axios";

// ⭐ STATIC DATA (your old data)
import pizza from "../assets/paneer-pizza.jpg";
import burger from "../assets/veggie-burger.jpg";
import biryani from "../assets/veg-biryani.jpg";
import noodles from "../assets/noodles.jpg";
import gulabJamun from "../assets/gulab-jamun.jpg";
import rasmalai from "../assets/rasmalai.jpg";
import coldCoffee from "../assets/cold-coffee.jpg";

const staticHotels = [
  {
    id: 1,
    name: "Skylark Hotel, Howrah",
    type: "Luxury",
    rating: 4.0,
    image: biryani,
    location: "Howrah",
    description: "Luxury stay with great food",
    amenities: ["WiFi", "Pool"],
    calories: 480,
    carbs: "55g",
    protein: "30g",
    fat: "18g",
  },
  {
    id: 2,
    name: "Barbeque Nation",
    type: "Buffet",
    rating: 4.3,
    image: pizza,
    location: "Howrah",
    description: "Unlimited buffet",
    amenities: ["Buffet"],
    calories: 520,
    carbs: "65g",
    protein: "25g",
    fat: "20g",
  },
  {
    id: 3,
    name: "Cafe By Lane",
    type: "Cafe",
    rating: 4.4,
    image: coldCoffee,
    location: "Howrah",
    description: "Coffee & snacks",
    amenities: ["Cafe"],
    calories: 320,
    carbs: "38g",
    protein: "8g",
    fat: "10g",
  },
];

export default function Hotel() {

  const [dbHotels, setDbHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null);

  // ⭐ FETCH FROM BACKEND
  const fetchHotels = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/restaurants");
      setDbHotels(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // ⭐ MERGE STATIC + DB
  const allHotels = [
    ...staticHotels,
    ...dbHotels.map((h) => ({
      id: h._id,
      name: h.name,
      type: "Restaurant",
      rating: 4.0,
      image: `http://127.0.0.1:5000/uploads/${h.image}`,
      location: h.location,
      description: h.description,
      amenities: ["Food Available"],
      calories: 400,
      carbs: "40g",
      protein: "20g",
      fat: "15g",
    })),
  ];

  // ⭐ FILTER
  const filteredHotels = allHotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen bg-gray-50 pt-24 pb-16">

      <h2 className="text-3xl font-bold text-center mb-6">
        Restaurants & Hotels
      </h2>

      {/* SEARCH */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">

        {filteredHotels.map((hotel) => (

          <div
            key={hotel.id}
            className="bg-white rounded-xl shadow hover:scale-105 transition"
          >

            {/* IMAGE */}
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">

              <h3 className="text-xl font-bold">
                {hotel.name}
              </h3>

              <p className="text-gray-500">
                📍 {hotel.location}
              </p>

              <button
                onClick={() => setSelectedHotel(hotel)}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded"
              >
                View Details
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* MODAL */}
      {selectedHotel && (

        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">

          <div className="bg-white p-6 rounded-lg w-96">

            <h2 className="text-2xl font-bold">
              {selectedHotel.name}
            </h2>

            <p className="mt-2">{selectedHotel.description}</p>
            <p>📍 {selectedHotel.location}</p>

            <img
              src={selectedHotel.image}
              className="mt-4 w-full rounded"
            />

            <button
              onClick={() => setSelectedHotel(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}