import { test } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage.js';

test.describe('Swag Labs - Product Page', () => {

  let inventory: InventoryPage;

  // ใช้ login state ที่เตรียมไว้
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html'); 
    inventory = new InventoryPage(page);
  });

   //---------------------------------------------------------------------------------------
  // Verify UI elements on Product Page
  //---------------------------------------------------------------------------------------
  test('[TC-VUP-001] Logo verification', async () => {
    await inventory.verifyLogo();     
  });
    test('[TC-VUP-002] Page title verification', async () => {
    await inventory.verifyTitle();     
  });
    test('[TC-VUP-003] Product list verification ', async () => {
    await inventory.verifyProductInfo();     
  });
    test('[TC-VUP-004] Hamburger button verification ', async () => {
    await inventory.verifyHamburgerButton();     
  });
    test('[TC-VUP-005] Cart button verification', async () => {
    await inventory.verifyCartButton();     
  });
    test('[TC-VUP-006] Sort button verification', async () => {

    await inventory.verfySortButton();     
  });

  test('[TC-VUP-007] Product Info Verification', async () => {
    await inventory.verifyProducts();    
  });
  //-------------------------------------------------------------------Hamburger menu functionality ---------------------------------------------------------------------------------------

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
    await inventory.hamburger.open();
    await inventory.hamburger.close();
  });


  //------------------------------------------------------------------ Product page functionality---------------------------------------------------------------------------------------
  

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


//แก้ไข
  test('TC-PF-004 to TC-PF-007: Product detail navigation & data consistency', async () => {
    await inventory.verifyProductDetailNavigation(); 
  });

  test('TC-PF-008: Sorting Name (A to Z)', async () => {
    await inventory.sortProductsByName('asc')});

   test('TC-PF-009: Sorting Name (Z to A)', async () => {
    await inventory.sortProductsByName('desc')});
  
   test('TC-PF-010: Sorting Price (Low to High)', async () => {
    await inventory.sortProductsByPrice('asc')});

   test('TC-PF-011: Sorting Price (High to Low)', async () => {
    await inventory.sortProductsByPrice('desc')});

    test('TC-PF-012: Responsiveness verification', async () => {
      await inventory.verifyResponsiveLayout();
    });

    test('TC-PF-013: Data consistency', async () => {
      await inventory.verifyProductDataConsistency();
    });

  //--------------------------------------------------------------------Footer section---------------------------------------------------------------------------------------
 
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
