import { type Page, type ElementHandle, type Locator } from '@playwright/test';


export class BasePage {
    /*Class containing functions common to the whole project*/
    
    //Variable declaration
    readonly page:Page;


    constructor (page: Page){

        this.page = page;

    }

    //Methods
    async waitElement(selector: string, timeout: number = 10_000, state: 'attached' | 'detached' | 'visible' | 'hidden' = 'visible',): Promise<ElementHandle | null>{
        /*Waits for an element to be attached | detached | visible | hidden and then returns the element*/
        let element: ElementHandle | null;
        try {
            //Waits for an element to be visible
            element = await this.page.waitForSelector(selector, { state: state, timeout: timeout});
            await element?.scrollIntoViewIfNeeded();
            console.log("Element: " + await element?.getAttribute('id') + "is " + state);
        }catch (error) {
            console.error("Playwright error while waiting for element: ", error);

            throw error; //Propagates the error
        }
        
        return element;

    }

    /*I'm aware that Playwright is very good at handeling wait timemes befor actions. These methods are only to 
    exemplify how can we wrap actions for troublesome environmnents in case that is needed*/
    async getPageTitle(): Promise<string> {
        /* Returns the current page tittle*/

        await this.page.waitForLoadState('load');
        let page_title = await this.page.title();
        console.log("Page title: ", page_title);
        return page_title;
    }

    async getPageUrl(): Promise<string> {
        /* Returns the current page url*/

        await this.page.waitForLoadState('load');
        let page_url = await this.page.url();
        console.log("Page url: ", page_url);
        return page_url;
    }

    async clickElement(element: Locator): Promise <void> {
        /*Clicks on an element*/
        let elementName: string | null;
        
        try {
            elementName = await element.getAttribute('id');

            await element.waitFor({ state: 'visible'});
            await element.click();

            console.log('Element: ' + elementName + " Clicked");
        } catch (error){
            console.error("Playwright error while waiting for element: ", error);

            throw error;
        }
    }

    async fillElement(element: Locator, text: string): Promise <void> {
        /*Fills on an element*/
        let elementName: string | null;
        
        try {
            elementName = await element.getAttribute('id');

            await element.waitFor({ state: 'visible'});
            await element.fill(text);

            console.log('Element: ' + elementName + " Filled with text: " + text);
        } catch (error){
            console.error("Playwright error while waiting for element: ", error);

            throw error;
        }
    }


    
}
    