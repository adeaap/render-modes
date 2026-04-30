export function CssParsingAnim() {
  return (
    <div className="grid h-full grid-cols-2 gap-6 p-6">
      <div className="flex h-full flex-col justify-center">
        <p className="mb-3 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          stylesheet
        </p>
        <pre className="rounded-md border border-border bg-muted p-3 font-mono text-xs leading-relaxed">
          <span className="text-static">body</span> {"{"}
          {"\n"} <span className="text-muted-foreground">color</span>:{" "}
          <span className="text-foreground">#0a0a0a</span>;{"\n"}{" "}
          <span className="text-muted-foreground">font-family</span>:{" "}
          <span className="text-foreground">sans-serif</span>;{"\n"}
          {"}"}
          {"\n"}
          <span className="text-static">h1</span> {"{"}
          {"\n"} <span className="text-muted-foreground">font-size</span>:{" "}
          <span className="text-foreground">2rem</span>;{"\n"}{" "}
          <span className="text-muted-foreground">font-weight</span>:{" "}
          <span className="text-foreground">600</span>;{"\n"}
          {"}"}
          {"\n"}
          <span className="text-static">.btn</span> {"{"}
          {"\n"} <span className="text-muted-foreground">padding</span>:{" "}
          <span className="text-foreground">8px 16px</span>;{"\n"}
          {"}"}
        </pre>
      </div>

      <div className="flex h-full flex-col justify-center">
        <p className="mb-3 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          CSSOM
        </p>
        <svg
          viewBox="0 0 300 180"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <CssNode x={150} y={20} label="StyleSheet" delay="0s" wide />
          <CssEdge x1={150} y1={32} x2={52} y2={72} delay="0.5s" />
          <CssEdge x1={150} y1={32} x2={165} y2={72} delay="1.5s" />
          <CssEdge x1={150} y1={32} x2={250} y2={72} delay="2.5s" />
          <CssNode x={52} y={80} label="body" delay="0.7s" />
          <CssNode x={165} y={80} label="h1" delay="1.7s" />
          <CssNode x={250} y={80} label=".btn" delay="2.7s" />

          <CssEdge x1={52} y1={92} x2={25} y2={132} delay="1s" />
          <CssEdge x1={52} y1={92} x2={80} y2={132} delay="1.1s" />
          <CssEdge x1={165} y1={92} x2={135} y2={132} delay="2s" />
          <CssEdge x1={165} y1={92} x2={195} y2={132} delay="2.1s" />
          <CssEdge x1={250} y1={92} x2={250} y2={132} delay="3s" />

          <CssLeaf x={25} y={140} label="color" delay="1.2s" />
          <CssLeaf x={80} y={140} label="font-family" delay="1.3s" />
          <CssLeaf x={135} y={140} label="font-size" delay="2.2s" />
          <CssLeaf x={195} y={140} label="font-weight" delay="2.3s" />
          <CssLeaf x={250} y={140} label="padding" delay="3.2s" />
        </svg>
      </div>
    </div>
  );
}

function CssNode({
  x,
  y,
  label,
  delay,
  wide,
}: {
  x: number;
  y: number;
  label: string;
  delay: string;
  wide?: boolean;
}) {
  const w = wide ? 90 : 50;
  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - 8}
        width={w}
        height="18"
        rx="4"
        fill="var(--card)"
        stroke="var(--static)"
        strokeWidth="1"
        opacity="0"
      >
        <animate
          attributeName="opacity"
          values="0;1;1;1;0"
          keyTimes="0;0.06;0.85;0.92;1"
          dur="6s"
          begin={delay}
          repeatCount="indefinite"
        />
      </rect>
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fontSize="9"
        fontFamily="ui-monospace,monospace"
        fill="var(--foreground)"
        opacity="0"
      >
        <animate
          attributeName="opacity"
          values="0;1;1;1;0"
          keyTimes="0;0.06;0.85;0.92;1"
          dur="6s"
          begin={delay}
          repeatCount="indefinite"
        />
        {label}
      </text>
    </g>
  );
}

function CssLeaf({
  x,
  y,
  label,
  delay,
}: {
  x: number;
  y: number;
  label: string;
  delay: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize="8"
      fontFamily="ui-monospace,monospace"
      fill="var(--muted-foreground)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1;1;1;0"
        keyTimes="0;0.06;0.85;0.92;1"
        dur="6s"
        begin={delay}
        repeatCount="indefinite"
      />
      {label}
    </text>
  );
}

function CssEdge({
  x1,
  y1,
  x2,
  y2,
  delay,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: string;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="var(--static)"
      strokeWidth="1"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;0.45;0.45;0.45;0"
        keyTimes="0;0.1;0.85;0.92;1"
        dur="6s"
        begin={delay}
        repeatCount="indefinite"
      />
    </line>
  );
}
