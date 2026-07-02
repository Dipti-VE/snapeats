import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminRestaurants(){

 const [restaurants, setRestaurants] = useState([]);
 const navigate = useNavigate();

 // 🔹 Fetch restaurants
 const fetchRestaurants = async () => {
  try {
   const res = await axios.get("http://127.0.0.1:4000/api/restaurants");
   setRestaurants(res.data);
  } catch (err) {
   console.log(err);
  }
 };

 useEffect(() => {
  fetchRestaurants();
 }, []);

 // 🔹 Delete restaurant
 const deleteRestaurant = async (id) => {
  try {
   await axios.delete(`http://127.0.0.1:4000/api/restaurants/${id}`);
   alert("Restaurant deleted");
   fetchRestaurants(); // refresh
  } catch (err) {
   console.log(err);
  }
 };

 return (

  <div className="p-10">

   <h1 className="text-3xl font-bold mb-6">
    Manage Restaurants
   </h1>

   {/* ⭐ ADD BUTTON */}
   <button
    onClick={() => navigate("/admin/add-restaurant")}
    className="bg-green-600 text-white px-4 py-2 mb-6 rounded"
   >
    Add Restaurant
   </button>

   {/* ⭐ LIST */}
   {restaurants.length === 0 ? (
    <p>No restaurants found</p>
   ) : (
    restaurants.map((r) => (

     <div
      key={r._id}
      className="border p-4 mb-4 rounded shadow bg-white"
     >

      <h2 className="text-xl font-bold">{r.name}</h2>

      <p className="text-gray-600">
       📍 {r.location}
      </p>

      <p className="mt-2">
       {r.description}
      </p>

      {/* ⭐ IMAGE */}
      {r.image && (
       <img
        src={`http://127.0.0.1:4000/uploads/${r.image}`}
        alt={r.name}
        className="mt-3 w-48 rounded"
       />
      )}

      {/* ⭐ ACTION */}
      <div className="mt-4">

       <button
        onClick={() => deleteRestaurant(r._id)}
        className="bg-red-600 text-white px-4 py-2 rounded"
       >
        Delete
       </button>

      </div>

     </div>

    ))
   )}

  </div>

 );
}