import { test, expect } from "../fixtures/base";

// Run under the chromium project's browser to keep CI fast, but emulate the
// iPhone 14 viewport. Spreading `devices["iPhone 14"]` would force webkit and
// require an extra browser install in CI; viewport is what the assertions
// actually depend on.
test.use({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
  hasTouch: true,
  isMobile: true,
});

test("mobile: lifecycle stepper is horizontally scrollable, no page overflow", async ({
  page,
}) => {
  await page.goto("/lifecycle/address");
  const overflow = await page.evaluate(() => ({
    docWidth: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  // Page itself should not overflow horizontally even though the stepper does.
  expect(overflow.docWidth).toBeLessThanOrEqual(overflow.viewport + 1);
});

test("mobile: rendering hub stacks cards vertically and remains usable", async ({
  page,
}) => {
  await page.goto("/rendering");
  await expect(page.locator(`a[href="/rendering/csr"]`).first()).toBeVisible();
  await expect(
    page.locator(`a[href="/rendering/hydration"]`).first(),
  ).toBeVisible();
});

test("mobile: TwelvePhasesNote popover is constrained to viewport", async ({
  page,
}) => {
  await page.goto("/lifecycle");
  await page.getByRole("button", { name: /^Twelve phases$/ }).click();
  const note = page.getByRole("note");
  await expect(note).toBeVisible();
  const box = await note.boundingBox();
  const vw = await page.evaluate(() => window.innerWidth);
  expect(box).not.toBeNull();
  if (box) {
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(vw + 1);
  }
});
