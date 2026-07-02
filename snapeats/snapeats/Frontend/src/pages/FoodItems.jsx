import React, { useState, useEffect } from "react";
import axios from "axios";

// --- Import images ---
import pizza from "../assets/paneer-pizza.jpg";
import burger from "../assets/veggie-burger.jpg";
import samosa from "../assets/samosa.jpg";
import springRolls from "../assets/spring-rolls.jpg";
import garlicBread from "../assets/garlic-bread.jpg";
import butterChicken from "../assets/butter-chicken.jpg";
import biryaniVeg from "../assets/veg-biryani.jpg";
import biryaniChicken from "../assets/chicken-biryani.jpg";
import palakPaneer from "../assets/palak-paneer.jpg";
import dalTadka from "../assets/dal-tadka.jpg";
import choleBhature from "../assets/chole-bhature.jpg";
import noodles from "../assets/noodles.jpg";
import friedRice from "../assets/fried-rice.jpg";
import gulabJamun from "../assets/gulab-jamun.jpg";
import iceCream from "../assets/ice-cream.jpg";
import cheesecake from "../assets/cheesecake.jpg";
import brownie from "../assets/brownie.jpg";
import rasgulla from "../assets/rasgulla.jpg";
import mojito from "../assets/mojito.jpg";
import chai from "../assets/chai.jpg";
import coldCoffee from "../assets/cold-coffee.jpg";
import mangoShake from "../assets/mango-shake.jpg";
import orangeJuice from "../assets/orange-juice.jpg";
import hotChocolate from "../assets/hot-chocolate.jpg";
import paneertikka from "../assets/paneer-tikka.jpg";
import rasmalai from "../assets/rasmalai.jpg";
import chickenmanchurian from "../assets/chicken-manchurian.jpg";

const menuItems = [
  { id: 1, name: "Paneer Pizza", image: pizza, price: 250, rating: 4.5, category: "Starters", type: "Vegetarian",restaurantId: "resto123", description: "Cheesy pizza loaded with paneer cubes and veggies." },
  { id: 2, name: "Veggie Burger", image: burger, price: 180, rating: 4., category: "Starters", type: "Vegetarian",restaurantId: "resto123", description: "Crispy veggie patty with lettuce and sauce." },
  { id: 3, name: "Samosa", image: samosa, price: 50, rating: 4, category: "Starters", type: "Vegetarian",restaurantId: "resto123", description: "Crispy fried pastry stuffed with spicy potato filling." },
  { id: 4, name: "Spring Rolls", image: springRolls, price: 120, rating: 3.5, category: "Starters", type: "Vegetarian",restaurantId: "resto123", description: "Crispy rolls filled with vegetables." },
  { id: 5, name: "Garlic Bread", image: garlicBread, price: 80, rating: 4, category: "Starters", type: "Vegetarian",restaurantId: "resto123", description: "Toasted bread with garlic butter." },
  { id: 6, name: "Paneer Tikka", image: paneertikka, price: 220, rating: 4, category: "Starters", type: "Vegetarian",restaurantId: "resto123", description: "Grilled paneer marinated in spices." },

  { id: 7, name: "Butter Chicken", image: butterChicken, price: 350, rating: 4.5, category: "Main Course", type: "Non-Vegetarian",restaurantId: "resto123", description: "Chicken pieces in creamy tomato gravy." },
  { id: 8, name: "Veg Biryani", image: biryaniVeg, price: 180, rating: 3.5, category: "Main Course", type: "Vegetarian",restaurantId: "resto123", description: "Fragrant rice with vegetables." },
  { id: 9, name: "Chicken Biryani", image: biryaniChicken, price: 300, rating: 4, category: "Main Course", type: "Non-Vegetarian",restaurantId: "resto123", description: "Rice cooked with spiced chicken." },
  { id: 10, name: "Palak Paneer", image: palakPaneer, price: 200, rating: 4, category: "Main Course", type: "Vegetarian",restaurantId: "resto123", description: "Paneer cubes in spinach sauce." },
  { id: 11, name: "Dal Tadka", image: dalTadka, price: 150, rating: 3, category: "Main Course", type: "Vegetarian",restaurantId: "resto123", description: "Yellow lentils tempered with spices." },
  { id: 12, name: "Chole Bhature", image: choleBhature, price: 220, rating: 3, category: "Main Course", type: "Vegetarian",restaurantId: "resto123", description: "Chickpeas served with fried bread." },
  { id: 13, name: "Veg Fried Rice", image: friedRice, price: 150, rating: 4, category: "Main Course", type: "Vegetarian",restaurantId: "resto123", description: "Rice stir-fried with vegetables." },
  { id: 14, name: "Schezwan Noodles", image: noodles, price: 180, rating: 4, category: "Main Course", type: "Vegetarian",restaurantId: "resto123", description: "Spicy noodles with sauce." },
  { id: 15, name: "Chicken Manchurian", image: chickenmanchurian, price: 280, rating: 4, category: "Main Course", type: "Non-Vegetarian",restaurantId: "resto123", description: "Crispy chicken balls in sauce." },

  { id: 16, name: "Gulab Jamun", image: gulabJamun, price: 80, rating: 4.5, category: "Desserts", type: "Vegetarian",restaurantId: "resto123", description: "Milk dumplings soaked in syrup." },
  { id: 17, name: "Ice Cream Sundae", image: iceCream, price: 120, rating: 4.5, category: "Desserts", type: "Vegetarian",restaurantId: "resto123", description: "Ice cream with chocolate topping." },
  { id: 18, name: "Cheesecake", image: cheesecake, price: 180, rating: 4.5, category: "Desserts", type: "Vegetarian",restaurantId: "resto123", description: "Rich cheesecake dessert." },
  { id: 19, name: "Chocolate Brownie", image: brownie, price: 150, rating: 4, category: "Desserts", type: "Vegetarian",restaurantId: "resto123", description: "Moist chocolate brownie." },
  { id: 20, name: "Rasgulla", image: rasgulla, price: 80, rating: 4, category: "Desserts", type: "Vegetarian",restaurantId: "resto123", description: "Spongy sweet balls." },
  { id: 21, name: "Rasmalai", image: rasmalai, price: 100, rating: 5, category: "Desserts", type: "Vegetarian",restaurantId: "resto123", description: "Cottage cheese in saffron milk." },

  { id: 22, name: "Mojito", image: mojito, price: 90, rating: 4.5, category: "Drinks", type: "Vegetarian",restaurantId: "resto123", description: "Mint and lime drink." },
  { id: 23, name: "Masala Chai", image: chai, price: 40, rating: 5, category: "Drinks", type: "Vegetarian",restaurantId: "resto123", description: "Indian spiced tea." },
  { id: 24, name: "Cold Coffee", image: coldCoffee, price: 100, rating: 5, category: "Drinks", type: "Vegetarian",restaurantId: "resto123", description: "Chilled coffee drink." },
  { id: 25, name: "Mango Shake", image: mangoShake, price: 120, rating: 5, category: "Drinks", type: "Vegetarian",restaurantId: "resto123", description: "Sweet mango milkshake." },
  { id: 26, name: "Orange Juice", image: orangeJuice, price: 80, rating: 4, category: "Drinks", type: "Vegetarian",restaurantId: "resto123", description: "Fresh orange juice." },
  { id: 27, name: "Hot Chocolate", image: hotChocolate, price: 90, rating: 4.5, category: "Drinks", type: "Vegetarian",restaurantId: "resto123", description: "Warm chocolate drink." },
];

export default function Menu({ onAddToCart }) {

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedFood, setSelectedFood] = useState(null);
  const [adminProducts, setAdminProducts] = useState([]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const handleRate = async (productId) => {
  const userRating = prompt("Enter rating (1-5)");
  const comment = prompt("Enter comment");

  if (!userRating || userRating < 1 || userRating > 5) {
    return alert("Enter valid rating between 1 to 5");
  }

  try {
    const token = localStorage.getItem("token");

    await axios.post(
      `http://127.0.0.1:4000/api/products/${productId}/rate`,
      { rating: userRating, comment },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Rating added!");

  } catch (error) {
    alert(error.response?.data?.message || "Error");
  }
};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:4000/api/products");
        setAdminProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const allItems = [
    ...menuItems,
    ...adminProducts.map((p) => ({
      id: p._id,
      name: p.name,
      price: p.price,
      category: p.category || "Admin Items",
      type: "Admin",
      description: p.description,
      rating: p.averageRating || 4, // ⭐ IMPORTANT
      image: `http://127.0.0.1:4000/uploads/${p.images[0]}`
    }))
  ];

  const categories = ["All", "Starters", "Main Course", "Desserts", "Drinks", "Vegetarian", "Non-Vegetarian"];

  // ✅ FULL FILTER (IMPORTANT)
  const filteredItems = allItems.filter((item) => {

    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      filter === "All" || item.category === filter || item.type === filter;

    const matchesPrice =
      (!minPrice || item.price >= Number(minPrice)) &&
      (!maxPrice || item.price <= Number(maxPrice));

    const matchesRating =
      !rating || (item.rating || 4) >= Number(rating);

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  return (
    <div className="min-h-screen pt-24 pb-16">

      <h2 className="text-4xl font-bold text-center mb-8 text-green-700">
        Food Items
      </h2>

      {/* FILTERS */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">

        {/* Search */}
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />

        {/* Category */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          {categories.map((c, i) => (
            <option key={i}>{c}</option>
          ))}
        </select>

        {/* Price */}
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded"
        />

        {/* Rating */}
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Rating</option>
          <option value="4">4⭐ & above</option>
          <option value="3">3⭐ & above</option>
        </select>

      </div>

      {/* FOOD GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {filteredItems.map((dish) => (

          <div
            key={dish.id}
            className="bg-white shadow rounded overflow-hidden cursor-pointer"
            onClick={() => setSelectedFood(dish)}
          >

            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">

              <h3 className="text-lg font-semibold">{dish.name}</h3>

              <p className="text-green-600 font-semibold">
                ₹{dish.price}
              </p>

              {/* ⭐ Rating */}
              <p className="text-yellow-500">
                ⭐ {dish.rating || 4}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(dish);
                }}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>
              
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}