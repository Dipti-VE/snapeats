import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cart({
  cartItems,
  setCartItems,
  handleRemove,
  user,
}) {
  const navigate = useNavigate();

  // 🧮 Total
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  // ➕ Increase quantity
  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updated);
  };

  // ➖ Decrease quantity
  const decreaseQty = (id) => {
    const updated = cartItems
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0); // remove if 0

    setCartItems(updated);
  };

  // Checkout
  const handleCheckoutClick = () => {
    if (!user) {
      alert("Please login or signup to proceed to checkout.");
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">
        🛒 Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          Your cart is empty. Add some delicious food!
        </p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
          
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>

                {/* ➕➖ Quantity controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-semibold text-red-600">
                  ₹{(item.price || 0) * item.quantity}
                </p>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="mt-6 flex justify-between items-center">
            <h3 className="text-xl font-bold">
              Total: ₹{subtotal.toFixed(2)}
            </h3>

            <button
              onClick={handleCheckoutClick}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}