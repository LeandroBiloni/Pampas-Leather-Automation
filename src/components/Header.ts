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
    private logoutButton: Locator;

    /**
     * Class constructor.
     * @param page 
     */
    constructor(page: Page) {
        super(page);
        
        this.homeButton = this.locator('ul > li:nth-child(1)');
        this.ordersButton = this.locator('ul > li:nth-child(2)');
        this.clientsButton = this.locator('ul > li:nth-child(3)');
        this.productsButton = this.locator('ul > li:nth-child(4)');
        this.logoutButton = this.locator('ul > li:nth-child(5)');
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

    /**
     * Click Logout button.
     */
    async clickLogout(): Promise<void> {
        this.logger.info("Clicking the header Logout button");
        await this.logoutButton.waitFor({state: "attached"});
        await this.logoutButton.click();
    }
}