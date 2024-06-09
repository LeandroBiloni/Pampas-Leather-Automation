import test, { expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { LoginHelper } from "../helpers/LoginHelper";
import { Screenshoter } from "../helpers/Screenshoter";
import { ProductsListPage } from "../pages/ProductsListPage";
import { ProductItemsList } from "../components/products/ProductItemsList";
import { ProductItem } from "../components/products/ProductItem";

test.beforeEach(async ({ page}) => {
    const email = process.env.CORRECT_EMAIL as string;
    const password = process.env.CORRECT_PASSWORD as string;
    await LoginHelper.doLogin(email, password, page);

    const productsListPage = new ProductsListPage(page);
    await page.goto(productsListPage.getURL());
});

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === "failed") {
        const addTimeStamp = true;
        await Screenshoter.TakeScreenshot(page, testInfo.title, addTimeStamp);
    }
});

test.describe.only('Products List Page Tests', {tag: ['@products-list-page', '@full-regression']}, () => {
    test('Search by Product name', async ({ page }) => {
        await allure.description("Test that 'Search by Product name' functionality in Products List Page works. Before this test starts it already logged in and navigated to Products List Page.");
        await allure.tags("Products List Page", "Full Regression");

        //Arrange
        const expectedProductName = "Diamond";

        //Act 
        const productsListPage = new ProductsListPage(page);
        await allure.step("Step 1 - Input product name", async () => {
            await productsListPage.inputSearchFieldText(expectedProductName);
        });

        const productsList = new ProductItemsList(page, await productsListPage.getProductsListContainer());
        const productItem = new ProductItem(page, await productsList.getProductByIndex(0));
        const productName = await productItem.getProductName();

        //Assert
        await allure.step("Check that found product is correct", async () => {
            await expect(productName).toBe(expectedProductName);
        });
    });

    test('Search by Product material', async ({ page }) => {
        await allure.description("Test that 'Search by Product material' functionality in Products List Page works. Before this test starts it already logged in and navigated to Products List Page.");
        await allure.tags("Products List Page", "Full Regression");

        //Arrange
        const expectedProductMaterial = "Alpaca";

        //Act 
        const productsListPage = new ProductsListPage(page);
        await allure.step("Step 1 - Input product material", async () => {
            await productsListPage.inputSearchFieldText(expectedProductMaterial);
        });

        const productsList = new ProductItemsList(page, await productsListPage.getProductsListContainer());
        const productItem = new ProductItem(page, await productsList.getProductByIndex(0));
        const productMaterial = await productItem.getMaterialName();

        //Assert
        await allure.step("Check that found product is correct", async () => {
            await expect(productMaterial).toBe(expectedProductMaterial);
        });
    });

    test('Search by Product code', async ({ page }) => {
        await allure.description("Test that 'Search by Product code' functionality in Products List Page works. Before this test starts it already logged in and navigated to Products List Page.");
        await allure.tags("Products List Page", "Full Regression");

        //Arrange
        const expectedProductCode = "DIA";

        //Act 
        const productsListPage = new ProductsListPage(page);
        await allure.step("Step 1 - Input product material", async () => {
            await productsListPage.inputSearchFieldText(expectedProductCode);
        });

        const productsList = new ProductItemsList(page, await productsListPage.getProductsListContainer());
        const productItem = new ProductItem(page, await productsList.getProductByIndex(0));
        const productCode = await productItem.getCode();

        //Assert
        await allure.step("Check that found product is correct", async () => {
            await expect(productCode).toBe(expectedProductCode);
        });
    });

    test('Search by Product description', async ({ page }) => {
        await allure.description("Test that 'Search by Product description' functionality in Products List Page works. Before this test starts it already logged in and navigated to Products List Page.");
        await allure.tags("Products List Page", "Full Regression");

        //Arrange
        const expectedProductDescription = "This is the description of the Ischia rug";

        //Act 
        const productsListPage = new ProductsListPage(page);
        await allure.step("Step 1 - Input product material", async () => {
            await productsListPage.inputSearchFieldText(expectedProductDescription);
        });

        const productsList = new ProductItemsList(page, await productsListPage.getProductsListContainer());
        const productItem = new ProductItem(page, await productsList.getProductByIndex(0));
        const productDescription = await productItem.getDescription();

        //Assert
        await allure.step("Check that found product is correct", async () => {
            await expect(productDescription).toBe(expectedProductDescription);
        });
    });

    test('Search by Product border', async ({ page }) => {
        await allure.description("Test that 'Search by Product border' functionality in Products List Page works. Before this test starts it already logged in and navigated to Products List Page.");
        await allure.tags("Products List Page", "Full Regression");

        //Arrange
        const expectedProductBorder = "si";

        //Act 
        const productsListPage = new ProductsListPage(page);
        await allure.step("Step 1 - Input product material", async () => {
            await productsListPage.inputSearchFieldText(expectedProductBorder);
        });

        const productsList = new ProductItemsList(page, await productsListPage.getProductsListContainer());
        const productItem = new ProductItem(page, await productsList.getProductByIndex(0));
        const productBorder = await productItem.getBorder();

        //Assert
        await allure.step("Check that found product is correct", async () => {
            await expect(productBorder).toBe(expectedProductBorder);
        });
    });
});