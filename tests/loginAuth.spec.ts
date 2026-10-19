import { test, expect, type Page, type BrowserContext, Browser } from '@playwright/test'
import { existsSync } from 'node:fs';
import { chromium } from 'playwright';
import { GoogleAccPage } from '../pages/googleAccPage';

const BASEURL = 'https://accounts.google.com/';
let googleAccPage: GoogleAccPage;
const stateFile = './auth/state.json'
let state;


test.beforeAll('Authenticates and stores authentication state', async () => {
    const browser = await chromium.launch({args: ['--window-size=1920,1080', '--disable-blink-features=AutomationControlled'],});
    let context: BrowserContext;
    let page: Page;

    if (existsSync(stateFile)) {        
        context = await browser.newContext({ viewport: null, storageState: stateFile });
    } else {
        context = await browser.newContext({ viewport: null });
    }
    page = await context.newPage();

    await page.goto(BASEURL)
    googleAccPage = new GoogleAccPage(page);

    if (await page.title() == 'Sign in - Google Accounts') {
        await googleAccPage.enterEmail();
        await googleAccPage.clickNextButton();
        await googleAccPage.enterPassword();
        await googleAccPage.clickNextButton();
        
        // Wait for navigation or a specific selector to confirm successful login
        await page.waitForURL("https://myaccount.google.com/**")

        // Save storage state to an in-memory dictionary (or a file string)
        state = await page.context().storageState({path: stateFile});
    } else {
        state = await page.context().storageState();
    }
    page.close();
});

test('Login with authentication credentials', async({ browser }) => {
    let context = await browser.newContext({ viewport: null, storageState: stateFile });
    let page = await context.newPage();
    await page.goto(BASEURL);
    await expect(page).toHaveTitle('Cuenta de Google');
    console.log('Page |' + await page.title() + '| opened')
    expect
});