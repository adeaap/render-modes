const LEG = 1.4;
const CYCLE = LEG * 8;

type Leg = {
  from: [number, number];
  to: [number, number];
  color: string;
};

const LEGS: Leg[] = [
  { from: [120, 175], to: [170, 175], color: "var(--accent)" },
  { from: [290, 160], to: [400, 50], color: "var(--accent)" },
  { from: [400, 50], to: [290, 160], color: "var(--server)" },
  { from: [290, 175], to: [400, 175], color: "var(--accent)" },
  { from: [400, 175], to: [290, 175], color: "var(--server)" },
  { from: [290, 190], to: [400, 300], color: "var(--accent)" },
  { from: [400, 300], to: [290, 190], color: "var(--server)" },
  { from: [170, 175], to: [120, 175], color: "var(--server)" },
];

function legKeyTimes(i: number) {
  const start = i / 8;
  const end = (i + 1) / 8;
  return {
    motionTimes: `0; ${start}; ${end}; 1`,
    motionPoints: `0; 0; 1; 1`,
    opacityTimes: `0; ${start}; ${start}; ${end}; ${end}; 1`,
    opacityValues: `0; 0; 1; 1; 0; 0`,
  };
}

export function AddressAnim() {
  return (
    <div className="flex h-full flex-col items-stretch justify-center gap-6 p-6">
      <div className="rounded-md border border-border bg-muted/40 p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <div className="ml-2 flex-1 rounded bg-card px-3 py-1.5 font-mono text-xs">
            <span className="text-muted-foreground">https://</span>
            <span className="text-foreground">rendermodes.com</span>
            <span className="ml-0.5 inline-block h-3 w-1.5 -translate-y-px [animation:blink_1s_steps(2,end)_infinite] bg-foreground align-middle" />
          </div>
        </div>
      </div>

      <svg
        viewBox="0 0 600 340"
        className="w-full flex-1"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker
            id="addr-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
          </marker>
        </defs>

        {/* Browser */}
        <g className="text-foreground">
          <rect
            x="10"
            y="145"
            width="110"
            height="60"
            rx="10"
            fill="var(--card)"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <text
            x="65"
            y="172"
            textAnchor="middle"
            fontSize="12"
            fill="currentColor"
            fontWeight="500"
          >
            Browser
          </text>
          <text
            x="65"
            y="190"
            textAnchor="middle"
            fontSize="9"
            fill="var(--muted-foreground)"
            fontFamily="ui-monospace,monospace"
          >
            rendermodes.com?
          </text>
        </g>

        {/* Resolver */}
        <g className="text-foreground">
          <rect
            x="170"
            y="135"
            width="120"
            height="80"
            rx="10"
            fill="var(--card)"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <text
            x="230"
            y="170"
            textAnchor="middle"
            fontSize="12"
            fill="currentColor"
            fontWeight="500"
          >
            DNS resolver
          </text>
          <text
            x="230"
            y="190"
            textAnchor="middle"
            fontSize="9"
            fill="var(--muted-foreground)"
            fontFamily="ui-monospace,monospace"
          >
            recursive
          </text>
        </g>

        {/* Right column: 3 nameservers */}
        <g className="text-server">
          {/* Root */}
          <rect
            x="400"
            y="20"
            width="180"
            height="60"
            rx="10"
            fill="var(--card)"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <text
            x="490"
            y="46"
            textAnchor="middle"
            fontSize="12"
            fill="var(--foreground)"
            fontWeight="500"
          >
            Root nameservers
          </text>
          <text
            x="490"
            y="64"
            textAnchor="middle"
            fontSize="9"
            fill="var(--muted-foreground)"
            fontFamily="ui-monospace,monospace"
          >
            “.”
          </text>

          {/* TLD */}
          <rect
            x="400"
            y="145"
            width="180"
            height="60"
            rx="10"
            fill="var(--card)"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <text
            x="490"
            y="171"
            textAnchor="middle"
            fontSize="12"
            fill="var(--foreground)"
            fontWeight="500"
          >
            TLD nameservers
          </text>
          <text
            x="490"
            y="189"
            textAnchor="middle"
            fontSize="9"
            fill="var(--muted-foreground)"
            fontFamily="ui-monospace,monospace"
          >
            “.com”
          </text>

          {/* Authoritative */}
          <rect
            x="400"
            y="270"
            width="180"
            height="60"
            rx="10"
            fill="var(--card)"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <text
            x="490"
            y="296"
            textAnchor="middle"
            fontSize="12"
            fill="var(--foreground)"
            fontWeight="500"
          >
            Authoritative
          </text>
          <text
            x="490"
            y="314"
            textAnchor="middle"
            fontSize="9"
            fill="var(--muted-foreground)"
            fontFamily="ui-monospace,monospace"
          >
            rendermodes.com → 192.0.2.42
          </text>
        </g>

        {/* Connection lines */}
        <g
          className="text-accent"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          opacity="0.35"
        >
          <line x1="120" y1="175" x2="170" y2="175" />
          <line x1="290" y1="160" x2="400" y2="50" />
          <line x1="290" y1="175" x2="400" y2="175" />
          <line x1="290" y1="190" x2="400" y2="300" />
        </g>

        {/* Animated dots, one per leg */}
        {LEGS.map((leg, i) => {
          const k = legKeyTimes(i);
          return (
            <circle key={i} cx="0" cy="0" r="5" fill={leg.color}>
              <animateMotion
                dur={`${CYCLE}s`}
                repeatCount="indefinite"
                path={`M${leg.from[0]},${leg.from[1]} L${leg.to[0]},${leg.to[1]}`}
                keyTimes={k.motionTimes}
                keyPoints={k.motionPoints}
                calcMode="linear"
              />
              <animate
                attributeName="opacity"
                dur={`${CYCLE}s`}
                repeatCount="indefinite"
                keyTimes={k.opacityTimes}
                values={k.opacityValues}
              />
            </circle>
          );
        })}

        {/* Step labels, fade in with the matching outbound leg */}
        {[
          { x: 145, y: 130, text: "1. query", legIndex: 0 },
          { x: 330, y: 95, text: "2. ask root", legIndex: 1 },
          { x: 345, y: 130, text: "3. ask .com", legIndex: 3 },
          { x: 330, y: 250, text: "4. ask owner", legIndex: 5 },
          { x: 145, y: 130, text: "5. answer (IP)", legIndex: 7 },
        ].map((label, idx) => {
          const k = legKeyTimes(label.legIndex);
          return (
            <text
              key={idx}
              x={label.x}
              y={label.y}
              textAnchor="middle"
              fontSize="12"
              fontWeight="500"
              fill="var(--foreground)"
              fontFamily="ui-monospace,monospace"
              opacity="0"
            >
              {label.text}
              <animate
                attributeName="opacity"
                dur={`${CYCLE}s`}
                repeatCount="indefinite"
                keyTimes={k.opacityTimes}
                values={k.opacityValues}
              />
            </text>
          );
        })}
      </svg>
    </div>
  );
}
