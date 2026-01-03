import type { Page} from '@playwright/test';
import { expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async expectURL(url: string | RegExp) {
    await expect(this.page).toHaveURL(url);
  }
}
