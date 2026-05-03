import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "../fixtures/base";
import { ROUTES } from "../fixtures/routes";

const DISABLED_RULES = [
  // Color contrast can trip on Tailwind defaults; triage separately.
  "color-contrast",
];

for (const route of ROUTES) {
  test(`axe scan: ${route.path}`, async ({ page }) => {
    await page.goto(route.path);
    await page.waitForLoadState("networkidle").catch(() => {});

    const results = await new AxeBuilder({ page })
      .disableRules(DISABLED_RULES)
      .analyze();

    expect(
      results.violations,
      results.violations
        .map((v) => `${v.id}: ${v.description} (${v.nodes.length} nodes)`)
        .join("\n"),
    ).toEqual([]);
  });
}
