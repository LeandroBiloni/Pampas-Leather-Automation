import test, { expect } from "@playwright/test";
import {HomePage} from "../pages/HomePage";

test('is Home Page', async ({ page }) => {
    const home = new HomePage(page);
    await page.goto(home.getURL());
    
    await expect(page).toHaveURL(home.getURL());
})