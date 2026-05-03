import { test, expect } from "../fixtures/base";

test("Hydration page: reload mid-stream recovers without errors", async ({
  page,
  consoleErrors,
}) => {
  await page.goto("/rendering/hydration", { waitUntil: "commit" });
  // Issue a reload before the SlowChunk has had time to flush.
  const navigation = page.reload({ waitUntil: "load" });
  await navigation;
  await expect(
    page.getByText(/rendered after a 1\.5s pause on the server/i),
  ).toBeVisible({ timeout: 8000 });
  expect(consoleErrors).toEqual([]);
});

test("SSR page: reload during stream still resolves both timestamps", async ({
  page,
  consoleErrors,
}) => {
  await page.goto("/rendering/ssr", { waitUntil: "commit" });
  await page.reload({ waitUntil: "load" });
  await expect(
    page.getByText(/Generated on the server at/i).first(),
  ).toBeVisible();
  await expect(page.getByText(/Per-request random token/i)).toBeVisible();
  expect(consoleErrors).toEqual([]);
});

test("Stepper rapid 4-click navigates to the last clicked phase", async ({
  page,
}) => {
  await page.goto("/lifecycle/address");
  const stepperNav = page.getByRole("navigation", { name: /Lifecycle phases/ });
  await stepperNav.locator('a[href="/lifecycle/connection"]').click();
  await stepperNav.locator('a[href="/lifecycle/http"]').click();
  await stepperNav.locator('a[href="/lifecycle/dom"]').click();
  await stepperNav.locator('a[href="/lifecycle/paint"]').click();
  await expect(page).toHaveURL("/lifecycle/paint");
  await expect(
    stepperNav.locator('a[aria-current="step"][href="/lifecycle/paint"]'),
  ).toBeVisible();
});
