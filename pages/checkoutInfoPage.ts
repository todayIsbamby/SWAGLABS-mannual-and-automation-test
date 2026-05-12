import { type Page, type Locator, expect } from '@playwright/test';

export class CheckoutInfoPage {
  readonly page: Page;

  // Form fields
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;

  // Buttons
  readonly continueButton: Locator;
  readonly cancelButton: Locator;

  // Error message
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput  = page.locator('[data-test="lastName"]');
    this.zipCodeInput   = page.locator('[data-test="postalCode"]');

    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton   = page.locator('[data-test="cancel"]');

    this.errorMessage   = page.locator('[data-test="error"]');
  }

  // ── Actions ────────────────────────────────────────────────────────────────

  async fillForm(firstName: string, lastName: string, zipCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  // ── Assertions ─────────────────────────────────────────────────────────────

  async expectToBeOnPage() {
    await expect(this.page).toHaveURL(/checkout-step-one/);
  }

  async expectNavigatedToOverviewPage() {
    await expect(this.page).toHaveURL(/checkout-step-two/);
  }

  async expectNavigatedToInventoryPage() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
  }

  async expectErrorMessage(text: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(text);
  }

  async expectContinueButtonEnabled() {
    await expect(this.continueButton).toBeEnabled();
  }

  async expectCancelButtonEnabled() {
    await expect(this.cancelButton).toBeEnabled();
  }
}