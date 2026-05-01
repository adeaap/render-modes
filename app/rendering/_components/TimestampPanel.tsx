import { cn } from "@/app/_lib/cn";
import { ModeBadge } from "@/app/_components/ModeBadge";

type Mode = "csr" | "ssr" | "ssg" | "isr" | "rsc" | "hydration";

const MODE_LABELS: Record<
  Mode,
  { badge: string; variant: Parameters<typeof ModeBadge>[0]["variant"] }
> = {
  csr: { badge: "CSR", variant: "client" },
  ssr: { badge: "SSR", variant: "dynamic" },
  ssg: { badge: "SSG", variant: "static" },
  isr: { badge: "ISR", variant: "isr" },
  rsc: { badge: "RSC", variant: "rsc" },
  hydration: { badge: "Hydration", variant: "server" },
};

export function TimestampPanel({
  label,
  value,
  mode,
  caption,
  className,
}: {
  label: string;
  value: string;
  mode: Mode;
  caption?: string;
  className?: string;
}) {
  const info = MODE_LABELS[mode];
  return (
    <div
      className={cn("rounded-xl border border-border bg-card p-6", className)}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
          {label}
        </span>
        <ModeBadge variant={info.variant}>{info.badge}</ModeBadge>
      </div>
      <p className="font-mono text-2xl font-medium tracking-tight text-card-foreground">
        {value}
      </p>
      {caption && (
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          {caption}
        </p>
      )}
    </div>
  );
}
