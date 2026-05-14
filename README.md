# Work Dashboard

Personal work dashboard built with React 19, TanStack Start, Tailwind CSS v4, and Vite.

## Quick start

```bash
npm install
npm run dev    # http://localhost:5173
```

## Production

```bash
npm run build
npm run start  # http://localhost:3000
```

## Docker

```bash
docker build -t workdashboard .
docker run --rm -p 3000:3000 workdashboard
# http://localhost:3000
```

## Stack

- React 19 + TanStack Router / Start / Query
- Vite 7 + Tailwind CSS 4 (`@tailwindcss/vite`)
- TypeScript strict, ESLint, Prettier
- shadcn/ui (Radix primitives in `src/lib/ui/`)
- Node 20 SSR runtime via `srvx`

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server on :5173 |
| `npm run build` | Build client + SSR bundles to `dist/` |
| `npm run start` | Run the production server on :3000 |
| `npm run lint` | ESLint |
| `npm run format` | Prettier write |

See [MIGRATION.md](MIGRATION.md) for the history of the Lovable -> Node migration.
