import { Suspense } from "react";
import { CodeBlock } from "@/app/_components/CodeBlock";
import { HydrationDemo } from "./_components/HydrationDemo";
import { StaticButton } from "./_components/StaticButton";

const SNIPPET = `// Server-rendered button, no JS, never interactive
export function StaticButton() {
  return <button>Looks like a button, does nothing</button>;
}

// Client island, interactive, but only after hydration
"use client";
import { useEffect, useState } from "react";

export function HydrationDemo() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);
  return (
    <button onClick={...}>
      {hydrated ? "Hydrated" : "Awaiting JS"}
    </button>
  );
}`;

async function SlowChunk() {
  await new Promise((r) => setTimeout(r, 1500));
  return (
    <div className="rounded-lg border border-border bg-card p-4 text-sm">
      <p>
        This block was rendered after a 1.5s pause on the server. Until it was
        ready, the rest of the page kept rendering, that&apos;s streaming.
      </p>
    </div>
  );
}

export default function HydrationPage() {
  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          Hydration &amp; partial interactivity
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          HTML lands first. Then the JS bundle arrives, React walks the DOM, and
          event listeners get attached. That handover is <em>hydration</em>.
          Until it finishes, your page is a poster.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <StaticButton />
        <HydrationDemo />
      </section>

      <Section title="The hydration timeline">
        <div className="rounded-lg border border-border bg-muted p-4">
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="font-mono text-xs text-muted-foreground">
                t=0
              </span>
              <span>
                <strong>HTML arrives.</strong> The page is visible, text,
                layout, images, the whole markup tree. But every button is
                inert.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-xs text-muted-foreground">
                t≈1
              </span>
              <span>
                <strong>JS bundle downloads.</strong> Network and parse time.
                Pure waiting from the user&apos;s perspective.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-xs text-muted-foreground">
                t≈2
              </span>
              <span>
                <strong>React hydrates.</strong> It walks the existing DOM,
                reconciles it with the component tree, and attaches event
                listeners.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-xs text-muted-foreground">
                t≈2+
              </span>
              <span>
                <strong>Interactive.</strong> The same button now responds to
                clicks. The user usually doesn&apos;t notice the gap, until the
                bundle is too big.
              </span>
            </li>
          </ol>
        </div>
      </Section>

      <Section title="Streaming + Suspense">
        <p className="mb-4 text-sm text-muted-foreground">
          Next.js can flush HTML in pieces. A slow part of the tree can be
          wrapped in a{" "}
          <code className="font-mono text-xs">&lt;Suspense&gt;</code> boundary;
          the rest of the page renders immediately, and the slow part streams in
          when ready.
        </p>
        <Suspense
          fallback={
            <div className="rounded-lg border border-dashed border-border bg-muted p-4 text-sm text-muted-foreground">
              Streaming a slow chunk… (this fallback is in the initial HTML)
            </div>
          }
        >
          <SlowChunk />
        </Suspense>
      </Section>

      <Section title="The code">
        <CodeBlock code={SNIPPET} language="tsx" title="hydration demo" />
      </Section>

      <Section title="Why partial interactivity matters">
        <p className="text-sm leading-relaxed text-muted-foreground">
          With React Server Components and{" "}
          <code className="font-mono text-xs">&quot;use client&quot;</code>{" "}
          islands, only the interactive parts of the page need JS. Static
          content stays as plain HTML. The bundle is smaller, hydration is
          faster, and the user reaches interactivity sooner.
        </p>
      </Section>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}
