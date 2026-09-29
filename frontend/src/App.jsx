import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipesHub from "./pages/RecipesHub";
import RecipeDetail from "./pages/RecipeDetail";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import AuthModal from "./components/AuthModal";

export default function App() {
  const [lang, setLang] = useState("ta");
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Navbar lang={lang} setLang={setLang} onOpenAuth={() => setIsAuthOpen(true)} />

          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home lang={lang} />} />
              <Route path="/recipes" element={<RecipesHub lang={lang} />} />
              <Route path="/recipe/:id" element={<RecipeDetail lang={lang} />} />
              <Route path="/profile" element={<Profile lang={lang} />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} backendUrl="http://localhost:5000/api" onAuthSuccess={() => setIsAuthOpen(false)} />

          <footer style={{ background: "#090d16", borderTop: "1px solid #1e293b", padding: "20px 16px", textAlign: "center", color: "#64748b", fontSize: "13px", marginTop: "auto" }}>
            ChefTrack Enterprise Architecture © 2026 • React Router • Web Audio & Speech Engine • MongoDB Atlas
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}