import test, { expect } from "@playwright/test";
import {HomePage} from "../pages/HomePage";
import { OrdersPage } from "../pages/OrdersPage";
import { ClientsPage } from "../pages/ClientsPage";
import { ProductsPage } from "../pages/ProductsPage";

test('Home "Orders" button', async ({ page }) => {
    //Arrange

    //Act
    const homePage = new HomePage(page);    
    await page.goto(homePage.getURL());
    await homePage.clickOrders();
    
    //Assert
    const ordersPage = new OrdersPage(page);
    await expect(page).toHaveURL(ordersPage.getURL());
});

test('Home "Clients" button', async ({ page }) => {
    //Arrange

    //Act
    const homePage = new HomePage(page);    
    await page.goto(homePage.getURL());
    await homePage.clickClients();
    
    //Assert
    const clientsPage = new ClientsPage(page);
    await expect(page).toHaveURL(clientsPage.getURL());
});

test('Home "Products" button', async ({ page }) => {
    //Arrange

    //Act
    const homePage = new HomePage(page);    
    await page.goto(homePage.getURL());
    await homePage.clickProducts();
    
    //Assert
    const productsPage = new ProductsPage(page);
    await expect(page).toHaveURL(productsPage.getURL());
});

test('Home "UPS" button', async ({ page }) => {
    //Arrange

    //Act
    const homePage = new HomePage(page);    
    await page.goto(homePage.getURL());
    await homePage.clickUPS();
    
    //Assert
    await expect(page).toHaveURL(homePage.getUpsURL());
});

test('Home "FedEx" button', async ({ page }) => {
    //Arrange

    //Act
    const homePage = new HomePage(page);    
    await page.goto(homePage.getURL());
    await homePage.clickFedEx();
    
    //Assert
    await expect(page).toHaveURL(homePage.getFedExURL());
});