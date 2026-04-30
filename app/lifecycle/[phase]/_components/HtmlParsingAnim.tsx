export function HtmlParsingAnim() {
  const tags = [
    "<html>",
    "<head>",
    "<title>",
    "</title>",
    "</head>",
    "<body>",
    "<h1>",
    "</h1>",
  ];
  return (
    <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-4 p-6">
      <div className="flex h-full flex-col justify-center">
        <p className="mb-3 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          Bytes
        </p>
        <pre className="h-48 overflow-hidden rounded-md border border-border bg-muted p-3 font-mono text-xs leading-relaxed text-muted-foreground">
          {`<html>
  <head>
    <title>Hi</title>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>`}
        </pre>
      </div>

      <svg
        viewBox="0 0 80 200"
        className="h-full w-20"
        preserveAspectRatio="xMidYMid meet"
      >
        {tags.map((tag, i) => (
          <g key={`${tag}-${i}`} fontFamily="ui-monospace,monospace">
            <rect
              width="64"
              height="18"
              rx="3"
              fill="var(--accent)"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;0.18;0"
                dur="6s"
                begin={`${i * 0.65}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="x"
                values="8;8;8"
                dur="6s"
                begin={`${i * 0.65}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values="0;90;180"
                dur="6s"
                begin={`${i * 0.65}s`}
                repeatCount="indefinite"
              />
            </rect>
            <text fontSize="9" fill="var(--accent)" opacity="0">
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="6s"
                begin={`${i * 0.65}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="x"
                values="12;12;12"
                dur="6s"
                begin={`${i * 0.65}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values="13;103;193"
                dur="6s"
                begin={`${i * 0.65}s`}
                repeatCount="indefinite"
              />
              {tag}
            </text>
          </g>
        ))}
      </svg>

      <div className="flex h-full flex-col justify-center">
        <p className="mb-3 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          DOM tree
        </p>
        <svg
          viewBox="0 0 200 200"
          className="h-48 w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <Node x={100} y={20} label="html" delay="0s" />
          <Edge x1={100} y1={28} x2={50} y2={62} delay="0.6s" />
          <Edge x1={100} y1={28} x2={150} y2={62} delay="2.6s" />
          <Node x={50} y={70} label="head" delay="0.8s" />
          <Node x={150} y={70} label="body" delay="2.8s" />
          <Edge x1={50} y1={78} x2={50} y2={112} delay="1.4s" />
          <Edge x1={150} y1={78} x2={150} y2={112} delay="3.4s" />
          <Node x={50} y={120} label="title" delay="1.6s" />
          <Node x={150} y={120} label="h1" delay="3.6s" />
          <Edge x1={50} y1={128} x2={50} y2={158} delay="2s" />
          <Edge x1={150} y1={128} x2={150} y2={158} delay="4s" />
          <TextNode x={50} y={170} label="Hi" delay="2.2s" />
          <TextNode x={150} y={170} label="Hello" delay="4.2s" />
        </svg>
      </div>
    </div>
  );
}

function Node({
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
    <g>
      <rect
        x={x - 24}
        y={y - 8}
        width="48"
        height="18"
        rx="4"
        fill="var(--card)"
        stroke="var(--accent)"
        strokeWidth="1"
        opacity="0"
      >
        <animate
          attributeName="opacity"
          values="0;1;1;1;0"
          keyTimes="0;0.05;0.85;0.9;1"
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
          keyTimes="0;0.05;0.85;0.9;1"
          dur="6s"
          begin={delay}
          repeatCount="indefinite"
        />
        {label}
      </text>
    </g>
  );
}

function TextNode({
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
      fontSize="9"
      fontFamily="ui-monospace,monospace"
      fill="var(--muted-foreground)"
      opacity="0"
      fontStyle="italic"
    >
      <animate
        attributeName="opacity"
        values="0;1;1;1;0"
        keyTimes="0;0.05;0.85;0.9;1"
        dur="6s"
        begin={delay}
        repeatCount="indefinite"
      />
      “{label}”
    </text>
  );
}

function Edge({
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
      stroke="var(--accent)"
      strokeWidth="1"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;0.5;0.5;0.5;0"
        keyTimes="0;0.1;0.85;0.9;1"
        dur="6s"
        begin={delay}
        repeatCount="indefinite"
      />
    </line>
  );
}
