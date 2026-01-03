import { test } from '@playwright/test';

test('authenticate', async ({ page }) => {
  await page.goto('/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await page.context().storageState({
    path: 'fixtures/state/state-login.json',
  });
});