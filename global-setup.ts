// global.setup.ts
import { chromium } from '@playwright/test';
import CART_PRODUCT_IDS from './fixtures/state/state-cart.fixture.js';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    storageState: 'fixtures/state/state-login.json', // reuse login
  });

  await page.goto('https://www.saucedemo.com/inventory.html');

  for (const id of CART_PRODUCT_IDS) {
    await page.locator(`[data-test="add-to-cart-item-${id}"]`).click();
  }

  // Save state รวม login + cart
  await page.context().storageState({ path: 'fixtures/state/state-cart.json' });
  await browser.close();
}

export default globalSetup;