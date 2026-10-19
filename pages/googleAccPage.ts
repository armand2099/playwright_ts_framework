import {type Locator, type Page, type Dialog, expect} from "@playwright/test";
import { BasePage } from "./basePage";
import creds from "../auth/googleCredentials"; //Imports page credentials


export class GoogleAccPage extends BasePage{
    /*Google Accout Page methods and attributes*/

    //Variable declaration
    readonly page: Page;
    readonly email: Locator;
    readonly nextButton: Locator;
    readonly password: Locator;

    constructor (page: Page){
        super(page);
        this.page = page

        //Page elements locators
        this.email = this.page.getByLabel("Email or phone");
        this.nextButton = this.page.getByText("Next");
        this.password = this.page.getByLabel("Enter your password");
    }

    async enterEmail(email: string = creds.google.email){
        /*Enter email*/
        await this.email.fill(email);
    }

    async enterPassword(password: string = creds.google.password){
        /*Enter password*/
        await this.password.fill(password);
    }

    async clickNextButton(){
        /*Click next button*/
        await this.nextButton.click();
    }

}