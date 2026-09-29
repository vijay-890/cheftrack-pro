import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";

dotenv.config();

const app = express();

// Production CORS Configuration
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

// Root health check endpoint for Render
app.get("/", (req, res) => {
  res.send("ChefTrack Pro Backend API is Live and Running 🚀");
});

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cheftrack";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB 🟢");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error 🔴:", err);
  });