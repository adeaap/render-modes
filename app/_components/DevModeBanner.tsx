"use client";

export function DevModeBanner() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="rounded-lg border border-dynamic/40 bg-dynamic/10 p-3 text-sm text-foreground">
      <p className="font-medium text-dynamic">
        Heads up, you&apos;re in dev mode.
      </p>
      <p className="mt-1 text-muted-foreground">
        Caching only takes effect in production. To see this demo behave
        differently from the others, run{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
          npm run build &amp;&amp; npm start
        </code>
        .
      </p>
    </div>
  );
}
