import { useTaskStore } from '@/stores/useTaskStore';
import { getUpcomingReminders } from '@/services/notificationService';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Bell, BellOff, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function SettingsPage() {
  const {
    tasks,
    notificationsEnabled,
    reminderIntervals,
    toggleNotifications,
    toggleReminderInterval,
  } = useTaskStore();

  const upcomingReminders = notificationsEnabled
    ? getUpcomingReminders(tasks, reminderIntervals).slice(0, 10)
    : [];

  return (
    <div className="mx-auto max-w-lg px-4 pb-24 pt-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      </header>

      {/* Global toggle */}
      <Card className="mb-4 flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {notificationsEnabled ? (
            <Bell className="h-5 w-5 text-primary" />
          ) : (
            <BellOff className="h-5 w-5 text-muted-foreground" />
          )}
          <Label htmlFor="notifications" className="text-base font-medium cursor-pointer">
            Notifications
          </Label>
        </div>
        <Switch
          id="notifications"
          checked={notificationsEnabled}
          onCheckedChange={toggleNotifications}
        />
      </Card>

      {/* Per-interval toggles */}
      {notificationsEnabled && (
        <Card className="mb-6 divide-y p-0">
          {reminderIntervals.map((interval) => (
            <div key={interval.id} className="flex items-center justify-between px-4 py-3">
              <Label htmlFor={interval.id} className="text-sm cursor-pointer">
                {interval.label}
              </Label>
              <Switch
                id={interval.id}
                checked={interval.enabled}
                onCheckedChange={(v) => toggleReminderInterval(interval.id, v)}
              />
            </div>
          ))}
        </Card>
      )}

      {/* Upcoming reminders */}
      {notificationsEnabled && upcomingReminders.length > 0 && (
        <>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Clock className="h-4 w-4" />
            Upcoming Reminders
          </h2>
          <Card className="divide-y p-0">
            {upcomingReminders.map((r, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3 text-sm">
                <div className="min-w-0">
                  <p className="truncate font-medium">{r.task.title}</p>
                  <p className="text-xs text-muted-foreground">{r.label}</p>
                </div>
                <span className="shrink-0 text-muted-foreground">
                  {format(r.date, 'MMM d, h:mm a')}
                </span>
              </div>
            ))}
          </Card>
        </>
      )}
    </div>
  );
}
