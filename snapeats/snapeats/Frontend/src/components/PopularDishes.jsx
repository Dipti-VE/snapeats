import React, { useRef } from "react";
import pizza from "../assets/margherita-pizza.jpg";
import fried from "../assets/fried-chicken.jpg";
import biryani from "../assets/biryani.jpg";
import cake from "../assets/chocolate-cake.jpg";
import samosa from "../assets/samosa.jpg";
import manchurian from "../assets/manchurian.jpg";
import chowmein from "../assets/chowmein.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ Each dish now has a price & category (optional for cart)
const dishes = [
  { id: 1, name: "Margherita Pizza", price: 299, image: pizza },
  { id: 2, name: "Fried Chicken", price: 249, image: fried },
  { id: 3, name: "Biryani", price: 199, image: biryani },
  { id: 4, name: "Chocolate Cake", price: 149, image: cake },
  { id: 5, name: "Samosa", price: 49, image: samosa },
  { id: 6, name: "Manchurian", price: 179, image: manchurian },
  { id: 7, name: "Chowmein", price: 159, image: chowmein },
];

export default function PopularDishes({ onAddToCart }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 bg-cream dark:bg-gray-900 relative">
      <h2 className="text-2xl font-bold text-center mb-8 text-red-600 dark:text-orange-400">
        Popular Dishes
      </h2>

      <style>{`
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="relative flex justify-center items-center">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:scale-110 transition z-10"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Scrollable container */}
        <div className="w-full max-w-[1200px] overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth"
          >
            {dishes.map((dish) => (
              <div
                key={dish.id}
                className="relative aspect-square w-[220px] rounded-xl overflow-hidden flex-shrink-0 hover:scale-105 transition-all bg-white dark:bg-gray-800 shadow-md"
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-[150px] object-cover"
                />
                <div className="p-3 flex flex-col justify-between h-[110px]">
                  <h3 className="text-sm font-semibold">{dish.name}</h3>
                  <p className="text-red-600 font-bold">₹{dish.price}</p>

                  {/* ✅ Add to Cart Button */}
                  <button
                    onClick={() => onAddToCart(dish)}
                    className="mt-2 bg-red-600 hover:bg-red-700 text-white py-1 rounded-lg text-sm transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:scale-110 transition z-10"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </section>
  );
}
