import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "../../base/BaseComponent";

/**
 * Class for the Order Item in the Orders Page.
 */
export class OrderItem extends BaseComponent {

    private state: Locator;
    private otIdentifier: Locator;
    private clientName: Locator;
    private poIdentifier: Locator;
    private deadline: Locator;
    private productsContainer: Locator;


    
    
    /**
     * Class constructor.
     */
    constructor(page: Page, container: Locator) {
        super(page);
        
        this.container = container;

        this.state = this.container.locator("[class='item'] > p:nth-child(1)");
        this.otIdentifier = this.container.locator("[class='item'] > p:nth-child(2)");
        this.clientName = this.container.locator("[class='item'] > p:nth-child(3)");
        this.poIdentifier = this.container.locator("[class='item'] > p:nth-child(4)");
        this.deadline = this.container.locator("[class='item'] > p:nth-child(5)");

        this.productsContainer = this.container.locator("[class='item-product-container']")        
    }

    /**
     * Get the Order State.
     * @returns This Order State.
     */
    async getState(): Promise<string> {
        this.logger.info("Getting the Order State");
        return await this.state.textContent() as string;
    }

    /**
     * Get the OT id.
     * @returns This Order OT id.
     */
    async getOTIdentifier(): Promise<string> {
        this.logger.info("Getting the Order OT id");
        const otID = await this.otIdentifier.textContent() as string;
        this.logger.info(`OT ID is: ${otID}`);
        return otID;
    }
    
    /**
     * Get the Order Client name.
     * @returns This Order Client name.
     */
    async getClientName(): Promise<string> {
        this.logger.info("Getting the Order Client name");
        return await this.clientName.textContent() as string;
    }

    /**
     * Get the Order PO id.
     * @returns This Order PO id.
     */
    async getPOIdentifier(): Promise<string> {
        this.logger.info("Getting the Order PO id");
        return await this.poIdentifier.textContent() as string;
    }

    /**
     * Get the Order Deadline.
     * @returns This Order Deadline.
     */
    async getDeadline(): Promise<string> {
        this.logger.info("Getting the Order Deadline");
        return await this.deadline.textContent() as string;
    }

    /**
     * Get the Products List container.
     * @returns The container of the Products List.
     */
    async getProductsListContainer() {
        this.logger.info('Getting the container of the Orders List');
        await this.productsContainer.waitFor({ state: 'attached' });
        return this.productsContainer;
    }    
}