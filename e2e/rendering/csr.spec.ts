import { test, expect } from "../fixtures/base";
import { mockApiNow } from "../fixtures/network";
import {
  ISO_REGEX,
  assertAllDifferent,
  assertAllEqual,
  readTimestamp,
  timestampPanel,
} from "../helpers/timestamps";

test("CSR client island fetches /api/now from the browser", async ({
  page,
}) => {
  const requestPromise = page.waitForRequest("**/api/now");
  await page.goto("/rendering/csr");
  const req = await requestPromise;
  expect(req.url()).toMatch(/\/api\/now$/);
});

test("CSR Loading state appears, then resolves to a timestamp", async ({
  page,
}) => {
  await mockApiNow(page, { delay: 500 });
  await page.goto("/rendering/csr");
  const fetched = timestampPanel(page, /Fetched in browser/i);
  await expect(fetched).toContainText("Loading…");
  await expect(fetched.locator("p.font-mono")).toContainText(ISO_REGEX, {
    timeout: 5000,
  });
});

test("CSR error state is displayed when /api/now fails", async ({ page }) => {
  await mockApiNow(page, { abort: true });
  await page.goto("/rendering/csr");
  const fetched = timestampPanel(page, /Fetched in browser/i);
  await expect(fetched.locator("p.font-mono")).toContainText("(error)");
});

test("CSR @prod: server shell timestamp is frozen across reloads @prod", async ({
  page,
}) => {
  await page.goto("/rendering/csr");
  const shell = timestampPanel(page, /Server shell built at/i);
  const first = await readTimestamp(shell);

  const samples = [first];
  for (let i = 0; i < 2; i++) {
    await page.reload();
    samples.push(await readTimestamp(shell));
  }
  assertAllEqual(samples);
});

test("CSR @prod: client-fetched timestamp changes on each reload @prod", async ({
  page,
}) => {
  await page.goto("/rendering/csr");
  const fetched = timestampPanel(page, /Fetched in browser/i);
  await expect(fetched.locator("p.font-mono")).toContainText(ISO_REGEX);
  const samples = [await readTimestamp(fetched)];

  for (let i = 0; i < 2; i++) {
    await page.waitForTimeout(50); // force a unique millisecond
    await page.reload();
    await expect(fetched.locator("p.font-mono")).toContainText(ISO_REGEX);
    samples.push(await readTimestamp(fetched));
  }

  assertAllDifferent(samples);
});
