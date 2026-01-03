import { test as base } from '@playwright/test';

export const test = base.extend<{ loginState: string }>({
  loginState: async ({}, use) => {
    // ส่ง path ของไฟล์ state-login.json ให้ test
    await use('fixtures/state/state-login.json');
  },
});
