import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "../../base/BaseComponent";

/**
 * Class for the Product Item in the Product Items List component.
 */
export class ProductItem extends BaseComponent {

    private productName: Locator;
    private materialName: Locator;
    private code: Locator;
    private description: Locator;
    private border: Locator;

    /**
     * Class constructor.
     */
    constructor(page: Page, container: Locator) {
        super(page);
        
        this.container = container;

        this.productName = this.container.locator("[class='item'] > p:nth-child(1)");
        this.materialName = this.container.locator("[class='item'] > p:nth-child(2)");
        this.code = this.container.locator("[class='item'] > p:nth-child(3)");
        this.description = this.container.locator("[class='item'] > p:nth-child(4)");
        this.border = this.container.locator("[class='item'] > p:nth-child(5)");
    }

    /**
     * Get the Product name.
     * @returns This Product name.
     */
    async getProductName(): Promise<string> {
        this.logger.info("Getting the Product name");
        return await this.productName.textContent() as string;
    }

    /**
     * Get the Product material name.
     * @returns This Product material name.
     */
    async getMaterialName(): Promise<string> {
        this.logger.info("Getting the Product material name");
        return await this.materialName.textContent() as string;
    }

    /**
     * Get the Product code.
     * @returns This Product code.
     */
    async getCode(): Promise<string> {
        this.logger.info("Getting the Product code");
        return await this.code.textContent() as string;
    }

    /**
     * Get the Product description.
     * @returns This Product description.
     */
    async getDescription(): Promise<string> {
        this.logger.info("Getting the Product description");
        return await this.description.textContent() as string;
    }

    /**
     * Get the Product border.
     * @returns This Product border.
     */
    async getBorder(): Promise<string> {
        this.logger.info("Getting the Product border");
       return await this.border.textContent() as string;
    }
}