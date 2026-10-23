import { defineConfig, devices } from '@playwright/test';
import baseEnvironmentUrl from './utils/baseUrl'

export default defineConfig({
  testDir: './tests',
  testIgnore: '**/loginAuth.spec.ts',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: Boolean(process.env.CI),
   /* Retry on CI only */
  retries: 2,
   /* Opt out of parallel tests on CI. */
  workers: 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'always' }],['list']],
  use: {
    trace: 'on-first-retry',
    screenshot: 'on',
    headless: true,
    video: 'retain-on-first-failure',
    launchOptions: {
    slowMo: 500, // milliseconds between browser actions
    },
    //baseURL: 'https://playwright.dev',
  },
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  projects: [
    {
      name: 'Chrome',
      use: { 
        baseURL: baseEnvironmentUrl.demo.home,
        ...devices['Desktop Chrome'], 
        //channel: 'chrome',
        //viewport: {width: 1920, height: 900},
      },
        
    },
    {
      name: 'Firefox',
      use: { 
        baseURL: baseEnvironmentUrl.demo.home,
        ...devices['Desktop Firefox'], 
        //channel: 'firefox',
        //viewport: {width: 1920, height: 900},
      },
        
    },
  ],
});
