import { useState, useEffect } from "react";

export interface NowPlayingData {
  title: string;
  artist: string;
  albumArt: string;
  isPlaying: boolean;
  progress: number;
  duration: number;
}

export function useNowPlaying(token: string | null) {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null);

  useEffect(() => {
    if (!token) return;

    async function fetchNowPlaying() {
      const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 204 || !res.ok) {
        setNowPlaying(null);
        return;
      }

      const data = await res.json();
      setNowPlaying({
        title: data.item.name,
        artist: data.item.artists.map((a: { name: string }) => a.name).join(", "),
        albumArt: data.item.album.images[0].url,
        isPlaying: data.is_playing,
        progress: data.progress_ms,
        duration: data.item.duration_ms,
      });
    }

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 5000);
    return () => clearInterval(interval);
  }, [token]);

  return { nowPlaying };
}
