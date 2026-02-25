import { Page } from "@playwright/test";
import { LoginLocators } from "../locators/login_locators";
import { BasePage } from "../helpers/BasePage";
import { assertEqualsTextString, assertVisible } from "../helpers/assertions";

export class LoginPage extends BasePage {
    private readonly loginLocators: LoginLocators;

    constructor(page: Page) {
        super(page);
        this.loginLocators = new LoginLocators(page);
    }

    async writeUsername(userName: string) {
        await this.writeText(this.loginLocators.userTextbox, userName);
    }

    async writePassword(password: string) {
        await this.writeText(this.loginLocators.passwordTextbox, password);
    }

    async clickLoginButton() {
        await this.clickElement(this.loginLocators.loginButton);
    }

    async assertLoginFailed() {
        const errorMessageText = await this.getErrorMessageText();

        await assertVisible(this.loginLocators.loginButton, "Login button");
        await assertVisible(this.loginLocators.errorMessage, "Error message");

        await assertEqualsTextString(
            errorMessageText,
            "Epic sadface: Username and password do not match any user in this service",
            "Error Message"
        );
    }

    async getErrorMessageText(): Promise<string> {
        const errorMessage: string | null = await this.getElementText(this.loginLocators.errorMessage);
        return errorMessage ?? "Error message not found.";
    }
}