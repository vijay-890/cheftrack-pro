import React from "react";
import { Trophy, Flame, Award, ArrowRight, CheckCircle2 } from "lucide-react";

export default function DashboardView({ user, lang, onExploreRecipes }) {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "28px 16px" }}>
      {/* Welcome Banner */}
      <div style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", padding: "32px", borderRadius: "16px", border: "1px solid #334155", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#f8fafc" }}>
          {lang === "ta" ? `வணக்கம், Master Chef ${user.name}! 👨‍🍳` : `Welcome Back, Chef ${user.name}! 👨‍🍳`}
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "15px", marginTop: "8px" }}>
          {lang === "ta" ? "உங்கள் சமையல் கலை பயணத்தை அடுத்த கட்டத்திற்கு எடுத்துச் செல்லுங்கள்." : "Track your culinary journey, complete daily hands-on recipes, and level up."}
        </p>

        <button onClick={onExploreRecipes} style={{ marginTop: "20px", background: "#f97316", color: "white", padding: "12px 22px", borderRadius: "10px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
          {lang === "ta" ? "சமையல் கற்க தொடங்குக" : "Continue Today's Cooking"} <ArrowRight size={16} />
        </button>
      </div>

      {/* Analytics Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
        <div style={{ background: "#1e293b", padding: "20px", borderRadius: "12px", border: "1px solid #334155" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#94a3b8", fontSize: "13px" }}>CURRENT LEVEL</span>
            <Trophy size={20} color="#eab308" />
          </div>
          <div style={{ fontSize: "28px", fontWeight: "800", marginTop: "10px", color: "#f8fafc" }}>Level {user.currentLevel}</div>
          <div style={{ fontSize: "12px", color: "#38bdf8", marginTop: "4px" }}>Beginner Rank</div>
        </div>

        <div style={{ background: "#1e293b", padding: "20px", borderRadius: "12px", border: "1px solid #334155" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#94a3b8", fontSize: "13px" }}>COOKING STREAK</span>
            <Flame size={20} color="#f97316" />
          </div>
          <div style={{ fontSize: "28px", fontWeight: "800", marginTop: "10px", color: "#f8fafc" }}>4 Days</div>
          <div style={{ fontSize: "12px", color: "#22c55e", marginTop: "4px" }}>On fire! Don't miss tomorrow</div>
        </div>

        <div style={{ background: "#1e293b", padding: "20px", borderRadius: "12px", border: "1px solid #334155" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#94a3b8", fontSize: "13px" }}>DISHES MASTERED</span>
            <CheckCircle2 size={20} color="#22c55e" />
          </div>
          <div style={{ fontSize: "28px", fontWeight: "800", marginTop: "10px", color: "#f8fafc" }}>{user.completedRecipes?.length || 0}</div>
          <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>Verified recipes</div>
        </div>
      </div>
    </div>
  );
}