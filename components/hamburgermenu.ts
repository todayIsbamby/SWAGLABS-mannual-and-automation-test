import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';


export class HamburgerMenu {
  readonly page: Page;
  readonly menu: Locator;
  readonly closeBtn: Locator;
  readonly allItems: Locator;
  readonly about: Locator;
  readonly logout: Locator;
  readonly reset: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menu = page.locator('.bm-menu');
    this.closeBtn = page.locator('#react-burger-cross-btn');
    this.allItems = page.locator('#inventory_sidebar_link');
    this.about = page.locator('#about_sidebar_link');
    this.logout = page.locator('#logout_sidebar_link');
    this.reset = page.locator('#reset_sidebar_link');
  }

 // Action พื้นฐาน
  async open() {
    await this.page.locator('#react-burger-menu-btn').click();
    await expect(this.menu).toBeVisible();
  }

  async close() {
    await this.closeBtn.click();
    await expect(this.menu).not.toBeVisible();
  }

  // Method คลิกเมนูแต่ละตัว (action แต่ไม่ assert)
  async clickAllItems() {
    await this.allItems.click();
  }

  async clickAbout() {
    await this.about.click();
  }

  async clickLogout() {
    await this.logout.click();
  }

  async clickResetAppState() {
    await this.reset.click();
  }
}

