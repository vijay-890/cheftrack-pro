import express from "express";
import Recipe from "../models/Recipe.js";
import User from "../models/User.js";

const router = express.Router();

// 1. GET ALL RECIPES
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ level: 1 });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. COMPLETE LEVEL & UPGRADE USER (Handles both _id and guest id safely)
router.post("/complete", async (req, res) => {
  try {
    const { userId, recipeId } = req.body;

    // Check if valid Mongo ID or guest user
    let user = null;
    if (userId && userId !== "guest-id" && userId !== "guest-1") {
      user = await User.findById(userId);
    }

    if (user) {
      if (!user.completedRecipes.includes(recipeId)) {
        user.completedRecipes.push(recipeId);
        user.currentLevel = Number(user.currentLevel) + 1;
        await user.save();
      }
      return res.status(200).json({
        message: "Level Completed and Saved to DB! 🚀",
        currentLevel: user.currentLevel,
        completedRecipes: user.completedRecipes,
      });
    } else {
      // Guest fallback response so frontend never crashes or hangs
      return res.status(200).json({
        message: "Guest Level Progress Tracked Locally",
        currentLevel: 3,
        completedRecipes: [recipeId, "rec-1", "rec-2"],
      });
    }
  } catch (error) {
    console.error("Backend Complete Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// In-memory or Schema-backed review storage
let reviewsDatabase = [
  {
    recipeId: "rec-1",
    author: "Karthik R",
    rating: 5,
    note: "Perfect balance of ginger and milk. Followed 2-minute brew time!",
    createdAt: new Date().toLocaleDateString(),
  },
  {
    recipeId: "rec-2",
    author: "Ananya",
    rating: 4,
    note: "Egg podimas came out extremely fluffy. Low flame makes all the difference.",
    createdAt: new Date().toLocaleDateString(),
  }
];

// GET REVIEWS FOR A RECIPE
router.get("/:id/reviews", (req, res) => {
  const { id } = req.params;
  const filtered = reviewsDatabase.filter((r) => r.recipeId === id);
  res.status(200).json(filtered);
});

// POST NEW REVIEW / NOTE
router.post("/:id/reviews", (req, res) => {
  const { id } = req.params;
  const { author, rating, note } = req.body;

  const newReview = {
    recipeId: id,
    author: author || "Guest Cook",
    rating: Number(rating) || 5,
    note,
    createdAt: new Date().toLocaleDateString(),
  };

  reviewsDatabase.unshift(newReview);
  res.status(201).json(newReview);
}); 

export default router;