import { Suspense } from "react";
import { connection } from "next/server";
import { CodeBlock } from "@/app/_components/CodeBlock";
import { TimestampPanel } from "@/app/rendering/_components/TimestampPanel";

const SNIPPET = `// app/rendering/ssr/page.tsx
import { Suspense } from "react";
import { connection } from "next/server";

export default function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <Dynamic />
    </Suspense>
  );
}

async function Dynamic() {
  await connection(); // mark as request-time
  const now = new Date().toISOString();
  const token = crypto.randomUUID().slice(0, 8);
  return <span>{now} · {token}</span>;
}`;

async function Timestamps() {
  await connection();
  const now = new Date().toISOString();
  const token = crypto.randomUUID().slice(0, 8);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <TimestampPanel
        label="Generated on the server at"
        value={now}
        mode="ssr"
        caption="Refresh the page, this value will be different every time."
      />
      <TimestampPanel
        label="Per-request random token"
        value={token}
        mode="ssr"
        caption="Proof that this page truly runs on every request. A static page would always show the same token."
      />
    </div>
  );
}

function TimestampsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="h-40 animate-pulse rounded-xl border border-border bg-muted" />
      <div className="h-40 animate-pulse rounded-xl border border-border bg-muted" />
    </div>
  );
}

export default function SsrPage() {
  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          Server-Side Rendering
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          A full HTML document is generated on the server for every request. The
          user gets meaningful content instantly, and it&apos;s always fresh, at
          the cost of more server work per visit.
        </p>
      </header>

      <Suspense fallback={<TimestampsSkeleton />}>
        <Timestamps />
      </Suspense>

      <Section title="What happens">
        <ol className="ml-5 list-decimal space-y-1.5 text-sm leading-relaxed text-muted-foreground">
          <li>
            <span className="text-foreground">Request,</span> the user hits the
            URL. There&apos;s no cached HTML to serve.
          </li>
          <li>
            <span className="text-foreground">Render,</span> the Node server
            runs the React tree top-to-bottom, awaits any data fetches, and
            produces a complete HTML document.
          </li>
          <li>
            <span className="text-foreground">Send,</span> HTML is streamed to
            the browser. The user sees content immediately.
          </li>
          <li>
            <span className="text-foreground">Hydrate,</span> the JS bundle
            arrives and React attaches handlers, making the page interactive.
          </li>
        </ol>
      </Section>

      <Section title="The code">
        <CodeBlock code={SNIPPET} language="tsx" title="ssr/page.tsx" />
        <p className="mt-3 text-sm text-muted-foreground">
          <code className="font-mono text-xs">connection()</code> is the marker
          that pulls a component out of prerendering: anything that runs after
          it has to wait until a real visitor shows up. With Cache Components
          enabled, request-time work like this has to sit inside a{" "}
          <code className="font-mono text-xs">&lt;Suspense&gt;</code> boundary,
          so the static shell can flush first and the dynamic part streams in
          behind it.
        </p>
      </Section>

      <Section title="Trade-offs">
        <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <li className="rounded-lg border border-border bg-muted p-3">
            <span className="font-medium text-foreground">Good:</span> always
            fresh, can read cookies and headers, great for personalised content.
          </li>
          <li className="rounded-lg border border-border bg-muted p-3">
            <span className="font-medium text-foreground">Bad:</span> every
            request burns server time; latency depends on your data sources.
          </li>
        </ul>
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
