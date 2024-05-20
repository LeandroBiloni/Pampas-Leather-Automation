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
     * Click Home button
     */
    async clickHome(): Promise<void> {
        await this.homeButton.click();
    }

    /**
     * Click Orders button
     */
    async clickOrders(): Promise<void> {
        await this.ordersButton.click();
    }

    /**
     * Click Clients button
     */
    async clickClients(): Promise<void> {
        await this.clientsButton.click();
    }

    /**
     * Click Products button
     */
    async clickProducts(): Promise<void> {
        await this.productsButton.click();
    }
}