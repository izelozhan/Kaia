import { Check, Plus, Sparkles } from "lucide-react";
import { PomodoroCard } from "@/components/dashboard/PomodoroCard";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import { StudyBeatsCard } from "@/components/dashboard/StudyBeatsCard";
import { QuoteCard } from "@/components/dashboard/QuoteCard";
import { useAppStore } from "@/stores/useAppStore";
import { cn } from "@/lib/utils";
import { useState } from "react";

function WhatNextSection() {
  const { tasks, toggleTask, addTask } = useAppStore();
  const [draft, setDraft] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    addTask(draft.trim());
    setDraft("");
  };

  return (
    <section className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-card">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-sm font-semibold text-foreground">What's next?</h2>
        <Sparkles className="h-4 w-4 text-muted" />
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {tasks.map((task) => (
          <button
            key={task.id}
            type="button"
            onClick={() => toggleTask(task.id)}
            className="flex items-center gap-2.5 text-left"
          >
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                task.completed
                  ? "border-accent-gold bg-accent-gold text-white"
                  : "border-border"
              )}
            >
              {task.completed && <Check className="h-3 w-3" />}
            </span>
            <span
              className={cn(
                "text-sm",
                task.completed ? "text-muted line-through" : "text-foreground"
              )}
            >
              {task.title}
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={handleAdd} className="mt-5 flex gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-background px-4 py-2">
          <span className="text-xs text-muted">📋</span>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add a sweet new task..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted outline-none"
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-1.5 rounded-full bg-accent-gold px-4 py-2 text-sm font-medium text-white"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </button>
      </form>
    </section>
  );
}

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* greeting */}
      <div>
        <h1 className="text-2xl font-bold text-accent-goldDark">Hello, Scholar!</h1>
        <p className="mt-0.5 text-sm text-muted">Ready to crush your goals today?</p>
      </div>

      {/* row 1: focus session (left) + weather + study beats (right) */}
      <div className="grid grid-cols-[1fr_280px] gap-5">
        <PomodoroCard />
        <div className="flex flex-col gap-4">
          <WeatherWidget />
          <StudyBeatsCard />
        </div>
      </div>

      {/* row 2: task list (left) + today's vibe (right) */}
      <div className="grid grid-cols-[1fr_280px] gap-5">
        <WhatNextSection />
        <QuoteCard />
      </div>
    </div>
  );
}