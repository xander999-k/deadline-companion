import { Task, ReminderInterval } from '@/types/task';
import { getReminderDates } from '@/utils/date';
import { format } from 'date-fns';

// Capacitor notification scheduling stub
// In production, this uses @capacitor/local-notifications
// For web preview, we just log the scheduled notifications

export function scheduleTaskReminders(
  task: Task,
  intervals: ReminderInterval[]
): void {
  const enabledDays = intervals.filter((i) => i.enabled).map((i) => i.daysBefore);
  const reminderDates = getReminderDates(task.dueDate, enabledDays);

  reminderDates.forEach((date, index) => {
    if (date > new Date()) {
      const daysBefore = enabledDays[index];
      const body = getReminderText(task, daysBefore);
      console.log(`[Notification scheduled] ${format(date, 'MMM d, yyyy h:mm a')}: ${body}`);
      // Capacitor: LocalNotifications.schedule({ notifications: [{ id, title, body, schedule: { at: date } }] })
    }
  });
}

export function cancelTaskReminders(taskId: string): void {
  console.log(`[Notifications cancelled] for task ${taskId}`);
  // Capacitor: LocalNotifications.cancel({ notifications: [...] })
}

function getReminderText(task: Task, daysBefore: number): string {
  const category = task.category.toLowerCase();
  if (daysBefore === 0) return `Today — ${category}: "${task.title}" is due now.`;
  if (daysBefore === 1) return `1 day left — ${category}: "${task.title}" is due tomorrow.`;
  return `${daysBefore} days left — ${category}: "${task.title}" is coming up.`;
}

export function getUpcomingReminders(
  tasks: Task[],
  intervals: ReminderInterval[]
): { task: Task; date: Date; label: string }[] {
  const now = new Date();
  const reminders: { task: Task; date: Date; label: string }[] = [];

  tasks.forEach((task) => {
    if (task.completed) return;
    const enabledIntervals = intervals.filter((i) => i.enabled);
    const dates = getReminderDates(
      task.dueDate,
      enabledIntervals.map((i) => i.daysBefore)
    );

    dates.forEach((date, i) => {
      if (date > now) {
        reminders.push({
          task,
          date,
          label: enabledIntervals[i].label,
        });
      }
    });
  });

  return reminders.sort((a, b) => a.date.getTime() - b.date.getTime());
}
