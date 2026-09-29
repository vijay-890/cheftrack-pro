import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function RecipesHub({ lang }) {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [tier, setTier] = useState("beginner");

  useEffect(() => {
    fetch("http://localhost:5000/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error(err));
  }, []);

  const filtered = recipes
    .filter((r) => r.tier === tier)
    .filter((r) => (r.title[lang] || r.title.en).toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ maxWidth: "1100px", margin: "30px auto", padding: "0 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "800" }}>Culinary Kitchen Library</h1>
          <p style={{ color: "#94a3b8", fontSize: "14px", marginTop: "4px" }}>Click on a dish to open the Interactive Cooking Studio</p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ background: "#1e293b", padding: "4px", borderRadius: "8px", display: "flex" }}>
            <button onClick={() => setTier("beginner")} style={{ padding: "8px 16px", borderRadius: "6px", background: tier === "beginner" ? "#f97316" : "transparent", color: "white", fontSize: "13px", fontWeight: "600" }}>Beginner</button>
            <button onClick={() => setTier("intermediate")} style={{ padding: "8px 16px", borderRadius: "6px", background: tier === "intermediate" ? "#f97316" : "transparent", color: "white", fontSize: "13px", fontWeight: "600" }}>Intermediate</button>
          </div>

          <div style={{ background: "#1e293b", borderRadius: "8px", padding: "6px 12px", display: "flex", alignItems: "center", border: "1px solid #334155" }}>
            <Search size={16} color="#94a3b8" style={{ marginRight: "6px" }} />
            <input type="text" placeholder="Search dish..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ background: "transparent", border: "none", color: "white", outline: "none", fontSize: "13px" }} />
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
        {filtered.map((r) => {
          const isCompleted = user.completedRecipes?.includes(r.recipeId);
          const isLocked = tier === "beginner" && r.level > user.currentLevel;

          return (
            <div key={r.recipeId} style={{ background: "#1e293b", borderRadius: "14px", border: isCompleted ? "1px solid #22c55e" : "1px solid #334155", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", opacity: isLocked ? 0.5 : 1 }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", background: "#0f172a", color: "#38bdf8", padding: "3px 8px", borderRadius: "4px" }}>{r.category}</span>
                  <span style={{ fontSize: "12px", color: "#f97316", fontWeight: "bold" }}>Level {r.level}</span>
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", marginTop: "12px" }}>{r.title[lang] || r.title.en}</h3>
                <p style={{ color: "#94a3b8", fontSize: "13px", marginTop: "6px", lineHeight: "1.5" }}>{r.description[lang] || r.description.en}</p>
              </div>

              <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #334155" }}>
                {isLocked ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b", fontSize: "13px" }}>
                    <Lock size={15} /> Locked (Reach Level {r.level})
                  </div>
                ) : (
                  <Link to={`/recipe/${r.recipeId}`} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", background: isCompleted ? "#15803d" : "#f97316", color: "white", padding: "10px", borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "13px" }}>
                    {isCompleted ? "Revisit Studio" : "Cook in Studio"} <ArrowRight size={15} />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}