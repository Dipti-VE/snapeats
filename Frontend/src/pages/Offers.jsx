import React from "react";

// Reuse assets
import pizza from "../assets/paneer-pizza.jpg";
import burger from "../assets/veggie-burger.jpg";
import samosa from "../assets/samosa.jpg";
import gulabJamun from "../assets/gulab-jamun.jpg";
import mojito from "../assets/mojito.jpg";
import palakPaneer from "../assets/palak-paneer.jpg";
import biryaniVeg from "../assets/veg-biryani.jpg";
import noodles from "../assets/noodles.jpg";
import rasmalai from "../assets/rasmalai.jpg";
import coldCoffee from "../assets/cold-coffee.jpg";
import cheesecake from "../assets/cheesecake.jpg";
import orangeJuice from "../assets/orange-juice.jpg";

const offers = [
  {
    id: 1,
    name: "Paneer Pizza",
    originalPrice: 200,
    offerPrice: 150,
    image: pizza,
    tag: "25% OFF",
  },
  {
    id: 2,
    name: "Veggie Burger",
    originalPrice: 120,
    offerPrice: 80,
    image: burger,
    tag: "BUY 1 GET 1",
  },
  {
    id: 3,
    name: "Samosa Plate (4 pcs)",
    originalPrice: 80,
    offerPrice: 50,
    image: samosa,
    tag: "LIMITED TIME",
  },
  {
    id: 4,
    name: "Gulab Jamun (6 pcs)",
    originalPrice: 120,
    offerPrice: 90,
    image: gulabJamun,
    tag: "HOT DEAL",
  },
  {
    id: 5,
    name: "Mojito",
    originalPrice: 150,
    offerPrice: 110,
    image: mojito,
    tag: "20% OFF",
  },
  {
    id: 6,
    name: "Palak Paneer Combo",
    originalPrice: 250,
    offerPrice: 199,
    image: palakPaneer,
    tag: "COMBO OFFER",
  },
  {
    id: 7,
    name: "Veg Biryani Family Pack",
    originalPrice: 350,
    offerPrice: 280,
    image: biryaniVeg,
    tag: "FAMILY DEAL",
  },
  {
    id: 8,
    name: "Schezwan Noodles",
    originalPrice: 180,
    offerPrice: 140,
    image: noodles,
    tag: "LIMITED TIME",
  },
  {
    id: 9,
    name: "Rasmalai (2 pcs)",
    originalPrice: 100,
    offerPrice: 70,
    image: rasmalai,
    tag: "DESSERT DEAL",
  },
  {
    id: 10,
    name: "Cold Coffee",
    originalPrice: 90,
    offerPrice: 60,
    image: coldCoffee,
    tag: "SUMMER SPECIAL",
  },
   {
    id: 11,
    name: "Cheesecake Slice",
    originalPrice: 180,
    offerPrice: 140,
    image: cheesecake,
    tag: "SWEET DEAL",
  },
  {
    id: 12,
    name: "Orange Juice",
    originalPrice: 100,
    offerPrice: 70,
    image: orangeJuice,
    tag: "FRESH DEAL",
  },
];

export default function Offers() {
  return (
    <div className="min-h-screen bg-yellow-50 dark:bg-gray-900 text-gray-900 dark:text-white pt-24 pb-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-yellow-700 dark:text-yellow-400">
        Special Offers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {offers.map((item) => (
          <div
            key={item.id}
            className="relative rounded-xl overflow-hidden shadow-lg hover:scale-105 transform transition-all"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover"
            />

            {/* Tag */}
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
              {item.tag}
            </span>

            {/* Details */}
            <div className="p-4 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <div className="flex items-center gap-3 mt-2">
                <p className="text-gray-500 line-through">
                  ₹{item.originalPrice}
                </p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  ₹{item.offerPrice}
                </p>
              </div>
              <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium">
                Grab Deal
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}