"use client";

import { useEffect, useState } from "react";
import { TimestampPanel } from "@/app/rendering/_components/TimestampPanel";

export function CsrIsland() {
  const [state, setState] = useState<
    | { kind: "loading" }
    | { kind: "ready"; iso: string; mountedAt: string }
    | { kind: "error" }
  >({ kind: "loading" });

  useEffect(() => {
    const mountedAt = new Date().toISOString();
    fetch("/api/now")
      .then((r) => r.json())
      .then((data: { iso: string }) =>
        setState({ kind: "ready", iso: data.iso, mountedAt }),
      )
      .catch(() => setState({ kind: "error" }));
  }, []);

  if (state.kind === "loading") {
    return (
      <TimestampPanel
        label="Fetched in browser"
        value="Loading…"
        mode="csr"
        caption="The browser is running JavaScript right now to call /api/now. In a true CSR app this is the only way the page gets its data."
      />
    );
  }

  if (state.kind === "error") {
    return (
      <TimestampPanel
        label="Fetched in browser"
        value="(error)"
        mode="csr"
        caption="Couldn't reach /api/now."
      />
    );
  }

  return (
    <TimestampPanel
      label="Fetched in browser"
      value={state.iso}
      mode="csr"
      caption={`Component mounted at ${state.mountedAt}. Refresh, this value updates on every load because the browser fetches it after hydration.`}
    />
  );
}
