import {type Locator, type Page, type BrowserContext} from "@playwright/test";
import { BasePage } from "./basePage";


export class NewWindowPage extends BasePage{
    /*New Window Page methods and attributes*/

    //Variables

    readonly page: Page;
    readonly context: BrowserContext;
    readonly newTabButton: Locator;
    readonly newWindowButton: Locator;
    readonly newWinMsgButton: Locator;

    constructor (page: Page, context: BrowserContext){
        super(page);
        
        this.page = page;
        this.context = context;

        //Declare page elements locators
        this.newTabButton = page.getByRole('button', {name: 'New Tab'});
        this.newWindowButton = page.getByRole('button', {name: 'New Window', exact: true});
        this.newWinMsgButton = page.getByRole('button', {name: 'New Window Message'});

    }

    async newPage(pageBtn: Locator):Promise<Page>{
        /*Clicks the required button, waits for the new page to load and returns the new tab page object*/
        const pagePromise = this.context.waitForEvent('page');
        let newTab: Page;
        let reTry = 0;

        do {
            await pageBtn.click();
            reTry++;
        
            newTab = await pagePromise;
            
            await newTab.waitForLoadState("domcontentloaded");
            await newTab.waitForSelector('body');
        } while (newTab.isClosed() && reTry < 5);

        return newTab;

    }

}