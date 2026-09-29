import React, { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div style={{ maxWidth: "700px", margin: "32px auto", padding: "0 16px" }}>
      <div style={{ background: "#1e293b", padding: "32px", borderRadius: "16px", border: "1px solid #334155" }}>
        
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
            Engineered ChefTrack using React Router, Context API, Node.js, Express, MongoDB Atlas, and Speech Synthesis.
          </p>
        </div>

        <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>Send Inquiry / Feedback</h3>

        {sent ? (
          <div style={{ background: "#22c55e20", border: "1px solid #22c55e", color: "#86efac", padding: "16px", borderRadius: "8px", textAlign: "center", fontSize: "14px" }}>
            Message transmitted successfully! 🚀
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "13px", color: "#94a3b8" }}>Name</label>
              <input type="text" required placeholder="Your Name" style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "#0f172a", border: "1px solid #334155", color: "white", marginTop: "4px" }} />
            </div>
            <div>
              <label style={{ fontSize: "13px", color: "#94a3b8" }}>Email</label>
              <input type="email" required placeholder="name@domain.com" style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "#0f172a", border: "1px solid #334155", color: "white", marginTop: "4px" }} />
            </div>
            <div>
              <label style={{ fontSize: "13px", color: "#94a3b8" }}>Message</label>
              <textarea required rows="4" placeholder="Your feedback..." style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "#0f172a", border: "1px solid #334155", color: "white", marginTop: "4px" }}></textarea>
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