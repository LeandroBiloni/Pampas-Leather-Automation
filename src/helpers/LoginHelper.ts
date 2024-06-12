import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

export class LoginHelper {
    static async doLogin(email: string, password: string, page: Page): Promise<void> {
        // page.once('dialog', async (dialog) => {
        //     console.log("Login dialogue popup: " + dialog.message());
        //     await dialog.accept();
        // });

        const loginPage = new LoginPage(page);
        await page.goto(loginPage.getURL());

        await loginPage.doLoginProcess(email, password);

        //await page.waitForEvent('dialog');

        const homePage = new HomePage(page);
        await page.waitForURL(homePage.getURL());
    }
}
