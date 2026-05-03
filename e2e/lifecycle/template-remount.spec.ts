import { test, expect } from "../fixtures/base";

test("autoplay state resets when navigating to a new phase", async ({
  page,
}) => {
  await page.goto("/lifecycle/address");
  await page.getByRole("button", { name: /Play through/i }).click();
  await expect(
    page.getByRole("button", { name: /Pause auto-play/i }),
  ).toBeVisible();

  await page
    .getByRole("navigation", { name: /Lifecycle phases/ })
    .locator('a[href="/lifecycle/dom"]')
    .click();

  await expect(page).toHaveURL("/lifecycle/dom");
  // After remount, the play button should be back to its idle label.
  await expect(
    page.getByRole("button", { name: /Play through/i }),
  ).toBeVisible();
});

test("phase remounts on slug change (h1 reflects new phase)", async ({
  page,
}) => {
  await page.goto("/lifecycle/dom");
  await expect(
    page.getByRole("heading", { level: 1, name: "DOM construction" }),
  ).toBeVisible();

  await page
    .getByRole("navigation", { name: /Lifecycle phases/ })
    .locator('a[href="/lifecycle/paint"]')
    .click();

  await expect(
    page.getByRole("heading", { level: 1, name: "Painting" }),
  ).toBeVisible();
});
