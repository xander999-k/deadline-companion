export function getDayDiff(dateStr: string) {
  const today = new Date();
  const due = new Date(dateStr);

  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  return Math.round(
    (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
}

export function humanDate(dateStr: string | null) {
  if (!dateStr) return "No date";

  const diff = getDayDiff(dateStr);

  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff > 1 && diff <= 7) return `In ${diff} days`;
  if (diff < 0) return `${Math.abs(diff)} days overdue`;

  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}
