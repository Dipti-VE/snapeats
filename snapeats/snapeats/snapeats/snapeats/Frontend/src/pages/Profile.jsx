import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-80 text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-red-600 text-white text-4xl flex items-center justify-center mb-4">
          {user.name[0].toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{user.email}</p>
        <button
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.href = "/"; // Redirect to homepage after logout
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
