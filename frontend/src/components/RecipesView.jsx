import React, { useState } from "react";
import { Volume2, CheckCircle2, Search } from "lucide-react";

export default function RecipesView({ recipes, user, lang, onCompleteRecipe, speakingIndex, onReadSteps }) {
  const [activeTab, setActiveTab] = useState("beginner");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = recipes
    .filter((r) => r.tier === activeTab)
    .filter((r) => {
      const title = (r.title[lang] || r.title.en).toLowerCase();
      return title.includes(searchQuery.toLowerCase());
    });

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "24px 16px" }}>
      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setActiveTab("beginner")}
            style={{ padding: "10px 18px", borderRadius: "8px", background: activeTab === "beginner" ? "#f97316" : "#1e293b", color: "white", fontWeight: "600", fontSize: "14px" }}
          >
            {lang === "ta" ? "தொடக்க நிலை (Beginner)" : "Beginner Journey"}
          </button>
          <button
            onClick={() => setActiveTab("intermediate")}
            style={{ padding: "10px 18px", borderRadius: "8px", background: activeTab === "intermediate" ? "#f97316" : "#1e293b", color: "white", fontWeight: "600", fontSize: "14px" }}
          >
            {lang === "ta" ? "நடுத்தர நிலை (Intermediate)" : "Intermediate Dishes"}
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", background: "#1e293b", borderRadius: "8px", padding: "6px 12px", border: "1px solid #334155", width: "240px" }}>
          <Search size={16} color="#94a3b8" style={{ marginRight: "8px" }} />
          <input
            type="text"
            placeholder={lang === "ta" ? "சமையல் தேடுக..." : "Search recipe..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: "transparent", border: "none", color: "white", outline: "none", width: "100%", fontSize: "14px" }}
          />
        </div>
      </div>

      {/* Cards List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {filtered.map((recipe, index) => {
          const isCompleted = user.completedRecipes?.includes(recipe.recipeId);
          const isLocked = activeTab === "beginner" && recipe.level > user.currentLevel;

          return (
            <div
              key={recipe.recipeId}
              style={{
                background: "#1e293b",
                borderRadius: "14px",
                padding: "24px",
                border: isCompleted ? "1px solid #22c55e" : isLocked ? "1px solid #334155" : "1px solid #475569",
                opacity: isLocked ? 0.6 : 1,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", background: "#334155", padding: "3px 8px", borderRadius: "4px", color: "#38bdf8", fontWeight: "600" }}>
                      {recipe.category}
                    </span>
                    <span style={{ fontSize: "12px", color: "#fb923c", fontWeight: "bold" }}>
                      Level {recipe.level}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: "700", marginTop: "8px" }}>
                    {recipe.title[lang] || recipe.title.en}
                  </h3>
                  <p style={{ color: "#94a3b8", fontSize: "14px", marginTop: "4px" }}>
                    {recipe.description[lang] || recipe.description.en}
                  </p>
                </div>

                {!isLocked && (
                  <button
                    onClick={() => onReadSteps(recipe.steps[lang] || recipe.steps.en, index)}
                    style={{
                      background: speakingIndex === index ? "#ef4444" : "#334155",
                      color: "white",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                    }}
                  >
                    <Volume2 size={16} />
                    {speakingIndex === index ? "Stop" : lang === "ta" ? "கேளுங்கள்" : "Listen Voice"}
                  </button>
                )}
              </div>

              {!isLocked ? (
                <div style={{ marginTop: "16px", background: "#0f172a", padding: "18px", borderRadius: "10px" }}>
                  <h4 style={{ fontSize: "14px", color: "#cbd5e1", marginBottom: "10px", fontWeight: "600" }}>
                    {lang === "ta" ? "செய்முறை வழிகாட்டல்:" : "Step-by-step Instructions:"}
                  </h4>
                  <ol style={{ paddingLeft: "20px", color: "#94a3b8", fontSize: "14px", lineHeight: "1.7" }}>
                    {(recipe.steps[lang] || recipe.steps.en).map((step, sIdx) => (
                      <li key={sIdx} style={{ marginBottom: "6px" }}>{step}</li>
                    ))}
                  </ol>

                  <div style={{ marginTop: "18px", display: "flex", justifyContent: "flex-end" }}>
                    <button
                      disabled={isCompleted}
                      onClick={() => onCompleteRecipe(recipe.recipeId)}
                      style={{
                        background: isCompleted ? "#15803d" : "#f97316",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <CheckCircle2 size={18} />
                      {isCompleted
                        ? lang === "ta" ? "வெற்றிகரமாக முடிந்தது ✓" : "Completed ✓"
                        : lang === "ta" ? "இந்த நிலையை முடிக்கவும்" : "Complete Level"}
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: "14px", padding: "12px", background: "#0f172a", borderRadius: "8px", color: "#64748b", fontSize: "14px" }}>
                  🔒 {lang === "ta" ? `முந்தைய நிலையை முடித்து Level ${recipe.level}-ஐ Unlock செய்யவும்.` : `Complete previous levels to unlock.`}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}