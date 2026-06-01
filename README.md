# Work Dashboard

A personal work dashboard — a single-user productivity cockpit that brings your
calendar, meetings, emails, tasks, learning, office attendance (RTO), and
performance scorecard into one place. Built with **React 19**, **TanStack
Start** (full-stack SSR), **Tailwind CSS v4**, **shadcn/ui**, and **Vite 7**,
and served in production by a small **Node.js** server.

> **Status:** The UI is fully built and rendered from in-repo mock data
> (`src/lib/*.ts`). The roadmap for wiring it to live data sources (Datadog,
> Google Calendar/Gmail, Metabase) is documented in [SITEMAP.md](SITEMAP.md).

---

## Table of contents

1. [Features](#features)
2. [Tech stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Setup — step by step](#setup--step-by-step)
5. [Running in development](#running-in-development)
6. [Building & running in production](#building--running-in-production)
7. [Running with Docker](#running-with-docker)
8. [Deploying to Vercel](#deploying-to-vercel)
9. [Environment variables](#environment-variables)
9. [Available npm scripts](#available-npm-scripts)
10. [Project structure](#project-structure)
11. [How routing & SSR work](#how-routing--ssr-work)
12. [Code style, linting & formatting](#code-style-linting--formatting)
13. [Troubleshooting](#troubleshooting)
14. [Roadmap](#roadmap)
15. [License](#license)

---

## Features

The dashboard ships with the following pages (each is a TanStack Router file
route under `src/routes/`):

| Route          | Page         | What it shows                                                        |
| -------------- | ------------ | -------------------------------------------------------------------- |
| `/`            | Dashboard    | At-a-glance summary aggregating every other page                     |
| `/tasks`       | Tasks        | Task list with tags and status                                       |
| `/calendar`    | Calendar     | Month view with RTO (return-to-office) attendance heatmap            |
| `/meetings`    | Meetings     | Upcoming meetings with attendees                                     |
| `/emails`      | Emails       | Unread / recent email triage view                                    |
| `/learning`    | Learning     | Training and learning items                                          |
| `/office-life` | Office Life  | In-office days, meals, and office-related info                       |
| `/scorecard`   | Scorecard    | IC KPI scorecard (structure mirrors a Metabase dashboard)            |
| `/settings`    | Settings     | Connection/preferences UI (integration entry points)                |

A persistent **Sidebar** (`src/components/Sidebar.tsx`) and a
**Notifications popover** (`src/components/notifications/`) are shared across
all pages.

---

## Tech stack

- **[React 19](https://react.dev/)** — UI library
- **[TanStack Start](https://tanstack.com/start)** — full-stack React framework
  (SSR + server functions), configured with `target: "node-server"`
- **[TanStack Router](https://tanstack.com/router)** — file-based, type-safe routing
- **[TanStack Query](https://tanstack.com/query)** — async/server state
- **[Vite 7](https://vite.dev/)** — dev server & build tool
- **[Tailwind CSS v4](https://tailwindcss.com/)** — styling, via `@tailwindcss/vite`
- **[shadcn/ui](https://ui.shadcn.com/)** (New York style) — Radix-based component
  primitives in `src/components/ui/`
- **[lucide-react](https://lucide.dev/)** — icons
- **[recharts](https://recharts.org/)** — charts (scorecard)
- **[Zod](https://zod.dev/)** + **react-hook-form** — forms & validation
- **[srvx](https://github.com/h3js/srvx)** — Fetch→Node adapter that hosts the
  SSR handler in production
- **TypeScript** (strict), **ESLint 9**, **Prettier**

---

## Prerequisites

You need the following installed locally:

| Tool       | Version           | Notes                                                       |
| ---------- | ----------------- | ----------------------------------------------------------- |
| **Node.js**| **>= 22.12**      | Enforced by `engines` in `package.json`. Use [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm). |
| **npm**    | bundled with Node | This project standardised on **npm** (uses `package-lock.json`). |
| **git**    | any recent        | To clone the repo.                                          |
| **Docker** | optional          | Only needed for the containerised production run.           |

Check your versions:

```bash
node -v   # must be >= 22.12.0
npm -v
```

If `node -v` is lower, install Node 22 LTS first (e.g. `nvm install 22 && nvm use 22`).

---

## Setup — step by step

### 1. Clone the repository

```bash
git clone https://github.com/Danielmilad3621/work_dashboard.git
cd work_dashboard
```

### 2. Install dependencies

```bash
npm install
```

This installs everything listed in `package.json` using the exact versions
pinned in `package-lock.json`. Expect ~250 packages and 0 vulnerabilities on a
clean install.

> **Tip:** For a reproducible, CI-style install that fails if the lockfile is
> out of date, use `npm ci` instead of `npm install`.

### 3. (Optional) Configure environment variables

The app currently runs entirely on mock data and needs **no environment
variables for development**. The only env vars consumed today are read by the
production server — see [Environment variables](#environment-variables).

### 4. Start it

```bash
npm run dev
```

Open **http://localhost:5173**. That's it.

---

## Running in development

```bash
npm run dev
```

- Starts the **Vite dev server** on **http://localhost:5173** (host binding is
  enabled, so it's reachable from other devices on your LAN too).
- Hot Module Replacement (HMR) is on — edits to routes/components reload instantly.
- TanStack Router generates `src/routeTree.gen.ts` automatically as you add or
  change files in `src/routes/`. **Do not edit that file by hand.**

---

## Building & running in production

Production is a two-step process: build the bundles, then run the Node server.

### 1. Build

```bash
npm run build
```

This emits two folders into `dist/`:

- `dist/client/` — static client assets (JS, CSS, images)
- `dist/server/server.js` — the SSR Fetch handler

### 2. Start the production server

```bash
npm run start
```

This runs `node server.mjs`, which:

- imports the built SSR handler from `dist/server/server.js`,
- serves the static assets from `dist/client/` via `srvx/static`,
- listens on **http://0.0.0.0:3000** (override with `PORT` / `HOSTNAME`).

Open **http://localhost:3000**.

> ⚠️ You **must** run `npm run build` before `npm run start`. Starting without a
> build fails with `Cannot find module ./dist/server/server.js`.

---

## Running with Docker

The repo includes a multi-stage `Dockerfile` (builder + slim runner on
`node:22-alpine`) with a built-in `HEALTHCHECK`.

### Build the image

```bash
docker build -t workdashboard .
```

### Run the container

```bash
docker run --rm -p 3000:3000 workdashboard
# → http://localhost:3000
```

### Apple Silicon → x86 hosts

On Apple Silicon Macs `docker build` produces an **arm64** image by default. If
you deploy to an **x86_64** host (most VPS providers), build for that arch:

```bash
docker build --platform linux/amd64 -t workdashboard .
```

You can override the port/host at runtime:

```bash
docker run --rm -e PORT=8080 -p 8080:8080 workdashboard
```

---

## Deploying to Vercel

Vercel is **serverless** and does not run a long-lived `node server.mjs`
process, so the app is deployed as a **static SPA** instead of Node SSR. This is
enabled by SPA mode in `vite.config.ts`:

```ts
tanstackStart({
  spa: { enabled: true },
})
```

With SPA mode on, `npm run build` prerenders a static HTML shell to
`dist/client/_shell.html` alongside the client assets. A `vercel.json` at the
repo root tells Vercel how to serve it:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/client",
  "rewrites": [{ "source": "/(.*)", "destination": "/_shell.html" }]
}
```

- `outputDirectory: dist/client` — Vercel serves the built client assets (not
  the default `dist/`).
- The rewrite is a **SPA fallback**: real files (e.g. `/assets/*.js`, images)
  are served directly, and every other route falls back to the shell so the
  client router can take over.

### Steps

1. Push your code to GitHub (already done for this repo).
2. In Vercel, **Add New → Project** and import `Danielmilad3621/work_dashboard`.
3. Leave the build settings as auto-detected — `vercel.json` already pins the
   build command and output directory. No environment variables are required.
4. Deploy. Every push to `main` will redeploy automatically.

> **Why not SSR on Vercel?** This version of TanStack Start (1.167) has no Vercel
> hosting preset, and every page renders from in-repo mock data with no server
> functions — so a static SPA is the simplest, most reliable fit. If you later
> add server-side logic and need true SSR, host the Node build (`npm run start`
> / the Docker image) on a platform that runs a persistent process (a VPS,
> Fly.io, Render, Railway, your homelab, etc.).

---

## Environment variables

| Variable   | Default     | Used by      | Description                                  |
| ---------- | ----------- | ------------ | -------------------------------------------- |
| `PORT`     | `3000`      | `server.mjs` | Port the production Node server listens on.  |
| `HOSTNAME` | `0.0.0.0`   | `server.mjs` | Interface the production server binds to.    |
| `NODE_ENV` | `production`| Docker       | Set to `production` in the Docker runner.    |

> Development (`npm run dev`) needs none of these. Future integrations (Datadog,
> Google, Metabase — see the roadmap) will introduce additional secrets; those
> are **not** part of the app yet.

---

## Available npm scripts

| Script              | Command                          | What it does                                   |
| ------------------- | -------------------------------- | ---------------------------------------------- |
| `npm run dev`       | `vite dev`                       | Dev server with HMR on **:5173**               |
| `npm run build`     | `vite build`                     | Build client + SSR bundles into `dist/`        |
| `npm run build:dev` | `vite build --mode development`  | Non-minified development build                 |
| `npm run preview`   | `vite preview`                   | Preview the built client locally (Vite)        |
| `npm run start`     | `node server.mjs`                | Run the production Node SSR server on **:3000**|
| `npm run lint`      | `eslint .`                       | Lint the whole project                         |
| `npm run format`    | `prettier --write .`             | Auto-format the codebase                       |

---

## Project structure

```
work_dashboard/
├── Dockerfile             # Multi-stage production image (node:22-alpine)
├── server.mjs             # Production Node entry — hosts SSR handler via srvx
├── vite.config.ts         # Vite + TanStack Start + Tailwind + React plugins
├── components.json        # shadcn/ui config (New York style, @/ aliases)
├── tsconfig.json          # TypeScript (strict, @/* → src/*)
├── eslint.config.js       # Flat ESLint config
├── package.json
├── MIGRATION.md           # History of the Lovable → Node SSR migration
├── SITEMAP.md             # Plan for wiring the UI to live data sources
├── public/                # Static assets served as-is (avatar, logos)
└── src/
    ├── router.tsx         # Router instance + QueryClient wiring
    ├── start.ts           # TanStack Start entry
    ├── routeTree.gen.ts   # AUTO-GENERATED route tree — do not edit
    ├── styles.css         # Tailwind v4 entry + design tokens
    ├── routes/            # File-based routes (one file per page)
    │   ├── __root.tsx     # Root layout, <head>, 404 + error boundaries
    │   ├── index.tsx      # "/" dashboard
    │   ├── tasks.tsx
    │   ├── calendar.tsx
    │   ├── meetings.tsx
    │   ├── emails.tsx
    │   ├── learning.tsx
    │   ├── office-life.tsx
    │   ├── scorecard.tsx
    │   └── settings.tsx
    ├── components/
    │   ├── Sidebar.tsx    # Shared left navigation
    │   ├── ui/            # shadcn/ui primitives (button, card, dialog, …)
    │   └── <feature>/     # Per-page components (calendar/, emails/, …)
    ├── lib/               # Mock data + helpers (rto, office, tags, scorecard…)
    └── hooks/             # Reusable hooks (use-mobile, …)
```

### Path aliases

`@/` maps to `src/` (configured in `tsconfig.json` and resolved by
`vite-tsconfig-paths`). Example: `import { Sidebar } from "@/components/Sidebar"`.

---

## How routing & SSR work

- **File-based routing:** every file in `src/routes/` becomes a route. Adding
  `src/routes/foo.tsx` creates `/foo`. The TanStack Router plugin regenerates
  `src/routeTree.gen.ts` on the fly during `dev`/`build`.
- **Root layout:** `src/routes/__root.tsx` defines the HTML shell, document
  `<head>` (via `HeadContent`), the global 404 page, and the error boundary.
- **SSR in production:** `vite build` compiles a Fetch-style request handler to
  `dist/server/server.js`. `server.mjs` wraps it with `srvx/node` and adds a
  static-file middleware for `dist/client/`. This keeps the production runtime
  portable — anything that runs Node 22+ can host it (VPS, container, homelab).

For the full backstory on why the project moved off its original Lovable /
Cloudflare Workers setup to plain Node SSR, see [MIGRATION.md](MIGRATION.md).

---

## Code style, linting & formatting

- **TypeScript** is in `strict` mode.
- **ESLint 9** (flat config in `eslint.config.js`) with React Hooks and
  React Refresh plugins, integrated with Prettier.
- **Prettier** owns formatting (`.prettierrc`).

Run before committing:

```bash
npm run lint
npm run format
```

---

## Troubleshooting

| Symptom                                                          | Fix                                                                                 |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `npm run start` → `Cannot find module ./dist/server/server.js`   | You skipped the build. Run `npm run build` first.                                   |
| `engine "node" is incompatible` during install                  | Your Node is < 22.12. Install Node 22 LTS (`nvm install 22 && nvm use 22`).          |
| Port 5173 (dev) or 3000 (prod) already in use                    | Stop the other process, or set `PORT` for prod. For dev, change `server.port` in `vite.config.ts`. |
| Docker image runs on the wrong CPU arch on a VPS                 | Rebuild with `--platform linux/amd64` (see Docker section).                          |
| Edits to `routeTree.gen.ts` keep getting overwritten             | That file is auto-generated — edit the files in `src/routes/` instead.               |
| Build output path changes after a TanStack Start upgrade         | Update the import in `server.mjs` and the `COPY --from=builder` line in `Dockerfile`.|

---

## Roadmap

The UI is complete but renders mock data. The plan to turn it into a live,
single-user, homelab-hosted dashboard — including the Datadog-based RTO
attendance pipeline, Google Calendar/Gmail sync, and Metabase scorecard
integration — is documented in detail in **[SITEMAP.md](SITEMAP.md)**.

---

## License

Private / personal project. No license granted for reuse unless added later.
