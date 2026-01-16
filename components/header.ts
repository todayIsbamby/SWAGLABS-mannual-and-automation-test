import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';


export class Header {
  readonly pageTitle: Locator;
  readonly hamburgerButton: Locator;
  readonly cartIcon: Locator;
  readonly appLogo: Locator; 
  readonly cartBadge: Locator;
  constructor(page: Page) {
    this.pageTitle = page.locator('.header_secondary_container .title');
    this.hamburgerButton = page.locator('#react-burger-menu-btn');
    this.cartIcon = page.locator('#shopping_cart_container');
    this.appLogo = page.locator('.app_logo'); 
    this.cartBadge = this.cartIcon.locator('.shopping_cart_badge');
  }

    async verifyHeaderTitle(title: string) {
    await expect(this.pageTitle).toHaveText(title);
  }
    async verifyHeaderHamburger() {
    await expect(this.hamburgerButton).toBeVisible();
  }
    async verifyHeaderCartIcon() {
    await expect(this.cartIcon).toBeVisible();
  
  }
    async verifyHeaderAppLoGo() {
    await expect(this.appLogo).toBeVisible(); 
  }
   async expectCartBadgeCount(expected: number) {
    if (expected === 0) {
      await expect(this.cartBadge).toHaveCount(0);
    } else {
      await expect(this.cartBadge).toBeVisible();
      await expect(this.cartBadge).toHaveText(String(expected));
    }
  }
}
