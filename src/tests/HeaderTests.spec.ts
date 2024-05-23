import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { OrdersPage } from "../pages/OrdersPage";
import { Header } from "../components/Header";
import { ClientsPage } from "../pages/ClientsPage";
import { ProductsPage } from "../pages/ProductsPage";
import { allure } from "allure-playwright";
import { Screenshoter } from "../helpers/Screenshoter";

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === "failed") {
        const addTimeStamp = true;
        await Screenshoter.TakeScreenshot(page, testInfo.title, addTimeStamp);
    }
});

test.describe('Header Tests', () => {
    test('Home button', async ({ page }) => {

        //Arrange

        //Act
        const ordersPage = new OrdersPage(page);
        await allure.step("Step 1 - Go to Orders Page", async () => {        
            await page.goto(ordersPage.getURL());
        });

        const header = new Header(page);
        await allure.step("Step 2 - Click Home button", async () => {        
            await header.clickHome();
        });    

        //Assert
        const home = new HomePage(page);    
        await expect(page).toHaveURL(home.getURL());
    });

    test('Orders button', async ({ page }) => {

        //Arrange

        //Act
        const home = new HomePage(page);    
        await allure.step("Step 1 - Go to Home Page", async () => {
            await page.goto(home.getURL());
        }); 
        
        const header = new Header(page);
        await allure.step("Step 2 - Click Orders button", async () => {
            await header.clickOrders();
        });
        
        //Assert
        const ordersPage = new OrdersPage(page);
        await expect(page).toHaveURL(ordersPage.getURL());
    });

    test('Clients button', async ({ page }) => {

        //Arrange

        //Act
        const home = new HomePage(page);    
        await allure.step("Step 1 - Go to Home Page", async () => {
            await page.goto(home.getURL());       
        });
        
        const header = new Header(page);
        await allure.step("Step 2 - Click Clients button", async () => {
            await header.clickClients();
        });
        
        //Assert
        const clientsPage = new ClientsPage(page);
        await expect(page).toHaveURL(clientsPage.getURL());
    });

    test('Products button', async ({ page }) => {

        //Arrange

        //Act
        const home = new HomePage(page);    
        await allure.step("Step 1 - Go to Home Page", async () => {
            await page.goto(home.getURL());
        })
        
        const header = new Header(page);
        await allure.step("Step 2 - Click Products button", async () => {
            await header.clickProducts();
        })
        
        //Assert
        const productsPage = new ProductsPage(page);
        await expect(page).toHaveURL(productsPage.getURL());
    });
});