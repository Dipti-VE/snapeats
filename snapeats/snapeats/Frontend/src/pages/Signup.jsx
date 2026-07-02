import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const BASE_URL = "http://127.0.0.1:5000";

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/signup`, {
        name,
        email,
        mobile,
      });

      setMessage(res.data.message || "Account created successfully!");
      setError("");

      // redirect to login after 1.5 sec
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.log(err);

      if (err.response) {
        setError(err.response.data?.message || "Signup failed");
      } else {
        setError("Cannot connect to server");
      }

      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">

        <h2 className="text-2xl font-bold text-center mb-4">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-3">{error}</p>
        )}

        {message && (
          <p className="text-green-600 text-center mb-3">{message}</p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">

          <input
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border p-3 rounded"
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded"
          >
            Create Account
          </button>

        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
}