import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';


export class Header {
  readonly pageTitle: Locator;
  readonly hamburgerButton: Locator;
  readonly cartIcon: Locator;
  readonly appLogo: Locator; 

  constructor(page: Page) {
    this.pageTitle = page.locator('.header_secondary_container .title');
    this.hamburgerButton = page.locator('#react-burger-menu-btn');
    this.cartIcon = page.locator('#shopping_cart_container');
    this.appLogo = page.locator('.app_logo'); 
  }

  async verifyHeader(title: string) {
    await expect(this.pageTitle).toHaveText(title);
    await expect(this.hamburgerButton).toBeVisible();
    await expect(this.cartIcon).toBeVisible();
    await expect(this.appLogo).toBeVisible(); 
  }
}
