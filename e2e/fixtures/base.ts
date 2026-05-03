import { test as base, expect, type ConsoleMessage } from "@playwright/test";

type Fixtures = {
  consoleErrors: string[];
};

export const test = base.extend<Fixtures>({
  consoleErrors: async ({ page }, use) => {
    const errors: string[] = [];
    const onConsole = (msg: ConsoleMessage) => {
      if (msg.type() === "error") errors.push(msg.text());
    };
    const onPageError = (err: Error) => {
      errors.push(err.message);
    };
    page.on("console", onConsole);
    page.on("pageerror", onPageError);
    await use(errors);
    page.off("console", onConsole);
    page.off("pageerror", onPageError);
  },
});

export { expect };
