import test, { expect } from "@playwright/test";
import {HomePage} from "../pages/HomePage";
import { OrdersPage } from "../pages/OrdersPage";
import { ClientsPage } from "../pages/ClientsPage";
import { ProductsPage } from "../pages/ProductsPage";
import { allure } from "allure-playwright";
import { Screenshoter } from "../helpers/Screenshoter";
import { ProductsListPage } from "../pages/ProductsListPage";
import { ColorsListPage } from "../pages/ColorsListPage";
import { LoginPage } from "../pages/LoginPage";

test.beforeEach(async ({ page}) => {
    const email = process.env.CORRECT_EMAIL as string;
    const password = process.env.CORRECT_PASSWORD as string;

    page.on('dialog', async (dialog) => {
        console.log("Login dialogue popup: " + dialog.message());
        await dialog.accept();
    });

    const loginPage = new LoginPage(page);
    await page.goto(loginPage.getURL());

    await loginPage.doLoginProcess(email, password);    

    await page.waitForEvent('dialog');
});

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === "failed") {
        const addTimeStamp = true;
        await Screenshoter.TakeScreenshot(page, testInfo.title, addTimeStamp);
    }
});

test.describe('Products Page Tests', {tag: ['@products-page', '@full-regression']}, () => {
    test('Products List button', async ({ page }) => {
        //Arrange
    
        //Act
        const homePage = new HomePage(page);    
        await allure.step("Step 1 - Navigate to Home Page", async () => {
            await page.goto(homePage.getURL());
        });
    
        await allure.step("Step 2 - Click Products button", async () => {
            await homePage.clickProducts();
        });
    
        const productsPage = new ProductsPage(page);
        await allure.step("Step 3 - Click Products List button", async () => {
            await productsPage.clickProductsList();
        });
        
        //Assert
        const productsListPage = new ProductsListPage(page);
        await expect(page).toHaveURL(productsListPage.getURL());
    });
    
    test('Colors List button', async ({ page }) => {
        //Arrange
    
        //Act
        const homePage = new HomePage(page);    
        await allure.step("Step 1 - Navigate to Home Page", async () => {
            await page.goto(homePage.getURL());
        });
    
        await allure.step("Step 2 - Click Clients button", async () => {
            await homePage.clickProducts();
        });
        
        const productsPage = new ProductsPage(page);
        await allure.step("Step 3 - Click Colors List button", async () => {
            await productsPage.clickColorsList();
        });
        
        //Assert
        const colorsListPage = new ColorsListPage(page);
        await expect(page).toHaveURL(colorsListPage.getURL());
    });
});
