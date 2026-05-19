# Kaia

Personal dashboard — music, focus timer, daily rituals, weather, notes, links, and quotes.

## Stack

- **Frontend:** Vite + React + TypeScript + Tailwind (`kaia-dashboard/`)
- **State:** Zustand with localStorage persist
- **Spotify API:** Express auth server (`kaia-dashboard/api/`)

## Run locally

### 1. Frontend

```bash
cd kaia-dashboard
npm install
npm run dev
```

Open http://localhost:5173

From repo root you can also run:

```bash
npm run dev
```

### 2. Spotify API (optional, for Library)

```bash
cd kaia-dashboard/api
npm install
# copy .env_sample to .env and add Spotify credentials
npm start
```

The Vite dev server proxies `/api/*` to `http://localhost:3001`.

## Project layout

```
kaia/
├── kaia-dashboard/     # Vite React app
│   ├── src/
│   │   ├── components/ # UI widgets
│   │   ├── pages/      # Dashboard, Focus, Library, Settings
│   │   ├── stores/     # Zustand
│   │   └── legacy/     # Old Jamming CRA code (reference)
│   └── api/            # Spotify OAuth backend
└── package.json        # shortcuts: dev, build, api
```

## Environment

Copy `kaia-dashboard/.env.example` to `.env` when adding live APIs:

- `VITE_OPENWEATHER_API_KEY`
- `VITE_SPOTIFY_CLIENT_ID`
