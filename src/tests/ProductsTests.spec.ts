import test, { expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { LoginHelper } from "../helpers/LoginHelper";
import { Screenshoter } from "../helpers/Screenshoter";
import { ColorsListPage } from "../pages/ColorsListPage";
import { ProductsListPage } from "../pages/ProductsListPage";
import { ProductsPage } from "../pages/ProductsPage";

test.beforeEach(async ({ page}) => {
    const email = process.env.CORRECT_EMAIL as string;
    const password = process.env.CORRECT_PASSWORD as string;
    await LoginHelper.doLogin(email, password, page);

    const productsPage = new ProductsPage(page);
    await page.goto(productsPage.getURL());
});

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === "failed") {
        const addTimeStamp = true;
        await Screenshoter.TakeScreenshot(page, testInfo.title, addTimeStamp);
    }
});

test.describe('Products Page Tests', {tag: ['@products-page', '@full-regression']}, () => {
    test('Products List button', async ({ page }) => {
        await allure.description("Test that 'Products List' button in Products Page works. Before this test starts it already logged in and navigated to Products Page.");
        await allure.tags("Products Page", "Full Regression");
        //Arrange
    
        //Act
        const productsPage = new ProductsPage(page);
        await allure.step("Step 1 - Click Products List button", async () => {
            await productsPage.clickProductsList();
        });
        
        //Assert
        const productsListPage = new ProductsListPage(page);
        await allure.step("Check that the expected page loaded", async () => {
            await expect(page).toHaveURL(productsListPage.getURL());
        });
    });
    
    test('Colors List button', async ({ page }) => {
        await allure.description("Test that 'Colors List' button in Products Page works. Before this test starts it already logged in and navigated to Products Page.");
        await allure.tags("Products Page", "Full Regression");
        //Arrange
    
        //Act
        const productsPage = new ProductsPage(page);
        await allure.step("Step 1 - Click Colors List button", async () => {
            await productsPage.clickColorsList();
        });
        
        //Assert
        const colorsListPage = new ColorsListPage(page);
        await allure.step("Check that the expected page loaded", async () => {
            await expect(page).toHaveURL(colorsListPage.getURL());
        });
    });
});
