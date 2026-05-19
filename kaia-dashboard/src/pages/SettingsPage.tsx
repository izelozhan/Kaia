import { useAppStore } from "@/stores/useAppStore";

export function SettingsPage() {
  const pomodoro = useAppStore((s) => s.pomodoro);
  const setPomodoroSettings = useAppStore((s) => s.setPomodoroSettings);

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Settings</h1>
        <p className="mt-2 text-muted">Preferences for focus and integrations.</p>
      </div>

      <section className="rounded-card border border-border bg-surface p-6">
        <h2 className="mb-4 text-lg font-medium">Pomodoro defaults</h2>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-sm">
            Focus (min)
            <input
              type="number"
              min={1}
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
            Break (min)
            <input
              type="number"
              min={1}
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
      </section>

      <section className="rounded-card border border-border bg-surface p-6 text-sm text-muted">
        <p>
          Add <code className="text-foreground">VITE_OPENWEATHER_API_KEY</code> and
          Spotify credentials to a <code className="text-foreground">.env</code> file
          when wiring live APIs.
        </p>
      </section>
    </div>
  );
}
