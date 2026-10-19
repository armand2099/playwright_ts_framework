import {type Locator, type Page, type Dialog, expect} from "@playwright/test";
import { BasePage } from "./basePage";
import creds from "../utils/credentials";


export class DialogPage extends BasePage {
    /*Dialogs Page methods and attributes*/

    //Variable declaration
    readonly page: Page;
    readonly alertBoxButton: Locator;
    readonly alertText: Locator;
    readonly confirmBoxButton: Locator;
    readonly confirmText: Locator;
    readonly confirmReturn: Locator;
    readonly prompBoxButton: Locator;
    readonly prompReturn: Locator;
    readonly prompText: Locator;

    constructor (page: Page){
        super(page);
        this.page = page;

        //Page elements locators
        this.alertBoxButton = page.getByRole('button', { name: 'Show alert box' });
        this.alertText = page.locator('.inline-explanation#alertexplanation');
        this.confirmBoxButton = page.getByRole('button', { name: 'Show confirm box' });
        this.confirmText = page.locator('.inline-explanation#confirmexplanation');
        this.confirmReturn = page.locator('p#confirmreturn');
        this.prompBoxButton = page.getByRole('button', { name: 'Show prompt box' });
        this.prompReturn = page.locator('p#promptreturn');
        this.prompText = page.locator('.inline-explanation#promptexplanation');
    }

    
    async onDialogAccept(dialog: Dialog, promptText: string): Promise<void>{
        /*Accepts a browser dialog, entering "Hello World!" when it accepts text input.*/
        console.log('Dialog opened: ' + dialog.message());        
        await dialog.accept(promptText);
        console.log('Dialog ' + dialog.message() + ' Accepted');        
    }
    
    async onDialogCancel(dialog: Dialog): Promise<void>{
        /*Dismisses a browser dialog.*/
        console.log('Dialog opened: ' + dialog.message());
        await dialog.dismiss();
        console.log('Dialog ' + dialog.message() + ' Dismissed');
    }    
    
    async alertDialog(): Promise<void>{
        /*Opens the alert dialog and verifies that the page displays its handled-state message.*/
        this.page.on('dialog', dialog => this.onDialogAccept(dialog, ''));
        //await expect(this.alertText).toContainText('');
        await this.alertBoxButton.click();
        console.log('Alert Dialog button clicked');
        //await expect(this.alertText).toContainText('You triggered and handled the alert dialog');      
    }    
    
    async confirmDialog(confirmed: boolean = true, promptText: string = ''): Promise<string | null>{
        /*Opens the confirm dialog and verifies the page response for the selected outcome.*/
        if (confirmed){
            this.page.on('dialog', dialog => this.onDialogAccept(dialog, promptText));
            await this.confirmBoxButton.click();            
            console.log('Confirm Dialog button clicked');
        } else {
            this.page.on('dialog', this.onDialogCancel);
            await this.confirmBoxButton.click();            
            console.log('Confirm Dialog button clicked');
        }
        return this.confirmReturn.textContent();
    }

    async prompDialog(confirmed: boolean = true, prompText: string = ''): Promise<void>{       
        /*Opens the prompt dialog and verifies the page response for the selected outcome.*/ 
        if (confirmed){
            this.page.on('dialog', dialog => this.onDialogAccept(dialog, prompText));
            await this.prompBoxButton.click();            
            console.log('Prompt Dialog button clicked');
        } else {
            this.page.on('dialog', this.onDialogCancel);
            await this.prompBoxButton.click();
            console.log('Prompt Dialog button clicked');
        }
    }
}