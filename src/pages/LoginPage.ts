import { Page } from "@playwright/test";
import { LoginLocators } from "../locators/login_locators";
import { DashboardLocators } from "../locators/dashboard_locators";
import { BasePage } from "../helpers/BasePage";

export class LoginPage extends BasePage{
    private readonly loginLocators: LoginLocators;
    private readonly dashboardLocators: DashboardLocators;

    constructor(page: Page) {
        super(page);
        this.loginLocators = new LoginLocators(page);
        this.dashboardLocators = new DashboardLocators(page);
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

    getValidLoginElements() {
        return {
            cartIcon: this.dashboardLocators.cartIcon,
            sortDropDown: this.dashboardLocators.sortDropDown,
        };
    }

    getInvalidLoginElements() {
        return {
            loginButton: this.loginLocators.loginButton,
            errorMessage: this.loginLocators.errorMessage,
        };
    }

    async getErrorMessageText(): Promise<string> {
        const errorMessage: string | null = await this.getElementText(this.loginLocators.errorMessage);
        return errorMessage ?? "Error message not found.";
    }
}