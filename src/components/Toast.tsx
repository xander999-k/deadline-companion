import { useEffect, useState, createContext, useContext, useCallback, ReactNode } from "react";
import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";
interface ToastMsg { id: number; message: string; type: ToastType; }
interface ToastCtx { toast: (message: string, type?: ToastType) => void; }

const ToastContext = createContext<ToastCtx>({ toast: () => {} });

export function useToast() { return useContext(ToastContext); }

function ToastItem({ msg, onRemove }: { msg: ToastMsg; onRemove: (id: number) => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 2700);
    const t2 = setTimeout(() => onRemove(msg.id), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const icons = {
    success: <CheckCircle2 size={15} style={{ color: "rgb(var(--success))", flexShrink: 0 }} />,
    error:   <AlertCircle  size={15} style={{ color: "rgb(var(--danger))",  flexShrink: 0 }} />,
    info:    <Info         size={15} style={{ color: "rgb(var(--accent))",  flexShrink: 0 }} />,
  };

  const barColors = {
    success: "rgb(var(--success))",
    error:   "rgb(var(--danger))",
    info:    "rgb(var(--accent))",
  };

  return (
    <div
      className={leaving ? "animate-toast-out" : "animate-toast-in"}
      style={{
        background: "rgb(var(--surface))",
        border: "1px solid rgb(var(--border-2))",
        borderRadius: "10px",
        padding: "12px 14px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        minWidth: "260px",
        maxWidth: "340px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.24), 0 1px 3px rgba(0,0,0,0.12)",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
      }}
      onClick={() => { setLeaving(true); setTimeout(() => onRemove(msg.id), 250); }}
    >
      {icons[msg.type]}
      <span style={{ fontSize: "13px", fontWeight: 500, color: "rgb(var(--text))", flex: 1, lineHeight: 1.4 }}>
        {msg.message}
      </span>
      <X size={13} style={{ color: "rgb(var(--text-3))", flexShrink: 0 }} />
      {/* Progress bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, height: "2px",
        background: barColors[msg.type], borderRadius: "0 0 10px 10px",
      }}
        className="animate-progress"
      />
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
  }, []);

  const remove = useCallback((id: number) => {
    setToasts(p => p.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container */}
      <div style={{
        position: "fixed", bottom: "100px", left: "50%",
        transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", gap: "8px",
        alignItems: "center", zIndex: 9999, pointerEvents: "none",
      }}>
        {toasts.map(msg => (
          <div key={msg.id} style={{ pointerEvents: "all" }}>
            <ToastItem msg={msg} onRemove={remove} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
