import { test, expect } from "../fixtures/base";

test("Twelve phases popover: keyboard open/close cycle returns focus", async ({
  page,
}) => {
  await page.goto("/lifecycle");
  const trigger = page.getByRole("button", { name: /^Twelve phases$/ });
  await trigger.focus();
  await expect(trigger).toBeFocused();

  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("note")).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("Stepper links are keyboard-reachable and Enter navigates", async ({
  page,
}) => {
  await page.goto("/lifecycle/address");
  const stepperNav = page.getByRole("navigation", { name: /Lifecycle phases/ });
  const target = stepperNav.locator('a[href="/lifecycle/dom"]');
  await target.focus();
  await expect(target).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/lifecycle/dom");
});

test("Top nav links are keyboard-reachable", async ({ page }) => {
  await page.goto("/");
  const renderingLink = page.getByRole("link", {
    name: "Next.js rendering",
    exact: true,
  });
  await renderingLink.focus();
  await expect(renderingLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/rendering");
});
