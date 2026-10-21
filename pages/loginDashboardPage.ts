import {type Locator, type Page, expect} from "@playwright/test";
import { BasePage } from "./basePage";

export class LoginDashboardPage extends BasePage{
    /*Login Dashboard Page methods and attributes*/

    //Variables
    readonly page: Page;
    readonly loggedUserName: Locator;

    constructor (page: Page){
        super(page);

        this.page = page;

        //Declare page elements locators
        this.loggedUserName = page.locator('div.logged-user-name');

    }
}