import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import dotenv from 'dotenv'; 
import { URLAssembler } from "../helpers/URLAssembler";
dotenv.config();

/**
 * Class for Login Page.
 */
export class LoginPage extends BasePage{

    private emailField: Locator;
    private passwordField: Locator;
    private loginButton: Locator;

    /**
     * Class constructor.
     * @param page 
     */
    constructor(page: Page) {
        super(page);
        const baseURl = process.env.BASE_URL as string;
        this.pageRoute = "login";
        this.pageCompleteURL = URLAssembler.getAssembledURL(baseURl, this.pageRoute);

        this.emailField = this.locator("[id='email']");
        this.passwordField = this.locator("[id='password']");
        this.loginButton = this.locator("[class='btn-login']");
    }

    async inputEmail(email: string): Promise<void> {
        this.logger.info(`Writing email: ${email}`);
        await this.emailField.waitFor({state: "attached"});
        await this.emailField.fill(email);
    }

    async inputPassword(password: string): Promise<void> {
        this.logger.info(`Writing password: ${password}`);
        await this.passwordField.waitFor({state: "attached"});
        await this.passwordField.fill(password);
    }

    async clickLogin(): Promise<void> {
        this.logger.info("Clicking Login button");
        await this.loginButton.waitFor({state: "attached"});
        await this.loginButton.click();
    }

    async doLoginProcess(email: string, password: string): Promise<void> {
        this.logger.info("Doing Login process");

        await this.inputEmail(email);

        await this.inputPassword(password);

        await this.clickLogin();
    }
}