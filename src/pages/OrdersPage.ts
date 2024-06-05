import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import dotenv from 'dotenv'; 
import { URLAssembler } from "../helpers/URLAssembler";
dotenv.config();

/**
 * Class for Orders Page.
 */
export class OrdersPage extends BasePage{

    private sortOrder: Locator;
    private filterBy: Locator;
    private filterState: Locator;
    private filterSearchField: Locator;
    private ordersListContainer: Locator;

    /**
     * Class constructor.
     * @param page 
     */
    constructor(page: Page) {
        super(page);
        const baseURl = process.env.BASE_URL as string;
        this.pageRoute = "ordersList";
        this.pageCompleteURL = URLAssembler.getAssembledURL(baseURl, this.pageRoute);

        this.sortOrder = this.locator("[id='sort']");
        this.filterBy = this.locator("[id='firstSelect']");
        this.filterState = this.locator("[name='state']");
        this.filterSearchField = this.locator("[class='filter-container'] > input");

        this.ordersListContainer = this.locator("[class='list-container']");
    }

    /**
     * Select Order by selector option.
     */
    async selectOrderOption(option: string): Promise<void> {
        this.logger.info(`Selecting the Order by option "${option}" in Orders Page`);
        await this.sortOrder.waitFor({ state: "attached" });
        await this.sortOrder.selectOption(option);
    }

    /**
     * Select Filter selector option.
     */
    async selectFilterOption(option: string): Promise<void> {
        this.logger.info(`Selecting the Filter by option "${option}" in Orders Page`);
        await this.filterBy.waitFor({ state: "attached" });
        await this.filterBy.selectOption(option);
    }

    /**
     * Select Filter state selector option.
     */
    async selectFilterStateOption(state: string): Promise<void> {
        this.logger.info(`Selecting the Filter State option "${state}" in Orders Page`);
        await this.filterState.waitFor({ state: "attached" });
        await this.filterState.selectOption(state);
    }

    /**
     * Write the given text into the search field.
     * @param text The text to write.
     */
    async inputSearchFieldText(text: string): Promise<void> {
        this.logger.info(`Writing the Filter text "${text}" in Orders Page`);
        await this.filterSearchField.waitFor({ state: "attached" });
        await this.filterSearchField.fill(text);
    }

    /**
     * Get the selecter Order Option.
     * @returns The Order Option that's currently selected.
     */
    getSortOrderLocator(): Locator {
        this.logger.info(`Getting the Sort Order in Orders Page`);
        return this.sortOrder;
    }
    
    getFilterByLocator(): Locator {
        this.logger.info(`Getting the Filter By in Orders Page`);
        return this.filterBy;
    }

    getFilterStateLocator(): Locator {
        this.logger.info(`Getting the Filter State in Orders Page`);
        return this.filterState;
    }

    /**
     * Get the Orders List container.
     * @returns The container of the Orders List.
     */
    async getSearchListContainer() {
        this.logger.info('Getting the container of the Orders List');
        await this.ordersListContainer.waitFor({ state: 'attached' });
        return this.ordersListContainer;
    }

    /**
     * Check that the State option selector is visible.
     * @returns True if visible, false otherwise.
     */
    async isStateSelectorVisible(): Promise<boolean> {
        try {
            this.logger.info('Checking if State selector is visible');
            await this.filterState.waitFor({ state: 'attached'});
            return await this.filterState.isVisible();
        } catch (error) {
            this.logger.info(`Error checking the visibility of the selector: ${error}`);
            return false;
        }        
    }

    /**
     * Check that the Filter Search field is visible.
     * @returns True if visible, false otherwise.
     */
    async isFilterSearchFieldVisible(): Promise<boolean> {
        try {
            this.logger.info('Checking if Filter Search field is visible');
            await this.filterSearchField.waitFor({ state: 'attached'});
            return await this.filterSearchField.isVisible();
        } catch (error) {
            this.logger.info(`Error checking the visibility of the field: ${error}`);
            return false;
        }        
    }
}