import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "../../base/BaseComponent";

/**
 * Class for the Color Item in the Color Items List component.
 */
export class ColorItem extends BaseComponent {
    private colorName: Locator;
    private colorCode: Locator;
    private colorDescription: Locator;

    /**
     * Class constructor.
     */
    constructor(page: Page, container: Locator) {
        super(page);
        
        this.container = container;
        this.colorName = this.container.locator("[class='item'] > p:nth-child(1)");
        this.colorCode = this.container.locator("[class='item'] > p:nth-child(2)");
        this.colorDescription = this.container.locator("[class='item'] > p:nth-child(3)");
    }

     /**
     * Get the Color name.
     * @returns This Color name.
     */
     async getColorName(): Promise<string> {
        this.logger.info("Getting the Color name");
        return await this.colorName.textContent() as string;
    }

    /**
     * Get the Color code.
     * @returns This Color code.
     */
    async getCode(): Promise<string> {
        this.logger.info("Getting the Color code");
        return await this.colorCode.textContent() as string;
    }

    /**
     * Get the Color description.
     * @returns This Color description.
     */
    async getDescription(): Promise<string> {
        this.logger.info("Getting the Color description");
        return await this.colorDescription.textContent() as string;
    }
}