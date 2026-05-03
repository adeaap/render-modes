import { expect, type Locator, type Page } from "@playwright/test";

export const ISO_REGEX = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

export function timestampPanel(page: Page, label: string | RegExp): Locator {
  const labelLocator = page.getByText(label, { exact: false });
  return labelLocator
    .locator(
      'xpath=ancestor::div[contains(@class, "rounded-xl") and contains(@class, "border")][1]',
    )
    .first();
}

export async function readTimestamp(panel: Locator): Promise<string> {
  const value = panel.locator("p.font-mono").first();
  await expect(value).toBeVisible();
  return (await value.textContent())?.trim() ?? "";
}

export function assertAllEqual(values: string[]): void {
  const first = values[0];
  for (const v of values) {
    if (v !== first) {
      throw new Error(
        `Expected all values to equal "${first}". Got: ${JSON.stringify(values)}`,
      );
    }
  }
}

export function assertAllDifferent(values: string[]): void {
  const set = new Set(values);
  if (set.size !== values.length) {
    throw new Error(
      `Expected all values to differ. Got: ${JSON.stringify(values)}`,
    );
  }
}
