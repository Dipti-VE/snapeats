import React from "react";

// Import reusable components
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import PopularDishes from "../components/PopularDishes";

/**
 * Home Page
 * - Visible to everyone (guest or logged in)
 * - Lets users browse & add items to cart
 */
export default function Home({ onAddToCart }) {
  return (
    <div className="bg-light dark:bg-dark text-dark dark:text-light min-h-screen">
      {/* 🏠 Hero Section */}
      <Hero />

      {/* 🍽️ Categories Section */}
      <Categories />

      {/* 🍕 Popular Dishes Section (pass onAddToCart) */}
      <PopularDishes onAddToCart={onAddToCart} />
    </div>
  );
}
