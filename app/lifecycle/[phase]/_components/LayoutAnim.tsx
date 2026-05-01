export function LayoutAnim() {
  return (
    <div className="flex h-full items-center justify-center p-6">
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
          boxes get sized and positioned, top-down then bottom-up
        </text>

        <rect
          x="60"
          y="50"
          width="480"
          height="200"
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        <Box x={70} y={60} w={460} h={50} delay="0s" label="header" />
        <Box x={70} y={120} w={140} h={120} delay="0.6s" label="nav" />
        <Box x={220} y={120} w={310} h={120} delay="1.2s" label="article">
          <Box x={232} y={132} w={286} h={28} delay="1.8s" label="h1" inner />
          <Box x={232} y={170} w={286} h={50} delay="2.4s" label="p" inner />
        </Box>

        <g>
          <text
            x={70}
            y={272}
            fontSize="9"
            fontFamily="ui-monospace,monospace"
            fill="var(--muted-foreground)"
          >
            ↑ width: 140px
          </text>
          <text
            x={530}
            y={272}
            textAnchor="end"
            fontSize="9"
            fontFamily="ui-monospace,monospace"
            fill="var(--muted-foreground)"
          >
            content reflowed ↓
          </text>
        </g>
      </svg>
    </div>
  );
}

function Box({
  x,
  y,
  w,
  h,
  delay,
  label,
  inner,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  delay: string;
  label: string;
  inner?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="3"
        fill={inner ? "var(--accent)" : "var(--muted)"}
        fillOpacity={inner ? 0.08 : 0.4}
        stroke={inner ? "var(--accent)" : "var(--accent)"}
        strokeWidth={inner ? "1" : "1.5"}
        opacity="0"
      >
        <animate
          attributeName="opacity"
          values="0;1;1"
          keyTimes="0;0.2;1"
          dur="4s"
          begin={delay}
          fill="freeze"
        />
        <animate
          attributeName="width"
          from="0"
          to={w}
          dur="0.8s"
          begin={delay}
          fill="freeze"
        />
      </rect>
      <text
        x={x + 6}
        y={y + 12}
        fontSize="9"
        fontFamily="ui-monospace,monospace"
        fill={inner ? "var(--accent)" : "var(--foreground)"}
        opacity="0"
      >
        <animate
          attributeName="opacity"
          values="0;1;1"
          keyTimes="0;0.3;1"
          dur="4s"
          begin={delay}
          fill="freeze"
        />
        {label}
      </text>
      {children}
    </g>
  );
}
