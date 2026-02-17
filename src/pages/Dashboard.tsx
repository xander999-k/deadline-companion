import { useDeadlines } from "@/context/DeadlineContext";
import { groupDeadlines } from "@/lib/groupDeadlines";
import DeadlineCard from "@/components/DeadlineCard";
import { useTheme } from "@/useTheme";

function Section({ title, items }: any) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase">
        {title}
      </h2>

      {items.map((d: any, i: number) => (
        <DeadlineCard key={i} item={d} />
      ))}
    </div>
  );
}

export default function Dashboard() {
  const { deadlines } = useDeadlines();
  const { theme, toggleTheme } = useTheme();

  if (!deadlines || deadlines.length === 0) {
    return (
      <div className="relative min-h-screen p-6 text-center text-muted-foreground">
        <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 rounded-full border px-3 py-2 text-sm hover:bg-muted transition"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>

        <div className="mt-24">
          No deadlines yet.
          <br />
          Use the + button below.
        </div>
      </div>
    );
  }

  const grouped = groupDeadlines(deadlines);

  return (
    <div className="relative min-h-screen p-4 space-y-6 pb-24">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 rounded-full border px-3 py-2 text-sm hover:bg-muted transition"
      >
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>

      <Section title="Overdue" items={grouped.overdue} />
      <Section title="Today" items={grouped.today} />
      <Section title="This Week" items={grouped.week} />
      <Section title="Later" items={grouped.later} />
    </div>
  );
}
