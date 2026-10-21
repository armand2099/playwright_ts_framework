import {type Locator, type Page, expect} from "@playwright/test";
import { BasePage } from "./basePage";
import creds from "../auth/credentials"; //Imports page credentials


export class LoginPage extends BasePage{ //Class inherits from BasePage
    /*Login Page methods and attributes*/

    //Variables
    readonly page: Page;
    readonly formName: Locator;
    readonly username: Locator;
    readonly password: Locator;
    readonly signInBtn: Locator;
    readonly rememberBox: Locator;
    readonly twitterIcon: Locator;
    readonly facebookIcon: Locator;
    readonly instaIcon: Locator;

    constructor (page: Page){
        
        super(page);

        this.page = page;

        //Declare page elements locators
        this.formName =  page.getByText("Login Form");
        this.username = page.getByPlaceholder("Enter your username");
        this.password = page.getByPlaceholder("Enter your password");
        this.signInBtn = page.getByText("Sign In");
        this.rememberBox = page.getByLabel("Remember Me");
        this.twitterIcon = page.locator('img[src="img/social-icons/twitter.png"]');
        this.facebookIcon = page.locator('img[src="img/social-icons/facebook.png"]');
        this.instaIcon = page.locator('img[src="img/social-icons/linkedin.png"]');
    }

    async enterUsername(username:string = creds.local.username):Promise<void>{
        /*Fills Login page Username textbox        */
        await this.fillElement(this.username, username);

    } 

    async enterPassword(password:string = creds.local.password):Promise<void>{
        /*Fills Login page Username textbox        */
        await this.fillElement(this.password, password);

    }

    async checkRememberBox(check: boolean = true):Promise<void>{
        /*Checks the Remember Me Box*/
        if (!await this.rememberBox.isChecked() && check){
            await this.clickElement(this.rememberBox);
        }else if(await this.rememberBox.isChecked() && !check){
            await this.clickElement(this.rememberBox);
        }

        console.log("Checkbox: " + await this.rememberBox.getAttribute('id') + " checked");
    }

    async clickSignin():Promise<void>{
        /*Clicks the Singn In button*/
        await this.clickElement(this.signInBtn);
        await this.page.waitForLoadState('load');
    }

}