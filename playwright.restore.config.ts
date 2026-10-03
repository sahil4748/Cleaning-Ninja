import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "restore-homepage.spec.ts",
  timeout: 60000,
  reporter: [["list"]],
  use: { baseURL: "http://127.0.0.1:8145" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npx next start -p 8145 -H 127.0.0.1",
    url: "http://127.0.0.1:8145",
    reuseExistingServer: false,
    timeout: 120000,
  },
});
