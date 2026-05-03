import { test, expect } from "../fixtures/base";
import { PHASE_SLUGS } from "../fixtures/routes";

const TITLES: Record<(typeof PHASE_SLUGS)[number], string> = {
  address: "URL bar to IP address",
  connection: "TCP and TLS handshakes",
  http: "HTTP request and response",
  "html-parsing": "HTML parsing",
  "css-parsing": "CSS parsing & CSSOM",
  javascript: "JavaScript loading & execution",
  dom: "DOM construction",
  "render-tree": "Render tree",
  layout: "Layout",
  paint: "Painting",
  composite: "Compositing",
  hydration: "Hydration & interactivity",
};

for (const slug of PHASE_SLUGS) {
  test(`deep-link to /lifecycle/${slug} renders title and Phase X of 12`, async ({
    page,
  }) => {
    const number = PHASE_SLUGS.indexOf(slug) + 1;
    await page.goto(`/lifecycle/${slug}`);
    await expect(
      page.getByRole("heading", { level: 1, name: TITLES[slug] }),
    ).toBeVisible();
    await expect(page.getByText(`Phase ${number} of 12`)).toBeVisible();
  });
}

test("phase 1 has invisible prev placeholder", async ({ page }) => {
  await page.goto("/lifecycle/address");
  const placeholder = page.locator("span.invisible", {
    hasText: "placeholder",
  });
  await expect(placeholder).toHaveCount(1);
});

test("phase 12 has no next link and disabled autoplay", async ({ page }) => {
  await page.goto("/lifecycle/hydration");
  const placeholder = page.locator("span.invisible", {
    hasText: "placeholder",
  });
  await expect(placeholder).toHaveCount(1);
  const playButton = page.getByRole("button", { name: /Play through/i });
  await expect(playButton).toBeDisabled();
});

test("middle phase has both prev and next links wired correctly", async ({
  page,
}) => {
  await page.goto("/lifecycle/dom");
  await expect(
    page.getByRole("link", { name: /Phase 6.*JS/i }),
  ).toHaveAttribute("href", "/lifecycle/javascript");
  await expect(
    page.getByRole("link", { name: /Phase 8.*Render tree/i }),
  ).toHaveAttribute("href", "/lifecycle/render-tree");
});
