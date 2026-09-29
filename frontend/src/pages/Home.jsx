import React from "react";
import { Link } from "react-router-dom";
import { Trophy, Flame, CheckCircle2, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Home({ lang }) {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 16px" }}>
      {/* Banner */}
      <div style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", padding: "36px", borderRadius: "16px", border: "1px solid #334155", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#f8fafc" }}>
          {lang === "ta" ? `வணக்கம் Master Chef ${user.name}! 👨‍🍳` : `Welcome Master Chef ${user.name}! 👨‍🍳`}
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "15px", marginTop: "8px" }}>
          {lang === "ta" ? "உங்கள் சமையல் கலை திறனை வளர்க்கும் நேரடி பயிற்சி தளம்." : "Real-time hands-on culinary training platform with interactive audio guidance."}
        </p>

        <Link to="/recipes" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "24px", background: "#f97316", color: "white", padding: "12px 24px", borderRadius: "10px", fontWeight: "700", textDecoration: "none", fontSize: "14px" }}>
          {lang === "ta" ? "இன்றைய சமையலை தொடங்குக" : "Start Today's Cooking Studio"} <ArrowRight size={16} />
        </Link>
      </div>

      {/* Analytics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
        <div style={{ background: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#94a3b8", fontSize: "13px" }}>CURRENT LEVEL</span>
            <Trophy size={22} color="#eab308" />
          </div>
          <div style={{ fontSize: "30px", fontWeight: "800", marginTop: "12px", color: "#f8fafc" }}>Level {user.currentLevel}</div>
          <div style={{ fontSize: "12px", color: "#38bdf8", marginTop: "6px" }}>Beginner Rank</div>
        </div>

        <div style={{ background: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#94a3b8", fontSize: "13px" }}>DAILY STREAK</span>
            <Flame size={22} color="#f97316" />
          </div>
          <div style={{ fontSize: "30px", fontWeight: "800", marginTop: "12px", color: "#f8fafc" }}>4 Days</div>
          <div style={{ fontSize: "12px", color: "#22c55e", marginTop: "6px" }}>Keep the flame alive!</div>
        </div>

        <div style={{ background: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#94a3b8", fontSize: "13px" }}>COMPLETED DISHES</span>
            <CheckCircle2 size={22} color="#22c55e" />
          </div>
          <div style={{ fontSize: "30px", fontWeight: "800", marginTop: "12px", color: "#f8fafc" }}>{user.completedRecipes?.length || 0}</div>
          <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "6px" }}>Verified master dishes</div>
        </div>
      </div>
    </div>
  );
}