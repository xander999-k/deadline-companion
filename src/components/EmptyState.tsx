import { CalendarDays, ArrowDown } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center animate-fade-in">
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
        style={{ background: "rgb(var(--surface))", border: "1px solid rgb(var(--border))" }}
      >
        <CalendarDays size={28} className="text-muted" />
      </div>

      <h2 className="text-base font-semibold text-primary mb-1">
        No deadlines tracked
      </h2>
      <p className="text-sm text-secondary max-w-xs leading-relaxed">
        Upload an audit document, contract, or paste any message — GRIK AI will extract and track every deadline automatically.
      </p>

      <div
        className="mt-8 flex items-center gap-2 text-xs font-medium text-muted"
      >
        <ArrowDown size={12} />
        Tap + to add your first deadline
      </div>
    </div>
  );
}
