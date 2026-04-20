import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'https://restful-booker.herokuapp.com',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  },
  reporter: [['list'], ['html']], // Keeps terminal output AND generates a web report
  retries: process.env.CI ? 2 : 0, // Retries twice on CI, zero times locally, handles flaky network issues
  fullyParallel: true //All tests run simultaneously instead of one by one
});