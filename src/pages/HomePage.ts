import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class HomePage extends BasePage{
    constructor(page: Page) {
        super(page);
        this.pageURL = "https://www.sudamericanarugs.com/#/index";
    }
}