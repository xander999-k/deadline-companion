import { NavLink } from "react-router-dom";
import { Home, Plus, Settings } from "lucide-react";

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-6"
      style={{
        background: "rgb(var(--surface))",
        borderTop: "1px solid rgb(var(--border))",
        paddingTop: "10px",
        paddingBottom: "max(18px, env(safe-area-inset-bottom))",
        boxShadow: "0 -1px 0 rgb(var(--border))",
      }}
    >
      <NavLink to="/" style={({ isActive }) => ({ color: isActive ? "rgb(var(--accent))" : "rgb(var(--text-3))" })}>
        {({ isActive }) => (
          <div className="flex flex-col items-center gap-1">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-all"
              style={{ background: isActive ? "rgb(var(--accent-2))" : "transparent" }}
            >
              <Home size={18} strokeWidth={isActive ? 2.5 : 1.8} />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider">Home</span>
          </div>
        )}
      </NavLink>

      {/* Center FAB */}
      <NavLink to="/add" className="-mt-6">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all active:scale-95"
          style={{
            background: "rgb(var(--accent))",
            boxShadow: "0 4px 20px rgba(99,102,241,0.4), 0 1px 4px rgba(0,0,0,0.2)",
          }}
        >
          <Plus size={24} color="white" strokeWidth={2.5} />
        </div>
      </NavLink>

      <NavLink to="/settings" style={({ isActive }) => ({ color: isActive ? "rgb(var(--accent))" : "rgb(var(--text-3))" })}>
        {({ isActive }) => (
          <div className="flex flex-col items-center gap-1">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-all"
              style={{ background: isActive ? "rgb(var(--accent-2))" : "transparent" }}
            >
              <Settings size={18} strokeWidth={isActive ? 2.5 : 1.8} />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider">Settings</span>
          </div>
        )}
      </NavLink>
    </nav>
  );
}
