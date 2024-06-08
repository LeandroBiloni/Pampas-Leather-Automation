import test, { expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { OrderItem } from "../components/orders/OrderItem";
import { OrdersItemList } from "../components/orders/OrdersItemList";
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

test.describe('Orders Page Tests - Order by', {tag: ['@orders-page', '@full-regression']}, () => {

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

    test("Order by Deadline Upcoming", async ({ page }) => {
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

test.describe.only('Orders Page Tests - Filter by', {tag: ['@orders-page', '@full-regression']}, () => {

    test(`Filter by State - Nuevo`, async ({ page }) => {
        await allure.description(`Test that 'Filter by State - Nuevo' option in Orders Page works. Before this test starts it already logged in and navigated to Orders Page.`);
        await allure.tags("Orders Page", "Full Regression");

        //Arrange 1
        const filterOption = "state";
        const stateOption = "Nuevo";
        const expectedState = "Nuevo";

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
            await ordersPage.selectFilterStateOption(stateOption);
        });

        //Assert 2 - Check that the State option is selected
        const filterStateLocator = ordersPage.getFilterStateLocator();
        await allure.step("Check that the correct State option is selected", async () => {
            await expect(filterStateLocator).toHaveValue(stateOption);
        });

        //Arrange 2 - Get the filtered items
        const ordersList = new OrdersItemList(page, await ordersPage.getSearchListContainer());
        const orderItem = new OrderItem(page, await ordersList.getOrderByIndex(0));
        const orderState = await orderItem.getState();

        //Assert 3 - Check that Orders are filtered
        await allure.step("Check that filtered order is correct", async () => {
            await expect(orderState).toBe(expectedState);
        });
    });

    test(`Filter by State - Cargado`, async ({ page }) => {
        await allure.description(`Test that 'Filter by State - Cargado' option in Orders Page works. Before this test starts it already logged in and navigated to Orders Page.`);
        await allure.tags("Orders Page", "Full Regression");

        //Arrange 1
        const filterOption = "state";
        const stateOption = "Cargado";
        const expectedState = "Cargado";

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
            await ordersPage.selectFilterStateOption(stateOption);
        });

        //Assert 2 - Check that the State option is selected
        const filterStateLocator = ordersPage.getFilterStateLocator();
        await allure.step("Check that the correct State option is selected", async () => {
            await expect(filterStateLocator).toHaveValue(stateOption);
        });

        //Arrange 2 - Get the filtered items
        const ordersList = new OrdersItemList(page, await ordersPage.getSearchListContainer());
        const orderItem = new OrderItem(page, await ordersList.getOrderByIndex(0));
        const orderState = await orderItem.getState();

        //Assert 3 - Check that Orders are filtered
        await allure.step("Check that filtered order is correct", async () => {
            await expect(orderState).toBe(expectedState);
        });
    });

    test(`Filter by State - Preproducción`, async ({ page }) => {
        await allure.description(`Test that 'Filter by State - Preproducción' option in Orders Page works. Before this test starts it already logged in and navigated to Orders Page.`);
        await allure.tags("Orders Page", "Full Regression");

        //Arrange 1
        const filterOption = "state";
        const stateOption = "Preproducción";
        const expectedState = "Preproducción";

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
            await ordersPage.selectFilterStateOption(stateOption);
        });

        //Assert 2 - Check that the State option is selected
        const filterStateLocator = ordersPage.getFilterStateLocator();
        await allure.step("Check that the correct State option is selected", async () => {
            await expect(filterStateLocator).toHaveValue(stateOption);
        });

        //Arrange 2 - Get the filtered items
        const ordersList = new OrdersItemList(page, await ordersPage.getSearchListContainer());
        const orderItem = new OrderItem(page, await ordersList.getOrderByIndex(0));
        const orderState = await orderItem.getState();

        //Assert 3 - Check that Orders are filtered
        await allure.step("Check that filtered order is correct", async () => {
            await expect(orderState).toBe(expectedState);
        });
    });

    test(`Filter by State - Producción`, async ({ page }) => {
        await allure.description(`Test that 'Filter by State - Producción' option in Orders Page works. Before this test starts it already logged in and navigated to Orders Page.`);
        await allure.tags("Orders Page", "Full Regression");

        //Arrange 1
        const filterOption = "state";
        const stateOption = "Producción";
        const expectedState = "Producción";

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
            await ordersPage.selectFilterStateOption(stateOption);
        });

        //Assert 2 - Check that the State option is selected
        const filterStateLocator = ordersPage.getFilterStateLocator();
        await allure.step("Check that the correct State option is selected", async () => {
            await expect(filterStateLocator).toHaveValue(stateOption);
        });

        //Arrange 2 - Get the filtered items
        const ordersList = new OrdersItemList(page, await ordersPage.getSearchListContainer());
        const orderItem = new OrderItem(page, await ordersList.getOrderByIndex(0));
        const orderState = await orderItem.getState();

        //Assert 3 - Check that Orders are filtered
        await allure.step("Check that filtered order is correct", async () => {
            await expect(orderState).toBe(expectedState);
        });
    });

    test(`Filter by State - Terminado`, async ({ page }) => {
        await allure.description(`Test that 'Filter by State - Terminado' option in Orders Page works. Before this test starts it already logged in and navigated to Orders Page.`);
        await allure.tags("Orders Page", "Full Regression");

        //Arrange 1
        const filterOption = "state";
        const stateOption = "Terminado";
        const expectedState = "Terminado";

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
            await ordersPage.selectFilterStateOption(stateOption);
        });

        //Assert 2 - Check that the State option is selected
        const filterStateLocator = ordersPage.getFilterStateLocator();
        await allure.step("Check that the correct State option is selected", async () => {
            await expect(filterStateLocator).toHaveValue(stateOption);
        });

        //Arrange 2 - Get the filtered items
        const ordersList = new OrdersItemList(page, await ordersPage.getSearchListContainer());
        const orderItem = new OrderItem(page, await ordersList.getOrderByIndex(0));
        const orderState = await orderItem.getState();

        //Assert 3 - Check that Orders are filtered
        await allure.step("Check that filtered order is correct", async () => {
            await expect(orderState).toBe(expectedState);
        });
    });

    test(`Filter by State - Enviado`, async ({ page }) => {
        await allure.description(`Test that 'Filter by State - Enviado' option in Orders Page works. Before this test starts it already logged in and navigated to Orders Page.`);
        await allure.tags("Orders Page", "Full Regression");

        //Arrange 1
        const filterOption = "state";
        const stateOption = "Enviado";
        const expectedState = "Enviado";

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
            await ordersPage.selectFilterStateOption(stateOption);
        });

        //Assert 2 - Check that the State option is selected
        const filterStateLocator = ordersPage.getFilterStateLocator();
        await allure.step("Check that the correct State option is selected", async () => {
            await expect(filterStateLocator).toHaveValue(stateOption);
        });

        //Arrange 2 - Get the filtered items
        const ordersList = new OrdersItemList(page, await ordersPage.getSearchListContainer());
        const orderItem = new OrderItem(page, await ordersList.getOrderByIndex(0));
        const orderState = await orderItem.getState();

        //Assert 3 - Check that Orders are filtered
        await allure.step("Check that filtered order is correct", async () => {
            await expect(orderState).toBe(expectedState);
        });
    });

    test(`Filter by State - Entregado`, async ({ page }) => {
        await allure.description(`Test that 'Filter by State - Entregado' option in Orders Page works. Before this test starts it already logged in and navigated to Orders Page.`);
        await allure.tags("Orders Page", "Full Regression");

        //Arrange 1
        const filterOption = "state";
        const stateOption = "Entregado";
        const expectedState = "Entregado";

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
            await ordersPage.selectFilterStateOption(stateOption);
        });

        //Assert 2 - Check that the State option is selected
        const filterStateLocator = ordersPage.getFilterStateLocator();
        await allure.step("Check that the correct State option is selected", async () => {
            await expect(filterStateLocator).toHaveValue(stateOption);
        });

        //Arrange 2 - Get the filtered items
        const ordersList = new OrdersItemList(page, await ordersPage.getSearchListContainer());
        const orderItem = new OrderItem(page, await ordersList.getOrderByIndex(0));
        const orderState = await orderItem.getState();

        //Assert 3 - Check that Orders are filtered
        await allure.step("Check that filtered order is correct", async () => {
            await expect(orderState).toBe(expectedState);
        });
    });

    test(`Filter by State - Cancelado`, async ({ page }) => {
        await allure.description(`Test that 'Filter by State - Cancelado' option in Orders Page works. Before this test starts it already logged in and navigated to Orders Page.`);
        await allure.tags("Orders Page", "Full Regression");

        //Arrange 1
        const filterOption = "state";
        const stateOption = "Cancelado";
        const expectedState = "Cancelado";

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
            await ordersPage.selectFilterStateOption(stateOption);
        });

        //Assert 2 - Check that the State option is selected
        const filterStateLocator = ordersPage.getFilterStateLocator();
        await allure.step("Check that the correct State option is selected", async () => {
            await expect(filterStateLocator).toHaveValue(stateOption);
        });

        //Arrange 2 - Get the filtered items
        const ordersList = new OrdersItemList(page, await ordersPage.getSearchListContainer());
        const orderItem = new OrderItem(page, await ordersList.getOrderByIndex(0));
        const orderState = await orderItem.getState();

        //Assert 3 - Check that Orders are filtered
        await allure.step("Check that filtered order is correct", async () => {
            await expect(orderState).toBe(expectedState);
        });
    });

    test(`Filter by OT#`, async ({ page }) => {
        await allure.description(`Test that 'Filter by OT#' option in Orders Page works. Before this test starts it already logged in and navigated to Orders Page.`);
        await allure.tags("Orders Page", "Full Regression");

        //Arrange 1
        const filterOption = "numberOrder";
        const filterText = "4014";

        //Act 1 - Select Filter option
        const ordersPage = new OrdersPage(page);

        await allure.step(`Step 1 - Select OT# filter option`, async () => {        
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
            await ordersPage.inputSearchFieldText(filterText);
        });

        //Arrange 2 - Get the filtered items
        const ordersList = new OrdersItemList(page, await ordersPage.getSearchListContainer());
        const orderItem = new OrderItem(page, await ordersList.getOrderByIndex(0));
        const otId = await orderItem.getOTIdentifier();

        //Assert 3 - Check that Orders are filtered
        await allure.step("Check that filtered order is correct", async () => {
            await expect(otId).toBe(filterText);
        });
    });

    test(`Filter by Customer`, async ({ page }) => {
        await allure.description(`Test that 'Filter by Customer' option in Orders Page works. Before this test starts it already logged in and navigated to Orders Page.`);
        await allure.tags("Orders Page", "Full Regression");

        //Arrange 1
        const filterOption = "customer";
        const filterText = "A1 Interiors";

        //Act 1 - Select Filter option
        const ordersPage = new OrdersPage(page);

        await allure.step(`Step 1 - Select OT# filter option`, async () => {        
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
            await ordersPage.inputSearchFieldText(filterText);
        });

        //Arrange 2 - Get the filtered items
        const ordersList = new OrdersItemList(page, await ordersPage.getSearchListContainer());
        const orderItem = new OrderItem(page, await ordersList.getOrderByIndex(0));
        const otId = await orderItem.getClientName();

        //Assert 3 - Check that Orders are filtered
        await allure.step("Check that filtered order is correct", async () => {
            await expect(otId).toBe(filterText);
        });
    });

    test(`Filter by PO#`, async ({ page }) => {
        await allure.description(`Test that 'Filter by PO#' option in Orders Page works. Before this test starts it already logged in and navigated to Orders Page.`);
        await allure.tags("Orders Page", "Full Regression");

        //Arrange 1
        const filterOption = "purchaseOrder";
        const filterText = "222";

        //Act 1 - Select Filter option
        const ordersPage = new OrdersPage(page);

        await allure.step(`Step 1 - Select OT# filter option`, async () => {        
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
            await ordersPage.inputSearchFieldText(filterText);
        });

        //Arrange 2 - Get the filtered items
        const ordersList = new OrdersItemList(page, await ordersPage.getSearchListContainer());
        const orderItem = new OrderItem(page, await ordersList.getOrderByIndex(0));
        const otId = await orderItem.getPOIdentifier();

        //Assert 3 - Check that Orders are filtered
        await allure.step("Check that filtered order is correct", async () => {
            await expect(otId).toBe(filterText);
        });
    });

    test(`Filter by Deadline`, async ({ page }) => {
        await allure.description(`Test that 'Filter by Deadline' option in Orders Page works. Before this test starts it already logged in and navigated to Orders Page.`);
        await allure.tags("Orders Page", "Full Regression");

        //Arrange 1
        const filterName = "Deadline";
        const filterOption = "limitDate";
        const filterText = "2025-09-18";

        //Act 1 - Select Filter option
        const ordersPage = new OrdersPage(page);

        await allure.step(`Step 1 - Select OT# filter option`, async () => {        
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
            await ordersPage.inputSearchFieldText(filterText);
        });

        //Arrange 2 - Get the filtered items
        const ordersList = new OrdersItemList(page, await ordersPage.getSearchListContainer());
        const orderItem = new OrderItem(page, await ordersList.getOrderByIndex(0));
        const otId = await orderItem.getDeadline();

        //Assert 3 - Check that Orders are filtered
        await allure.step("Check that filtered order is correct", async () => {
            await expect(otId).toBe(filterText);
        });
    });
});