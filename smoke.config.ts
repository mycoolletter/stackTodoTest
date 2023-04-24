import { PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig = {
  timeout: 60000,
  retries: 0,
  
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    video: "off",
    screenshot: "only-on-failure",
    
  },
  projects: [
    { name: "Chromium", use: { browserName: "chromium" } }
  ],
  reporter: "html"
};
export default config;