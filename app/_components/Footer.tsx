export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          Render Modes, an interactive guide to how browsers and Next.js render
          pages.
        </p>
        <p className="font-mono">
          Built with Next.js {`16`} · React {`19`} · Tailwind CSS {`v4`}
        </p>
      </div>
    </footer>
  );
}
