import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "../../base/BaseComponent";

/**
 * Class for the Colors List in the Colors List Page.
 */
export class ColorsList extends BaseComponent {
    private colors: Locator;

    /**
     * Class constructor.
     */
    constructor(page: Page, container: Locator) {
        super(page);
        this.container = container;
        this.colors = this.container.locator("[class~='item-container']");
    }

    /**
     * Get the collection of Colors.
     * @returns An array of Colors Locators.
     */
    async getColors(): Promise<Locator[]> {
        this.logger.info("Getting the collection of Colors");
        await this.colors.first().waitFor({ state: 'attached'});
        const clientsList = await this.colors.all();
        return clientsList;
    }

    /**
     * Get a Colors by the index.
     * @param index 
     * @returns A Color that corresponds with the given index.
     */
    async getColorByIndex(index: number): Promise<Locator> {
        this.logger.info(`Getting the Color from the collection with index: ${index}`);
        
        const colors = await this.getColors();

        if (index >= 0 && index < colors.length) {
            return colors[index]
        } else {
            throw new Error(`Invalid index: ${index} - List length. ${colors.length}`);
        }
    }
}