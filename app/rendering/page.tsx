import { SectionCard } from "@/app/_components/SectionCard";

const MODES = [
  {
    href: "/rendering/csr",
    eyebrow: "Client-side",
    title: "CSR, Client-Side Rendering",
    description:
      "Server ships a thin HTML shell. The browser then runs JavaScript that fetches data and fills the page in. Familiar to anyone who has used Vite + React (or the legacy Create React App pattern).",
    accent: "client" as const,
  },
  {
    href: "/rendering/ssr",
    eyebrow: "Per-request",
    title: "SSR, Server-Side Rendering",
    description:
      "Every request rebuilds the full HTML on the server. Great for personalized or rapidly-changing data. Slower than static, but always fresh.",
    accent: "dynamic" as const,
  },
  {
    href: "/rendering/ssg",
    eyebrow: "Build-time",
    title: "SSG, Static Site Generation",
    description:
      "HTML is generated once at build time and served from a CDN. Blazing fast, zero server cost, but the content is frozen until the next build.",
    accent: "static" as const,
  },
  {
    href: "/rendering/isr",
    eyebrow: "Stale-while-revalidate",
    title: "ISR, Incremental Static Regeneration",
    description:
      "Static, but with a clock. Pages are served from cache until they expire, then regenerated in the background. The best of static and dynamic.",
    accent: "isr" as const,
  },
  {
    href: "/rendering/rsc",
    eyebrow: "Architecture",
    title: "RSC, React Server Components",
    description:
      "Server-only React components that compose with client islands. Heavy logic stays on the server; only the interactive bits ship as JS.",
    accent: "rsc" as const,
  },
  {
    href: "/rendering/hydration",
    eyebrow: "Becoming interactive",
    title: "Hydration & partial interactivity",
    description:
      "How static HTML wakes up. React attaches event listeners after the JS bundle arrives, until then, the page is a beautiful, lifeless poster.",
    accent: "server" as const,
  },
];

export default function RenderingHubPage() {
  return (
    <>
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Six ways Next.js renders a page.
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Each card opens a real route that uses that strategy. Refresh, watch
          the timestamps, and notice what differs. For the caching demos (SSG,
          ISR), build for production to see them behave correctly:{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
            npm run build &amp;&amp; npm start
          </code>
          .
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MODES.map((m) => (
          <SectionCard key={m.href} {...m} cta="Open demo" />
        ))}
      </div>
    </>
  );
}
