import { useState } from "react";
import { Check, Plus, Sparkles } from "lucide-react";
import { useAppStore } from "@/stores/useAppStore";
import { cn } from "@/lib/utils";
import type { Priority } from "@/types";

const priorityDot: Record<Priority, string> = {
  low: "border-muted",
  mid: "border-accent-rose",
  high: "border-accent-goldDark bg-accent-gold/30",
};

export function RitualsCard() {
  const { tasks, toggleTask, addTask } = useAppStore();
  const [draft, setDraft] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    addTask(draft.trim());
    setDraft("");
  };

  return (
    <section className="flex flex-col gap-6 rounded-card border border-accent-rose bg-surface p-6 shadow-rituals">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Daily Rituals</h2>
        <Sparkles className="h-6 w-6 text-accent-rose" />
      </header>

      <ul className="flex flex-col gap-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center gap-3 rounded-lg bg-background px-3 py-3"
          >
            <button
              type="button"
              onClick={() => toggleTask(task.id)}
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2",
                priorityDot[task.priority],
                task.completed && "bg-accent-rose text-white"
              )}
              aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
            >
              {task.completed && <Check className="h-3.5 w-3.5" />}
            </button>
            <span
              className={cn(
                "text-sm",
                task.completed ? "text-muted line-through" : "text-foreground"
              )}
            >
              {task.title}
            </span>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a ritual..."
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent-rose"
        />
        <button
          type="submit"
          className="flex items-center gap-1 rounded-lg bg-accent-rose px-3 py-2 text-sm text-white"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </form>
    </section>
  );
}
