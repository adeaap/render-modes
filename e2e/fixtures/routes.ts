export const PHASE_SLUGS = [
  "address",
  "connection",
  "http",
  "html-parsing",
  "css-parsing",
  "javascript",
  "dom",
  "render-tree",
  "layout",
  "paint",
  "composite",
  "hydration",
] as const;

export type PhaseSlug = (typeof PHASE_SLUGS)[number];

export const RENDERING_DEMOS = [
  "csr",
  "ssr",
  "ssg",
  "isr",
  "rsc",
  "hydration",
] as const;

export type RoutesEntry = {
  path: string;
  label: string;
  group: "home" | "lifecycle" | "rendering";
};

export const ROUTES: RoutesEntry[] = [
  { path: "/", label: "Home", group: "home" },
  { path: "/lifecycle", label: "Lifecycle index", group: "lifecycle" },
  ...PHASE_SLUGS.map(
    (slug): RoutesEntry => ({
      path: `/lifecycle/${slug}`,
      label: `Lifecycle phase: ${slug}`,
      group: "lifecycle",
    }),
  ),
  { path: "/rendering", label: "Rendering hub", group: "rendering" },
  ...RENDERING_DEMOS.map(
    (slug): RoutesEntry => ({
      path: `/rendering/${slug}`,
      label: `Rendering demo: ${slug}`,
      group: "rendering",
    }),
  ),
];
