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
    <div
      style={{
        minHeight: "100dvh",
        background: "#09090B",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        padding: "60px 24px 120px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "fixed",
          top: "-120px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.13) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* CENTERED COLUMN (THIS IS THE KEY) */}
      <div
        style={{
          maxWidth: "560px",
          margin: "0 auto",
        }}
      >
        {/* Logo row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #6366F1, #818CF8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 22px rgba(99,102,241,0.4)",
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>

          {/* Slightly larger brand */}
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "13px",
              color: "#FAFAFA",
              letterSpacing: "0.1em",
            }}
          >
            GRIK AI
          </span>
        </div>

        {/* HERO CONTENT (LEFT-ALIGNED, COLUMN-CENTERED) */}
        <div
          style={{
            animation: "heroIn 0.5s cubic-bezier(0.22,1,0.36,1) both",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: "20px",
              padding: "5px 12px",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#22C55E",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                color: "#818CF8",
                letterSpacing: "0.06em",
              }}
            >
              FREE FOREVER · NO CREDIT CARD
            </span>
          </div>

          {user?.name && (
            <p
              style={{
                fontSize: "14px",
                color: "#52525B",
                marginBottom: "8px",
              }}
            >
              Welcome back, {user.name.split(" ")[0]} 👋
            </p>
          )}

          <h1
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "38px",
              fontWeight: 400,
              color: "#FAFAFA",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Never miss a
            <br />
            <em style={{ fontStyle: "italic", color: "#818CF8" }}>
              deadline
            </em>{" "}
            again.
          </h1>

          <p
            style={{
              fontSize: "14px",
              color: "#71717A",
              lineHeight: 1.7,
              marginBottom: "32px",
            }}
          >
            Paste any message, email or notice — AI extracts every deadline and
            reminds you automatically.
          </p>

          {/* Primary CTA — VISUAL CENTER ANCHOR */}
          <button
            onClick={handleCTA}
            style={{
              width: "100%",
              padding: "16px",
              background: "linear-gradient(135deg, #6366F1, #818CF8)",
              border: "none",
              borderRadius: "16px",
              color: "white",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 10px 36px rgba(99,102,241,0.45)",
              marginBottom: "12px",
            }}
          >
            ✨ Go to Dashboard
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            style={{
              width: "100%",
              padding: "13px",
              background: "#141417",
              border: "1px solid #27272A",
              borderRadius: "14px",
              color: "#71717A",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Skip to Dashboard
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}