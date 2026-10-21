import {test, expect, type Page} from '@playwright/test'
import { LoginPage } from '../pages/loginPage';
import { LoginDashboardPage } from '../pages/loginDashboardPage';

let loginPage: LoginPage;


test.beforeEach(async ({page}) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
});

test.describe('Test demo login page', () => {

    test('Verify login page icons', async () => {
        await expect(loginPage.twitterIcon).toBeVisible();
        await expect(loginPage.facebookIcon).toBeVisible();
        await expect(loginPage.instaIcon).toBeVisible();
    });

    test('Login with a valid user', async ({ page }) => {
        await loginPage.enterUsername();
        await loginPage.enterPassword();
        await loginPage.checkRememberBox(true);
        await loginPage.clickSignin();

        const loginDashboardPage = new LoginDashboardPage(page);
        
        await expect(loginDashboardPage.loggedUserName).toHaveText('Jack Gomez');

    })
});