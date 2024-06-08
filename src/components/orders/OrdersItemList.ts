import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "../../base/BaseComponent";
import { OrderItem } from "./OrderItem";
import { DateProvider } from "../../helpers/DateProvider";

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
    
    async getNewestOrder(): Promise<OrderItem> {
        this.logger.info(`Getting the newest Order`);
        
        const orders = await this.getOrders();

        let newestOrder = new OrderItem(this.page, orders[0]);

        let newestOrderNumber = Number(await newestOrder.getOTIdentifier());

        for (let index = 0; index < orders.length; index++) {
            const currentOrder = new OrderItem(this.page, orders[index]);
            const currentOrderNumber = Number(await currentOrder.getOTIdentifier());

            if (currentOrderNumber > newestOrderNumber) {
                newestOrderNumber = currentOrderNumber;
                newestOrder = currentOrder;
            }
        }

        return newestOrder;
    }

    async getOldestOrder(): Promise<OrderItem> {
        this.logger.info(`Getting the oldest Order`);
        
        const orders = await this.getOrders();

        let oldestOrder = new OrderItem(this.page, orders[0]);

        let oldestOrderNumber = Number(oldestOrder.getOTIdentifier());

        for (let index = 0; index < orders.length; index++) {
            const currentOrder = new OrderItem(this.page, orders[index]);
            const currentOrderNumber = Number(currentOrder.getOTIdentifier());

            if (currentOrderNumber < oldestOrderNumber) {
                oldestOrderNumber = currentOrderNumber;
                oldestOrder = currentOrder;
            }
        }

        return oldestOrder;
    }

    async getUpcomingDeadlineOrder(): Promise<OrderItem> {
        this.logger.info(`Getting the Upcoming Deadline Order`);
        
        const orders = await this.getOrders();

        let closestDeadlineOrder = new OrderItem(this.page, orders[0]);

        let closestDeadline = new Date(await closestDeadlineOrder.getDeadline());
                
        const todayDate = DateProvider.getCurrentDate();
        const todayTime = new Date(todayDate).getTime();

        for (let index = 0; index < orders.length; index++) {
            const currentOrder = new OrderItem(this.page, orders[index]);
            const currentOrderDeadline = new Date(await currentOrder.getDeadline());

            if (currentOrderDeadline.getTime() > todayTime && currentOrderDeadline.getTime() < closestDeadline.getTime()) {

                this.logger.info(`Current evaluated order number is ${await currentOrder.getOTIdentifier()}`);
                this.logger.info(`CUrrent evaluated order deadline is ${currentOrderDeadline}`);
                
                closestDeadlineOrder = currentOrder;
                closestDeadline = currentOrderDeadline;

                this.logger.info(`New Closest order number is ${await closestDeadlineOrder.getOTIdentifier()}`);
                this.logger.info(`New Closest order deadline is ${closestDeadline}`);
            }
        }

        return closestDeadlineOrder;
    }

    async getOldestDeadlineOrder(): Promise<OrderItem> {
        this.logger.info(`Getting the Oldest Deadline Order`);
        
        const orders = await this.getOrders();

        let mostDistantDeadlineOrder = new OrderItem(this.page, orders[0]);

        let mostDistantDeadline = new Date(await mostDistantDeadlineOrder.getDeadline());

        for (let index = 0; index < orders.length; index++) {
            const currentOrder = new OrderItem(this.page, orders[index]);
            const currentOrderDeadline = new Date(await currentOrder.getDeadline());

            if (currentOrderDeadline.getTime() < mostDistantDeadline.getTime()) {

                this.logger.info(`Current evaluated order number is ${await currentOrder.getOTIdentifier()}`);
                this.logger.info(`CUrrent evaluated order deadline is ${currentOrderDeadline}`);
                
                mostDistantDeadlineOrder = currentOrder;
                mostDistantDeadline = currentOrderDeadline;

                this.logger.info(`New Most Distant Deadline order number is ${await mostDistantDeadlineOrder.getOTIdentifier()}`);
                this.logger.info(`New Most Distant Deadline order deadline is ${mostDistantDeadline}`);
            }
        }

        return mostDistantDeadlineOrder;
    }
}
