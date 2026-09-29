import React, { useState } from "react";
import { X } from "lucide-react";

export default function AuthModal({ isOpen, onClose, onAuthSuccess, backendUrl }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const endpoint = isLogin ? "/auth/login" : "/auth/register";

    try {
      const res = await fetch(`${backendUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Authentication failed");

      onAuthSuccess(data);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: "16px" }}>
      <div style={{ background: "#1e293b", padding: "28px", borderRadius: "14px", width: "100%", maxWidth: "400px", border: "1px solid #334155" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "700" }}>{isLogin ? "Sign In to ChefTrack" : "Create Chef Account"}</h3>
          <button onClick={onClose} style={{ background: "transparent", color: "#94a3b8" }}><X size={20} /></button>
        </div>

        {error && <div style={{ background: "#ef444420", border: "1px solid #ef4444", color: "#fca5a5", padding: "8px", borderRadius: "6px", fontSize: "13px", marginBottom: "14px" }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {!isLogin && (
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8" }}>Name</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "#0f172a", border: "1px solid #334155", color: "white", marginTop: "4px" }} />
            </div>
          )}
          <div>
            <label style={{ fontSize: "12px", color: "#94a3b8" }}>Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "#0f172a", border: "1px solid #334155", color: "white", marginTop: "4px" }} />
          </div>
          <div>
            <label style={{ fontSize: "12px", color: "#94a3b8" }}>Password</label>
            <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "#0f172a", border: "1px solid #334155", color: "white", marginTop: "4px" }} />
          </div>

          <button type="submit" style={{ background: "#f97316", color: "white", padding: "12px", borderRadius: "8px", fontWeight: "700", marginTop: "8px" }}>
            {isLogin ? "Sign In" : "Register"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "16px", fontSize: "13px", color: "#94a3b8" }}>
          {isLogin ? "Don't have an account? " : "Already registered? "}
          <span onClick={() => setIsLogin(!isLogin)} style={{ color: "#38bdf8", cursor: "pointer", fontWeight: "bold" }}>
            {isLogin ? "Sign Up" : "Log In"}
          </span>
        </div>
      </div>
    </div>
  );
}