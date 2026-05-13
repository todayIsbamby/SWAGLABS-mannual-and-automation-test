// tests/checkoutOverview.spec.ts
import { test }         from '../fixtures/state/state-login.fixture.js';
import { CheckoutInfoPage }     from '../pages/checkoutInfoPage.js';
import { CheckoutOverviewPage } from '../pages/checkoutOverviewPage.js';
import { validUser }            from '../fixtures/data/data.yourInfo.fixture.js';
import { CART_ITEMS }           from '../fixtures/data/data.cartinfo.fixture.js';
import { CART_BADGE_INITIAL_COUNT, addItemsToCart } from '../fixtures/state/state-cart.fixture.js';
import {
  overviewPayment,
  overviewShipping,
  overviewPricing,
} from '../fixtures/data/data.overview.fixture.js';


// Helper: navigate to Overview page from scratch
async function navigateToOverview(page: any) {
  const checkoutInfoPage = new CheckoutInfoPage(page);
  const overviewPage     = new CheckoutOverviewPage(page);

  await page.goto('https://www.saucedemo.com/inventory.html');
  await addItemsToCart(page);
  await page.goto('https://www.saucedemo.com/cart.html');
  await page.locator('[data-test="checkout"]').click();
  await checkoutInfoPage.fillForm(
    validUser.firstName,
    validUser.lastName,
    validUser.zipCode,
  );
  await checkoutInfoPage.clickContinue();
  await overviewPage.expectToBeOnPage();

  return overviewPage;
}

test.describe('Checkout: Overview Page', () => {
  test.use({ storageState: 'fixtures/state/state-login.json' });
  test.describe('Read-only assertions', () => {
    let overviewPage: CheckoutOverviewPage;

    test.beforeAll(async ({ browser }) => {
      const context = await browser.newContext({
        storageState: 'fixtures/state/state-login.json',
      });
      const page = await context.newPage();
      overviewPage = await navigateToOverview(page);
    });

    // ── UI Display ────────────────────────────────────────────────────────────

    test('TC-CYUI-001: Logo should be visible', async () => {
      await overviewPage.expectLogoVisible();
    });

    test('TC-CYUI-002: Page title should display "Checkout: Overview"', async () => {
      await overviewPage.expectPageTitleVisible();
    });

    test('TC-CYUI-005: Cart badge should show correct item count', async () => {
      await overviewPage.expectCartBadgeCount(CART_BADGE_INITIAL_COUNT);
    });

    test('TC-CYUI-006: Inventory items and details should be visible', async () => {
      await overviewPage.expectItemCount(CART_ITEMS.length);
      for (const item of CART_ITEMS) {
        await overviewPage.expectItemVisible(item.name, item.price, item.quantity);
      }
    });

    test('TC-CYUI-007: QTY label should be displayed', async () => {
      await overviewPage.expectQtyLabelVisible();
    });

    test('TC-CYUI-008: Description label should be displayed', async () => {
      await overviewPage.expectDescriptionLabelVisible();
    });

    test('TC-CYUI-009: Payment Information label and value should be displayed', async () => {
      await overviewPage.expectPaymentInfo(overviewPayment.cardInfo);
    });

    test('TC-CYUI-010: Shipping Information label and value should be displayed', async () => {
      await overviewPage.expectShippingInfo(overviewShipping.shippingInfo);
    });

    test('TC-CYUI-011: Price Total section with Item Total and Tax should be displayed', async () => {
      await overviewPage.expectItemTotal(overviewPricing.itemTotal);
      await overviewPage.expectTax(overviewPricing.tax);
    });

    test('TC-CYUI-012: Total label and value should be correct', async () => {
      await overviewPage.expectTotal(overviewPricing.total);
    });

    test('TC-CYUI-013: Cancel button should be visible', async () => {
      await overviewPage.expectCancelButtonVisible();
    });

    test('TC-CYUI-014: Finish button should be visible', async () => {
      await overviewPage.expectFinishButtonVisible();
    });

    // ── Non-navigating Functionality ──────────────────────────────────────────

    test('TC-COF-004: Cart badge count should match number of added items', async () => {
      await overviewPage.expectCartBadgeCount(CART_BADGE_INITIAL_COUNT);
    });

    test('TC-COF-005: Displayed items should match selected items', async () => {
      for (const item of CART_ITEMS) {
        await overviewPage.expectItemVisible(item.name, item.price, item.quantity);
      }
    });

    test('TC-COF-006: Item Total should equal sum of all item prices', async () => {
      await overviewPage.expectItemTotal(overviewPricing.itemTotal);
    });

    test('TC-COF-007: Tax should equal Item Total × 8%', async () => {
      await overviewPage.expectTax(overviewPricing.tax);
    });

    test('TC-COF-008: Total should equal Item Total + Tax', async () => {
      await overviewPage.expectTotalCalculation(overviewPricing.itemTotal, overviewPricing.tax);
    });
  });

  // ── Navigating Functionality (beforeEach) ───────────────────────────────────

  test.describe('Navigation actions', () => {
    let overviewPage: CheckoutOverviewPage;

    test.beforeEach(async ({ page }) => {
      overviewPage = await navigateToOverview(page);
    });

    test('TC-COF-001: Cancel button should navigate to inventory page', async () => {
      await overviewPage.clickCancel();
      await overviewPage.expectNavigatedToInventoryPage();
    });

    test('TC-COF-002: Finish button should navigate to Checkout: Complete page', async () => {
      await overviewPage.clickFinish();
      await overviewPage.expectNavigatedToCompletePage();
    });

    test('TC-COF-003: Cart icon should navigate to cart page', async () => {
      await overviewPage.clickCartIcon();
      await overviewPage.expectNavigatedToCartPage();
    });

    test('TC-COF-009: Page data should persist after refresh', async () => {
      await overviewPage.reload();
      await overviewPage.expectToBeOnPage();
      await overviewPage.expectItemCount(CART_ITEMS.length);
      await overviewPage.expectTotal(overviewPricing.total);
    });
  });
});