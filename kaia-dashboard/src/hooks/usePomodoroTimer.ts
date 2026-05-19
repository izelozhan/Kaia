import { useEffect } from "react";
import { useAppStore } from "@/stores/useAppStore";

export function usePomodoroTimer() {
  const tickPomodoro = useAppStore((s) => s.tickPomodoro);
  const isRunning = useAppStore((s) => s.pomodoro.isRunning);

  useEffect(() => {
    if (!isRunning) return;
    const id = window.setInterval(tickPomodoro, 1000);
    return () => window.clearInterval(id);
  }, [isRunning, tickPomodoro]);
}

export function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
