import { getDayDiff } from "./dateUtils";

export function groupDeadlines(deadlines: any[]) {
  const groups = {
    overdue: [],
    today: [],
    week: [],
    later: [],
  };

  deadlines.forEach((d) => {
    if (!d.due_date) {
      groups.later.push(d);
      return;
    }

    const diff = getDayDiff(d.due_date);

    if (diff < 0) groups.overdue.push(d);
    else if (diff === 0) groups.today.push(d);
    else if (diff <= 7) groups.week.push(d);
    else groups.later.push(d);
  });

  return groups;
}
