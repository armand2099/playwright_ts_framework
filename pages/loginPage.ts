import {type Locator, type Page, expect} from "@playwright/test";
import { BasePage } from "./basePage";
import creds from "../utils/credentials"; //Imports page credentials


export class LoginPage extends BasePage{ //Class inherits from BasePage
    /*Login Page methods and attributes*/

    //Variables
    readonly page: Page;
    readonly FORM_NAME: Locator;
    readonly USERNAME: Locator;
    readonly PASSWORD: Locator;
    readonly SIGNIN_BTN: Locator;
    readonly REMEMBER_BOX: Locator;
    readonly TWITTER_ICON: Locator;
    readonly FACEBOOK_ICON: Locator;
    readonly INSTA_ICON: Locator;

    constructor (page: Page){
        
        super(page);

        this.page = page;

        //Declare page elements locators
        this.FORM_NAME =  page.getByText("Login Form")
        this.USERNAME = page.getByPlaceholder("Enter your username")
        this.PASSWORD = page.getByPlaceholder("Enter your password")
        this.SIGNIN_BTN = page.getByText("Sign In")
        this.REMEMBER_BOX = page.getByLabel("Remember Me")
        this.TWITTER_ICON = page.locator('img[src="img/social-icons/twitter.png"]')
        this.FACEBOOK_ICON = page.locator('img[src="img/social-icons/facebook.png"]')
        this.INSTA_ICON = page.locator('img[src="img/social-icons/linkedin.png"]')
    }

    async enterUsername(username:string = creds.local.username):Promise<void>{
        /*Fills Login page Username textbox        */
        await this.fillElement(this.USERNAME, username);

    } 

    async enterPassword(password:string = creds.local.password):Promise<void>{
        /*Fills Login page Username textbox        */
        await this.fillElement(this.PASSWORD, password);

    }

    async checkRememberBox(check: boolean = true):Promise<void>{
        /*Checks the Remember Me Box*/
        if (!await this.REMEMBER_BOX.isChecked() && check){
            await this.clickElement(this.REMEMBER_BOX);
        }else if(await this.REMEMBER_BOX.isChecked() && !check){
            await this.clickElement(this.REMEMBER_BOX);
        }

        console.log("Checkbox: " + await this.REMEMBER_BOX.getAttribute('id') + " checked");
    }

    async clickSignin():Promise<void>{
        /*Clicks the Singn In button*/
        await this.clickElement(this.SIGNIN_BTN);
        await this.page.waitForLoadState('load');
    }

    async login(username = creds.local.username, password = creds.local.password):Promise<void>{
        /*Executes the complete login procress*/

        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickSignin();
        expect(await this.getPageTitle()).toContain("ACME demo app")

    }

}