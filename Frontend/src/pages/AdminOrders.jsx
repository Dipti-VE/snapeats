import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/orders"); // ✅ FIXED
      setOrders(res.data);
    } catch (error) {
      console.log("Error fetching orders", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status (existing)
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:4000/api/admin/orders/${id}`,
        { status }
      );
      fetchOrders();
    } catch (error) {
      console.log("Error updating status", error);
    }
  };

  // ❌ CANCEL ORDER (NEW 🔥)
  const cancelOrder = async (id) => {
    try {
      await axios.post("http://localhost:4000/api/orders/cancel", {
        orderId: id,
      });

      alert("Refund started 💸");
      fetchOrders();

    } catch (error) {
      console.log("Cancel error", error);
      alert("Cancel failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Orders 📦</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>Order ID: {order._id}</h3>

            <p>
              <b>Email:</b> {order.userEmail}
            </p>

            <p>
              <b>Total Amount:</b> ₹{order.totalAmount}
            </p>

            {/* ✅ STATUS */}
            <p>
              <b>Status:</b>{" "}
              
              {order.status === "Refunded" ? (
                <span style={{ color: "green", fontWeight: "bold" }}>
                  Refunded
                </span>

              ) : order.status === "Refund Initiated" ? (
                <span style={{ color: "orange", fontWeight: "bold" }}>
                  Refund Processing...
                </span>

              ) : (
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Out for Delivery">
                    Out for Delivery
                  </option>
                  <option value="Delivered">Delivered</option>
                </select>
              )}
            </p>

            {/* ❌ CANCEL BUTTON */}
            <div style={{ marginTop: "10px" }}>
              {order.status === "Refunded" ? (
                <span style={{ color: "green" }}>✔ Done</span>
              ) : order.status === "Refund Initiated" ? (
                <span style={{ color: "orange" }}>Processing...</span>
              ) : (
                <button
                  onClick={() => cancelOrder(order._id)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Cancel Order
                </button>
              )}
            </div>

            {/* ITEMS */}
            <div>
              <b>Items:</b>
              <ul>
                {order.items?.map((item, index) => (
                  <li key={index}>
                    {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        ))
      )}
    </div>
  );
}