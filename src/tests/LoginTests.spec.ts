import test, { expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { Screenshoter } from "../helpers/Screenshoter";
import { LoginPage } from "../pages/LoginPage";

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === "failed") {
        const addTimeStamp = true;
        await Screenshoter.TakeScreenshot(page, testInfo.title, addTimeStamp);
    }
});

test.describe('Login Page Tests', {tag: ['@login-page', '@full-regression', '@smoke']}, () => {
    test('Correct Login', async ({ page }) => {
        await allure.description("Test of 'Login' functionality. This test attempts to do the login procedure with valid credentials.");
        await allure.tags("Login Page", "Full Regression", "Smoke");
        
        //Arrange
        const email = process.env.CORRECT_EMAIL as string;
        const password = process.env.CORRECT_PASSWORD as string;

        const expectedDialog = "exito";
        let currentDialog = "";

        page.on('dialog', async (dialog) => {
            currentDialog = dialog.message();
            console.log("At dialogue popup: " + currentDialog);
            await dialog.accept();
        });

        //Act - Do login
        const loginPage = new LoginPage(page);
        await allure.step("Step 1 - Go to Login Page", async () => {
            await page.goto(loginPage.getURL());
        });

        await allure.step("Step 2 - Input email", async () => {
            await loginPage.inputEmail(email);
        });

        await allure.step("Step 3 - Input password", async () => {
            await loginPage.inputPassword(password);
        });

        await allure.step("Step 4 - Click Login button", async () => {
            await loginPage.clickLogin();
            await page.waitForEvent('dialog');
        });

        //Assert
        await allure.step("Check that the Success message appears", async () => {
            await expect(currentDialog).toBe(expectedDialog);
        });
    });

    test('Wrong Login - Empty fields', async ({ page }) => {
        await allure.description("Test of 'Login' functionality. This test attempts to do the login procedure leaving the email and password fields empty. It will fail if the login is performed correctly.");
        await allure.tags("Login Page", "Full Regression", "Smoke");
        
        //Arrange
        const expectedDialog = "noup";
        let currentDialog = "";

        page.on('dialog', async (dialog) => {
            currentDialog = dialog.message();
            console.log("At dialogue popup: " + currentDialog);
            await dialog.accept();
        });

        //Act - Do login
        const loginPage = new LoginPage(page);
        await allure.step("Step 1 - Go to Login Page", async () => {
            await page.goto(loginPage.getURL());
        });

        await allure.step("Step 2 - Click Login button", async () => {
            loginPage.clickLogin();
            await page.waitForEvent('dialog');
        });

        //Assert        
        await allure.step("Check that the Failure message appears", async () => {
            await expect(currentDialog).toBe(expectedDialog);
        });
    });

    test('Wrong Login - Empty email', async ({ page }) => {
        await allure.description("Test of 'Login' functionality. This test attempts to do the login procedure leaving the email field empty. It will fail if the login is performed correctly.");
        await allure.tags("Login Page", "Full Regression", "Smoke");
        
        //Arrange
        const password = "asd";

        const expectedDialog = "noup";
        let currentDialog = "";

        page.on('dialog', async (dialog) => {
            currentDialog = dialog.message();
            console.log("At dialogue popup: " + currentDialog);
            await dialog.accept();
        });


        //Act - Do login
        const loginPage = new LoginPage(page);
        await allure.step("Step 1 - Go to Login Page", async () => {
            await page.goto(loginPage.getURL());
        });

        await allure.step("Step 2 - Input password", async () => {
            await loginPage.inputPassword(password);
        });

        await allure.step("Step 3 - Click Login button", async () => {
            await loginPage.clickLogin();
            await page.waitForEvent('dialog');
        });

        //Assert        
        await allure.step("Check that the Failure message appears", async () => {
            await expect(currentDialog).toBe(expectedDialog);
        });
    });

    test('Wrong Login - Empty password', async ({ page }) => {
        await allure.description("Test of 'Login' functionality. This test attempts to do the login procedure leaving the password field empty. It will fail if the login is performed correctly.");
        await allure.tags("Login Page", "Full Regression", "Smoke");
        
        //Arrange
        const email = "asd@asd";

        const expectedDialog = "noup";
        let currentDialog = "";

        page.on('dialog', async (dialog) => {
            currentDialog = dialog.message();
            console.log("At dialogue popup: " + currentDialog);
            await dialog.accept();
        });

        //Act - Do login
        const loginPage = new LoginPage(page);
        await allure.step("Step 1 - Go to Login Page", async () => {
            await page.goto(loginPage.getURL());
        });

        await allure.step("Step 2 - Input email", async () => {
            await loginPage.inputEmail(email);
        });

        await allure.step("Step 3 - Click Login button", async () => {
            await loginPage.clickLogin();
            await page.waitForEvent('dialog');
        });

        //Assert        
        await allure.step("Check that the Failure message appears", async () => {
            await expect(currentDialog).toBe(expectedDialog);
        });
    });

    test('Wrong Login - Wrong credentials', async ({ page }) => {
        await allure.description("Test of 'Login' functionality. This test attempts to do the login procedure using invalid credentials. It will fail if the login is performed correctly.");
        await allure.tags("Login Page", "Full Regression", "Smoke");
        
        //Arrange
        const email = "asd@asd";
        const password = "asd";

        const expectedDialog = "noup";
        let currentDialog = "";

        page.on('dialog', async (dialog) => {
            currentDialog = dialog.message();
            console.log("At dialogue popup: " + currentDialog);
            await dialog.accept();
        });


        //Act - Do login
        const loginPage = new LoginPage(page);
        await allure.step("Step 1 - Go to Login Page", async () => {
            await page.goto(loginPage.getURL());
        });

        await allure.step("Step 2 - Input email", async () => {
            await loginPage.inputEmail(email);
        });

        await allure.step("Step 3 - Input password", async () => {
            await loginPage.inputEmail(password);
        });

        await allure.step("Step 4 - Click Login button", async () => {
            await loginPage.clickLogin();
            await page.waitForEvent('dialog');
        });

        //Assert        
        await allure.step("Check that the Failure message appears", async () => {
            await expect(currentDialog).toBe(expectedDialog);
        });
    });
});