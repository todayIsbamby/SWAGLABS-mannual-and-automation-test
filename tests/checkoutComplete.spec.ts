import { test }                   from '../fixtures/state/state-login.fixture.js';
import { CheckoutInfoPage }       from '../pages/checkoutInfoPage.js';
import { CheckoutOverviewPage }   from '../pages/checkoutOverviewPage.js';
import { CheckoutCompletePage }   from '../pages/checkoutCompletePage.js';
import { validUser }              from '../fixtures/data/data.yourInfo.fixture.js';
import { addItemsToCart }         from '../fixtures/state/state-cart.fixture.js';
import { completeMessages }       from '../fixtures/data/data.complete.fixture.js';


async function navigateToComplete(page: any) {
  const checkoutInfoPage  = new CheckoutInfoPage(page);
  const overviewPage      = new CheckoutOverviewPage(page);
  const completePage      = new CheckoutCompletePage(page);

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
  await overviewPage.clickFinish();
  await completePage.expectToBeOnPage();

  return completePage;
}

test.describe('Checkout: Complete! Page', () => {
  test.use({ storageState: 'fixtures/state/state-login.json' });

  // ── UI Display (beforeAll) ─────────────────────────────────────────────────
  // ไม่มีการ navigate ออก → setup ครั้งเดียวพอ

  test.describe('UI Display', () => {
    let completePage: CheckoutCompletePage;

    test.beforeAll(async ({ browser }) => {
      const context = await browser.newContext({
        storageState: 'fixtures/state/state-login.json',
      });
      const page = await context.newPage();
      completePage = await navigateToComplete(page);
    });

    test('TC-CYUI-005: Complete icon and message block should be visible', async () => {
      await completePage.expectCompleteIconVisible();
    });

    test('TC-CYUI-006: Main success message should display correctly', async () => {
      await completePage.expectCompleteHeader(completeMessages.header);
    });

    test('TC-CYUI-007: Detailed dispatch message should be visible', async () => {
      await completePage.expectCompleteText(completeMessages.detail);
    });

    test('TC-CYUI-008: Back Home button should be visible', async () => {
      await completePage.expectBackHomeButtonVisible();
    });
  });

  // ── Functionality (beforeEach) ─────────────────────────────────────────────
  // มีการ navigate ออกจากหน้า → ต้อง setup ใหม่ทุก test

  test.describe('Functionality', () => {
    let completePage: CheckoutCompletePage;

    test.beforeEach(async ({ page }) => {
      completePage = await navigateToComplete(page);
    });

    test('TC-COF-001: Cart icon should navigate to Cart page', async () => {
      await completePage.clickCartIcon();
      await completePage.expectNavigatedToCartPage();
    });

    test('TC-COF-002: Back Home button should navigate to Products page', async () => {
      await completePage.clickBackHome();
      await completePage.expectNavigatedToInventoryPage();
    });
  });
});