export function CompositeAnim() {
  const layers = [
    { color: "var(--server)", label: "background", offset: 0 },
    { color: "var(--static)", label: "content", offset: 1 },
    { color: "var(--client)", label: "fixed nav", offset: 2 },
    { color: "var(--accent)", label: "modal", offset: 3 },
    { color: "var(--dynamic)", label: "tooltip", offset: 4 },
  ];

  return (
    <div className="flex h-full items-center justify-center p-6 [perspective:900px]">
      <div className="relative h-56 w-72 [transform:rotateX(38deg)_rotateZ(-12deg)] [transform-style:preserve-3d]">
        {layers.map((layer, i) => (
          <div
            key={layer.label}
            className="absolute inset-0 rounded-lg border shadow-lg"
            style={{
              transform: `translateZ(${layer.offset * 28}px)`,
              background: `color-mix(in oklab, ${layer.color} 22%, transparent)`,
              borderColor: `color-mix(in oklab, ${layer.color} 65%, transparent)`,
              animation: `fade-in 0.5s ease-out ${i * 0.18}s both`,
            }}
          >
            <div
              className="absolute top-2 left-2 rounded px-1.5 py-0.5 font-mono text-[10px]"
              style={{
                background: `color-mix(in oklab, ${layer.color} 30%, transparent)`,
                color: layer.color,
              }}
            >
              layer {i + 1} · {layer.label}
            </div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute right-0 bottom-6 left-0 text-center font-mono text-[10px] text-muted-foreground">
        compositor stacks painted layers · GPU-friendly · runs off the main
        thread
      </div>
    </div>
  );
}
