import { useAppStore } from "@/stores/useAppStore";
import { usePomodoroTimer, formatTime } from "@/hooks/usePomodoroTimer";
import { cn } from "@/lib/utils";

export function PomodoroCard() {
  usePomodoroTimer();
  const { pomodoro, startPomodoro, pausePomodoro, resetPomodoro } = useAppStore();

  const phaseLabel =
    pomodoro.phase === "break"
      ? "Break Time"
      : pomodoro.phase === "focus"
        ? "Focus Mode"
        : "Focus Mode";

  const isActive = pomodoro.isRunning;

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-lg rounded-card border-2 border-accent-goldDark",
        "bg-surface p-8 text-center shadow-pomodoro"
      )}
    >
      <p className="mb-2 text-sm font-medium text-accent-goldDark">{phaseLabel}</p>
      <p className="mb-6 text-6xl font-semibold tabular-nums text-foreground">
        {formatTime(pomodoro.secondsLeft)}
      </p>
      <p className="mb-6 text-sm text-muted">
        Sessions completed: {pomodoro.sessionsCompleted}
      </p>
      <div className="flex justify-center gap-4">
        <button
          type="button"
          onClick={isActive ? pausePomodoro : startPomodoro}
          className="rounded-full bg-accent-gold px-8 py-3 text-sm font-medium text-accent-goldDark shadow-[0_4px_15px_rgba(115,92,0,0.2)]"
        >
          {isActive ? "Pause" : "Start Session"}
        </button>
        <button
          type="button"
          onClick={resetPomodoro}
          className="rounded-full border-2 border-accent-teal px-8 py-3 text-sm font-medium text-accent-teal"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
