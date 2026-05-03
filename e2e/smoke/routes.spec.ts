import { test, expect } from "../fixtures/base";
import { ROUTES } from "../fixtures/routes";

for (const route of ROUTES) {
  test(`${route.path} returns 200`, async ({ page }) => {
    const res = await page.goto(route.path);
    expect(res?.status()).toBe(200);
  });

  test(`${route.path} renders without console errors`, async ({
    page,
    consoleErrors,
  }) => {
    await page.goto(route.path);
    await page.waitForLoadState("networkidle").catch(() => {});
    expect(consoleErrors, consoleErrors.join("\n")).toEqual([]);
  });
}

test("Footer is rendered on every top-level route", async ({ page }) => {
  for (const path of ["/", "/lifecycle", "/rendering"]) {
    await page.goto(path);
    await expect(page.getByRole("contentinfo")).toContainText(
      "Render Modes, an interactive guide",
    );
  }
});
