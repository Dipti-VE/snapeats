import React,{useEffect,useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AdminViewProduct(){

 const {id} = useParams();
 const [product,setProduct] = useState(null);

 const fetchProduct = async()=>{

  const res = await axios.get("http://127.0.0.1:5000/api/products");

  const found = res.data.find(p => p._id === id);

  setProduct(found);

 };

 useEffect(()=>{
  fetchProduct();
 },[]);

 if(!product){
  return <h1 className="p-10">Loading...</h1>
 }

 return(

  <div className="p-10">

   <h1 className="text-2xl font-bold mb-6">
    Product Details
   </h1>

   <p><b>Name:</b> {product.name}</p>
   <p><b>Price:</b> {product.price}</p>
   <p><b>Category:</b> {product.category}</p>
   <p><b>Description:</b> {product.description}</p>

   {product.images && product.images.length > 0 && (
  <img
    src={`http://127.0.0.1:5000/uploads/${product.images[0]}`}
    alt={product.name}
    className="mt-4 w-64 rounded"
  />
)}
  </div>

 )
}