import test, { expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { ClientItem } from "../components/clients/ClientItem";
import { ClientsList } from "../components/clients/ClientsList";
import { ClientsPage } from "../pages/ClientsPage";


test.beforeEach(async ({ page}) => {
    const clientsPage = new ClientsPage(page);    
    await page.goto(clientsPage.getURL());
});

test.describe('Clients Page Tests', {tag: ['@clients-page', '@full-regression']}, () => {
    test('Search by name', async ({ page }) => {
        await allure.description("Test that 'Search by name' functionality in Clients Page works. Before this test starts it already logged in and navigated to Clients Page");
        await allure.tags("Clients Page", "Full Regression", "Search");

        //Arrange
        const expectedClientName = "PRUEBA1"

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
        await allure.tags("Clients Page", "Full Regression", "Search");

        //Arrange
        const expectedClientCode = "asd"

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