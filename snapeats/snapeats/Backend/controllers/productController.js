import Product from "../models/Product.js";
import redisClient from "../utils/redisClient.js";

console.log("✅ NEW productController loaded");
console.log("Redis Client:", redisClient);

// ==============================
// ADD PRODUCT
// ==============================
export const addProduct = async (req, res) => {
  try {
    console.log("📦 Upload File:", req.file);
    console.log("Redis Client:", redisClient);

    const { name, price, category, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Name and price are required",
      });
    }

    const image = req.file ? req.file.filename : null;

    const product = new Product({
      name,
      price,
      category,
      description,
      images: image ? [image] : [],
    });

    await product.save();

    // Clear Redis cache only if Redis is enabled
    if (redisClient) {
      await redisClient.del("products");
    }

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("❌ Add Product Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// GET PRODUCTS
// ==============================
export const getProducts = async (req, res) => {
  try {
    console.log("Redis Client:", redisClient);

    let cachedProducts = null;

    if (redisClient) {
      cachedProducts = await redisClient.get("products");
    }

    if (cachedProducts) {
      console.log("⚡ Serving products from Redis");
      return res.json(JSON.parse(cachedProducts));
    }

    const products = await Product.find();

    console.log("🐢 Serving products from MongoDB");

    if (redisClient) {
      await redisClient.setEx(
        "products",
        60,
        JSON.stringify(products)
      );
    }

    return res.json(products);
  } catch (error) {
    console.error("❌ Get Products Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
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

    if (image) {
      updatedData.images = [image];
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (redisClient) {
      await redisClient.del("products");
    }

    return res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("❌ Update Product Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// DELETE PRODUCT
// ==============================
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    if (redisClient) {
      await redisClient.del("products");
    }

    return res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete Product Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};