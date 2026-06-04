import { Plus } from "lucide-react";

const stages = [
  { label: "RIPE", emoji: "🍅", active: true },
  { label: "GROWING", emoji: "🌱", active: false },
  { label: "SPROUT", emoji: "🌿", active: false },
];

export function MyGardenSidebar() {
  return (
    <aside
      className="flex w-56 shrink-0 flex-col border-l border-border bg-surface"
      style={{ height: "calc(100vh - 80px)" }}
    >
      {/* header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <p className="text-sm font-semibold text-foreground">My Garden</p>
        <button className="rounded p-0.5 text-muted hover:text-foreground">
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
      </div>

      {/* garden area */}
      <div className="flex-1 overflow-y-auto">
        {/* plant stages */}
        <div className="flex flex-col items-center gap-6 py-6">
          {stages.map((stage) => (
            <div key={stage.label} className="flex flex-col items-center gap-1">
              <span className={`text-3xl ${stage.active ? "opacity-100" : "opacity-40"}`}>
                {stage.emoji}
              </span>
              <p className={`text-[10px] font-semibold uppercase tracking-widest ${stage.active ? "text-foreground" : "text-muted"}`}>
                {stage.label}
              </p>
            </div>
          ))}

          {/* soil bar */}
          <div className="mt-2 w-full px-4">
            <div className="flex items-center justify-center rounded-lg bg-foreground py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-background">
                Rich Organic Soil
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* weekly harvest */}
      <div className="border-t border-border p-4">
        <div className="flex items-center justify-between rounded-xl bg-background px-3 py-3">
          <div>
            <p className="text-xs font-semibold text-foreground">Weekly Harvest</p>
            <div className="mt-1 flex gap-0.5">
              <span className="text-sm">🍅</span>
              <span className="text-sm">🍅</span>
              <span className="text-sm">🍅</span>
              <span className="ml-1 text-xs text-muted">+3 Tomatoes</span>
            </div>
          </div>
          <button className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-rose text-white">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}