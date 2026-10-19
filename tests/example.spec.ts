import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

const URL = 'https://playwright.dev';

test('Playwright documentation is available', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto(URL);

  await expect(page).toHaveTitle(/Playwright/);
  await expect(homePage.getStartedLink.first()).toBeVisible();
  await page.waitForTimeout(2000)
  
});
