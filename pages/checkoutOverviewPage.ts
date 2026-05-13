// pages/checkoutOverviewPage.ts
import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './basePage.js';
import { Header } from '../components/header.js';

export class CheckoutOverviewPage extends BasePage {
  static readonly URL = '/checkout-step-two.html';

  // ── Components ─────────────────────────────────────────────────────────────
  readonly header: Header;

  // ── Column labels ──────────────────────────────────────────────────────────
  private readonly qtyLabel:         Locator;
  private readonly descriptionLabel: Locator;

  // ── Cart items ─────────────────────────────────────────────────────────────
  private readonly cartItems: Locator;

  // ── Summary section ────────────────────────────────────────────────────────
  private readonly paymentLabel:   Locator;
  private readonly paymentValue:   Locator;
  private readonly shippingLabel:  Locator;
  private readonly shippingValue:  Locator;
  private readonly itemTotalLabel: Locator;
  private readonly taxLabel:       Locator;
  private readonly totalLabel:     Locator;

  // ── Buttons ────────────────────────────────────────────────────────────────
  private readonly cancelButton: Locator;
  private readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);

    // Column labels
    this.qtyLabel         = page.locator('.cart_quantity_label');
    this.descriptionLabel = page.locator('.cart_desc_label');

    // Cart items
    this.cartItems = page.locator('.cart_item');

    // Summary
    this.paymentLabel   = page.locator('[data-test="payment-info-label"]');
    this.paymentValue   = page.locator('[data-test="payment-info-value"]');
    this.shippingLabel  = page.locator('[data-test="shipping-info-label"]');
    this.shippingValue  = page.locator('[data-test="shipping-info-value"]');
    this.itemTotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel       = page.locator('[data-test="tax-label"]');
    this.totalLabel     = page.locator('[data-test="total-label"]');

    // Buttons
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  // ── Navigation ─────────────────────────────────────────────────────────────

  async goto() {
    await super.goto(CheckoutOverviewPage.URL);
  }

  // ── Assertions: Header (delegate to Header component) ─────────────────────

  async expectLogoVisible() {
    await this.header.verifyHeaderAppLoGo();
  }

  async expectPageTitleVisible() {
    await this.header.verifyHeaderTitle('Checkout: Overview');
  }

  async expectHamburgerMenuVisible() {
    await this.header.verifyHeaderHamburger();
  }

  async expectCartIconVisible() {
    await this.header.verifyHeaderCartIcon();
  }

  async expectCartBadgeCount(expected: number) {
    await this.header.expectCartBadgeCount(expected);
  }

  // ── Assertions: Column labels ──────────────────────────────────────────────

  async expectQtyLabelVisible() {
    await expect(this.qtyLabel).toBeVisible();
    await expect(this.qtyLabel).toHaveText('QTY');
  }

  async expectDescriptionLabelVisible() {
    await expect(this.descriptionLabel).toBeVisible();
    await expect(this.descriptionLabel).toHaveText('Description');
  }

  // ── Assertions: Cart items ─────────────────────────────────────────────────

  async expectItemCount(expected: number) {
    await expect(this.cartItems).toHaveCount(expected);
  }

  async expectItemVisible(name: string, price: string, quantity: number) {
    const item = this.cartItems.filter({ hasText: name }).first();
    await expect(item.locator('.inventory_item_name')).toHaveText(name);
    await expect(item.locator('.inventory_item_price')).toHaveText(price);
    await expect(item.locator('.cart_quantity')).toHaveText(String(quantity));
  }

  // ── Assertions: Summary ────────────────────────────────────────────────────

  async expectPaymentInfo(value: string) {
    await expect(this.paymentLabel).toBeVisible();
    await expect(this.paymentValue).toContainText(value);
  }

  async expectShippingInfo(value: string) {
    await expect(this.shippingLabel).toBeVisible();
    await expect(this.shippingValue).toContainText(value);
  }

  async expectItemTotal(amount: number) {
    await expect(this.itemTotalLabel).toContainText(`Item total: $${amount.toFixed(2)}`);
  }

  async expectTax(amount: number) {
    await expect(this.taxLabel).toContainText(`Tax: $${amount.toFixed(2)}`);
  }

  async expectTotal(amount: number) {
    await expect(this.totalLabel).toContainText(`Total: $${amount.toFixed(2)}`);
  }

  async expectTotalCalculation(itemTotal: number, tax: number) {
    const expected = parseFloat((itemTotal + tax).toFixed(2));
    await this.expectTotal(expected);
  }

  // ── Assertions: Buttons ────────────────────────────────────────────────────

  async expectCancelButtonVisible() {
    await expect(this.cancelButton).toBeVisible();
  }

  async expectFinishButtonVisible() {
    await expect(this.finishButton).toBeVisible();
  }

  // ── Actions ────────────────────────────────────────────────────────────────

  async clickCancel() {
    await this.cancelButton.click();
  }

  async clickFinish() {
    await this.finishButton.click();
  }

  async clickCartIcon() {
    await this.header.cartIcon.click();
  }

  async reload() {
    await this.page.reload();
  }

  // ── Assertions: Navigation ─────────────────────────────────────────────────

  async expectToBeOnPage() {
    await this.expectURL(/checkout-step-two/);
  }

  async expectNavigatedToInventoryPage() {
    await this.expectURL(/inventory/);
  }

  async expectNavigatedToCompletePage() {
    await this.expectURL(/checkout-complete/);
  }

  async expectNavigatedToCartPage() {
    await this.expectURL(/cart/);
  }
}