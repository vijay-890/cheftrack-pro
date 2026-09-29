import mongoose from "mongoose";

// Recipe schema with multi-language support (English, Tamil, Hindi)
const recipeSchema = new mongoose.Schema({
  recipeId: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: Number,
    required: true,
  },
  tier: {
    type: String,
    enum: ["beginner", "intermediate"],
    default: "beginner",
  },
  category: {
    type: String,
    default: "Veg",
  },
  title: {
    en: { type: String, required: true },
    ta: { type: String, required: true },
    hi: { type: String, required: true },
  },
  description: {
    en: { type: String, required: true },
    ta: { type: String, required: true },
    hi: { type: String, required: true },
  },
  steps: {
    en: [{ type: String, required: true }],
    ta: [{ type: String, required: true }],
    hi: [{ type: String, required: true }],
  },
});

export default mongoose.model("Recipe", recipeSchema);