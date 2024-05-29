import { Page } from "@playwright/test";
import { logger } from "../helpers/Logger"

/**
 * Base class for Pages.
 */
export abstract class BasePage {
    protected readonly page: Page;
    protected pageCompleteURL: string;
    protected pageRoute: string;
    protected logger;
    
    /**
     * Class constructor.
     * @param page 
     */
    constructor(page: Page) {
        this.page = page;
        this.logger = logger;
    }

    /**
     * Get this Page URL.
     * @returns The URL of this page.
     */
    public getURL(): string {
        return this.pageCompleteURL;
    }
}