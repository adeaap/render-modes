import type { Page, Route } from "@playwright/test";

type MockApiNowOptions = {
  delay?: number;
  status?: number;
  body?: unknown;
  abort?: boolean;
};

export async function mockApiNow(
  page: Page,
  opts: MockApiNowOptions = {},
): Promise<void> {
  await page.route("**/api/now", async (route: Route) => {
    if (opts.abort) {
      await route.abort();
      return;
    }
    if (opts.delay) {
      await new Promise((r) => setTimeout(r, opts.delay));
    }
    const ts = Date.now();
    const body = opts.body ?? { ts, iso: new Date(ts).toISOString() };
    await route.fulfill({
      status: opts.status ?? 200,
      contentType: "application/json",
      headers: { "cache-control": "no-store" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    });
  });
}
