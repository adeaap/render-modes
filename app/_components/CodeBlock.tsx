"use client";

import { useState } from "react";

type Props = {
  code: string;
  language?: string;
  title?: string;
};

export function CodeBlock({ code, language, title }: Props) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore, clipboard not available
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-muted">
      <div className="flex items-center justify-between border-b border-border bg-card/50 px-3 py-1.5 text-xs">
        <span className="font-mono text-muted-foreground">
          {title ?? language ?? "code"}
        </span>
        <button
          type="button"
          onClick={onCopy}
          className="rounded px-2 py-0.5 font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed">
        <code className="font-mono text-card-foreground">{code}</code>
      </pre>
    </div>
  );
}
