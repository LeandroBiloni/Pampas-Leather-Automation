import { Page } from "@playwright/test";

export abstract class BasePage {
    protected readonly page: Page;
    protected pageURL : string;

    constructor(page: Page) {
        this.page = page;
    }

    public getURL() : string {
        return this.pageURL;
    }
}