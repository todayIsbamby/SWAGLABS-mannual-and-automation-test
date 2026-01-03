import { expect } from '@playwright/test';
import type { Page,Locator} from '@playwright/test';

export class Footer {
  readonly page: Page;

  readonly footer: Locator;
  readonly copyright: Locator;
  readonly twitter: Locator;
  readonly facebook: Locator;
  readonly linkedin: Locator;

  constructor(page: Page) {
    this.page = page;

    this.footer = page.locator('.footer');
    this.copyright = page.locator('.footer_copy');
    this.twitter = page.locator('.social_twitter a');
    this.facebook = page.locator('.social_facebook a');
    this.linkedin = page.locator('.social_linkedin a');
  }

  // TC-TFS-001
  async scrollToFooter() {
    await this.footer.scrollIntoViewIfNeeded();
  }

  async verifyFooterVisibility() {
    await expect(this.footer).toBeVisible();
    await expect(this.copyright).toBeVisible();
    await expect(this.twitter).toBeVisible();
    await expect(this.facebook).toBeVisible();
    await expect(this.linkedin).toBeVisible();
  }

  // TC-TFS-002
  async verifyCopyrightText() {
    const year = new Date().getFullYear().toString();
    await expect(this.copyright).toContainText(year);
    await expect(this.copyright).toContainText('Sauce Labs');
  }

  // TC-TFS-003
async verifyTwitterLink() {
  const [newPage] = await Promise.all([
    this.page.context().waitForEvent('page'),
    this.twitter.click(),
  ]);

  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL(/(twitter|x)\.com\/saucelabs/i);
  await newPage.close();
}


  // TC-TFS-004
  async verifyFacebookLink() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.facebook.click(),
    ]);

    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(/facebook\.com\/saucelabs/i);
    await newPage.close();
  }

  // TC-TFS-005
  async verifyLinkedInLink() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.linkedin.click(),
    ]);

    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(/linkedin\.com\/company\/sauce-labs/i);
    await newPage.close();
  }
}
