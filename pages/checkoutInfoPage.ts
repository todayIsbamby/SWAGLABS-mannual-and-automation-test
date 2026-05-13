import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './basePage.js';

export class CheckoutInfoPage extends BasePage {
  // ── Locators ───────────────────────────────────────────────────────────────

  // Form fields
  private readonly firstNameInput: Locator;
  private readonly lastNameInput:  Locator;
  private readonly zipCodeInput:   Locator;

  // Buttons
  private readonly continueButton: Locator;
  private readonly cancelButton:   Locator;

  // Error
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

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

  async expectNavigatedTocartPage() {
    await expect(this.page).toHaveURL(/cart/);
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