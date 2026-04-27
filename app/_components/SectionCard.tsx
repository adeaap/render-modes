import Link from "next/link";
import { cn } from "@/app/_lib/cn";

type Props = {
  href: string;
  eyebrow?: string;
  title: string;
  description: string;
  accent?:
    | "accent"
    | "server"
    | "client"
    | "static"
    | "dynamic"
    | "isr"
    | "rsc";
  cta?: string;
};

const ACCENT_RING: Record<NonNullable<Props["accent"]>, string> = {
  accent: "group-hover:shadow-[0_0_0_1px_var(--accent)]",
  server: "group-hover:shadow-[0_0_0_1px_var(--server)]",
  client: "group-hover:shadow-[0_0_0_1px_var(--client)]",
  static: "group-hover:shadow-[0_0_0_1px_var(--static)]",
  dynamic: "group-hover:shadow-[0_0_0_1px_var(--dynamic)]",
  isr: "group-hover:shadow-[0_0_0_1px_var(--isr)]",
  rsc: "group-hover:shadow-[0_0_0_1px_var(--rsc)]",
};

const ACCENT_TEXT: Record<NonNullable<Props["accent"]>, string> = {
  accent: "text-accent",
  server: "text-server",
  client: "text-client",
  static: "text-static",
  dynamic: "text-dynamic",
  isr: "text-isr",
  rsc: "text-rsc",
};

export function SectionCard({
  href,
  eyebrow,
  title,
  description,
  accent = "accent",
  cta = "Open",
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-shadow",
        ACCENT_RING[accent],
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-3 text-xs font-medium tracking-wider uppercase",
            ACCENT_TEXT[accent],
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="text-xl font-semibold tracking-tight text-card-foreground">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <span
        className={cn(
          "mt-6 inline-flex items-center gap-1 text-sm font-medium",
          ACCENT_TEXT[accent],
        )}
      >
        {cta}
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M3 8h10M9 4l4 4-4 4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
