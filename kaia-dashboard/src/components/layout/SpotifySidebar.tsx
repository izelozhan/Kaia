import { useState, useEffect } from "react";
import { Music, Search, Play, Pause, SkipBack, SkipForward, ArrowLeft, UserCircle2 } from "lucide-react";
import { useSpotifyAuth } from "@/hooks/useSpotifyAuth";
import { useSpotifyUser } from "@/hooks/useSpotifyUser";
import { useNowPlaying } from "@/hooks/useNowPlaying";
import { useSpotifyPlaylists, type Playlist } from "@/hooks/useSpotifyPlaylists";

let _sessionToken: string | null = null;

function setSessionToken(t: string) { _sessionToken = t; }

async function playTrack(uri: string) {
  await fetch("https://api.spotify.com/v1/me/player/play", {
    method: "PUT",
    headers: { Authorization: `Bearer ${_sessionToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ uris: [uri] }),
  });
}

async function playPlaylist(contextUri: string) {
  await fetch("https://api.spotify.com/v1/me/player/play", {
    method: "PUT",
    headers: { Authorization: `Bearer ${_sessionToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ context_uri: contextUri }),
  });
}

async function togglePlayback(isPlaying: boolean) {
  const endpoint = isPlaying
    ? "https://api.spotify.com/v1/me/player/pause"
    : "https://api.spotify.com/v1/me/player/play";
  await fetch(endpoint, {
    method: "PUT",
    headers: { Authorization: `Bearer ${_sessionToken}` },
  });
}

async function skipNext() {
  await fetch("https://api.spotify.com/v1/me/player/next", {
    method: "POST",
    headers: { Authorization: `Bearer ${_sessionToken}` },
  });
}

async function skipPrevious() {
  await fetch("https://api.spotify.com/v1/me/player/previous", {
    method: "POST",
    headers: { Authorization: `Bearer ${_sessionToken}` },
  });
}

interface Track {
  id: string;
  name: string;
  artist: string;
  albumArt: string | null;
  uri: string;
}

function ConnectView({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-gold/20">
        <Music className="h-7 w-7 text-accent-goldDark" />
      </div>
      <div>
        <p className="font-medium text-foreground">Connect Spotify</p>
        <p className="mt-1 text-xs text-muted">Listen while you work</p>
      </div>
      <button
        onClick={onLogin}
        className="rounded-full bg-accent-gold px-6 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
      >
        Connect
      </button>
    </div>
  );
}

function SpotifyView({ token }: { token: string }) {
  const { user } = useSpotifyUser(token);
  const { nowPlaying } = useNowPlaying(token);
  const { playlists, loading } = useSpotifyPlaylists(token);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>([]);
  const [tracksLoading, setTracksLoading] = useState(false);
  const [tracksError, setTracksError] = useState(false);

  // debounced song search
  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(search)}&type=track&limit=10`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      const items = data.tracks?.items ?? [];
      setSearchResults(
        items.map((t: {
          id: string;
          name: string;
          uri: string;
          artists: { name: string }[];
          album: { images: { url: string }[] };
        }) => ({
          id: t.id,
          name: t.name,
          artist: t.artists.map((a) => a.name).join(", "),
          albumArt: t.album.images?.[0]?.url ?? null,
          uri: t.uri,
        }))
      );
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  async function openPlaylist(playlist: Playlist) {
    setSelectedPlaylist(playlist);
    setTracksError(false);

    if (playlist.ownerId === "spotify") {
      setTracksLoading(false);
      setTracksError(true);
      return;
    }

    setTracksLoading(true);
    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${playlist.id}/items?limit=50`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) {
      await res.json().catch(() => {});
      setTracksError(true);
      setTracksLoading(false);
      return;
    }
    const data = await res.json();
    const items: Track[] = (data.items ?? [])
      .filter((i: { item: { type: string } | null }) => i.item?.type === "track")
      .map((i: {
        item: {
          id: string;
          name: string;
          uri: string;
          type: string;
          artists: { name: string }[];
          album: { images: { url: string }[] };
        };
      }) => ({
        id: i.item.id,
        name: i.item.name,
        artist: i.item.artists.map((a) => a.name).join(", "),
        albumArt: i.item.album.images?.[0]?.url ?? null,
        uri: i.item.uri,
      }));
    setPlaylistTracks(items);
    setTracksLoading(false);
  }

  // ── playlist tracks view ──────────────────────────────────
  if (selectedPlaylist) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 border-b border-border p-4">
          <button
            onClick={() => setSelectedPlaylist(null)}
            className="text-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <p className="truncate flex-1 text-sm font-medium text-foreground">{selectedPlaylist.name}</p>
          <button
            onClick={() => playPlaylist(selectedPlaylist.uri)}
            className="shrink-0 text-muted hover:text-foreground"
          >
            <Play className="h-4 w-4 fill-current" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {tracksLoading ? (
            <p className="text-xs text-muted">Loading tracks…</p>
          ) : tracksError ? (
            <p className="text-xs text-muted">
              {selectedPlaylist?.ownerId === "spotify"
                ? "Spotify curated playlists can't be accessed via the API."
                : "This playlist's tracks couldn't be loaded."}
            </p>
          ) : playlistTracks.length === 0 ? (
            <p className="text-xs text-muted">No tracks found</p>
          ) : (
            <ul className="space-y-1">
              {playlistTracks.map((track) => (
                <li key={track.id}>
                  <div className="group flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-background">
                    {track.albumArt ? (
                      <img src={track.albumArt} alt="" className="h-8 w-8 shrink-0 rounded object-cover" />
                    ) : (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-border">
                        <Music className="h-3 w-3 text-muted" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-foreground">{track.name}</p>
                      <p className="truncate text-xs text-muted">{track.artist}</p>
                    </div>
                    <button
                      onClick={() => playTrack(track.uri)}
                      className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted hover:text-foreground"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  // ── main view ─────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* user info */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        {user?.imageUrl ? (
          <img src={user.imageUrl} alt="" className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <UserCircle2 className="h-8 w-8 text-muted" />
        )}
        <p className="truncate text-sm font-medium text-foreground">{user?.name ?? "Spotify"}</p>
      </div>

      {/* now playing */}
      <div className="border-b border-border p-4">
        {nowPlaying ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img src={nowPlaying.albumArt} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{nowPlaying.title}</p>
                <p className="truncate text-xs text-muted">{nowPlaying.artist}</p>
              </div>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-accent-teal transition-all"
                style={{ width: `${(nowPlaying.progress / nowPlaying.duration) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-center gap-6">
              <button onClick={skipPrevious} className="text-muted hover:text-foreground">
                <SkipBack className="h-4 w-4" />
              </button>
              <button
                onClick={() => togglePlayback(nowPlaying.isPlaying)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-gold text-white"
              >
                {nowPlaying.isPlaying
                  ? <Pause className="h-3.5 w-3.5 fill-current" />
                  : <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />}
              </button>
              <button onClick={skipNext} className="text-muted hover:text-foreground">
                <SkipForward className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-muted">
            <Music className="h-4 w-4 shrink-0" />
            <p className="text-xs">Nothing playing</p>
          </div>
        )}
      </div>

      {/* search */}
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
          <Search className="h-3.5 w-3.5 shrink-0 text-muted" />
          <input
            type="text"
            placeholder="Search songs…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted outline-none"
          />
        </div>
      </div>

      {/* search results or playlists */}
      <div className="flex-1 overflow-y-auto p-4">
        {search.trim() ? (
          <>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">Results</p>
            {searchResults.length === 0 ? (
              <p className="text-xs text-muted">No results</p>
            ) : (
              <ul className="space-y-1">
                {searchResults.map((track) => (
                  <li key={track.id} className="group flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-background">
                    {track.albumArt ? (
                      <img src={track.albumArt} alt="" className="h-8 w-8 shrink-0 rounded object-cover" />
                    ) : (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-border">
                        <Music className="h-3 w-3 text-muted" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-foreground">{track.name}</p>
                      <p className="truncate text-xs text-muted">{track.artist}</p>
                    </div>
                    <button
                      onClick={() => playTrack(track.uri)}
                      className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted hover:text-foreground"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">Your Playlists</p>
            {loading ? (
              <p className="text-xs text-muted">Loading…</p>
            ) : (
              <ul className="space-y-1">
                {playlists.map((playlist) => (
                  <li key={playlist.id}>
                    <button
                      onClick={() => openPlaylist(playlist)}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-background"
                    >
                      {playlist.imageUrl ? (
                        <img src={playlist.imageUrl} alt="" className="h-9 w-9 shrink-0 rounded object-cover" />
                      ) : (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-border">
                          <Music className="h-4 w-4 text-muted" />
                        </div>
                      )}
                      <div className="min-w-0 text-left">
                        <p className="truncate text-xs font-medium text-foreground">{playlist.name}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function SpotifySidebar() {
  const { token, login } = useSpotifyAuth();

  if (token) setSessionToken(token);

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-surface overflow-hidden" style={{ height: "calc(100vh - 80px)" }}>
      <div className="border-b border-border px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Spotify</p>
      </div>
      {token ? <SpotifyView token={token} /> : <ConnectView onLogin={login} />}
    </aside>
  );
}
