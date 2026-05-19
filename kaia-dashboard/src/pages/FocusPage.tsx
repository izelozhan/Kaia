import { PomodoroCard } from "@/components/dashboard/PomodoroCard";
import { useAppStore } from "@/stores/useAppStore";

export function FocusPage() {
  const pomodoro = useAppStore((s) => s.pomodoro);
  const setPomodoroSettings = useAppStore((s) => s.setPomodoroSettings);

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Focus</h1>
        <p className="mt-2 text-muted">
          Pomodoro timer with adjustable focus and break intervals.
        </p>
      </div>

      <PomodoroCard />

      <div className="rounded-card border border-border bg-surface p-6">
        <h2 className="mb-4 text-lg font-medium">Timer settings</h2>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-sm">
            Focus (minutes)
            <input
              type="number"
              min={1}
              max={120}
              value={pomodoro.focusMinutes}
              onChange={(e) =>
                setPomodoroSettings(
                  Number(e.target.value) || 25,
                  pomodoro.breakMinutes
                )
              }
              className="rounded-lg border border-border bg-background px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Break (minutes)
            <input
              type="number"
              min={1}
              max={60}
              value={pomodoro.breakMinutes}
              onChange={(e) =>
                setPomodoroSettings(
                  pomodoro.focusMinutes,
                  Number(e.target.value) || 5
                )
              }
              className="rounded-lg border border-border bg-background px-3 py-2"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
