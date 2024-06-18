import { test as setup, expect } from '@playwright/test';
import { LoginHelper } from '../helpers/LoginHelper';
import { HomePage } from '../pages/HomePage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  const homePage = new HomePage(page);
  const email = process.env.CORRECT_EMAIL as string;
  const password = process.env.CORRECT_PASSWORD as string;
  await LoginHelper.doLogin(email, password, page);

  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL(homePage.getURL());

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});