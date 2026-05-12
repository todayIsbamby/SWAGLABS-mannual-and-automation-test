import { test, expect } from '@playwright/test';
import { CheckoutInfoPage } from '../pages/checkoutInfoPage.js';
import {
  credentials,
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

test.describe('Checkout: Your Information Page', () => {
  let checkoutInfoPage: CheckoutInfoPage;

  test.beforeEach(async ({ page }) => {
    checkoutInfoPage = new CheckoutInfoPage(page);

    // 1. Login
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill(credentials.username);
    await page.locator('[data-test="password"]').fill(credentials.password);
    await page.locator('[data-test="login-button"]').click();

    // 2. Add first item to cart
    await page.locator('.inventory_item').first().locator('button').click();

    // 3. Go to cart → Checkout
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    await checkoutInfoPage.expectToBeOnPage();
  });

 
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

  test('TC-COYF-010: Cancel button should be enabled and navigate to inventory page', async () => {
    await checkoutInfoPage.expectCancelButtonEnabled();

    await checkoutInfoPage.clickCancel();

    await checkoutInfoPage.expectNavigatedToInventoryPage();
  });
});