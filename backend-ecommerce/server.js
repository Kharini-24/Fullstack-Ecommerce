import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

import productRoutes from "./routes/productRoutes.js";

import dotenv from "dotenv";
import connectDB from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js"
import subscriberRoutes from "./routes/subscriberRoutes.js";


dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", subscriberRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend working without DB 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
