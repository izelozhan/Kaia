import { useState, useEffect } from "react";

export interface Playlist {
  id: string;
  name: string;
  imageUrl: string | null;
  ownerId: string;
  uri: string;
}

export function useSpotifyPlaylists(token: string | null) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    async function fetchAll() {
      const all: Playlist[] = [];
      let url: string | null = "https://api.spotify.com/v1/me/playlists?limit=50";

      while (url) {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!data.items) break;

        all.push(
          ...data.items.map((p: {
            id: string;
            name: string;
            uri: string;
            images: { url: string }[];
            owner: { id: string };
          }) => ({
            id: p.id,
            name: p.name,
            imageUrl: p.images?.[0]?.url ?? null,
            ownerId: p.owner.id,
            uri: p.uri,
          }))
        );

        url = data.next;
      }

      setPlaylists(all);
      setLoading(false);
    }

    fetchAll();
  }, [token]);

  return { playlists, loading };
}
