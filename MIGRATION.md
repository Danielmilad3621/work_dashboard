# Migration: Lovable -> Plain Node SSR (May 2026)

This document captures every change made during the Lovable removal so future-you
(and Cursor) can understand the layout without spelunking through git history.

## What changed

### Removed

- `.lovable/` directory (Lovable template marker).
- `bunfig.toml` (Bun config; only existed to whitelist the Lovable package).
- `bun.lock` (Bun lockfile - we standardised on npm).
- `wrangler.jsonc` (Cloudflare Workers config).
- `src/server.ts` (Cloudflare-Workers-style `{ fetch }` handler with h3 catastrophic-error normalizer).
- `src/lib/error-capture.ts` (companion to the deleted `src/server.ts`).
- npm dependency `@lovable.dev/vite-tanstack-config` (devDependencies).
- npm dependency `@cloudflare/vite-plugin` (dependencies).
- "Lovable" meta tags in `src/routes/__root.tsx` (`Lovable App`, `Lovable Generated Project`, `author: Lovable`, `@Lovable`).

### Added

- `server.mjs` - production Node entry that hosts the Fetch handler emitted at `dist/server/server.js` via `srvx/node`. Reads `PORT` and `HOSTNAME` from env (defaults 3000 and 0.0.0.0).
- `Dockerfile` - multi-stage build on `node:20-alpine` with HEALTHCHECK against `:3000/`.
- `.dockerignore` - excludes `node_modules`, `dist`, `.git`, `.cursor`, etc.
- `MIGRATION.md` (this file).
- `README.md` - GitHub landing page with dev/prod/Docker quick-start.
- `.cursor/rules/project-overview.mdc` and `.cursor/rules/tanstack-start-notes.mdc` - context for future Cursor sessions.
- npm dependency `srvx` (Fetch -> Node adapter, by the h3-v2 maintainers).
- `scripts.start` and `engines.node >= 20` in `package.json`.
- `package-lock.json` (replaces `bun.lock`).

### Rewritten

- `vite.config.ts` - was `defineConfig` from `@lovable.dev/vite-tanstack-config`. Now wires plugins manually: `tsConfigPaths`, `tailwindcss`, `tanstackStart({ target: "node-server" })`, `viteReact`. Resolves dedupe is configured for React 19 + TanStack to avoid duplicate copies.

## Why these decisions

| Decision                         | Why                                                                                                |
| -------------------------------- | -------------------------------------------------------------------------------------------------- |
| Node SSR over Cloudflare Workers | Portable - runs anywhere with Node 20+. No wrangler dependency, no edge-only constraints.          |
| npm over Bun                     | More familiar tooling, plays nicer with corp networks and most CI.                                 |
| `srvx` over `@hono/node-server`  | Same maintainers as h3-v2 (already used by TanStack Start under the hood). One fewer mental model. |
| Multi-stage Dockerfile           | Keeps runtime image small - dev deps and source code stay in the builder stage.                    |
| Node 20 Alpine                   | Smallest official Node image with the LTS we need.                                                 |

## How to run

### Dev mode

```bash
npm install
npm run dev   # http://localhost:5173
```

### Production (local)

```bash
npm run build
npm run start # http://localhost:3000
```

### Production (Docker)

```bash
docker build -t workdashboard .
docker run --rm -p 3000:3000 workdashboard
# Visit http://localhost:3000
```

Note: on Apple Silicon Macs, `docker build` produces an `arm64` image by default. If
you deploy to an `x86_64` host (e.g. most VPS providers), build with:

```bash
docker build --platform linux/amd64 -t workdashboard .
```

## If something breaks

- **`npm run start` errors with "Cannot find module dist/server/server.js"** - you forgot `npm run build` first.
- **Build output path changes** in a future TanStack Start version - update the import in `server.mjs` and the `COPY --from=builder` line in `Dockerfile`.
- **`target: "node-server"` becomes a self-contained Node listener** in a future TanStack Start release - you can drop `server.mjs` and `srvx`, then point the `start` script at whatever path it emits.
- **Roll back the migration entirely** - the last commit on `main` before this change is `60eced4` ("Built static dashboard UI"). `git checkout 60eced4 -- .` will restore the Lovable setup.

## Verification done at migration time

- `npm install` -> clean, 0 vulnerabilities.
- `npm run build` -> emits `dist/client/` + `dist/server/server.js`.
- `npm run start` + `curl http://localhost:3000/` -> HTTP 200, ~31 KB SSR HTML, page title is "Work Dashboard".
- Docker build was NOT verified at migration time because Docker Desktop wasn't running locally. The Dockerfile follows standard multi-stage Node patterns and should build cleanly once Docker Desktop is up.
