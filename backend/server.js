import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Namma create panna routes & models import panrom
import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import Recipe from "./models/Recipe.js";

import cors from "cors";

app.use(cors({
  origin: "*", // Production-ku all domains allow pannuvom
  credentials: true,
}));

// .env file-la irukka secret keys-ah load panna
dotenv.config();

const app = express();

// Middlewares (Frontend React kooda pesa & JSON data read panna)
app.use(cors());
app.use(express.json());

// API Routes connection
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

// Auto-Seed Data Logic (Database empty-ah irundha automatic ah 3 recipes varum)
const seedDefaultRecipes = async () => {
  try {
    const count = await Recipe.countDocuments();
    if (count === 0) { // Zero recipes irundha mattum pudhusa add pannum
      const initialDishes = [
        {
          recipeId: "rec-1",
          level: 1,
          tier: "beginner",
          category: "Beverage",
          title: {
            en: "Day 1: Perfect Indian Masala Tea",
            ta: "நாள் 1: சுவையான மசாலா டீ",
            hi: "दिन 1: स्वादिष्ट मसाला चाय",
          },
          description: {
            en: "Learn water boiling, tea brewing timing, and milk balance.",
            ta: "தண்ணீர் கொதிக்க வைப்பது, டீத்தூள் மற்றும் பால் அளவு கத்துக்கோங்க.",
            hi: "पानी उबालना, चाय पत्ती और दूध का सही अनुपात सीखें।",
          },
          steps: {
            en: [
              "Boil 1 cup water with crushed ginger and cardamom for 2 minutes.",
              "Add 1.5 teaspoons of tea powder and let it brew till deep color.",
              "Pour 1/2 cup fresh milk and 1 teaspoon sugar, boil twice and filter.",
            ],
            ta: [
              "1 கப் தண்ணீரில் இஞ்சி, ஏலக்காய் தட்டிப் போட்டு 2 நிமிடம் கொதிக்க வைக்கவும்.",
              "1.5 ஸ்பூன் டீத்தூள் சேர்த்து நல்ல நிறம் வரும் வரை கொதிக்க விடவும்.",
              "1/2 கப் பால் மற்றும் 1 ஸ்பூன் சர்க்கரை சேர்த்து, இருமுறை பொங்கி வந்ததும் வடிகட்டவும்.",
            ],
            hi: [
              "1 कप पानी में कुटी हुई अदरक और इलायची डालकर 2 मिनट उबालें।",
              "1.5 चम्मच चाय पत्ती डालें और गहरा रंग आने तक उबालें।",
              "1/2 कप दूध और 1 चम्मच चीनी डालें, दो बार उबाल आने पर छान लें।",
            ],
          },
        },
        {
          recipeId: "rec-2",
          level: 2,
          tier: "beginner",
          category: "Breakfast",
          title: {
            en: "Day 2: Fluffy Egg Podimas",
            ta: "நாள் 2: முட்டை பொடிமாஸ்",
            hi: "दिन 2: अंडा भुर्जी",
          },
          description: {
            en: "Learn gentle sautéing and heat control for fluffy eggs.",
            ta: "வெங்காயம் வதக்கல் மற்றும் சரியான சூட்டில் முட்டை கிளறும் பதம்.",
            hi: "प्याज भूनना और सही आंच पर अंडा पकाना सीखें।",
          },
          steps: {
            en: [
              "Heat 1 tbsp oil in a pan, sauté chopped onions and green chillies.",
              "Crack 2 eggs directly into the pan, add salt and pinch of turmeric.",
              "Stir softly on medium flame for 3 minutes until fully cooked.",
            ],
            ta: [
              "1 ஸ்பூன் எண்ணெய் ஊற்றி நறுக்கிய வெங்காயம், பச்சை மிளகாய் வதக்கவும்.",
              "2 முட்டைகளை உடைத்து ஊற்றி, உப்பு, சிறிதளவு மஞ்சள் தூள் சேர்க்கவும்.",
              "மிதமான தீயில் 3 நிமிடங்கள் மென்மையாக கிளறி இறக்கவும்.",
            ],
            hi: [
              "कढ़ाई में 1 चम्मच तेल गरम करें, बारीक कटा प्याज और मिर्च भूनें।",
              "2 अंडे फोड़कर डालें, नमक और थोड़ी सी हल्दी मिलाएं।",
              "मध्यम आंच पर 3 मिनट तक हल्के से चलाते हुए पकाएं।",
            ],
          },
        },
        {
          recipeId: "rec-3",
          level: 3,
          tier: "intermediate",
          category: "South Indian",
          title: {
            en: "Intermediate: Traditional Pepper Rasam",
            ta: "நடுத்தர நிலை: கிராமத்து மிளகு ரசம்",
            hi: "मध्यम स्तर: पारंपरिक काली मिर्च रसम",
          },
          description: {
            en: "Immunity-rich aromatic soup with tamarind and fresh crushed spices.",
            ta: "புளி, மிளகு, சீரகம் கொண்டு செய்யப்படும் பாரம்பரிய ஆரோக்கிய ரசம்.",
            hi: "इम्युनिटी बढ़ाने वाली पारंपरिक और स्वादिष्ट रसम।",
          },
          steps: {
            en: [
              "Crush whole black pepper, cumin seeds, and garlic coarsely.",
              "Mix tamarind juice with chopped tomatoes and salt in a bowl.",
              "Temper mustard seeds in ghee, pour mixture, turn off stove right when froth appears.",
            ],
            ta: [
              "மிளகு, சீரகம், பூண்டை அம்மியில் அல்லது மிக்ஸியில் கொரகொரப்பாக அரைக்கவும்.",
              "புளித்தண்ணீரில் தக்காளி, உப்பு சேர்த்து கைகளால் நன்றாக பிசைந்து கொள்ளவும்.",
              "நெய்யில் கடுகு தாளித்து கலவையை ஊற்றவும்; நுரை கூடி வரும் போதே அடுப்பை அணைக்கவும்.",
            ],
            hi: [
              "काली मिर्च, जीरा और लहसुन को दरदरा पीस लें।",
              "इमली के पानी में टमाटर और नमक डालकर अच्छी तरह मिला लें।",
              "घी में सरसों का तड़का लगाएं, मिश्रण डालें और झाग आते ही गैस बंद कर दें।",
            ],
          },
        }
      ];
      await Recipe.insertMany(initialDishes);
      console.log("ChefTrack: Initial Recipes Auto-Seeded to MongoDB! 🍲");
    }
  } catch (error) {
    console.error("Seeding Error:", error.message);
  }
};

// MongoDB Connect panni Server-ah start panrom
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB (cheftrack) 🟢");
    seedDefaultRecipes();
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed 🔴 :", err.message);
  });   