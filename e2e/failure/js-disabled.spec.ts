import { test, expect } from "../fixtures/base";

test.use({ javaScriptEnabled: false });

test("RSC: server table renders without JS; counter shows pre-hydrated state", async ({
  page,
}) => {
  await page.goto("/rendering/rsc");

  // Server table is plain HTML — the metric values must be present.
  await expect(page.locator("td", { hasText: "users" })).toBeVisible();
  await expect(page.locator("td", { hasText: "12,482" })).toBeVisible();
  await expect(page.locator("td", { hasText: "errors" })).toBeVisible();

  // Counter buttons exist as DOM, but the hydration indicator stays in the
  // server-fallback state.
  await expect(page.getByRole("button", { name: "+1" })).toBeVisible();
  await expect(page.getByText(/○ Awaiting JS…/)).toBeVisible();
});

test("Hydration demo: StaticButton renders, HydrationDemo stuck in Awaiting JS", async ({
  page,
}) => {
  await page.goto("/rendering/hydration");
  await expect(
    page.getByRole("button", { name: /Looks like a button, does nothing/i }),
  ).toBeVisible();
  await expect(page.getByText("Awaiting JS", { exact: true })).toBeVisible();
});

test("Home page renders without JS (server-rendered)", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /How a web page actually shows up/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Start the lifecycle/i }),
  ).toBeVisible();
});

test("Rendering hub renders without JS (server-rendered)", async ({ page }) => {
  await page.goto("/rendering");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Six ways Next\.js renders a page/i,
    }),
  ).toBeVisible();
});
