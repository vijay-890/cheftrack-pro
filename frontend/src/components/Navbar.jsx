import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Utensils, LayoutDashboard, BookOpen, User, Mail, LogIn, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ lang, setLang, onOpenAuth }) {
  const { user, token, logout } = useAuth();

  // Active link-ku orange highlight tharuvom
  const getLinkStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    background: isActive ? "#1e293b" : "transparent",
    color: isActive ? "#f97316" : "#94a3b8",
    border: isActive ? "1px solid #334155" : "1px solid transparent",
    transition: "all 0.2s ease"
  });

  return (
    <nav style={{ background: "#090d16", borderBottom: "1px solid #1e293b", padding: "12px 24px", position: "sticky", top: 0, zIndex: 40 }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        
        {/* Brand Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ background: "#f97316", padding: "8px", borderRadius: "10px", color: "white" }}>
            <Utensils size={20} />
          </div>
          <span style={{ fontSize: "20px", fontWeight: "800", color: "#f8fafc" }}>
            Chef<span style={{ color: "#f97316" }}>Track</span>
          </span>
          <span style={{ fontSize: "10px", background: "#f9731620", color: "#f97316", border: "1px solid #f9731640", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold" }}>
            PRO
          </span>
        </Link>

        {/* Real Route NavLinks */}
        <div style={{ display: "flex", gap: "6px" }}>
          <NavLink to="/" style={getLinkStyle} end>
            <LayoutDashboard size={16} /> {lang === "ta" ? "முகப்பு" : "Dashboard"}
          </NavLink>

          <NavLink to="/recipes" style={getLinkStyle}>
            <BookOpen size={16} /> {lang === "ta" ? "சமையல் வகைகள்" : "Recipes Hub"}
          </NavLink>

          <NavLink to="/profile" style={getLinkStyle}>
            <User size={16} /> {lang === "ta" ? "சுயவிவரம்" : "Profile"}
          </NavLink>

          <NavLink to="/contact" style={getLinkStyle}>
            <Mail size={16} /> {lang === "ta" ? "தொடர்பு" : "Contact"}
          </NavLink>
        </div>

        {/* Language & Auth Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", background: "#1e293b", padding: "4px", borderRadius: "8px", gap: "4px" }}>
            <button onClick={() => setLang("ta")} style={{ padding: "4px 8px", borderRadius: "6px", background: lang === "ta" ? "#f97316" : "transparent", color: "white", fontSize: "12px", border: "none", cursor: "pointer" }}>தமிழ்</button>
            <button onClick={() => setLang("en")} style={{ padding: "4px 8px", borderRadius: "6px", background: lang === "en" ? "#f97316" : "transparent", color: "white", fontSize: "12px", border: "none", cursor: "pointer" }}>EN</button>
            <button onClick={() => setLang("hi")} style={{ padding: "4px 8px", borderRadius: "6px", background: lang === "hi" ? "#f97316" : "transparent", color: "white", fontSize: "12px", border: "none", cursor: "pointer" }}>हिंदी</button>
          </div>

          {token ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "13px", color: "#38bdf8", fontWeight: "600" }}>👤 {user?.name || "Chef"}</span>
              <button onClick={logout} style={{ background: "#dc2626", color: "white", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                <LogOut size={14} /> Exit
              </button>
            </div>
          ) : (
            <button onClick={onOpenAuth} style={{ background: "#f97316", color: "white", padding: "7px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
              <LogIn size={15} /> Sign In
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}