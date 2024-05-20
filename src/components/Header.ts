import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";

/**
 * Class for Header
 */
export class Header extends BaseComponent{
    private homeButton: Locator;
    private ordersButton: Locator;
    private clientsButton: Locator;
    private productsButton: Locator;

    /**
     * Class constructor
     * @param page 
     */
    constructor(page: Page) {
        super(page);
        
        this.homeButton = this.page.locator('li > [href="/index"]');
        this.ordersButton = this.page.locator('li > [href="/ordersList"]')
        this.clientsButton = this.page.locator('li > [href="/customersList"]')
        this.productsButton = this.page.locator('li > [href="/products"]')
    }

    /**
     * Go to Home
     */
    async clickHome(): Promise<void> {
        await this.homeButton.click();
    }

    /**
     * Go to Orders
     */
    async clickOrders(): Promise<void> {
        await this.ordersButton.click();
    }

    /**
     * Go to Clients
     */
    async clickClients(): Promise<void> {
        await this.clientsButton.click();
    }

    /**
     * Go to Products
     */
    async clickProducts(): Promise<void> {
        await this.productsButton.click();
    }
}