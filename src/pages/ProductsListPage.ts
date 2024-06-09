import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import dotenv from 'dotenv'; 
import { URLAssembler } from "../helpers/URLAssembler";
dotenv.config();

/**
 * Class for Products List Page.
 */
export class ProductsListPage extends BasePage{
    
    private productsListContainer: Locator;
    private searchInputField: Locator;
    /**
     * Class constructor.
     * @param page 
     */
    constructor(page: Page) {
        super(page);
        const baseURl = process.env.BASE_URL as string;
        this.pageRoute = "productsList";
        this.pageCompleteURL = URLAssembler.getAssembledURL(baseURl, this.pageRoute);

        this.searchInputField = this.locator("[class='search']");
        this.productsListContainer = this.locator("[class='list-container']");
    }

    /**
     * Write the given text into the search field.
     * @param text The text to write.
     */
    async inputSearchFieldText(text: string): Promise<void> {
        this.logger.info(`Writing the Product name in search field`);
        await this.searchInputField.waitFor({ state: "attached" });
        await this.searchInputField.fill(text);
    }

    /**
     * Get the Products List container.
     * @returns The container of the Products List.
     */
    async getProductsListContainer() {
        this.logger.info('Getting the container of the Products List');
        await this.productsListContainer.waitFor({ state: 'attached' });
        return this.productsListContainer;
    }
}