import { test } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage.js';

test.describe('Swag Labs - Product Page', () => {

  let inventory: InventoryPage;

  // ใช้ login state ที่เตรียมไว้
  test.beforeEach(async ({ page }) => {
    await page.context().addCookies([]);
    await page.goto('https://www.saucedemo.com/inventory.html'); 
    inventory = new InventoryPage(page);
  });

   //---------------------------------------------------------------------------------------
  // Verify UI elements on Product Page
  //---------------------------------------------------------------------------------------
  test('[TC-VUP-001..007] Inventory page UI smoke', async () => {
    await inventory.verifyPageUI();      // header + logo + page title
    await inventory.verifyProducts();    // product cards, title, description, price
  });

  //---------------------------------------------------------------------------------------
  // Hamburger menu functionality
  //---------------------------------------------------------------------------------------
  test('TC-VHB-001: Hamburger menu can open', async () => {
    await inventory.hamburger.open();
  });

  test('TC-VHB-002: Verify All Items link', async () => {
    await inventory.verifyHamburgerAllItems();
  });

  test('TC-VHB-003: Verify About link', async () => {
    await inventory.verifyHamburgerAbout();
  });

  test('TC-VHB-004: Verify Logout link', async () => {
    await inventory.verifyHamburgerLogout();
  });

  test('TC-VHB-005: Verify Reset App State link', async () => {
    await inventory.verifyHamburgerResetAppState();
  });
  test('TC-VHB-006: Hamburger menu can close', async () => {
    await inventory.hamburger.close();
  });

  //---------------------------------------------------------------------------------------
  // Product page functionality
  //---------------------------------------------------------------------------------------
  test('TC-PF-001: Add first product to cart', async () => {
    await inventory.addToCart(0); // add first product
    await inventory.verifyCartBadge(1);
  });

  test('TC-PF-002: Remove first product from cart', async () => {
    await inventory.addToCart(0);
    await inventory.removeFromCart(0);
    await inventory.verifyCartBadge(0);
  });

  test('TC-PF-003: Cart icon updates correctly', async () => {
    await inventory.addToCart(0);
    await inventory.addToCart(1);
    await inventory.verifyCartBadge(2);
  });

  test('TC-PF-004 to TC-PF-007: Product detail navigation & data consistency', async () => {
    await inventory.verifyProductDetailNavigation(); // open/close, compare data list/detail
  });

  test('TC-PF-008 to TC-PF-011: Sorting products', async () => {
    await inventory.sortProductsByName('asc');   // A to Z
    await inventory.sortProductsByName('desc');  // Z to A
    await inventory.sortProductsByPrice('asc');  // Low to High
    await inventory.sortProductsByPrice('desc'); // High to Low
  });

  test('TC-PF-012: Responsiveness verification', async () => {
    await inventory.verifyResponsiveLayout();
  });

  test('TC-PF-013: Data consistency', async () => {
    await inventory.verifyProductDataConsistency();
  });

  //---------------------------------------------------------------------------------------
  // Footer section
  //---------------------------------------------------------------------------------------
 test.describe('Footer Test Suite', () => {

  test('TC-TFS-001: Verify footer visibility', async () => {
    await inventory.footer.scrollToFooter();
    await inventory.footer.verifyFooterVisibility();
  });

  test('TC-TFS-002: Verify copyright text', async () => {
    await inventory.footer.verifyCopyrightText();
  });

  test('TC-TFS-003: Verify Twitter link redirect', async () => {
    await inventory.footer.verifyTwitterLink();
  });

  test('TC-TFS-004: Verify Facebook link redirect', async () => {
    await inventory.footer.verifyFacebookLink();
  });

  test('TC-TFS-005: Verify LinkedIn link redirect', async () => {
    await inventory.footer.verifyLinkedInLink();
  });

});


});
