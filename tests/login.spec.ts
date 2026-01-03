import { test, expect } from '@playwright/test';
import { LoginPage } from 'C://Users/nsach/swaglabs-automation/pages/loginPage.js';
import { loginData } from 'C://Users/nsach/swaglabs-automation/fixtures/data/data.user.fixture.js';


/*********************************
 * Login Page – UI Verification  *
 *********************************/

test.describe('Login Page UI', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC-LUI-001 App logo verification', async ({ page }) => {
    await expect(page.locator('.login_logo')).toBeVisible();
  });

  test('TC-LUI-002 Username input field verification', async ({ page }) => {
    await expect(page.locator('#user-name')).toBeVisible();
  });

  test('TC-LUI-003 Password input field verification', async ({ page }) => {
    await expect(page.locator('#password')).toBeVisible();
  });

  test('TC-LUI-004 Login button verification', async ({ page }) => {
    await expect(page.locator('#login-button')).toBeVisible();
  });
});

/*********************************
 * Login Page – Functional Tests *
 *********************************/

test.describe('Login Functionality', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC-LGF-003 Login with correct credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('standard_user', loginData.validPassword);

    await expect(page).toHaveURL(/inventory.html/);
  });

  test('TC-LGF-004 Login with correct username and invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('standard_user', loginData.invalidPassword);

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('TC-LGF-005 Login with invalid username and correct password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('user001', loginData.validPassword);

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('TC-LGF-006 Login with blank password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('standard_user', '');

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('TC-LGF-007 Login with blank username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('', loginData.validPassword);

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('TC-LGF-008 Login with invalid credentials ', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(loginData.invalidUser, loginData.invalidPassword);

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('TC-LGF-009 Login with blank username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toBeVisible();
  });

  /******************************************************
   * TC-LGF-010 Login successfully with all valid users *
   ******************************************************/
  for (const user of loginData.validUsers) {
    test(`TC-LGF-010 Login success - ${user}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.login(user, loginData.validPassword);

      await expect(page).toHaveURL(/inventory.html/);
    });
  }
});
