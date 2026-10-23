import {test, expect, type Page} from '@playwright/test'
import { DialogPage } from '../pages/dialogsPage';

let dialogsPage: DialogPage;
const DIALOGS_URL = "https://testpages.eviltester.com/pages/basics/alerts-javascript/";

test.beforeEach(async ({page}) => {
    await page.goto(DIALOGS_URL);
    dialogsPage = new DialogPage(page);
});


test.describe('Test Accept, Alert, Confirm and prompt dialogs', () => {

    test('Accept Alert dialog', async() => {
        await expect(dialogsPage.alertText).toContainText('');
        await dialogsPage.alertDialog();
        await expect(dialogsPage.alertText).toContainText('You triggered and handled the alert dialog');      
    });

    test('Accept Confirm dialog', async() => {
        await expect(dialogsPage.confirmText).toContainText('');
        expect(await dialogsPage.confirmDialog()).toContain('true');
        await expect(dialogsPage.confirmText).toContainText('You clicked OK, confirm returned');
    });

    test('Dismiss Confirm dialog', async() => {
        await expect(dialogsPage.confirmText).toContainText('');
        expect(await dialogsPage.confirmDialog(false)).toContain('false');
        await expect(dialogsPage.confirmText).toContainText('You clicked Cancel, confirm returned');
    });

    test('Accept Prompt dialog', async() => {
        await expect(dialogsPage.prompText).toContainText('');
        await dialogsPage.promptDialog(true, 'Hello World!');
        await expect(dialogsPage.prompText).toContainText("You clicked OK. 'prompt' returned");
        await expect(dialogsPage.prompReturn).toContainText('Hello World!');
    });    

    test('Dismiss Prompt dialog', async() => {
        await expect(dialogsPage.prompText).toContainText('');
        await dialogsPage.promptDialog(false);
        await expect(dialogsPage.prompText).toContainText("You clicked Cancel. 'prompt' returned");
        await expect(dialogsPage.confirmReturn).toBeNull;
    });
});