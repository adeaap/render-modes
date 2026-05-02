"use client";

import { useState, useSyncExternalStore } from "react";

const subscribeNoop = () => () => {};
const getHydrated = () => true;
const getHydratedServer = () => false;

export function Counter({ initial }: { initial: number }) {
  const [count, setCount] = useState(initial);
  const hydrated = useSyncExternalStore(
    subscribeNoop,
    getHydrated,
    getHydratedServer,
  );

  return (
    <div>
      <div className="mb-3 flex items-baseline gap-3">
        <span className="font-mono text-3xl font-medium tabular-nums">
          {count}
        </span>
        <span
          className={
            "text-xs font-medium " +
            (hydrated ? "text-client" : "text-muted-foreground")
          }
        >
          {hydrated ? "● Interactive" : "○ Awaiting JS…"}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setCount((c) => c - 1)}
          className="rounded-md border border-border bg-card px-3 py-1.5 text-sm transition-colors hover:bg-muted"
        >
          −1
        </button>
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="rounded-md border border-border bg-card px-3 py-1.5 text-sm transition-colors hover:bg-muted"
        >
          +1
        </button>
        <button
          type="button"
          onClick={() => setCount(initial)}
          className="rounded-md border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          reset
        </button>
      </div>
    </div>
  );
}
