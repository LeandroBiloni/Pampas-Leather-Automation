import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import dotenv from 'dotenv'; 
import { URLAssembler } from "../helpers/URLAssembler";
dotenv.config();

/**
 * Class for Home Page.
 */
export class HomePage extends BasePage{

    private ordersButton: Locator;
    private clientsButton: Locator;
    private productsButton: Locator;
    private upsButton: Locator;
    private fedexButton: Locator;

    private upsURL: string;
    private fedExURL: string;

    /**
     * Class constructor.
     * @param page 
     */
    constructor(page: Page) {
        super(page);
        
        const baseURl = process.env.BASE_URL as string;
        this.pageRoute = "";
        this.pageCompleteURL = URLAssembler.getAssembledURL(baseURl, this.pageRoute);

        this.ordersButton = this.locator("div > a[href='/ordersList']");
        this.clientsButton = this.locator("div > a[href='/customersList']");
        this.productsButton = this.locator("div > a[href='/products']");
        this.upsButton = this.locator("div > [class='item item-ups']");
        this.fedexButton = this.locator("div > [class='item item-fedex']");

        this.upsURL = "https://www.ups.com/ar/es/Home.page?";
        this.fedExURL = "https://www.fedex.com/es-ar/home.html";
    }

    /**
     * Click Orders button.
     */
    async clickOrders(): Promise<void> {
        this.logger.info("Clicking the Orders button in Home Page");
        await this.ordersButton.waitFor({state: "attached"});
        await this.ordersButton.click();
    }

    /**
     * Click Clients button.
     */
    async clickClients(): Promise<void> {
        this.logger.info("Clicking the Clients button in Home Page");
        await this.clientsButton.waitFor({state: "attached"});
        await this.clientsButton.click();
    }

    /**
     * Click Products button.
     */
    async clickProducts(): Promise<void> {
        this.logger.info("Clicking the Orders button in Home Page");
        await this.productsButton.waitFor({state: "attached"});
        await this.productsButton.click();
    }

    /**
     * Click UPS button.
     */
    async clickUPS(): Promise<void> {
        this.logger.info("Clicking the UPS button in Home Page");
        await this.upsButton.waitFor({state: "attached"});
        await this.upsButton.click();
    }

    /**
     * Click FedEx button.
     */
    async clickFedEx(): Promise<void> {
        this.logger.info("Clicking the FedEx button in Home Page");
        await this.fedexButton.waitFor({state: "attached"});
        await this.fedexButton.click();
    }

    /**
     * Get UPS site URL.
     * @returns UPS site URL.
     */
    public getUpsURL(): string {
        return this.upsURL;
    }

    /**
     * Get FedEx site URL.
     * @returns FedEx site URL.
     */
    public getFedExURL(): string {
        return this.fedExURL;
    }
}