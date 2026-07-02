import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar({
  darkMode,
  toggleDarkMode,
  cartItems = [],
  user,
  handleLogout,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = location.pathname === "/";
  const navbarBg = isHomePage
    ? scrolled
      ? "bg-white text-black"
      : "bg-transparent text-white"
    : "bg-white text-black";

  const cartCount =
    cartItems?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

  return (
    <nav
      className={`fixed top-0 w-full flex items-center justify-between px-6 py-4 transition-all duration-300 shadow-md z-50 ${navbarBg}`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-3">
        <span className="material-icons text-red-600 text-3xl">fastfood</span>
        <h1 className="text-2xl font-bold text-red-600">SnapEats</h1>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 ml-auto">
        <ul className="flex space-x-6 text-lg font-medium">

          {/* ADMIN DASHBOARD (only if logged in as admin) */}
          {user?.role === "admin" && (
            <li>
              <Link
                to="/admin"
                className="text-blue-600 font-semibold hover:text-blue-800"
              >
                Admin Dashboard
              </Link>
            </li>
          )}

          <li>
            <Link to="/menu" className="hover:text-yellow-500">
              Food Items
            </Link>
          </li>

          <li>
            <Link
              to="/offers"
              className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 text-white font-semibold hover:scale-105 transition-transform"
            >
              Offers
            </Link>
          </li>

          <li>
            <Link to="/hotels" className="hover:text-yellow-500">
              Restaurant
            </Link>
          </li>

          <li>
            <Link to="/orders" className="hover:text-yellow-500">
              My Orders
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          {/* USER */}
          {user ? (
            <div className="relative group">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold cursor-pointer">
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </div>

              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="px-3 py-2 bg-red-600 text-white rounded-md">
                Login
              </Link>

              <Link to="/signup" className="px-3 py-2 bg-red-600 text-white rounded-md">
                Sign Up
              </Link>

              {/* ✅ ADDED ADMIN BUTTON */}
              <Link to="/admin-login" className="px-3 py-2 bg-black text-white rounded-md">
                Admin
              </Link>
            </>
          )}

          {/* CART */}
          <button
            onClick={() => navigate("/cart")}
            className="relative px-3 py-2 bg-red-600 text-white rounded-md"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* DARK MODE */}
          <button
            onClick={toggleDarkMode}
            className="px-3 py-2 bg-gray-200 rounded-md"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU BUTTON */}
      <div className="md:hidden ml-auto flex items-center gap-2">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="absolute top-full right-0 w-60 bg-white shadow-lg p-4 flex flex-col gap-3 md:hidden">

          {user?.role === "admin" && (
            <Link to="/admin" onClick={() => setMenuOpen(false)}>
              Admin Dashboard
            </Link>
          )}

          <Link to="/menu" onClick={() => setMenuOpen(false)}>Food Items</Link>
          <Link to="/offers" onClick={() => setMenuOpen(false)}>Offers</Link>
          <Link to="/hotels" onClick={() => setMenuOpen(false)}>Hotels</Link>
          <Link to="/orders" onClick={() => setMenuOpen(false)}>My Orders</Link>

          {user ? (
            <>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/admin-login">Admin</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}