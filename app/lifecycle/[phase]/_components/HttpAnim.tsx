export function HttpAnim() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <svg
        viewBox="0 0 600 280"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <g className="text-foreground">
          <rect
            x="20"
            y="100"
            width="120"
            height="80"
            rx="10"
            fill="var(--card)"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <text
            x="80"
            y="135"
            textAnchor="middle"
            fontSize="13"
            fill="currentColor"
            fontWeight="500"
          >
            Browser
          </text>
          <text
            x="80"
            y="155"
            textAnchor="middle"
            fontSize="10"
            fill="var(--muted-foreground)"
            fontFamily="ui-monospace,monospace"
          >
            HTTP/1.1
          </text>

          <rect
            x="460"
            y="100"
            width="120"
            height="80"
            rx="10"
            fill="var(--card)"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <text
            x="520"
            y="135"
            textAnchor="middle"
            fontSize="13"
            fill="currentColor"
            fontWeight="500"
          >
            Server
          </text>
          <text
            x="520"
            y="155"
            textAnchor="middle"
            fontSize="10"
            fill="var(--muted-foreground)"
            fontFamily="ui-monospace,monospace"
          >
            rendermodes.com
          </text>
        </g>

        <line
          x1="140"
          y1="140"
          x2="460"
          y2="140"
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        <g>
          <rect
            width="110"
            height="32"
            rx="4"
            fill="var(--accent)"
            opacity="0.2"
            stroke="var(--accent)"
            strokeWidth="1"
          >
            <animate
              attributeName="opacity"
              values="0;0.25;0.25;0"
              dur="6s"
              repeatCount="indefinite"
            />
          </rect>
          <text
            fontSize="11"
            fontFamily="ui-monospace,monospace"
            fill="var(--foreground)"
            textAnchor="middle"
          >
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              dur="6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x"
              values="170;395;395;170"
              dur="6s"
              repeatCount="indefinite"
              keyTimes="0;0.45;0.55;1"
            />
            <animate
              attributeName="y"
              values="124;124;124;124"
              dur="6s"
              repeatCount="indefinite"
            />
            <tspan x="0" dy="0">
              GET /index.html
            </tspan>
          </text>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="140,124;395,124;395,124;140,124"
            dur="6s"
            keyTimes="0;0.45;0.55;1"
            repeatCount="indefinite"
          />
        </g>

        <g>
          <rect width="110" height="32" rx="4" fill="var(--client)" opacity="0">
            <animate
              attributeName="opacity"
              values="0;0;0.25;0.25;0"
              dur="6s"
              keyTimes="0;0.5;0.55;0.95;1"
              repeatCount="indefinite"
            />
          </rect>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="395,164;395,164;140,164;140,164"
            dur="6s"
            keyTimes="0;0.55;0.95;1"
            repeatCount="indefinite"
          />
        </g>

        <text
          fontSize="11"
          fontFamily="ui-monospace,monospace"
          fill="var(--foreground)"
          textAnchor="middle"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0;1;1;0"
            dur="6s"
            keyTimes="0;0.5;0.6;0.9;1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="x"
            values="450;450;195;195"
            dur="6s"
            keyTimes="0;0.55;0.95;1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            values="184;184;184;184"
            dur="6s"
            repeatCount="indefinite"
          />
          <tspan x="0" dy="0">
            200 OK · text/html
          </tspan>
        </text>

        <text
          x="80"
          y="220"
          textAnchor="middle"
          fontSize="10"
          fill="var(--muted-foreground)"
          fontFamily="ui-monospace,monospace"
        >
          ↑ headers + body
        </text>
        <text
          x="520"
          y="220"
          textAnchor="middle"
          fontSize="10"
          fill="var(--muted-foreground)"
          fontFamily="ui-monospace,monospace"
        >
          chunked stream →
        </text>

        <text
          x="300"
          y="40"
          textAnchor="middle"
          fontSize="11"
          fill="var(--muted-foreground)"
          fontFamily="ui-monospace,monospace"
        >
          Request goes out → response streams back, byte by byte
        </text>
      </svg>
    </div>
  );
}
