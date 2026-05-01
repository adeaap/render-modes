export function HydrationAnim() {
  return (
    <div className="grid h-full grid-cols-2 gap-4 p-6">
      <div className="flex flex-col">
        <p className="mb-2 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          HTML arrives, inert
        </p>
        <Page muted />
        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          visible · clickable-looking · does nothing
        </p>
      </div>

      <div className="flex flex-col">
        <p className="mb-2 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          JS attaches handlers
        </p>
        <div className="relative">
          <Page muted={false} />
          <Spark x="22%" y="38%" delay="0s" />
          <Spark x="68%" y="38%" delay="0.4s" />
          <Spark x="42%" y="72%" delay="0.8s" />
          <Spark x="78%" y="72%" delay="1.2s" />
        </div>
        <p className="mt-2 text-center text-[10px] text-client">
          interactive ✓
        </p>
      </div>
    </div>
  );
}

function Page({ muted }: { muted: boolean }) {
  const text = muted ? "bg-muted-foreground/30" : "bg-foreground/60";
  const accent = muted ? "bg-muted-foreground/40" : "bg-accent/70";
  return (
    <div className="flex-1 overflow-hidden rounded-lg border border-border bg-card p-4">
      <div className={`mb-3 h-5 w-1/2 rounded ${text}`} />
      <div className={`mb-2 h-2 w-full rounded ${text} opacity-50`} />
      <div className={`mb-4 h-2 w-3/4 rounded ${text} opacity-50`} />
      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className={`h-7 rounded ${accent}`} />
        <div
          className={`h-7 rounded border-2 ${muted ? "border-muted-foreground/30" : "border-accent/70"}`}
        />
      </div>
      <div className={`mb-2 h-2 w-full rounded ${text} opacity-50`} />
      <div className={`mb-4 h-2 w-2/3 rounded ${text} opacity-50`} />
      <div className="grid grid-cols-2 gap-2">
        <div className={`h-7 rounded ${accent}`} />
        <div className={`h-7 rounded ${accent}`} />
      </div>
    </div>
  );
}

function Spark({ x, y, delay }: { x: string; y: string; delay: string }) {
  return (
    <span
      aria-hidden
      className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-client"
      style={{
        left: x,
        top: y,
        animation: `spark 1.6s ease-out ${delay} infinite`,
      }}
    />
  );
}
