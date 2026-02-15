import { useParams, useNavigate } from 'react-router-dom';
import { useTaskStore } from '@/stores/useTaskStore';
import { getCountdownText, getUrgencyLevel, formatDueDate, getReminderDates } from '@/utils/date';
import { cancelTaskReminders } from '@/services/notificationService';
import { CategoryBadge } from '@/components/CategoryBadge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Pencil, Trash2, Bell, CalendarDays, DollarSign, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, deleteTask, reminderIntervals } = useTaskStore();
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Task not found</p>
      </div>
    );
  }

  const urgency = getUrgencyLevel(task.dueDate);
  const countdown = getCountdownText(task.dueDate);
  const enabledIntervals = reminderIntervals.filter((i) => i.enabled);
  const reminderDates = getReminderDates(
    task.dueDate,
    enabledIntervals.map((i) => i.daysBefore)
  ).filter((d) => d > new Date());

  function handleDelete() {
    cancelTaskReminders(task!.id);
    deleteTask(task!.id);
    navigate('/');
  }

  return (
    <div className="mx-auto max-w-lg px-4 pb-24 pt-4 animate-fade-in">
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Task Details</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/edit/${task.id}`)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this task?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove "{task.title}" and cancel all its reminders.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </header>

      {/* Countdown hero */}
      <Card className="mb-6 p-6 text-center">
        <p
          className={cn(
            'text-3xl font-bold',
            urgency === 'overdue' && 'text-red-500',
            urgency === 'urgent' && 'text-orange-500',
            urgency === 'soon' && 'text-amber-500',
            urgency === 'normal' && 'text-primary'
          )}
        >
          {countdown}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{formatDueDate(task.dueDate)}</p>
      </Card>

      {/* Info */}
      <Card className="mb-6 space-y-4 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{task.title}</h2>
          <CategoryBadge category={task.category} />
        </div>

        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 shrink-0" />
            <span>Due {formatDueDate(task.dueDate)}</span>
          </div>
          {task.amount && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 shrink-0" />
              <span>₹{task.amount.toLocaleString()}</span>
            </div>
          )}
          {task.notes && (
            <div className="flex items-start gap-2">
              <FileText className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{task.notes}</span>
            </div>
          )}
        </div>
      </Card>

      {/* Reminder schedule */}
      <Card className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Upcoming Reminders</h3>
        </div>
        {reminderDates.length === 0 ? (
          <p className="text-sm text-muted-foreground">No upcoming reminders</p>
        ) : (
          <ul className="space-y-2">
            {reminderDates.map((date, i) => (
              <li key={i} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{enabledIntervals[i]?.label}</span>
                <span className="font-medium">{format(date, 'MMM d, h:mm a')}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
