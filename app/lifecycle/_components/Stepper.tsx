"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PHASES } from "@/app/_lib/phases";
import { cn } from "@/app/_lib/cn";

export function Stepper() {
  const pathname = usePathname();
  const activeId = pathname.startsWith("/lifecycle/")
    ? pathname.replace("/lifecycle/", "")
    : null;

  return (
    <nav
      aria-label="Lifecycle phases"
      className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
    >
      <ol className="flex min-w-max items-center gap-1.5">
        {PHASES.map((phase) => {
          const active = phase.id === activeId;
          return (
            <li key={phase.id}>
              <Link
                href={`/lifecycle/${phase.id}`}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "group flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                  active
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-5 w-5 items-center justify-center rounded-full font-mono text-[10px]",
                    active
                      ? "bg-background/20 text-accent-foreground"
                      : "bg-muted text-muted-foreground group-hover:bg-muted",
                  )}
                >
                  {phase.number}
                </span>
                <span className="hidden sm:inline">{phase.shortTitle}</span>
                <span className="sm:hidden">{phase.shortTitle}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
