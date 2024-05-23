import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import dotenv from 'dotenv'; 
import { URLAssembler } from "../helpers/URLAssembler";
dotenv.config();

/**
 * Class for Products Page
 */
export class ProductsPage extends BasePage{

    private productsListButton: Locator;
    private colorsListButton: Locator;

    /**
     * Class constructor
     * @param page 
     */
    constructor(page: Page) {
        super(page);
        const baseURl = process.env.BASE_URL as string;
        this.pageRoute = "products";
        this.pageCompleteURL = URLAssembler.getAssembledURL(baseURl, this.pageRoute);

        this.productsListButton = this.page.locator("div > a[href='/productsList']");
        this.colorsListButton = this.page.locator("div > a[href='/colorsList']");
    }

    /**
     * Click Products List button
     */
    async clickProductsList(): Promise<void> {
        this.logger.info("Clicking the Products List button in Products Page");
        await this.productsListButton.waitFor({state: "attached"});
        await this.productsListButton.click();
    }

    /**
     * Click Colors List button
     */
    async clickColorsList(): Promise<void> {
        this.logger.info("Clicking the Colors List button in Products Page");
        await this.colorsListButton.waitFor({state: "attached"});
        await this.colorsListButton.click();
    }
}