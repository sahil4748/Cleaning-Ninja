import { defineConfig, devices } from "@playwright/test";
import base from "../../../playwright.config";

/** Production-build QA. An external server must be explicitly started by this task. */
export default defineConfig({
  ...base,
  testDir: "../../../tests",
  testMatch: "carpet-service.spec.ts",
  workers: 3,
  retries: 0,
  outputDir: "../../../.local-evidence/carpet-service/test-results",
  reporter: [
    ["list"],
    ["json", { outputFile: "../../../.local-evidence/carpet-service/results.json" }],
  ],
  use: { ...base.use, screenshot: "only-on-failure", trace: "retain-on-failure" },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: process.env.CARPET_QA_EXTERNAL_SERVER === "1" ? undefined : base.webServer,
});
