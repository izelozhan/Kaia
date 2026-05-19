import { useAppStore } from "@/stores/useAppStore";
import { cn } from "@/lib/utils";

const noteStyles = {
  pink: "border-accent-rose bg-note-pink shadow-[0_4px_16px_rgba(139,75,88,0.1)]",
  yellow:
    "border-accent-goldDark bg-note-yellow shadow-[0_4px_16px_rgba(115,92,0,0.1)]",
};

export function StickyNotesStack() {
  const notes = useAppStore((s) => s.notes);
  const sorted = [...notes].sort((a, b) => Number(b.pinned) - Number(a.pinned));

  return (
    <section className="flex flex-col gap-6">
      {sorted.map((note) => (
        <article
          key={note.id}
          className={cn(
            "rounded-card border p-5",
            noteStyles[note.color]
          )}
        >
          <h3
            className={cn(
              "mb-2 text-xs font-semibold uppercase tracking-wide",
              note.color === "pink" ? "text-accent-rose" : "text-accent-goldDark"
            )}
          >
            {note.title}
          </h3>
          <p
            className={cn(
              "text-sm leading-relaxed",
              note.color === "pink" ? "text-accent-rose/90" : "text-accent-goldDark"
            )}
          >
            {note.body}
          </p>
        </article>
      ))}
    </section>
  );
}
