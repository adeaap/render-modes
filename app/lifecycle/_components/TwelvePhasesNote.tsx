"use client";

import { useEffect, useRef, useState } from "react";

export function TwelvePhasesNote() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <span ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="cursor-pointer text-inherit underline decoration-dotted underline-offset-2 transition-colors hover:text-foreground"
      >
        Twelve phases
      </button>
      {open && (
        <span
          role="note"
          className="absolute top-full left-0 z-50 mt-2 w-80 rounded-lg border border-border bg-card p-4 text-left text-sm text-foreground shadow-lg"
        >
          <span className="block">
            I chose 12 phases to make this story approachable, including the DNS
            and TCP steps, but there&apos;s no single right answer. Depending on
            how granular you want to be, you could carve the journey from
            pressing Enter to getting an interactive page into far more steps,
            or far fewer.
          </span>
          <span className="mt-3 block">
            MDN&apos;s{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-accent"
            >
              Critical Rendering Path
            </a>{" "}
            guide, for instance, defines five steps once the HTML arrives at the
            browser: building the DOM, building the CSSOM, constructing the
            render tree, layout, then paint. JavaScript isn&apos;t its own step
            in MDN&apos;s enumeration, it can interrupt or modify any of them.
          </span>
        </span>
      )}
    </span>
  );
}
