import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminAddProduct() {

 const navigate = useNavigate();
 const { id } = useParams(); // ✅ already added

 const [name,setName] = useState("");
 const [price,setPrice] = useState("");
 const [category,setCategory] = useState("");
 const [description,setDescription] = useState("");
 const [image,setImage] = useState(null);

 // 🔥 LOAD DATA FOR EDIT
 useEffect(() => {
  if (id) {
    const fetchProduct = async () => {
      const res = await axios.get("http://127.0.0.1:5000/api/products");
      const product = res.data.find(p => p._id === id);

      if (product) {
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setDescription(product.description);
      }
    };

    fetchProduct();
  }
 }, [id]);

 const handleSubmit = async(e)=>{

  e.preventDefault();

  const formData = new FormData();

  formData.append("name",name);
  formData.append("price",price);
  formData.append("category",category);
  formData.append("description",description);
  formData.append("image",image);

  try{

   if (id) {
    // 🔄 EDIT
    await axios.put(
      `http://127.0.0.1:5000/api/products/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    alert("Product updated successfully");

   } else {
    // ➕ ADD
    await axios.post(
      "http://127.0.0.1:5000/api/products/add",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    alert("Product added successfully");
   }

   navigate("/admin/products");

  }catch(err){
   console.log(err);
  }

 };

 return(

  <div className="p-10">

   <h1 className="text-2xl font-bold mb-6">
    {id ? "Edit Product" : "Add Product"} {/* 🔥 dynamic title */}
   </h1>

   <form onSubmit={handleSubmit} className="space-y-4">

    <input
     type="text"
     placeholder="Product Name"
     value={name}
     onChange={(e)=>setName(e.target.value)}
     className="border p-2 w-full"
    />

    <input
     type="number"
     placeholder="Price"
     value={price}
     onChange={(e)=>setPrice(e.target.value)}
     className="border p-2 w-full"
    />

    <input
     type="text"
     placeholder="Category"
     value={category}
     onChange={(e)=>setCategory(e.target.value)}
     className="border p-2 w-full"
    />

    <textarea
     placeholder="Description"
     value={description}
     onChange={(e)=>setDescription(e.target.value)}
     className="border p-2 w-full"
    />

    <input
     type="file"
     onChange={(e)=>setImage(e.target.files[0])}
     className="border p-2 w-full"
    />

    <button className="bg-green-600 text-white px-4 py-2 rounded">
     {id ? "Update Product" : "Add Product"} {/* 🔥 dynamic button */}
    </button>

   </form>

  </div>

 );
}