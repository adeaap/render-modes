import { test, expect } from "../fixtures/base";

test.use({ contextOptions: { reducedMotion: "reduce" } });

test("reduced motion shrinks animation durations to ~0ms", async ({ page }) => {
  await page.goto("/lifecycle/address");
  // Pick any element under the lifecycle SVG container, ensure animation-duration is collapsed.
  const durations = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll("svg *"));
    return els
      .map((el) => getComputedStyle(el).animationDuration)
      .filter((d) => d && d !== "0s");
  });
  // If any animations exist, all must be reduced to <=1ms (the global
  // prefers-reduced-motion rule sets 0.001ms, which Chrome may serialize as
  // "1e-06s", "0.001ms", "0.0001s", or "0s").
  for (const d of durations) {
    const seconds = d.endsWith("ms") ? parseFloat(d) / 1000 : parseFloat(d);
    expect(
      seconds,
      `${d} should collapse under reduced-motion`,
    ).toBeLessThanOrEqual(0.001);
  }
});

test("reduced motion: autoplay timer still advances (JS, not CSS)", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/lifecycle/address");
  await page.clock.runFor(0);
  await page.getByRole("button", { name: /Play through/i }).click();
  await page.clock.fastForward(7000);
  await expect(page).toHaveURL("/lifecycle/connection");
});
