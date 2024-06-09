import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "../../base/BaseComponent";
import { DateProvider } from "../../helpers/DateProvider";

/**
 * Class for the Clients List in the Clients Page.
 */
export class ClientsList extends BaseComponent {
    private clients: Locator;

    /**
     * Class constructor.
     */
    constructor(page: Page, container: Locator) {
        super(page);
        this.container = container;
        this.clients = this.container.locator("[class~='item-container']");
    }

    /**
     * Get the collection of Clients.
     * @returns An array of Clients Locators.
     */
    async getClients(): Promise<Locator[]> {
        this.logger.info("Getting the collection of Clients");
        await this.clients.first().waitFor({ state: 'attached'});
        const clientsList = await this.clients.all();
        return clientsList;
    }

    /**
     * Get a Client by the index.
     * @param index 
     * @returns A Client that corresponds with the given index.
     */
    async getClientByIndex(index: number): Promise<Locator> {
        this.logger.info(`Getting the Client from the collection with index: ${index}`);
        
        const clients = await this.getClients();

        if (index >= 0 && index < clients.length) {
            return clients[index]
        } else {
            throw new Error(`Invalid index: ${index} - List length. ${clients.length}`);
        }
    }
}