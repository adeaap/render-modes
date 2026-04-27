import { cn } from "@/app/_lib/cn";

type Variant =
  | "server"
  | "client"
  | "static"
  | "dynamic"
  | "isr"
  | "rsc"
  | "neutral";

const STYLES: Record<Variant, string> = {
  server: "bg-server/10 text-server border-server/30",
  client: "bg-client/10 text-client border-client/30",
  static: "bg-static/10 text-static border-static/30",
  dynamic: "bg-dynamic/10 text-dynamic border-dynamic/30",
  isr: "bg-isr/10 text-isr border-isr/30",
  rsc: "bg-rsc/10 text-rsc border-rsc/30",
  neutral: "bg-muted text-muted-foreground border-border",
};

export function ModeBadge({
  variant = "neutral",
  children,
}: {
  variant?: Variant;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        STYLES[variant],
      )}
    >
      {children}
    </span>
  );
}
