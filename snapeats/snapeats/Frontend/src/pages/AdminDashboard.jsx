import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard(){

 const navigate = useNavigate();

 // 🔥 SAFE PARSE (FIXED)
 let user = null;

 try {
  user = JSON.parse(localStorage.getItem("user"));
 } catch (err) {
  user = null;
 }

 // 🔒 Protect admin route
 if(!user || user.role !== "admin"){
  navigate("/login");   // 🔥 redirect instead of text
  return null;
 }

 return(

  <div className="flex min-h-screen bg-gray-100">

   {/* Sidebar */}
   <div className="w-64 bg-black text-white p-6">

    <h2 className="text-2xl font-bold mb-10">
      Admin Panel
    </h2>

    <ul className="space-y-6">

     <li
      className="cursor-pointer hover:text-red-400"
      onClick={()=>navigate("/admin/users")}
     >
      Users
     </li>

     <li
      className="cursor-pointer hover:text-red-400"
      onClick={()=>navigate("/admin/products")}
     >
      Products
     </li>

     <li
      className="cursor-pointer hover:text-red-400"
      onClick={()=>navigate("/admin/orders")}
     >
      Orders
     </li>

     <li
      className="cursor-pointer hover:text-red-400"
      onClick={()=>navigate("/admin/restaurants")}
     >
      Restaurants
     </li>

    </ul>

   </div>

   {/* Main content */}
   <div className="flex-1 p-10">

    <h1 className="text-3xl font-bold mb-8">
     Welcome Admin
    </h1>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

     {/* PRODUCTS */}
     <div
      onClick={()=>navigate("/admin/products")}
      className="bg-white p-6 rounded shadow cursor-pointer hover:scale-105 transition"
     >
      <h2 className="text-xl font-bold">Products</h2>
      <p>Manage food items</p>
     </div>

     {/* ORDERS */}
     <div
      onClick={()=>navigate("/admin/orders")}
      className="bg-white p-6 rounded shadow cursor-pointer hover:scale-105 transition"
     >
      <h2 className="text-xl font-bold">Orders</h2>
      <p>View customer orders</p>
     </div>

     {/* USERS */}
     <div
      onClick={()=>navigate("/admin/users")}
      className="bg-white p-6 rounded shadow cursor-pointer hover:scale-105 transition"
     >
      <h2 className="text-xl font-bold">Users</h2>
      <p>Registered customers</p>
     </div>

     {/* RESTAURANTS */}
     <div
      onClick={()=>navigate("/admin/restaurants")}
      className="bg-white p-6 rounded shadow cursor-pointer hover:scale-105 transition"
     >
      <h2 className="text-xl font-bold">Restaurants</h2>
      <p>Manage restaurants</p>
     </div>

    </div>

   </div>

  </div>

 )
}