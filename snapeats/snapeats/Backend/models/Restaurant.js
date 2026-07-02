import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({

 name:{
  type:String,
  required:true
 },

 description:{
  type:String
 },

 location:{
  type:String
 },

 image:{
  type:String
 },

 createdAt:{
  type:Date,
  default:Date.now
 }

});

export default mongoose.model("Restaurant", restaurantSchema);