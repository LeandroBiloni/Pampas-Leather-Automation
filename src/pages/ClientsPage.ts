import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import dotenv from 'dotenv'; 
import { URLAssembler } from "../helpers/URLAssembler";
dotenv.config();

/**
 * Class for Clients Page.
 */
export class ClientsPage extends BasePage{

    private searchInputField: Locator;
    private clientsListContainer: Locator;
    
    /**
     * Class constructor.
     * @param page 
     */
    constructor(page: Page) {
        super(page);
        const baseURl = process.env.BASE_URL as string;
        this.pageRoute = "customersList";
        this.pageCompleteURL = URLAssembler.getAssembledURL(baseURl, this.pageRoute);

        this.searchInputField = this.locator("[class='search']");
        this.clientsListContainer = this.locator("[class='list-container']");
    }

    /**
     * Write the given text into the search field.
     * @param text The text to write.
     */
    async inputSearchFieldText(text: string): Promise<void> {
        this.logger.info(`Writing the Client name in search field`);
        await this.searchInputField.waitFor({ state: "attached" });
        await this.searchInputField.fill(text);
    }

    /**
     * Get the Clients List container.
     * @returns The container of the Orders List.
     */
    async getClientsListContainer() {
        this.logger.info('Getting the container of the Clients List');
        await this.clientsListContainer.waitFor({ state: 'attached' });
        return this.clientsListContainer;
    }
}