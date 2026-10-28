import {test, expect, type Page} from '@playwright/test'
import { NewWindowPage } from '../pages/newWindowPage';

let newWindowPage: NewWindowPage;
const WINDOWS_URL = 'https://demoqa.com/browser-windows';
const windowText = 'Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.'

test.beforeEach(async ({page, context}) => {
    await page.goto(WINDOWS_URL);
    newWindowPage = new NewWindowPage(page, context);
});

test.describe('Open and validate the 3 types of windows pages', () => {
    test('New Tab', async() => {
        const newTab = newWindowPage.newPage(newWindowPage.newTabButton);
        expect((await newTab).locator('#sampleHeading')).toContainText('This is a sample page');
        (await newTab).close();
    });

    test('New Window', async() => {
        const newWindow = newWindowPage.newPage(newWindowPage.newWindowButton);
        expect((await newWindow).locator('#sampleHeading')).toContainText('This is a sample page');
        (await newWindow).close();
    });    

    test('New Window Message', async() => {
        const newWindowMsg = newWindowPage.newPage(newWindowPage.newWinMsgButton);
        expect((await newWindowMsg).locator('body')).toContainText(windowText);
        (await newWindowMsg).close();
    });
});

test('Open tabs manually', async ({ browser }) => {
  const context = await browser.newContext();
  
  const tab1 = await context.newPage();
  const tab2 = await context.newPage();

  await tab1.goto('https://google.com');
  await tab2.goto('https://playwright.dev');

  await tab1.locator('[name="q"]').fill('Playwright');
  await expect(tab2).toHaveTitle(/Playwright/);

  await context.close();
});
