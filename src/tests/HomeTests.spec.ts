import test, { expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { LoginHelper } from "../helpers/LoginHelper";
import { Screenshoter } from "../helpers/Screenshoter";
import { ClientsPage } from "../pages/ClientsPage";
import { HomePage } from "../pages/HomePage";
import { OrdersPage } from "../pages/OrdersPage";
import { ProductsPage } from "../pages/ProductsPage";

test.beforeEach(async ({ page}) => {
    const email = process.env.CORRECT_EMAIL as string;
    const password = process.env.CORRECT_PASSWORD as string;
    await LoginHelper.doLogin(email, password, page);

    const homePage = new HomePage(page);    
    await page.goto(homePage.getURL());
});

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === "failed") {
        const addTimeStamp = true;
        await Screenshoter.TakeScreenshot(page, testInfo.title, addTimeStamp);
    }
});

test.describe('Home Page Tests', {tag: ['@home-page', '@full-regression']}, () => {
    test('Orders button', async ({ page }) => {
        await allure.description("Test that 'Orders' button in Home Page works. Before this test starts it already logged in and navigated to Home Page");
        await allure.tags("Home Page", "Full Regression");
        //Arrange

        //Act
        const homePage = new HomePage(page);    
        await allure.step("Step 1 - Click Orders button", async () => {
            await homePage.clickOrders();
        });
        
        //Assert
        const ordersPage = new OrdersPage(page);

        await allure.step("Check that the expected page loaded", async () => {
            await expect(page).toHaveURL(ordersPage.getURL());
        });
    });

    test('Clients button', async ({ page }) => {
        await allure.description("Test that 'Clients' button in Home Page works. Before this test starts it already logged in and navigated to Home Page");
        await allure.tags("Home Page", "Full Regression");
        //Arrange

        //Act
        const homePage = new HomePage(page);    

        await allure.step("Step 1 - Click Clients button", async () => {
            await homePage.clickClients();
        });
        
        //Assert
        const clientsPage = new ClientsPage(page);

        await allure.step("Check that the expected page loaded", async () => {
            await expect(page).toHaveURL(clientsPage.getURL());
        });
    });

    test('Products button', async ({ page }) => {
        await allure.description("Test that 'Products' button in Home Page works. Before this test starts it already logged in and navigated to Home Page");
        await allure.tags("Home Page", "Full Regression");
        //Arrange

        //Act
        const homePage = new HomePage(page);    

        await allure.step("Step 1 - Click Products button", async () => {
            await homePage.clickProducts();        
        });

        //Assert
        const productsPage = new ProductsPage(page);

        await allure.step("Check that the expected page loaded", async () => {
            await expect(page).toHaveURL(productsPage.getURL());
        });
    });

    test('UPS button', async ({ page }) => {
        await allure.description("Test that 'UPS' button in Home Page works. Before this test starts it already logged in and navigated to Home Page");
        await allure.tags("Home Page", "Full Regression");

        //Arrange
        const pagePromise = page.context().waitForEvent('page');

        //Act
        const homePage = new HomePage(page);    

        await allure.step("Step 1 - Click UPS button", async () => {
            await homePage.clickUPS();        
        });

        //Assert
        const newPage = await pagePromise;

        await allure.step("Check that the expected page loaded", async () => {
            await expect(newPage).toHaveURL(homePage.getUpsURL());
        });
    });

    test('FedEx button', async ({ page }) => {
        await allure.description("Test that 'FedEx' button in Home Page works. Before this test starts it already logged in and navigated to Home Page");
        await allure.tags("Home Page", "Full Regression");

        //Arrange
        const pagePromise = page.context().waitForEvent('page');

        //Act
        const homePage = new HomePage(page);    

        await allure.step("Step 1 - Click FedEx button", async () => {
            await homePage.clickFedEx();        
        });

        //Assert
        const newPage = await pagePromise;

        await allure.step("Check that the expected page loaded", async () => {
            await expect(newPage).toHaveURL(homePage.getFedExURL());
        });
    });
});