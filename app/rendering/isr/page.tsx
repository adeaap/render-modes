"use cache";

import { cacheLife } from "next/cache";
import { CodeBlock } from "@/app/_components/CodeBlock";
import { DevModeBanner } from "@/app/_components/DevModeBanner";
import { TimestampPanel } from "@/app/rendering/_components/TimestampPanel";

const SNIPPET = `// app/rendering/isr/page.tsx
"use cache";
import { cacheLife } from "next/cache";

export default async function Page() {
  cacheLife({ revalidate: 10, expire: 600 });
  // ↑ serve from cache for 10s, regenerate in background after that.
  //   expire must be ≥ 5 min or Next.js excludes it from prerender.
  const generatedAt = new Date().toISOString();
  return <span>{generatedAt}</span>;
}`;

export default async function IsrPage() {
  cacheLife({ revalidate: 10, expire: 600 });
  const generatedAt = new Date().toISOString();

  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          Incremental Static Regeneration
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Static, but with a heartbeat. The first visitor after each
          revalidation window triggers a background regeneration. Everyone else
          still gets the cached version, no waiting.
        </p>
      </header>

      <DevModeBanner />

      <TimestampPanel
        label="Last regenerated at"
        value={generatedAt}
        mode="isr"
        caption="In production, hard-refresh every few seconds (Cmd+Shift+R / Ctrl+Shift+R). The timestamp updates roughly every 10 seconds, between regenerations the cached value stays."
      />

      <Section title="What happens">
        <ol className="ml-5 list-decimal space-y-1.5 text-sm leading-relaxed text-muted-foreground">
          <li>
            <span className="text-foreground">Build,</span> the page is
            prerendered, like SSG.
          </li>
          <li>
            <span className="text-foreground">Request (fresh),</span> the cached
            HTML is served instantly.
          </li>
          <li>
            <span className="text-foreground">Request (stale),</span> after the
            revalidate window, the next request still gets the cached version,{" "}
            <em>and</em> Next.js re-renders in the background.
          </li>
          <li>
            <span className="text-foreground">Swap,</span> subsequent requests
            get the freshly regenerated HTML.
          </li>
        </ol>
      </Section>

      <Section title="The code">
        <CodeBlock code={SNIPPET} language="tsx" title="isr/page.tsx" />
        <p className="mt-3 text-sm text-muted-foreground">
          The inline object form of{" "}
          <code className="font-mono text-xs">cacheLife</code> lets you set{" "}
          <code className="font-mono text-xs">revalidate</code> and{" "}
          <code className="font-mono text-xs">expire</code> in seconds. If
          <code className="font-mono text-xs"> expire</code> is under 5 minutes,
          Next.js refuses to prerender the page (it becomes a &ldquo;dynamic
          hole&rdquo;),so we use 600 seconds here.
        </p>
      </Section>

      <Section title="Trade-offs">
        <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <li className="rounded-lg border border-border bg-muted p-3">
            <span className="font-medium text-foreground">Good:</span> CDN-fast
            like SSG but content stays current. Great for high-traffic listings,
            leaderboards, news.
          </li>
          <li className="rounded-lg border border-border bg-muted p-3">
            <span className="font-medium text-foreground">Bad:</span> data is
            always slightly stale; revalidations cost money; not suitable for
            per-user data.
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
