export function JavaScriptAnim() {
  return (
    <div className="flex h-full items-center p-6">
      <svg
        viewBox="0 0 600 280"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <text
          x="300"
          y="20"
          textAnchor="middle"
          fontSize="11"
          fill="var(--muted-foreground)"
          fontFamily="ui-monospace,monospace"
        >
          download → parse → compile → execute
        </text>

        <Stage
          x={20}
          label='<script src="…">'
          caption="discover"
          delay="0s"
          color="var(--accent)"
        />
        <Arrow x1={140} x2={170} y={130} delay="0s" />
        <Stage
          x={170}
          label="🌐 fetch"
          caption="network"
          delay="0.4s"
          color="var(--accent)"
        />
        <Arrow x1={290} x2={320} y={130} delay="0.8s" />
        <Stage
          x={320}
          label="</> parse"
          caption="V8 / SpiderMonkey"
          delay="1.2s"
          color="var(--dynamic)"
        />
        <Arrow x1={440} x2={470} y={130} delay="1.6s" />
        <Stage
          x={470}
          label="▶ run"
          caption="execute"
          delay="2s"
          color="var(--client)"
        />

        <g transform="translate(0, 200)">
          <text
            x="300"
            y="0"
            textAnchor="middle"
            fontSize="11"
            fill="var(--muted-foreground)"
            fontFamily="ui-monospace,monospace"
          >
            call stack
          </text>
          <Frame x={230} y={20} label="main()" delay="2.2s" />
          <Frame x={230} y={42} label="render()" delay="2.6s" />
          <Frame x={230} y={64} label="setState()" delay="3s" />
        </g>
      </svg>
    </div>
  );
}

function Stage({
  x,
  label,
  caption,
  delay,
  color,
}: {
  x: number;
  label: string;
  caption: string;
  delay: string;
  color: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={100}
        width={120}
        height={60}
        rx={8}
        fill="var(--card)"
        stroke={color}
        strokeWidth="1.4"
        opacity="0"
      >
        <animate
          attributeName="opacity"
          values="0;1;1;1"
          keyTimes="0;0.1;0.95;1"
          dur="6s"
          begin={delay}
          repeatCount="indefinite"
        />
      </rect>
      <text
        x={x + 60}
        y={130}
        textAnchor="middle"
        fontSize="12"
        fontFamily="ui-monospace,monospace"
        fill="var(--foreground)"
        opacity="0"
      >
        <animate
          attributeName="opacity"
          values="0;1;1;1"
          keyTimes="0;0.1;0.95;1"
          dur="6s"
          begin={delay}
          repeatCount="indefinite"
        />
        {label}
      </text>
      <text
        x={x + 60}
        y={148}
        textAnchor="middle"
        fontSize="9"
        fontFamily="ui-monospace,monospace"
        fill="var(--muted-foreground)"
        opacity="0"
      >
        <animate
          attributeName="opacity"
          values="0;1;1;1"
          keyTimes="0;0.1;0.95;1"
          dur="6s"
          begin={delay}
          repeatCount="indefinite"
        />
        {caption}
      </text>
    </g>
  );
}

function Arrow({
  x1,
  x2,
  y,
  delay,
}: {
  x1: number;
  x2: number;
  y: number;
  delay: string;
}) {
  return (
    <g opacity="0">
      <animate
        attributeName="opacity"
        values="0;0.8;0.8;0.8"
        keyTimes="0;0.15;0.95;1"
        dur="6s"
        begin={delay}
        repeatCount="indefinite"
      />
      <line
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        stroke="var(--muted-foreground)"
        strokeWidth="1.2"
      />
      <polygon
        points={`${x2},${y} ${x2 - 5},${y - 4} ${x2 - 5},${y + 4}`}
        fill="var(--muted-foreground)"
      />
    </g>
  );
}

function Frame({
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
    <g opacity="0">
      <animate
        attributeName="opacity"
        values="0;1;1;1"
        keyTimes="0;0.1;0.9;1"
        dur="6s"
        begin={delay}
        repeatCount="indefinite"
      />
      <rect
        x={x}
        y={y}
        width="140"
        height="18"
        rx="3"
        fill="var(--client)"
        opacity="0.15"
        stroke="var(--client)"
        strokeWidth="1"
      />
      <text
        x={x + 70}
        y={y + 13}
        textAnchor="middle"
        fontSize="10"
        fontFamily="ui-monospace,monospace"
        fill="var(--client)"
      >
        {label}
      </text>
    </g>
  );
}
