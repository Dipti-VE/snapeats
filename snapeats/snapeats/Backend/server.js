import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import menuRoutes from "./routes/menu.js";
import paymentRoutes from "./routes/PaymentRoute.js";
import orderRoutes from "./routes/orderRoutes.js";
import User from "./models/User.js";
import productRoutes from "./routes/productRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ⭐ CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
      "https://nonpedigreed-zonia-demagogically.ngrok-free.dev"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ⭐ VERY IMPORTANT (WEBHOOK FIRST)
app.use("/api/payment/webhook", express.raw({ type: "*/*" }));

// ⭐ NORMAL JSON PARSER
app.use(express.json());

// ⭐ STATIC FILES
app.use("/uploads", express.static("uploads"));
app.use("/invoices", express.static("invoices"));

// ⭐ LOGGER
app.use((req, res, next) => {
  console.log(`API Hit → ${req.method} ${req.url}`);
  next();
});

// ⭐ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);
import { checkActiveUsers } from "./utils/engagementMailer.js";

 // every 1 min

// ⭐ CREATE DEFAULT ADMIN
const createAdmin = async () => {
  try {
    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";

    await User.deleteMany({ email: adminEmail });

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = new User({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      mobile: "9999999999",
      role: "admin"
    });

    await admin.save();

    console.log("✅ Admin created");
  } catch (error) {
    console.log("Admin creation error:", error);
  }
};

// ⭐ DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");
    

    // 🔥 ADD THESE 2 LINES
    console.log("👉 DB NAME:", mongoose.connection.name);
    console.log("👉 DB HOST:", mongoose.connection.host);

    await createAdmin();
    setInterval(() => {
  checkActiveUsers();
}, 60000);
  })
  .catch((err) => console.log("MongoDB Error:", err));
// ⭐ ROOT
app.get("/", (req, res) => {
  res.send("SnapEats backend running");
});

// ⭐ START SERVER
app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});