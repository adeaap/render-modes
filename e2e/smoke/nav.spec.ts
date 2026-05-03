import { test, expect } from "../fixtures/base";

const HOME_LABEL = "Home";
const LIFECYCLE_LABEL = "Browser lifecycle";
const RENDERING_LABEL = "Next.js rendering";

test("nav active state on Home", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: HOME_LABEL, exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await expect(
    page.getByRole("link", { name: LIFECYCLE_LABEL, exact: true }),
  ).not.toHaveAttribute("aria-current", "page");
  await expect(
    page.getByRole("link", { name: RENDERING_LABEL, exact: true }),
  ).not.toHaveAttribute("aria-current", "page");
});

test("nav active state on Lifecycle", async ({ page }) => {
  await page.goto("/lifecycle");
  await expect(
    page.getByRole("link", { name: LIFECYCLE_LABEL, exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await expect(
    page.getByRole("link", { name: HOME_LABEL, exact: true }),
  ).not.toHaveAttribute("aria-current", "page");
});

test("nav active state on a deep lifecycle route", async ({ page }) => {
  await page.goto("/lifecycle/dom");
  await expect(
    page.getByRole("link", { name: LIFECYCLE_LABEL, exact: true }),
  ).toHaveAttribute("aria-current", "page");
});

test("nav active state on Rendering hub", async ({ page }) => {
  await page.goto("/rendering");
  await expect(
    page.getByRole("link", { name: RENDERING_LABEL, exact: true }),
  ).toHaveAttribute("aria-current", "page");
});

test("nav active state on a rendering demo", async ({ page }) => {
  await page.goto("/rendering/ssr");
  await expect(
    page.getByRole("link", { name: RENDERING_LABEL, exact: true }),
  ).toHaveAttribute("aria-current", "page");
});

test("home page hero CTAs link to both modules", async ({ page }) => {
  await page.goto("/");
  const lifecycleCta = page.getByRole("link", {
    name: /Start the lifecycle/i,
  });
  const renderingCta = page.getByRole("link", {
    name: /Compare rendering modes/i,
  });
  await expect(lifecycleCta).toHaveAttribute("href", "/lifecycle");
  await expect(renderingCta).toHaveAttribute("href", "/rendering");
});

test("Render Modes wordmark links to home", async ({ page }) => {
  await page.goto("/lifecycle");
  await page
    .getByRole("link", { name: /Render Modes/i })
    .first()
    .click();
  await expect(page).toHaveURL("/");
});
