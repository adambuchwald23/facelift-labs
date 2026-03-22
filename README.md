# Facelift Labs

Modern website landing page for Facelift Labs — built with Next.js, Tailwind CSS, and Framer Motion.

## Run locally

From the project root (`facelift-labs`):

```bash
cd facelift-labs   # or: cd /Users/adambuchwald/Desktop/facelift-labs
npm install
npm run dev
```

Open the URL Next.js prints (usually **http://localhost:3000**). If port 3000 is in use, use the alternate port shown, e.g. **http://localhost:3001**. Open the root path `/` only (e.g. `http://localhost:3000/`).

Run the app from the **`facelift-labs`** folder (or use `npm run dev` from the parent Desktop folder, which proxies here). Do **not** open a saved `.html` file from disk — Tailwind and `/_next/static/...` assets will not load.

### Page looks unstyled (Times New Roman, blue links)

1. In DevTools → **Network**, reload and confirm `/_next/static/css/*.css` returns **200** (not blocked or failed).
2. Disable extensions that block stylesheets or rewrite localhost (ad blockers, privacy tools).
3. From `facelift-labs`: `rm -rf .next && npm run dev` (or `npm run dev:fresh`).

Optional: set `NEXT_PUBLIC_SITE_URL` to your production origin for correct metadata (see `app/layout.tsx`).

## Build

```bash
npm run build
npm start
```

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** (design tokens, responsive)
- **Framer Motion** (section animations, hover states)
- **TypeScript**
- **Inter** (font only)

## Project structure

- `app/` — layout, page, globals
- `components/layout/` — Navbar, Footer
- `components/sections/` — Hero, Portfolio, Core Services, The Facelift, Tech Stack, Comparison, FAQ, Contact
- `components/ui/` — Button, SectionHeader, SectionWrapper, CardStack, Core Service cards, etc.
- `lib/constants.ts` — copy and config

## Logo

Logo lives at `public/logo.svg` (horizontal Facelift Labs mark, accent `#00FF88`).
