import { CalendarCheck } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-20 text-center animate-fade-in">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <CalendarCheck className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="mb-2 text-xl font-semibold text-foreground">No deadlines yet</h2>
      <p className="max-w-xs text-sm text-muted-foreground">
        Tap the + button to add your first deadline. We'll remind you before it's due.
      </p>
    </div>
  );
}
