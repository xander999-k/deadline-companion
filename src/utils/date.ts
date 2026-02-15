import { differenceInDays, differenceInHours, format, isPast, isToday, isTomorrow, addDays, setHours, setMinutes } from 'date-fns';

export function getCountdownText(dueDate: string): string {
  const due = new Date(dueDate);
  const now = new Date();

  if (isPast(due) && !isToday(due)) return 'Overdue';
  if (isToday(due)) return 'Due today';
  if (isTomorrow(due)) return 'Due tomorrow';

  const days = differenceInDays(due, now);
  if (days < 1) {
    const hours = differenceInHours(due, now);
    return `${hours} hour${hours !== 1 ? 's' : ''} left`;
  }
  return `${days} day${days !== 1 ? 's' : ''} left`;
}

export function getUrgencyLevel(dueDate: string): 'overdue' | 'urgent' | 'soon' | 'normal' {
  const due = new Date(dueDate);
  const now = new Date();
  const days = differenceInDays(due, now);

  if (isPast(due) && !isToday(due)) return 'overdue';
  if (days <= 1) return 'urgent';
  if (days <= 3) return 'soon';
  return 'normal';
}

export function formatDueDate(dueDate: string): string {
  return format(new Date(dueDate), 'MMM d, yyyy');
}

export function getReminderDates(dueDate: string, daysBefore: number[]): Date[] {
  const due = new Date(dueDate);
  return daysBefore.map((days) => {
    const date = days === 0 ? due : addDays(due, -days);
    return setMinutes(setHours(date, 8), 0); // 8:00 AM
  });
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
