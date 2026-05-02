import { CodeBlock } from "@/app/_components/CodeBlock";
import { ServerClientSplit } from "@/app/rendering/_components/ServerClientSplit";
import { Counter } from "./_components/Counter";

const SNIPPET = `// app/rendering/rsc/page.tsx, Server Component
import { Counter } from "./_components/Counter"; // a 'use client' island

export default function Page() {
  const data = fakeDb(); // runs on the server, no JS shipped
  return (
    <>
      <ServerPanel rows={data.rows} />
      <Counter initial={data.start} /> {/* hydrates in the browser */}
    </>
  );
}

// _components/Counter.tsx
"use client";
import { useState } from "react";
export function Counter({ initial }: { initial: number }) {
  const [count, setCount] = useState(initial);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`;

function fakeDb() {
  // In a real app this would be `await db.query(...)` or `await fetch(...)`.
  // For the demo we keep it deterministic so the page can be prerendered.
  return {
    rows: [
      { id: 1, label: "users", value: 12_482 },
      { id: 2, label: "sessions", value: 3_117 },
      { id: 3, label: "errors", value: 4 },
    ],
    start: 0,
  };
}

export default function RscPage() {
  const data = fakeDb();

  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          React Server Components
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          A new kind of React component that runs <em>only</em> on the server.
          It can read databases, hold secrets, and render HTML, but it never
          gets shipped to the browser. Interactivity is added surgically with
          small{" "}
          <code className="font-mono text-xs">&quot;use client&quot;</code>{" "}
          islands.
        </p>
      </header>

      <ServerClientSplit
        serverNode={
          <div>
            <p className="mb-3 text-sm text-muted-foreground">
              Fetched directly from the server. This table is plain HTML, open
              the page source and you&apos;ll find these numbers baked in.
            </p>
            <table className="w-full text-sm">
              <thead className="text-left text-xs tracking-wider text-muted-foreground uppercase">
                <tr>
                  <th className="border-b border-border pb-2">Metric</th>
                  <th className="border-b border-border pb-2 text-right">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row) => (
                  <tr key={row.id}>
                    <td className="border-b border-border py-2 font-medium">
                      {row.label}
                    </td>
                    <td className="border-b border-border py-2 text-right font-mono tabular-nums">
                      {row.value.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
        serverCaption="No JavaScript executes in the browser for this content, it's plain HTML (plus a small RSC payload that lets Next.js navigate without re-rendering this part)."
        clientNode={<Counter initial={data.start} />}
        clientCaption="The counter ships as JavaScript and only becomes interactive after hydration. The 'Interactive' indicator confirms it."
      />

      <Section title="What happens">
        <ol className="ml-5 list-decimal space-y-1.5 text-sm leading-relaxed text-muted-foreground">
          <li>
            <span className="text-foreground">Server render,</span> the async
            page runs on the server, awaits the &ldquo;DB&rdquo; call, and
            renders the table directly into HTML.
          </li>
          <li>
            <span className="text-foreground">Client island marker,</span> the{" "}
            <code className="font-mono text-xs">&lt;Counter&gt;</code> import is
            recognised as a Client Component because of its{" "}
            <code className="font-mono text-xs">&quot;use client&quot;</code>{" "}
            directive.
          </li>
          <li>
            <span className="text-foreground">Bundle,</span> Next.js sends HTML
            for the whole page, plus a JS bundle for <em>just the Counter</em>{" "}
            (and its dependencies).
          </li>
          <li>
            <span className="text-foreground">Hydrate,</span> on the client,
            React attaches handlers to the counter. The server-only content
            stays as inert HTML.
          </li>
        </ol>
      </Section>

      <Section title="The code">
        <CodeBlock code={SNIPPET} language="tsx" title="rsc/page.tsx" />
      </Section>

      <Section title="Why it matters">
        <p className="text-sm leading-relaxed text-muted-foreground">
          With RSC, you only pay the JavaScript cost for the parts of the page
          the user actually interacts with. A 500-row dashboard with one filter
          dropdown ships the dropdown, not the table-rendering code. That&apos;s
          how Next.js apps stay fast even as they grow.
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
