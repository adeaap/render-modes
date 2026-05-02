"use cache";

import { cacheLife } from "next/cache";
import { CodeBlock } from "@/app/_components/CodeBlock";
import { DevModeBanner } from "@/app/_components/DevModeBanner";
import { TimestampPanel } from "@/app/rendering/_components/TimestampPanel";

const SNIPPET = `// app/rendering/ssg/page.tsx
"use cache";
import { cacheLife } from "next/cache";

export default async function Page() {
  cacheLife("max"); // 30-day revalidate, 1-year expire, effectively static
  const builtAt = new Date().toISOString();
  return <span>{builtAt}</span>;
}`;

export default async function SsgPage() {
  cacheLife("max");
  const builtAt = new Date().toISOString();

  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          Static Site Generation
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          The page is rendered once at build time and saved to disk. Every
          subsequent visitor gets the exact same HTML. There&apos;s no server
          work and no database query, it&apos;s as fast as serving a JPEG.
        </p>
      </header>

      <DevModeBanner />

      <TimestampPanel
        label="Built at"
        value={builtAt}
        mode="ssg"
        caption="In production, this value never changes between deploys. Refresh, it stays put. Compare it to the SSR demo, where the timestamp changes on every reload."
      />

      <Section title="What happens">
        <ol className="ml-5 list-decimal space-y-1.5 text-sm leading-relaxed text-muted-foreground">
          <li>
            <span className="text-foreground">Build,</span> Next.js runs the
            page once. The output HTML is written into the build artifact.
          </li>
          <li>
            <span className="text-foreground">Deploy,</span> the static file is
            uploaded to a CDN edge.
          </li>
          <li>
            <span className="text-foreground">Request,</span> the CDN returns
            the cached file. The origin server isn&apos;t touched.
          </li>
          <li>
            <span className="text-foreground">Hydrate,</span> JS arrives,
            interactivity (if any) wires up.
          </li>
        </ol>
      </Section>

      <Section title="The code">
        <CodeBlock code={SNIPPET} language="tsx" title="ssg/page.tsx" />
        <p className="mt-3 text-sm text-muted-foreground">
          The <code className="font-mono text-xs">&quot;use cache&quot;</code>{" "}
          directive is what tells Next.js to prerender this page. Without it,
          under <code className="font-mono text-xs">cacheComponents</code> mode,
          every page is dynamic by default.
        </p>
      </Section>

      <Section title="Trade-offs">
        <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <li className="rounded-lg border border-border bg-muted p-3">
            <span className="font-medium text-foreground">Good:</span> cheapest,
            fastest, infinitely scalable. Perfect for marketing pages, docs,
            archived blog posts.
          </li>
          <li className="rounded-lg border border-border bg-muted p-3">
            <span className="font-medium text-foreground">Bad:</span> data is
            frozen until you redeploy. Not suitable for anything personalised or
            rapidly changing.
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
