import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";

/* ── Google SVG ── */
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
    <path d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

export default function AuthPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  function handleLogin() {
    setLoading(true);
    login(); // triggers Auth0 Universal Login redirect
  }

  function handleGoogle() {
    setLoading(true);
    // Auth0 will show Google as a social connection
    // To force Google directly, configure it in Auth0 dashboard
    login();
  }

  return (
    <div style={{
      minHeight: "100dvh",
      background: "#09090B",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 20px",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle noise texture */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.03, pointerEvents: "none", zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Ambient glow */}
      <div style={{
        position: "fixed", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
        width: "500px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{
        width: "100%", maxWidth: "400px", position: "relative", zIndex: 1,
        animation: "authIn 0.4s cubic-bezier(0.22,1,0.36,1) both",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <Logo size={44} />
          </div>

          <h1 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "clamp(28px, 7vw, 34px)",
            fontWeight: 400, color: "#FAFAFA",
            margin: "0 0 10px", lineHeight: 1.15, letterSpacing: "-0.02em",
          }}>
            Never miss a deadline.
          </h1>
          <p style={{ fontSize: "14px", color: "#71717A", lineHeight: 1.6, margin: 0 }}>
            AI-powered deadline extraction for compliance teams, students, and professionals.
          </p>
        </div>

        {/* Feature pills */}
        <div style={{
          display: "flex", gap: "8px", justifyContent: "center",
          flexWrap: "wrap", marginBottom: "32px",
        }}>
          {["📄 PDF extraction", "🔔 Smart reminders", "🏢 Team ready"].map(f => (
            <span key={f} style={{
              fontSize: "12px", color: "#52525B",
              background: "#141417", border: "1px solid #27272A",
              borderRadius: "20px", padding: "4px 12px",
              fontFamily: "'DM Mono', monospace",
            }}>
              {f}
            </span>
          ))}
        </div>

        {/* Auth buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            style={{
              width: "100%", display: "flex", alignItems: "center",
              justifyContent: "center", gap: "10px",
              padding: "13px", borderRadius: "10px",
              border: "1px solid #27272A", background: "#141417",
              color: "#FAFAFA", fontSize: "14px", fontWeight: 500,
              cursor: loading ? "wait" : "pointer",
              transition: "all 0.15s", opacity: loading ? 0.6 : 1,
              fontFamily: "inherit",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#3F3F46"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#27272A"}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ flex: 1, height: "1px", background: "#1F1F23" }} />
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px", color: "#3F3F46", letterSpacing: "0.08em",
            }}>OR</span>
            <div style={{ flex: 1, height: "1px", background: "#1F1F23" }} />
          </div>

          {/* Email */}
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: "100%", display: "flex", alignItems: "center",
              justifyContent: "center", gap: "8px",
              padding: "13px", borderRadius: "10px", border: "none",
              background: loading
                ? "#1C1C22"
                : "linear-gradient(135deg, #6366F1 0%, #818CF8 100%)",
              color: "white", fontSize: "14px", fontWeight: 600,
              cursor: loading ? "wait" : "pointer",
              transition: "all 0.2s", opacity: loading ? 0.7 : 1,
              fontFamily: "inherit",
              boxShadow: loading ? "none" : "0 4px 20px rgba(99,102,241,0.35)",
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = "0.88"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
          >
            {loading ? (
              <div style={{
                width: 16, height: 16, borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.3)",
                borderTopColor: "white",
                animation: "spin 0.7s linear infinite",
              }} />
            ) : (
              <>Continue with Email <ArrowRight size={15} /></>
            )}
          </button>
        </div>

        {/* Free tier callout */}
        <div style={{
          marginTop: "24px", padding: "14px 16px", borderRadius: "10px",
          background: "#0F0F12", border: "1px solid #1F1F23",
          display: "flex", alignItems: "flex-start", gap: "10px",
        }}>
          <span style={{ fontSize: "16px", flexShrink: 0 }}>🎉</span>
          <div>
            <p style={{ margin: "0 0 2px", fontSize: "13px", fontWeight: 600, color: "#FAFAFA" }}>
              Free plan included
            </p>
            <p style={{ margin: 0, fontSize: "12px", color: "#52525B", lineHeight: 1.5 }}>
              10 document analyses per month, unlimited deadlines. Upgrade anytime for unlimited access.
            </p>
          </div>
        </div>

        {/* Terms */}
        <p style={{
          textAlign: "center", marginTop: "20px",
          fontSize: "12px", color: "#3F3F46", lineHeight: 1.6,
        }}>
          By continuing you agree to our{" "}
          <a href="/terms" style={{ color: "#6366F1", textDecoration: "none" }}>Terms</a>
          {" "}and{" "}
          <a href="/privacy" style={{ color: "#6366F1", textDecoration: "none" }}>Privacy Policy</a>.
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes authIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
