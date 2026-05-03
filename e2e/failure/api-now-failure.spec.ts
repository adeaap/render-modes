import { test, expect } from "../fixtures/base";
import { mockApiNow } from "../fixtures/network";
import { timestampPanel } from "../helpers/timestamps";

test("CSR with /api/now slow (3s delay) shows Loading, then resolves", async ({
  page,
}) => {
  await mockApiNow(page, { delay: 3000 });
  await page.goto("/rendering/csr");
  const fetched = timestampPanel(page, /Fetched in browser/i);
  await expect(fetched).toContainText("Loading…");
  await expect(fetched.locator("p.font-mono")).not.toContainText("Loading…", {
    timeout: 8000,
  });
});

test("CSR with /api/now 500 shows error state", async ({ page }) => {
  await mockApiNow(page, { status: 500, body: { error: "boom" } });
  // The CsrIsland's then() block calls .json() and then setState, so a 500
  // with a JSON body still resolves "ready" with the parsed body. To force
  // the error path, abort the request entirely.
  await mockApiNow(page, { abort: true });
  await page.goto("/rendering/csr");
  const fetched = timestampPanel(page, /Fetched in browser/i);
  await expect(fetched.locator("p.font-mono")).toContainText("(error)");
});

test("/api/now response carries cache-control: no-store", async ({
  page,
  request,
}) => {
  void page;
  const res = await request.get("/api/now");
  expect(res.status()).toBe(200);
  expect(res.headers()["cache-control"]).toBe("no-store");
  const body = await res.json();
  expect(typeof body.ts).toBe("number");
  expect(typeof body.iso).toBe("string");
});
