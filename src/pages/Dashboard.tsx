import { useDeadlines } from "@/context/DeadlineContext";
import { groupDeadlines } from "@/lib/groupDeadlines";
import DeadlineCard from "@/components/DeadlineCard";
import { EmptyState } from "@/components/EmptyState";
import { useTheme } from "@/useTheme";
import { Sun, Moon, AlertTriangle, Clock, Calendar, LayoutGrid } from "lucide-react";
import { Logo } from "@/components/Logo";

function SectionHeader({ title, count, icon: Icon, color }: any) {
  return (
    <div className="flex items-center justify-between mb-2 px-0.5">
      <div className="flex items-center gap-2">
        <Icon size={13} style={{ color }} />
        <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
          {title}
        </span>
      </div>
      <span
        className="text-xs font-mono font-medium px-2 py-0.5 rounded-full"
        style={{ background: "rgb(var(--surface-2))", color: "rgb(var(--text-3))" }}
      >
        {count}
      </span>
    </div>
  );
}

function Section({ title, items, icon, color }: any) {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-2 animate-slide-up">
      <SectionHeader title={title} count={items.length} icon={icon} color={color} />
      <div className="stagger space-y-2">
        {items.map((d: any, i: number) => (
          <DeadlineCard key={i} item={d} />
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { deadlines } = useDeadlines();
  const { theme, toggleTheme } = useTheme();
  const isEmpty = !deadlines || deadlines.length === 0;
  const grouped = isEmpty ? null : groupDeadlines(deadlines);

  const overdueCount = grouped?.overdue?.length ?? 0;

  return (
    <div className="min-h-screen bg-app pb-28">

      {/* ── TOP BAR ── */}
      <div
        className="sticky top-0 z-20 px-4 pt-10 pb-3"
        style={{
          background: "rgb(var(--bg))",
          borderBottom: "1px solid rgb(var(--border))",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Logo size={28} />
              {overdueCount > 0 && (
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded flex items-center gap-1"
                  style={{ background: "rgba(var(--danger),0.1)", color: "rgb(var(--danger))" }}
                >
                  <AlertTriangle size={10} />
                  {overdueCount} overdue
                </span>
              )}
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-primary">
              Deadlines
            </h1>
          </div>

          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-lg transition-all active:scale-95"
            style={{
              background: "rgb(var(--surface))",
              border: "1px solid rgb(var(--border))",
              color: "rgb(var(--text-2))",
            }}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        {/* Stats bar */}
        {!isEmpty && (
          <div className="flex items-center gap-3 mt-3">
            {[
              { label: "Total",   val: deadlines!.length,        color: "rgb(var(--text-3))" },
              { label: "Overdue", val: grouped!.overdue?.length ?? 0, color: "rgb(var(--danger))" },
              { label: "Today",   val: grouped!.today?.length ?? 0,   color: "rgb(var(--warning))" },
              { label: "Upcoming",val: (grouped!.week?.length ?? 0) + (grouped!.later?.length ?? 0), color: "rgb(var(--success))" },
            ].map(s => (
              <div key={s.label} className="flex flex-col">
                <span className="text-base font-semibold font-mono" style={{ color: s.color }}>{s.val}</span>
                <span className="text-[10px] uppercase tracking-wider text-muted">{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── CONTENT ── */}
      <div className="px-4 pt-5 space-y-7">
        {isEmpty ? (
          <EmptyState />
        ) : (
          <>
            <Section title="Overdue"   items={grouped!.overdue} icon={AlertTriangle} color="rgb(var(--danger))" />
            <Section title="Today"     items={grouped!.today}   icon={Clock}         color="rgb(var(--warning))" />
            <Section title="This Week" items={grouped!.week}    icon={Calendar}      color="rgb(var(--accent))" />
            <Section title="Later"     items={grouped!.later}   icon={LayoutGrid}    color="rgb(var(--text-3))" />
          </>
        )}
      </div>
    </div>
  );
}
