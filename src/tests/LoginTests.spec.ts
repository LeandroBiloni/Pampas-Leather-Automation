import test, { expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { Screenshoter } from "../helpers/Screenshoter";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === "failed") {
        const addTimeStamp = true;
        await Screenshoter.TakeScreenshot(page, testInfo.title, addTimeStamp);
    }
});

test.describe('Login Page Tests', {tag: ['@login-page', '@full-regression', '@smoke']}, () => {
    test('Correct Login', async ({ page }) => {
        await allure.description("Test of 'Login' functionality. This test attempts to do the login procedure with valid credentials.");
        await allure.tags("Login Page", "Full Regression", "Smoke");

        //Arrange
        const email = process.env.CORRECT_EMAIL as string;
        const password = process.env.CORRECT_PASSWORD as string;
        await allure.parameter("Email", password, {mode: "masked"});
        await allure.parameter("Password", email, {mode: "masked"})

        //Act - Do login
        const loginPage = new LoginPage(page);
        await allure.step("Step 1 - Go to Login Page", async () => {
            await page.goto(loginPage.getURL());
        });

        await allure.step("Step 2 - Input email", async () => {
            await loginPage.inputEmail(email);
        });

        await allure.step("Step 3 - Input password", async () => {
            await loginPage.inputPassword(password);
        });

        const homePage = new HomePage(page);
        await allure.step("Step 4 - Click Login button", async () => {
            await loginPage.clickLogin();
            await page.waitForURL(homePage.getURL());
        });

        //Assert
        await allure.step("Check that the Home Page loads", async () => {
            await expect(page).toHaveURL(homePage.getURL());
        });
    });

    test('Wrong Login - Empty fields', async ({ page }) => {
        await allure.description("Test of 'Login' functionality. This test attempts to do the login procedure leaving the email and password fields empty. It will fail if the login is performed correctly.");
        await allure.tags("Login Page", "Full Regression", "Smoke");
        await allure.parameter("Email", "");
        await allure.parameter("Password", "");

        //Arrange
        const expectedEmailDialog = "Email is required";
        const expectedPasswordDialog = "Password is required";
        const expectedLoginDialog = "Please fix the errors in the form";

        //Act - Do login
        const loginPage = new LoginPage(page);
        await allure.step("Step 1 - Go to Login Page", async () => {
            await page.goto(loginPage.getURL());
        });

        await allure.step("Step 2 - Click Login button", async () => {
            loginPage.clickLogin();
        });

        //Assert        
        await allure.step("Check that the Failure messages appears", async () => {
            await expect(await loginPage.getEmailError()).toBe(expectedEmailDialog);
            await expect(await loginPage.getPasswordError()).toBe(expectedPasswordDialog);
            await expect(await loginPage.getLoginError()).toBe(expectedLoginDialog);
        });
    });

    test('Wrong Login - Empty email', async ({ page }) => {
        await allure.description("Test of 'Login' functionality. This test attempts to do the login procedure leaving the email field empty. It will fail if the login is performed correctly.");
        await allure.tags("Login Page", "Full Regression", "Smoke");
        
        //Arrange
        const password = "asdasd";
        await allure.parameter("Email", "");
        await allure.parameter("Password", password);

        const expectedEmailDialog = "Email is required";
        const expectedLoginDialog = "Please fix the errors in the form";

        //Act - Do login
        const loginPage = new LoginPage(page);
        await allure.step("Step 1 - Go to Login Page", async () => {
            await page.goto(loginPage.getURL());
        });

        await allure.step("Step 2 - Input password", async () => {
            await loginPage.inputPassword(password);
        });

        await allure.step("Step 3 - Click Login button", async () => {
            await loginPage.clickLogin();
        });

        //Assert        
        await allure.step("Check that the Failure message appears", async () => {
            await expect(await loginPage.getEmailError()).toBe(expectedEmailDialog);
            await expect(await loginPage.getLoginError()).toBe(expectedLoginDialog);
        });
    });

    test('Wrong Login - Empty password', async ({ page }) => {
        await allure.description("Test of 'Login' functionality. This test attempts to do the login procedure leaving the password field empty. It will fail if the login is performed correctly.");
        await allure.tags("Login Page", "Full Regression", "Smoke");
        
        //Arrange
        const email = "email@email.com";
        await allure.parameter("Email", email);
        await allure.parameter("Password", "");

        const expectedPasswordDialog = "Password is required";
        const expectedLoginDialog = "Please fix the errors in the form";

        //Act - Do login
        const loginPage = new LoginPage(page);
        await allure.step("Step 1 - Go to Login Page", async () => {
            await page.goto(loginPage.getURL());
        });

        await allure.step("Step 2 - Input email", async () => {
            await loginPage.inputEmail(email);
        });

        await allure.step("Step 3 - Click Login button", async () => {
            await loginPage.clickLogin();
        });

        //Assert        
        await allure.step("Check that the Failure message appears", async () => {
            await expect(await loginPage.getPasswordError()).toBe(expectedPasswordDialog);
            await expect(await loginPage.getLoginError()).toBe(expectedLoginDialog);
        });
    });

    test('Wrong Login - Wrong credentials format', async ({ page }) => {
        await allure.description("Test of 'Login' functionality. This test attempts to do the login procedure using wrong credentials format. It will fail if the login is performed correctly.");
        await allure.tags("Login Page", "Full Regression", "Smoke");
        
        //Arrange
        const email = "asd@asd";
        const password = "asd";
        await allure.parameter("Email", email);
        await allure.parameter("Password", password);

        const expectedEmailDialog = "Invalid email format";
        const expectedPasswordDialog = "Password must be at least 6 characters long";
        const expectedLoginDialog = "Please fix the errors in the form";


        //Act - Do login
        const loginPage = new LoginPage(page);
        await allure.step("Step 1 - Go to Login Page", async () => {
            await page.goto(loginPage.getURL());
        });

        await allure.step("Step 2 - Input email", async () => {
            await loginPage.inputEmail(email);
        });

        await allure.step("Step 3 - Input password", async () => {
            await loginPage.inputPassword(password);
        });

        //Assert        
        await allure.step("Check that the Failure message appears", async () => {
            await expect(await loginPage.getEmailError()).toBe(expectedEmailDialog);
            await expect(await loginPage.getPasswordError()).toBe(expectedPasswordDialog);
            await expect(await loginPage.isLoginButtonEnabled()).toBeFalsy();
        });
    });

    test('Wrong Login - Invalid credentials', async ({ page }) => {
        await allure.description("Test of 'Login' functionality. This test attempts to do the login procedure using invalid credentials. It will fail if the login is performed correctly.");
        await allure.tags("Login Page", "Full Regression", "Smoke");
        
        //Arrange
        const email = "asd@asd.com";
        const password = "asdasd";
        await allure.parameter("Email", email);
        await allure.parameter("Password", password);

        const expectedLoginDialog = "Login failed. Please check your email and password.";


        //Act - Do login
        const loginPage = new LoginPage(page);
        await allure.step("Step 1 - Go to Login Page", async () => {
            await page.goto(loginPage.getURL());
        });

        await allure.step("Step 2 - Input email", async () => {
            await loginPage.inputEmail(email);
        });

        await allure.step("Step 3 - Input password", async () => {
            await loginPage.inputPassword(password);
        });

        await allure.step("Step 4 - Click Login button", async () => {
            await loginPage.clickLogin();
        });

        //Assert        
        await allure.step("Check that the Failure message appears", async () => {
            await expect(loginPage.getLoginErrorLocator()).toHaveText(expectedLoginDialog);
        });
    });
});