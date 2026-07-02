import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const BASE_URL = "http://127.0.0.1:4000";

  // ======================
  // SEND OTP
  // ======================
  const sendOtp = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/send-otp`, {
        email   // ✅ only email
      });

      setMessage(res.data.message);
      setShowOtp(true);
    } catch (err) {
      console.log(err);
      setMessage("Error sending OTP");
    }
  };

  // ======================
  // VERIFY OTP
  // ======================
  const verifyOtp = async () => {
    try {
      console.log({ name, email, otp });

      const res = await axios.post(`${BASE_URL}/api/auth/verify-otp`, {
        name,
        email,
        otp   // ✅ no mobile
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);

      window.location.reload();

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        window.location.href = "/";
      }

    }catch (err) {
  console.log("Verify OTP Error:", err.response?.data);

  setMessage(
    err.response?.data?.message || "Verification failed"
  );
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-xl mb-4">Login with OTP</h2>

        {/* NAME */}
        <input
          type="text"
          placeholder="Enter Name"
          className="w-full p-2 border mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-2 border mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {!showOtp ? (
          <button
            onClick={sendOtp}
            className="w-full bg-blue-500 text-white p-2"
          >
            Send OTP
          </button>
        ) : (
          <>
            {/* OTP */}
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-2 border mb-2"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={verifyOtp}
              className="w-full bg-green-500 text-white p-2"
            >
              Verify OTP
            </button>
          </>
        )}

        <p className="text-center mt-2 text-red-500">{message}</p>

      </div>
    </div>
  );
}