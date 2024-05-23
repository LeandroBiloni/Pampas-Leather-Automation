import { Page } from "@playwright/test";
import { DateProvider } from "./DateProvider";
import { allure } from "allure-playwright";

/**
 * Class for the Screenshot functionality
 */
export class Screenshoter{
    /**
     * Take a screenshot of the current page and attach it to the report
     * @param page The Page object to interact with the browser
     * @param name The name for the file
     * @param addTimestamp If true, add a timestamp to the file name
     */
    public static async TakeScreenshot(page: Page, name: string, addTimestamp: boolean): Promise<void> {
        let screenshotName = name;

        if (addTimestamp) {
            const timeStamp = DateProvider.getTimeStamp();
            screenshotName = name.concat(" ", timeStamp.toString(), ".jpeg");
        }

        await allure.attachment(screenshotName, await page.screenshot(), {
            contentType: "image/jpeg",
        });
    }
}