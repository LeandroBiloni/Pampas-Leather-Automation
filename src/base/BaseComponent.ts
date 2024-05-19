import { Locator, Page } from "@playwright/test";

/**
 * Base class for Pages Components
 */
export abstract class BaseComponent {
    protected readonly page: Page;
  
    /**
     * Class constructor
     * @param page 
     */
    constructor(page: Page) {
      this.page = page;
    }
  
    protected locator(selector: string): Locator {
      return this.page.locator(selector);
    }
  }