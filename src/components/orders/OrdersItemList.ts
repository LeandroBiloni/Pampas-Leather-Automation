import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "../../base/BaseComponent";

/**
 * Class for the Orders List in the Orders Page.
 */
export class OrdersItemList extends BaseComponent {
    private orders: Locator;

    /**
     * Class constructor.
     */
    constructor(page: Page, container: Locator) {
        super(page);
        this.container = container;
        this.orders = this.container.locator("[class~='item-container']");
    }

    /**
     * Get the collection of Orders.
     * @returns An array of Orders Locators.
     */
    async getOrders(): Promise<Locator[]> {
        this.logger.info("Getting the collection of Orders");
        await this.orders.first().waitFor({ state: 'attached'});
        const ordersList = await this.orders.all();
        return ordersList;
    }

    /**
     * Get an Order by the index.
     * @param index 
     * @returns An Order that corresponds with the given index.
     */
    async getOrderByIndex(index: number): Promise<Locator> {
        this.logger.info(`Getting the Order from the collection with index: ${index}`);
        
        const orders = await this.getOrders();

        if (index >= 0 && index < orders.length) {
            return orders[index]
        } else {
            throw new Error(`Invalid index: ${index} - List length. ${orders.length}`);
        }
    }
}
