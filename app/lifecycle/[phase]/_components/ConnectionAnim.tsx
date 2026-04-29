export function ConnectionAnim() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <svg
        viewBox="0 0 600 320"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <g className="text-foreground">
          <rect
            x="20"
            y="40"
            width="120"
            height="60"
            rx="10"
            fill="var(--card)"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <text
            x="80"
            y="76"
            textAnchor="middle"
            fontSize="13"
            fill="currentColor"
            fontWeight="500"
          >
            Client
          </text>

          <rect
            x="460"
            y="40"
            width="120"
            height="60"
            rx="10"
            fill="var(--card)"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <text
            x="520"
            y="76"
            textAnchor="middle"
            fontSize="13"
            fill="currentColor"
            fontWeight="500"
          >
            Server
          </text>

          <line
            x1="80"
            y1="100"
            x2="80"
            y2="290"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 4"
            opacity="0.3"
          />
          <line
            x1="520"
            y1="100"
            x2="520"
            y2="290"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 4"
            opacity="0.3"
          />
        </g>

        <Handshake
          y={130}
          label="SYN"
          delay="0s"
          direction="ltr"
          color="var(--accent)"
        />
        <Handshake
          y={170}
          label="SYN-ACK"
          delay="1.4s"
          direction="rtl"
          color="var(--accent)"
        />
        <Handshake
          y={210}
          label="ACK"
          delay="2.8s"
          direction="ltr"
          color="var(--accent)"
        />
        <Handshake
          y={250}
          label="TLS hello + cert"
          delay="4.2s"
          direction="rtl"
          color="var(--server)"
        />
        <Handshake
          y={290}
          label="encrypted ✓"
          delay="5.6s"
          direction="ltr"
          color="var(--client)"
        />

        <text
          x="300"
          y="20"
          textAnchor="middle"
          fontSize="11"
          fill="var(--muted-foreground)"
          fontFamily="ui-monospace,monospace"
        >
          TCP three-way handshake → TLS handshake
        </text>
      </svg>
    </div>
  );
}

function Handshake({
  y,
  label,
  delay,
  direction,
  color,
}: {
  y: number;
  label: string;
  delay: string;
  direction: "ltr" | "rtl";
  color: string;
}) {
  const x1 = direction === "ltr" ? 80 : 520;
  const x2 = direction === "ltr" ? 520 : 80;
  return (
    <g>
      <line
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        stroke={color}
        strokeWidth="1.5"
        opacity="0"
      >
        <animate
          attributeName="opacity"
          values="0;0.35;0.35;0"
          dur="7s"
          begin={delay}
          repeatCount="indefinite"
        />
      </line>
      <circle r="6" fill={color} opacity="0">
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          dur="7s"
          begin={delay}
          repeatCount="indefinite"
        />
        <animate
          attributeName="cx"
          values={`${x1};${x2}`}
          dur="7s"
          begin={delay}
          repeatCount="indefinite"
          keyTimes="0;0.18"
          keySplines="0.4 0 0.2 1"
          calcMode="spline"
          fill="freeze"
        />
        <animate
          attributeName="cy"
          values={`${y};${y}`}
          dur="7s"
          begin={delay}
          repeatCount="indefinite"
        />
      </circle>
      <text
        x={direction === "ltr" ? x1 + 12 : x1 - 12}
        y={y - 6}
        textAnchor={direction === "ltr" ? "start" : "end"}
        fontSize="10"
        fill="var(--muted-foreground)"
        fontFamily="ui-monospace,monospace"
      >
        {label}
      </text>
    </g>
  );
}
