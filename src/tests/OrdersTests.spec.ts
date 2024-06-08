import test, { expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { OrderItem } from "../components/orders/OrderItem";
import { OrdersItemList } from "../components/orders/OrdersItemList";
import { FilterhData as FilterData } from "../data/tests data/FilterData";
import { FilterByStateData } from "../data/tests data/FilterByStateData";
import { LoginHelper } from "../helpers/LoginHelper";
import { Screenshoter } from "../helpers/Screenshoter";
import { OrdersPage } from "../pages/OrdersPage";

test.beforeEach(async ({ page}) => {
    const email = process.env.CORRECT_EMAIL as string;
    const password = process.env.CORRECT_PASSWORD as string;
    await LoginHelper.doLogin(email, password, page);

    const ordersPage = new OrdersPage(page);
    await page.goto(ordersPage.getURL());
});

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === "failed") {
        const addTimeStamp = true;
        await Screenshoter.TakeScreenshot(page, testInfo.title, addTimeStamp);
    }
});

test.describe.only('Orders Page Tests - Order by', {tag: ['@orders-page', '@full-regression']}, () => {

    test("Order by Newest", async ({ page }) => {
        await allure.description("Test that 'Order by Newest' option in Orders Page works. Before this test starts it already logged in and navigated to Orders Page.");
        await allure.tags("Orders Page", "Full Regression");

        //Arrange
        const filterOption = "ot-des";
        
        //Act 1 - Select Order option
        const ordersPage = new OrdersPage(page);

        await allure.step("Step 1 - Select order option", async () => {        
            await ordersPage.selectOrderOption(filterOption);
        });    

        //Assert 1 - Check that Order option is selected
        const sortOrderLocator = ordersPage.getSortOrderLocator();
        await allure.step("Check that Order order is selected", async () => {
            await expect(sortOrderLocator).toHaveValue(filterOption);
        });

        //Arrange 2 - Get the first listed order and the newest order
        const ordersList = new OrdersItemList(page, await ordersPage.getSearchListContainer());

        const firstItem = new OrderItem(page, await ordersList.getOrderByIndex(0));
        const firstItemOrderNumber = await firstItem.getOTIdentifier();

        const newestOrderItem = await ordersList.getNewestOrder();
        const newestOrderNumber = await newestOrderItem.getOTIdentifier();        

        //Assert 2 - Check that Orders are ordered
        await allure.step("Check that filtered order is correct", async () => {
            await expect(firstItemOrderNumber).toBe(newestOrderNumber);
        });
    });

    test("Order by Oldest", async ({ page }) => {
        await allure.description("Test that 'Order by Oldest' option in Orders Page works. Before this test starts it already logged in and navigated to Orders Page.");
        await allure.tags("Orders Page", "Full Regression");

        //Arrange
        const filterOption = "ot-asc";
        
        //Act 1 - Select Order option
        const ordersPage = new OrdersPage(page);

        await allure.step("Step 1 - Select order option", async () => {        
            await ordersPage.selectOrderOption(filterOption);
        });    

        //Assert 1 - Check that Order option is selected
        const sortOrderLocator = ordersPage.getSortOrderLocator();
        await allure.step("Check that Order order is selected", async () => {
            await expect(sortOrderLocator).toHaveValue(filterOption);
        });

        //Arrange 2 - Get the first listed order and the oldest order
        const ordersList = new OrdersItemList(page, await ordersPage.getSearchListContainer());

        const firstItem = new OrderItem(page, await ordersList.getOrderByIndex(0));
        const firstItemOrderNumber = await firstItem.getOTIdentifier();

        const oldestOrderItem = await ordersList.getOldestOrder();
        const oldestOrderNumber = await oldestOrderItem.getOTIdentifier();

        //Assert 2 - Check that Orders are ordered
        await allure.step("Check that filtered order is correct", async () => {
            await expect(firstItemOrderNumber).toBe(oldestOrderNumber);
        });
    });

    test.only("Order by Deadline Upcoming", async ({ page }) => {
        await allure.description("Test that 'Order by Deadline Upcoming' option in Orders Page works. Before this test starts it already logged in and navigated to Orders Page.");
        await allure.tags("Orders Page", "Full Regression");

        //Arrange
        const filterOption = "date-des";
        
        //Act 1 - Select Order option
        const ordersPage = new OrdersPage(page);

        await allure.step("Step 1 - Select order option", async () => {        
            await ordersPage.selectOrderOption(filterOption);
        });    

        //Assert 1 - Check that Order option is selected
        const sortOrderLocator = ordersPage.getSortOrderLocator();
        await allure.step("Check that Order order is selected", async () => {
            await expect(sortOrderLocator).toHaveValue(filterOption);
        });

        //Arrange 2 - Get the first listed order and the upcoming deadline order
        const ordersList = new OrdersItemList(page, await ordersPage.getSearchListContainer());

        const firstItem = new OrderItem(page, await ordersList.getOrderByIndex(0));
        const firstItemOrderNumber = await firstItem.getOTIdentifier();

        const upcomingOrderItem = await ordersList.getUpcomingDeadlineOrder();
        const upcomingOrderNumber = await upcomingOrderItem.getOTIdentifier();


        //Assert 2 - Check that Orders are ordered
        await allure.step("Check that filtered order is correct", async () => {
            await expect(firstItemOrderNumber).toBe(upcomingOrderNumber);
        });
    });

    test("Order by Deadline Distant", async ({ page }) => {
        await allure.description("Test that 'Order by Deadline Distant' option in Orders Page works. Before this test starts it already logged in and navigated to Orders Page.");
        await allure.tags("Orders Page", "Full Regression");

        //Arrange
        const filterOption = "date-asc";
        
        //Act 1 - Select Order option
        const ordersPage = new OrdersPage(page);

        await allure.step("Step 1 - Select order option", async () => {        
            await ordersPage.selectOrderOption(filterOption);
        });    

        //Assert 1 - Check that Order option is selected
        const sortOrderLocator = ordersPage.getSortOrderLocator();
        await allure.step("Check that Order order is selected", async () => {
            await expect(sortOrderLocator).toHaveValue(filterOption);
        });

        //Arrange 2 - Get the first listed order and the oldest deadline order
        const ordersList = new OrdersItemList(page, await ordersPage.getSearchListContainer());

        const firstItem = new OrderItem(page, await ordersList.getOrderByIndex(0));
        const firstItemOrderNumber = await firstItem.getOTIdentifier();

        const oldestDeadlineOrderItem = await ordersList.getOldestDeadlineOrder();
        const oldestDeadlineOrderNumber = await oldestDeadlineOrderItem.getOTIdentifier();


        //Assert 2 - Check that Orders are ordered
        await allure.step("Check that filtered order is correct", async () => {
            await expect(firstItemOrderNumber).toBe(oldestDeadlineOrderNumber);
        });
    });
});

test.describe('Orders Page Tests - Filter by', {tag: ['@orders-page', '@full-regression']}, () => {
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

        test(`Filter by State - ${data.expectedOrderState}`, async ({ page }) => {
            await allure.description(`Test that 'Filter by State - ${data.expectedOrderState}' option in Orders Page works. Before this test starts it already logged in and navigated to Orders Page.`);
            await allure.tags("Orders Page", "Full Regression");
            await allure.parameter("State Option", data.stateOption);

            //Arrange 1
            const filterOption = "state";
    
            //Act 1 - Select Filter option
            const ordersPage = new OrdersPage(page);

            await allure.step("Step 1 - Select State filter option", async () => {        
                await ordersPage.selectFilterOption(filterOption);
            });
    
            //Assert 1 - Check that Filter option is selected and State selector is visible
            const filterByLocator = ordersPage.getFilterByLocator();
            await allure.step("Check that Filter option is selected and State selector is visible", async () => {
                await expect(filterByLocator).toHaveValue(filterOption);
                await expect(ordersPage.isStateSelectorVisible()).toBeTruthy();
            });
    
            //Act 2 - Select State option
            await allure.step("Step 2 - Select the State to filter", async () => {        
                await ordersPage.selectFilterStateOption(data.stateOption);
            });
    
            //Assert 2 - Check that the State option is selected
            const filterStateLocator = ordersPage.getFilterStateLocator();
            await allure.step("Check that the correct State option is selected", async () => {
                await expect(filterStateLocator).toHaveValue(data.stateOption);
            });
    
            //Arrange 2 - Get the filtered items
            const ordersList = new OrdersItemList(page, await ordersPage.getSearchListContainer());
            const orderItem = new OrderItem(page, await ordersList.getOrderByIndex(0));
            const orderState = await orderItem.getState();
    
            //Assert 3 - Check that Orders are filtered
            await allure.step("Check that filtered order is correct", async () => {
                await expect(orderState).toBe(data.expectedOrderState);
            });
        });
    };    

    const filterBySearch: FilterData[] = [
        new FilterData("OT#", "numberOrder", "4014"),
        new FilterData("Customer", "customer", "A1 Interiors"),
        new FilterData("PO#", "purchaseOrder", "222"),
        new FilterData("Deadline", "limitDate", "2025-09-18")
    ];
    
    for (let index = 0; index < filterBySearch.length; index++) {
        const data = filterBySearch[index];
        
        test(`Filter by ${data.filterName}`, async ({ page }) => {
            await allure.description(`Test that 'Filter by ${data.filterName}' option in Orders Page works. Before this test starts it already logged in and navigated to Orders Page.`);
            await allure.tags("Orders Page", "Full Regression");

            //Arrange 1
            const filterOption = data.filterOption;
    
            //Act 1 - Select Filter option
            const ordersPage = new OrdersPage(page);
    
            await allure.step(`Step 1 - Select ${data.filterName} filter option`, async () => {        
                await ordersPage.selectFilterOption(filterOption);
            });
    
            //Assert 1 - Check that Filter option is selected and Search field is visible
            const filterByLocator = ordersPage.getFilterByLocator();

            await allure.step("Check that Filter option is selected and Search field is visible", async () => {
                await expect(filterByLocator).toHaveValue(filterOption);
                await expect(ordersPage.isFilterSearchFieldVisible()).toBeTruthy();
            });
    
            //Act 2 - Input the filter text
            await allure.step("Step 2 - Input the filter text", async () => {        
                await ordersPage.inputSearchFieldText(data.filterText);
            });
    
            //Arrange 2 - Get the filtered items
            const ordersList = new OrdersItemList(page, await ordersPage.getSearchListContainer());
            const orderItem = new OrderItem(page, await ordersList.getOrderByIndex(0));
            const orderValue = await orderItem.getValue(data.filterName);
    
            //Assert 3 - Check that Orders are filtered
            await allure.step("Check that filtered order is correct", async () => {
                await expect(orderValue).toBe(data.filterText);
            });
        });
    }
});