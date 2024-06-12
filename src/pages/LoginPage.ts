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
    private emailError: Locator;
    private passwordError: Locator;
    private loginError: Locator;

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
        this.emailError = this.locator("[id='email'] + [class='error']");
        this.passwordError = this.locator("[id='password'] + [class='error']");
        this.loginError = this.locator("form > [class='error']");
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

    async isLoginButtonEnabled(): Promise<boolean> {
        try {
            this.logger.info("Checking if Login button is enabled")
            return await this.loginButton.isEnabled();
        } catch (error) {
            this.logger.info(`Error while checking if Login button is enabled: ${error}`);
            return false;
        }
    }

    async doLoginProcess(email: string, password: string): Promise<void> {
        this.logger.info("Doing Login process");

        await this.inputEmail(email);

        await this.inputPassword(password);

        await this.clickLogin();
    }

    async getEmailError(): Promise<string> {
        this.logger.info("Getting the Email error message");
        await this.emailError.waitFor( {state: "attached"} );
        return await this.emailError.textContent() as string;
    }

    async getPasswordError(): Promise<string> {
        this.logger.info("Getting the Password error message");
        await this.passwordError.waitFor( {state: "attached"} );
        return await this.passwordError.textContent() as string;
    }

    async getLoginError(): Promise<string> {
        this.logger.info("Getting the Login error message");
        await this.loginError.waitFor( {state: "attached"} );
        return await this.loginError.textContent() as string;
    }

    getLoginErrorLocator(): Locator {
        return this.loginError;
    }
}