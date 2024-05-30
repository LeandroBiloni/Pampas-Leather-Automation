import { Locator, Page } from "@playwright/test";
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
     * Get a locator.
     * @param selector The Selector to use to find a Locator.
     * @returns The found Locator.
     */
    protected locator(selector: string): Locator {
        return this.page.locator(selector);
      }
      
    /**
     * Get this Page URL.
     * @returns The URL of this page.
     */
    public getURL(): string {
        return this.pageCompleteURL;
    }
}