import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function HeroScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isFirstLogin = !localStorage.getItem("dp_onboarded");

  function handleCTA() {
    if (isFirstLogin) navigate("/onboarding");
    else navigate("/dashboard");
  }

  return (
    <div style={{
      minHeight: "100dvh", background: "#09090B",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      display: "flex", flexDirection: "column",
      padding: "60px 24px 120px", position: "relative", overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "fixed", top: "-100px", left: "50%", transform: "translateX(-50%)",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.13) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Logo row */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "40px" }}>
        <div style={{
          width: "28px", height: "28px", borderRadius: "7px",
          background: "linear-gradient(135deg, #6366F1, #818CF8)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 20px rgba(99,102,241,0.35)",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#FAFAFA", letterSpacing: "0.08em" }}>
          GRIK AI
        </span>
      </div>

      {/* Content — matches HTML prototype exactly */}
      <div style={{ flex: 1, animation: "heroIn 0.5s cubic-bezier(0.22,1,0.36,1) both" }}>

        {/* Live badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "7px",
          background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: "20px", padding: "5px 12px", marginBottom: "24px",
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22C55E", display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#818CF8", letterSpacing: "0.06em" }}>
            FREE FOREVER · NO CREDIT CARD
          </span>
        </div>

        {user?.name && (
          <p style={{ fontSize: "14px", color: "#52525B", marginBottom: "8px" }}>
            Welcome back, {user.name.split(" ")[0]} 👋
          </p>
        )}

        <h1 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: "38px", fontWeight: 400, color: "#FAFAFA",
          lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "16px",
        }}>
          Never miss a<br />
          <em style={{ fontStyle: "italic", color: "#818CF8" }}>deadline</em> again.
        </h1>

        <p style={{ fontSize: "14px", color: "#71717A", lineHeight: 1.7, marginBottom: "32px" }}>
          Paste any message, email or notice — AI extracts every deadline and reminds you automatically.
        </p>

        <button onClick={handleCTA} style={{
          width: "100%", padding: "15px",
          background: "linear-gradient(135deg, #6366F1, #818CF8)",
          border: "none", borderRadius: "14px",
          color: "white", fontSize: "15px", fontWeight: 600,
          fontFamily: "inherit", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          boxShadow: "0 8px 32px rgba(99,102,241,0.4)", marginBottom: "12px",
        }}>
          <span>✨</span> {isFirstLogin ? "Get Started" : "Go to Dashboard"}
        </button>

        <button onClick={() => navigate("/dashboard")} style={{
          width: "100%", padding: "13px",
          background: "#141417", border: "1px solid #27272A",
          borderRadius: "14px", color: "#71717A",
          fontSize: "14px", fontWeight: 500,
          fontFamily: "inherit", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          Skip to Dashboard
        </button>

        {/* Feature pills — identical to HTML prototype */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "32px" }}>
          {[
            { icon: "📄", title: "Paste anything", sub: "Emails, WhatsApp, notices, contracts" },
            { icon: "🤖", title: "AI extracts deadlines", sub: "Dates, amounts, tasks — all detected" },
            { icon: "🔔", title: "Smart reminders", sub: "7 days, 3 days, 1 day before due" },
          ].map((f, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "12px",
              background: "#141417", border: "1px solid #27272A",
              borderRadius: "12px", padding: "12px 14px",
              animation: `heroIn 0.5s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.08}s both`,
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "rgba(99,102,241,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px", flexShrink: 0,
              }}>{f.icon}</div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#FAFAFA" }}>{f.title}</div>
                <div style={{ fontSize: "11px", color: "#52525B", marginTop: "2px" }}>{f.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", marginTop: "24px" }}>
          {[
            { val: "∞", lbl: "Deadlines", color: "#6366F1" },
            { val: "Free", lbl: "Forever", color: "#22C55E" },
            { val: "AI", lbl: "Powered", color: "#F59E0B" },
          ].map((s, i) => (
            <div key={i} style={{
              background: "#141417", border: "1px solid #27272A",
              borderRadius: "12px", padding: "12px", textAlign: "center",
            }}>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: "24px", color: s.color }}>{s.val}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: "#52525B", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "4px" }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes heroIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.3)} }
      `}</style>
    </div>
  );
}
