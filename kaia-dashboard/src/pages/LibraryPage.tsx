export function LibraryPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold text-foreground">Library</h1>
      <p className="text-muted">
        Spotify playlist search and playback will connect here. The existing
        auth API in <code className="rounded bg-background px-1">api/</code> is
        ready — start it with <code className="rounded bg-background px-1">npm start</code> in that folder.
      </p>
      <div className="rounded-card border border-dashed border-accent-teal/40 bg-surface p-8 text-center text-sm text-muted">
        Coming next: port Jamming search &amp; playlists from the legacy music
        feature.
      </div>
    </div>
  );
}
