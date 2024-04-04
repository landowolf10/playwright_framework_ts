import { Locator, Page } from "@playwright/test";

export class LoginLocators {
    readonly userTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;


    constructor(page: Page) {
        this.userTextbox = page.getByTestId('user-name');
        this.passwordTextbox = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }
}