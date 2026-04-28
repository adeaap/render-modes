import Link from "next/link";
import { SectionCard } from "@/app/_components/SectionCard";

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              An interactive tour
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              How a web page actually shows up.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              From the moment you press Enter in the address bar to the click
              that finally works, every layer in between is a story. Step
              through the browser&apos;s rendering pipeline, then see how
              Next.js bends that pipeline with six different rendering modes.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 text-sm font-medium">
              <Link
                href="/lifecycle"
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-background transition-opacity hover:opacity-90"
              >
                Start the lifecycle
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="/rendering"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-foreground transition-colors hover:bg-muted"
              >
                Compare rendering modes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Two journeys.
          </h2>
          <p className="text-muted-foreground">
            Pick a starting point. Each module is self-contained, but together
            they tell the full story.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <SectionCard
            href="/lifecycle"
            eyebrow="Module 1"
            title="The browser rendering lifecycle"
            description="Twelve animated phases, from URL bar to interactive page: DNS lookup, TCP/TLS, HTTP, HTML & CSS parsing, the DOM and CSSOM, render tree, layout, paint, compositing, and hydration."
            accent="accent"
            cta="Start the tour"
          />
          <SectionCard
            href="/rendering"
            eyebrow="Module 2"
            title="Next.js rendering modes"
            description="Six live demos, CSR, SSR, SSG, ISR, RSC, and Hydration. Each route actually uses the technique it explains, so you can watch timestamps freeze, refresh, or trickle in on every reload."
            accent="server"
            cta="Compare the modes"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid gap-6 rounded-xl border border-border bg-card p-6 sm:grid-cols-3 sm:p-8">
          <Highlight
            n="01"
            title="Step through, don’t scroll past"
            body="Every phase has its own animated diagram. Use the stepper, hit play, or deep-link to a single phase."
          />
          <Highlight
            n="02"
            title="See the modes behave"
            body="The SSR demo really runs per request. The SSG demo really freezes at build time. Refresh and watch."
          />
          <Highlight
            n="03"
            title="Built on Next.js 16 + React 19"
            body="Uses the new use cache directive, cacheLife, connection(), and async params, the way the framework actually works today."
          />
        </div>
      </section>
    </div>
  );
}

function Highlight({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <span className="font-mono text-xs text-muted-foreground">{n}</span>
      <h3 className="mt-2 text-base font-medium tracking-tight">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  );
}
