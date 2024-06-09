import test, { expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { LoginHelper } from "../helpers/LoginHelper";
import { Screenshoter } from "../helpers/Screenshoter";
import { ColorsListPage } from "../pages/ColorsListPage";
import { ColorsList } from "../components/colors/ColorsList";
import { ColorItem } from "../components/colors/ColorItem";

test.beforeEach(async ({ page}) => {
    const email = process.env.CORRECT_EMAIL as string;
    const password = process.env.CORRECT_PASSWORD as string;
    await LoginHelper.doLogin(email, password, page);

    const colorsListPage = new ColorsListPage(page);
    await page.goto(colorsListPage.getURL());
});

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === "failed") {
        const addTimeStamp = true;
        await Screenshoter.TakeScreenshot(page, testInfo.title, addTimeStamp);
    }
});

test.describe('Colors List Page Tests', {tag: ['@colors-list-page', '@full-regression']}, () => {
    test('Search by Color name', async ({ page }) => {
        await allure.description("Test that 'Search by Product name' functionality in Products List Page works. Before this test starts it already logged in and navigated to Products List Page.");
        await allure.tags("Colors List Page", "Full Regression");

        //Arrange
        const expectedProductName = "Batic Grey";

        //Act 
        const colorsListPage = new ColorsListPage(page);
        await allure.step("Step 1 - Input color name", async () => {
            await colorsListPage.inputSearchFieldText(expectedProductName);
        });

        const colorsList = new ColorsList(page, await colorsListPage.getColorsListContainer());
        const colorItem = new ColorItem(page, await colorsList.getColorByIndex(0));
        const colorName = await colorItem.getColorName();

        //Assert
        await allure.step("Check that found color is correct", async () => {
            await expect(colorName).toBe(expectedProductName);
        });
    });

    test('Search by Color code', async ({ page }) => {
        await allure.description("Test that 'Search by Product code' functionality in Products List Page works. Before this test starts it already logged in and navigated to Products List Page.");
        await allure.tags("Colors List Page", "Full Regression");

        //Arrange
        const expectedColorCode = "AL";

        //Act 
        const colorsListPage = new ColorsListPage(page);
        await allure.step("Step 1 - Input color code", async () => {
            await colorsListPage.inputSearchFieldText(expectedColorCode);
        });

        const colorsList = new ColorsList(page, await colorsListPage.getColorsListContainer());
        const colorItem = new ColorItem(page, await colorsList.getColorByIndex(0));
        const colorCode = await colorItem.getCode();

        //Assert
        await allure.step("Check that found color is correct", async () => {
            await expect(colorCode).toBe(expectedColorCode);
        });
    });

    test('Search by Color description', async ({ page }) => {
        await allure.description("Test that 'Search by Product description' functionality in Products List Page works. Before this test starts it already logged in and navigated to Products List Page.");
        await allure.tags("Colors List Page", "Full Regression");

        //Arrange
        const expectedColorDescription = "Atigrados Marrones";

        //Act 
        const colorsListPage = new ColorsListPage(page);
        await allure.step("Step 1 - Input color description", async () => {
            await colorsListPage.inputSearchFieldText(expectedColorDescription);
        });

        const colorsList = new ColorsList(page, await colorsListPage.getColorsListContainer());
        const colorItem = new ColorItem(page, await colorsList.getColorByIndex(0));
        const colorDescription = await colorItem.getDescription();

        //Assert
        await allure.step("Check that found color is correct", async () => {
            await expect(colorDescription).toBe(expectedColorDescription);
        });
    });
});