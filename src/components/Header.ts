import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "../base/BaseComponent";

/**
 * Class for Header.
 */
export class Header extends BaseComponent{
    private homeButton: Locator;
    private ordersButton: Locator;
    private clientsButton: Locator;
    private productsButton: Locator;

    /**
     * Class constructor.
     * @param page 
     */
    constructor(page: Page) {
        super(page);
        
        this.homeButton = this.locator('li > [href="/index"]');
        this.ordersButton = this.locator('li > [href="/ordersList"]')
        this.clientsButton = this.locator('li > [href="/customersList"]')
        this.productsButton = this.locator('li > [href="/products"]')
    }

    /**
     * Click Home button.
     */
    async clickHome(): Promise<void> {
        this.logger.info("Clicking the header Home button");
        await this.homeButton.waitFor({state: "attached"});
        await this.homeButton.click();
    }

    /**
     * Click Orders button.
     */
    async clickOrders(): Promise<void> {
        this.logger.info("Clicking the header Orders button");
        await this.ordersButton.waitFor({state: "attached"});
        await this.ordersButton.click();
    }

    /**
     * Click Clients button.
     */
    async clickClients(): Promise<void> {
        this.logger.info("Clicking the header Clients button");
        await this.clientsButton.waitFor({state: "attached"});
        await this.clientsButton.click();
    }

    /**
     * Click Products button.
     */
    async clickProducts(): Promise<void> {
        this.logger.info("Clicking the header Products button");
        await this.productsButton.waitFor({state: "attached"});
        await this.productsButton.click();
    }
}