import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:4000/api/orders/details/${orderId}`
        );
        setOrder(res.data);
      } catch (err) {
        console.error("Order details error:", err);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <h2 className="pt-32 text-center">Loading...</h2>;
  }

  return (
    <div className="pt-32 p-6 min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">

        <h1 className="text-2xl font-bold mb-4 text-center">Order Details</h1>

        <p className="font-semibold">
          Order ID: {order?.orderId || "N/A"}
        </p>

        <p>
          Date: {order?.createdAt
            ? new Date(order.createdAt).toLocaleString()
            : "N/A"}
        </p>

        <p>
          Payment ID: {order?.paymentId || "N/A"}
        </p>

        <div className="border-t my-4"></div>

        <h2 className="text-xl font-bold mb-2">Items</h2>

        {order?.items?.length > 0 ? (
          order.items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 py-3 border-b">
              <img
                src={item.image}
                className="w-16 h-16 rounded border"
                alt="item"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p>Qty: {item.quantity}</p>
                <p className="text-green-600 font-bold">₹{item.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No items found</p>
        )}

        <div className="border-t my-4"></div>

        <h2 className="text-xl font-bold mb-2">Delivery Details</h2>

        <p>
          <strong>Name:</strong>{" "}
          {order?.userDetails?.name || "N/A"}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {order?.userDetails?.contact || "N/A"}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {order?.userDetails?.email || "N/A"}
        </p>

        {/* ✅ CLEAN ADDRESS FORMAT */}
        <p>
          <strong>Address:</strong>{" "}
          {order?.userDetails?.address || "N/A"}
          {order?.userDetails?.city && `, ${order.userDetails.city}`}
          {order?.userDetails?.pincode && ` - ${order.userDetails.pincode}`}
        </p>

        <div className="border-t my-4"></div>

        <h2 className="text-2xl font-bold text-green-600">
          Total Paid: ₹{order?.totalAmount || 0}
        </h2>

        {/* ✅ INVOICE BUTTONS */}
        {order?.invoice && (
          <div className="mt-6 text-center">

            <a
              href={`http://127.0.0.1:4000${order.invoice}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-3"
            >
              View Invoice
            </a>

            <a
              href={`http://127.0.0.1:4000/api/orders/download/${order.invoice.split("/").pop()}`}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Download Invoice
            </a>

          </div>
        )}

      </div>
    </div>
  );
}