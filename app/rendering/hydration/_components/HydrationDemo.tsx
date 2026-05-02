"use client";

import { useState, useSyncExternalStore } from "react";

const subscribeNoop = () => () => {};
const getHydrated = () => true;
const getHydratedServer = () => false;

export function HydrationDemo() {
  const hydrated = useSyncExternalStore(
    subscribeNoop,
    getHydrated,
    getHydratedServer,
  );
  const [count, setCount] = useState(0);

  return (
    <div className="rounded-lg border border-client/40 bg-client/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium tracking-wider text-client uppercase">
          Client island
        </span>
        <span
          className={
            "inline-flex items-center gap-1.5 text-xs font-medium " +
            (hydrated ? "text-client" : "text-muted-foreground")
          }
        >
          <span
            className={
              "h-1.5 w-1.5 rounded-full " +
              (hydrated ? "bg-client" : "animate-blink bg-muted-foreground")
            }
          />
          {hydrated ? "Hydrated" : "Awaiting JS"}
        </span>
      </div>
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="w-full rounded-md border border-client/50 bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-client/10"
      >
        Click me, clicked {count} times
      </button>
      <p className="mt-2 text-xs text-muted-foreground">
        This button needs JavaScript to do anything. Try it before and after
        hydration completes.
      </p>
    </div>
  );
}
