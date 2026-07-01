import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation
} from "react-router-dom";

import axios from "axios";

import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import FoodItem from "./pages/FoodItems";
import Offers from "./pages/Offers";
import Hotel from "./pages/Hotel";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import RestaurantDetails from "./pages/RestaurantDetails";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";
import AdminViewProduct from "./pages/AdminViewProduct";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminRestaurants from "./pages/AdminRestaurants";
import Review from "./pages/Review";
import AdminAddRestaurant from "./pages/AdminAddResturant";
import AdminLayout from "./pages/AdminLayout";
import AdminLogin from "./pages/AdminLogin";

// ================================
// WRAPPER
// ================================
export default function AppWrapper() {
  return (
    <Router>
      <MainApp />

      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#fff",
            color: "#322986",
            fontSize: "15px",
            borderRadius: "10px",
          },
        }}
      />
    </Router>
  );
}

// ================================
// MAIN APPLICATION
// ================================
function MainApp() {

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ ADD THIS
  const isAdminPage = location.pathname.startsWith("/admin");
  const isReviewPage = location.pathname.startsWith("/review");

  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // USER STATE
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  // CART STATE
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cartItems")) || [];
    } catch {
      return [];
    }
  });

  // SAVE CART
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ADD TO CART
  const handleAddToCart = (item) => {

    if (!user) {
      toast.error("Please login to add items!");
      return navigate("/login");
    }

    setCartItems((prev) => {

      const exist = prev.find((i) => i.id === item.id);

      if (exist) {
        toast.success("Quantity updated!");
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      toast.success("Added to cart!");
      return [...prev, { ...item, quantity: 1 }];

    });
  };
  const handleRemove = (id) => {
  const updated = cartItems.filter((item) => item.id !== id);
  setCartItems(updated);
};

  // CLEAR CART
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  // LOGOUT
  const handleLogout = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      if (user?.id) {
        await axios.post("http://127.0.0.1:5000/api/auth/logout", {
          userId: user.id
        });
      }
    } catch (err) {
      console.log("Logout API error:", err);
    }

    setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    toast.success("Logged out!");

    navigate("/login");
  };

  // PRIVATE ROUTE
  const PrivateRoute = ({ children }) =>
    user ? children : <Navigate to="/login" replace />;

  // RESTRICT ROUTE
  const RestrictedRoute = ({ children }) =>
    user ? children : <Navigate to="/login" replace />;

  return (

    <div
      className={`${
        darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      } min-h-screen`}
    >

      {/* ✅ HIDE NAVBAR ON ADMIN + REVIEW */}
      {!isAdminPage && !isReviewPage && (
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          cartItems={cartItems}
          user={user}
          handleLogout={handleLogout}
        />
      )}

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />

        
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />

        {/* REVIEW PAGE */}
        <Route path="/review/:id" element={<Review />} />

        {/* ADMIN EXTRA */}
        <Route path="/admin/view-product/:id" element={<AdminViewProduct />} />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/admin/add-product/:id" element={<AdminAddProduct />} />
        <Route path="/admin/add-restaurant" element={<AdminAddRestaurant />} />
        <Route path="/admin-login" element={<AdminLogin setUser={setUser} />} />

        {/* PROTECTED */}
        <Route
          path="/menu"
          element={
            <RestrictedRoute>
              <FoodItem onAddToCart={handleAddToCart} />
            </RestrictedRoute>
          }
        />

        <Route
          path="/offers"
          element={
            <RestrictedRoute>
              <Offers onAddToCart={handleAddToCart} />
            </RestrictedRoute>
          }
        />

        <Route
          path="/hotels"
          element={
            <RestrictedRoute>
              <Hotel onAddToCart={handleAddToCart} />
            </RestrictedRoute>
          }
        />

        <Route
  path="/cart"
  element={
    <Cart
      cartItems={cartItems}
      setCartItems={setCartItems}   
      handleRemove={handleRemove}
      user={user}
    />
  }
/>

        <Route
          path="/restaurant/:id"
          element={<RestaurantDetails onAddToCart={handleAddToCart} />}
        />

        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout cartItems={cartItems} clearCart={clearCart} />
            </PrivateRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <Payment clearCart={clearCart} />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="products" element={<AdminProducts />} />
  <Route path="orders" element={<AdminOrders />} />
  <Route path="users" element={<AdminUsers />} />
  <Route path="restaurants" element={<AdminRestaurants />} />
</Route>

        {/* USER ORDERS */}
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />

        <Route
          path="/orders/details/:orderId"
          element={
            <PrivateRoute>
              <OrderDetails />
            </PrivateRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

      {/* ✅ HIDE FOOTER ON ADMIN + REVIEW */}
      {!isAdminPage && !isReviewPage && <Footer />}

    </div>
  );
}