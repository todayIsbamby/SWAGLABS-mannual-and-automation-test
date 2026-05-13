import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './basePage.js';

export class CheckoutCompletePage extends BasePage {
  // ── Locators ───────────────────────────────────────────────────────────────
  private readonly logo:            Locator;
  private readonly pageTitle:       Locator;
  private readonly completeIcon:    Locator;
  private readonly completeHeader:  Locator;
  private readonly completeText:    Locator;
  private readonly backHomeButton:  Locator;
  private readonly cartIcon:        Locator;

  constructor(page: Page) {
    super(page);

    this.logo           = page.locator('.app_logo');
    this.pageTitle      = page.locator('[data-test="title"]');
    this.completeIcon   = page.locator('[data-test="pony-express"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText   = page.locator('[data-test="complete-text"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.cartIcon       = page.locator('[data-test="shopping-cart-link"]');
  }

  // ── Assertions ─────────────────────────────────────────────────────────────

  async expectToBeOnPage() {
    await expect(this.page).toHaveURL(/checkout-complete/);
  }

  async expectLogoVisible() {
    await expect(this.logo).toBeVisible();
  }

  async expectPageTitleVisible() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText('Checkout: Complete!');
  }

  async expectCompleteIconVisible() {
    await expect(this.completeIcon).toBeVisible();
  }

  async expectCompleteHeader(text: string) {
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeHeader).toHaveText(text);
  }

  async expectCompleteText(text: string) {
    await expect(this.completeText).toBeVisible();
    await expect(this.completeText).toHaveText(text);
  }

  async expectBackHomeButtonVisible() {
    await expect(this.backHomeButton).toBeVisible();
  }

  // ── Actions ────────────────────────────────────────────────────────────────

  async clickBackHome() {
    await this.backHomeButton.click();
  }

  async clickCartIcon() {
    await this.cartIcon.click();
  }

  // ── Navigation Assertions ──────────────────────────────────────────────────

  async expectNavigatedToInventoryPage() {
    await expect(this.page).toHaveURL(/inventory/);
  }

  async expectNavigatedToCartPage() {
    await expect(this.page).toHaveURL(/cart/);
  }
}