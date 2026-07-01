import React,{useEffect,useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminProducts(){

 const [products,setProducts] = useState([]);
 const navigate = useNavigate();

 const fetchProducts = async()=>{

  const res = await axios.get("http://127.0.0.1:5000/api/products");

  setProducts(res.data);

 };

 useEffect(()=>{
  fetchProducts();
 },[]);


 const deleteProduct = async(id)=>{

  await axios.delete(`http://127.0.0.1:5000/api/products/${id}`);

  fetchProducts();

 };

 return(

  <div className="p-10">

   <h1 className="text-2xl font-bold mb-6">
    Manage Products
   </h1>

   {/* 🔥 FIX 1: Add button moved here */}
   <button
     onClick={()=>navigate("/admin/add-product")}
     className="bg-green-600 text-white px-4 py-2 mb-4 rounded"
   >
     Add Product
   </button>

   <table className="w-full border">

    <thead className="bg-gray-200">
     <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Action</th>
     </tr>
    </thead>

    <tbody>

     {/* 🔥 FIX 2: Empty check */}
     {products.length === 0 ? (
      <tr>
        <td colSpan="3" className="text-center py-4">
          No products found
        </td>
      </tr>
     ) : (

      products.map(p=>(

       <tr key={p._id} className="border-t text-center">

        <td>{p.name}</td>
        <td>{p.price}</td>

        <td className="space-x-3">

          <button
            onClick={() => navigate(`/admin/view-product/${p._id}`)}
            className="text-green-600"
          >
            View
          </button>

          <button
  onClick={() => navigate(`/admin/add-product/${p._id}`)}
  className="text-blue-600"
>
  Edit
</button>
          <button
            onClick={()=>deleteProduct(p._id)}
            className="text-red-600"
          >
            Delete
          </button>

        </td>
       </tr>

      ))

     )}

    </tbody>

   </table>

  </div>

 )
}