import { test, expect } from "../fixtures/base";

test("Hydration: StaticButton renders with Always inert label", async ({
  page,
}) => {
  await page.goto("/rendering/hydration");
  await expect(page.getByText(/Always inert/i)).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Looks like a button, does nothing/i }),
  ).toBeVisible();
});

test("Hydration: HydrationDemo button increments after hydration", async ({
  page,
}) => {
  await page.goto("/rendering/hydration");
  const button = page.getByRole("button", {
    name: /Click me, clicked .* times/,
  });
  await expect(page.getByText(/^Hydrated$/)).toBeVisible();
  await expect(button).toContainText("clicked 0 times");
  await button.click();
  await button.click();
  await button.click();
  await expect(button).toContainText("clicked 3 times");
});

test("Hydration: SlowChunk Suspense fallback streams first, then real content", async ({
  page,
}) => {
  await page.goto("/rendering/hydration", { waitUntil: "commit" });

  const fallback = page.getByText(
    /Streaming a slow chunk… \(this fallback is in the initial HTML\)/i,
  );
  await expect(fallback).toBeVisible();

  await expect(
    page.getByText(/rendered after a 1\.5s pause on the server/i),
  ).toBeVisible({ timeout: 8000 });
  await expect(fallback).toBeHidden();
});

test("Hydration: timeline section explains the t=0..t≈2 sequence", async ({
  page,
}) => {
  await page.goto("/rendering/hydration");
  for (const marker of ["t=0", "t≈1", "t≈2", "t≈2+"]) {
    await expect(page.getByText(marker, { exact: true })).toBeVisible();
  }
});
