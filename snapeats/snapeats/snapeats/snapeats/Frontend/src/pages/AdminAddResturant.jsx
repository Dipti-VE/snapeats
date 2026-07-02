import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminAddRestaurant(){

 const navigate = useNavigate();

 const [name, setName] = useState("");
 const [location, setLocation] = useState("");
 const [description, setDescription] = useState("");
 const [image, setImage] = useState(null);

 // 🔹 Submit function
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {

   const formData = new FormData();

   formData.append("name", name);
   formData.append("location", location);
   formData.append("description", description);
   formData.append("image", image);

   await axios.post(
    "http://127.0.0.1:5000/api/restaurants/add",
    formData
   );

   alert("Restaurant Added Successfully 🎉");

   window.location.href = "/admin/restaurants";
  } catch (err) {
   console.log(err);
   alert("Error adding restaurant");
  }
 };

 return (

  <div className="p-10">

   <h1 className="text-3xl font-bold mb-6">
    Add Restaurant
   </h1>

   <form onSubmit={handleSubmit} className="space-y-4">

    {/* NAME */}
    <input
     type="text"
     placeholder="Restaurant Name"
     value={name}
     onChange={(e) => setName(e.target.value)}
     className="w-full border p-3 rounded"
     required
    />

    {/* LOCATION */}
    <input
     type="text"
     placeholder="Location"
     value={location}
     onChange={(e) => setLocation(e.target.value)}
     className="w-full border p-3 rounded"
    />

    {/* DESCRIPTION */}
    <textarea
     placeholder="Description"
     value={description}
     onChange={(e) => setDescription(e.target.value)}
     className="w-full border p-3 rounded"
    />

    {/* IMAGE */}
    <input
     type="file"
     onChange={(e) => setImage(e.target.files[0])}
     className="w-full"
    />

    {/* BUTTON */}
    <button
     type="submit"
     className="bg-green-600 text-white px-6 py-2 rounded"
    >
     Add Restaurant
    </button>

   </form>

  </div>

 );
}