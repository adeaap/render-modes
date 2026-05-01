export function PaintAnim() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="relative h-full w-full overflow-hidden rounded-lg border border-border bg-card">
        <div className="absolute inset-0 grid grid-cols-6 gap-2 p-4">
          <div className="col-span-6 h-10 rounded bg-server/30" />
          <div className="col-span-2 row-span-2 rounded bg-static/30" />
          <div className="col-span-4 h-16 rounded bg-accent/30" />
          <div className="col-span-4 h-16 rounded bg-client/30" />
          <div className="col-span-3 h-20 rounded bg-isr/30" />
          <div className="col-span-3 h-20 rounded bg-rsc/30" />
          <div className="col-span-6 h-12 rounded bg-dynamic/30" />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-32 [animation:paint-sweep_2.6s_ease-in-out_infinite]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.6) 50%, transparent 100%)",
            mixBlendMode: "screen",
          }}
        />

        <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between rounded-md bg-background/70 px-3 py-1.5 font-mono text-[10px] text-muted-foreground backdrop-blur">
          <span>boxes → drawing commands → pixels</span>
          <span className="text-accent">painting…</span>
        </div>
      </div>
    </div>
  );
}
