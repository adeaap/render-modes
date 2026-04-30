export function RenderTreeAnim() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <svg
        viewBox="0 0 600 300"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <text
          x="120"
          y="20"
          textAnchor="middle"
          fontSize="11"
          fill="var(--muted-foreground)"
          fontFamily="ui-monospace,monospace"
        >
          DOM
        </text>
        <text
          x="300"
          y="20"
          textAnchor="middle"
          fontSize="11"
          fill="var(--muted-foreground)"
          fontFamily="ui-monospace,monospace"
        >
          ∩ CSSOM
        </text>
        <text
          x="480"
          y="20"
          textAnchor="middle"
          fontSize="11"
          fill="var(--muted-foreground)"
          fontFamily="ui-monospace,monospace"
        >
          = render tree
        </text>

        <g>
          <RtNode x={120} y={50} label="html" stroke="var(--accent)" />
          <RtEdge x1={120} y1={62} x2={80} y2={92} stroke="var(--accent)" />
          <RtEdge x1={120} y1={62} x2={160} y2={92} stroke="var(--accent)" />
          <RtNode x={80} y={100} label="head" stroke="var(--accent)" />
          <RtNode x={160} y={100} label="body" stroke="var(--accent)" />
          <RtEdge x1={160} y1={112} x2={120} y2={142} stroke="var(--accent)" />
          <RtEdge x1={160} y1={112} x2={200} y2={142} stroke="var(--accent)" />
          <RtNode x={120} y={150} label="h1" stroke="var(--accent)" />
          <RtNode x={200} y={150} label="aside" stroke="var(--accent)" />
          <RtEdge x1={200} y1={162} x2={200} y2={192} stroke="var(--accent)" />
          <RtNode x={200} y={200} label="ad" stroke="var(--accent)" italic />
        </g>

        <g>
          <RtNode x={300} y={50} label="*" stroke="var(--static)" />
          <RtEdge x1={300} y1={62} x2={260} y2={92} stroke="var(--static)" />
          <RtEdge x1={300} y1={62} x2={340} y2={92} stroke="var(--static)" />
          <RtNode
            x={260}
            y={100}
            label="h1"
            stroke="var(--static)"
            caption="font:2rem"
          />
          <RtNode
            x={340}
            y={100}
            label="aside"
            stroke="var(--static)"
            caption="display:none"
          />
          <RtEdge x1={300} y1={62} x2={300} y2={132} stroke="var(--static)" />
          <RtNode
            x={300}
            y={140}
            label="body"
            stroke="var(--static)"
            caption="bg:#fff"
          />
        </g>

        <g>
          <RtNode x={480} y={50} label="html" stroke="var(--client)" />
          <RtEdge x1={480} y1={62} x2={440} y2={92} stroke="var(--client)" />
          <RtNode x={440} y={100} label="body" stroke="var(--client)" />
          <RtEdge x1={440} y1={112} x2={440} y2={142} stroke="var(--client)" />
          <RtNode
            x={440}
            y={150}
            label="h1"
            stroke="var(--client)"
            caption="visible"
          />
        </g>

        <g opacity="0">
          <animate
            attributeName="opacity"
            values="0;0;1;1;0;0"
            keyTimes="0;0.55;0.6;0.85;0.9;1"
            dur="7s"
            repeatCount="indefinite"
          />
          <line
            x1={200}
            y1={200}
            x2={420}
            y2={150}
            stroke="var(--muted-foreground)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <text
            x={310}
            y={195}
            textAnchor="middle"
            fontSize="9"
            fontFamily="ui-monospace,monospace"
            fill="var(--muted-foreground)"
          >
            display:none → excluded
          </text>
        </g>

        <text
          x="300"
          y="280"
          textAnchor="middle"
          fontSize="11"
          fill="var(--muted-foreground)"
          fontFamily="ui-monospace,monospace"
        >
          Only nodes that will paint make it into the render tree.
        </text>
      </svg>
    </div>
  );
}

function RtNode({
  x,
  y,
  label,
  stroke,
  italic,
  caption,
}: {
  x: number;
  y: number;
  label: string;
  stroke: string;
  italic?: boolean;
  caption?: string;
}) {
  const w = 60;
  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - 8}
        width={w}
        height="18"
        rx="4"
        fill="var(--card)"
        stroke={stroke}
        strokeWidth="1"
      />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fontSize="9"
        fontFamily="ui-monospace,monospace"
        fill={italic ? "var(--muted-foreground)" : "var(--foreground)"}
        fontStyle={italic ? "italic" : "normal"}
      >
        {label}
      </text>
      {caption && (
        <text
          x={x}
          y={y + 22}
          textAnchor="middle"
          fontSize="7"
          fontFamily="ui-monospace,monospace"
          fill="var(--muted-foreground)"
        >
          {caption}
        </text>
      )}
    </g>
  );
}

function RtEdge({
  x1,
  y1,
  x2,
  y2,
  stroke,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={stroke}
      strokeWidth="1"
      opacity="0.5"
    />
  );
}
