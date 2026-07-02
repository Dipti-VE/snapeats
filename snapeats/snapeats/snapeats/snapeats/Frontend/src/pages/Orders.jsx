import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔹 Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/api/orders/user/${encodeURIComponent(
          user.email
        )}`
      );
      setOrders(res.data);
    } catch (err) {
      console.error("Error loading orders:", err);
    }
  };

  useEffect(() => {
  if (user) fetchOrders();
}, []);  
  
  const cancelOrder = async (id) => {
    try {
      await axios.post("http://127.0.0.1:5000/api/orders/cancel", {
        orderId: id,
      });

      alert("Refund started 💸");
      fetchOrders();

    } catch (err) {
      console.log(err);
      alert("Cancel failed");
    }
  };

  if (!user) {
    return (
      <h2 className="text-center mt-32 text-xl font-semibold">
        Please log in to view your orders.
      </h2>
    );
  }

  return (
    <div className="pt-32 p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center mt-6 text-gray-600 text-lg">
          You have no orders yet.
        </p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md border rounded-lg p-5"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-gray-500 text-sm">ORDER ID</p>
                  <p className="font-semibold text-gray-800">{order.orderId}</p>
                </div>

                <div className="text-right">
                  <p className="text-gray-500 text-sm">ORDER DATE</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="border-t my-3"></div>

              {/* ITEMS */}
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 py-4 border-b last:border-none"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded object-cover border"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    <p className="mt-1 font-bold text-green-600 text-lg">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* STATUS */}
                  <p
                    className={`font-semibold px-3 py-1 rounded-full text-sm 
                      ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Preparing"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "Out for Delivery"
                          ? "bg-purple-100 text-purple-700"
                          : order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Refund Initiated"
                          ? "bg-orange-100 text-orange-700"
                          : order.status === "Refunded"
                          ? "bg-green-200 text-green-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {order.status || "Pending"}
                  </p>
                </div>
              ))}

              {/* Footer */}
              <div className="flex justify-between items-center mt-4">

                <p className="font-semibold text-lg">
                  Total: ₹{order.totalAmount}
                </p>

                <div className="flex gap-3">

                  {/* VIEW DETAILS */}
                  <button
                    onClick={() =>
                      navigate(`/orders/details/${order._id}`)
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    View Details
                  </button>

                  {/* ❌ CANCEL BUTTON */}
                  {order.status === "Refunded" ? (
                    <span className="text-green-600 font-semibold">
                      Refunded
                    </span>

                  ) : order.status === "Refund Initiated" ? (
                    <span className="text-orange-500 font-semibold">
                      Processing...
                    </span>

                  ) : order.status === "Delivered" ? (
                    <span className="text-gray-500">
                      Cannot Cancel
                    </span>

                  ) : (
                    <button
                      onClick={() => cancelOrder(order._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  )}

                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}