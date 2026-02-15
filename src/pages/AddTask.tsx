import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTaskStore } from '@/stores/useTaskStore';
import { Task, TaskCategory, TASK_CATEGORIES } from '@/types/task';
import { generateId } from '@/utils/date';
import { scheduleTaskReminders, cancelTaskReminders } from '@/services/notificationService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function AddTask() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasks, addTask, updateTask, reminderIntervals } = useTaskStore();

  const existingTask = id ? tasks.find((t) => t.id === id) : null;

  const [title, setTitle] = useState(existingTask?.title ?? '');
  const [category, setCategory] = useState<TaskCategory>(existingTask?.category ?? 'Assignment');
  const [dueDate, setDueDate] = useState<Date | undefined>(
    existingTask ? new Date(existingTask.dueDate) : undefined
  );
  const [amount, setAmount] = useState(existingTask?.amount?.toString() ?? '');
  const [notes, setNotes] = useState(existingTask?.notes ?? '');

  const isEdit = !!existingTask;

  function handleSave() {
    if (!title.trim() || !dueDate) return;

    const task: Task = {
      id: existingTask?.id ?? generateId(),
      title: title.trim(),
      category,
      dueDate: dueDate.toISOString(),
      amount: amount ? parseFloat(amount) : undefined,
      notes: notes.trim() || undefined,
      createdAt: existingTask?.createdAt ?? new Date().toISOString(),
      completed: false,
    };

    if (isEdit) {
      cancelTaskReminders(task.id);
      updateTask(task.id, task);
    } else {
      addTask(task);
    }

    scheduleTaskReminders(task, reminderIntervals);
    navigate(-1);
  }

  return (
    <div className="mx-auto max-w-lg px-4 pb-24 pt-4">
      <header className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold text-foreground">{isEdit ? 'Edit Task' : 'New Task'}</h1>
      </header>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="e.g. Submit math assignment"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as TaskCategory)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TASK_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn('w-full justify-start text-left font-normal', !dueDate && 'text-muted-foreground')}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate ? format(dueDate, 'PPP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount (optional)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="e.g. 5000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes (optional)</Label>
          <Textarea
            id="notes"
            placeholder="Any additional details..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>

        <Button
          onClick={handleSave}
          disabled={!title.trim() || !dueDate}
          className="w-full"
          size="lg"
        >
          {isEdit ? 'Update Task' : 'Save Task'}
        </Button>
      </div>
    </div>
  );
}
