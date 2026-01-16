// tests/cart.spec.ts
import { test } from '@playwright/test';
import { CartPage } from '../pages/cartPage.js';
import cartState from '../fixtures/state/state-cart.fixture.js';
import { CART_ITEMS } from '../fixtures/data/data.cardinfo.fixture.js';

test.describe('Your Cart Page', () => {
  test.beforeEach(async ({ page }) => {
    // preload cart state
    await page.addInitScript(storage => {
      window.localStorage.setItem(
        'cart-contents',
        JSON.stringify(storage)
      );
    }, cartState);

    const cartPage = new CartPage(page);
    await cartPage.goto();
    await cartPage.verifyTitle();
  });

    test('TC-CUI-001 Verify Swag Labs logo', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.verifyLogo();
    });

    test('TC-CUI-004 Verify cart badge counter', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.expectCartBadgeCount(CART_ITEMS.length);
    });

    test('TC-CUI-005 Verify cart items visible', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.expectItemCount(CART_ITEMS.length);
        await cartPage.expectItemsVisible();
    });

    test('TC-CUI-006 Verify Remove buttons visible', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.expectRemoveButtonsVisible();
    });

    test('TC-CUI-007 / 008 Verify QTY and Description labels', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.expectQtyLabelVisible();
        await cartPage.expectDescriptionLabelVisible();
    });

    test('TC-CUI-009–012 Verify item name, description, price, quantity', async ({ page }) => {
    const cartPage = new CartPage(page);

    let index = 0;
    for (const expected of CART_ITEMS) {
        const item = cartPage.getItem(index);

        await item.expectName(expected.name);
        await item.expectPrice(expected.price);
        await item.expectDescription(expected.description);
        await item.expectQuantity(expected.quantity);

        index++;
    }
    });


    test('TC-YCF-001 Verify item name link navigates to product detail', async ({ page }) => {
        const cartPage = new CartPage(page);
        const firstItem = cartPage.getItem(0);

        await firstItem.clickName();
        await page.waitForURL(/inventory-item.html/);
    });


    test('TC-YCF-003 Verify remove button', async ({ page }) => {
    const cartPage = new CartPage(page);
    const bikeLight = await cartPage.getItemByName('Sauce Labs Bike Light');
    await bikeLight.remove();
    await cartPage.expectItemNotVisibleByName('Sauce Labs Bike Light');
    });


     // ---------------- TC-YCF-004 ----------------

    test('TC-YCF-004 Verify cart badge updates after remove', async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.goto();

    await page.reload();

    await cartPage.expectInitialCartBadge();

    await cartPage.removeItemAndVerifyBadge('Sauce Labs Bike Light');
});



    test('TC-YCF-007 Verify Continue Shopping button', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.clickContinueShopping();
        await page.waitForURL(/inventory.html/);
    });

    test('TC-YCF-008 Verify Checkout button', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.clickCheckout();
        await page.waitForURL(/checkout-step-one.html/);
  });
});
