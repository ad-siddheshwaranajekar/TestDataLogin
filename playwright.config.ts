import * as dotenv from "dotenv";
dotenv.config(); // ✅ load .env at Playwright start

import { defineConfig, devices } from "@playwright/test";
import { OrtoniReportConfig } from "ortoni-report";
import * as os from "os";

const reportConfig: OrtoniReportConfig = {
  open: process.env.CI ? "never" : "always",
  folderPath: "my-report",
  filename: "Ally_Portal.html",
  title: "Ally Portal UI Test Report",
  showProject: false,
  projectName: "Ally Portal",
  testType: "E2E-Functional",
  authorName: os.userInfo().username,
  base64Image: false,
  headerText: "Ally Portal UI Automation Report",
  logo: "./assets/AllyLogoDark.svg",
  stdIO: false,
  meta: {
    "Test Cycle": "AN_ALMGMT_V13",
    "Executed On": new Date().toLocaleString(),
    version: "1",
    release: "V13",
    platform: os.type(),
  },
} as any;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  outputDir: "test-results",
  reporter: [["html"]],
  use: {
    trace: "on-first-retry",
    viewport: null,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "Ally_chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: null,
        deviceScaleFactor: undefined,
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },
  ],
});
