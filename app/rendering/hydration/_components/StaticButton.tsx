export function StaticButton() {
  return (
    <div className="rounded-lg border border-server/40 bg-server/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium tracking-wider text-server uppercase">
          Server-only markup
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-server">
          <span className="h-1.5 w-1.5 rounded-full bg-server" />
          Always inert
        </span>
      </div>
      <button
        type="button"
        className="w-full rounded-md border border-server/50 bg-card px-4 py-2 text-sm font-medium opacity-90"
      >
        Looks like a button, does nothing
      </button>
      <p className="mt-2 text-xs text-muted-foreground">
        Rendered by a Server Component. There&apos;s no JavaScript attached to
        it, clicking, hovering, focusing all work, but nothing
        <em> happens</em>. This is what every page looks like before hydration.
      </p>
    </div>
  );
}
