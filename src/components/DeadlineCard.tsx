import { ChevronRight, CalendarDays, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";
import { humanDate, getDayDiff } from "@/lib/dateUtils";

function getUrgency(due_date: string | null) {
  if (!due_date) return {
    bar: "rgb(var(--border-2))", badge: "badge-muted", label: "No date", icon: null,
  };
  const diff = getDayDiff(due_date);
  if (diff < 0)  return { bar: "rgb(var(--danger))",  badge: "badge-danger",  label: "Overdue",    icon: <AlertTriangle size={10} /> };
  if (diff === 0) return { bar: "rgb(var(--warning))", badge: "badge-warning", label: "Due today",  icon: <Clock size={10} /> };
  if (diff <= 3)  return { bar: "rgb(var(--warning))", badge: "badge-warning", label: `${diff}d left`, icon: <Clock size={10} /> };
  if (diff <= 7)  return { bar: "rgb(var(--accent))",  badge: "badge-accent",  label: `${diff}d left`, icon: <Clock size={10} /> };
  return          { bar: "rgb(var(--success))",         badge: "badge-success", label: "Scheduled",  icon: <CheckCircle2 size={10} /> };
}

export default function DeadlineCard({ item }: any) {
  const urgency   = getUrgency(item.due_date);
  const dateLabel = humanDate(item.due_date);
  const fullDate  = item.due_date
    ? new Date(item.due_date).toLocaleDateString(undefined, {
        weekday: "short", month: "short", day: "numeric", year: "numeric",
      })
    : null;

  return (
    <div
      className="card card-hover relative flex items-stretch transition-all animate-slide-up"
      style={{ overflow: "hidden" }}
    >
      {/* Left urgency bar */}
      <div style={{ width: "3px", background: urgency.bar, flexShrink: 0, borderRadius: "10px 0 0 10px" }} />

      <div className="flex-1 px-3.5 py-3">
        {/* Title */}
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-semibold text-primary leading-snug flex-1">
            {item.title}
          </p>
          <ChevronRight size={14} className="text-muted mt-0.5 flex-shrink-0" />
        </div>

        {/* Date row */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <CalendarDays size={12} className="text-muted flex-shrink-0" />
          <span className="text-xs font-mono font-medium text-secondary">{dateLabel}</span>
          {fullDate && (
            <span className="text-xs text-muted">· {fullDate}</span>
          )}
        </div>

        {/* Bottom row */}
        <div className="flex items-center gap-2 mt-2">
          <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${urgency.badge}`}>
            {urgency.icon}
            {urgency.label}
          </span>
          {item.amount && (
            <span className="ml-auto text-xs font-mono font-semibold text-secondary">
              ₹{item.amount}
            </span>
          )}
          {item.confidence && (
            <span className="text-[10px] text-muted font-mono">
              {Math.round(item.confidence * 100)}% conf.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
