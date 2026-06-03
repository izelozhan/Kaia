import { useState, useEffect } from "react";

export interface SpotifyUser {
  name: string;
  imageUrl: string | null;
}

export function useSpotifyUser(token: string | null) {
  const [user, setUser] = useState<SpotifyUser | null>(null);

  useEffect(() => {
    if (!token) return;

    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          name: data.display_name,
          imageUrl: data.images?.[0]?.url ?? null,
        });
      });
  }, [token]);

  return { user };
}
