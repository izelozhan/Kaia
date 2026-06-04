import { RotateCcw, Play, Pause } from "lucide-react";
import { useAppStore } from "@/stores/useAppStore";
import { usePomodoroTimer, formatTime } from "@/hooks/usePomodoroTimer";

export function PomodoroCard() {
  usePomodoroTimer();
  const { pomodoro, startPomodoro, pausePomodoro, resetPomodoro } = useAppStore();

  const isActive = pomodoro.isRunning;
  const totalSeconds =
    pomodoro.phase === "break"
      ? pomodoro.breakMinutes * 60
      : pomodoro.focusMinutes * 60;
  const elapsed = totalSeconds - pomodoro.secondsLeft;
  const progress = totalSeconds > 0 ? elapsed / totalSeconds : 0;

  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * progress;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      {/* header row */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">🍅</span>
          <h2 className="text-base font-semibold text-foreground">Focus Session</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">Sessions Today: {pomodoro.sessionsCompleted}</span>
          <span className="rounded-full bg-accent-gold px-2.5 py-0.5 text-xs font-medium text-white">
            {formatTime(pomodoro.secondsLeft)}
          </span>
        </div>
      </div>

      <div className="flex gap-6">
        {/* circular timer */}
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="relative flex items-center justify-center">
            <svg width="180" height="180" className="-rotate-90">
              {/* background ring */}
              <circle
                cx="90" cy="90" r={radius}
                fill="none"
                stroke="#F0D8D8"
                strokeWidth="8"
              />
              {/* progress ring */}
              <circle
                cx="90" cy="90" r={radius}
                fill="none"
                stroke="#8B1A1A"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-semibold tabular-nums text-foreground">
                {formatTime(pomodoro.secondsLeft)}
              </span>
              <span className="mt-1 text-lg">🍅</span>
            </div>
          </div>

          {/* controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={isActive ? pausePomodoro : startPomodoro}
              className="flex items-center gap-2 rounded-full bg-accent-gold px-7 py-2.5 text-sm font-semibold text-white shadow-[0_4px_15px_rgba(139,26,26,0.3)]"
            >
              {isActive
                ? <><Pause className="h-3.5 w-3.5 fill-current" /> Pause</>
                : <><Play className="h-3.5 w-3.5 fill-current ml-0.5" /> Start</>}
            </button>
            <button
              type="button"
              onClick={resetPomodoro}
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-border text-muted hover:border-accent-gold hover:text-accent-gold transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* settings panel */}
        <div className="flex-1 rounded-xl bg-background p-4">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">Settings</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Focus Time</span>
              <span className="text-sm font-medium text-muted">{pomodoro.focusMinutes} min</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Break Time</span>
              <span className="text-sm font-medium text-muted">{pomodoro.breakMinutes} min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}