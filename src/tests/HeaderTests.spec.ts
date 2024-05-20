import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { OrdersPage } from "../pages/OrdersPage";
import { Header } from "../components/Header";
import { ClientsPage } from "../pages/ClientsPage";
import { ProductsPage } from "../pages/ProductsPage";
import { allure } from "allure-playwright";

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === "failed") {

        const testName = testInfo.title;
        const time = new Date().toJSON();
        const screenshotName = testName.concat(time.toString(), ".jpeg");

        await allure.attachment(screenshotName, await page.screenshot(), {
            contentType: "image/jpeg",
        });
    }
});

test('Header "Home" button', async ({ page }) => {

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

test('Header "Orders" button', async ({ page }) => {

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

test('Header "Clients" button', async ({ page }) => {

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

test('Header "Products" button', async ({ page }) => {

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