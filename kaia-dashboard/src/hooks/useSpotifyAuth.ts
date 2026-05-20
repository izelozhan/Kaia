import { useState, useEffect } from 'react';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI as string; 
const SCOPES = "user-read-private user-read-currently-playing user-read-playback-state user-modify-playback-state playlist-read-private playlist-read-collaborative";


function generateCodeVerifier(): string {
  const array = new Uint8Array(64);
  crypto.getRandomValues(array); //browsers random generator
  return btoa(String.fromCharCode(...array)).replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data); 
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function useSpotifyAuth(){
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if(code){
      window.history.replaceState({}, "", "/");
      const verifier = localStorage.getItem("code_verifier");

      fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"},
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          grant_type: "authorization_code",
          code,
          redirect_uri: REDIRECT_URI,
          code_verifier: verifier!,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        setToken(data.access_token);
        localStorage.setItem("spotify_token", data.access_token);
        window.history.replaceState({}, "", "/"); //clean ?code= from URL
      });
    } else {
      const saved = localStorage.getItem("spotify_token");
      if(saved) setToken(saved);
    }
  }, []);

  async function login(){
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("code_verifier", verifier);

    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: "code",
      redirect_uri: REDIRECT_URI,
      scope: SCOPES,
      code_challenge_method: "S256",
      code_challenge: challenge,

    });

    window.location.href = "https://accounts.spotify.com/authorize?" + params.toString();
  }
  return {token, login};
}