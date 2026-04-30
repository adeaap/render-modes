export function DomAnim() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <svg
        viewBox="0 0 600 320"
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
          live, in-memory tree of nodes
        </text>

        <Tree x={300} y={50} label="document" delay="0s" />
        <Branch x1={300} y1={62} x2={300} y2={92} delay="0.4s" />
        <Tree x={300} y={100} label="<html>" delay="0.5s" />
        <Branch x1={300} y1={112} x2={180} y2={142} delay="1s" />
        <Branch x1={300} y1={112} x2={420} y2={142} delay="1s" />
        <Tree x={180} y={150} label="<head>" delay="1.2s" />
        <Tree x={420} y={150} label="<body>" delay="1.2s" />
        <Branch x1={180} y1={162} x2={180} y2={192} delay="1.6s" />
        <Branch x1={420} y1={162} x2={340} y2={192} delay="1.6s" />
        <Branch x1={420} y1={162} x2={500} y2={192} delay="1.6s" />
        <Tree x={180} y={200} label="<title>" delay="1.8s" />
        <Tree x={340} y={200} label="<nav>" delay="1.8s" />
        <Tree x={500} y={200} label="<main>" delay="1.8s" />
        <Branch x1={500} y1={212} x2={460} y2={242} delay="2.2s" />
        <Branch x1={500} y1={212} x2={540} y2={242} delay="2.2s" />
        <Tree x={460} y={250} label="<h1>" delay="2.4s" />
        <Tree x={540} y={250} label="<p>" delay="2.4s" />
        <Branch x1={460} y1={262} x2={460} y2={290} delay="2.7s" />
        <Branch x1={540} y1={262} x2={540} y2={290} delay="2.7s" />
        <TextLeaf x={460} y={300} label='"Hello"' delay="2.9s" />
        <TextLeaf x={540} y={300} label='"…"' delay="2.9s" />
      </svg>
    </div>
  );
}

function Tree({
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
  const w = label.length * 6 + 16;
  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - 8}
        width={w}
        height="20"
        rx="4"
        fill="var(--card)"
        stroke="var(--accent)"
        strokeWidth="1"
        opacity="0"
      >
        <animate
          attributeName="opacity"
          values="0;1;1"
          keyTimes="0;0.1;1"
          dur="5s"
          begin={delay}
          fill="freeze"
        />
      </rect>
      <text
        x={x}
        y={y + 6}
        textAnchor="middle"
        fontSize="10"
        fontFamily="ui-monospace,monospace"
        fill="var(--foreground)"
        opacity="0"
      >
        <animate
          attributeName="opacity"
          values="0;1;1"
          keyTimes="0;0.1;1"
          dur="5s"
          begin={delay}
          fill="freeze"
        />
        {label}
      </text>
    </g>
  );
}

function Branch({
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
        values="0;0.5;0.5"
        keyTimes="0;0.1;1"
        dur="5s"
        begin={delay}
        fill="freeze"
      />
    </line>
  );
}

function TextLeaf({
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
      fontStyle="italic"
      fill="var(--muted-foreground)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1;1"
        keyTimes="0;0.1;1"
        dur="5s"
        begin={delay}
        fill="freeze"
      />
      {label}
    </text>
  );
}
