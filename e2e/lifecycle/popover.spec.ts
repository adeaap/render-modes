import { test, expect } from "../fixtures/base";

test("Twelve phases popover opens and closes via outside click", async ({
  page,
}) => {
  await page.goto("/lifecycle");
  const trigger = page.getByRole("button", { name: /^Twelve phases$/ });
  await expect(trigger).toHaveAttribute("aria-expanded", "false");

  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  const note = page.getByRole("note");
  await expect(note).toBeVisible();
  await expect(note).toContainText(/Critical Rendering Path/i);

  // Click well outside the popover.
  await page.locator("h1").click();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(note).toBeHidden();
});

test("Twelve phases popover closes on Escape", async ({ page }) => {
  await page.goto("/lifecycle");
  const trigger = page.getByRole("button", { name: /^Twelve phases$/ });
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");

  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("MDN link inside popover opens in a new tab", async ({ page }) => {
  await page.goto("/lifecycle");
  await page.getByRole("button", { name: /^Twelve phases$/ }).click();
  const link = page.getByRole("link", { name: /Critical Rendering Path/i });
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", /noopener/);
  await expect(link).toHaveAttribute("href", /developer\.mozilla\.org/);
});
