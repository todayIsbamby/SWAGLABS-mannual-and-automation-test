// pages/cartPage.ts
import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './basePage.js';
import { CartItem } from '../components/cartItem.js';
import { Header } from '../components/header.js';
// pages/cartPage.ts
import cartState from '../fixtures/state/state-cart.fixture.js';

import { CART_ITEMS } from '../fixtures/data/data.cardinfo.fixture.js';


export class CartPage extends BasePage {
  static readonly URL = '/cart.html';

  // ---------- components ----------
  readonly header: Header;

  // ---------- locators ----------
  private readonly items;
  private readonly cartBadge;
  private readonly qtyLabel;
  private readonly descriptionLabel;
  private readonly continueShoppingButton;
  private readonly checkoutButton;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);

    this.items = this.page.locator('.cart_item');
    this.cartBadge = this.page.locator('.shopping_cart_badge');
    this.qtyLabel = this.page.locator('.cart_quantity_label');
    this.descriptionLabel = this.page.locator('.cart_desc_label');
    this.continueShoppingButton = this.page.locator(
      '[data-test="continue-shopping"]'
    );
    this.checkoutButton = this.page.locator('[data-test="checkout"]');
  }

  // ---------- navigation ----------
  async goto() {
    await super.goto(CartPage.URL);
  }

  // ---------- header ----------
  async verifyTitle() {
    await this.header.verifyHeaderTitle('Your Cart');
  }
  async verifyLogo(){
    await this.header.verifyHeaderAppLoGo();
  }

  // ---------- cart items ----------
  async getItemCount() {
    return this.items.count();
  }

  getItem(index: number) {
    return new CartItem(this.items.nth(index));
  }

  getItemByName(name: string) {
    return new CartItem(
      this.items.filter({ hasText: name }).first()
    );
  }

  async expectItemCount(expected: number) {
    await expect(this.items).toHaveCount(expected);
  }

  async expectItemsVisible() {
    const count = await this.getItemCount();
    for (let i = 0; i < count; i++) {
      await this.getItem(i).expectVisible();
    }
  }

  async expectRemoveButtonsVisible() {
    const count = await this.getItemCount();
    for (let i = 0; i < count; i++) {
      await this.getItem(i).expectRemoveButtonVisible();
    }
  }

  // ---------- cart badge ----------

async expectCartBadgeCount(expected: number) {
  await this.header.expectCartBadgeCount(expected);
}

//---------------

async expectItemNotVisibleByName(name: string) {
  const item = this.items.filter({ hasText: name });
  await expect(item).toHaveCount(0);
}

//-------------- remove and update cart badge-----------

async expectInitialCartBadge() {
  await this.expectCartBadgeCount(cartState.length);
}
async removeItemAndVerifyBadge(productName: string) {
  const initialCount = cartState.length;

  const item = await this.getItemByName(productName);
  await item.remove();

  await this.expectCartBadgeCount(cartState.length);
}





// ---------- cart header labels ----------
  async expectQtyLabelVisible() {
    await expect(this.qtyLabel).toBeVisible();
    await expect(this.qtyLabel).toHaveText('QTY');
  }

  async expectDescriptionLabelVisible() {
    await expect(this.descriptionLabel).toBeVisible();
    await expect(this.descriptionLabel).toHaveText('Description');
  }

  // ---------- actions ----------
  async clickContinueShopping() {
    await expect(this.continueShoppingButton).toBeVisible();
    await this.continueShoppingButton.click();
  }

  async clickCheckout() {
    await expect(this.checkoutButton).toBeVisible();
    await this.checkoutButton.click();
  }
}
