import { Locator, Page } from "@playwright/test";
import { LoginLocators } from "../locators/login_locators";
import { DashboardLocators } from "../locators/dashboard_locators";

export class LoginPage {
    private readonly loginLocators: LoginLocators;
    private readonly dashboardLocators: DashboardLocators;
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.loginLocators = new LoginLocators(page);
        this.dashboardLocators = new DashboardLocators(page);
    }

    async writeUsername(userName: string) {
        await this.loginLocators.userTextbox.fill(userName);
    }

    async writePassword(password: string) {
        await this.loginLocators.passwordTextbox.fill(password);
    }

    async clickLoginButton() {
        await this.loginLocators.loginButton.click();
    }

    async getValidLoginElements(): Promise<Map<string, Locator>> {
        let presentElements: Map<string, Locator> = new Map<string, Locator>();

        presentElements.set("cart_icon", this.dashboardLocators.cartIcon);
        presentElements.set("drop_down", this.dashboardLocators.sortDropDown);

        return presentElements;
    }

    async getInvalidLoginElements(): Promise<Map<string, Locator>> {
        let presentElements: Map<string, Locator> = new Map<string, Locator>();

        presentElements.set("login_button", this.loginLocators.loginButton);
        presentElements.set("error_message", this.loginLocators.errorMessage);

        return presentElements;
    }

    async getErrorMessageText(): Promise<string> {
        const errorMessage: string | null = await this.loginLocators.errorMessage.textContent();

        if (errorMessage !== null) {
            return errorMessage;
        } else {
            throw new Error("Error message is null.");
        }
    }
}