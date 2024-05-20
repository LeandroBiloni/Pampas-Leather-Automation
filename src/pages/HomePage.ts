import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import dotenv from 'dotenv'; 
import { URLAssembler } from "../helpers/URLAssembler";
dotenv.config();

/**
 * Class for Home Page
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
     * Class constructor
     * @param page 
     */
    constructor(page: Page) {
        super(page);
        
        const baseURl = process.env.BASE_URL as string;
        this.pageRoute = "index";
        this.pageCompleteURL = URLAssembler.getAssembledURL(baseURl, this.pageRoute);

        this.ordersButton = this.page.locator("div > a[href='/OrdersList']");
        this.clientsButton = this.page.locator("div > a[href='/customersList']");
        this.productsButton = this.page.locator("div > a[href='/products']");
        this.upsButton = this.page.locator("div > [class='item item-ups']");
        this.fedexButton = this.page.locator("div > [class='item item-fedex']");

        this.upsURL = "https://www.ups.com/ar/es/Home.page?";
        this.fedExURL = "https://www.fedex.com/es-ar/home.html";
    }

    /**
     * Click Orders button
     */
    async clickOrders(): Promise<void> {
        await this.ordersButton.click();
    }

    /**
     * Click Clients button
     */
    async clickClients(): Promise<void> {
        await this.clientsButton.click();
    }

    /**
     * Click Products button
     */
    async clickProducts(): Promise<void> {
        await this.productsButton.click();
    }

    /**
     * Click UPS button
     */
    async clickUPS(): Promise<void> {
        await this.upsButton.click();
    }

    /**
     * Click FedEx button
     */
    async clickFedEx(): Promise<void> {
        await this.fedexButton.click();
    }

    /**
     * Get UPS site URL
     * @returns UPS site URL
     */
    public getUpsURL(): string {
        return this.upsURL;
    }

    /**
     * Get FedEx site URL
     * @returns FedEx site URL
     */
    public getFedExURL(): string {
        return this.fedExURL;
    }
}