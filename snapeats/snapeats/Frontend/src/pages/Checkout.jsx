import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Checkout({
  cartItems,
  handleRemove,
  handleQuantityChange,
  clearCart,
}) {
  const navigate = useNavigate();

  const loggedUser = JSON.parse(localStorage.getItem("user")); // ⭐ IMPORTANT
  const [showForm, setShowForm] = useState(false);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: loggedUser?.email || "", // ⭐ Always use login email
    contact: "",
    address: "",
    city: "",
    pincode: "",
  });

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};


const handlePayment = async () => {
  const loaded = await loadRazorpayScript();

  if (!loaded) {
    alert("Failed to load Razorpay SDK");
    return;
  }

  try {
    // ✅ SEND EMAIL + CART TO BACKEND (for webhook)
    const { data: order } = await axios.post(
      "http://127.0.0.1:4000/api/payment/create-order",
      {
        amount: total,
        email: loggedUser.email,
        cartItems: cartItems,
        userDetails: userDetails,
      }
    );

    const options = {
      key: "rzp_test_T8E3O32kArQpcW",
      amount: order.amount,
      currency: order.currency,
      name: "SnapEats",
      description: "Order Payment",
      order_id: order.id,

      // ✅ NO VERIFY API NOW (WEBHOOK WILL HANDLE)
      handler: function () {
        alert("Payment Successful ✅");

        clearCart();

        const restaurantId = cartItems[0]?.restaurantId;

        navigate(`/review/${restaurantId}`);
      },

      prefill: {
        name: userDetails.name,
        email: loggedUser.email,
        contact: userDetails.contact,
      },

      theme: {
        color: "#16a34a",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

  } catch (error) {
    console.log("Payment Error:", error);
    alert("Something went wrong");
  }
};  const handleSubmit = (e) => {
    e.preventDefault();
    handlePayment();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 px-8 pb-8">
      <h2 className="text-3xl font-bold text-center mb-6">Your Cart</h2>

      <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center py-3 border-b">
            <div className="flex gap-4 items-center">
              <img src={item.image} className="w-16 h-16 rounded" />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p>₹{item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>

              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 font-semibold"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <h2 className="text-xl font-bold text-right mt-4">Total: ₹{total}</h2>

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-green-600 text-white py-3 mt-4 rounded"
          >
            Proceed to Pay
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
              required
              className="w-full border p-2 rounded"
            />

            <input
              type="tel"
              name="contact"
              placeholder="Mobile Number"
              value={userDetails.contact}
              onChange={(e) =>
                setUserDetails({ ...userDetails, contact: e.target.value })
              }
              required
              className="w-full border p-2 rounded"
            />

            <textarea
              name="address"
              placeholder="Full Address"
              value={userDetails.address}
              onChange={(e) =>
                setUserDetails({ ...userDetails, address: e.target.value })
              }
              required
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={userDetails.city}
              onChange={(e) =>
                setUserDetails({ ...userDetails, city: e.target.value })
              }
              required
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={userDetails.pincode}
              onChange={(e) =>
                setUserDetails({ ...userDetails, pincode: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <button className="w-full bg-green-600 text-white py-3 rounded">
              Pay ₹{total}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
