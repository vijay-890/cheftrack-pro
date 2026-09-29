import React, { useState } from "react";
import { Mail, CheckCircle, Code } from "lucide-react";

export default function ContactView() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 16px" }}>
      <div style={{ background: "#1e293b", padding: "32px", borderRadius: "16px", border: "1px solid #334155" }}>
        
        {/* Developer Info Card */}
        <div style={{ background: "#0f172a", padding: "20px", borderRadius: "12px", border: "1px solid #334155", marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#f97316", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "20px" }}>
              V
            </div>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "700" }}>Vijay</h3>
              <p style={{ color: "#38bdf8", fontSize: "13px" }}>Full-Stack MERN Developer</p>
            </div>
          </div>
          <p style={{ color: "#94a3b8", fontSize: "14px", marginTop: "12px", lineHeight: "1.6" }}>
            ChefTrack is engineered using Node.js, Express.js, MongoDB Atlas, React, and Web Speech Synthesis to deliver an interactive gamified cooking experience.
          </p>
        </div>

        <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>Get in Touch / Feedback</h3>

        {submitted ? (
          <div style={{ background: "#22c55e20", border: "1px solid #22c55e", color: "#86efac", padding: "16px", borderRadius: "8px", textAlign: "center", fontSize: "14px" }}>
            Message received! Thank you for contacting the developer. 🚀
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "13px", color: "#94a3b8" }}>Name</label>
              <input type="text" required placeholder="Your Name" style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "#0f172a", border: "1px solid #334155", color: "white", marginTop: "4px" }} />
            </div>
            <div>
              <label style={{ fontSize: "13px", color: "#94a3b8" }}>Email</label>
              <input type="email" required placeholder="you@domain.com" style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "#0f172a", border: "1px solid #334155", color: "white", marginTop: "4px" }} />
            </div>
            <div>
              <label style={{ fontSize: "13px", color: "#94a3b8" }}>Message</label>
              <textarea required rows="4" placeholder="Your query or suggestions..." style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "#0f172a", border: "1px solid #334155", color: "white", marginTop: "4px" }}></textarea>
            </div>
            <button type="submit" style={{ background: "#38bdf8", color: "#0f172a", padding: "12px", borderRadius: "8px", fontWeight: "700", marginTop: "8px" }}>
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}