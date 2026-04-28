import React from "react";

export type PhaseId =
  | "address"
  | "connection"
  | "http"
  | "html-parsing"
  | "css-parsing"
  | "javascript"
  | "dom"
  | "render-tree"
  | "layout"
  | "paint"
  | "composite"
  | "hydration";

export type Phase = {
  id: PhaseId;
  number: number;
  title: string;
  shortTitle: string;
  summary: React.ReactNode;
  description: React.ReactNode[];
  takeaway: string;
};

export const PHASES: Phase[] = [
  {
    id: "address",
    number: 1,
    title: "URL bar to IP address",
    shortTitle: "Address",
    summary: (
      <>
        When you visit a website like this one, before rendering anything, the
        browser must determine the actual location of{" "}
        <code className="rounded bg-muted/60 px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
          rendermodes.com
        </code>{" "}
        on the internet.
      </>
    ),
    description: [
      <p key="intro" className="text-base leading-relaxed text-foreground/90">
        You type{" "}
        <code className="rounded bg-muted/60 px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
          https://rendermodes.com
        </code>{" "}
        and hit Enter. The browser splits that into three pieces: the protocol{" "}
        <code className="rounded bg-muted/60 px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
          https
        </code>
        , the host{" "}
        <code className="rounded bg-muted/60 px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
          rendermodes.com
        </code>{" "}
        and the path{" "}
        <code className="rounded bg-muted/60 px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
          /
        </code>
        . But computers don&apos;t route by names, they route by numbers, so the
        browser still needs an IP address before it can talk to anything.
      </p>,
      <p key="lead" className="text-base leading-relaxed text-foreground/90">
        First it checks its own cache. If the name isn&apos;t there, it asks a
        DNS resolver, which works through a chain of servers, each one pointing
        closer to the answer:
      </p>,
      <ol
        key="chain"
        className="space-y-3 rounded-lg border border-border bg-card/40 p-4 text-sm"
      >
        {[
          {
            tag: "Root servers",
            mono: ".",
            body: "“I don't know rendermodes.com, but the .com servers will. Here's where to find them.”",
          },
          {
            tag: "TLD servers",
            mono: ".com",
            body: "“I don't have the IP either, but I know which server is in charge of rendermodes.com. Ask them.”",
          },
          {
            tag: "Authoritative server",
            mono: "rendermodes.com",
            body: "“That's me. The IP is 192.0.2.42.”",
          },
        ].map((step, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent/15 font-mono text-xs font-medium text-accent">
              {i + 1}
            </span>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="font-medium text-foreground">{step.tag}</span>
                <code className="rounded bg-muted/60 px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                  {step.mono}
                </code>
              </div>
              <p className="text-foreground/80">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>,
      <p key="cache" className="text-base leading-relaxed text-foreground/90">
        The browser caches that final IP, so the next time you visit, this whole
        chain is skipped.
      </p>,
      <figure
        key="devtools"
        className="my-2 overflow-hidden rounded-lg border border-border"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/dns-lookup.png"
          alt="Chrome DevTools Network tab Timing panel showing the DNS Lookup, Initial connection and SSL phases for a request to www.rendermodes.com"
          className="block w-full"
        />
        <figcaption className="border-t border-border bg-card/40 px-3 py-2 text-xs text-foreground/70">
          You can see this for real in Chrome DevTools → Network → any request →
          Timing. The first colored bar, &quot;DNS Lookup&quot;, is exactly this
          phase.
        </figcaption>
      </figure>,
    ],
    takeaway:
      "Before any data can move, the human-readable name has to be turned into an IP address. That translation step is DNS.",
  },
  {
    id: "connection",
    number: 2,
    title: "TCP and TLS handshakes",
    shortTitle: "Connect",
    summary:
      "The browser opens a reliable, encrypted channel before it dares to send the request.",
    description: [
      'First, TCP. The browser and server do a quick three-step intro: the browser says "hi" (SYN), the server says "hi back" (SYN-ACK), the browser says "got it" (ACK). Once that\'s done, both sides know the line is open and can start passing messages reliably.',
      "Then, because the URL starts with https://, they do a second handshake for TLS, the encryption layer. They agree on which version of TLS to use, the server proves who it is with a certificate, and together they generate a shared secret key. From that point on, everything they send is scrambled so no one in between can read it. Modern TLS does this in a single round-trip (and zero round-trips if you've connected before), and the same connection then gets reused for every file on the page.",
    ],
    takeaway:
      "Setting up a connection is mostly time spent waiting for messages to bounce back and forth. That's why latency (how long a round-trip takes) usually matters more than bandwidth for how fast a page feels.",
  },
  {
    id: "http",
    number: 3,
    title: "HTTP request and response",
    shortTitle: "HTTP",
    summary:
      "The browser asks for the page. The server replies with a stream of bytes.",
    description: [
      "The browser sends a GET request: the HTTP method, the path, headers (cookies, accept-language, user-agent…), and waits. The server processes the request, looking up data, rendering HTML, and starts streaming a response: a status line, response headers, then the body.",
      "Modern servers don't wait to send everything at once. With HTTP/2 the response can be chunked and multiplexed alongside other resources on the same TCP connection. HTTP/3 goes further: it runs over QUIC (on UDP), where streams are independently tracked, so a lost packet only stalls the stream it carried instead of every concurrent resource on the connection. Either way, the browser can start parsing the first bytes while the rest are still in flight.",
    ],
    takeaway:
      "Bytes start arriving as soon as the server flushes them. The browser doesn't wait for the whole document, it begins parsing the moment the first chunk shows up.",
  },
  {
    id: "html-parsing",
    number: 4,
    title: "HTML parsing",
    shortTitle: "HTML",
    summary: "Bytes become tokens. Tokens become nodes. Nodes become a tree.",
    description: [
      "The HTML parser chews through the byte stream and emits tokens for tags, attributes and text. The parser is forgiving by design, broken markup gets quietly patched rather than rejected, so almost any input still produces a tree. Each token becomes a node, and nodes are stitched into the DOM in the order the parser meets them.",
      'Parsing is interleaved with resource discovery. When the parser encounters <link rel="stylesheet"> or <script>, it kicks off downloads in parallel, but a synchronous <script> blocks parsing until it executes, because the script can mutate the DOM as it runs (for example, with document.write).',
    ],
    takeaway:
      "Parsing is incremental. The DOM grows in chunks as bytes arrive, and any blocking script puts a pause on the whole construction process.",
  },
  {
    id: "css-parsing",
    number: 5,
    title: "CSS parsing & CSSOM",
    shortTitle: "CSS",
    summary: "Stylesheets become a structured model the renderer can query.",
    description: [
      "CSS bytes are parsed into a CSSOM (CSS Object Model), a structured representation of every stylesheet, rule, selector, and declaration that scripts and the rendering engine can both query. Unlike HTML parsing, CSS is render-blocking: the browser will keep parsing HTML, but it refuses to paint anything until it has all the matching stylesheets, because applying styles partially would cause a flash of unstyled content.",
      "Selectors are matched right-to-left during style computation. Once the CSSOM is built, every DOM node gets its computed style, the cascade resolved, inherited values filled in, units normalised.",
    ],
    takeaway:
      "Until the CSSOM is built, the browser knows the structure of the page but not what it should look like. CSS is a render-blocking resource for that reason.",
  },
  {
    id: "javascript",
    number: 6,
    title: "JavaScript loading & execution",
    shortTitle: "JS",
    summary:
      "Scripts download, parse, compile, and run. The cost is everywhere.",
    description: [
      "Each <script> the parser encounters needs a download (unless inline), a parse, a compile, and finally execution. By default scripts block parsing; defer keeps order but waits until parsing is done; async runs as soon as it lands. Choosing the right attribute is one of the most impactful perf decisions in HTML.",
      "Once executing, the script can read and mutate the DOM, register event listeners, kick off more network requests, and trigger style recalculations. JavaScript is the only resource that can read and mutate everything in a page, which is also why it's the easiest to misuse.",
    ],
    takeaway:
      "JavaScript is unique: it runs on the user's CPU and can change everything. The bigger the bundle, the longer the user waits for interactivity.",
  },
  {
    id: "dom",
    number: 7,
    title: "DOM construction",
    shortTitle: "DOM",
    summary:
      "The HTML parser's output: a tree of nodes that scripts and styles both target.",
    description: [
      "The DOM is the live, in-memory representation of the document. Every element, every attribute, every text node has a corresponding object. The browser's layout, paint, accessibility tree, devtools inspector, scripts and styles all read from this same tree.",
      "DOM construction can be expensive when it grows large, tens of thousands of nodes start to noticeably slow style recalculation and layout. Frameworks like React abstract over it, but the underlying tree is still what the browser cares about.",
    ],
    takeaway:
      "The DOM is the canonical model of the page. Everything else, render tree, accessibility tree, scripts, derives from it.",
  },
  {
    id: "render-tree",
    number: 8,
    title: "Render tree",
    shortTitle: "Render tree",
    summary: "DOM ∩ CSSOM. Only nodes that will actually paint make it in.",
    description: [
      "The render tree (you'll also hear it called the layout tree or box tree) is what you get when the browser walks the DOM, asks the CSSOM what styles apply to each node, and keeps only the ones that will actually show up on screen. The output is a tree of boxes ready for the next phases.",
      <React.Fragment key="render-tree-p2">
        Nodes with{" "}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">
          display: none
        </code>{" "}
        aren&apos;t in the render tree. Pseudo-elements like{" "}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">
          ::before
        </code>{" "}
        are. Text inside an element becomes anonymous text boxes inside the
        parent&apos;s box. The tree&apos;s shape determines the work that
        follows.
      </React.Fragment>,
    ],
    takeaway:
      "Hidden things take no rendering work; visible things are now in a tree shaped for layout and paint.",
  },
  {
    id: "layout",
    number: 9,
    title: "Layout",
    shortTitle: "Layout",
    summary:
      "Every box gets a size and a position. Most rendering bugs live here.",
    description: [
      "Layout, sometimes called reflow, works out the dimensions and screen position of every box: where it sits inside its containing block, how wide and tall it ends up, and how it shoves its siblings around. Constraints flow downward from parents first, then resolved sizes ripple back up as a child's content forces its parent to grow.",
      "Triggering a layout invalidates a chunk of the render tree. This is why setting properties that don't affect geometry (like opacity or transform) is much cheaper than setting width or top, the latter forces the browser to re-measure.",
    ],
    takeaway:
      "Layout is the box-by-box answer to where everything goes. It's also one of the most expensive things the browser does.",
  },
  {
    id: "paint",
    number: 10,
    title: "Painting",
    shortTitle: "Paint",
    summary:
      "The boxes get filled in with pixels: text, colors, borders, shadows.",
    description: [
      "Painting walks the render tree and emits drawing commands, fill this rectangle, stroke this border, render this text run, draw this shadow. The output is a list of paint records the GPU (or CPU rasteriser) can execute.",
      "Painting is split into layers. Some elements get their own layer because they're transformed, opacity-animated, or marked with will-change. Painting one layer doesn't necessarily repaint others, which is why GPU-accelerated animations stay smooth.",
    ],
    takeaway:
      "Paint is where pixels get colours. Layered painting is what lets the browser update only the parts of the screen that changed.",
  },
  {
    id: "composite",
    number: 11,
    title: "Compositing",
    shortTitle: "Composite",
    summary:
      "The compositor stacks all the painted layers into the final image.",
    description: [
      "Once each layer is painted, the compositor takes over. It transforms layers (translate, scale, rotate), blends them with their opacity and blend modes, and asks the GPU to draw the final composited frame to the screen.",
      "Compositing is GPU-accelerated and runs in a separate pipeline from the main thread (in Chromium, on a dedicated compositor thread). That's why a smooth CSS transform animation can keep running at 60fps even when the main thread is busy parsing JSON.",
    ],
    takeaway:
      "Compositing is layered, GPU-friendly, and runs off the main thread. Animating compositor-only properties is the cheap way to stay buttery.",
  },
  {
    id: "hydration",
    number: 12,
    title: "Hydration & interactivity",
    shortTitle: "Hydration",
    summary: "The page is visible, but lifeless, until JavaScript wakes it up.",
    description: [
      "For a server-rendered React page, the user sees fully styled HTML before any JavaScript has run. That HTML is inert: clicking a button does nothing, dropdowns don't open. The page is a poster.",
      "Hydration is the handover. React (or any framework with the same model) walks the DOM the server already produced, lines it up against the component tree it would have rendered itself, and wires the event handlers into place. Once that pass finishes, the buttons respond, and the page is finally an actual application.",
    ],
    takeaway:
      "Hydration is the bridge between rendered HTML and a working application. The smaller the bundle, the sooner the bridge closes.",
  },
];

export function getPhase(id: string): Phase | undefined {
  return PHASES.find((p) => p.id === id);
}

export function getPhaseNeighbours(id: string): {
  prev: Phase | null;
  next: Phase | null;
} {
  const idx = PHASES.findIndex((p) => p.id === id);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? PHASES[idx - 1] : null,
    next: idx < PHASES.length - 1 ? PHASES[idx + 1] : null,
  };
}
