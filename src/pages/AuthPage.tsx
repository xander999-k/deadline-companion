import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";

/* ── password strength ── */
function strength(pw: string) {
  if (!pw) return { score: 0, label: "", color: "transparent" };
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;

  const map = [
    { label: "Weak", color: "#EF4444" },
    { label: "Fair", color: "#F59E0B" },
    { label: "Good", color: "#3B82F6" },
    { label: "Strong", color: "#22C55E" },
  ];

  return { score: s, ...map[Math.max(0, s - 1)] };
}

type Mode = "login" | "signup";

export default function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const pw = strength(password);
  const isLogin = mode === "login";

  useEffect(() => {
    emailRef.current?.focus();
  }, [mode]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setDone(true);
    await new Promise(r => setTimeout(r, 400));
    login();
    navigate("/");
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#09090B",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <div style={{ width: "100%", maxWidth: 400 }}>
        <h1 style={{ color: "#FAFAFA", fontSize: 28, marginBottom: 8 }}>
          {isLogin ? "Welcome back" : "Create account"}
        </h1>
        <p style={{ color: "#71717A", fontSize: 14, marginBottom: 24 }}>
          {isLogin ? "Sign in to continue" : "Start tracking deadlines"}
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {!isLogin && (
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Full name"
              required
              style={inputStyle}
              onFocus={focus}
              onBlur={blur}
            />
          )}

          <input
            ref={emailRef}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={inputStyle}
            onFocus={focus}
            onBlur={blur}
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{ ...inputStyle, paddingRight: 44 }}
              onFocus={focus}
              onBlur={blur}
            />
            <button
              type="button"
              onClick={() => setShowPw(v => !v)}
              style={eyeButton}
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {!isLogin && password && (
            <div style={{ fontSize: 12, color: pw.color }}>
              {pw.label}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || done}
            style={{
              marginTop: 8,
              padding: 12,
              borderRadius: 10,
              border: "none",
              background: done ? "#22C55E" : "#6366F1",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {done ? (
              <><Check size={16} /> Done</>
            ) : loading ? "Loading…" : isLogin ? "Sign in" : "Create account"}
          </button>
        </form>

        <p style={{ marginTop: 20, fontSize: 13, color: "#71717A" }}>
          {isLogin ? "No account? " : "Already have one? "}
          <button
            onClick={() => setMode(isLogin ? "signup" : "login")}
            style={{ background: "none", border: "none", color: "#6366F1", cursor: "pointer" }}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

/* ── styles ── */
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  background: "#0F0F12",
  border: "1px solid #27272A",
  color: "#FAFAFA",
  outline: "none",
  fontSize: 14,
};

const focus = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = "#6366F1";
};

const blur = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = "#27272A";
};

const eyeButton: React.CSSProperties = {
  position: "absolute",
  right: 12,
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  color: "#52525B",
  cursor: "pointer",
};
