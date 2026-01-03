import type { Page } from '@playwright/test';
import  { expect } from '@playwright/test';
import { BasePage } from './basePage.js';
import { Header } from '../components/header.js';
import { Footer } from '../components/footer.js';
import { HamburgerMenu } from '../components/hamburgermenu.js';

export class InventoryPage extends BasePage {
  readonly header: Header;
  readonly footer: Footer;
  readonly hamburger: HamburgerMenu;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);      
    this.footer = new Footer(page);      
    this.hamburger = new HamburgerMenu(page); 
  }

  // ไปหน้า inventory
  async gotoInventory() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  //---------------------------------------------------------------------------------------ตรวจสอบ URL และ header elements---------------------------------------------------------------------------------------------------------------------------------------

  async verifyPageUI() {
    await this.expectURL(/inventory.html/);
    await this.header.verifyHeader('Products');        
  }


//----------------------------------------------------------------------------------------Footer----------------------------------------------------------------------------------------------------------------------------------


async verifyFooterVisible() {
  await this.footer.verifyFooterVisibility();
}

async verifyFooterCopyright() {
  await this.footer.verifyCopyrightText();
}

async verifyFooterTwitter() {
  await this.footer.verifyTwitterLink();
}

async verifyFooterFacebook() {
  await this.footer.verifyFacebookLink();
}

async verifyFooterLinkedIn() {
  await this.footer.verifyLinkedInLink();
}









//-----------------------------------------------------------------------------------------hamburger menu actions---------------------------------------------------------------------------------------------------------------------------------------

  async verifyHamburgerAllItems() {
    await this.hamburger.open();
    await this.hamburger.clickAllItems();
    await this.page.waitForURL('**/inventory.html');
  }

  async verifyHamburgerAbout() {
    const currentUrl = this.page.url();
    await this.hamburger.open();
    await this.hamburger.clickAbout();
    await this.page.waitForURL('https://saucelabs.com/');
    await this.page.goBack();
    await this.page.waitForURL(currentUrl);
  }

  async verifyHamburgerLogout() {
    await this.hamburger.open();
    await this.hamburger.clickLogout();
    await this.page.waitForURL('https://www.saucedemo.com/');
  }

  async verifyHamburgerResetAppState() {
    await this.hamburger.open();
    await this.hamburger.clickResetAppState();
    // ตรวจสอบ cart กลับเป็น 0
    await expect(this.page.locator('.shopping_cart_badge')).toHaveCount(0);

  }
//-----------------------------------------------------------------------------------------product cards, title, description, price---------------------------------------------------------------------------------------------------------------------------------

  async verifyProducts() {
    const count = await this.page.locator('.inventory_item').count();
    for (let i = 0; i < count; i++) {
      const card = this.page.locator('.inventory_item').nth(i);
      await expect(card).toBeVisible();
      await expect(card.locator('.inventory_item_name')).toBeVisible();
      await expect(card.locator('.inventory_item_desc')).toBeVisible();
      await expect(card.locator('.inventory_item_price')).toBeVisible();
    }
  }

  //---------------------------------------------------------------------------------------Cart actions---------------------------------------------------------------------------------------------------------------------------
 
  async addToCart(index: number) {
    const button = this.page.locator('.inventory_item').nth(index).locator('button');
    await button.click();
  }

  async removeFromCart(index: number) {
    const button = this.page.locator('.inventory_item').nth(index).locator('button');
    await button.click();
  }

  async verifyCartBadge(expectedCount: number) {
    const badge = this.page.locator('.shopping_cart_badge');
    if (expectedCount === 0) {
      await expect(badge).toHaveCount(0);
    } else {
      await expect(badge).toHaveText(expectedCount.toString());
    }
  }

  //---------------------------------------------------------------------------------Product detail navigation & data consistency------------------------------------------------------------------------------------------------


  async verifyProductDetailNavigation() {
    const count = await this.page.locator('.inventory_item').count();
    for (let i = 0; i < count; i++) {
      const card = this.page.locator('.inventory_item').nth(i);
      const title = await card.locator('.inventory_item_name').textContent();
      const price = await card.locator('.inventory_item_price').textContent();
      const desc = await card.locator('.inventory_item_desc').textContent();

      await card.locator('.inventory_item_name').click();
      await expect(this.page.locator('.inventory_details_name')).toHaveText(title || '');
      await expect(this.page.locator('.inventory_details_price')).toHaveText(price || '');
      await expect(this.page.locator('.inventory_details_desc')).toHaveText(desc || '');
      await this.page.click('#back-to-products');
      await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }
  }

  //---------------------------------------------------------------------------------------Sorting---------------------------------------------------------------------------------------------------------------------------------
 
  async sortProductsByName(order: 'asc' | 'desc') {
    const select = this.page.locator('.product_sort_container');
    await select.selectOption(order === 'asc' ? 'az' : 'za');
    // ไม่ต้อง verify detail, test จะเช็คตาม UI
  }

  async sortProductsByPrice(order: 'asc' | 'desc') {
    const select = this.page.locator('.product_sort_container');
    await select.selectOption(order === 'asc' ? 'lohi' : 'hilo');
  }

  //---------------------------------------------------------------------------------------Responsiveness--------------------------------------------------------------------------------------------------------------------------
 
  async verifyResponsiveLayout() {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    await this.verifyProducts();
    await this.page.setViewportSize({ width: 375, height: 812 });
    await this.verifyProducts();
  }

  //---------------------------------------------------------------------------------------Data consistency between list & detail---------------------------------------------------------------------------------------------------

  async verifyProductDataConsistency() {
    const count = await this.page.locator('.inventory_item').count();
    for (let i = 0; i < count; i++) {
      const card = this.page.locator('.inventory_item').nth(i);
      const titleList = await card.locator('.inventory_item_name').textContent();
      const priceList = await card.locator('.inventory_item_price').textContent();
      await card.locator('.inventory_item_name').click();
      const titleDetail = await this.page.locator('.inventory_details_name').textContent();
      const priceDetail = await this.page.locator('.inventory_details_price').textContent();
      expect(titleList).toBe(titleDetail);
      expect(priceList).toBe(priceDetail);
      await this.page.click('#back-to-products');
    }
  }
}