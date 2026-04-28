"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import type { Phase } from "@/app/_lib/phases";
import { getPhaseNeighbours } from "@/app/_lib/phases";
import { ANIMATIONS } from "./animations";

const PLAY_INTERVAL_MS = 7000;

export function PhaseShell({ phase }: { phase: Phase }) {
  const router = useRouter();
  const { prev, next } = getPhaseNeighbours(phase.id);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!playing || !next) return;
    timerRef.current = setTimeout(() => {
      router.push(`/lifecycle/${next.id}`);
    }, PLAY_INTERVAL_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, next, router]);

  const Animation = ANIMATIONS[phase.id];

  return (
    <article className="space-y-8">
      <header>
        <div className="mb-3 flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent font-mono text-sm font-medium text-accent-foreground">
            {phase.number}
          </span>
          <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Phase {phase.number} of 12
          </span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {phase.title}
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{phase.summary}</p>
      </header>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="relative h-80 sm:h-[22rem]">
          <Animation />
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-border bg-muted/40 px-4 py-3 text-xs">
          <span className="text-muted-foreground">
            {playing && next
              ? `Auto-advancing to ${next.shortTitle} in ${Math.round(PLAY_INTERVAL_MS / 1000)}s…`
              : "Animation loop, let it play, or use the controls."}
          </span>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            disabled={!next}
            className="rounded-md border border-border bg-card px-3 py-1 font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            {playing ? "Pause auto-play" : "Play through →"}
          </button>
        </div>
      </div>

      <section className="space-y-4">
        {phase.description.map((para, i) =>
          typeof para === "string" ? (
            <p key={i} className="text-base leading-relaxed text-foreground/90">
              {para}
            </p>
          ) : (
            <React.Fragment key={i}>{para}</React.Fragment>
          ),
        )}
      </section>

      <div className="rounded-lg border-l-4 border-accent bg-accent/5 p-4">
        <p className="text-xs font-medium tracking-wider text-accent uppercase">
          Takeaway
        </p>
        <p className="mt-1 text-sm leading-relaxed text-foreground">
          {phase.takeaway}
        </p>
      </div>

      <nav
        aria-label="Phase navigation"
        className="flex items-center justify-between gap-3 border-t border-border pt-6 text-sm"
      >
        <PrevNext direction="prev" phase={prev} />
        <PrevNext direction="next" phase={next} />
      </nav>
    </article>
  );
}

function PrevNext({
  direction,
  phase,
}: {
  direction: "prev" | "next";
  phase: Phase | null;
}) {
  if (!phase) {
    return <span className="invisible">placeholder</span>;
  }
  const label = direction === "prev" ? "Previous" : "Next";
  return (
    <Link
      href={`/lifecycle/${phase.id}`}
      className="group flex max-w-[18rem] flex-col rounded-md border border-border bg-card p-3 transition-colors hover:bg-muted"
    >
      <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
        {label}
      </span>
      <span className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-medium">
        {direction === "prev" && <Arrow direction="prev" />}
        Phase {phase.number} · {phase.shortTitle}
        {direction === "next" && <Arrow direction="next" />}
      </span>
    </Link>
  );
}

function Arrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      {direction === "next" ? (
        <path
          d="M3 8h10M9 4l4 4-4 4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M13 8H3M7 4 3 8l4 4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
