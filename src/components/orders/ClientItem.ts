import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "../../base/BaseComponent";

/**
 * Class for the Client Item in the Clients Page.
 */
export class ClientItem extends BaseComponent {

    private clientName: Locator;
    private clientCode: Locator; 
    
    /**
     * Class constructor.
     */
    constructor(page: Page, container: Locator) {
        super(page);
        
        this.container = container;

        this.clientName = this.container.locator("[class='item'] > p:nth-child(1)");
        this.clientCode = this.container.locator("[class='item'] > p:nth-child(2)");
    }

    /**
     * Get the client name.
     * @returns The client name.
     */
    async getClientName(): Promise<string> {
        this.logger.info("Getting the Client name");
        return await this.clientName.textContent() as string;
    }

    /**
     * Get the client code.
     * @returns The client code.
     */
    async getClientCode(): Promise<string> {
        this.logger.info("Getting the Client code");
        return await this.clientCode.textContent() as string;
    }
}