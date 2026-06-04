import { Music, Play, Pause, SkipBack, SkipForward, LayoutGrid } from "lucide-react";
import { useSpotifyAuth } from "@/hooks/useSpotifyAuth";
import { useNowPlaying } from "@/hooks/useNowPlaying";

let _token: string | null = null;

async function apiCall(endpoint: string, method = "PUT", body?: object) {
  await fetch(endpoint, {
    method,
    headers: {
      Authorization: `Bearer ${_token}`,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}

export function StudyBeatsCard() {
  const { token, login } = useSpotifyAuth();
  if (token) _token = token;

  const { nowPlaying } = useNowPlaying(token);

  if (!token) {
    return (
      <div className="flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-card">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Study Beats</p>
          <LayoutGrid className="h-4 w-4 text-muted" />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-gold/10">
            <Music className="h-6 w-6 text-accent-goldDark" />
          </div>
          <p className="text-sm text-muted">Connect Spotify to play music</p>
          <button
            onClick={login}
            className="rounded-full bg-accent-gold px-5 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Connect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Study Beats</p>
        <LayoutGrid className="h-4 w-4 text-muted" />
      </div>

      {nowPlaying ? (
        <>
          <div className="flex items-center gap-3">
            <img
              src={nowPlaying.albumArt}
              alt=""
              className="h-12 w-12 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{nowPlaying.title}</p>
              <p className="truncate text-xs text-muted">{nowPlaying.artist}</p>
            </div>
          </div>

          {/* progress bar */}
          <div className="my-3 h-1 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-accent-gold transition-all"
              style={{ width: `${(nowPlaying.progress / nowPlaying.duration) * 100}%` }}
            />
          </div>

          {/* controls */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => apiCall("https://api.spotify.com/v1/me/player/previous", "POST")}
              className="text-muted hover:text-foreground"
            >
              <SkipBack className="h-4 w-4" />
            </button>
            <button
              onClick={() =>
                apiCall(
                  nowPlaying.isPlaying
                    ? "https://api.spotify.com/v1/me/player/pause"
                    : "https://api.spotify.com/v1/me/player/play"
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-gold text-white shadow-[0_2px_10px_rgba(139,26,26,0.3)]"
            >
              {nowPlaying.isPlaying
                ? <Pause className="h-4 w-4 fill-current" />
                : <Play className="ml-0.5 h-4 w-4 fill-current" />}
            </button>
            <button
              onClick={() => apiCall("https://api.spotify.com/v1/me/player/next", "POST")}
              className="text-muted hover:text-foreground"
            >
              <SkipForward className="h-4 w-4" />
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-2 py-4 text-muted">
          <Music className="h-4 w-4 shrink-0" />
          <p className="text-xs">Nothing playing — open Spotify to start</p>
        </div>
      )}
    </div>
  );
}