import { defineConfig, devices } from "@playwright/test";

const DEV_PORT = 3000;
const PROD_PORT = 3100;

const isCI = !!process.env.CI;
const profile = process.env.E2E_PROFILE; // 'dev' | 'prod' | undefined (both)

const DEV_SERVER = {
  command: "npm run dev",
  url: `http://localhost:${DEV_PORT}`,
  reuseExistingServer: !isCI,
  timeout: 120_000,
} as const;

const PROD_SERVER = {
  command: `npm run build && npx next start -p ${PROD_PORT}`,
  url: `http://localhost:${PROD_PORT}`,
  reuseExistingServer: !isCI,
  timeout: 300_000,
} as const;

const webServer = (() => {
  if (profile === "dev") return [DEV_SERVER];
  if (profile === "prod") return [PROD_SERVER];
  return [DEV_SERVER, PROD_SERVER];
})();

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? [["github"], ["html", { open: "never" }]] : "html",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "dev",
      grepInvert: /@prod/,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: `http://localhost:${DEV_PORT}`,
      },
    },
    {
      name: "prod",
      grep: /@prod/,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: `http://localhost:${PROD_PORT}`,
      },
    },
  ],
  webServer,
});
