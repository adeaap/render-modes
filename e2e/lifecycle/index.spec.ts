import { test, expect } from "../fixtures/base";
import { PHASE_SLUGS } from "../fixtures/routes";

test("lifecycle index lists 12 phase cards linking to each phase", async ({
  page,
}) => {
  await page.goto("/lifecycle");
  // The page has two <ol>s: the Stepper and the phase-card grid. Scope to the
  // article body to avoid the Stepper.
  const grid = page.locator("article > ol > li");
  await expect(grid).toHaveCount(PHASE_SLUGS.length);

  for (const slug of PHASE_SLUGS) {
    const card = grid.locator(`a[href="/lifecycle/${slug}"]`);
    await expect(card.first()).toBeVisible();
  }
});

test("lifecycle index has a Start with phase 1 CTA", async ({ page }) => {
  await page.goto("/lifecycle");
  const cta = page.getByRole("link", { name: /Start with phase 1/i });
  await expect(cta).toHaveAttribute("href", "/lifecycle/address");
});

test("lifecycle layout shows breadcrumb back to home", async ({ page }) => {
  await page.goto("/lifecycle/dom");
  const crumb = page.getByRole("link", {
    name: /Module 1.*Browser rendering lifecycle/i,
  });
  await expect(crumb).toHaveAttribute("href", "/");
});
