import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";

import authRoutes from "./routes/auth.js";
import menuRoutes from "./routes/menu.js";
import paymentRoutes from "./routes/PaymentRoute.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import User from "./models/User.js";
import { checkActiveUsers } from "./utils/engagementMailer.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==============================
// CORS
// ==============================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
      process.env.FRONTEND_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ==============================
// WEBHOOK (MUST BE BEFORE JSON)
// ==============================
app.use("/api/payment/webhook", express.raw({ type: "*/*" }));

// ==============================
// JSON
// ==============================
app.use(express.json());

// ==============================
// STATIC FILES
// ==============================
app.use("/uploads", express.static("uploads"));
app.use("/invoices", express.static("invoices"));

// ==============================
// LOGGER
// ==============================
app.use((req, res, next) => {
  console.log(`API Hit → ${req.method} ${req.url}`);
  next();
});

// ==============================
// ROUTES
// ==============================
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);

// ==============================
// CREATE DEFAULT ADMIN
// ==============================
const createAdmin = async () => {
  try {
    const adminEmail = "admin@gmail.com";

    const existingAdmin = await User.findOne({
      email: adminEmail,
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      mobile: "9999999999",
      role: "admin",
    });

    console.log("✅ Default Admin Created");
  } catch (error) {
    console.log("Admin creation error:", error);
  }
};

// ==============================
// DATABASE
// ==============================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");
    console.log("DB Name:", mongoose.connection.name);
    console.log("DB Host:", mongoose.connection.host);

    await createAdmin();

    setInterval(() => {
      checkActiveUsers();
    }, 60000);
  })
  .catch((err) => console.log("MongoDB Error:", err));

// ==============================
// ROOT
// ==============================
app.get("/", (req, res) => {
  res.send("SnapEats Backend Running 🚀");
});

// ==============================
// START SERVER
// ==============================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});