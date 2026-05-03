import { test, expect } from "../fixtures/base";

test.use({ colorScheme: "dark" });

test("dark color scheme applies the dark token to the body background", async ({
  page,
}) => {
  await page.goto("/");
  const bg = await page.evaluate(
    () => getComputedStyle(document.body).backgroundColor,
  );

  // Light token: #fafafa → rgb(250, 250, 250). Dark: #09090b → rgb(9, 9, 11).
  // Just assert it's notably darker than the light token.
  const match = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  expect(match).not.toBeNull();
  const [r, g, b] = (match ?? [, "0", "0", "0"]).slice(1).map(Number);
  expect(r + g + b).toBeLessThan(120);
});

test("dark mode renders the lifecycle index without errors", async ({
  page,
  consoleErrors,
}) => {
  await page.goto("/lifecycle");
  await page.waitForLoadState("networkidle").catch(() => {});
  expect(consoleErrors).toEqual([]);
});
