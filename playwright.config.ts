import path from 'path';

// Project-local browsers avoid broken or partial caches (e.g. mixed-arch sandboxes).
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(__dirname, '.pw-browsers');

// Load Playwright after env is set so browser discovery uses this path.
const { defineConfig, devices } = require('@playwright/test') as typeof import('@playwright/test');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  reporter: [['html'], ['list']],
  use: {
    baseURL: 'https://animated-gingersnap-8cf7f2.netlify.app/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
