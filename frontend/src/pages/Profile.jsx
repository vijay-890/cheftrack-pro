import React, { useState } from "react";
import { ShieldCheck, Award, Download, CheckCircle2, Sparkles, ChefHat } from "lucide-react";
import { jsPDF } from "jspdf";
import { useAuth } from "../context/AuthContext";

export default function Profile({ lang }) {
  const { user } = useAuth();
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Direct jsPDF Vector Generator (Zero dependency on html2canvas, works 100% instantly)
  const handleGenerateCertificate = () => {
    try {
      setDownloading(true);

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "a4", // 842 x 595 pt
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // 1. Dark Luxury Background
      doc.setFillColor(15, 23, 42); // #0f172a
      doc.rect(0, 0, pageWidth, pageHeight, "F");

      // 2. Double Golden / Orange Border
      doc.setDrawColor(249, 115, 22); // #f97316
      doc.setLineWidth(5);
      doc.rect(20, 20, pageWidth - 40, pageHeight - 40);

      doc.setDrawColor(234, 179, 8); // Gold inner border #eab308
      doc.setLineWidth(1.5);
      doc.rect(28, 28, pageWidth - 56, pageHeight - 56);

      // 3. Organization Header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(249, 115, 22);
      doc.text("CHEFTRACK CULINARY ACADEMY", pageWidth / 2, 75, { align: "center" });

      // 4. Main Certificate Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(30);
      doc.setTextColor(248, 250, 252);
      doc.text("CERTIFICATE OF EXCELLENCE", pageWidth / 2, 120, { align: "center" });

      // 5. Subtitle
      doc.setFont("helvetica", "normal");
      doc.setFontSize(13);
      doc.setTextColor(148, 163, 184);
      doc.text("THIS IS PROUDLY PRESENTED TO", pageWidth / 2, 160, { align: "center" });

      // 6. Recipient Name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(34);
      doc.setTextColor(249, 115, 22);
      const studentName = (user?.name || "Vijay V").toUpperCase();
      doc.text(studentName, pageWidth / 2, 220, { align: "center" });

      // Line under name
      doc.setDrawColor(249, 115, 22);
      doc.setLineWidth(2);
      const nameWidth = doc.getTextWidth(studentName);
      doc.line((pageWidth - nameWidth) / 2 - 20, 230, (pageWidth + nameWidth) / 2 + 20, 230);

      // 7. Achievement Paragraph
      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      doc.setTextColor(203, 213, 225);
      const desc1 = "For successfully mastering the foundational Indian culinary levels, heat balancing";
      const desc2 = "techniques, seasoning ratios, and interactive cooking milestones on ChefTrack Pro.";
      doc.text(desc1, pageWidth / 2, 280, { align: "center" });
      doc.text(desc2, pageWidth / 2, 305, { align: "center" });

      // 8. Badge Box in Center
      doc.setFillColor(30, 41, 59);
      doc.roundedRect(pageWidth / 2 - 110, 345, 220, 42, 6, 6, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(56, 189, 248);
      doc.text(`VERIFIED LEVEL ${user?.currentLevel || 1} CERTIFIED CHEF`, pageWidth / 2, 371, { align: "center" });

      // 9. Bottom Signatures & Verification ID
      const certId = "CT-" + Math.floor(100000 + Math.random() * 900000);
      const issueDate = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

      // Left: Platform ID
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(148, 163, 184);
      doc.text("VERIFIED CREDENTIAL ID", 60, 480);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(248, 250, 252);
      doc.text(certId, 60, 498);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(148, 163, 184);
      doc.text(`Issued: ${issueDate}`, 60, 514);

      // Right: Director Signature
      doc.text("CHEFTRACK PROGRAM LEAD", pageWidth - 240, 480);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(249, 115, 22);
      doc.text("Vijay V - Lead Architect", pageWidth - 240, 498);
      doc.setDrawColor(71, 85, 105);
      doc.line(pageWidth - 240, 470, pageWidth - 60, 470);

      // Save PDF directly to browser downloads
      const fileName = `${studentName.replace(/\s+/g, "_")}_ChefTrack_Official_Certificate.pdf`;
      doc.save(fileName);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch (error) {
      console.error("Direct PDF Error:", error);
      alert("Error generating PDF: " + error.message);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div style={{ maxWidth: "860px", margin: "32px auto", padding: "0 16px" }}>
      {/* User Stats Card */}
      <div style={{ background: "#1e293b", padding: "32px", borderRadius: "16px", border: "1px solid #334155", marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#f97316", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", fontWeight: "bold" }}>
            {user?.name?.charAt(0).toUpperCase() || "C"}
          </div>
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: "800" }}>{user?.name || "Chef Vijay"}</h2>
            <div style={{ color: "#38bdf8", fontSize: "14px", marginTop: "2px" }}>Level {user?.currentLevel || 1} Certified Master</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", borderTop: "1px solid #334155", paddingTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#cbd5e1", fontSize: "14px" }}>
            <span style={{ color: "#94a3b8" }}>Account Status:</span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#22c55e" }}>
              <ShieldCheck size={16} /> Verified Active Profile
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#cbd5e1", fontSize: "14px" }}>
            <span style={{ color: "#94a3b8" }}>Account Email:</span>
            <span>{user?.email || "vijay@cheftrack.app"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#cbd5e1", fontSize: "14px" }}>
            <span style={{ color: "#94a3b8" }}>Mastered Dishes Count:</span>
            <span style={{ fontWeight: "bold", color: "#f97316" }}>{user?.completedRecipes?.length || 0}</span>
          </div>
        </div>
      </div>

      {/* Official Certificate Portal */}
      <div style={{ background: "#1e293b", padding: "32px", borderRadius: "16px", border: "1px solid #334155" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
          <div>
            <h3 style={{ fontSize: "20px", fontWeight: "800", display: "flex", alignItems: "center", gap: "8px" }}>
              <Award color="#f97316" /> {lang === "ta" ? "அதிகாரப்பூர்வ சமையல் சான்றிதழ்" : "Official Chef Certification"}
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "14px", marginTop: "4px" }}>
              {lang === "ta"
                ? "உங்கள் சமையல் சாதனையை அங்கீகரிக்கும் உயர்தர PDF சான்றிதழ்."
                : "Official high-resolution verified credential issued by ChefTrack Academy."}
            </p>
          </div>

          <button
            onClick={handleGenerateCertificate}
            disabled={downloading}
            style={{
              background: downloading ? "#94a3b8" : "#f97316",
              color: "white",
              padding: "12px 24px",
              borderRadius: "10px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              cursor: downloading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 14px rgba(249, 115, 22, 0.4)",
            }}
          >
            <Download size={18} /> {downloading ? "Generating PDF..." : "Download Official PDF"}
          </button>
        </div>

        {downloadSuccess && (
          <div style={{ background: "#22c55e20", border: "1px solid #22c55e", color: "#86efac", padding: "12px 16px", borderRadius: "8px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
            <CheckCircle2 size={18} /> Certificate Downloaded Successfully! Check your browser downloads folder. 🎉
          </div>
        )}

        {/* Live Visual Certificate Preview */}
        <div style={{ overflowX: "auto", paddingBottom: "10px" }}>
          <div
            style={{
              width: "100%",
              maxWidth: "760px",
              minHeight: "440px",
              background: "#090d16",
              border: "5px solid #f97316",
              padding: "36px 28px",
              boxSizing: "border-box",
              margin: "0 auto",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
            }}
          >
            <div>
              <div style={{ color: "#f97316", fontSize: "12px", fontWeight: "bold", letterSpacing: "3px" }}>CHEFTRACK CULINARY ACADEMY</div>
              <h1 style={{ color: "#f8fafc", fontSize: "28px", fontWeight: "900", margin: "10px 0 4px 0", letterSpacing: "1px" }}>CERTIFICATE OF EXCELLENCE</h1>
              <p style={{ color: "#94a3b8", fontSize: "12px" }}>THIS IS PROUDLY PRESENTED TO</p>
            </div>

            <div>
              <h2 style={{ fontSize: "32px", color: "#f97316", fontWeight: "800", textDecoration: "underline", textUnderlineOffset: "6px" }}>
                {user?.name || "Vijay V"}
              </h2>
              <p style={{ color: "#cbd5e1", fontSize: "14px", marginTop: "14px", maxWidth: "560px", margin: "14px auto 0 auto", lineHeight: "1.6" }}>
                For successfully mastering foundational Indian culinary levels, heat balancing techniques, and interactive cooking milestones on ChefTrack Pro.
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid #334155", paddingTop: "18px" }}>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: "#f8fafc", fontWeight: "bold", fontSize: "12px" }}>CHEFTRACK VERIFIED</div>
                <div style={{ color: "#64748b", fontSize: "11px", marginTop: "2px" }}>ID: CT-884920</div>
              </div>

              <div style={{ background: "#f9731620", border: "1px solid #f97316", borderRadius: "50%", width: "52px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle2 color="#f97316" size={26} />
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#f8fafc", fontWeight: "bold", fontSize: "12px" }}>ACADEMY DIRECTOR</div>
                <div style={{ color: "#64748b", fontSize: "11px", marginTop: "2px" }}>Certified Interactive Platform</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}