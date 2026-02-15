import { Task } from '@/types/task';
import { getCountdownText, getUrgencyLevel, formatDueDate } from '@/utils/date';
import { CategoryBadge } from './CategoryBadge';
import { Card } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const urgencyColors = {
  overdue: 'border-l-red-400',
  urgent: 'border-l-orange-400',
  soon: 'border-l-amber-300',
  normal: 'border-l-blue-200',
};

export function TaskCard({ task }: { task: Task }) {
  const navigate = useNavigate();
  const countdown = getCountdownText(task.dueDate);
  const urgency = getUrgencyLevel(task.dueDate);

  return (
    <Card
      onClick={() => navigate(`/task/${task.id}`)}
      className={cn(
        'cursor-pointer border-l-4 p-4 transition-all hover:shadow-md active:scale-[0.98]',
        urgencyColors[urgency],
        'animate-fade-in'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-1.5">
          <h3 className="truncate text-base font-semibold text-foreground">{task.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" />
            <span>{formatDueDate(task.dueDate)}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <CategoryBadge category={task.category} />
          <span
            className={cn(
              'text-xs font-medium',
              urgency === 'overdue' && 'text-red-500',
              urgency === 'urgent' && 'text-orange-500',
              urgency === 'soon' && 'text-amber-500',
              urgency === 'normal' && 'text-muted-foreground'
            )}
          >
            {countdown}
          </span>
        </div>
      </div>
    </Card>
  );
}
