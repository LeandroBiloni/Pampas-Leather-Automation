import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import dotenv from 'dotenv'; 
import { URLAssembler } from "../helpers/URLAssembler";
dotenv.config();

/**
 * Class for Colors List Page.
 */
export class ColorsListPage extends BasePage{

    private colorsListContainer: Locator;
    private searchInputField: Locator;
    /**
     * Class constructor.
     * @param page 
     */
    constructor(page: Page) {
        super(page);
        const baseURl = process.env.BASE_URL as string;
        this.pageRoute = "colorsList";
        this.pageCompleteURL = URLAssembler.getAssembledURL(baseURl, this.pageRoute);

        this.searchInputField = this.locator("[class='search']");
        this.colorsListContainer = this.locator("[class='list-container']");
    }

    /**
     * Write the given text into the search field.
     * @param text The text to write.
     */
    async inputSearchFieldText(text: string): Promise<void> {
        this.logger.info(`Writing the Color name in search field`);
        await this.searchInputField.waitFor({ state: "attached" });
        await this.searchInputField.fill(text);
    }

    /**
     * Get the Colors List container.
     * @returns The container of the Colors List.
     */
    async getColorsListContainer() {
        this.logger.info('Getting the container of the Colors List');
        await this.colorsListContainer.waitFor({ state: 'attached' });
        return this.colorsListContainer;
    }
}