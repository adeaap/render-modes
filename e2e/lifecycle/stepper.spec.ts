import { test, expect } from "../fixtures/base";
import { PHASE_SLUGS } from "../fixtures/routes";

test("stepper renders 12 tabs with the correct active phase highlighted", async ({
  page,
}) => {
  await page.goto("/lifecycle/dom");
  const stepperNav = page.getByRole("navigation", { name: /Lifecycle phases/ });
  const links = stepperNav.locator("a");
  await expect(links).toHaveCount(PHASE_SLUGS.length);

  const active = stepperNav.locator('a[aria-current="step"]');
  await expect(active).toHaveCount(1);
  await expect(active).toHaveAttribute("href", "/lifecycle/dom");
});

test("clicking a stepper tab navigates to that phase", async ({ page }) => {
  await page.goto("/lifecycle/address");
  const stepperNav = page.getByRole("navigation", { name: /Lifecycle phases/ });
  await stepperNav.locator('a[href="/lifecycle/paint"]').click();
  await expect(page).toHaveURL("/lifecycle/paint");
  await expect(
    stepperNav.locator('a[aria-current="step"][href="/lifecycle/paint"]'),
  ).toBeVisible();
});

test("stepper updates the active state without a full reload", async ({
  page,
}) => {
  await page.goto("/lifecycle/address");
  const stepperNav = page.getByRole("navigation", { name: /Lifecycle phases/ });

  // Tag a window property; if SPA navigation works it survives the next click,
  // a full reload would wipe it.
  await page.evaluate(() => {
    (window as unknown as { __preserved?: boolean }).__preserved = true;
  });
  await stepperNav.locator('a[href="/lifecycle/dom"]').click();
  await expect(page).toHaveURL("/lifecycle/dom");
  const preserved = await page.evaluate(
    () => (window as unknown as { __preserved?: boolean }).__preserved === true,
  );
  expect(preserved).toBe(true);
});
