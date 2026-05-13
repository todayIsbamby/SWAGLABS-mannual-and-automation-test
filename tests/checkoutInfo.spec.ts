import { test }             from '../fixtures/state/state-login.fixture.js';
import { CheckoutInfoPage } from '../pages/checkoutInfoPage.js';
import {
  validUser,
  emptyUser,
  firstNameOnly,
  lastNameOnly,
  zipCodeOnly,
  missingFirstName,
  missingLastName,
  missingZipCode,
  errorMessages,
} from '../fixtures/data/data.yourInfo.fixture.js';

// ─────────────────────────────────────────────────────────────────────────────
// Base Precondition (runs before every test):
//   1. Restore login session via state-login.json (skip UI login)
//   2. Add first item to cart
//   3. Click Cart icon → Click Checkout
//   → Lands on Checkout: Your Information page
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Checkout: Your Information Page', () => {
  let checkoutInfoPage: CheckoutInfoPage;

  test.use({ storageState: 'fixtures/state/state-login.json' });

  test.beforeEach(async ({ page }) => {
    checkoutInfoPage = new CheckoutInfoPage(page);

    // 1. Go to inventory (session restored via storageState)
    await page.goto('https://www.saucedemo.com/inventory.html');

    // 2. Add first item to cart
    await page.locator('.inventory_item').first().locator('button').click();

    // 3. Click Cart icon
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 4. Click Checkout
    await page.locator('[data-test="checkout"]').click();

    // Verify on Your Information page
    await checkoutInfoPage.expectToBeOnPage();
  });

  // ── Functionality ───────────────────────────────────────────────────────────

  test('TC-COYF-001: Valid data in all fields should navigate to Overview page', async () => {
    await checkoutInfoPage.fillForm(validUser.firstName, validUser.lastName, validUser.zipCode);
    await checkoutInfoPage.clickContinue();

    await checkoutInfoPage.expectNavigatedToOverviewPage();
  });

  test('TC-COYF-002: Blank information should show First Name required error', async () => {
    await checkoutInfoPage.fillForm(emptyUser.firstName, emptyUser.lastName, emptyUser.zipCode);
    await checkoutInfoPage.clickContinue();

    await checkoutInfoPage.expectErrorMessage(errorMessages.firstNameRequired);
  });

  test('TC-COYF-003: Only first name filled should show Last Name required error', async () => {
    await checkoutInfoPage.fillForm(firstNameOnly.firstName, firstNameOnly.lastName, firstNameOnly.zipCode);
    await checkoutInfoPage.clickContinue();

    await checkoutInfoPage.expectErrorMessage(errorMessages.lastNameRequired);
  });

  test('TC-COYF-004: Only last name filled should show First Name required error', async () => {
    await checkoutInfoPage.fillForm(lastNameOnly.firstName, lastNameOnly.lastName, lastNameOnly.zipCode);
    await checkoutInfoPage.clickContinue();

    await checkoutInfoPage.expectErrorMessage(errorMessages.firstNameRequired);
  });

  test('TC-COYF-005: Only zip code filled should show First Name required error', async () => {
    await checkoutInfoPage.fillForm(zipCodeOnly.firstName, zipCodeOnly.lastName, zipCodeOnly.zipCode);
    await checkoutInfoPage.clickContinue();

    await checkoutInfoPage.expectErrorMessage(errorMessages.firstNameRequired);
  });

  test('TC-COYF-006: Missing first name should show First Name required error', async () => {
    await checkoutInfoPage.fillForm(missingFirstName.firstName, missingFirstName.lastName, missingFirstName.zipCode);
    await checkoutInfoPage.clickContinue();

    await checkoutInfoPage.expectErrorMessage(errorMessages.firstNameRequired);
  });

  test('TC-COYF-007: Missing last name should show Last Name required error', async () => {
    await checkoutInfoPage.fillForm(missingLastName.firstName, missingLastName.lastName, missingLastName.zipCode);
    await checkoutInfoPage.clickContinue();

    await checkoutInfoPage.expectErrorMessage(errorMessages.lastNameRequired);
  });

  test('TC-COYF-008: Missing zip code should show Postal Code required error', async () => {
    await checkoutInfoPage.fillForm(missingZipCode.firstName, missingZipCode.lastName, missingZipCode.zipCode);
    await checkoutInfoPage.clickContinue();

    await checkoutInfoPage.expectErrorMessage(errorMessages.zipCodeRequired);
  });

  test('TC-COYF-009: Continue button should be enabled and navigate to Overview page', async () => {
    await checkoutInfoPage.expectContinueButtonEnabled();

    await checkoutInfoPage.fillForm(validUser.firstName, validUser.lastName, validUser.zipCode);
    await checkoutInfoPage.clickContinue();

    await checkoutInfoPage.expectNavigatedToOverviewPage();
  });

  test('TC-COYF-010: Cancel button should be enabled and navigate to cart page', async () => {
    await checkoutInfoPage.expectCancelButtonEnabled();

    await checkoutInfoPage.clickCancel();

    await checkoutInfoPage.expectNavigatedTocartPage();
  });
});