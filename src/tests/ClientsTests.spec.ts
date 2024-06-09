import test, { expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { LoginHelper } from "../helpers/LoginHelper";
import { Screenshoter } from "../helpers/Screenshoter";
import { ClientsPage } from "../pages/ClientsPage";
import { ClientsList } from "../components/clients/ClientsList";
import { ClientItem } from "../components/clients/ClientItem";


test.beforeEach(async ({ page}) => {
    
    const email = process.env.CORRECT_EMAIL as string;
    const password = process.env.CORRECT_PASSWORD as string;
    await LoginHelper.doLogin(email, password, page);

    const clientsPage = new ClientsPage(page);    
    await page.goto(clientsPage.getURL());
});

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === "failed") {
        const addTimeStamp = true;
        await Screenshoter.TakeScreenshot(page, testInfo.title, addTimeStamp);
    }
});

test.describe('Clients Page Tests', {tag: ['@clients-page', '@full-regression']}, () => {
    test('Search by name', async ({ page }) => {
        await allure.description("Test that 'Search by name' functionality in Clients Page works. Before this test starts it already logged in and navigated to Clients Page");
        await allure.tags("Clients Page", "Full Regression");

        //Arrange
        const expectedClientName = "Carpet Crafters"

        //Act
        const clientsPage = new ClientsPage(page);
        await allure.step("Step 1 - Input client name", async () => {
            await clientsPage.inputSearchFieldText(expectedClientName);
        });

        const clientsList = new ClientsList(page, await clientsPage.getClientsListContainer());
        const clientItem = new ClientItem(page, await clientsList.getClientByIndex(0));
        const clientName = await clientItem.getClientName();

        //Assert
        await allure.step("Check that found client is correct", async () => {
            await expect(clientName).toBe(expectedClientName);
        });
    });

    test('Search by code', async ({ page }) => {
        await allure.description("Test that 'Search by code' functionality in Clients Page works. Before this test starts it already logged in and navigated to Clients Page");
        await allure.tags("Clients Page", "Full Regression");

        //Arrange
        const expectedClientCode = "CTK"

        //Act
        const clientsPage = new ClientsPage(page);
        await allure.step("Step 1 - Input client name", async () => {
            await clientsPage.inputSearchFieldText(expectedClientCode);
        });

        const clientsList = new ClientsList(page, await clientsPage.getClientsListContainer());
        const clientItem = new ClientItem(page, await clientsList.getClientByIndex(0));
        const clientCode = await clientItem.getClientCode();

        //Assert
        await allure.step("Check that found client is correct", async () => {
            await expect(clientCode).toBe(expectedClientCode);
        });
    });
});