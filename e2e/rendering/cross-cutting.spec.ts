import { test, expect } from "../fixtures/base";

test("Rendering hub lists 6 mode cards linking to each demo", async ({
  page,
}) => {
  await page.goto("/rendering");
  for (const slug of ["csr", "ssr", "ssg", "isr", "rsc", "hydration"]) {
    const card = page.locator(`a[href="/rendering/${slug}"]`).first();
    await expect(card).toBeVisible();
  }
});

test("Rendering layout has 6-tab demo nav", async ({ page }) => {
  await page.goto("/rendering/csr");
  for (const slug of ["csr", "ssr", "ssg", "isr", "rsc", "hydration"]) {
    await expect(
      page.locator(`nav a[href="/rendering/${slug}"]`).first(),
    ).toBeVisible();
  }
});

test("DevModeBanner is visible on CSR/SSG/ISR in dev", async ({ page }) => {
  for (const path of ["/rendering/csr", "/rendering/ssg", "/rendering/isr"]) {
    await page.goto(path);
    await expect(page.getByText(/Heads up, you're in dev mode/i)).toBeVisible();
  }
});

test("DevModeBanner is NOT shown on SSR/RSC/Hydration in dev", async ({
  page,
}) => {
  for (const path of [
    "/rendering/ssr",
    "/rendering/rsc",
    "/rendering/hydration",
  ]) {
    await page.goto(path);
    await expect(page.getByText(/Heads up, you're in dev mode/i)).toHaveCount(
      0,
    );
  }
});

test("@prod: DevModeBanner is NOT shown on any rendering demo @prod", async ({
  page,
}) => {
  for (const path of [
    "/rendering/csr",
    "/rendering/ssr",
    "/rendering/ssg",
    "/rendering/isr",
    "/rendering/rsc",
    "/rendering/hydration",
  ]) {
    await page.goto(path);
    await expect(page.getByText(/Heads up, you're in dev mode/i)).toHaveCount(
      0,
    );
  }
});

test("Mode badges show the expected label per demo", async ({ page }) => {
  const checks: Array<{ path: string; badge: string }> = [
    { path: "/rendering/csr", badge: "CSR" },
    { path: "/rendering/ssr", badge: "SSR" },
    { path: "/rendering/ssg", badge: "SSG" },
    { path: "/rendering/isr", badge: "ISR" },
  ];
  for (const { path, badge } of checks) {
    await page.goto(path);
    await expect(
      page.locator("span", { hasText: badge }).first(),
    ).toBeVisible();
  }
});
