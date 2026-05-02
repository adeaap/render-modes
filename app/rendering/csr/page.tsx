"use cache";

import { cacheLife } from "next/cache";
import { CodeBlock } from "@/app/_components/CodeBlock";
import { DevModeBanner } from "@/app/_components/DevModeBanner";
import { TimestampPanel } from "@/app/rendering/_components/TimestampPanel";
import { CsrIsland } from "./_components/CsrIsland";

const SNIPPET = `// app/rendering/csr/page.tsx, server shell, mostly static
"use cache";
import { cacheLife } from "next/cache";

export default async function Page() {
  cacheLife("max");
  return <CsrIsland />;
}

// _components/CsrIsland.tsx, runs in the browser
"use client";
import { useEffect, useState } from "react";

export function CsrIsland() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/api/now").then((r) => r.json()).then(setData);
  }, []);
  return <span>{data?.iso ?? "Loading…"}</span>;
}`;

export default async function CsrPage() {
  cacheLife("max");
  const shellRenderedAt = new Date().toISOString();

  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          Client-Side Rendering
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          The server delivers a near-empty shell. The browser does the rest:
          downloading the JS bundle, mounting React, calling APIs, and painting
          the real content. Until that&apos;s finished, the user watches a
          spinner.
        </p>
      </header>

      <DevModeBanner />

      <div className="grid gap-4 md:grid-cols-2">
        <TimestampPanel
          label="Server shell built at"
          value={shellRenderedAt}
          mode="csr"
          caption="The build-time stamp here is the shell's prerender timestamp (via cacheLife('max')); pure CSR would have no server-rendered timestamp at all. The shell is reused on every visit, fresh data comes from the client fetch on the right."
        />
        <CsrIsland />
      </div>

      <Section title="What happens">
        <ol className="ml-5 list-decimal space-y-1.5 text-sm leading-relaxed text-muted-foreground">
          <li>
            <span className="text-foreground">Build time,</span> Next.js
            prerenders this page&apos;s shell into HTML. No data is fetched.
          </li>
          <li>
            <span className="text-foreground">Request,</span> the CDN serves
            that shell. The browser parses HTML, kicks off the JS bundle.
          </li>
          <li>
            <span className="text-foreground">Hydrate,</span> React mounts the{" "}
            <code className="font-mono text-xs">CsrIsland</code> in the browser.
          </li>
          <li>
            <span className="text-foreground">Fetch,</span> a{" "}
            <code className="font-mono text-xs">useEffect</code> calls{" "}
            <code className="font-mono text-xs">/api/now</code> from the client.
          </li>
          <li>
            <span className="text-foreground">Render,</span> the response
            replaces the loading state. Total time depends on the user&apos;s
            network and CPU.
          </li>
        </ol>
      </Section>

      <Section title="The code">
        <CodeBlock code={SNIPPET} language="tsx" title="csr/page.tsx" />
      </Section>

      <Section title="Trade-offs">
        <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <li className="rounded-lg border border-border bg-muted p-3">
            <span className="font-medium text-foreground">Good:</span> simple
            mental model, fast to deploy, infinite scale on a CDN.
          </li>
          <li className="rounded-lg border border-border bg-muted p-3">
            <span className="font-medium text-foreground">Bad:</span> blank
            screen until JS arrives, weaker SEO out of the box (Googlebot can
            render JS in a second pass, but other crawlers and OpenGraph
            previewers usually can&apos;t), every device does the work.
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
