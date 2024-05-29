import { Locator, Page } from "@playwright/test";
import { logger } from "../helpers/Logger"

/**
 * Base class for Pages Components.
 */
export abstract class BaseComponent {
    protected readonly page: Page;
    protected container: Locator;
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
  }