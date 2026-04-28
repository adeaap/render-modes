import Link from "next/link";
import { PHASES } from "@/app/_lib/phases";
import { TwelvePhasesNote } from "@/app/lifecycle/_components/TwelvePhasesNote";

export default function LifecycleIndex() {
  return (
    <article className="space-y-10">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          The browser rendering lifecycle.
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          <TwelvePhasesNote /> stand between &ldquo;you press Enter&rdquo; and
          &ldquo;the page responds to your click&rdquo;. Each one is a distinct
          piece of work the browser does, often in parallel, frequently
          misunderstood. Step through them in order, or jump straight to the one
          you care about.
        </p>
        <div className="mt-6">
          <Link
            href={`/lifecycle/${PHASES[0].id}`}
            className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Start with phase 1: {PHASES[0].shortTitle}
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
        </div>
      </header>

      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PHASES.map((phase) => (
          <li key={phase.id}>
            <Link
              href={`/lifecycle/${phase.id}`}
              className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/60"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted font-mono text-xs text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground">
                  {phase.number}
                </span>
                <span className="text-sm font-semibold tracking-tight">
                  {phase.title}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {phase.summary}
              </p>
            </Link>
          </li>
        ))}
      </ol>
    </article>
  );
}
