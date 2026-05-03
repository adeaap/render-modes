import { test, expect } from "../fixtures/base";

test("RSC server table values are baked into HTML at request time", async ({
  page,
}) => {
  const res = await page.request.get("/rendering/rsc");
  expect(res.status()).toBe(200);
  const html = await res.text();
  expect(html).toContain("users");
  expect(html).toContain("12,482");
  expect(html).toContain("sessions");
  expect(html).toContain("3,117");
  expect(html).toContain("errors");
});

test("RSC counter increments, decrements, and resets", async ({ page }) => {
  await page.goto("/rendering/rsc");
  await expect(page.getByText(/● Interactive/)).toBeVisible();

  const value = page.locator("span.font-mono.text-3xl").first();
  await expect(value).toHaveText("0");

  const plus = page.getByRole("button", { name: "+1" });
  for (let i = 0; i < 3; i++) await plus.click();
  await expect(value).toHaveText("3");

  await page.getByRole("button", { name: "reset" }).click();
  await expect(value).toHaveText("0");

  await page.getByRole("button", { name: "−1" }).click();
  await expect(value).toHaveText("-1");
});

test("RSC counter resets to 0 after a reload (no persisted state)", async ({
  page,
}) => {
  await page.goto("/rendering/rsc");
  await expect(page.getByText(/● Interactive/)).toBeVisible();
  await page.getByRole("button", { name: "+1" }).click();
  await page.getByRole("button", { name: "+1" }).click();
  await expect(page.locator("span.font-mono.text-3xl").first()).toHaveText("2");

  await page.reload();
  await expect(page.locator("span.font-mono.text-3xl").first()).toHaveText("0");
});

test("RSC ServerClientSplit shows both Server and Client labels", async ({
  page,
}) => {
  await page.goto("/rendering/rsc");
  await expect(
    page.getByText(/Rendered on server · no JS shipped/i),
  ).toBeVisible();
  await expect(
    page.getByText(/Hydrated in the browser · JS in the bundle/i),
  ).toBeVisible();
});
