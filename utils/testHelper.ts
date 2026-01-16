import type {Page} from'@playwright/test';

export async function verifyResponsive(
  page: Page,
  verifyFn: () => Promise<void>
) {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await verifyFn();

  await page.setViewportSize({ width: 375, height: 812 });
  await verifyFn();
}
