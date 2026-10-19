import {test, expect, type Page} from '@playwright/test'
import { LoginPage } from '../pages/loginPage';

let loginPage: LoginPage;


test.beforeEach(async ({page}) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
});

test.describe('Test demo login page', () => {

    test('Verify login page icons', async () => {
        await expect(loginPage.TWITTER_ICON).toBeVisible();
        await expect(loginPage.FACEBOOK_ICON).toBeVisible();
        await expect(loginPage.INSTA_ICON).toBeVisible();
    });

    test('Login with a valid user', async () => {
        await loginPage.enterUsername();
        await loginPage.enterPassword();
        await loginPage.checkRememberBox(true);
        await loginPage.clickSignin();

    })
});