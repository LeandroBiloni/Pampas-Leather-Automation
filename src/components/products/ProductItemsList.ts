import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "../../base/BaseComponent";

/**
 * Class for the Product Items List in the Order Item component.
 */
export class ProductItemsList extends BaseComponent {
    private product: Locator;

    constructor(page: Page, container: Locator) {
        super(page);
        this.container = container;
        this.product = this.container.locator("[class~='item-container']");
    }

    /**
     * Get the collection of Products.
     * @returns An array of Products Locators.
     */
    async getProducts(): Promise<Locator[]> {
        this.logger.info("Getting the collection of Products in the Order");
        await this.product.first().waitFor({ state: 'attached'});
        const clientsList = await this.product.all();
        return clientsList;
    }

    /**
     * Get a Product by the index.
     * @param index 
     * @returns A Product that corresponds with the given index.
     */
    async getProductByIndex(index: number): Promise<Locator> {
        this.logger.info(`Getting the Product from the collection with index: ${index}`);
        
        const products = await this.getProducts();

        if (index >= 0 && index < products.length) {
            return products[index]
        } else {
            throw new Error(`Invalid index: ${index}`);
        }
    }
}