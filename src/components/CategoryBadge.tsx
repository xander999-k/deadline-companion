import { TaskCategory } from '@/types/task';
import { cn } from '@/lib/utils';

const categoryStyles: Record<TaskCategory, string> = {
  Fee: 'bg-blue-50 text-blue-700 border-blue-200',
  Assignment: 'bg-amber-50 text-amber-700 border-amber-200',
  Exam: 'bg-red-50 text-red-700 border-red-200',
  Attendance: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Other: 'bg-gray-50 text-gray-600 border-gray-200',
};

export function CategoryBadge({ category }: { category: TaskCategory }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        categoryStyles[category]
      )}
    >
      {category}
    </span>
  );
}
