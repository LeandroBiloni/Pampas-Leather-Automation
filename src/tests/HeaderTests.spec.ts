import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { OrdersPage } from "../pages/OrdersPage";
import { Header } from "../components/Header";
import { ClientsPage } from "../pages/ClientsPage";
import { ProductsPage } from "../pages/ProductsPage";

test('Header "Home" button', async ({ page }) => {

    //Arrange

    //Act
    const ordersPage = new OrdersPage(page);
    await page.goto(ordersPage.getURL());
    
    const header = new Header(page);
    await header.clickHome();

    //Assert
    const home = new HomePage(page);    
    await expect(page).toHaveURL(home.getURL());
});

test('Header "Orders" button', async ({ page }) => {

    //Arrange

    //Act
    const home = new HomePage(page);    
    await page.goto(home.getURL());
    
    const header = new Header(page);
    await header.clickOrders();
    
    //Assert
    const ordersPage = new OrdersPage(page);
    await expect(page).toHaveURL(ordersPage.getURL());
});

test('Header "Clients" button', async ({ page }) => {

    //Arrange

    //Act
    const home = new HomePage(page);    
    await page.goto(home.getURL());
    
    const header = new Header(page);
    await header.clickClients();
    
    //Assert
    const clientsPage = new ClientsPage(page);
    await expect(page).toHaveURL(clientsPage.getURL());
});

test('Header "Products" button', async ({ page }) => {

    //Arrange

    //Act
    const home = new HomePage(page);    
    await page.goto(home.getURL());
    
    const header = new Header(page);
    await header.clickProducts();
    
    //Assert
    const productsPage = new ProductsPage(page);
    await expect(page).toHaveURL(productsPage.getURL());
});