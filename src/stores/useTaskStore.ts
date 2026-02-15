import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, ReminderInterval, DEFAULT_REMINDER_INTERVALS } from '@/types/task';

interface TaskState {
  tasks: Task[];
  notificationsEnabled: boolean;
  reminderIntervals: ReminderInterval[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleNotifications: (enabled: boolean) => void;
  toggleReminderInterval: (intervalId: string, enabled: boolean) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      notificationsEnabled: true,
      reminderIntervals: DEFAULT_REMINDER_INTERVALS,

      addTask: (task) =>
        set((state) => ({ tasks: [...state.tasks, task] })),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),

      deleteTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),

      toggleNotifications: (enabled) =>
        set({ notificationsEnabled: enabled }),

      toggleReminderInterval: (intervalId, enabled) =>
        set((state) => ({
          reminderIntervals: state.reminderIntervals.map((r) =>
            r.id === intervalId ? { ...r, enabled } : r
          ),
        })),
    }),
    { name: 'deadline-assistant-tasks' }
  )
);
