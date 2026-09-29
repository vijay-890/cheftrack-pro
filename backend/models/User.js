import mongoose from "mongoose";

// User details and gamified level tracking schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    currentLevel: {
      type: Number,
      default: 1, // Beginner starts at Level 1
    },
    completedRecipes: [
      {
        type: String, // Recipe IDs array (e.g. ['rec-1', 'rec-2'])
      },
    ],
  },
  {
    timestamps: true, // CreatedAt and UpdatedAt automatic-ah save aagum
  }
);

export default mongoose.model("User", userSchema);