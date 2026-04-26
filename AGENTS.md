<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Project — Render Modes

An interactive educational web app that walks the user through (1) the browser rendering lifecycle and (2) the Next.js rendering modes. Each rendering-mode demo is a real route that genuinely uses that strategy, so visitors can observe the live differences (timestamps freeze on SSG, change per request on SSR, regenerate every 10s on ISR, etc.).

## Stack

- Next.js 16.2.4 (App Router, Turbopack), React 19.2.4, Tailwind CSS v4, TypeScript strict.
- `cacheComponents: true` is enabled in [next.config.ts](next.config.ts). This means everything is dynamic by default; static content is opted in with `'use cache'` + `cacheLife()`. Route segment configs (`export const dynamic`, `revalidate`, etc.) are removed under this flag — do not add them.
- No `src/` directory. Path alias `@/*` maps to repo root.

## Layout

- `app/page.tsx` — landing.
- `app/lifecycle/` — module 1: 12 prerendered phase pages under `[phase]/` driven by [app/\_lib/phases.ts](app/_lib/phases.ts). The per-phase animations live in [app/lifecycle/[phase]/\_components/](app/lifecycle/%5Bphase%5D/_components/), wired up via `animations.ts`. `template.tsx` forces remount on phase change so animations restart cleanly.
- `app/rendering/` — module 2: hub + six routes (`csr`, `ssr`, `ssg`, `isr`, `rsc`, `hydration`) each demonstrating a single strategy. Don't refactor these to share rendering — divergence is the point.
- `app/_components/`, `app/_lib/` — app-wide shared UI and helpers (private folders, non-routable).
- `app/api/now/route.ts` — dynamic JSON endpoint backing the CSR demo.

## Conventions used in this codebase

- **Dynamic work must live in a `<Suspense>` boundary.** Under cacheComponents, an `await` of uncached data in a server component (e.g. `await connection()`, runtime fetches) blocks the prerender and fails the build. See [app/rendering/ssr/page.tsx](app/rendering/ssr/page.tsx) for the correct pattern (the `<Timestamps />` async component is wrapped in Suspense).
- **`cacheLife({ expire: < 300 })` becomes a "dynamic hole"** and is excluded from prerender. The ISR demo uses `{ revalidate: 10, expire: 600 }` to stay prerendered.
- **`params` and `searchParams` are `Promise<...>`** and must be awaited.
- **No request-time APIs inside `'use cache'` scopes** (no `cookies()`, `headers()`, `searchParams`). Read them outside and pass values as arguments.
- **Animations are pure SVG/CSS** (no Framer Motion or other animation libs). Keep it that way unless there's a clear reason to add a dep. `prefers-reduced-motion` is honoured globally in [app/globals.css](app/globals.css).
- **Tailwind v4 — no `tailwind.config.js`.** Theme tokens live in `@theme inline` inside [app/globals.css](app/globals.css).

## Scripts

- `npm run dev` — dev server (caching is bypassed; SSG/ISR demos won't show their distinguishing behavior here).
- `npm run build && npm start` — required to actually verify the rendering-mode demos behave differently.
- `npm run lint`, `npm run typecheck` — run independently or via the git hooks below.

## Git hooks (Husky)

- `.husky/pre-commit` — `lint-staged` runs `eslint --fix` on staged JS/TS files.
- `.husky/pre-push` — `npm run typecheck && npm run lint && npm run build`. The build step is intentionally included because cacheComponents has a class of prerender errors (Suspense boundaries, `'use cache'` misuse) that neither tsc nor eslint catch.
