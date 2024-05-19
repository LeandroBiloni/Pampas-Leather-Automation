import { Page } from "@playwright/test";

/**
 * Base class for Pages
 */
export abstract class BasePage {
    protected readonly page: Page;
    protected pageCompleteURL: string;
    protected pageRoute: string;
    /**
     * Class constructor
     * @param page 
     */
    constructor(page: Page) {
        this.page = page;
    }

    public getURL(): string {
        return this.pageCompleteURL;
    }
}