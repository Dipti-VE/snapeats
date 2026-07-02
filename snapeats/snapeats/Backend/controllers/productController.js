import Product from "../models/Product.js";
import redisClient from "../utils/redisClient.js";


// ==============================
// ADD PRODUCT
// ==============================
export const addProduct = async (req, res) => {
 try {

  console.log(req.file);   // debug

  const { name, price, category, description } = req.body;

  // 🔥 validation (added)
  if (!name || !price) {
    return res.status(400).json({ message: "Name and price required" });
  }

  const image = req.file ? req.file.filename : null;

  const product = new Product({
   name,
   price,
   category,
   description,
   images: image ? [image] : []
  });

  await product.save();

  // 🔥 clear cache
  await redisClient.del("products");

  res.json({
   success: true,
   message: "Product added successfully"
  });

 } catch (error) {
  console.log(error);
  res.status(500).json({ message: "Server error" });
 }
};


// ==============================
// GET ALL PRODUCTS
// ==============================
export const getProducts = async (req, res) => {
  try {

    const cachedProducts = await redisClient.get("products");

    // 🔥 only use cache if NOT empty
    if (cachedProducts && JSON.parse(cachedProducts).length > 0) {
      console.log("Serving from Redis ⚡");
      return res.json(JSON.parse(cachedProducts));
    }

    const products = await Product.find();

    console.log("Serving from MongoDB 🐢");
    console.log("Products from DB:", products); // 🔥 debug

    // 🔥 store in Redis
    await redisClient.setEx("products", 60, JSON.stringify(products));

    res.json(products);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
// ==============================
// UPDATE PRODUCT
// ==============================
export const updateProduct = async (req, res) => {
  try {

    const { name, price, category, description } = req.body;

    const image = req.file ? req.file.filename : null;

    const updatedData = {
      name,
      price,
      category,
      description,
    };

    // ✅ update image only if new uploaded
    if (image) {
      updatedData.images = [image];
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    // 🔥 clear cache
    await redisClient.del("products");

    res.json({
      success: true,
      product
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Update failed" });
  }
};

// ==============================
// DELETE PRODUCT
// ==============================
export const deleteProduct = async (req, res) => {

  try {

    await Product.findByIdAndDelete(req.params.id);

    // 🔥 clear cache
    await redisClient.del("products");

    res.json({
      success: true,
      message: "Product deleted"
    });

  } catch (err) {

    console.log(err);
    res.status(500).json({ message: "Server error" });

  }

};