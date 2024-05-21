import { Page } from "@playwright/test";
import { DateProvider } from "./DateProvider";
import { allure } from "allure-playwright";

export class Screenshoter{
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