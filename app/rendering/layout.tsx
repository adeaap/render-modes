import Link from "next/link";

const MODES = [
  { href: "/rendering/csr", label: "CSR" },
  { href: "/rendering/ssr", label: "SSR" },
  { href: "/rendering/ssg", label: "SSG" },
  { href: "/rendering/isr", label: "ISR" },
  { href: "/rendering/rsc", label: "RSC" },
  { href: "/rendering/hydration", label: "Hydration" },
];

export default function RenderingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <Link
          href="/rendering"
          className="text-xs font-medium tracking-wider text-muted-foreground uppercase hover:text-foreground"
        >
          ← Module 2 · Next.js rendering
        </Link>
      </div>
      <nav
        aria-label="Rendering modes"
        className="mb-8 flex flex-wrap gap-1 border-b border-border pb-4 text-sm"
      >
        {MODES.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {m.label}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
