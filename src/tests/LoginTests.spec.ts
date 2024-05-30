import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { OrdersPage } from "../pages/OrdersPage";
import { Header } from "../components/Header";
import { ClientsPage } from "../pages/ClientsPage";
import { ProductsPage } from "../pages/ProductsPage";
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
        await expect(currentDialog).toBe(expectedDialog);
    });

    test('Wrong Login - Empty fields', async ({ page }) => {
        
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
        await expect(currentDialog).toBe(expectedDialog);
    });

    test('Wrong Login - Empty email', async ({ page }) => {
        
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
        await expect(currentDialog).toBe(expectedDialog);
    });

    test('Wrong Login - Empty password', async ({ page }) => {
        
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
        await expect(currentDialog).toBe(expectedDialog);
    });

    test('Wrong Login - Wrong credentials', async ({ page }) => {
        
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
        await expect(currentDialog).toBe(expectedDialog);
    });
});