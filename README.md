# Render Modes

> How a web page actually shows up.

**Live demo: [rendermodes.com](https://www.rendermodes.com/)**

An interactive walkthrough of how a page reaches the screen, in two modules:

1. **The browser rendering lifecycle** — twelve animated phases from URL bar to interactive page.
2. **Next.js rendering modes** — six live demos where each route actually uses the technique it explains, so you can watch timestamps freeze on SSG, change per request on SSR, regenerate every 10s on ISR, and so on.

## Modules

### 1. Lifecycle — `/lifecycle`

Twelve phases, in order:

`address` → `connection` → `http` → `html-parsing` → `css-parsing` → `javascript` → `dom` → `render-tree` → `layout` → `paint` → `composite` → `hydration`

Each phase has its own animated diagram and a dedicated route under `/lifecycle/[phase]`. The phase definitions live in [app/\_lib/phases.tsx](app/_lib/phases.tsx); the per-phase animations are in [app/lifecycle/[phase]/\_components/](app/lifecycle/%5Bphase%5D/_components/).

### 2. Rendering modes — `/rendering`

Six routes, each demonstrating one strategy:

| Route                                                      | What it shows                                                                                     |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [`/rendering/csr`](app/rendering/csr/page.tsx)             | Client-side rendering — the server ships an empty shell, the browser fetches the data and paints. |
| [`/rendering/ssr`](app/rendering/ssr/page.tsx)             | Server-side rendering — the page is rendered fresh on every request.                              |
| [`/rendering/ssg`](app/rendering/ssg/page.tsx)             | Static generation — rendered once at build time, frozen forever.                                  |
| [`/rendering/isr`](app/rendering/isr/page.tsx)             | Incremental static regeneration — static, but regenerated every 10 seconds.                       |
| [`/rendering/rsc`](app/rendering/rsc/page.tsx)             | React Server Components — server-only components, with `"use client"` islands.                    |
| [`/rendering/hydration`](app/rendering/hydration/page.tsx) | Hydration — HTML lands first, JS attaches event listeners afterward.                              |

The CSR demo is backed by [app/api/now/route.ts](app/api/now/route.ts).

## Stack

- **Next.js 16.2.4** (App Router, Turbopack)
- **React 19.2.4**
- **Tailwind CSS v4** — theme tokens in `@theme inline` inside [app/globals.css](app/globals.css); no `tailwind.config.js`.
- **TypeScript** (strict)
- **`cacheComponents: true`** is enabled in [next.config.ts](next.config.ts). Everything is dynamic by default; static content is opted in with `'use cache'` + `cacheLife()`. Route segment configs (`export const dynamic`, `revalidate`, etc.) don't apply under this flag.

## Getting started

Requires **Node 20** (matching CI).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Caveat:** `next dev` bypasses caching, so the SSG and ISR demos won't show their distinguishing behaviour against `npm run dev`. To actually see timestamps freeze on SSG and tick every 10s on ISR, run a real production build:
>
> ```bash
> npm run build && npm start
> ```

## Scripts

| Command                                   | What it does                           |
| ----------------------------------------- | -------------------------------------- |
| `npm run dev`                             | Dev server (caching bypassed).         |
| `npm run build`                           | Production build.                      |
| `npm start`                               | Serve the production build.            |
| `npm run lint`                            | ESLint.                                |
| `npm run typecheck`                       | `tsc --noEmit`.                        |
| `npm run format` / `npm run format:check` | Prettier write / check.                |
| `npm run test:e2e`                        | Playwright across all profiles.        |
| `npm run test:e2e:dev`                    | Playwright against the dev server.     |
| `npm run test:e2e:prod`                   | Playwright against a production build. |
| `npm run test:e2e:ui`                     | Playwright UI mode (dev profile).      |

## Testing

Playwright e2e suites live in `e2e/`, with two profiles:

- **dev** — runs against `next dev`. Fast feedback, used on every PR.
- **prod** — runs against `npm run build && next start`. The webServer is started by Playwright. This is the only profile where SSG/ISR behave realistically, so the slower wall-clock tests live here.

Suites cover **smoke**, **rendering** (the six modes), **lifecycle** (phase navigation), **a11y** (via `@axe-core/playwright`), **prefs** (preference handling), and **failure** (error paths).

## CI

Two GitHub Actions workflows in `.github/workflows/`:

- [`ci.yml`](.github/workflows/ci.yml) runs on every PR and on `main` pushes:
  - `quality` — typecheck, lint, prettier check.
  - `build` — full Next.js build. The build is the gate for the class of `cacheComponents` prerender errors that neither tsc nor eslint catch.
  - `e2e-dev` — Playwright (dev profile).
- [`nightly.yml`](.github/workflows/nightly.yml) runs daily at 06:00 UTC (and on `workflow_dispatch`):
  - `e2e-prod` — Playwright (prod profile) against a real production build, kept off the PR path so the slow ISR wall-clock test doesn't gate every push.

## Project layout

```
app/
  page.tsx                 landing
  lifecycle/               module 1: 12 prerendered phase pages
    [phase]/
      _components/         per-phase animations
  rendering/               module 2: hub + six rendering-mode routes
    csr/  ssr/  ssg/  isr/  rsc/  hydration/
  api/now/                 dynamic JSON for the CSR demo
  _components/  _lib/      app-wide shared UI and helpers
e2e/                       Playwright suites and fixtures
.github/workflows/         ci.yml, nightly.yml
```

## Conventions

Project-specific conventions — Suspense boundaries under `cacheComponents`, `params`/`searchParams` as Promises, no request-time APIs inside `'use cache'`, pure SVG/CSS animations, `prefers-reduced-motion` honoured globally, Husky pre-push that runs typecheck + lint + build — are documented in [AGENTS.md](AGENTS.md).

## Contributions

This is a personal showcase project. Issues are disabled and PRs are not actively reviewed, feel free to fork if you want to build on it. Security reports are welcome via [SECURITY.md](SECURITY.md).

## License

Released under the [MIT License](LICENSE).
