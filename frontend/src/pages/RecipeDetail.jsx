import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Volume2, Play, Pause, RotateCcw, ArrowLeft, CheckCircle2, 
  Timer, Mic, MicOff, ShoppingBag, CheckSquare, Square, 
  Star, MessageSquare, Send, Flame, Sparkles, HelpCircle
} from "lucide-react";
import confetti from "canvas-confetti";
import { useAuth } from "../context/AuthContext";

export default function RecipeDetail({ lang }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateLevel } = useAuth();
  
  const [recipe, setRecipe] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Hands-free Voice State
  const [isListening, setIsListening] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState("");
  const recognitionRef = useRef(null);

  // Pantry Checklist State
  const [pantryChecked, setPantryChecked] = useState({});

  // Reviews & Notes State
  const [reviews, setReviews] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // AI Assistant Query State
  const [aiTip, setAiTip] = useState(null);

  const ingredientsMap = {
    "rec-1": ["1 cup Water", "1.5 tsp Tea Powder", "1/2 cup Milk", "Crushed Ginger & Cardamom", "1 tsp Sugar"],
    "rec-2": ["2 Fresh Eggs", "1 Chopped Onion", "1 Green Chilli", "1 tbsp Cooking Oil", "Salt & Turmeric"],
    "rec-3": ["Tamarind Extract", "2 Tomatoes", "Black Pepper & Cumin", "Garlic cloves", "Mustard seeds & Ghee"],
  };

  // Macro Nutrition Database
  const nutritionMap = {
    "rec-1": { calories: "65 kcal", protein: "2.1g", carbs: "8.4g", fat: "2.3g" },
    "rec-2": { calories: "195 kcal", protein: "13.2g", carbs: "3.1g", fat: "14.5g" },
    "rec-3": { calories: "85 kcal", protein: "1.8g", carbs: "12.0g", fat: "3.2g" },
  };

  // Quick Chef AI Hacks
  const cookingHacks = {
    "rec-1": "💡 Chef Hack: Never boil tea powder for more than 3 minutes, otherwise tannins will release making it bitter.",
    "rec-2": "💡 Chef Hack: Scramble eggs on lowest heat and turn off flame 30 seconds early for velvety texture.",
    "rec-3": "💡 Chef Hack: Never boil Rasam aggressively. Turn off stove as soon as a golden froth forms on top.",
  };

  // Fetch Recipe details & Reviews
  useEffect(() => {
    fetch("http://localhost:5000/api/recipes")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((r) => r.recipeId === id);
        setRecipe(found);
      })
      .catch((err) => console.error("Error loading recipe:", err));

    fetch(`http://localhost:5000/api/recipes/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReviews(data);
        }
      })
      .catch((err) => console.log("Reviews load error:", err));
  }, [id]);

  // Kitchen Timer logic
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((prev) => prev - 1), 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      alert("⏱️ Timer Finished! Step check completed.");
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Speech Output Reader
  const handleSpeakCurrentStep = (stepIndex = currentStep) => {
    if (!recipe || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    const steps = recipe.steps[lang] || recipe.steps.en;
    const utterance = new SpeechSynthesisUtterance(steps[stepIndex]);
    utterance.lang = lang === "ta" ? "ta-IN" : lang === "hi" ? "hi-IN" : "en-US";
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Hands-free Voice Input Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      setVoiceFeedback(`Heard: "${command}"`);

      if (command.includes("next")) {
        setCurrentStep((prev) => {
          const max = (recipe?.steps[lang] || recipe?.steps.en || []).length - 1;
          const nextVal = prev < max ? prev + 1 : prev;
          handleSpeakCurrentStep(nextVal);
          return nextVal;
        });
      } else if (command.includes("back") || command.includes("previous")) {
        setCurrentStep((prev) => {
          const prevVal = prev > 0 ? prev - 1 : 0;
          handleSpeakCurrentStep(prevVal);
          return prevVal;
        });
      } else if (command.includes("read") || command.includes("repeat") || command.includes("speak")) {
        handleSpeakCurrentStep();
      } else if (command.includes("start") || command.includes("timer")) {
        setIsTimerRunning(true);
      } else if (command.includes("stop") || command.includes("pause")) {
        setIsTimerRunning(false);
      }
    };

    recognition.onerror = () => setIsListening(false);
    recognitionRef.current = recognition;
  }, [recipe, lang]);

  const toggleVoiceCommands = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition not supported in this browser. Please use Chrome/Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setVoiceFeedback("");
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setVoiceFeedback("Listening... (Say: Next, Back, Read, Start)");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const togglePantryItem = (item) => {
    setPantryChecked((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const handleCompleteDish = async () => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    try {
      const res = await fetch("http://localhost:5000/api/recipes/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?._id || user?.id, recipeId: recipe.recipeId }),
      });
      const data = await res.json();
      updateLevel(data.currentLevel, data.completedRecipes);
      alert("🏆 Level Completed! Progress Saved to Database.");
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setIsSubmittingReview(true);

    const tempReview = {
      recipeId: id,
      author: user?.name || "Vijay Chef",
      rating: newRating,
      note: newNote.trim(),
      createdAt: new Date().toLocaleDateString(),
    };

    setReviews((prev) => [tempReview, ...prev]);
    setNewNote("");

    try {
      await fetch(`http://localhost:5000/api/recipes/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempReview),
      });
    } catch (err) {
      console.error("Review sync error:", err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (!recipe) return <div style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>Loading Studio...</div>;

  const steps = recipe.steps[lang] || recipe.steps.en;
  const ingredients = ingredientsMap[recipe.recipeId] || ["Cooking Oil", "Salt to taste", "Main spice mix"];
  const macros = nutritionMap[recipe.recipeId] || { calories: "110 kcal", protein: "4g", carbs: "12g", fat: "5g" };

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto", padding: "0 16px" }}>
      <button onClick={() => navigate("/recipes")} style={{ background: "transparent", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px", marginBottom: "20px", fontSize: "14px", border: "none", cursor: "pointer" }}>
        <ArrowLeft size={16} /> Back to Recipes
      </button>

      <div style={{ background: "#1e293b", borderRadius: "16px", padding: "32px", border: "1px solid #334155" }}>
        {/* Studio Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", borderBottom: "1px solid #334155", paddingBottom: "20px" }}>
          <div>
            <span style={{ fontSize: "12px", background: "#f9731620", color: "#f97316", padding: "3px 8px", borderRadius: "4px", fontWeight: "bold" }}>
              STUDIO MODE • Level {recipe.level}
            </span>
            <h1 style={{ fontSize: "24px", fontWeight: "800", marginTop: "8px" }}>{recipe.title[lang] || recipe.title.en}</h1>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            {/* Hands-Free Voice Control Toggle */}
            <button
              onClick={toggleVoiceCommands}
              style={{
                background: isListening ? "#ef4444" : "#0f172a",
                color: "white",
                border: isListening ? "1px solid #f87171" : "1px solid #334155",
                padding: "10px 14px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {isListening ? <Mic size={18} /> : <MicOff size={18} />}
              {isListening ? "Voice Active" : "Hands-Free Voice"}
            </button>

            {/* Kitchen Timer */}
            <div style={{ background: "#0f172a", padding: "10px 16px", borderRadius: "10px", border: "1px solid #334155", display: "flex", alignItems: "center", gap: "12px" }}>
              <Timer color="#38bdf8" size={20} />
              <span style={{ fontSize: "18px", fontWeight: "bold", fontFamily: "monospace" }}>
                {Math.floor(timerSeconds / 60)}:{("0" + (timerSeconds % 60)).slice(-2)}
              </span>
              <button onClick={() => setIsTimerRunning(!isTimerRunning)} style={{ background: isTimerRunning ? "#eab308" : "#22c55e", color: "#0f172a", padding: "6px 10px", borderRadius: "6px", fontWeight: "bold", fontSize: "12px", border: "none", cursor: "pointer" }}>
                {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button onClick={() => { setIsTimerRunning(false); setTimerSeconds(120); }} style={{ background: "#334155", color: "white", padding: "6px 8px", borderRadius: "6px", border: "none", cursor: "pointer" }}>
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Live Voice Status Indicator */}
        {isListening && (
          <div style={{ background: "#0284c720", border: "1px solid #0284c7", color: "#38bdf8", padding: "10px 16px", borderRadius: "8px", marginTop: "16px", fontSize: "13px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>🎙️ Hands-Free Mode Active. Say: <b>"Next"</b>, <b>"Back"</b>, <b>"Read"</b>, <b>"Start"</b></span>
            <span style={{ fontStyle: "italic", color: "#f8fafc" }}>{voiceFeedback}</span>
          </div>
        )}

        {/* 🥗 Smart Nutrition Breakdown Widget */}
        <div style={{ marginTop: "20px", background: "#0f172a", padding: "16px 20px", borderRadius: "12px", border: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Flame size={18} color="#f97316" />
            <span style={{ fontSize: "14px", fontWeight: "700", color: "#f8fafc" }}>Nutritional Macros:</span>
          </div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "13px", color: "#94a3b8" }}>Calories: <b style={{ color: "#f97316" }}>{macros.calories}</b></span>
            <span style={{ fontSize: "13px", color: "#94a3b8" }}>Protein: <b style={{ color: "#38bdf8" }}>{macros.protein}</b></span>
            <span style={{ fontSize: "13px", color: "#94a3b8" }}>Carbs: <b style={{ color: "#eab308" }}>{macros.carbs}</b></span>
            <span style={{ fontSize: "13px", color: "#94a3b8" }}>Fat: <b style={{ color: "#f43f5e" }}>{macros.fat}</b></span>
          </div>
        </div>

        {/* 🤖 Chef AI Smart Assistant Button */}
        <div style={{ marginTop: "16px" }}>
          <button
            onClick={() => setAiTip(cookingHacks[recipe.recipeId] || "💡 Cook on balanced flame for rich authentic taste.")}
            style={{
              background: "#1e293b",
              border: "1px solid #f9731650",
              color: "#f97316",
              padding: "10px 16px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              width: "100%",
              justifyContent: "center"
            }}
          >
            <Sparkles size={16} /> Get AI Chef Pro Secret & Substitution Advice
          </button>

          {aiTip && (
            <div style={{ marginTop: "10px", background: "#0f172a", border: "1px solid #f97316", padding: "12px 16px", borderRadius: "8px", color: "#fbd38d", fontSize: "13px", lineHeight: "1.5" }}>
              {aiTip}
            </div>
          )}
        </div>

        {/* Pantry Checklist */}
        <div style={{ marginTop: "24px", background: "#0f172a", padding: "20px", borderRadius: "12px", border: "1px solid #334155" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#f8fafc", display: "flex", alignItems: "center", gap: "8px" }}>
              <ShoppingBag size={18} color="#f97316" />
              {lang === "ta" ? "தேவையான பொருட்கள் (Pantry Checklist)" : "Required Ingredients Checklist"}
            </h4>
            <span style={{ fontSize: "12px", color: "#38bdf8" }}>
              {Object.values(pantryChecked).filter(Boolean).length} / {ingredients.length} Ready
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
            {ingredients.map((item, idx) => {
              const isChecked = !!pantryChecked[item];
              return (
                <div
                  key={idx}
                  onClick={() => togglePantryItem(item)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: isChecked ? "#1e293b" : "#111827",
                    border: isChecked ? "1px solid #22c55e" : "1px solid #374151",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  {isChecked ? <CheckSquare size={16} color="#22c55e" /> : <Square size={16} color="#94a3b8" />}
                  <span style={{ fontSize: "13px", color: isChecked ? "#94a3b8" : "#f1f5f9", textDecoration: isChecked ? "line-through" : "none" }}>
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Display Area */}
        <div style={{ margin: "24px 0", background: "#0f172a", padding: "28px", borderRadius: "12px", border: "1px solid #334155" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <span style={{ color: "#f97316", fontWeight: "bold", fontSize: "14px" }}>
              STEP {currentStep + 1} OF {steps.length}
            </span>
            <button onClick={() => handleSpeakCurrentStep(currentStep)} style={{ background: isSpeaking ? "#ef4444" : "#1e293b", color: "white", padding: "8px 14px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", border: "none", cursor: "pointer" }}>
              <Volume2 size={16} /> {isSpeaking ? "Stop Voice" : "Read Step Out Loud"}
            </button>
          </div>

          <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#f8fafc" }}>
            {steps[currentStep]}
          </p>
        </div>

        {/* Step Navigation Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            disabled={currentStep === 0}
            onClick={() => setCurrentStep((prev) => prev - 1)}
            style={{ background: "#334155", color: "white", padding: "10px 18px", borderRadius: "8px", opacity: currentStep === 0 ? 0.4 : 1, border: "none", cursor: currentStep === 0 ? "not-allowed" : "pointer" }}
          >
            Previous Step
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              style={{ background: "#f97316", color: "white", padding: "10px 22px", borderRadius: "8px", fontWeight: "700", border: "none", cursor: "pointer" }}
            >
              Next Step ➔
            </button>
          ) : (
            <button
              onClick={handleCompleteDish}
              style={{ background: "#22c55e", color: "white", padding: "10px 24px", borderRadius: "8px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px", border: "none", cursor: "pointer" }}
            >
              <CheckCircle2 size={18} /> Finish Cooking & Save Level
            </button>
          )}
        </div>

        {/* Reviews Section */}
        <div style={{ marginTop: "40px", borderTop: "1px solid #334155", paddingTop: "28px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
            <MessageSquare size={18} color="#f97316" />
            {lang === "ta" ? "சமையல் குறிப்புகள் & மதிப்பீடுகள்" : "Chef Observations & Community Notes"}
          </h3>

          <form onSubmit={handleSubmitReview} style={{ background: "#0f172a", padding: "20px", borderRadius: "12px", border: "1px solid #334155", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", color: "#94a3b8" }}>Rate this recipe execution:</span>
              <div style={{ display: "flex", gap: "4px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    onClick={() => setNewRating(star)}
                    style={{ cursor: "pointer" }}
                    fill={star <= newRating ? "#eab308" : "none"}
                    color={star <= newRating ? "#eab308" : "#64748b"}
                  />
                ))}
              </div>
            </div>

            <textarea
              rows="3"
              required
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder={lang === "ta" ? "உங்கள் சமையல் அனுபவம் அல்லது குறிப்புகளை எழுதுங்கள் (e.g. உப்பின் அளவு, தீயின் வேகம்)..." : "Write your culinary note or experience..."}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "#1e293b", border: "1px solid #334155", color: "white", outline: "none", fontSize: "14px", resize: "none", boxSizing: "border-box" }}
            ></textarea>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
              <button
                type="submit"
                disabled={isSubmittingReview}
                style={{ background: "#f97316", color: "white", padding: "8px 18px", borderRadius: "8px", fontWeight: "600", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px", border: "none", cursor: "pointer" }}
              >
                <Send size={14} /> {isSubmittingReview ? "Posting..." : "Post Note"}
              </button>
            </div>
          </form>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {reviews.map((rev, rIdx) => (
              <div key={rIdx} style={{ background: "#0f172a", padding: "16px", borderRadius: "10px", border: "1px solid #334155" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#334155", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold" }}>
                      {rev.author?.charAt(0) || "C"}
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "#f8fafc" }}>{rev.author}</span>
                    <span style={{ fontSize: "11px", color: "#64748b" }}>• {rev.createdAt}</span>
                  </div>

                  <div style={{ display: "flex", gap: "2px" }}>
                    {[...Array(rev.rating)].map((_, s) => (
                      <Star key={s} size={14} fill="#eab308" color="#eab308" />
                    ))}
                  </div>
                </div>

                <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.5" }}>
                  {rev.note}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}