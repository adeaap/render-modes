import { test, expect } from "../fixtures/base";
import {
  ISO_REGEX,
  assertAllDifferent,
  readTimestamp,
  timestampPanel,
} from "../helpers/timestamps";

test("SSR: both timestamp panels change on every reload", async ({ page }) => {
  await page.goto("/rendering/ssr");
  const generatedAt = timestampPanel(page, /Generated on the server at/i);
  const token = timestampPanel(page, /Per-request random token/i);
  await expect(generatedAt.locator("p.font-mono")).toContainText(ISO_REGEX);

  const generatedSamples: string[] = [];
  const tokenSamples: string[] = [];

  for (let i = 0; i < 3; i++) {
    if (i > 0) await page.reload();
    await expect(generatedAt.locator("p.font-mono")).toContainText(ISO_REGEX);
    generatedSamples.push(await readTimestamp(generatedAt));
    tokenSamples.push(await readTimestamp(token));
  }

  assertAllDifferent(generatedSamples);
  assertAllDifferent(tokenSamples);
});

test("SSR: does NOT request /api/now (timestamps are server-rendered)", async ({
  page,
}) => {
  let apiCalled = false;
  page.on("request", (r) => {
    if (r.url().includes("/api/now")) apiCalled = true;
  });
  await page.goto("/rendering/ssr");
  await page.waitForLoadState("networkidle").catch(() => {});
  expect(apiCalled).toBe(false);
});

test("SSR: page caption explicitly tells user the value differs per request", async ({
  page,
}) => {
  await page.goto("/rendering/ssr");
  await expect(
    page.getByText(/this value will be different every time/i),
  ).toBeVisible();
});
