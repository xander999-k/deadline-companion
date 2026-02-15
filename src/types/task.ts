export type TaskCategory = 'Fee' | 'Assignment' | 'Exam' | 'Attendance' | 'Other';

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  dueDate: string; // ISO string
  amount?: number;
  notes?: string;
  createdAt: string;
  completed: boolean;
}

export interface ReminderInterval {
  id: string;
  label: string;
  daysBefore: number;
  enabled: boolean;
}

export const DEFAULT_REMINDER_INTERVALS: ReminderInterval[] = [
  { id: '7d', label: '7 days before', daysBefore: 7, enabled: true },
  { id: '3d', label: '3 days before', daysBefore: 3, enabled: true },
  { id: '1d', label: '1 day before', daysBefore: 1, enabled: true },
  { id: '0d', label: 'Morning of due date', daysBefore: 0, enabled: true },
];

export const TASK_CATEGORIES: TaskCategory[] = ['Fee', 'Assignment', 'Exam', 'Attendance', 'Other'];
