import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import dotenv from 'dotenv'; 
import { URLAssembler } from "../helpers/URLAssembler";
dotenv.config();

/**
 * Class for Clients Page.
 */
export class ClientsPage extends BasePage{

    /**
     * Class constructor.
     * @param page 
     */
    constructor(page: Page) {
        super(page);
        const baseURl = process.env.BASE_URL as string;
        this.pageRoute = "customersList";
        this.pageCompleteURL = URLAssembler.getAssembledURL(baseURl, this.pageRoute);
    }
}