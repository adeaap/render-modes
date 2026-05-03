import { test, expect } from "../fixtures/base";

test("autoplay advances to next phase after 7s", async ({ page }) => {
  await page.clock.install();
  await page.goto("/lifecycle/address");
  await page.clock.runFor(0);

  const playButton = page.getByRole("button", { name: /Play through/i });
  await playButton.click();

  await expect(
    page.getByRole("button", { name: /Pause auto-play/i }),
  ).toBeVisible();
  await expect(page.getByText(/Auto-advancing to Connect in/i)).toBeVisible();

  await page.clock.fastForward(7000);

  await expect(page).toHaveURL("/lifecycle/connection");
});

test("autoplay button toggle pauses without navigating", async ({ page }) => {
  await page.clock.install();
  await page.goto("/lifecycle/address");
  await page.clock.runFor(0);

  const play = page.getByRole("button", { name: /Play through/i });
  await play.click();
  const pause = page.getByRole("button", { name: /Pause auto-play/i });
  await expect(pause).toBeVisible();
  await pause.click();

  await expect(
    page.getByRole("button", { name: /Play through/i }),
  ).toBeVisible();

  // After 8s of fake time, we should still be on the same phase.
  await page.clock.fastForward(8000);
  await expect(page).toHaveURL("/lifecycle/address");
});

test("phase 12 autoplay button is disabled and cannot be activated", async ({
  page,
}) => {
  await page.goto("/lifecycle/hydration");
  const button = page.getByRole("button", { name: /Play through/i });
  await expect(button).toBeDisabled();
});

test("clicking stepper during autoplay overrides the timer", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/lifecycle/address");
  await page.clock.runFor(0);

  await page.getByRole("button", { name: /Play through/i }).click();
  // Jump straight to phase 9, bypassing the would-be auto-advance to phase 2.
  await page
    .getByRole("navigation", { name: /Lifecycle phases/ })
    .locator('a[href="/lifecycle/layout"]')
    .click();
  await expect(page).toHaveURL("/lifecycle/layout");

  // Run 8s of time. We should NOT auto-advance off layout because the timer
  // was bound to the now-unmounted phase 1 PhaseShell.
  await page.clock.fastForward(8000);
  await expect(page).toHaveURL("/lifecycle/layout");
});
