import React, { useRef } from "react";
import pizza from "../assets/pizza-big.jpg";
import burger from "../assets/burger.jpg";
import biryani from "../assets/biryani.jpg";
import sweets from "../assets/sweets.jpg";
import fried from "../assets/fried-chicken.jpg";
import thali from "../assets/thali.jpg";
import dosa from "../assets/dosa.jpg";
import cake from "../assets/cake.jpg";
import pasta from "../assets/pasta.jpg";
import poori from "../assets/poori.jpg";
import rice from "../assets/fried-rice.jpg";
import idli from "../assets/idli.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  { id: 1, name: "Pizza", image: pizza },
  { id: 2, name: "Burgers", image: burger },
  { id: 3, name: "Biryani", image: biryani },
  { id: 4, name: "Sweets", image: sweets },
  { id: 5, name: "Fried Chicken", image: fried },
  { id: 6, name: "Thali", image: thali },
  { id: 7, name: "Dosa", image: dosa },
  { id: 8, name: "Cake", image: cake },
  { id: 9, name: "Pasta", image: pasta },
  { id: 10, name: "Poori", image: poori },
  { id: 11, name: "Fried Rice", image: rice },
  { id: 12, name: "Idli", image: idli },
];

export default function Categories() {
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
        Categories
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
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="relative aspect-square w-[180px] rounded-xl overflow-hidden flex-shrink-0 hover:scale-105 transition-all"
        >
          <img
            src={cat.image}
            alt={cat.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2 text-white text-center">
            <h3 className="text-sm font-semibold">{cat.name}</h3>
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
