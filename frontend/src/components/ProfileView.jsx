import React from "react";
import { User, Award, ShieldCheck, Mail } from "lucide-react";

export default function ProfileView({ user, lang }) {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 16px" }}>
      <div style={{ background: "#1e293b", padding: "32px", borderRadius: "16px", border: "1px solid #334155" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#f97316", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", fontWeight: "bold" }}>
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: "800" }}>{user.name}</h2>
            <div style={{ color: "#38bdf8", fontSize: "14px", marginTop: "2px" }}>Level {user.currentLevel} Verified Cook</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", borderTop: "1px solid #334155", paddingTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#cbd5e1", fontSize: "14px" }}>
            <span style={{ color: "#94a3b8" }}>Account Status:</span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#22c55e" }}><ShieldCheck size={16} /> Active & Secured</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#cbd5e1", fontSize: "14px" }}>
            <span style={{ color: "#94a3b8" }}>Email:</span>
            <span>{user.email || "guest@cheftrack.app"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#cbd5e1", fontSize: "14px" }}>
            <span style={{ color: "#94a3b8" }}>Mastered Dishes Count:</span>
            <span style={{ fontWeight: "bold", color: "#f97316" }}>{user.completedRecipes?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}