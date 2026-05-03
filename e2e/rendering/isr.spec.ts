import { test, expect } from "../fixtures/base";
import {
  ISO_REGEX,
  assertAllEqual,
  readTimestamp,
  timestampPanel,
} from "../helpers/timestamps";

test.describe.configure({ mode: "serial" });

test("ISR @prod: timestamp is stable within revalidation window @prod", async ({
  page,
}) => {
  await page.goto("/rendering/isr");
  const panel = timestampPanel(page, /Last regenerated at/i);
  await expect(panel.locator("p.font-mono")).toContainText(ISO_REGEX);

  const samples: string[] = [];
  for (let i = 0; i < 3; i++) {
    if (i > 0) await page.reload();
    samples.push(await readTimestamp(panel));
  }
  assertAllEqual(samples);
});

test("ISR @prod: timestamp updates after >10s window @prod", async ({
  page,
}) => {
  test.slow();

  await page.goto("/rendering/isr");
  const panel = timestampPanel(page, /Last regenerated at/i);
  const initial = await readTimestamp(panel);

  // Wait past the revalidation window.
  await page.waitForTimeout(11_000);

  // First reload after the window: returns stale value AND triggers
  // background regeneration (stale-while-revalidate).
  await page.reload();
  await page.waitForLoadState("networkidle").catch(() => {});

  // Second reload: should now return the freshly regenerated value.
  await page.reload();
  await expect(panel.locator("p.font-mono")).toContainText(ISO_REGEX);
  const updated = await readTimestamp(panel);

  expect(updated).not.toBe(initial);
});
