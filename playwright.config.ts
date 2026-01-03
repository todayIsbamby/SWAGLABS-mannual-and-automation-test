import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 1,
  reporter: [['html', { open: 'never' }]],

  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: false,              
    trace: 'on',                  
    screenshot: 'only-on-failure', 
    video: 'retain-on-failure',    
  },

 projects: [
  // 🔹 1) Setup project (login once)
  {
    name: 'setup',
    testMatch: /auth\.setup\.ts/,
  },

  // 🔹 2) Real test project (depends on setup)
  {
    name: 'chromium',
    dependencies: ['setup'],
    use: {
      ...devices['Desktop Chrome'],
      storageState: 'fixtures/state/state-login.json',
    },
  },
],

});
