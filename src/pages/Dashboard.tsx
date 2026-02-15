import { useTaskStore } from '@/stores/useTaskStore';
import { TaskCard } from '@/components/TaskCard';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const tasks = useTaskStore((s) => s.tasks);
  const navigate = useNavigate();

  const activeTasks = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <div className="mx-auto max-w-lg px-4 pb-24 pt-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Your upcoming deadlines</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {activeTasks.length} active {activeTasks.length === 1 ? 'task' : 'tasks'}
        </p>
      </header>

      {activeTasks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {activeTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      <Button
        onClick={() => navigate('/add')}
        size="icon"
        className="fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full shadow-lg"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}
