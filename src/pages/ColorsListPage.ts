import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import dotenv from 'dotenv'; 
import { URLAssembler } from "../helpers/URLAssembler";
dotenv.config();

/**
 * Class for Colors List Page.
 */
export class ColorsListPage extends BasePage{

    /**
     * Class constructor.
     * @param page 
     */
    constructor(page: Page) {
        super(page);
        const baseURl = process.env.BASE_URL as string;
        this.pageRoute = "colorsList";
        this.pageCompleteURL = URLAssembler.getAssembledURL(baseURl, this.pageRoute);
    }
}