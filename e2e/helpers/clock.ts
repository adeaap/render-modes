import type { Page } from "@playwright/test";

export const AUTOPLAY_INTERVAL_MS = 7000;

export async function installFakeClock(page: Page): Promise<void> {
  await page.clock.install();
}

export async function advanceAutoplay(page: Page, ms = AUTOPLAY_INTERVAL_MS) {
  await page.clock.fastForward(ms);
}
