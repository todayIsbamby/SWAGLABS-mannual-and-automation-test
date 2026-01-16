// components/cartItem.ts
import { type Locator, expect } from '@playwright/test';

export class CartItem {
  constructor(private readonly root: Locator) {}

  // ---------- assertions ----------

  async expectVisible() {
    await expect(this.root).toBeVisible();
  }

  async expectHidden() {
    await expect(this.root).toBeHidden();
  }

  async expectName(expected: string) {
    await expect(this.root.locator('.inventory_item_name')).toHaveText(expected);
  }

  async expectDescription(expected: string) {
    await expect(this.root.locator('.inventory_item_desc')).toHaveText(expected);
  }

  async expectPrice(expected: string) {
    await expect(this.root.locator('.inventory_item_price')).toHaveText(expected);
  }

  async expectQuantity(expected: number | string) {
    await expect(this.root.locator('.cart_quantity')).toHaveText(String(expected));
  }

  async expectRemoveButtonVisible() {
    await expect(this.root.locator('button:has-text("Remove")')).toBeVisible();
  }

  // ---------- actions ----------

  async clickName() {
    await this.root.locator('.inventory_item_name').click();
  }

  async remove() {
    await this.root.locator('button:has-text("Remove")').click();
  }
}
