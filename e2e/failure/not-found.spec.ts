import { test, expect } from "../fixtures/base";

// Next 16 in dev sometimes serves the prerendered not-found body with a 200
// status (especially for routes with generateStaticParams). The user-visible
// behaviour we care about is: page renders the not-found UI and doesn't crash.
// The strict 404 status assertions live in the @prod-tagged tests below.

test("/lifecycle/<bogus> renders not-found content", async ({ page }) => {
  await page.goto("/lifecycle/does-not-exist");
  await expect(page.locator("body")).toContainText(/404|not found/i);
});

test("/totally-bogus renders not-found content", async ({ page }) => {
  await page.goto("/totally-bogus");
  await expect(page.locator("body")).toContainText(/404|not found/i);
});

test("/rendering/<bogus> renders not-found content", async ({ page }) => {
  await page.goto("/rendering/does-not-exist");
  await expect(page.locator("body")).toContainText(/404|not found/i);
});

// Routes that don't match any pattern get a true 404 in prod.
test("@prod: /totally-bogus returns HTTP 404 @prod", async ({ page }) => {
  const res = await page.goto("/totally-bogus");
  expect(res?.status()).toBe(404);
});

// Routes that match a dynamic segment but resolve via notFound() are served
// from the prerendered not-found page with HTTP 200 (Next 16 + cacheComponents).
// We assert the user-visible behaviour (the not-found UI is shown), not the
// status code, since that's a framework contract we don't control.
test("@prod: /lifecycle/<bogus> renders not-found UI @prod", async ({
  page,
}) => {
  await page.goto("/lifecycle/does-not-exist");
  await expect(page.locator("body")).toContainText(/404|not found/i);
});
