import type { Page } from '@playwright/test';

const CART_PRODUCT_IDS = [4, 0, 1];

export const CART_BADGE_INITIAL_COUNT = CART_PRODUCT_IDS.length;

import { CART_ITEMS } from '../data/data.cartinfo.fixture.js';

export async function addItemsToCart(page: Page) {
  for (const item of CART_ITEMS) {
    await page.locator(`[data-test="${item.addToCartKey}"]`).click();
  }
}

export default CART_PRODUCT_IDS;