import Restaurant from "../models/Restaurant.js";
import redisClient from "../utils/redisClient.js";

// ==============================
// ADD RESTAURANT
// ==============================
export const addRestaurant = async (req, res) => {
  try {
    const { name, description, location } = req.body;
    const image = req.file ? req.file.filename : null;

    const restaurant = new Restaurant({
      name,
      description,
      location,
      image,
    });

    await restaurant.save();

    // 🔥 clear cache
    await redisClient.del("restaurants");

    res.json({
      success: true,
      message: "Restaurant added",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// GET RESTAURANTS (WITH REDIS)
// ==============================
export const getRestaurants = async (req, res) => {
  try {
    const cachedData = await redisClient.get("restaurants");

    if (cachedData) {
      console.log("Serving from Redis ⚡");
      return res.json(JSON.parse(cachedData));
    }

    const restaurants = await Restaurant.find();

    await redisClient.setEx(
      "restaurants",
      60,
      JSON.stringify(restaurants)
    );

    console.log("Serving from MongoDB 🐢");

    res.json(restaurants);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// DELETE RESTAURANT
// ==============================
export const deleteRestaurant = async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);

    // 🔥 clear cache
    await redisClient.del("restaurants");

    res.json({
      success: true,
      message: "Restaurant deleted",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};