import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  timeout: 60 * 1000,
  /* Fail the build on CI if test.only is left in the source code */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 5 : 2,
  reporter: [
    ["html"],
    ["list"],
    /* Read by Jenkins' junit step for the test results page */
    ["junit", { outputFile: "reports/junit.xml" }],
  ],
  use: {
    /* Headed locally so you can watch, headless on CI */
    headless: process.env.CI ? true : false,
    trace: "off",
    video: "off",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    // { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    // { name: "webkit", use: { ...devices["Desktop Safari"] } },
    // { name: "mobile-chrome", use: { ...devices["iPhone 11"] } },
  ],
});
