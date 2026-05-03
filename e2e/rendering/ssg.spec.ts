import { test, expect } from "../fixtures/base";
import {
  ISO_REGEX,
  assertAllEqual,
  readTimestamp,
  timestampPanel,
} from "../helpers/timestamps";

test("SSG @prod: built timestamp is frozen across 5 reloads @prod", async ({
  page,
}) => {
  await page.goto("/rendering/ssg");
  const built = timestampPanel(page, /Built at/i);
  await expect(built.locator("p.font-mono")).toContainText(ISO_REGEX);

  const samples: string[] = [];
  for (let i = 0; i < 5; i++) {
    if (i > 0) await page.reload();
    samples.push(await readTimestamp(built));
  }
  assertAllEqual(samples);
});

test("SSG @prod: rendered HTML contains the prerendered timestamp @prod", async ({
  page,
}) => {
  await page.goto("/rendering/ssg");
  const built = timestampPanel(page, /Built at/i);
  const value = await readTimestamp(built);

  // Re-fetch the raw HTML and confirm the same ISO string is baked into the
  // prerendered document, not painted in by client JS.
  const res = await page.request.get("/rendering/ssg");
  expect(res.status()).toBe(200);
  const html = await res.text();
  expect(html).toContain(value);
});

test("SSG: page renders the SSG mode badge and explanatory caption", async ({
  page,
}) => {
  await page.goto("/rendering/ssg");
  await expect(
    page.getByRole("heading", { level: 1, name: /Static Site Generation/i }),
  ).toBeVisible();
  await expect(
    page.getByText(/this value never changes between deploys/i),
  ).toBeVisible();
});
