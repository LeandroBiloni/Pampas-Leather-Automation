import test, { expect } from "@playwright/test";
import {HomePage} from "../pages/HomePage";
import { OrdersPage } from "../pages/OrdersPage";
import { ClientsPage } from "../pages/ClientsPage";
import { ProductsPage } from "../pages/ProductsPage";
import { allure } from "allure-playwright";
import { Screenshoter } from "../helpers/Screenshoter";
import { LoginPage } from "../pages/LoginPage";
import { LoginHelper } from "../helpers/LoginHelper";

test.beforeEach(async ({ page}) => {
    const email = process.env.CORRECT_EMAIL as string;
    const password = process.env.CORRECT_PASSWORD as string;
    await LoginHelper.doLogin(email, password, page);
});

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === "failed") {
        const addTimeStamp = true;
        await Screenshoter.TakeScreenshot(page, testInfo.title, addTimeStamp);
    }
});

test.describe('Home Page Tests', {tag: ['@home-page', '@full-regression']}, () => {
    test('Orders button', async ({ page }) => {
        await allure.tags("Home Page", "Full Regression");
        //Arrange

        //Act
        const homePage = new HomePage(page);    
        await allure.step("Step 1 - Navigate to Home Page", async () => {
            await page.goto(homePage.getURL());
        });

        await allure.step("Step 2 - Click Orders button", async () => {
            await homePage.clickOrders();
        });
        
        //Assert
        const ordersPage = new OrdersPage(page);
        await expect(page).toHaveURL(ordersPage.getURL());
    });

    test('Clients button', async ({ page }) => {
        await allure.tags("Home Page", "Full Regression");
        //Arrange

        //Act
        const homePage = new HomePage(page);    
        await allure.step("Step 1 - Navigate to Home Page", async () => {
            await page.goto(homePage.getURL());
        });

        await allure.step("Step 2 - Click Clients button", async () => {
            await homePage.clickClients();
        });
        
        //Assert
        const clientsPage = new ClientsPage(page);
        await expect(page).toHaveURL(clientsPage.getURL());
    });

    test('Products button', async ({ page }) => {
        await allure.tags("Home Page", "Full Regression");
        //Arrange

        //Act
        const homePage = new HomePage(page);    
        await allure.step("Step 1 - Navigate to Home Page", async () => {
            await page.goto(homePage.getURL());
        });

        await allure.step("Step 2 - Click Products button", async () => {
            await homePage.clickProducts();        
        });

        //Assert
        const productsPage = new ProductsPage(page);
        await expect(page).toHaveURL(productsPage.getURL());
    });

    test('UPS button', async ({ page }) => {
        await allure.tags("Home Page", "Full Regression");
        //Arrange

        //Act
        const homePage = new HomePage(page);    
        await allure.step("Step 1 - Navigate to Home Page", async () => {
            await page.goto(homePage.getURL());
        });

        await allure.step("Step 2 - Click UPS button", async () => {
            await homePage.clickUPS();        
        });
        //Assert
        await expect(page).toHaveURL(homePage.getUpsURL());
    });

    test('FedEx button', async ({ page }) => {
        await allure.tags("Home Page", "Full Regression");
        //Arrange

        //Act
        const homePage = new HomePage(page);    
        await allure.step("Step 1 - Navigate to Home Page", async () => {
            await page.goto(homePage.getURL());
        });

        await allure.step("Step 2 - Click FedEx button", async () => {
            await homePage.clickFedEx();        
        });

        //Assert
        await expect(page).toHaveURL(homePage.getFedExURL());
    });
});