# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
# Run both frontend and backend together (recommended)
npm run dev

# Run frontend only (Next.js on port 3000)
npm run frontend

# Run backend only (Express on port 5006)
npm run backend
```

### Frontend (from repo root or `frontend/`)
```bash
npm run build --prefix frontend   # Production build
npm run lint --prefix frontend    # ESLint
```

### Install dependencies
```bash
npm run install:all   # Installs both frontend and backend node_modules
```

### Backend database (Prisma)
```bash
cd backend
npx prisma generate          # Regenerate client after schema changes
npx prisma db push           # Push schema changes to DB (dev)
node run_migrations.js       # Run custom migration scripts
node seed_states.js          # Seed state data
node seed_blog.js            # Seed blog data
```

There are no automated tests. Manual verification scripts in `backend/` (e.g. `test_controller.js`, `test_claude.js`) can be run with `node <file>`.

## Architecture

### Monorepo layout
```
/frontend   Next.js 16 App Router (deployed to Vercel, root dir set in dashboard)
/backend    Express + Prisma + PostgreSQL REST API (port 5006)
/admin      React + Vite admin panel (separate SPA)
```

`vercel.json` at root points Vercel at the frontend directory. The root `package.json` uses `concurrently` to run both services locally.

### Frontend — key patterns

**Server vs Client split:** Pages in `app/` are Server Components by default and use `async/await` to fetch data. Any component that needs browser APIs, hooks, or Framer Motion must have `'use client'` at the top.

**`dynamic(ssr: false)` rule:** `next/dynamic` with `ssr: false` cannot be called inside a Server Component. The pattern used here is a dedicated `*Wrapper.tsx` client component that owns the dynamic import (see `NortheastMapWrapper.tsx` → `NortheastMap.tsx`).

**Data fetching strategy — API with static fallback:** `lib/api.ts` wraps all backend calls. If the backend is down or returns empty, functions fall back to static data in `lib/stateData.ts`, `lib/blogData.ts`, and `lib/itineraryData.ts`. Pages merge API data with static data — the static layer ensures the site works without a running backend.

**Image sourcing priority (state/city images):**
1. API `featured_image` — only used if it's a real external URL (not `localhost`)
2. Local files at `frontend/public/images/<state-slug>/<state-slug-N>.jpg`
3. Curated Unsplash URLs in `lib/curatedImages.ts` as last resort

**Route structure:**
- `app/page.tsx` — homepage (Server Component, `force-dynamic`)
- `app/(public)/[state]/page.tsx` — state detail page (dynamic segment)
- `app/(public)/[state]/[city]/page.tsx` — city detail page
- `app/(public)/itineraries/[slug]/page.tsx` — itinerary detail
- `app/(public)/blog/[slug]/page.tsx` — blog post
- `app/api/chat/route.ts` — AI travel assistant (streams via Anthropic SDK)

**NortheastMap:** Leaflet (`react-leaflet` v5) is loaded only client-side via `NortheastMapWrapper`. The outer wrapper div uses `className="isolate"` (CSS `isolation: isolate`) to create a new stacking context — this prevents Leaflet's internal z-indices (600–800) from bleeding over the fixed navbar (`z-50`).

**Search:** `SearchOverlay` is mounted in the root layout and listens for the `open-search` custom event. The navbar search icon dispatches that event. `Ctrl+K` also opens it.

**AI chat widget:** `ChatWidget.tsx` (client) streams responses from `/api/chat/route.ts`, which uses the Anthropic SDK with the system prompt from `lib/ai-assistant.ts`.

### Backend — key patterns

Express server (`server.js`) mounts all routes from `routes/index.js`. Database is PostgreSQL accessed via Prisma (`prisma/schema.prisma`). Environment variables needed: `DATABASE_URL`, `DIRECT_URL` (Supabase direct connection), `ANTHROPIC_API_KEY`, `AWS_*` (S3 for image uploads).

Route → Controller → Prisma model is the standard backend pattern. All routes are under `/api/*`.

### Styling

Tailwind CSS v4 (PostCSS plugin, no `tailwind.config.js`). Brand accent colour is `#7fff27` (lime green), used as the active/hover highlight throughout. Dark section background is `#0f1e14`. Font variables: `--font-inter`, `--font-playfair`, `--font-dm`, `--font-poppins`, `--font-source-sans`.

### Deployment

Frontend deploys to Vercel automatically on push to `main`. The "Root Directory" is set to `frontend` in the Vercel dashboard, so `vercel.json` at the repo root only needs `buildCommand`, `outputDirectory`, and `installCommand` — no `--prefix` flags.
