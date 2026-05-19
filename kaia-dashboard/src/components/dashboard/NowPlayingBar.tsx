import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useAppStore } from "@/stores/useAppStore";
import { cn } from "@/lib/utils";

export function NowPlayingBar() {
  const { nowPlaying, setNowPlaying } = useAppStore();

  return (
    <div
      className={cn(
        "mx-auto flex h-[82px] w-full max-w-3xl items-center justify-between",
        "rounded-card border border-accent-teal/10 bg-surface px-4 shadow-card"
      )}
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-background">
          {nowPlaying.imageUrl ? (
            <img
              src={nowPlaying.imageUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-muted">
              ♪
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">
            {nowPlaying.title}
          </p>
          <p className="truncate text-xs text-muted">{nowPlaying.artist}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button
          type="button"
          className="text-muted hover:text-foreground"
          aria-label="Previous"
        >
          <SkipBack className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => setNowPlaying({ isPlaying: !nowPlaying.isPlaying })}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-gold text-accent-goldDark"
          aria-label={nowPlaying.isPlaying ? "Pause" : "Play"}
        >
          {nowPlaying.isPlaying ? (
            <Pause className="h-4 w-4 fill-current" />
          ) : (
            <Play className="ml-0.5 h-4 w-4 fill-current" />
          )}
        </button>
        <button
          type="button"
          className="text-muted hover:text-foreground"
          aria-label="Next"
        >
          <SkipForward className="h-5 w-5" />
        </button>
      </div>

      <div className="flex min-w-[128px] items-center gap-2">
        <Volume2 className="h-3.5 w-3.5 shrink-0 text-muted" />
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-accent-teal"
            style={{ width: `${nowPlaying.progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
