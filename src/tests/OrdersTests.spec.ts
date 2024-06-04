import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { OrdersPage } from "../pages/OrdersPage";
import { Header } from "../components/Header";
import { ClientsPage } from "../pages/ClientsPage";
import { ProductsPage } from "../pages/ProductsPage";
import { allure } from "allure-playwright";
import { Screenshoter } from "../helpers/Screenshoter";
import { LoginPage } from "../pages/LoginPage";
import { LoginHelper } from "../helpers/LoginHelper";
import { OrdersItemList } from "../components/orders/OrdersItemList";
import { OrderItem } from "../components/orders/OrderItem";
import { FilterByStateData } from "../data/tests data/FilterByStateData";

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

test.describe('Orders Page Tests - Order by', {tag: ['@orders-page', '@full-regression']}, () => {
    test('Order by Newest', async ({ page }) => {
        await allure.tags("Orders Page", "Full Regression");

        //Arrange
        const orderOption = "ot-des";
        const expectedOrderNumber = "4107"
        
        //Act 1 - Select Order option
        const ordersPage = new OrdersPage(page);
        await allure.step("Step 1 - Go to Orders Page", async () => {        
            await page.goto(ordersPage.getURL());
        });

        await allure.step("Step 2 - Select order option", async () => {        
            await ordersPage.selectOrderOption(orderOption);
        });    

        //Assert 1 - Check that Order option is selected
        const sortOrderLocator = ordersPage.getSortOrderLocator();
        await expect(sortOrderLocator).toHaveValue(orderOption);

        //Arrange 2 - Get the first listed order
        const ordersList = new OrdersItemList(page, await ordersPage.getSearchListContainer());
        const orderItem = new OrderItem(page, await ordersList.getOrderByIndex(0));
        const orderNumber = await orderItem.getOTIdentifier();

        //Assert 2 - Check that Orders are ordered
        await expect(orderNumber).toBe(expectedOrderNumber);
    });

    test('Order by Oldest', async ({ page }) => {
        await allure.tags("Orders Page", "Full Regression");
        //Arrange
        const orderOption = "ot-asc";
        const expectedOrderNumber = "4000"
        
        //Act 1 - Select Order option
        const ordersPage = new OrdersPage(page);
        await allure.step("Step 1 - Go to Orders Page", async () => {        
            await page.goto(ordersPage.getURL());
        });

        await allure.step("Step 2 - Select order option", async () => {        
            await ordersPage.selectOrderOption(orderOption);
        });    

        //Assert 1 - Check that Order option is selected
        const sortOrderLocator = ordersPage.getSortOrderLocator();
        await expect(sortOrderLocator).toHaveValue(orderOption);

        //Arrange 2 - Get the first listed order
        const ordersList = new OrdersItemList(page, await ordersPage.getSearchListContainer());
        const orderItem = new OrderItem(page, await ordersList.getOrderByIndex(0));
        const orderNumber = await orderItem.getOTIdentifier();

        //Assert 2 - Check that Orders are ordered
        await expect(orderNumber).toBe(expectedOrderNumber);
    });
});

test.describe.only('Orders Page Tests - Filter by', {tag: ['@orders-page', '@full-regression']}, () => {
    const filterByStateData: FilterByStateData[] = [
        new FilterByStateData("Nuevo", "Nuevo"),
        new FilterByStateData("Cargado", "Cargado"),
        new FilterByStateData("Preproducción", "Preproducción"),
        new FilterByStateData("Producción", "Producción"),
        new FilterByStateData("Terminado", "Terminado"),
        new FilterByStateData("Enviado", "Enviado"),
        new FilterByStateData("Entregado", "Entregado"),
        new FilterByStateData("Cancelado", "Cancelado")
    ];
    for (let index = 0; index < filterByStateData.length; index++) {
        const data = filterByStateData[index];

        test(`Filter by State - ${data.stateOption}`, async ({ page }) => {
            await allure.tags("Orders Page", "Full Regression");
            await allure.parameter("State Option", data.stateOption);
            
            //Arrange 1
            const filterOption = "state";
    
            //Act 1 - Select Filter option
            const ordersPage = new OrdersPage(page);
            await allure.step("Step 1 - Go to Orders Page", async () => {        
                await page.goto(ordersPage.getURL());
            });
    
            await allure.step("Step 2 - Select State filter option", async () => {        
                await ordersPage.selectFilterOption(filterOption);
            });
    
            //Assert 1 - Check that Filter option is selected and State selector is visible
            const filterByLocator = ordersPage.getFilterByLocator();
            await expect(filterByLocator).toHaveValue(filterOption);
            await expect(ordersPage.isStateSelectorVisible()).toBeTruthy();
    
            //Act 2 - Select State option
            await allure.step("Step 3 - Select the State to filter", async () => {        
                await ordersPage.selectFilterStateOption(data.stateOption);
            });
    
            //Assert 2 - Check that the State option is selected
            const filterStateLocator = ordersPage.getFilterStateLocator();
            await expect(filterStateLocator).toHaveValue(data.expectedOrderState);
    
            //Arrange 2 - Get the filtered items
            const ordersList = new OrdersItemList(page, await ordersPage.getSearchListContainer());
            const orderItem = new OrderItem(page, await ordersList.getOrderByIndex(0));
            const orderState = await orderItem.getState();
    
            //Assert 3 - Check that Orders are ordered
            await expect(orderState).toBe(data.expectedOrderState);
        });
    };    
});