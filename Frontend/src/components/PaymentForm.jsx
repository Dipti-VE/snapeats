import React, { useState } from "react";

export default function PaymentForm({ clearCart }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();

    if (cardNumber && expiry && cvv && name) {
      // Fake loading
      setTimeout(() => {
        clearCart();      // 🔥 Clear cart on payment success
        setIsPaid(true);  // Show success UI
      }, 1000);
    } else {
      alert("Please fill in all fields!");
    }
  };

  if (isPaid) {
    return (
      <div className="text-center mt-8">
        <h2 className="text-2xl font-semibold text-green-600">
          Payment Successful ✅
        </h2>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase!
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handlePayment}
      className="max-w-md mx-auto mt-8 p-6 shadow-lg rounded-2xl bg-white"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Payment Details
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Cardholder Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 5678 9012 3456"
          maxLength="19"
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-gray-700 mb-1">Expiry Date</label>
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
            maxLength="5"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 mb-1">CVV</label>
          <input
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            maxLength="3"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
      >
        Pay Now
      </button>
    </form>
  );
}
